'use strict';

/**
 * 让 markdown-it 把数学公式当「不可见内容」整段吞掉。
 *
 * 背景（详见 AGENTS.md 第 16 / 17 节）：本站的 .md 现在只由 hexo-renderer-markdown-it 渲染，
 * 而 markdown-it 本身不认识数学公式，会把公式当普通文本处理，于是：
 *   1. 「反斜杠 + 标点」被转义吃掉：`\,` → `,`、`\;` → `;`、`\%` → `%`、`\{` → `{`；
 *   2. `_` `*` `^` `~` 被强调 / 上下标（markdown-it-sub、markdown-it-sup）插件抢走；
 *   3. 多行 `$$...$$` 的换行被替换成 `<br>`，公式被拆成多段，MathJax 认不出来。
 *
 * 做法：给 markdown-it 挂一条行内规则，遇到 `$...$` / `$$...$$` 就整段吞掉，原样吐成一个
 * 「原始 HTML」token（只做 HTML 转义，`&` `<` `>` 换实体，其余字符不动）——这段内容于是
 * 完全不经过 markdown 处理，不会被转义、不会插 `<br>`、也不会被 sub/sup 抢走；定界符照旧，
 * 浏览器里仍然由主题的 MathJax 按 `$...$` / `$$...$$` 渲染。
 * 之所以不用 `<script type="math/tex">`（虽然主题也认）：那样一旦 MathJax 脚本没加载成功，
 * 公式会整段消失；保留文本定界符则最差也能看到 `$x^2$` 原文，不会白页。
 *
 * 因为规则挂在 hexo-renderer-markdown-it 的 `markdown-it:renderer` 过滤器上，
 * 不需要另外改动 `_config.yml`，也不会碰到围栏代码块 / 行内代码里的 `$`。
 */

const DOLLAR = 0x24; // '$'

function htmlEscape(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function mathGuard(state, silent) {
  const src = state.src;
  const start = state.pos;
  if (src.charCodeAt(start) !== DOLLAR) return false;

  let display = false;
  let pos = start + 1;
  if (src.charCodeAt(pos) === DOLLAR) {
    display = true;
    pos += 1;
  }

  let end = -1;
  if (display) {
    end = src.indexOf('$$', pos);
  } else {
    const close = src.indexOf('$', pos);
    const newline = src.indexOf('\n', pos);
    if (close >= 0 && (newline < 0 || close < newline)) end = close;
  }
  if (end < 0) return false;

  const tex = src.slice(pos, end);
  if (!tex.length) return false;
  // 行内公式要求两侧不留空白，少误伤「$100 和 $200」这类写法
  if (!display && (/^\s/.test(tex) || /\s$/.test(tex))) return false;

  if (!silent) {
    const token = state.push('html_inline', '', 0);
    token.content = htmlEscape(src.slice(start, end + (display ? 2 : 1)));
  }
  state.pos = end + (display ? 2 : 1);
  return true;
}

hexo.extend.filter.register('markdown-it:renderer', md => {
  if (!md || md.__mathGuardInstalled) return md;
  md.__mathGuardInstalled = true;
  md.inline.ruler.before('escape', 'math_guard', mathGuard);
  return md;
});
