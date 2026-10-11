# 仓库说明 / 工作约定

这是一个 Hexo 7 + Butterfly 主题的个人博客，文章放在 `source/_posts/*.md`，站点根目录就是本仓库。

---

## 画 mermaid 导图的既定流程

用户经常会给一张思维导图的截图，要求「生成对应的 mermaid 导图」并追加到某篇文章里。按下面这套做。

### 1. 用主题的标签写法，不要用代码块围栏

````md
{% mermaid %}
%%{init: {...}}%%
graph LR
  ...
{% endmermaid %}
````

**原因**：Butterfly 的渲染脚本查找的是 `pre > code.mermaid`，而本站 `_config.yml` 里 `markdown.render.langPrefix` 是 `language-`，代码围栏生成出来的是 `class="language-mermaid"`，选择器匹配不上，图不会渲染（只会显示成代码块）。

### 2. init 模板照抄

```
%%{init: {
  "theme": "base",
  "themeVariables": {
    "primaryColor": "#5b9bd5",
    "primaryTextColor": "#ffffff",
    "primaryBorderColor": "#41719c",
    "lineColor": "#41719c",
    "secondaryColor": "#ffffff",
    "tertiaryColor": "#e2f0d9",
    "fontSize": "16px",
    "fontFamily": "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif"
  },
  "flowchart": {
    "nodeSpacing": 8,
    "rankSpacing": 26,
    "curve": "basis",
    "htmlLabels": true,
    "subGraphTitleMargin": { "top": 0, "bottom": 14 },
    "padding": 4,
    "useMaxWidth": false,
    "wrappingWidth": 1000
  }
}}%%
```

- `fontFamily` 里的双引号必须转义成 `\"`。写成单引号会让**整段 `%%{init}%%` 静默失效**——主题色全丢，节点变成 mermaid 默认的淡紫色，且不报错。
- `fontFamily` 要与站点字体对齐，否则「量字宽」和「实际渲染」用两套字体，尺寸会算错。
- **节点高度靠 `flowchart.padding` 控制**（默认 15）。用户觉得图「太高、太空」时就是它。实测：`padding: 15` 单行节点高 54px，`padding: 8` → 40px，`padding: 4` → 32px，`padding: 2` → 28px（2 已经明显局促，不建议）。当前用 **4**，配 `nodeSpacing: 8`。
- 注意这样改**必须走 init 配置**：mermaid 在渲染时就把节点尺寸算死了，事后用 CSS 调 `line-height` / `p{margin}` 完全无效（实测四种 CSS 方案尺寸一模一样）。

- **`useMaxWidth: false`：让图按原始尺寸渲染，不要随容器缩放。** 默认（true）时 mermaid 给 SVG 加 `width="100%" max-width:<原始宽>px`，图越复杂原始宽越大、被缩得越小，于是「复杂图的字看着比简单图小」。设成 false 后 SVG 固定为原始宽，**不同复杂度的图字号一致**，宽图靠容器横向滚动承接。
  配套 CSS 已写在 `_config.butterfly.yml` 的 `inject.head` 里：
  `.mermaid-wrap{overflow-x:auto;overflow-y:hidden;padding-bottom:6px}` + `.mermaid-wrap > svg{display:block;height:auto}`（`display:block` 是必须的——SVG 是 inline 时会被 `text-align:center` 居中，横向滚动会出现「左边滚不到」的问题）。
- **标签行距**同样写在那段注入 CSS 里：`.nodeLabel,.nodeLabel p,.nodeLabel span{line-height:1.8;margin:0}`。注意必须**不加作用域**，因为 mermaid 量文字尺寸用的临时元素挂在 body 上，加了 `.mermaid-wrap` 前缀就影响不到它（实测无效）。
- 每行字数的限制（≤11 汉字）来自「量出来的宽度 < 实际渲染宽度」这个误差，**跟节点高矮无关**，所以 `padding` 调小并不代表每行能放更多字（反而余量更小）。这条规则不要放松。

### 3. 换行：机制已查清（2026-10-11）

**折行阈值由 `flowchart.wrappingWidth` 决定，与 `padding` 无关。** 实测（同一批节点，只改 padding：4 / 6 / 8 / 10 / 15）：

- 五种 padding 下「不折行的最大单行长度」**全都是 12 个汉字**。

默认 `wrappingWidth: 200` ≈ 12 个汉字（16px 字号）。mermaid 在**排版阶段**就按这个宽度把标签切成行，然后**按切完的行算框宽**。用户浏览器里标签不会被再折一次（整行渲染），所以行一旦超过 200px，渲染宽度就超出框 → **被裁**；我这边的浏览器会自动折一次，反而把这个 bug 掩盖了。所以**「本地看着正常」不代表没问题**，真正的判据是「我手写的每一行有没有在本地被再折一次」。

实测不同 `wrappingWidth` 下的上限：

| wrappingWidth | 200（默认） | 320 | 400 | 560 |
| --- | --- | --- | --- | --- |
| 不折行的最大单行长度 | 12 字 | 20 字 | 24 字 | 32 字 |

**现在的做法**：`"wrappingWidth": 1000` + **仍然手写 `<br>` 断行**，两者配合才安全：

- `wrappingWidth` 调大 → mermaid 不再自作主张切行，框严格按我写的行长算宽；
- 手写 `<br>` → 在「浏览器不折行」的环境里换行位置也一定正确。

实测单行写到 16 字（约 256px）没问题；建议**控制在 18 字以内**——`padding: 4` 只留 8px 余量，行越长，量宽误差的绝对值越大，越容易擦边。想让图更宽（更好占满正文栏）就加大行长；别指望动 padding，它只影响框与文字的留白，不影响折行。

> 归档两条**已实测无效**的路，别再试：给单张图设 `wrappingWidth: 176`（只会让框更窄、更早裁字）、在 init 里加 `"securityLevel": "loose"`（对折行没有任何影响）。

### 4. 特殊字符

- `<` 要写成 `#lt;`，`"` 要写成 `#quot;`，否则会被当成 HTML 标签解析。
- 下标/上标直接用 Unicode 字符（`₂` `²` `³` `ⁿ`），不要用 `<sub>` / `<sup>`。

### 5. 「旁注气泡」用 subgraph 表示

原图里那种绿色的旁注气泡，用 subgraph 表达：**标题就是注释文字，框住它注释的分支**。

```
subgraph N1["标题就是注释内容"]
  NodeId
end
style N1 fill:#f4faf0,stroke:#70ad47,color:#000000,font-size:12px
```

- 框太窄时 mermaid 会把标题压掉、或者让节点盖住标题 → 必须**把框开得够宽**（把整条分支包进来，而不是只包一个节点）。
- 注释框标题统一 `font-size:12px`。

### 6. 配色约定

| 用途 | 填充 | 描边 |
| --- | --- | --- |
| 根节点 / 主题色 | `#5b9bd5` | `#41719c` |
| 普通节点 | `#fff` | `#5b9bd5` |
| 原图自带的分组框（如「非线性结构」） | `#e2f0d9` | `#5b9bd5` |
| 额外加的注释框 | `#f4faf0`（更淡） | `#70ad47` |
| 重点 | 白底红框，或深红底白字 | `#c00000` |

### 7. mermaid 版本已锁定

`_config.butterfly.yml` 里 `CDN.option.mermaid` 锁定为 `11.4.1`，**不要去掉**。CDN 上的 `mermaid/dist/mermaid.min.js` 是 "latest"，会随时间变化，换行/排版行为会跟着变，导致「我这里正常、用户那里被裁」这种玄学问题。

### 8. 生成后必须本地验证

```powershell
npx hexo generate
# 用 python -m http.server 起静态服务指向 public/，再 headless Chrome 截图
npx hexo clean
```

放大看截图，重点检查：有没有非预期的折行、有没有文字被裁、subgraph 标题是否完整。

> **这台机器的坑**：系统代理（Clash，`127.0.0.1:7890`）**会把 `127.0.0.1` 的本地请求也接管**，导致 headless Chrome 截出来一片空白。本地截图一律加 `--no-proxy-server`（实测加了就正常）。
>
> 同理，如果截图空白或页面内容异常短，先怀疑「mermaid 根本没跑起来」（CDN 请求被代理拦了），而不是图本身有问题——把待测那张图的源码单独抽出来渲染一遍就能区分。

### 9. 提交与推送

- **改完直接 commit + push，不用再问**（用户 2026-10-11 明确要求「以后记得自动推送」）。`origin` = `git@github.com:zhongweigu/MyBlogRepository.git`，分支 `main`。
- 推送前跑一次 `npx hexo generate` 确认无报错，推送后 `npx hexo clean`。
- 只提交本次任务相关的文件；工作区里用户自己的未提交改动**不要顺手带上**（除非用户说「一并推送」）。
- 临时文件（截图、生成脚本、`public/`、`db.json`）用完清理掉。

### 10. 图后的补充说明用引用块

某张图的内容如果**容易被误读**、或涉及原图没展开的背景，就在**该图正下方**补一行 Markdown 引用块：

`> 注：一句话说清楚。`

- 用 `>` 引用格式，与图之间空一行；
- **一句话讲完**，不要展开成段落（要展开就写进正文）；
- 只给真正需要澄清的地方加，不要每张图都加。

首次这么用的例子：2026-10-11「顺序表」那张图下的补注——「物理上也相邻」在引入分页/虚拟存储后的准确含义（指的是地址空间连续，不是内存物理页框连续）。

### 11. 标签内按词上色（代码高亮那种）

mermaid 只能给**整个节点**配色。要让标签里**某几个词**有颜色（比如代码块的关键字/类型/变量，或强调某个词），在标签里直接写内联 `span`，**并且必须带 `!important`**：

`C1["<span style='color:#1f4e79 !important'>typedef</span> <span style='color:#0f7b6c !important'>LNode</span>{"]`

- **必须加 `!important`**：mermaid 生成的 `<style>` 用 `!important` 把标签颜色钉死了，不加就被压回黑色（实测：HTML 保留下来了，但颜色不生效）。
- 属性用**单引号**（mermaid 标签本身是双引号括起来的）。
- 实测**不行**的两种写法：`<font color="...">`（表现属性优先级最低）、只写 `class` 靠外部 CSS（选择器拼不过 mermaid 的 `!important`）。
- 约定配色：关键字 `typedef` → `#1f4e79`（深蓝）；`struct` 之类 → `#2e7d32`（绿）；类型名（`LNode`/`ElemType`/`LinkList`）→ `#0f7b6c`（青绿）；变量名（`data`/`next`）→ `#7a3e9d`（紫）。
- 首次用例：2026-10-11「单链表的定义」那张图里的 `typedef struct LNode{...}` 代码节点。
