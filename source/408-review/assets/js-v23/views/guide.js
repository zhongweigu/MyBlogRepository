import { META, TOPICS, QUESTIONS, CHAPTERS, CHAINS, SUBJECT_LIST } from '../data/index.js';
import { icon, escapeHtml, footer, tag } from '../ui.js';
import { overallStats } from '../stats.js';

export function guideView(store) {
  const stats = overallStats(store);
  const chapters = CHAPTERS.length;
  const sample = TOPICS.length;

  return `<section class="view view-guide">
    <header class="guide-hero">
      <p class="eyebrow">FIELD GUIDE</p>
      <h1>使用手册</h1>
      <p class="lede">这不是另一份笔记，而是一套可以反复走的阅读顺序。先背、再理解、再看图、最后用真题收口。</p>
      <div class="guide-stats">
        <div><strong>${sample}</strong><span>个考点</span></div>
        <div><strong>${chapters}</strong><span>个章节</span></div>
        <div><strong>${QUESTIONS.length}</strong><span>道真题</span></div>
        <div><strong>${CHAINS.length}</strong><span>条脉络</span></div>
      </div>
    </header>

    <div class="guide-layout">
      <article class="guide-main">
        <section class="guide-section">
          <p class="eyebrow">01 · READING</p>
          <h2>三层阅读法</h2>
          <div class="guide-steps">
            <div class="guide-step">
              <span class="gs-no">A</span>
              <div><h3>先看地图，建立坐标系</h3><p>打开<a href="#/map">知识地图</a>，只看科目和章节标题。先知道“这一章在整本书的哪个位置”，再进去。不要一上来就背细节。</p></div>
            </div>
            <div class="guide-step">
              <span class="gs-no">B</span>
              <div><h3>再读考点，读成一篇小教材</h3><p>每个考点页最上面是“背诵清单”和“考场答法”：先背一句话和几条关键词，再看“理解”里的完整长文——定义、推导、例子、表格、插图和真题解析都在里面。读完再做题，不要只背抓手。</p></div>
            </div>
            <div class="guide-step">
              <span class="gs-no">C</span>
              <div><h3>最后串线，把点接起来</h3><p>考点页底部有“把点连起来”和“在这条脉络里”；地图底部有“横向串联”。看到两个考点共享同一套逻辑时，记忆的抓手就从“一个点”变成“一张网”。</p></div>
            </div>
          </div>
        </section>

        <section class="guide-section">
          <p class="eyebrow">02 · REVIEW</p>
          <h2>滚动复习怎么跑</h2>
          <div class="guide-two-col">
            <div class="guide-note-card">
              <h3>${icon('play', 16)} 今日队列</h3>
              <p>首页只保留一个模块“每日知识点复习”，每天随机排 <strong>10 个考点</strong>：到期优先入选，顺序打乱；每次只显示一个考点，先按“包括什么 / 步骤 / 公式 / 易错”回忆，再揭示，最后按 1–4 评分。</p>
            </div>
            <div class="guide-note-card">
              <h3>${icon('rotate', 16)} 间隔排期</h3>
              <p>评分后自动排下次复习：忘记 1 天、模糊 1 天、记得 3–7 天、熟练 7–15 天。到期考点会出现在首页的每日队列里。</p>
            </div>
            <div class="guide-note-card">
              <h3>${icon('layers', 16)} 本章滚动</h3>
              <p>章节页的“滚动复习本章”按章内顺序过一遍；适合在学完一章后做一次整体回忆，而不是逐点死磕。</p>
            </div>
            <div class="guide-note-card">
              <h3>${icon('file', 16)} 真题验证</h3>
              <p>考点页的真题先做再看解析；真题库支持按科目、章节、年份、题型筛选，也能按年份或章节分组。</p>
            </div>
          </div>
        </section>

        <section class="guide-section">
          <p class="eyebrow">03 · LIBRARY</p>
          <h2>背诵、图解、术语和代码</h2>
          <div class="guide-steps">
            <div class="guide-step">
              <span class="gs-no">A</span>
              <div><h3>背诵清单 + 考场答法</h3><p>每个考点页顶部先给“背诵清单”和“考场答法”：清单是能直接背的短句，答法是选择题 / 综合题的收口顺序。先背，再去“理解”里看推导。</p></div>
            </div>
            <div class="guide-step">
              <span class="gs-no">B</span>
              <div><h3>图解库</h3><p><a href="#/diagrams">图解库</a>只收“代表一类题型”的图，比如 Cache + TLB + 页表的完整访问链、Cache 字段划分、流水线时空图、AVL 旋转。图片可点击放大，图下直接跳到对应考点。</p></div>
            </div>
            <div class="guide-step">
              <span class="gs-no">C</span>
              <div><h3>术语库</h3><p><a href="#/glossary">术语库</a>按科目筛选，也可以直接搜；核心术语手写定义，其余从 ${TOPICS.length} 个考点的知识点里抽出，每个词都能跳回原考点。</p></div>
            </div>
            <div class="guide-step">
              <span class="gs-no">D</span>
              <div><h3>代码库</h3><p><a href="#/code">代码库</a>按章节收数据结构代码，每段保留所在小节和上下文说明；先读代码，再跳回对应考点。</p></div>
            </div>
            <div class="guide-step">
              <span class="gs-no">E</span>
              <div><h3>本章背诵清单</h3><p>章节页有“本章背诵清单”折叠区，把本章所有考点的一句话抓手和全部 points 汇总；复习一整章时先过这一张清单。</p></div>
            </div>
          </div>
        </section>

        <section class="guide-section">
          <p class="eyebrow">04 · SHORTCUTS</p>
          <h2>键盘快捷键</h2>
          <div class="shortcut-table">
            <div><kbd>/</kbd><span>打开搜索</span></div>
            <div><kbd>⌘</kbd><kbd>K</kbd><span>打开搜索（Windows 用 Ctrl）</span></div>
            <div><kbd>Space</kbd><span>回忆模式：显示要点</span></div>
            <div><kbd>1</kbd><kbd>4</kbd><span>回忆模式：评分</span></div>
            <div><kbd>Esc</kbd><span>关闭弹层 / 结束回忆</span></div>
          </div>
        </section>

        <section class="guide-section" id="extend">
          <p class="eyebrow">05 · EXTEND</p>
          <h2>怎么继续往里加内容</h2>
          <p class="guide-p">页面是纯静态的：考点结构在 <code>source/408-review/assets/js-v23/data/</code>，长文在 <code>source/408-review/assets/content/</code>，图片在 <code>assets/textbook/</code> 或 <code>assets/img/</code>。新增考点除了加数据，还要给这个 id 写一篇长文；维护步骤见仓库的 <code>docs/408-review-maintenance.md</code>。</p>
          <pre class="code guide-code"><code>{
  id: 'ds-2-6',              // 唯一 id
  chapter: 'ds-2',           // 所属章节
  order: 6,                  // 章内顺序
  title: '考点名',
  kicker: '一句提示',
  takeaway: '一句话抓手',
  importance: 4,             // 1~5
  exam: { types: ['选择'], years: [2024], score: '2 分' },
  points: [
    { t: '知识点标题', lead: '一句线索', body: '&lt;p&gt;展开内容&lt;/p&gt;' }
    // 需要位域图时，加 bitfields: [{ title, total, fields: [{ k, bits, cls }] }]
    // 需要配图时，加 figures: [{ src: '/408-review/assets/img/x.webp', caption: '图注' }]
    // 多张对比表用 tables: [{ title, head, rows }]，单张表继续用 table
  ],
  pitfalls: [{ t: '易错点', b: '解释' }],
  links: [{ to: 'ds-2-5', why: '为什么相关' }],
  questions: ['q-2024-ds-kmp']
}</code></pre>
          <p class="guide-p">新增后不需要改页面逻辑：地图、章节页、搜索、真题定位都会自动读到。若要加一条跨章脉络，在 <code>meta.js</code> 的 <code>CHAINS</code> 里加一步即可。</p>
          <div class="guide-callout">${icon('info', 16)}<span>这个页面用 <code>skip_render: 408-review/**</code> 原样复制到 <code>public/408-review/</code>，Hexo 不会改写其中的 HTML/JS。改完跑一次 <code>npx hexo clean &amp;&amp; npx hexo generate</code> 即可。</span></div>
        </section>

        <section class="guide-section">
          <p class="eyebrow">05 · DATA</p>
          <h2>进度数据</h2>
          <p class="guide-p">进度存在浏览器 <code>localStorage</code>，不会上传到任何地方。换设备或清缓存前，先导出备份。</p>
          <div class="data-actions">
            <button type="button" class="btn btn-sm" data-action="export-data">${icon('download', 15)} 导出进度</button>
            <button type="button" class="btn btn-sm" data-action="import-data">${icon('upload', 15)} 导入进度</button>
            <button type="button" class="btn btn-sm btn-danger" data-action="reset-data">${icon('rotate', 15)} 重置进度</button>
            <input type="file" id="import-file" accept="application/json,.json" hidden>
          </div>
          <div class="settings-row">
            <label class="switch-row">
              <input type="checkbox" data-action="toggle-countdown" ${store.settings.countdown ? 'checked' : ''}>
              <span class="switch"></span>
              <span>在首页显示初试倒计时（按 ${META.examDate} 估算）</span>
            </label>
          </div>
          <p class="guide-fine">当前已记录 ${stats.studied} 个考点，${stats.mastered} 个已掌握。</p>
        </section>
      </article>

      <aside class="guide-aside">
        <section class="side-card">
          <p class="eyebrow">STATUS</p>
          <h3>内容规模</h3>
          <p>${escapeHtml(META.sampleNote)}</p>
          <div class="guide-tags">${SUBJECT_LIST.map((s) => tag(s.name, ['ds', 'coa', 'os'].includes(s.id) ? s.id : 'ds')).join('')}${tag('静态页面', 'plain')}${tag('本地进度', 'plain')}</div>
          <p class="guide-fine">更新于 ${META.updated}</p>
        </section>
        <section class="side-card">
          <p class="eyebrow">SOURCE</p>
          <h3>内容来源</h3>
          <div class="source-list">
            <a href="/2026/10/13/408考点强化-数据结构/">408 考点强化 · 数据结构 ${icon('arrowUpRight', 13)}</a>
            <a href="/2026/10/21/408考点强化-计算机组成原理/">408 考点强化 · 计算机组成原理 ${icon('arrowUpRight', 13)}</a>
            <a href="/2026/10/18/408真题分类-数据结构/">408 真题分类 · 数据结构 ${icon('arrowUpRight', 13)}</a>
            <a href="/2026/10/10/408数据结构/">408 数据结构（教材向） ${icon('arrowUpRight', 13)}</a>
          </div>
        </section>
        <section class="side-card">
          <p class="eyebrow">DESIGN</p>
          <h3>一点设计说明</h3>
          <p>页面不依赖任何框架和外部 CDN，断网也能用；只有一个静态 HTML + CSS + JS。颜色按科目区分，阅读区控制在 760px，长内容默认折叠。</p>
          <p>如果你想要更“像书”的版本，可以直接打印考点页：折叠内容会全部展开，导航和操作栏会隐藏。</p>
        </section>
      </aside>
    </div>

    ${footer()}
  </section>`;
}
