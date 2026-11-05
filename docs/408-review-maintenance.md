# 408 复习台 · 维护手册

> 适用对象：以后接手这个页面的 agent。用户会持续发来新的考点、知识点和图片，要求「提取、补充、加进复习台」，**不再改博客帖子**。
>
> 页面入口：`https://milvelas.cn/408-review/`（博客友链「复习工具」）。
> 源码：`source/408-review/`，由 Hexo 的 `skip_render: 408-review/**` 原样复制到 `public/408-review/`。

---

## 1. 先记住四件事

1. **不要编辑 `source/_posts/*.md`。** 帖子是历史归档；新内容只进复习台。
2. **今日页只有一个模块**：每日知识点复习，默认 10 个考点。不要加回计划、每日一题、热力图、复习指引等模块。
3. **考点页是长文，不是几条摘要。** 每个考点应接近一篇小教材：定义、推导、例子、表格、图、易错点、真题都要有；形式按内容走，不要硬凑「123 + 表格」。
4. **图要放到对应位置。** 用户发的图、原帖里的图、自己画的图，都要落到 `assets/textbook/` 或 `assets/img/`，并在正文相应段落插入，不能只堆在文末。

---

## 2. 目录与加载关系

```
source/408-review/
├── index.html                     # 壳、MathJax/Mermaid CDN、主题启动
├── assets/
│   ├── css/app.css                # 设计系统 + 长文排版 + 今日页
│   ├── js/
│   │   ├── app.js                 # 路由、动作、渲染入口
│   │   ├── store.js               # localStorage 进度 / dailyQueue
│   │   ├── article.js             # MathJax / Mermaid 增强
│   │   ├── data/
│   │   │   ├── meta.js            # 科目、章节、跨章脉络
│   │   │   ├── ds.js / coa.js     # 原有考点
│   │   │   ├── ds-extra.js        # 新增 DS 考点
│   │   │   ├── coa-extra.js       # 新增 COA 考点
│   │   │   ├── supplements-*.js   # 原有考点的补充点/图/题
│   │   │   ├── questions.js       # 真题
│   │   │   └── index.js           # 合并、排序、索引
│   │   ├── views/today.js         # 今日页（单模块）
│   │   ├── views/topic.js         # 考点页壳 + 长文 fetch
│   │   └── ...
│   ├── content/<topic-id>.html    # 每篇长文（按需 fetch）
│   ├── textbook/*.webp            # 从帖子复制/压缩的原图
│   └── img/*.webp|*.svg           # 补充图 + 自绘 SVG
└── ...
```

- 考点页只加载当前那篇 `content/<id>.html`，不会把 50 篇长文塞进主 JS。
- 图片是普通静态文件，靠 `skip_render` 复制。
- 进度只存浏览器 `localStorage`，没有后端。

---

## 3. 新增 / 修改一个考点

### 3.1 选位置

先看 `data/meta.js` 里的 `CHAPTERS`：

- 数据结构 6 章：`ds-1` 复杂度、`ds-2` 线性、`ds-3` 树、`ds-4` 图、`ds-5` 查找、`ds-6` 排序
- 组成原理 5 章：`coa-1` 概述、`coa-2` 数据表示、`coa-3` 存储、`coa-4` 指令与 CPU、`coa-5` 总线与 I/O

新考点加到对应章节的 `ds-extra.js` / `coa-extra.js`；如果只是给已有考点补内容，改 `supplements-ds.js` / `supplements-coa.js`，或直接改 base 文件。

### 3.2 数据字段（最少）

```js
{
  id: 'ds-2-8',              // 稳定 id，别改；问题/链路都靠它
  chapter: 'ds-2',
  order: 8,                  // 同章唯一，不能和已有 order 重复
  title: '考点标题',
  kicker: '一句副标题',
  takeaway: '一句话抓手，复习队列和页面顶部会用到',
  recall: '回忆模式的问题，2~3 个关键词或一条结论',
  importance: 1~5,
  exam: { types: ['选择'], years: [2017, 2023], score: '2 分' },
  points: [                  // 供每日队列/搜索/速记，不必等于长文
    { t: '小节名', lead: '一句线索', body: '<p>…</p>' }
  ],
  pitfalls: [{ t: '易错点', b: '解释' }],
  links: [{ to: 'ds-2-5', why: '为什么相关' }],
  questions: ['q-2017-ds-1']
}
```

- `order` 必须同章唯一；`data/index.js` 会按 `order` 排序。
- 新考点会出现在地图、章节页、搜索、今日队列、上一/下一考点里，不需要手改导航。
- `points` 仍然要写，但它是「速记层」，不是页面正文；页面正文在 `content/<id>.html`。

### 3.3 长文正文

有两种做法：

**A. 从站内帖子生成（推荐，适用于已有帖子）**

`scripts/build-review-content.py` 把源帖子按 `MAPPING` 里的标题片段切段，生成 51 篇长文 + 图片：

```powershell
python scripts/build-review-content.py
```

依赖：`markdown`、`beautifulsoup4`、`Pillow`（当前环境已装）。

- 映射在脚本顶部的 `MAPPING`：`topic id -> [(source, 标题片段, 选项)]`。
- 生成：`assets/content/<id>.html`、`assets/textbook/*.webp`。
- 源帖子只读，不要改。
- 新增文章时，在 `MAPPING` 里加一段；标题片段必须唯一，否则脚本会报错。
- 生成后仍要人工检查页面，尤其是图的位置、公式、表格。

**B. 手写长文（适用于用户新发的笔记/图片）**

直接写 `assets/content/<id>.html`，建议结构：

```html
<details class="article-toc">
<summary>本页目录 <span>N 节</span></summary>
<div class="toc"><ul>…</ul></div>
</details>
<div class="article-content">
  <h2>一级小节</h2>
  <p>…</p>
  <h3>二级小节</h3>
  <p>…</p>
  <table>…</table>
  <figure class="article-figure">
    <a class="figure-link" href="/408-review/assets/textbook/xxx.webp"
       data-action="zoom-image" data-src="/408-review/assets/textbook/xxx.webp"
       data-caption="图注">
      <img class="article-img" src="/408-review/assets/textbook/xxx.webp" alt="图注" loading="lazy">
    </a>
    <figcaption>图注</figcaption>
  </figure>
  <details class="article-details"><summary>查看答案解析</summary>…</details>
</div>
<p class="article-source">内容整理自……</p>
```

- 公式写 `$...$` / `$$...$$`，MathJax 会渲染；不要把公式转成图片。
- Mermaid 写 `<pre class="mermaid">…</pre>`，页面会渲染；失败时保留代码。
- 答案、例题解析用 `<details class="article-details"><summary>…</summary>`，默认折叠。
- 标题层级：文章用 `h2`，小节用 `h3`，例题用 `h4`；TOC 会自动生成（手写时自己维护）。
- 正文长度按内容需要，不要为了「结构统一」把内容压成 3 句话。

### 3.4 图片

- **原帖图片**：`scripts/build-review-content.py` 会复制/压缩到 `assets/textbook/<前缀>-<原名>.webp`，并把正文路径改绝对。原帖里所有被选中段落的图片都会带进来。
- **用户新发的图片**：
  1. 文件名用可读英文短横线，例如 `b-tree-split.webp`；
  2. 长边压到 1200~1500，WebP quality 90；
  3. 放到 `assets/textbook/`（原帖图）或 `assets/img/`（自绘图/补充图）；
  4. 在正文对应段落插 `<figure class="article-figure">`，路径用 `/408-review/assets/...`；
  5. 图注写清楚「这张图在讲什么」，不要只写文件名。
- **自绘图**用 SVG，保持纸色/墨色/青绿/琥珀色系，放在 `assets/img/`；参考已有的 `ds-stack-queue.svg`、`coa-pipeline.svg`。
- 图片点击会走 `data-action="zoom-image"` 放大；没有这个属性的 `<img>` 只能看小图。

### 3.5 真题

`data/questions.js` 里加题；字段：

```js
{
  id: 'q-2024-ds-xx', year: 2024, no: '12', subject: 'ds', chapter: 'ds-5',
  topics: ['ds-5-2'], type: '选择', difficulty: 1~5, score: '2 分',
  stem: '题干（可含 <code>、<pre>、图）',
  options: ['A 选项', …],
  answer: 'B',
  analysis: `<p>解析…</p>`
}
```

然后在对应 topic 的 `questions` 里加 id；真题库、考点页、搜索都会自动出现。

---

## 4. 今日页规则

- 只保留 **每日知识点复习** 一个模块。
- `store.dailyQueue(10)`：到期优先，不足 10 个用新考点补齐；全部学完且无到期时，从薄弱考点抽查。
- 不要加回：今日三件事、每日一题、每日一点 tab、复习指引、科目进度、连续天数、热力图、7 天预测。
- 改数量：`today.js` 的 `DAILY_LIMIT`、`app.js` 的 `store.dailyQueue(10)` 两处一起改。
- 每项「复习」按钮走 `start-topic-runner`，整页「开始今日复习」走 `start-queue`。

---

## 5. 验证与发布

每次改完：

```powershell
npx hexo clean
npx hexo generate
```

检查：

1. `public/408-review/assets/content/` 有所有 `content/<id>.html`；
2. `public/408-review/assets/textbook/` 图片数量与源引用一致；
3. 本地起 `python -m http.server 8765` 指向 `public/`（注意系统代理对 localhost 的干扰，Chrome 用 `--no-proxy-server`）；
4. 打开 3~5 个 representative 考点：
   - 长文加载出来，不是「正在展开全文」；
   - TOC 可展开，标题层级正确；
   - 公式渲染、Mermaid 渲染；
   - 图在对应段落、能点开；
   - 390px 手机宽度无横向溢出；
5. 真题深链 `#/questions?q=<id>` 能定位；
6. 全站搜索能搜到新考点；
7. 无 404（尤其 `assets/content/<id>.html`、`assets/textbook/*`）。

发布：

```powershell
git add source/408-review docs/408-review-maintenance.md AGENTS.md scripts/build-review-content.py
git commit -m "…"
git push origin main
```

Netlify 由 `npm run netlify`（`hexo clean && hexo generate`）构建，发布 `public`。推送后等 1~2 分钟，用无痕窗口验证线上。

---

## 6. 用户发来新内容时的流程

1. **读图/笔记**：先判断属于哪科、哪章、哪个考点；是和已有考点相关，还是新考点。
2. **决定落点**：
   - 已有考点：补 `supplements-*` 或改对应 base 数据；长文可以追加到 `content/<id>.html`。
   - 新考点：在 `*-extra.js` 加对象，分配稳定 id 和同章唯一 order。
3. **提取信息**：定义、条件、公式、步骤、例子、易错点、与相邻考点的关系。
4. **补充**：原帖/笔记没讲清的地方，用教材口径补足；不要只复述一句话。
5. **配图**：图片压缩后放进 assets，插到对应段落；能自绘的结构图用 SVG。
6. **交叉链接**：`links`、`CHAINS`（如果形成跨章线索）、真题 `topics`。
7. **写长文**：按第 3.3 节；先保证内容，再考虑版式。
8. **验证**：第 5 节。
9. **提交**：自动 commit + push；只提交本次相关文件；`public/`、`db.json`、临时截图不提交。

---

## 7. 不要做

- 不要编辑 `source/_posts/*.md`（用户明确说帖子不再改）。
- 不要为了「统一」把详细内容压成 3 条要点。
- 不要把原帖图片只放文末；要放到对应段落。
- 不要给今日页加回旧模块。
- 不要改已有考点 id（真题、链路、进度都依赖它）。
- 不要在同一个章节里让两个考点 `order` 相同。
- 不要把 `public/`、`db.json`、`.tmp*` 提交。
- 不要在没有本地验证的情况下直接承诺线上正常。

---

## 8. 已知取舍

- 长文由帖子生成时，`points` 仍是速记层；两者不要求一一对应。
- MathJax / Mermaid 走 jsDelivr CDN，**按需加载**（只有文章里出现公式 / mermaid 才注入脚本）；加载失败时公式/图退化为原始文本，正文仍可读。
- `coa-5-2`（中断与 I/O）原帖没有对应长文，`content/coa-5-2.html` 是手写补充；后续可直接扩写该文件。
- 今日队列是考点级，不是知识点级；`points` 用于搜索/速记，不单独记录 SRS 进度。
