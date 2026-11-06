import { CODE_SNIPPETS } from '../data/code.js';
import { CHAPTERS, chapterById, subjectById, topicById } from '../data/index.js';
import { escapeHtml, icon, footer } from '../ui.js';

export function codeView(store, query = {}) {
  const chapter = query.chapter && chapterById.has(query.chapter) ? query.chapter : 'all';
  const list = chapter === 'all' ? CODE_SNIPPETS : CODE_SNIPPETS.filter((s) => s.chapter === chapter);
  const chapters = CHAPTERS.filter((c) => c.subject === 'ds' && CODE_SNIPPETS.some((s) => s.chapter === c.id));

  return `<section class="view view-code">
    <header class="lib-hero">
      <p class="eyebrow">CODE LIBRARY · 代码库</p>
      <h1>把代码当成考点来读。</h1>
      <p class="lib-lede">从数据结构长文里抽出所有代码片段，按章节归档。每段代码保留它所在的小节标题和一段上下文说明；先读懂代码在做什么，再回到对应考点。</p>
      <div class="lib-meta"><span><b>${CODE_SNIPPETS.length}</b> 段代码</span><span><b>${chapters.length}</b> 个章节</span><span>只收数据结构</span></div>
    </header>

    <div class="code-toolbar">
      <nav class="lib-tabs" aria-label="代码章节">
        <a class="lib-tab ${chapter === 'all' ? 'is-active' : ''}" href="#/code">全部<span>${CODE_SNIPPETS.length}</span></a>
        ${chapters.map((c) => `<a class="lib-tab ${chapter === c.id ? 'is-active' : ''}" href="#/code?chapter=${c.id}">${c.no} ${escapeHtml(c.short)}<span>${CODE_SNIPPETS.filter((s) => s.chapter === c.id).length}</span></a>`).join('')}
      </nav>
      <label class="glossary-search code-search">
        <span>${icon('search', 15)}</span>
        <input type="search" data-code-search placeholder="搜函数名、章节或说明…" aria-label="搜索代码">
        <kbd data-code-count>${list.length}</kbd>
      </label>
    </div>

    <div class="code-grid" id="code-list">
      ${list.map(codeCard).join('')}
    </div>
    <p class="glossary-empty" data-code-empty hidden>没有匹配的代码片段。</p>

    ${footer()}
  </section>`;
}

function codeCard(snippet) {
  const chapter = chapterById.get(snippet.chapter);
  const topic = topicById.get(snippet.topic);
  const subject = chapter ? subjectById.get(chapter.subject) : null;
  return `<article class="code-card" data-code="${escapeHtml(`${snippet.title} ${snippet.explanation} ${snippet.code} ${chapter?.title || ''}`)}">
    <header class="code-card-head">
      <div>
        <div class="code-meta"><span>${subject?.name || ''}</span><span>${chapter ? `${chapter.no} ${escapeHtml(chapter.short)}` : ''}</span><span>${snippet.lang.toUpperCase()}</span></div>
        <h2>${escapeHtml(snippet.title)}</h2>
      </div>
      ${topic ? `<a class="text-link" href="#/topic/${topic.id}">${icon('arrowRight', 14)} 考点</a>` : ''}
    </header>
    ${snippet.explanation ? `<p class="code-exp">${snippet.explanation}</p>` : ''}
    <pre class="code code-block"><code>${escapeHtml(snippet.code)}</code></pre>
  </article>`;
}

export function filterCode(value) {
  const q = String(value || '').trim().toLowerCase();
  let shown = 0;
  document.querySelectorAll('.code-card').forEach((card) => {
    const hit = !q || (card.dataset.code || '').toLowerCase().includes(q);
    card.hidden = !hit;
    if (hit) shown += 1;
  });
  const count = document.querySelector('[data-code-count]');
  if (count) count.textContent = shown;
  const empty = document.querySelector('[data-code-empty]');
  if (empty) empty.hidden = shown !== 0;
}
