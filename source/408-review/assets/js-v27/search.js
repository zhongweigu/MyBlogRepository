import {
  ORDERED_TOPICS, CHAPTERS, CHAINS, QUESTIONS, topicById, chapterById, subjectById, topicsOfChapter,
} from './data/index.js';
import { today } from './store.js';
import {
  icon, escapeHtml, showOverlay, closeOverlay, isOverlayOpen,
} from './ui.js';

let index = null;
let active = 0;
let currentResults = [];

function stripHtml(html = '') {
  const div = document.createElement('div');
  div.innerHTML = html;
  return (div.textContent || '').replace(/\s+/g, ' ').trim();
}

function buildIndex() {
  if (index) return index;
  index = [];
  for (const t of ORDERED_TOPICS) {
    const chapter = chapterById.get(t.chapter);
    const subject = subjectById.get(chapter?.subject);
    const body = [
      t.takeaway,
      ...(t.points || []).flatMap((p) => [p.t, p.lead, stripHtml(p.body)]),
      ...(t.pitfalls || []).map((p) => p.t + ' ' + stripHtml(p.b)),
    ].join(' ');
    index.push({
      type: 'topic',
      id: t.id,
      title: t.title,
      kicker: t.kicker,
      meta: `${subject?.name || ''} · ${chapter?.no || ''} ${chapter?.short || ''}`,
      text: [t.title, t.kicker, body].join(' '),
      body,
      href: `#/topic/${t.id}`,
      importance: t.importance || 0,
    });
  }
  for (const c of CHAPTERS) {
    const subject = subjectById.get(c.subject);
    const body = [c.intro, c.thread, c.examFocus].join(' ');
    index.push({
      type: 'chapter',
      id: c.id,
      title: `${c.no} ${c.title}`,
      kicker: c.tagline,
      meta: `${subject?.name || ''} · ${topicsOfChapter(c.id).length} 个考点`,
      text: [c.no, c.title, c.tagline, body].join(' '),
      body,
      href: `#/chapter/${c.id}`,
      importance: 0,
    });
  }
  for (const q of QUESTIONS) {
    const topic = q.topics?.[0] ? topicById.get(q.topics[0]) : null;
    const body = [stripHtml(q.stem), (q.tags || []).join(' ')].join(' ');
    index.push({
      type: 'question',
      id: q.id,
      title: `${q.year} 年第 ${q.no} 题 · ${topic?.title || '综合题'}`,
      kicker: `${q.type} · ${(q.tags || []).join(' / ')}`,
      meta: `${subjectById.get(q.subject)?.name || ''} · ${q.year}`,
      text: [q.year, q.type, topic?.title || '', body].join(' '),
      body,
      href: `#/questions?q=${q.id}`,
      importance: 0,
    });
  }
  for (const c of CHAINS) {
    const body = [c.note, ...c.steps.map((s) => s.label)].join(' ');
    index.push({
      type: 'chain',
      id: c.id,
      title: c.title,
      kicker: c.note,
      meta: `脉络 · ${c.steps.length} 步`,
      text: [c.title, body].join(' '),
      body,
      href: `#/topic/${c.steps[0].topic}`,
      importance: 0,
    });
  }
  return index;
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlight(text, query) {
  const safe = escapeHtml(text);
  if (!query) return safe;
  try {
    return safe.replace(new RegExp(`(${escapeRegExp(query)})`, 'gi'), '<mark>$1</mark>');
  } catch (e) {
    return safe;
  }
}

function snippet(text, query, radius = 52) {
  if (!text) return '';
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  const at = q ? lower.indexOf(q) : -1;
  if (at < 0) return highlight(text.slice(0, radius * 2), query) + (text.length > radius * 2 ? '…' : '');
  const start = Math.max(0, at - radius);
  const end = Math.min(text.length, at + q.length + radius);
  return `${start > 0 ? '…' : ''}${highlight(text.slice(start, end), query)}${end < text.length ? '…' : ''}`;
}

function scoreItem(item, query) {
  const q = query.toLowerCase();
  const title = item.title.toLowerCase();
  const kicker = (item.kicker || '').toLowerCase();
  const text = item.text.toLowerCase();
  let score = 0;
  let matched = false;
  if (title === q) { score += 120; matched = true; }
  if (title.includes(q)) { score += 48; matched = true; }
  if (kicker.includes(q)) { score += 16; matched = true; }
  if (text.includes(q)) {
    const count = Math.min(6, text.split(q).length - 1);
    score += 8 + count * 3;
    matched = true;
  }
  if (!matched) return 0;
  if (item.type === 'topic') score += 6;
  if (item.type === 'question') score += 2;
  score += (item.importance || 0) * 0.5;
  return score;
}

function search(query) {
  const all = buildIndex();
  const q = query.trim();
  if (!q) {
    const recent = null;
    const picks = [...all]
      .filter((x) => x.type === 'topic')
      .sort((a, b) => b.importance - a.importance)
      .slice(0, 6);
    return {
      empty: true,
      groups: [{ key: 'topic', title: '高频考点', items: picks }],
      total: picks.length,
    };
  }
  const scored = all
    .map((item) => ({ item, score: scoreItem(item, q) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  const groups = [
    { key: 'topic', title: '考点', items: scored.filter((x) => x.item.type === 'topic').slice(0, 7).map((x) => x.item) },
    { key: 'question', title: '真题', items: scored.filter((x) => x.item.type === 'question').slice(0, 4).map((x) => x.item) },
    { key: 'chapter', title: '章节', items: scored.filter((x) => x.item.type === 'chapter').slice(0, 3).map((x) => x.item) },
    { key: 'chain', title: '脉络', items: scored.filter((x) => x.item.type === 'chain').slice(0, 3).map((x) => x.item) },
  ].filter((g) => g.items.length);
  return { empty: false, groups, total: groups.reduce((s, g) => s + g.items.length, 0) };
}

export function openSearch(initial = '') {
  if (isOverlayOpen()) closeOverlay(false);
  const el = showOverlay(`<div class="search-panel" data-keys="custom">
    <div class="search-input-row">
      ${icon('search', 20)}
      <input id="global-search-input" type="search" placeholder="搜索考点、真题、章节…" aria-label="搜索考点、真题和章节" autocomplete="off" spellcheck="false" value="${escapeHtml(initial)}">
      <kbd>ESC</kbd>
      <button type="button" class="icon-btn search-close" data-search-close aria-label="关闭搜索">${icon('close', 17)}</button>
    </div>
    <div class="search-results" id="global-search-results" role="listbox" aria-label="搜索结果"></div>
    <div class="search-foot">
      <span>${icon('keyboard', 13)} ↑↓ 选择 · Enter 打开</span>
      <span id="search-count"></span>
    </div>
  </div>`, { className: 'overlay-search' });

  el.dataset.keys = 'custom';
  const input = el.querySelector('#global-search-input');
  const results = el.querySelector('#global-search-results');
  const count = el.querySelector('#search-count');

  function renderResults(query) {
    const { groups, total, empty } = search(query);
    currentResults = groups.flatMap((g) => g.items);
    active = 0;
    count.textContent = empty ? '高频考点' : `${total} 条结果`;
    if (!total) {
      results.innerHTML = `<div class="search-empty">
        <div class="se-icon">${icon('search', 24)}</div>
        <h3>没有找到「${escapeHtml(query)}」</h3>
        <p>换一个关键词，或者直接去<a href="#/map">知识地图</a>按章节找。</p>
      </div>`;
      return;
    }
    let n = 0;
    results.innerHTML = groups.map((g) => `<div class="search-group">
      <div class="search-group-head">${g.title}<span>${g.items.length}</span></div>
      ${g.items.map((item) => {
        const idx = n++;
        return `<a class="search-result" href="${item.href}" data-index="${idx}" role="option">
          <span class="sr-icon">${icon(item.type === 'topic' ? 'layers' : item.type === 'question' ? 'file' : item.type === 'chain' ? 'link' : 'map', 16)}</span>
          <span class="sr-main">
            <span class="sr-title">${highlight(item.title, query)}</span>
            <span class="sr-meta">${escapeHtml(item.meta || '')}</span>
            <span class="sr-snippet">${snippet(item.body || item.text, query)}</span>
          </span>
          <span class="sr-arrow">${icon('arrowRight', 14)}</span>
        </a>`;
      }).join('')}
    </div>`).join('');
    setActive(0);
  }

  function setActive(i) {
    const nodes = [...results.querySelectorAll('.search-result')];
    if (!nodes.length) return;
    active = Math.max(0, Math.min(i, nodes.length - 1));
    nodes.forEach((n, j) => n.classList.toggle('is-active', j === active));
    nodes[active].scrollIntoView({ block: 'nearest' });
  }

  function openActive() {
    const nodes = [...results.querySelectorAll('.search-result')];
    if (nodes[active]) {
      const href = nodes[active].getAttribute('href');
      closeOverlay(false);
      location.hash = href;
    }
  }

  input.addEventListener('input', () => renderResults(input.value));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(active + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(active - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      openActive();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeOverlay();
    }
  });

  results.addEventListener('click', (e) => {
    const a = e.target.closest('.search-result');
    if (!a) return;
    closeOverlay(false);
  });

  el.addEventListener('click', (e) => {
    if (e.target.closest('[data-search-close]')) {
      closeOverlay();
      return;
    }
    if (e.target === el) closeOverlay();
  });

  const onKey = (e) => {
    if (!document.body.contains(el)) {
      document.removeEventListener('keydown', onKey, true);
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      closeOverlay();
    }
  };
  document.addEventListener('keydown', onKey, true);

  renderResults(initial);
  setTimeout(() => input.focus({ preventScroll: true }), 20);
}
