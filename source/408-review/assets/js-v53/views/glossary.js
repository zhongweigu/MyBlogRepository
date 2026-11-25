import { REVIEW_CARDS } from '../data/review-cards.js';
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
  const cards = REVIEW_CARDS.filter((item) => inSubject(item, subject));
  const terms = cards.filter((item) => item.kind === 'term');
  const flows = cards.filter((item) => item.kind === 'flow');
  const totalTerms = REVIEW_CARDS.filter((item) => item.kind === 'term').length;
  const totalFlows = REVIEW_CARDS.filter((item) => item.kind === 'flow').length;

  return `<section class="view view-glossary">
    <header class="lib-hero">
      <p class="eyebrow">REVIEW LIBRARY · 卡片库</p>
      <h1>完整复习库</h1>
      <p class="lib-lede">每张卡片都有明确的问题、答案、复习目标和来源；可按科目筛选，也可直接搜问题、定义或步骤。</p>
      <div class="lib-meta"><span><b>${totalTerms}</b> 张术语卡</span><span><b>${totalFlows}</b> 张流程卡</span><span>按科目/关键词筛选</span></div>
    </header>

    <div class="glossary-toolbar">
      <div class="lib-tabs" role="group" aria-label="科目筛选">
        <a class="lib-tab ${subject === 'all' ? 'is-active' : ''}" href="#/glossary">全部<span>${totalTerms + totalFlows}</span></a>
        ${Object.values(SUBJECTS).map((s) => {
          const n = REVIEW_CARDS.filter((i) => inSubject(i, s.id)).length;
          return `<a class="lib-tab ${subject === s.id ? 'is-active' : ''}" href="#/glossary?subject=${s.id}">${escapeHtml(s.name)}<span>${n}</span></a>`;
        }).join('')}
      </div>
      <label class="glossary-search">
        <span>${icon('search', 15)}</span>
        <input type="search" data-glossary-search placeholder="搜问题、术语、答案或步骤…" aria-label="搜索复习卡片">
        <kbd data-glossary-count>${cards.length}</kbd>
      </label>
    </div>

    <section class="glossary-section" id="glossary-terms">
      <div class="glossary-section-head"><p class="eyebrow">TERMS</p><h2>术语卡</h2><p>先看问题，自己回答“是什么”，再看答案、限定条件和来源。</p></div>
      <div class="glossary-grid">
        ${terms.map((item) => cardItem(item)).join('')}
      </div>
    </section>

    <section class="glossary-section" id="glossary-flows">
      <div class="glossary-section-head"><p class="eyebrow">FLOWS</p><h2>流程卡</h2><p>先按问题复述步骤，再看答案；重点是顺序、条件和每一步的目的。</p></div>
      <div class="glossary-grid flow-grid">
        ${flows.map((item) => cardItem(item)).join('')}
      </div>
      <p class="glossary-empty" data-glossary-empty hidden>没有匹配的术语或流程。</p>
    </section>

    ${footer()}
  </section>`;
}

function cardItem(item) {
  const topic = topicById.get(item.topic);
  const chapter = topic ? chapterById.get(topic.chapter) : null;
  const subject = chapter ? subjectById.get(chapter.subject) : null;
  const kind = item.kind === 'flow' ? '流程' : '术语';
  const answer = item.kind === 'flow'
    ? `<ol>${(item.answer || []).map((step) => `<li>${escapeHtml(step)}</li>`).join('')}</ol>`
    : `<p>${escapeHtml(item.answer || '')}</p>`;
  const checks = (item.checkpoints || []).length
    ? `<ul class="card-checks">${item.checkpoints.map((x) => `<li>${escapeHtml(x)}</li>`).join('')}</ul>`
    : '';
  return `<article class="glossary-item card-${item.kind}" data-term="${escapeHtml(item.question || item.title)} ${escapeHtml(item.answer || '')}">
    <div class="gi-head"><h3>${escapeHtml(item.question || item.title)}</h3><span class="gi-kind">${kind}</span></div>
    ${answer}
    ${item.goal ? `<p class="card-goal"><strong>复习目标：</strong>${escapeHtml(item.goal)}</p>` : ''}
    ${checks}
    <div class="gi-foot">
      <span>${escapeHtml(subject?.name || '')}${chapter ? ` · ${escapeHtml(chapter.short)}` : ''}${item.id ? ` · ${escapeHtml(item.id)}` : ''}</span>
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
