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

行长的**真正判据不是字数，而是「本地渲染时这一行有没有被再折一次」**：没被折，说明文字宽度没超出框，用户那边（同机同字体）也不会裁；被折了就说明超了，必须回退或加大 `padding`。字数只是经验参考（16px 字号下，18 字以内一直安全；实测 30 字的单行也能过，只要不折）。

**简单/层级浅的图要主动把行写长**：用户明确反馈过「简单的图右半空一大块」。这种情况把叶子标签合并成单行、让框往右铺满正文栏（例如「双链表」那张：7 条要点全部合成单行，图宽从约 700px 变成铺满约 950px）。别指望动 padding 来加宽——它只影响框与文字的留白，不影响折行。

**排版标准（用户 2026-10-11 明确）**：每个标签都**能一行就一行，顶到放不下才断**——是**贪心填满**，不是按语义断句。安全单行宽度实测约 **≤500px**（16px 字号下约 30 个汉字）；合并后超过 500px 才回退断行。

工具：临时目录 `reflow.js` —— 先把标签里的 `<br>` 全部合并，再用 500px 贪心重排（跳过含内联 `<span>` 或 `{}` 代码的标签，别打乱代码和按词上色）。2026-10-11 用它一次性把 9 张图里 **40 条标签合并成单行**，各图宽度普遍从约 700px 铺到约 950px，右半的空白基本消失。

⚠️ 合并完**必须本地渲染确认没有一行被再折**（有一条被折就说明那一行超了 500px，要回退断行）。另外注意：合并后会出「两个短句被硬拼成一句」的情况（例如标题里的「…+ 运算即定义数据结构」「设计一个好的数据结构设计一个好的算法」），要手动补上分隔符（「，」或「 / 」）。

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
- 注释框标题统一 `font-size:12px`（注意：这条会引出下面 5.1 那个 200px 的坑）。

#### 5.1 标题宽度：mermaid 写死 200px，已用 CSS 解除（2026-10-11）

**症状**：注释框标题「显示不全」——文字在框边缘被硬生生截断（不是换行，是右边少了一截）。

**机制**（读 `mermaid@11.4.1` 源码 + 实测 DOM 确认）：subgraph 标题由 `createText(..., width)` 生成，**`width` 默认硬编码 200**，`style N1 ...` 里给的 `font-size` 是**量完尺寸之后**才套上去的（`et(e)` → `m.labelStyle`，在 `C.attr('width', ...)` 之后）。也就是说：

- mermaid 先按**默认字号（约 18~20px）**量标题宽度，超 200px 就把 div 改成 `display:table; white-space:break-spaces; width:200px`（折行分支），否则保持 `display:table-cell; white-space:nowrap; max-width:200px`（不折分支）；
- 量完才把标题改成 12px。于是这个 200px 的上限是按「18~20px 的标题」定的，**按 12px 显示时早就不够用了**；
- 折行分支下多出来的行会被节点盖住，不折分支下文字直接溢出 200px 被 `foreignObject` 裁掉。**同一份 markdown 在不同浏览器/缩放比下走哪个分支都可能不一样**，所以用户那边看到截断、我本地却是两行——这正是「本地正常不代表没问题」的又一处。

**解法**（已写进 `_config.butterfly.yml` 的 `inject.head`，全站生效，改动只有这一行 CSS）：

```css
.cluster-label foreignObject > div{max-width:none !important;display:table !important;margin:0 auto !important}
```

- `max-width:none` → mermaid 量到的宽度就是文字真实宽度，永远不会等于 200，**折行分支再也不会被触发**（不再有折行/裁字的二选一）；
- `display:table` + `margin:0 auto` → 让文字在 `foreignObject` 里水平居中。**少了这句文字会偏左** `(FO宽-文字宽)/2`；（实测基线里「注意审题：带头否？」就偏左了 30 多像素）
- **选择器绝对不能加 `.mermaid-wrap` 前缀**：量尺寸时标签还在 mermaid 的临时容器（挂在 `body` 下）里，加前缀匹配不到，量完再套上就晚了。
- 副作用：框会按「18~20px 量出来的标题宽」撑宽一点点（比文字实际需要的宽），所以标题两侧留白对称，看着正常。

**有了这条 CSS 之后，注释框标题仍然建议 ≤ 20 个汉字**：标题现在是**单行铺开**，太长会把框撑得很宽，整张图缩小得更多。

**验证方式**（可复用）：`npx hexo generate` 之后，把 `public/<文章路径>/index.html` 复制一份、在 `</body>` 前插一段测量脚本，起 `python -m http.server` 指向 `public/`，再用 headless Chrome `--dump-dom` 读结果。每条标题要看的指标：`offCenter`（文字中心 − 框中心，应为 0）、`divH`（一行应为 1 个行高）、以及 `foW` 与 `textW`。截图渲染注意 `--no-proxy-server`、`--virtual-time-budget=30000`，窗口给足高度。

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

### 12. 按层级配色（层次感）

所有节点都一个白底蓝框会显得「没有层次」。每张图按深度分配样式（根节点算**第 1 层**，`lvlN` 里的 N 是「根下面第 N 级」）：

| 层级 | classDef |
| --- | --- |
| 根节点（第 1 层） | `root`：`fill:#5b9bd5,stroke:#41719c,color:#fff,font-weight:bold` |
| 第 2 层 | `lvl1`：`fill:#9dc3e6,stroke:#2e6da4,stroke-width:2px,color:#0d2f4d` |
| 第 3 层 | `lvl2d` / `lvl2l`：白底 或 `#dbe8f6` 底，边 `#1f4e79` 或 `#c3d9ef` |
| 第 4 层 | `lvl3d` / `lvl3l`：同上（`stroke-width:2px`） |
| 第 5 层及更深 | `lvl4d` / `lvl4l`：同上（`stroke-width:1.5px`） |
| 重点 | `key`：白底红框，**覆盖**层级色 |

**第 3 层起，每一层各自深浅交替**（用户 2026-10-11 定的规则，试了三档后选了「底色交替」这一档）：

- **分组方式**：把该层的节点按「父节点」分成若干组（同一个父节点的兄弟是一组），**组与组之间一深一浅交替**——第 1 组深（`d`）、第 2 组浅（`l`）、第 3 组深……组的先后 = 父节点在源码里出现的先后（也就是图上自上而下的顺序）。
- **每层各算各的**：第 3 层按「二级分支」分组交替；第 4 层重新按「第 3 层的父节点」分组交替；第 5 层同理。**父节点自己是什么底色不影响子节点的深浅**——踩过：第一版让整条分支同色（第 4 层跟着分支走），用户指出「第四层也是交错的，父节点什么底色无所谓」。实际效果例如「单链表的操作」图中：插入的孩子是深底、删除的孩子是浅底、按位查找的孩子又深、Key 的孩子又浅。
- 具体配色：深 = `fill:#dbe8f6,stroke:#1f4e79`；浅 = `fill:#f6fafe,stroke:#c3d9ef`；描边宽度沿用该层原本的宽度（第 3、4 层 2px，第 5 层 1.5px）。
- **只有根节点和第 2 层不参与交替**，保持原样。
- 红框（`key`）节点**照常在最后单独 `class … key;`**，它的 `fill:#fff` 会盖掉深浅底，红框不受影响。

**字号也按层级递推**（以该图的 `themeVariables.fontSize` 为基准，实测各图基准是 14 或 16）：根 +4px、第 2 层 +3px、第 3 层 = 基准、第 4 层 −1px、第 5 层 −2px。例如基准 16 时是 20/19/16/15/14。

写法：每个图的 `classDef` 区加上需要的 `lvlNd/lvlNl`，再 `class <该层所有节点id> lvlNd;` 这样分组。

- **一层给实色底、往下逐级变白、边线逐级变浅**。实测更细的渐变（例如一层只给 `#bdd7ee`）肉眼几乎看不出差别，必须拉开对比度。
- **深浅差异要够大**：相邻两组的区别如果只靠边框色（深 `#2e6da4` / 浅 `#9dc3e6`）区分，用户反馈「看起来不太明显」；现在改成的「底色交替」才够明显。
- **字号分级安全、加粗分级不安全**：mermaid 量宽度时会用节点自己配的 `font-size`（所以字号分级不会裁字，实测过），但 `font-weight:bold` 加粗后实际渲染更宽而**不计入测量**，长标签会裁字——所以层次一律用**字号 + 颜色**表达，不要用加粗。
- 红框节点（`key`）**同时挂层级 class 和 key**（`class S1 lvl1,key;`），这样它保留自己那层的字号，只是边框红色。`classDef` 里 `key` 必须排在 lvl1~lvl4 **之后**，否则覆盖不掉颜色。
- 节点一多手写 class 容易漏（踩过：漏写一个节点，它掉了 mermaid 默认蓝底）。用脚本从边表算深度后自动分配；副本见临时目录的 `assign-levels.js`（2026-10-11 用它一次性改了全部 8 张图）和 `band-fills.js`（同日用它把全部 10 张图改成深浅交替；脚本从 `-->` 边表算层级，逐层按父节点分组、组间奇偶交替，保留各图原有字号）。

### 13. 追加新图

- 新图按教材顺序**追加到文章末尾**。
- **`apply_patch` 的锚点必须唯一**：同一篇文章里 `style A1 …`、`class Root root;`、`"padding": 4,` 这类行会在多张图里重复（注释框 id 都是 `A1`）。锚到这种行会把新图插到中间——踩过：把「双链表」插到了「单链表的定义」和「单链表的操作」之间。稳妥做法是锚在**最后一块独有的行**（比如前一版 classDef 里带唯一节点 id 的那行），或者直接用脚本按 `Root["…"]` 重排。
- 追加完用 `Select-String 'Root\["'` 列一遍所有图的根节点，确认顺序。
