# 408 复习台 · 维护手册

> 适用对象：以后接手这个页面的 agent。用户会持续发来新的考点、知识点和图片，要求「提取、补充、加进复习台」，**不再改博客帖子**。
>
> 页面入口：`https://milvelas.cn/408-review/`（博客友链「复习工具」）。
> 源码：`source/408-review/`，由 Hexo 的 `skip_render: 408-review/**` 原样复制到 `public/408-review/`。

---

## 1. 先记住这几件事

1. **不要编辑 `source/_posts/*.md`。** 帖子是历史归档；新内容只进复习台。
2. **今日页只有一个模块**：每日知识点复习，默认 10 个考点。不要加回计划、每日一题、热力图、复习指引等模块。
3. **考点页是长文，不是几条摘要；但顶部要先给背诵和答法。** 结构是：背诵清单 / 考场答法 → 理解长文 → 图解 → 关联真题。长文要接近一篇小教材：定义、推导、示例片段、表格、图、易错点都要有；**完整例题不放在正文**。
4. **图要放到对应位置。** 用户发的图、原帖里的图、自己画的图，都要落到 `assets/textbook/` 或 `assets/img/`，并在正文相应段落插入，不能只堆在文末；代表一类题型的图再收进 `data/diagrams.js`。
5. **术语和图解是独立入口**：`#/glossary`、`#/diagrams`。不要加评论、路线 / 纲领、P0–P3 优先级、英文版——用户明确不要。

---

## 2. 目录与加载关系

```
source/408-review/
├── index.html                     # 壳、主题启动；公式/图表库按需加载
├── assets/
│   ├── css/app.css                # 设计系统 + 长文排版 + 今日页
│   ├── js-v4/
│   │   ├── app.js                 # 路由、动作、渲染入口
│   │   ├── store.js               # localStorage 进度 / dailyQueue
│   │   ├── article.js             # MathJax / Mermaid 按需增强
│   │   ├── data/
│   │   │   ├── meta.js            # 科目、章节、跨章脉络
│   │   │   ├── ds.js / coa.js     # 原有考点
│   │   │   ├── ds-extra.js        # 新增 DS 考点
│   │   │   ├── coa-extra.js       # 新增 COA 考点
│   │   │   ├── supplements-*.js   # 原有考点的补充点/图/题
│   │   │   ├── questions.js       # 手写精选题
│   │   │   ├── questions-extra.js # 自动抽取题（脚本生成，勿手改）
│   │   │   ├── questions-manual-extra.js # 裸题手工补充
│   │   │   ├── diagrams.js        # 图解库（代表题型）
│   │   │   ├── glossary.js        # 术语（核心手写 + 自动抽取）
│   │   │   └── index.js           # 合并、排序、索引
│   │   ├── views/today.js         # 今日页（单模块）
│   │   ├── views/topic.js         # 考点页壳 + 背诵/答法/图解 + 长文 fetch
│   │   ├── views/glossary.js      # 术语库
│   │   ├── views/diagrams.js      # 图解库
│   │   └── ...
│   ├── content/<topic-id>.html    # 每篇长文（按需 fetch）
│   ├── textbook/*.webp            # 从帖子复制/压缩的原图
│   └── img/*.webp|*.svg           # 补充图 + 自绘 SVG（含地址翻译全链路）
└── ...
```

脚本：`scripts/build-review-content.py`（切长文、压图片、删正文例题）、`scripts/extract-questions.py`（抽取题库）。

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
- 答案、例题解析**不进正文**；正文里只保留非题目的补充说明，用 `<details class="article-details"><summary>…</summary>` 折叠。
- 标题层级：文章用 `h2`，小节用 `h3`；不再给例题留 `h4`。
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

题库分三层：

- `data/questions.js`：手写/早期的 29 道精选题，保留。
- `data/questions-extra.js`：由 `scripts/extract-questions.py` 从两篇《408 考点强化》自动抽取，**不要手改**。
- `data/questions-manual-extra.js`：源帖里没有 `<u>例题` 标记、但确实完整的“裸题”（例如 2010 队列、2025 复杂度、习题训练四题），手工补。

字段：

```js
{
  id: 'q-2024-ds-xx',
  year: 2024,              // 没有年份就写 null，并用 label
  no: '12',                // 没有题号就写 ''
  label: '例题',            // 无年份/题号时显示
  subject: 'ds', chapter: 'ds-5', topics: ['ds-5-2'],
  type: '选择', difficulty: 1~5, score: '2 分',
  stem: '题干（可含 <code>、<pre>、图）',
  options: ['A 选项', …],   // 综合题可省略
  answer: 'B',             // 综合题可省略
  analysis: `<p>解析…</p>`
}
```

规则：

- **所有完整例题、真题都进题库**；知识点正文里**不再保留任何例题/解析**。生成器会自动删 `<u>例题` / `<u>练习` / `查看答案解析` / `## 习题训练` / “小例题”折叠块。
- **“存储专题”里的小例题不记录**：没有选项、没有分问、篇幅很短的说明性小例，不是完整题目。自动抽取会跳过 `not year and not options and not numbered_parts and len(stem)<120` 的块；正文里也会删掉“小例题”折叠块。
- 自动抽取的题会按 `topics` 自动挂回考点页；不需要再改 `topic.questions`。手写题仍保留原来的 id。
- 每题必须有 `topics` 指向相关考点；解析里写清楚“怎么想到 / 易错点”，能链回考点。
- 重新抽取：
  ```powershell
  python scripts/extract-questions.py
  ```
  然后重新生成正文（见 3.3），因为正文里的例题也要同步删除。

### 3.6 背诵清单 / 考场答法 / 图解（自动派生）

考点页顶部不再只有“一句话抓手”，而是：

1. **背诵清单**：`takeaway` + `points` 的 `t` / `lead` + `recall`。所以 `points` 要写得短、能背；长文放 `content/<id>.html`。
2. **考场答法**：`takeaway` + 前 4 个 `points.t` + 第一个 `pitfalls[0].b` 自动拼成“定义 → 要点 → 收口”。如果这一题的答法很特殊，可以之后再给 topic 加手写 `answer` 字段（当前页面会优先用自动版）。
3. **图解**：文章加载后自动抽取前 4 张 `.article-figure`，加上 `figures` 里的自绘 SVG。要新增“代表一类题型”的图，优先放进 `data/diagrams.js` 和图解库；考点页的图仍以正文位置为准。

### 3.7 术语库与图解库

- `data/glossary.js`：`CORE_TERMS` 手写核心术语；其余从 52 个考点的 `points` 自动抽取（术语 = 知识点标题，释义 = `lead`）。术语页支持科目筛选和搜索。
- `data/diagrams.js`：`DIAGRAMS` 每项字段：
  ```js
  { id, subject: 'ds'|'coa', group, topic, title, src, caption, why }
  ```
  `src` 必须是 `assets/img/` 或 `assets/textbook/` 下真实存在的文件；`why` 写“这类题怎么用这张图”。新增图先想清楚它代表哪一类题型，不要把所有插图都搬进去。
- 术语 / 图解都从顶部导航进入；移动端底部导航也有入口。

---

## 4. 今日页规则

- 只保留 **每日知识点复习** 一个模块。
- `store.dailyQueue(10)`：到期优先，不足 10 个用新考点补齐；全部学完且无到期时，从薄弱考点抽查。
- 不要加回：今日三件事、每日一题、每日一点 tab、复习指引、科目进度、连续天数、热力图、7 天预测。
- 改数量：`today.js` 的 `DAILY_LIMIT`、`app.js` 的 `store.dailyQueue(10)` 两处一起改。
- 每项「复习」按钮走 `start-topic-runner`，整页「开始今日复习」走 `start-queue`。

---

## 5. 验证与发布

**默认只做快速验证，不每次跑全量：**

```powershell
npx hexo generate
# 只有改了 _config / 路由 / 数据合并逻辑，或生成结果异常时才：
# npx hexo clean && npx hexo generate
```

快速验证（2~3 个页面）：

1. 打开本次改动的考点页：长文加载、公式/图正常、没有横向溢出；
2. 如果改了题目：打开 `#/questions`，确认题数、题目和解析出现，再点一次对应考点链接；
3. 390px 宽度看改动页；
4. 只检查本次涉及的 `assets/content/<id>.html` 和图片是否 200，不需要遍历全部 52 篇。

**全量 52 篇只在以下情况跑**：改了路由、数据 schema、批量图片重写、模板/CSS 大改。日常加一个知识点或一道题，不要跑全量。

发布：

```powershell
git add source/408-review docs/408-review-maintenance.md AGENTS.md scripts/build-review-content.py scripts/extract-questions.py
git commit -m "…"
git push origin main
```

Netlify 由 `npm run netlify`（`hexo clean && hexo generate`）构建，发布 `public`。推送后等 1~2 分钟，只验本次改动页 + 一个入口。

> **缓存（重要）**：Netlify / Cloudflare 对 `/408-review/assets/*` 仍可能返回 `max-age=14400`，普通刷新会继续用旧 JS。**每次改 JS/CSS，必须递增版本**：把 `assets/js-vN` 改成下一个 `js-v(N+1)`（同时改 `index.html` 的入口、本手册与 `guide.js` 里的路径），或至少改 `index.html` 里 `app.css?v=...`。只改文件内容、不改 URL，用户很可能看不到更新。

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

## 7. 用户发来图片 / 知识点 / 真题时

用户以后只发图片、笔记或一句知识点，不再改帖子。收到后按这个顺序处理：

1. **先归类**：是“知识点/图解”还是“完整题目”？
   - 完整题目（有题干、选项或分问，能独立做）→ 进真题。
   - 只是两三行的说明性小例 → 不记录；可以吸收成正文里的一句话。
2. **提取与补全**：读图/读笔记，先写出一句结论和 3~6 个关键词；缺的背景自己补，但不要把猜的当原文。
3. **画图或截图**：
   - 结构、字段、流程、访问路径这类“要画得像课本”的图，用 SVG 重画（纸色/墨色/青红配色，参考 `coa-address-path.svg`）。
   - 原图本身就是课件截图、指针链、带权图、代码截图的，直接压缩后放到 `assets/textbook/`，在对应段落插入；不要硬转 mermaid。
   - 代表一类题型的图，同时加入 `data/diagrams.js` 和图解库。
4. **融进已有体系**：先找它属于哪科、哪章、哪个考点；优先补现有 `points` / `content/<id>.html` / `supplements-*`，不要新建孤立页面。确实没有合适考点时才建新 topic，并补 `chapter/order/title/kicker/takeaway/points`。
5. **写成学习卡**：背诵清单（能直接背的短句）→ 理解（推导、例子、表格、图）→ 考场答法（怎么开头、怎么收口、易错）。正文里**不放完整例题**。
6. **题目入库**：能自动识别的走 `scripts/extract-questions.py`；裸题补到 `questions-manual-extra.js`。每题写 `topics`、答案和解析；解析最后一句尽量点出“这题在考哪个考点”。同时从正文里删掉这道题。
7. **顺手更新术语/图解**：新术语加到 `CORE_TERMS` 或依赖自动抽取；新代表图加到 `DIAGRAMS`。
8. **快速验证**：只查本次改动的 2~3 个页面 + 一个 390px 宽度，不必每次全量跑 52 个考点。改数据/图片时 `npx hexo generate` 即可；只有配置或缓存异常才 `clean`。推上去后只验一个入口 + 一个改动页。
9. **提交**：源帖不改；只提交复习台、脚本和手册相关文件。

---

## 8. 不要做

- 不要编辑 `source/_posts/*.md`（用户明确说帖子不再改）。
- 不要为了「统一」把详细内容压成 3 条要点。
- **知识点正文里不要保留完整例题或答案解析**；完整题目一律进真题。存储专题里“没有选项、没有分问”的小例题不录。
- 不要手改 `data/questions-extra.js`（重新抽取会覆盖）；裸题放 `questions-manual-extra.js`。
- 不要把原帖图片只放文末；要放到对应段落。
- 不要给今日页加回旧模块。
- 不要改已有考点 id（真题、链路、进度都依赖它）。
- 不要在同一个章节里让两个考点 `order` 相同。
- 不要把 `public/`、`db.json`、`.tmp*` 提交。
- 不要在没有本地验证的情况下直接承诺线上正常。
- **不要加**：评论、路线 / 纲领、P0–P3 优先级筛选、英文版 / 中英切换。用户明确不要这些。
- **样式**：参考 `docs.cpl.icu/kangaroo-review/site/` 的编辑型阅读感——网格纸、衬线标题、硬边卡片、红色索引；不要改回大圆角 + 渐变阴影。
- **改 JS/CSS 必须递增版本**（`js-vN` / `app.css?v=`），否则 CDN 4 小时缓存会让用户看不到更新。

---

## 9. 已知取舍

- 长文由帖子生成时，`points` 仍是速记层；两者不要求一一对应。
- 背诵清单 / 考场答法由 `points` 自动派生，所以 `points` 的标题和一句线索要写清楚；特殊题型之后再手写覆盖。
- 术语库的大部分释义来自 `points.lead`，核心术语才手写；发现释义太薄时，先补 `points.lead` 或把词加进 `CORE_TERMS`。
- MathJax / Mermaid 走 jsDelivr CDN，**按需加载**（只有文章里出现公式 / mermaid 才注入脚本）；加载失败时公式/图退化为原始文本，正文仍可读。
- `coa-5-2`（中断与 I/O）原帖没有对应长文，`content/coa-5-2.html` 是手写补充；后续可直接扩写该文件。
- 今日队列是考点级，不是知识点级；`points` 用于搜索/速记，不单独记录 SRS 进度。
- 题库是“完整题目”优先：自动抽取会跳过没有年份、没有选项、没有分问的短小例；如果发现漏题，先检查它是否有 `<u>例题`/`<u>练习` 标记，没有就补到 `questions-manual-extra.js`。
- 自动抽取的题干和解析来自原帖；如果原帖解析太薄，先在 `questions-manual-extra.js` 补，或在源帖补充后再抽取。
- Netlify / Cloudflare 对 `assets/*` 可能仍给 4 小时缓存；当前用 `js-vN` 目录 + CSS query 版本化绕过，发布后让用户走一次新 URL。
