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
    "nodeSpacing": 10,
    "rankSpacing": 26,
    "curve": "basis",
    "htmlLabels": true,
    "subGraphTitleMargin": { "top": 0, "bottom": 14 }
  }
}}%%
```

- `fontFamily` 里的双引号必须转义成 `\"`。写成单引号会让**整段 `%%{init}%%` 静默失效**——主题色全丢，节点变成 mermaid 默认的淡紫色，且不报错。
- `fontFamily` 要与站点字体对齐，否则「量字宽」和「实际渲染」用两套字体，尺寸会算错。

### 3. 换行：这是最容易翻车的地方

mermaid 量出来的字宽比实际渲染窄约 **15%**，而节点内边距只有约 **30px**。所以：

- 所有长标签都**手写 `<br>` 断行**，不要指望自动换行——用户的浏览器上它经常完全不换行，字直接顶出框被裁掉。
- **每行不超过约 11 个汉字**（西文约 18 个字符）。超过这个长度，15% 的误差就撑破内边距：能自动换行的浏览器里那行会再折一次（看起来莫名其妙），不换行的浏览器里则直接裁掉。
- 长标签不要用带 `font-weight:bold` 的 class，加粗会让实际宽度再涨一截，更容易溢出。

> **已实测**：`flowchart.wrappingWidth`（自动折行）在用户的环境里**不生效**——2026-10-11 用「时间复杂度」那张图做过对比实验，设了 `wrappingWidth: 176` 之后，本地渲染正常折行，但用户在浏览器上看仍然不折行、文字被裁。同一次实验里前两张图（手写 `<br>`）显示正常。
>
> 又试了「HTML 标签」这条路：同一天在第三张图的 init 里加了 `"securityLevel": "loose"`（`strict` 会限制 HTML 标签，本来怀疑是它让标签退化成 SVG `<text>`、从而无法按容器宽度折行），去掉手写 `<br>` 后推上去——**用户那边依然不折行**。
>
> 结论：**必须手写 `<br>`**，`wrappingWidth` 和 `securityLevel: loose` 两条路都已实测无效，不要再试了。真要根治得从主题渲染脚本或 mermaid 版本层面查（当前进度到此为止）。

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

### 9. 提交与推送

- 只提交本次任务相关的文件；工作区里用户自己的未提交改动**不要顺手带上**，除非用户明确说「一并推送」。
- 只有用户明确说「推送」时才 commit + push（`origin` = `git@github.com:zhongweigu/MyBlogRepository.git`，分支 `main`）。
- 临时文件（截图、生成脚本、`public/`、`db.json`）用完清理掉。
