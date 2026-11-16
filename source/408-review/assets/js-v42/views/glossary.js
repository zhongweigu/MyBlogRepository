import { REVIEW_TERMS } from '../data/review-terms.js';
import { REVIEW_FLOWS } from '../data/review-flows.js';
import { SUBJECTS, chapterById, topicById, subjectById } from '../data/index.js';
import { escapeHtml, icon, footer } from '../ui.js';

const subjectOfTopic = (topicId) => {
  const topic = topicById.get(topicId);
  const chapter = topic ? chapterById.get(topic.chapter) : null;
  return chapter ? subjectById.get(chapter.subject)?.id : null;
};

const inSubject = (item, subject) => subject === 'all' || subjectOfTopic(item.topic) === subject;

export function glossaryView(store, query = {}) {
  const subject = subjectById.has(query.subject) ? query.subject : 'all';
  const terms = REVIEW_TERMS.filter((item) => inSubject(item, subject));
  const flows = REVIEW_FLOWS.filter((item) => inSubject(item, subject));
  const totalTerms = REVIEW_TERMS.length;
  const totalFlows = REVIEW_FLOWS.length;

  return `<section class="view view-glossary">
    <header class="lib-hero">
      <p class="eyebrow">REVIEW LIBRARY · 术语 + 流程</p>
      <h1>完整复习库</h1>
      <p class="lib-lede">所有术语都带明确限定语，所有流程都按可复述的步骤整理。可按科目筛选，也可直接搜术语、流程或步骤。</p>
      <div class="lib-meta"><span><b>${totalTerms}</b> 个术语</span><span><b>${totalFlows}</b> 个流程</span><span>按科目/关键词筛选</span></div>
    </header>

    <div class="glossary-toolbar">
      <div class="lib-tabs" role="group" aria-label="科目筛选">
        <a class="lib-tab ${subject === 'all' ? 'is-active' : ''}" href="#/glossary">全部<span>${totalTerms + totalFlows}</span></a>
        ${Object.values(SUBJECTS).map((s) => {
          const n = REVIEW_TERMS.filter((i) => inSubject(i, s.id)).length + REVIEW_FLOWS.filter((i) => inSubject(i, s.id)).length;
          return `<a class="lib-tab ${subject === s.id ? 'is-active' : ''}" href="#/glossary?subject=${s.id}">${escapeHtml(s.name)}<span>${n}</span></a>`;
        }).join('')}
      </div>
      <label class="glossary-search">
        <span>${icon('search', 15)}</span>
        <input type="search" data-glossary-search placeholder="搜术语、流程或步骤…" aria-label="搜索术语和流程">
        <kbd data-glossary-count>${terms.length + flows.length}</kbd>
      </label>
    </div>

    <section class="glossary-section" id="glossary-terms">
      <div class="glossary-section-head"><p class="eyebrow">TERMS</p><h2>术语库</h2><p>每个词只回答一个明确的“是什么”；先复述，再看定义和对应考点。</p></div>
      <div class="glossary-grid">
        ${terms.map((item) => glossaryItem(item)).join('')}
      </div>
    </section>

    <section class="glossary-section" id="glossary-flows">
      <div class="glossary-section-head"><p class="eyebrow">FLOWS</p><h2>流程库</h2><p>按步骤复述，不要求逐字；关键是顺序和每一步解决什么问题。</p></div>
      <div class="glossary-grid flow-grid">
        ${flows.map((item) => flowItem(item)).join('')}
      </div>
      <p class="glossary-empty" data-glossary-empty hidden>没有匹配的术语或流程。</p>
    </section>

    ${footer()}
  </section>`;
}

function glossaryItem(item) {
  const topic = topicById.get(item.topic);
  const chapter = topic ? chapterById.get(topic.chapter) : null;
  const subject = chapter ? subjectById.get(chapter.subject) : null;
  return `<article class="glossary-item" data-term="${escapeHtml(item.t)} ${escapeHtml(item.d)}">
    <div class="gi-head"><h3>${escapeHtml(item.t)}</h3><span class="gi-kind">术语</span></div>
    <p>${escapeHtml(item.d)}</p>
    <div class="gi-foot">
      <span>${escapeHtml(subject?.name || '')}${chapter ? ` · ${escapeHtml(chapter.short)}` : ''}</span>
      ${topic ? `<a href="#/topic/${topic.id}">${escapeHtml(topic.title)} ${icon('arrowRight', 12)}</a>` : ''}
    </div>
  </article>`;
}

function flowItem(item) {
  const topic = topicById.get(item.topic);
  const chapter = topic ? chapterById.get(topic.chapter) : null;
  const subject = chapter ? subjectById.get(chapter.subject) : null;
  return `<article class="glossary-item flow-item" data-term="${escapeHtml(item.t)} ${escapeHtml(item.steps.join(' '))}">
    <div class="gi-head"><h3>${escapeHtml(item.t)}</h3><span class="gi-kind">流程</span></div>
    <ol>${item.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}</ol>
    <div class="gi-foot">
      <span>${escapeHtml(subject?.name || '')}${chapter ? ` · ${escapeHtml(chapter.short)}` : ''}</span>
      ${topic ? `<a href="#/topic/${topic.id}">${escapeHtml(topic.title)} ${icon('arrowRight', 12)}</a>` : ''}
    </div>
  </article>`;
}

/** 术语/流程搜索：在 app.js 的 input 事件里调用。 */
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
