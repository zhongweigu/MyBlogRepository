import { chapterById, subjectById, topicById } from '../data/index.js';
import { escapeHtml, icon, tag } from '../ui.js';

export function questionCard(q, { compact = false, open = false } = {}) {
  const subject = subjectById.get(q.subject);
  const chapter = chapterById.get(q.chapter);
  const topicNames = (q.topics || []).map((id) => topicById.get(id)?.title).filter(Boolean);
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const diff = Array.from({ length: 5 }, (_, i) => `<i class="${i < q.difficulty ? 'on' : ''}"></i>`).join('');

  return `<article class="q-card ${compact ? 'is-compact' : ''}" id="${q.id}" data-q="${q.id}" data-open="${open ? 'true' : 'false'}">
    <header class="q-head" data-action="toggle-question" role="button" tabindex="0" aria-expanded="${open ? 'true' : 'false'}">
      <div class="q-year"><strong>${q.year}</strong><span>第 ${escapeHtml(q.no)} 题</span></div>
      <div class="q-head-main">
        <div class="q-meta">
          ${tag(subject?.name || '', q.subject === 'coa' ? 'coa' : 'ds')}
          ${tag(q.type, 'plain')}
          ${tag(chapter ? `${chapter.no} ${chapter.short}` : '', 'plain')}
          <span class="q-diff" title="难度 ${q.difficulty}/5" aria-label="难度 ${q.difficulty}/5">${diff}</span>
          ${q.score ? `<span class="q-score">${q.score}</span>` : ''}
        </div>
        <h3 class="q-title">${topicNames[0] || '综合题'}<span class="q-sub">${topicNames.slice(1).map((n) => ` · ${n}`).join('')}</span></h3>
        <p class="q-preview">${escapeHtml(plainText(q.stem).slice(0, 108))}${plainText(q.stem).length > 108 ? '…' : ''}</p>
      </div>
      <span class="q-chev">${icon('chevron', 18)}</span>
    </header>
    <div class="q-body">
      <div class="q-body-inner">
        <div class="q-stem">${q.stem}</div>
        ${q.options ? `<ol class="q-options">${q.options.map((opt, i) => `<li class="opt" data-letter="${letters[i]}"><span class="opt-letter">${letters[i]}</span><span class="opt-text">${opt}</span></li>`).join('')}</ol>` : ''}
        <div class="q-actions">
          <button type="button" class="btn btn-sm q-reveal" data-action="reveal-answer">${icon('eye', 15)} 查看解析</button>
          ${topicsChips(q)}
        </div>
        <div class="q-analysis" hidden>
          <div class="q-analysis-head">${icon('check', 16)}<span>答案与解析</span>${q.answer ? `<span class="q-answer">正确答案 <b>${q.answer}</b></span>` : ''}</div>
          <div class="q-analysis-body">${q.analysis || '<p>暂无解析。</p>'}</div>
        </div>
      </div>
    </div>
  </article>`;
}

function topicsChips(q) {
  const items = (q.topics || [])
    .map((id) => topicById.get(id))
    .filter(Boolean)
    .map((t) => `<a class="chip-link" href="#/topic/${t.id}" title="${escapeHtml(t.title)}">${escapeHtml(t.title)}</a>`)
    .join('');
  return items ? `<div class="q-topics"><span>考点定位</span>${items}</div>` : '';
}

export function questionRow(q) {
  const subject = subjectById.get(q.subject);
  return `<a class="question-row" href="#/questions?q=${q.id}">
    <span class="qr-year">${q.year}</span>
    <span class="qr-main"><strong>${escapeHtml(topicLabel(q))}</strong><small>${subject?.name || ''} · 第 ${q.no} 题 · ${q.type}</small></span>
    <span class="qr-diff">${Array.from({ length: 5 }, (_, i) => `<i class="${i < q.difficulty ? 'on' : ''}"></i>`).join('')}</span>
    <span class="qr-arrow">${icon('arrowRight', 16)}</span>
  </a>`;
}

function topicLabel(q) {
  const t = topicById.get(q.topics?.[0]);
  return t ? t.title : '综合题';
}

function plainText(html = '') {
  const div = document.createElement('div');
  div.innerHTML = html;
  return (div.textContent || '').replace(/\s+/g, ' ').trim();
}
