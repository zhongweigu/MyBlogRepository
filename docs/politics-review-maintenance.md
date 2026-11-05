# 政治复习台 · 维护手册

> 适用对象：以后接手这个页面的 agent。用户会继续发来马原的笔记和书页照片，要求「提取、补进复习台」，**不再改博客帖子**。
>
> 入口：`https://milvelas.cn/politics-review/`（博客友链「复习工具」）。
> 源码：`source/politics-review/`，由 `_config.yml` 的 `skip_render: politics-review/**` 原样复制。

---

## 1. 先记住这几件事

1. **不编辑 `source/_posts/*.md`**。帖子是历史归档；新内容只进复习台。
2. 只有 **马原** 一科。六个板块、29 个专题，结构见 `assets/js-v4/data/meta.js`。
3. 三个模块：**今日**（每日 8 个专题）、**知识地图**、**术语库**。用户明确不要真题、图解、评论、英文版。
4. 29 个专题全部已写；`topics-pending.js` 现在是空数组，留作以后扩展。
5. 样式直接复用 `/408-review/assets/css/app.css`，本页只加载 `assets/css/politics.css` 做覆写（朱红主色、待补标记）。

---

## 2. 目录

```
source/politics-review/
├── index.html                     # 壳、主题启动
├── assets/
│   ├── css/politics.css           # 覆写层（accent、pending、小节样式）
│   ├── favicon.svg
│   ├── content/my-XX.html         # 每篇长文，按需 fetch
│   └── js-v4/
│       ├── app.js                 # 路由：today / map / chapter / topic / glossary
│       ├── store.js               # localStorage 进度、复习间隔（1/3/7/15 天）
│       ├── stats.js               # 板块与专题统计（只算非 pending）
│       ├── runner.js              # 回忆模式遮罩
│       ├── article.js             # 公式 / mermaid 按需加载
│       ├── ui.js                  # 图标、footer、通用片段
│       ├── data/
│       │   ├── meta.js            # 科目、六个板块、横向脉络
│       │   ├── topics-core.js     # 专题 1–15 的速记层
│       │   ├── topics-pending.js  # 专题 16–29 占位
│       │   ├── glossary.js        # 术语库
│       │   └── index.js           # 合并、索引
│       └── views/                 # today / map / chapter / topic / glossary
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

---

## 5. 今日队列

- 默认 8 个专题：到期优先，不足时补没读过的；全部读过且无到期时，按掌握度从低到高抽查。
- 数量改两处：`views/today.js` 的 `DAILY_LIMIT` 与 `app.js` 里 `store.dailyQueue(8)`。
- 评分四档：忘记 / 模糊 / 记得 / 熟练，对应 1、1、3~7、7~15 天的间隔。

---

## 6. 验证与发布

```powershell
npx hexo generate
python -m http.server 8124 --directory public
# 浏览器打开 http://127.0.0.1:8124/politics-review/#/today
```

要看的页面：`#/today`、`#/map`、改动的 `#/topic/<id>`、`#/glossary`；再看一眼 390px 宽度。

- headless Chrome 的 `--window-size=500` 实际视口约 518px，截图右侧会少 18px，**不是布局溢出**；判断是否真溢出，注入脚本量 `document.documentElement.scrollWidth`。
- 本地截图加 `--no-proxy-server`（这台机器的代理会接管 127.0.0.1）。
- 改了 `_config.yml` 才需要 `npx hexo clean`；日常生成后清理 `public/` 即可。

发布：

```powershell
git add source/politics-review docs/politics-review-maintenance.md AGENTS.md _config.yml source/_data/link.yml
git commit -m "…"
git push origin main
```

> **缓存**：Netlify / Cloudflare 对 `assets/*` 可能给 4 小时缓存。改 JS/CSS 必须递增 `assets/js-v4` 目录或 `politics.css?v=...` 与 `index.html` 里的引用。

---

## 7. 不要做

- 不要编辑 `source/_posts/*.md`。
- 不要给今日页加计划、每日一题、热力图等模块。
- 不要加真题、图解、评论、路线 / 纲领、P0–P3 优先级、英文版。
- 不要把 `pending` 专题放进队列或统计。
- 不要改已有专题 id（进度、链接、脉络都依赖它）。
- 不要把 `public/`、`db.json`、临时截图提交。
