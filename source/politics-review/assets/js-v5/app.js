import { Store, today } from './store.js';
import { topicById, chapterById, topicsOfChapter, subjectOf, subjectById } from './data/index.js';
import { todayView } from './views/today.js';
import { mapView } from './views/map.js';
import { chapterView } from './views/chapter.js';
import { topicView, hydrateTopicArticle } from './views/topic.js';
import { glossaryView, filterGlossary } from './views/glossary.js';
import { startRunner } from './runner.js';
import {
  $, $$, toast, closeOverlay, isOverlayOpen, icon, escapeHtml, fmtDateCN, dueLabel, footer, showOverlay,
} from './ui.js';

const store = new Store();
const THEME_KEY = 'reviewmy.theme';
const app = $('#app');
let lastPath = null;

/* ---------------- 主题 ---------------- */

function currentTheme() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function updateThemeUI() {
  const btn = $('#theme-toggle');
  if (!btn) return;
  const theme = currentTheme();
  btn.innerHTML = icon(theme === 'dark' ? 'sun' : 'moon', 18);
  btn.setAttribute('aria-label', theme === 'dark' ? '切换到浅色模式' : '切换到深色模式');
  btn.setAttribute('title', theme === 'dark' ? '浅色模式' : '深色模式');
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* noop */ }
  store.setSetting('theme', theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#121716' : '#f4f1e9');
  updateThemeUI();
}

function toggleTheme() {
  setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
}

/* ---------------- 路由 ---------------- */

function parseHash() {
  let raw = location.hash.replace(/^#/, '');
  if (!raw) raw = '/today';
  const [pathPart, qs = ''] = raw.split('?');
  const parts = pathPart.split('/').filter(Boolean);
  const query = {};
  new URLSearchParams(qs).forEach((v, k) => { query[k] = v; });
  return { parts, query, path: parts.join('/') };
}

function updateNav(nav) {
  $$('[data-nav]').forEach((el) => {
    const on = el.dataset.nav === nav;
    el.classList.toggle('is-active', on);
    if (on) el.setAttribute('aria-current', 'page');
    else el.removeAttribute('aria-current');
  });
}

function setDocTitle(title) {
  document.title = title ? `${title} · 政治复习台` : '政治复习台 · 马原';
}

function render({ scroll = true } = {}) {
  const route = parseHash();
  const { parts } = route;
  const name = parts[0] || 'today';
  let html = null;
  let nav = 'today';
  let title = '';

  try {
    if (name === 'today' || parts.length === 0) {
      html = todayView(store);
      nav = 'today';
      title = '今日';
    } else if (name === 'map') {
      html = mapView(store, route.query);
      nav = 'map';
      const sid = route.query.subject && subjectById.has(route.query.subject) ? route.query.subject : 'my';
      title = `知识地图 · ${subjectById.get(sid)?.name || ''}`;
    } else if (name === 'chapter') {
      html = chapterView(store, parts[1]);
      nav = 'map';
      title = chapterById.get(parts[1])?.title || '';
    } else if (name === 'topic') {
      html = topicView(store, parts[1]);
      nav = 'map';
      title = topicById.get(parts[1])?.title || '';
      if (parts[1] && topicById.has(parts[1])) store.setLastTopic(parts[1]);
    } else if (name === 'glossary') {
      html = glossaryView(store, route.query);
      nav = 'glossary';
      title = '术语库';
    }
  } catch (err) {
    console.error('[政治] 渲染失败', err);
    html = errorView(err);
    nav = '';
    title = '出错了';
  }

  if (!html) {
    html = notFoundView();
    nav = '';
    title = '未找到页面';
  }

  app.innerHTML = html;
  app.dataset.view = name;
  updateNav(nav);
  setDocTitle(title);

  if (scroll && route.path !== lastPath) {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previous;
  }
  lastPath = route.path;
  afterRender(route);
}

function afterRender(route) {
  const [name, param] = route.parts;
  if (name === 'topic' && param) hydrateTopicArticle(param);
}

/* ---------------- 交互 ---------------- */

function updateLevelUI(topicId, level) {
  $$(`.level-btn[data-topic="${topicId}"]`).forEach((b) => b.classList.toggle('on', Number(b.dataset.level) === level));
  const due = store.entry(topicId)?.due;
  const hint = $('.tl-hint');
  if (hint) {
    hint.textContent = `${level ? `上次 ${fmtDateCN(today())} · ` : ''}${due ? `下次 ${dueLabel(due, today())}` : '标记后自动排期'}`;
  }
  const dueEl = $('.study-due');
  if (dueEl) dueEl.textContent = due ? `下次复习：${dueLabel(due, today())}` : '标记后自动排期';
  const text = ['未学', '初识', '熟悉', '掌握', '熟练'][level];
  toast(level ? `已标记为「${text}」· ${dueLabel(due, today())}复习` : '已清除该专题的掌握度', 'success');
}

function startChapterRunner(chapterId) {
  const topics = topicsOfChapter(chapterId).filter((t) => !t.pending);
  if (!topics.length) {
    toast('这一章还没有可复习的专题。');
    return;
  }
  startRunner(store, topics.map((t) => ({ id: t.id, kind: 'chapter' })), {
    title: '本章滚动',
    onClose: () => render({ scroll: false }),
  });
}

function handleAction(actionEl, e) {
  const action = actionEl.dataset.action;
  if (!action) return;

  if (action === 'zoom-image') {
    e.preventDefault();
    const src = actionEl.dataset.src;
    const caption = actionEl.dataset.caption || '';
    const overlay = showOverlay(`<div class="image-viewer" role="group" aria-label="查看配图">
      <button type="button" class="icon-btn image-close" data-image-close aria-label="关闭图片">${icon('close', 20)}</button>
      <img src="${escapeHtml(src)}" alt="${escapeHtml(caption)}">
      ${caption ? `<p class="image-caption">${escapeHtml(caption)}</p>` : ''}
    </div>`, { className: 'overlay-image' });
    overlay.addEventListener('click', (ev) => {
      if (ev.target === overlay || ev.target.closest('[data-image-close]')) closeOverlay();
    });
    return;
  }
  if (action === 'skip-to-main') {
    e.preventDefault();
    const main = document.getElementById('app');
    if (main) {
      main.focus({ preventScroll: true });
      main.scrollIntoView({ block: 'start' });
    }
    return;
  }
  if (action === 'theme-toggle') {
    e.preventDefault();
    toggleTheme();
    return;
  }
  if (action === 'start-queue') {
    e.preventDefault();
    startRunner(store, store.dailyQueue(8), {
      title: '今日复习',
      onClose: () => render({ scroll: false }),
    });
    return;
  }
  if (action === 'start-topic-runner') {
    e.preventDefault();
    const topicId = actionEl.dataset.topic;
    const kind = actionEl.dataset.kind || 'due';
    startRunner(store, [{ id: topicId, kind }], {
      title: '单点复习',
      onClose: () => render({ scroll: false }),
    });
    return;
  }
  if (action === 'start-chapter-runner') {
    e.preventDefault();
    startChapterRunner(actionEl.dataset.chapter);
    return;
  }
  if (action === 'set-level') {
    e.preventDefault();
    const topicId = actionEl.dataset.topic;
    const level = Number(actionEl.dataset.level);
    store.setLevel(topicId, level);
    updateLevelUI(topicId, level);
    return;
  }
  if (action === 'toggle-all-chapters') {
    e.preventDefault();
    const cards = $$('.chapter-card');
    const anyClosed = cards.some((c) => !c.open);
    cards.forEach((c) => { c.open = anyClosed; });
    const span = actionEl.querySelector('span');
    if (span) span.textContent = anyClosed ? '收起全部' : '展开全部';
    return;
  }
  if (action === 'print') {
    e.preventDefault();
    window.print();
  }
}

/* ---------------- 事件绑定 ---------------- */

document.addEventListener('click', (e) => {
  const actionEl = e.target.closest('[data-action]');
  if (actionEl) {
    handleAction(actionEl, e);
    return;
  }
  // 站内锚点（#recite、#understand 这类）不能交给 hash 路由
  const localAnchor = e.target.closest('a[href^="#"]');
  if (localAnchor) {
    const href = localAnchor.getAttribute('href') || '';
    if (href && !href.startsWith('#/')) {
      const target = document.getElementById(href.slice(1));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
});

document.addEventListener('input', (e) => {
  const input = e.target.closest('[data-glossary-search]');
  if (input) filterGlossary(input.value);
});

document.addEventListener('keydown', (e) => {
  if (isOverlayOpen()) return;
  const tag = e.target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.isContentEditable) return;
  const toggle = e.target.closest('[data-action="toggle-question"]');
  if (toggle && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    handleAction(toggle, e);
  }
});

window.addEventListener('hashchange', () => render());
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isOverlayOpen()) closeOverlay();
});

function errorView(err) {
  return `<section class="view"><div class="error-card">
    <p class="eyebrow">RENDER ERROR</p>
    <h1>页面渲染失败</h1>
    <p>${escapeHtml(err?.message || String(err))}</p>
    <p class="muted">打开浏览器控制台可以看到完整堆栈。</p>
    <a class="btn" href="#/today">${icon('home', 15)} 回到今日</a>
  </div>${footer()}</section>`;
}

function notFoundView() {
  return `<section class="view"><div class="error-card">
    <p class="eyebrow">404</p>
    <h1>这个页面不存在</h1>
    <p>链接可能拼错了，或者内容已经移动。</p>
    <div class="error-actions">
      <a class="btn btn-primary" href="#/today">${icon('calendar', 15)} 今日复习</a>
      <a class="btn" href="#/map">${icon('map', 15)} 知识地图</a>
    </div>
  </div>${footer()}</section>`;
}

/* ---------------- 启动 ---------------- */

if (!location.hash) {
  history.replaceState(null, '', '#/today');
}
updateThemeUI();
render();
