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
 * 做法：给 markdown-it 挂一条行内规则，遇到 `$...$` / `$$...$$` 就整段吞掉，直接产出一个
 * `<script type="math/tex">`（显示公式是 `<script type="math/tex; mode=display">`）的
 * 原始 HTML token——内容完全不经过任何 markdown 处理，也就不会被转义或拆分；浏览器里交给
 * 主题的 MathJax 渲染（主题 mathjax.pug 本来就专门处理 `script[type^="math/tex"]`）。
 *
 * 因为规则挂在 hexo-renderer-markdown-it 的 `markdown-it:renderer` 过滤器上，
 * 不需要另外改动 `_config.yml`，也不会碰到围栏代码块 / 行内代码里的 `$`。
 */

const DOLLAR = 0x24; // '$'

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
    token.content = display
      ? '<script type="math/tex; mode=display">' + tex + '</script>'
      : '<script type="math/tex">' + tex + '</script>';
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
