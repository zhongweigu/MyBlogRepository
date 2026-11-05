/* ============================================================
   政治复习台 · 通用 UI 工具
   ============================================================ */

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const ICONS = {
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/><path d="M8 15h3"/>',
  map: '<path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4Z"/><path d="M9 4v13M15 6.5v13"/>',
  file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v18H6.5A2.5 2.5 0 0 1 4 18.5v-13Z"/><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowLeft: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
  arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  check: '<path d="m5 12 4.5 4.5L19 7"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  flame: '<path d="M12 3c1 3.5-1.5 4.5-1.5 7A3.5 3.5 0 0 0 14 13c1.2-1 1.5-2.5 1.5-4 2.5 2 4 4.5 4 7a7.5 7.5 0 0 1-15 0c0-4 3-6.5 7.5-13Z"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5M3 17l9 5 9-5"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.2 1.2"/><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.2-1.2"/>',
  print: '<path d="M7 8V3h10v5"/><rect x="3" y="8" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',
  shuffle: '<path d="M16 3h5v5M4 20l5.5-5.5M21 3l-8 8M16 21h5v-5M15 15l6 6M4 4l4 4"/>',
  filter: '<path d="M4 5h16l-6 7v6l-4 2v-8Z"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  keyboard: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6"/>',
  rotate: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  bookmark: '<path d="M6 3h12v18l-6-4-6 4V3Z"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
  dot: '<circle cx="12" cy="12" r="3"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
  upload: '<path d="M12 21V9M7 14l5-5 5 5M4 3h16"/>',
  alert: '<path d="M12 3 2.5 20h19L12 3Z"/><path d="M12 9v5M12 17h.01"/>',
  eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="3"/>',
  play: '<path d="M8 5v14l11-7L8 5Z"/>',
  home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/>',
};

export function icon(name, size = 18, cls = '') {
  return `<svg class="i ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.dot}</svg>`;
}

export function fmtDateCN(key) {
  if (!key) return '—';
  const d = new Date(`${key}T00:00:00`);
  return `${d.getMonth() + 1} 月 ${d.getDate()} 日`;
}

export function fmtDateDot(key) {
  if (!key) return '—';
  const d = new Date(`${key}T00:00:00`);
  return `${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export function todayLabel() {
  const d = new Date();
  const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][d.getDay()];
  return {
    full: `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日 · ${week}`,
    short: `${d.getMonth() + 1} 月 ${d.getDate()} 日`,
    week,
  };
}

export function dueLabel(due, todayKey) {
  if (!due) return '未安排';
  if (due < todayKey) {
    const d = Math.round((new Date(`${todayKey}T00:00:00`) - new Date(`${due}T00:00:00`)) / 86400000);
    return `已到期 ${d} 天`;
  }
  if (due === todayKey) return '今天';
  const d = Math.round((new Date(`${due}T00:00:00`) - new Date(`${todayKey}T00:00:00`)) / 86400000);
  if (d === 1) return '明天';
  return `${d} 天后`;
}

export function importanceBars(n = 0) {
  const bars = Array.from({ length: 5 }, (_, i) => `<i class="${i < n ? 'on' : ''}"></i>`).join('');
  return `<span class="imp-bars" title="考频 ${n} / 5" aria-label="考频 ${n} / 5">${bars}</span>`;
}

export function tag(text, kind = '') {
  return `<span class="tag ${kind ? `tag-${kind}` : ''}">${text}</span>`;
}

export function toast(message, type = '') {
  const root = $('#toast-root');
  if (!root) return;
  const el = document.createElement('div');
  el.className = `toast ${type ? `toast-${type}` : ''}`;
  el.innerHTML = `${icon(type === 'error' ? 'alert' : 'check', 16)}<span>${escapeHtml(message)}</span>`;
  root.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 250);
  }, 2400);
}

/* ---------------- 遮罩层 ---------------- */

let overlayEl = null;
let overlayOnClose = null;
let lastFocused = null;

export function showOverlay(html, { className = '', onClose = null, labelledBy = '' } = {}) {
  closeOverlay(false);
  lastFocused = document.activeElement;
  const host = $('#overlay-root');
  host.innerHTML = `<div class="overlay ${className}" role="dialog" aria-modal="true"${labelledBy ? ` aria-labelledby="${labelledBy}"` : ''}>${html}</div>`;
  overlayEl = host.firstElementChild;
  overlayOnClose = onClose;
  document.body.classList.add('overlay-open');
  const focusTarget = overlayEl.querySelector('[autofocus]') || overlayEl.querySelector('button, a, input, [tabindex]');
  if (focusTarget) focusTarget.focus({ preventScroll: true });
  bindOverlayKeys();
  return overlayEl;
}

export function closeOverlay(runCallback = true) {
  const host = $('#overlay-root');
  if (!host || !overlayEl) return;
  const cb = overlayOnClose;
  host.innerHTML = '';
  overlayEl = null;
  overlayOnClose = null;
  document.body.classList.remove('overlay-open');
  document.removeEventListener('keydown', trapOverlayKeys, true);
  if (lastFocused && document.contains(lastFocused)) {
    try { lastFocused.focus({ preventScroll: true }); } catch (e) { /* noop */ }
  }
  lastFocused = null;
  if (runCallback && cb) cb();
}

export function isOverlayOpen() {
  return !!overlayEl;
}

function overlayKeyHandler(e) {
  if (e.key === 'Escape') {
    e.preventDefault();
    closeOverlay();
    return;
  }
  if (e.key !== 'Tab' || !overlayEl) return;
  const nodes = $$('a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])', overlayEl)
    .filter((el) => el.offsetParent !== null || el === document.activeElement);
  if (!nodes.length) return;
  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

function bindOverlayKeys() {
  document.removeEventListener('keydown', trapOverlayKeys, true);
  document.addEventListener('keydown', trapOverlayKeys, true);
}

function trapOverlayKeys(e) {
  if (!overlayEl) return;
  // 允许搜索/回忆模式自己处理方向键与 Esc
  if (overlayEl.dataset.keys === 'custom' && e.key !== 'Tab') return;
  overlayKeyHandler(e);
}

/* ---------------- 通用片段 ---------------- */

export function footer() {
  return `<footer class="site-foot">
    <div class="foot-brand">${icon('book', 16)}<span><strong>政治复习台</strong> · 把马原串成一张网</span></div>
    <div class="foot-meta">进度只保存在本机 · 静态页面 · <a href="#/glossary">术语</a> · <a href="#/map">知识地图</a> · <a href="/">返回博客</a></div>
  </footer>`;
}

export function emptyBlock({ iconName = 'spark', title, desc, action = '' }) {
  return `<div class="empty-block">
    <div class="empty-icon">${icon(iconName, 26)}</div>
    <h3>${escapeHtml(title)}</h3>
    <p>${desc}</p>
    ${action}
  </div>`;
}

export function sectionHead({ eyebrow, title, desc, actions = '' }) {
  return `<div class="section-head">
    <div>
      ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
      <h2>${title}</h2>
      ${desc ? `<p class="section-desc">${desc}</p>` : ''}
    </div>
    ${actions ? `<div class="section-actions">${actions}</div>` : ''}
  </div>`;
}

export function segmentedLevel(current, topicId, { compact = false } = {}) {
  const labels = [
    { v: 0, label: '未学' },
    { v: 1, label: '初识' },
    { v: 2, label: '熟悉' },
    { v: 3, label: '掌握' },
    { v: 4, label: '熟练' },
  ];
  return `<div class="level-seg ${compact ? 'is-compact' : ''}" role="group" aria-label="掌握度">
    ${labels.map((l) => `<button type="button" class="level-btn ${current === l.v ? 'on' : ''}" data-action="set-level" data-topic="${topicId}" data-level="${l.v}" title="${l.label}"><span>${l.label}</span></button>`).join('')}
  </div>`;
}

export function progressRing(pct, size = 92, stroke = 6) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.max(0, Math.min(100, pct)) / 100);
  return `<div class="ring" style="--size:${size}px">
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true">
      <circle class="ring-track" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke-width="${stroke}"/>
      <circle class="ring-fill" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke-width="${stroke}"
        stroke-dasharray="${c.toFixed(2)}" stroke-dashoffset="${off.toFixed(2)}" stroke-linecap="round"
        transform="rotate(-90 ${size / 2} ${size / 2})"/>
    </svg>
    <div class="ring-label"><strong>${pct}<small>%</small></strong><span>掌握度</span></div>
  </div>`;
}

export function subjectClass() {
  return 'is-my';
}

export function chapterLabel(chapter) {
  return chapter ? `${chapter.no} ${chapter.short}` : '未分类';
}
