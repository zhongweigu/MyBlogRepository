import { GLOSSARY } from '../data/glossary.js';
import { CHAPTERS, chapterById, topicById } from '../data/index.js';
import { escapeHtml, icon, footer } from '../ui.js';

export function glossaryView(store, query = {}) {
  const chapter = query.chapter && chapterById.has(query.chapter) ? query.chapter : 'all';
  const list = chapter === 'all' ? GLOSSARY : GLOSSARY.filter((item) => item.chapter === chapter);
  const core = list.filter((item) => item.kind === '核心');
  const rest = list.filter((item) => item.kind !== '核心');
  const tabs = CHAPTERS.filter((c) => GLOSSARY.some((i) => i.chapter === c.id));

  return `<section class="view view-glossary">
    <header class="lib-hero">
      <p class="eyebrow">GLOSSARY · 术语库</p>
      <h1>先把词说清楚，再谈理解。</h1>
      <p class="lib-lede">核心术语给一句话定义，基础术语补上边界。按板块筛，或直接搜；每个词都能跳回它所在的专题。</p>
      <div class="lib-meta"><span><b>${GLOSSARY.length}</b> 个术语</span><span>核心 <b>${GLOSSARY.filter((i) => i.kind === '核心').length}</b> 个</span><span>随笔记持续补充</span></div>
    </header>

    <div class="glossary-toolbar">
      <div class="lib-tabs" role="group" aria-label="板块筛选">
        <a class="lib-tab ${chapter === 'all' ? 'is-active' : ''}" href="#/glossary">全部<span>${GLOSSARY.length}</span></a>
        ${tabs.map((c) => `<a class="lib-tab ${chapter === c.id ? 'is-active' : ''}" href="#/glossary?chapter=${c.id}">${escapeHtml(c.short)}<span>${GLOSSARY.filter((i) => i.chapter === c.id).length}</span></a>`).join('')}
      </div>
      <label class="glossary-search">
        <span>${icon('search', 15)}</span>
        <input type="search" data-glossary-search placeholder="搜术语、关键词或释义…" aria-label="搜索术语">
        <kbd data-glossary-count>${list.length}</kbd>
      </label>
    </div>

    ${core.length ? `<section class="glossary-section">
      <div class="glossary-section-head"><p class="eyebrow">CORE TERMS</p><h2>核心术语</h2><p>最常被问到的词，先把定义背成一句。</p></div>
      <div class="glossary-grid">
        ${core.map((item) => glossaryItem(item)).join('')}
      </div>
    </section>` : ''}

    <section class="glossary-section">
      <div class="glossary-section-head"><p class="eyebrow">ALL TERMS</p><h2>${core.length ? '其余术语' : '全部术语'}</h2><p>按板块排列；搜索框可过滤。</p></div>
      <div class="glossary-grid" id="glossary-list">
        ${rest.map((item) => glossaryItem(item)).join('')}
      </div>
      <p class="glossary-empty" data-glossary-empty hidden>没有匹配的术语。</p>
    </section>

    ${footer()}
  </section>`;
}

function glossaryItem(item) {
  const chapter = chapterById.get(item.chapter);
  const topic = topicById.get(item.topic);
  return `<article class="glossary-item ${item.kind === '核心' ? 'is-core' : ''}" data-term="${escapeHtml(item.term)} ${escapeHtml(item.def)}">
    <div class="gi-head">
      <h3>${escapeHtml(item.term)}</h3>
      <span class="gi-kind">${item.kind}</span>
    </div>
    <p>${item.def}</p>
    <div class="gi-foot">
      <span>${chapter ? `${chapter.no} ${escapeHtml(chapter.short)}` : ''}</span>
      ${topic ? `<a href="#/topic/${topic.id}">${escapeHtml(topic.title)} ${icon('arrowRight', 12)}</a>` : ''}
    </div>
  </article>`;
}

/** 术语搜索：在 app.js 的 input 事件里调用。 */
export function filterGlossary(value) {
  const q = String(value || '').trim().toLowerCase();
  let shown = 0;
  document.querySelectorAll('.glossary-item').forEach((item) => {
    const hit = !q || (item.dataset.term || '').toLowerCase().includes(q);
    item.hidden = !hit;
    if (hit) shown += 1;
  });
  const empty = document.querySelector('[data-glossary-empty]');
  if (empty) empty.hidden = shown !== 0;
  const count = document.querySelector('[data-glossary-count]');
  if (count) count.textContent = shown;
}
