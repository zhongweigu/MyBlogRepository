# 政治复习台 · 维护手册

> 适用对象：以后接手这个页面的 agent。用户会继续发来马原的笔记和书页照片，要求「提取、补进复习台」，**不再改博客帖子**。
>
> 入口：`https://milvelas.cn/politics-review/`（博客友链「复习工具」）。
> 源码：`source/politics-review/`，由 `_config.yml` 的 `skip_render: politics-review/**` 原样复制。

---

## 1. 先记住这几件事

1. **不编辑 `source/_posts/*.md`**。帖子是历史归档；新内容只进复习台。
2. 三科并列，结构见 `assets/js-v8/data/meta.js`：
   - **马原**：六板块 29 专题（`my-01`…`my-29`，长文在 `content/`）；
   - **史纲**：八板块 57 专题（`sx-038`…`sx-094`，来自《27 考研政治一页纸·知识点手册》）；
   - **新思想与法治**：两板块 6 专题（`xz-095`…`xz-100`，同一手册）。
3. 三个模块：**一页纸**（`#/yizhi`，手册 100 个知识点的原卡片 + 彩色圈画，每卡链到知识库）、**知识地图**（`?subject=my|sx|xz`）、**术语库**（按科目筛）。原「今日」队列已撤销，不要再加回。用户明确不要真题、图解、评论、英文版。
4. `topics-pending.js` 现在是空数组，留作以后扩展。
5. 样式直接复用 `/408-review/assets/css/app.css`，本页只加载 `assets/css/politics.css` 做覆写（朱红/青/赭三色、待补标记）。

**一页纸与知识库分工**：`yizhi.js` 是手册原文（颜色来自 PDF 文字层），**不许改写、增删、润色**；知识库专题负责背景、理解与记忆方法，正文高亮对齐手册圈画。

---

## 2. 目录

```
source/politics-review/
├── index.html                     # 壳、主题启动
├── assets/
│   ├── css/politics.css           # 覆写层（accent、pending、小节样式）
│   ├── favicon.svg
│   ├── content/my-XX.html         # 每篇长文，按需 fetch
│   └── js-v8/
│       ├── app.js                 # 路由：yizhi / map / chapter / topic / glossary
│       ├── store.js               # localStorage 进度、复习间隔（1/3/7/15 天）
│       ├── stats.js               # 板块与专题统计（只算非 pending）
│       ├── runner.js              # 回忆模式遮罩
│       ├── article.js             # 公式 / mermaid 按需加载
│       ├── ui.js                  # 图标、footer、通用片段
│       ├── data/
│       │   ├── meta.js            # 科目、板块、横向脉络
│       │   ├── yizhi.js           # 一页纸 100 个知识点（PDF 彩色文字层，勿改写）
│       │   ├── topics-core.js     # 马原 1–29 的速记层
│       │   ├── topics-sx.js       # 史纲 57 个知识点（handbook: true）
│       │   ├── sx-articles.js     # 史纲详细正文（背诵句用 <mark>）
│       │   ├── sx-memory.js       # 史纲记忆方法（why / how）
│       │   ├── topics-xz.js       # 新思想与法治 6 个知识点（handbook: true）
│       │   ├── xz-articles.js     # 新思想与法治详细正文
│       │   ├── topics-pending.js  # 待补占位（当前为空）
│       │   ├── glossary.js        # 术语库
│       │   └── index.js           # 合并、索引
│       └── views/                 # yizhi / map / chapter / topic / glossary
```

---

## 3. 数据模型

专题对象的关键字段：

```js
{
  id: 'my-05',                 // my-XX，XX = 全局专题号，不要改
  chapter: 'my-c2',            // my-c1 … my-c6
  order: 5,                    // 全局专题号，用于排序与「专题 05」显示
  title: '对立统一规律',
  kicker: '一句副标题',
  takeaway: '一句话抓手（背诵清单、每日卡片都用它）',
  recall: '先自问的问题',
  importance: 1~5,
  exam: { types: ['选择', '分析'] },
  points: [{ t: '小节名', lead: '一句能背的线索' }],
  pitfalls: [{ t: '易错点', b: '解释' }],
  links: [{ to: 'my-06', why: '为什么相关' }],
  pending: true                // 只有占位专题写
}
```

- `points` 是速记层，页面顶部的背诵清单、每日队列、术语库都读它；长文在 `content/` 里。
- 统计和队列只看 `!pending` 的专题；`topics-pending.js` 里的专题不参与。
- 术语对象：`{ term, kind: '核心'|'基础', chapter, topic, def }`；`def` 可以直接写行内 HTML。

---

## 4. 写一个新专题（把 pending 变成正式）

1. 在 `content/my-XX.html` 写长文，结构建议：**定义 → 条件 / 关系 → 表格 → 易错点**。参照已完成的 `my-05.html`、`my-13.html`。
2. 在 `topics-core.js` 里补对应对象（points 5~9 条，每条一行能背完）。
3. 把该专题从 `topics-pending.js` 删掉。
4. 补 `glossary.js`：新术语按「核心/基础」加，`topic` 指向该专题。
5. 按需补 `meta.js` 的 `CHAINS` 和专题的 `links`。
6. 如果专题跨了板块（例如社会存在），检查 `chapter` 是否放对。

长文 HTML 约定：

```html
<div class="article-content">
<h2 id="xxx">小节</h2>
<p>正文，可用 <strong> / <code> / <table>。</p>
</div>
<p class="article-source">内容整理自……</p>
```

- 不用写 `<details class="article-toc">`，页面顶部已经有背诵清单和跳转。
- 公式用 `$...$`，页面会自动加载 MathJax；没有公式的页面不会加载。
- 正文不写完整例题和真题（用户明确不要）。

### 4.1 手册类专题（史纲 / 新思想与法治）

这类专题不写 `content/*.html`，内容放在 `data/` 里的两个地方：

- `topics-sx.js` / `topics-xz.js` 的 `points`：**速记层**，一句话一条，供背诵清单、回忆模式使用；
- `sx-articles.js` / `xz-articles.js`：**正文层**，按专题 id 写详细讲解（时间、地点、经过、意义），把手册里的背诵句用 `<mark>` 标出；
- `sx-memory.js`：**记忆方法**，每专题一句「为什么」+ 一句「怎么记」，在正文后渲染。

```js
// topics-sx.js
H('sx-038', 'sx-c1', 1, '三元里抗英与太平天国', '知识点 038',
  '一句话抓手', '先自问的问题', 3, [
    { t: '三元里抗英', lead: '第一次大规模反侵略武装斗争' },
  ])

// sx-articles.js
'sx-038': '<p>1841 年 5 月，广州三元里……<mark>这是中国人民第一次大规模的反侵略武装斗争</mark>。</p>'

// sx-memory.js
'sx-038': { why: '农民是小生产者……', how: '三元里＝第一次反侵略；太平天国＝第一次反封建反侵略。' }
```

- 有 `article` 的专题（史纲 57 篇、新思想与法治 6 篇）由 `articleFromData` 渲染；`memory` 存在时追加「记忆方法」卡片。
- 扩写只改 `sx-articles.js` / `xz-articles.js`，**不要动 `points`**——它是背诵层，越短越好。
- 章节按手册目录分组；`order` 用章内顺序，`id` 保留手册知识点编号（sx-038…sx-094 / xz-095…xz-100）。
- 手册里的口诀、辨析、易错项原样保留；发现原书笔误（如「二十三中」应为二十届三中全会）按正确表述写。
- 新增科目：在 `meta.js` 的 `SUBJECTS` / `CHAPTERS` 增加科目与板块，再建 `topics-xx.js`，在 `data/index.js` 里加入 `TOPICS`；地图会自动出现科目 tab，术语库按科目筛选。

---

## 5. 一页纸板块

- 数据在 `data/yizhi.js`，由 PDF 的彩色文字层直接提取：每个知识点一条，含 `n / subject / topic / title / body`。
- `body` 里的 `<span class="yz-r|b|a|o|p">` 对应 PDF 的红、蓝、浅蓝、橙、紫；**不要改写文字、不要增删内容、不要调换顺序**。
- `topic` 指向知识库专题页；新增或调整卡片时，确认链接能打开对应专题。
- 排序按知识点编号；卡片按知识库章节分组，章节名取自 `meta.js`。
- `views/yizhi.js` 负责渲染与搜索；导航项为 `#/yizhi`，不要再恢复 `#/today`。

---

## 6. 验证与发布

```powershell
npx hexo generate
python -m http.server 8124 --directory public
# 浏览器打开 http://127.0.0.1:8124/politics-review/#/yizhi
```

要看的页面：`#/yizhi`、`#/map`、改动的 `#/topic/<id>`、`#/glossary`；再看一眼 390px 宽度。

- headless Chrome 的 `--window-size=500` 实际视口约 518px，截图右侧会少 18px，**不是布局溢出**；判断是否真溢出，注入脚本量 `document.documentElement.scrollWidth`。
- 本地截图加 `--no-proxy-server`（这台机器的代理会接管 127.0.0.1）。
- 改了 `_config.yml` 才需要 `npx hexo clean`；日常生成后清理 `public/` 即可。

发布：

```powershell
git add source/politics-review docs/politics-review-maintenance.md AGENTS.md _config.yml source/_data/link.yml
git commit -m "…"
git push origin main
```

> **缓存**：Netlify / Cloudflare 对 `assets/*` 可能给 4 小时缓存。改 JS/CSS 必须递增 `assets/js-v8` 目录或 `politics.css?v=...` 与 `index.html` 里的引用。

---

## 7. 不要做

- 不要编辑 `source/_posts/*.md`。
- 不要给一页纸加计划、每日一题、热力图等模块。
- 不要加真题、图解、评论、路线 / 纲领、P0–P3 优先级、英文版。
- 不要把 `pending` 专题放进队列或统计。
- 不要改已有专题 id（进度、链接、脉络都依赖它）。
- 不要把 `public/`、`db.json`、临时截图提交。
