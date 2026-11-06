import { Store, today } from './store.js';
import { topicById, chapterById, topicsOfChapter, QUESTIONS, subjectOf } from './data/index.js';
import { todayView } from './views/today.js';
import { mapView } from './views/map.js';
import { chapterView } from './views/chapter.js';
import { topicView, hydrateTopicArticle } from './views/topic.js';
import { renderMath } from './article.js';
import { glossaryView, filterGlossary } from './views/glossary.js';
import { diagramsView } from './views/diagrams.js';
import { questionsView } from './views/questions.js';
import { codeView, filterCode } from './views/code.js';
import { guideView } from './views/guide.js';
import { startRunner } from './runner.js';
import { openSearch } from './search.js';
import { $, $$, toast, closeOverlay, isOverlayOpen, icon, escapeHtml, fmtDateCN, dueLabel, footer, showOverlay } from './ui.js';

const store = new Store();
const THEME_KEY = 'review408.theme';
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

function updateMapNav(subjectId) {
  const href = subjectId ? `#/map?subject=${subjectId}` : '#/map';
  $$('a[data-nav="map"]').forEach((a) => { a.href = href; });
}

function setDocTitle(title) {
  document.title = title ? `${title} · 408 复习台` : '408 复习台';
}

function render({ scroll = true } = {}) {
  const route = parseHash();
  const { parts, query } = route;
  const name = parts[0] || 'today';
  let html = null;
  let nav = 'today';
  let title = '';
  let subjectId = null;

  try {
    if (name === 'today' || parts.length === 0) {
      html = todayView(store);
      nav = 'today';
      title = '今日';
    } else if (name === 'map') {
      const subject = query.subject === 'coa' ? 'coa' : 'ds';
      html = mapView(store, { subject });
      nav = 'map';
      subjectId = subject;
      title = subject === 'coa' ? '知识地图 · 计算机组成原理' : '知识地图 · 数据结构';
    } else if (name === 'chapter') {
      html = chapterView(store, parts[1]);
      nav = 'map';
      subjectId = subjectOf(parts[1])?.id || null;
      title = chapterById.get(parts[1])?.title || '';
    } else if (name === 'topic') {
      html = topicView(store, parts[1]);
      nav = 'map';
      const topic = topicById.get(parts[1]);
      subjectId = topic ? subjectOf(topic.chapter)?.id : null;
      title = topic?.title || '';
      if (parts[1] && topicById.has(parts[1])) store.setLastTopic(parts[1]);
    } else if (name === 'questions') {
      html = questionsView(store, query);
      nav = 'questions';
      subjectId = ['ds', 'coa'].includes(query.subject) ? query.subject : null;
      title = '真题';
    } else if (name === 'glossary') {
      html = glossaryView(store, query);
      nav = 'glossary';
      title = '术语库';
    } else if (name === 'code') {
      html = codeView(store, query);
      nav = 'code';
      title = '代码库';
    } else if (name === 'diagrams') {
      html = diagramsView(store, query);
      nav = 'diagrams';
      title = '图解库';
    } else if (name === 'guide') {
      html = guideView(store);
      nav = 'guide';
      title = '使用手册';
    }
  } catch (err) {
    console.error('[408] 渲染失败', err);
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
  updateMapNav(subjectId);
  setDocTitle(title);

  if (scroll && route.path !== lastPath) {
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    html.style.scrollBehavior = previous;
  }
  lastPath = route.path;
  afterRender(route);
}

function afterRender(route) {
  const [name, param] = route.parts;
  if (name === 'questions' && route.query.q) {
    requestAnimationFrame(() => {
      const el = document.getElementById(route.query.q);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 146;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      el.classList.add('is-flash');
      setTimeout(() => el.classList.remove('is-flash'), 1400);
      renderMath(el.querySelector('.q-stem'));
      renderMath(el.querySelector('.q-options'));
    });
  }
  if (name === 'topic' && param) {
    hydrateTopicArticle(param);
  }
  if (name === 'code') {
    renderMath(document.querySelector('.code-grid'));
  }
}

/* ---------------- 交互 ---------------- */

function updateLevelUI(topicId, level) {
  $$(`.level-btn[data-topic="${topicId}"]`).forEach((b) => b.classList.toggle('on', Number(b.dataset.level) === level));
  const text = ['未学', '初识', '熟悉', '掌握', '熟练'][level];
  const due = store.entry(topicId)?.due;
  const activeDot = $('.rail-topic.is-active .rt-dot');
  if (activeDot) activeDot.className = `rt-dot level-${level}`;
  const hint = $('.tl-hint');
  if (hint) {
    hint.textContent = `${level ? `上次 ${fmtDateCN(today())} · ` : ''}${due ? `下次 ${dueLabel(due, today())}` : '标记后自动排期'}`;
  }
  const dueEl = $('.study-due');
  if (dueEl) dueEl.textContent = due ? `下次复习：${dueLabel(due, today())}` : '标记后自动排期';
  const toastMsg = level
    ? `已标记为「${text}」· ${dueLabel(due, today())}复习`
    : '已清除该考点的掌握度';
  toast(toastMsg, 'success');
}

function startChapterRunner(chapterId) {
  const topics = topicsOfChapter(chapterId);
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
  if (action === 'open-search') {
    e.preventDefault();
    openSearch();
    return;
  }
  if (action === 'start-queue') {
    e.preventDefault();
    startRunner(store, store.dailyQueue(10), {
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
  if (action === 'toggle-point') {
    e.preventDefault();
    const point = actionEl.closest('.point');
    if (!point) return;
    const open = point.dataset.open === 'true';
    point.dataset.open = open ? 'false' : 'true';
    actionEl.setAttribute('aria-expanded', String(!open));
    return;
  }
  if (action === 'toggle-all-points') {
    e.preventDefault();
    const points = $$('.point');
    const anyClosed = points.some((p) => p.dataset.open !== 'true');
    points.forEach((p) => {
      p.dataset.open = anyClosed ? 'true' : 'false';
      p.querySelector('.point-head')?.setAttribute('aria-expanded', String(anyClosed));
    });
    const span = actionEl.querySelector('span');
    if (span) span.textContent = anyClosed ? '收起全部' : '展开全部';
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
  if (action === 'toggle-question') {
    e.preventDefault();
    const card = actionEl.closest('.q-card');
    if (!card) return;
    const open = card.dataset.open === 'true';
    card.dataset.open = open ? 'false' : 'true';
    actionEl.setAttribute('aria-expanded', String(!open));
    if (!open) {
      renderMath(card.querySelector('.q-stem'));
      renderMath(card.querySelector('.q-options'));
    }
    return;
  }
  if (action === 'reveal-answer') {
    e.preventDefault();
    const card = actionEl.closest('.q-card');
    if (!card) return;
    const analysis = card.querySelector('.q-analysis');
    if (!analysis) return;
    const qid = card.dataset.q;
    const q = QUESTIONS.find((x) => x.id === qid);
    if (analysis.dataset.loaded !== '1') {
      analysis.innerHTML = `<div class="q-analysis-head">${icon('check', 16)}<span>答案与解析</span>${q?.answer ? `<span class="q-answer">正确答案 <b>${escapeHtml(q.answer)}</b></span>` : ''}</div>
        <div class="q-analysis-body">${q?.analysis || '<p>暂无解析。</p>'}</div>`;
      analysis.dataset.loaded = '1';
    }
    analysis.hidden = false;
    renderMath(analysis);
    card.dataset.revealed = 'true';
    if (q?.answer) {
      const opt = card.querySelector(`.opt[data-letter="${q.answer}"]`);
      if (opt) opt.classList.add('is-correct');
    }
    actionEl.innerHTML = `${icon('check', 15)} 已显示解析`;
    actionEl.disabled = true;
    store.markQuestionSeen();
    return;
  }
  if (action === 'shuffle-question') {
    e.preventDefault();
    const list = filteredQuestions(parseHash().query);
    if (!list.length) {
      toast('当前筛选下没有题目。');
      return;
    }
    const pick = list[Math.floor(Math.random() * list.length)];
    const { query } = parseHash();
    const params = new URLSearchParams();
    Object.entries(query).forEach(([k, v]) => { if (k !== 'q') params.set(k, v); });
    params.set('q', pick.id);
    location.hash = `#/questions?${params.toString()}`;
    return;
  }
  if (action === 'print') {
    e.preventDefault();
    window.print();
    return;
  }
  if (action === 'export-data') {
    e.preventDefault();
    downloadProgress();
    return;
  }
  if (action === 'import-data') {
    e.preventDefault();
    $('#import-file')?.click();
    return;
  }
  if (action === 'reset-data') {
    e.preventDefault();
    if (window.confirm('确定要清空本机保存的全部复习进度吗？此操作不可撤销，建议先导出备份。')) {
      store.reset();
      toast('已重置进度');
      render({ scroll: false });
    }
    return;
  }
}

function filteredQuestions(query) {
  let list = QUESTIONS.slice();
  if (query.subject === 'ds' || query.subject === 'coa') list = list.filter((q) => q.subject === query.subject);
  if (query.chapter && chapterById.has(query.chapter)) list = list.filter((q) => q.chapter === query.chapter);
  if (query.year && /^\d{4}$/.test(query.year)) list = list.filter((q) => q.year === Number(query.year));
  if (query.type && ['选择', '综合'].includes(query.type)) list = list.filter((q) => q.type === query.type);
  return list;
}

function downloadProgress() {
  const blob = new Blob([store.exportData()], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `review408-progress-${today()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast('进度已导出');
}

function updateFilter(key, value) {
  const { query } = parseHash();
  const params = new URLSearchParams();
  Object.entries(query).forEach(([k, v]) => {
    if (k !== key && k !== 'q') params.set(k, v);
  });
  if (value && value !== 'all') params.set(key, value);
  if (key === 'subject') params.delete('chapter');
  location.hash = `#/questions${params.toString() ? `?${params}` : ''}`;
}

/* ---------------- 事件绑定 ---------------- */

document.addEventListener('click', (e) => {
  const actionEl = e.target.closest('[data-action]');
  if (actionEl) {
    handleAction(actionEl, e);
    return;
  }
  const searchTrigger = e.target.closest('#search-trigger');
  if (searchTrigger) {
    e.preventDefault();
    openSearch();
    return;
  }
  // 站内锚点：#recite / #3- 这类不能走 hash 路由，否则会被当成新页面。
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

document.addEventListener('change', (e) => {
  const select = e.target.closest('select[data-filter]');
  if (select) {
    updateFilter(select.dataset.filter, select.value);
    return;
  }
  if (e.target.matches('[data-action="toggle-countdown"]')) {
    store.setSetting('countdown', e.target.checked);
    return;
  }
  if (e.target.id === 'import-file' && e.target.files?.[0]) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      try {
        store.importData(String(reader.result));
        toast('进度已导入');
        render({ scroll: false });
      } catch (err) {
        toast(`导入失败：${err.message}`, 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }
});

document.addEventListener('input', (e) => {
  const input = e.target.closest('[data-glossary-search]');
  if (input) filterGlossary(input.value);
  const codeInput = e.target.closest('[data-code-search]');
  if (codeInput) filterCode(codeInput.value);
});

document.addEventListener('keydown', (e) => {
  if (isOverlayOpen()) return;
  const tag = e.target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.isContentEditable) return;
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openSearch();
    return;
  }
  if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey) {
    e.preventDefault();
    openSearch();
    return;
  }
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
if (!/Mac|iPhone|iPad/.test(navigator.platform || '')) {
  const k = document.querySelector('.search-trigger kbd');
  if (k) k.textContent = 'Ctrl K';
}
updateThemeUI();
render();
