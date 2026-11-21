/* 英语复习台 · 通用 UI 工具 */

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const ICONS = {
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/><path d="M8 15h3"/>',
  map: '<path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4Z"/><path d="M9 4v13M15 6.5v13"/>',
  file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v18H6.5A2.5 2.5 0 0 1 4 18.5v-13Z"/><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
  chevron: '<path d="m9 6 6 6-6 6"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  check: '<path d="m5 12 4.5 4.5L19 7"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5M3 17l9 5 9-5"/>',
  print: '<path d="M7 8V3h10v5"/><rect x="3" y="8" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',
  shuffle: '<path d="M16 3h5v5M4 20l5.5-5.5M21 3l-8 8M16 21h5v-5M15 15l6 6M4 4l4 4"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  alert: '<path d="M12 3 2.5 20h19L12 3Z"/><path d="M12 9v5M12 17h.01"/>',
  eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="3"/>',
  archive: '<path d="M3 7h18v13H3z"/><path d="M3 4h18v3H3zM9 12h6"/>',
  copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>',
  home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/>',
  quote: '<path d="M7 7h4v4c0 3-1.5 5-4 6M15 7h4v4c0 3-1.5 5-4 6"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
  dot: '<circle cx="12" cy="12" r="3"/>',
};

export function icon(name, size = 18, cls = "") {
  return `<svg class="i ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.dot}</svg>`;
}

export function todayLabel() {
  const d = new Date();
  const week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][d.getDay()];
  return {
    key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    full: `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日 · ${week}`,
    short: `${d.getMonth() + 1} 月 ${d.getDate()} 日`,
    week,
  };
}

export function toast(message, type = "") {
  const root = $("#toast-root");
  if (!root) return;
  const el = document.createElement("div");
  el.className = `toast ${type ? `toast-${type}` : ""}`;
  el.innerHTML = `${icon(type === "error" ? "alert" : "check", 16)}<span>${escapeHtml(message)}</span>`;
  root.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 250);
  }, 2200);
}

/* ---------------- 遮罩层（看大图） ---------------- */

let overlayEl = null;
let lastFocused = null;

export function showOverlay(html, { className = "" } = {}) {
  closeOverlay();
  lastFocused = document.activeElement;
  const host = $("#overlay-root");
  host.innerHTML = `<div class="overlay ${className}" role="dialog" aria-modal="true">${html}</div>`;
  overlayEl = host.firstElementChild;
  document.body.classList.add("overlay-open");
  const btn = overlayEl.querySelector("button, a");
  if (btn) btn.focus({ preventScroll: true });
  document.addEventListener("keydown", overlayKey);
  return overlayEl;
}

export function closeOverlay() {
  const host = $("#overlay-root");
  if (!host || !overlayEl) return;
  host.innerHTML = "";
  overlayEl = null;
  document.body.classList.remove("overlay-open");
  document.removeEventListener("keydown", overlayKey);
  if (lastFocused && document.contains(lastFocused)) {
    try { lastFocused.focus({ preventScroll: true }); } catch (e) { /* noop */ }
  }
  lastFocused = null;
}

export function isOverlayOpen() {
  return !!overlayEl;
}

function overlayKey(e) {
  if (e.key === "Escape") {
    e.preventDefault();
    closeOverlay();
  }
}

export function footer() {
  return `<footer class="site-foot">
    <div class="foot-brand">${icon("pen", 16)}<span><strong>英语复习台</strong> · 考研英语一作文</span></div>
    <div class="foot-meta">静态页面 · 内容来自 4 份 PDF + 标注扩充 · <a href="#/sources">资料与完整性</a> · <a href="/">返回博客</a></div>
  </footer>`;
}

export function emptyBlock({ iconName = "spark", title, desc, action = "" }) {
  return `<div class="empty-block">
    <div class="empty-icon">${icon(iconName, 26)}</div>
    <h3>${escapeHtml(title)}</h3>
    <p>${desc}</p>
    ${action}
  </div>`;
}

export function srcMark(s) {
  if (!s) return "";
  const label = s === "A" ? "A" : s === "B" ? "B" : "C";
  return `<span class="src-mark src-${label.toLowerCase()}" title="${label === "A" ? "原始资料" : label === "B" ? "整理归纳" : "自主扩充"}">${label}</span>`;
}
