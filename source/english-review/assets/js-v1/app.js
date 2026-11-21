import { todayView } from "./views/today.js";
import { deskView, assemble, refreshSlots } from "./views/desk.js";
import { reciteView } from "./views/recite.js";
import { corpusView, filterCorpus } from "./views/corpus.js";
import { examsView } from "./views/exams.js";
import { strategyView, hydrateStrategy } from "./views/strategy.js";
import { sourcesView } from "./views/sources.js";
import { $, $$, toast, closeOverlay, isOverlayOpen, icon, escapeHtml, footer, showOverlay } from "./ui.js";

const THEME_KEY = "reviewmy.theme";
const app = $("#app");
let lastPath = null;
let lastReciteTab = null;

/* ---------------- 主题 ---------------- */

function currentTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function updateThemeUI() {
  const btn = $("#theme-toggle");
  if (!btn) return;
  const theme = currentTheme();
  btn.innerHTML = icon(theme === "dark" ? "sun" : "moon", 18);
  btn.setAttribute("aria-label", theme === "dark" ? "切换到浅色模式" : "切换到深色模式");
  btn.setAttribute("title", theme === "dark" ? "浅色模式" : "深色模式");
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* noop */ }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#121716" : "#f4f1e9");
  updateThemeUI();
}

function toggleTheme() {
  setTheme(currentTheme() === "dark" ? "light" : "dark");
}

/* ---------------- 路由 ---------------- */

function parseHash() {
  let raw = location.hash.replace(/^#/, "");
  if (!raw) raw = "/today";
  const [pathPart, qs = ""] = raw.split("?");
  const parts = pathPart.split("/").filter(Boolean);
  const query = {};
  new URLSearchParams(qs).forEach((v, k) => { query[k] = v; });
  return { parts, query, path: parts.join("/") };
}

function updateNav(nav) {
  $$("[data-nav]").forEach((el) => {
    const on = el.dataset.nav === nav;
    el.classList.toggle("is-active", on);
    if (on) el.setAttribute("aria-current", "page");
    else el.removeAttribute("aria-current");
  });
}

function setDocTitle(title) {
  document.title = title ? `${title} · 英语复习台` : "英语复习台 · 考研英语一作文";
}

function render({ scroll = true } = {}) {
  const route = parseHash();
  const { parts } = route;
  const name = parts[0] || "today";
  let html = null;
  let nav = "today";
  let title = "";

  try {
    if (name === "today") {
      html = todayView();
      nav = "today";
      title = "今日";
    } else if (name === "desk") {
      html = deskView();
      nav = "desk";
      title = "写作台";
    } else if (name === "recite") {
      html = reciteView(route.query);
      nav = "recite";
      title = "背诵库";
    } else if (name === "corpus") {
      html = corpusView();
      nav = "corpus";
      title = "语料库";
    } else if (name === "exams") {
      html = examsView(route.query);
      nav = "exams";
      title = `真题 · ${route.query.year || "2026"}`;
    } else if (name === "strategy") {
      html = strategyView(parts, route.query);
      nav = "strategy";
      title = "策略";
    } else if (name === "sources") {
      html = sourcesView();
      nav = "sources";
      title = "资料与完整性";
    }
  } catch (err) {
    console.error("[英语] 渲染失败", err);
    html = errorView(err);
    nav = "";
    title = "出错了";
  }

  if (!html) {
    html = notFoundView();
    nav = "";
    title = "未找到页面";
  }

  app.innerHTML = html;
  app.dataset.view = name;
  updateNav(nav);
  setDocTitle(title);

  if (scroll && (route.path !== lastPath || (name === "recite" && (route.query.tab || "big") !== lastReciteTab))) {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previous;
  }
  if (name === "recite") lastReciteTab = route.query.tab || "big";
  lastPath = route.path;
  afterRender(route);
}

function afterRender(route) {
  const [name, param] = route.parts;
  if (name === "strategy" && param) hydrateStrategy(param);
  if (name === "recite" && route.query.tab === "big" && route.query.v) {
    const target = document.getElementById(`v-${route.query.v}`);
    if (target) setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  }
  if (name === "recite" && route.query.tab === "letters" && route.query.open) {
    const target = document.querySelector(`[data-letter="${route.query.open}"]`);
    if (target) setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  }
  if (name === "desk") {
    assemble();
    ["dk-material", "dk-value", "dk-theme", "dk-desc", "dk-behavior", "dk-outcome", "dk-field", "dk-capacity", "dk-effect", "dk-strategy", "dk-change"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", assemble);
      if (el) el.addEventListener("change", () => {
        if (id === "dk-value") refreshSlots(el.value);
        assemble();
      });
    });
  }
}

/* ---------------- 交互 ---------------- */

function handleAction(actionEl, e) {
  const action = actionEl.dataset.action;
  if (!action) return;

  if (action === "zoom-image") {
    e.preventDefault();
    const src = actionEl.dataset.src;
    const caption = actionEl.dataset.caption || "";
    const overlay = showOverlay(`<div class="image-viewer" role="group" aria-label="查看配图">
      <button type="button" class="icon-btn image-close" data-image-close aria-label="关闭图片">${icon("close", 20)}</button>
      <img src="${escapeHtml(src)}" alt="${escapeHtml(caption)}">
      ${caption ? `<p class="image-caption">${escapeHtml(caption)}</p>` : ""}
    </div>`, { className: "overlay-image" });
    overlay.addEventListener("click", (ev) => {
      if (ev.target === overlay || ev.target.closest("[data-image-close]")) closeOverlay();
    });
    return;
  }
  if (action === "skip-to-main") {
    e.preventDefault();
    const main = document.getElementById("app");
    if (main) {
      main.focus({ preventScroll: true });
      main.scrollIntoView({ block: "start" });
    }
    return;
  }
  if (action === "theme-toggle") {
    e.preventDefault();
    toggleTheme();
    return;
  }
  if (action === "desk-build") {
    e.preventDefault();
    assemble();
    toast("已按当前选择生成三段");
    return;
  }
  if (action === "desk-random") {
    e.preventDefault();
    const pick = (sel) => {
      const s = document.getElementById(sel);
      if (!s || !s.options.length) return;
      s.selectedIndex = Math.floor(Math.random() * s.options.length);
    };
    ["dk-behavior", "dk-outcome", "dk-field", "dk-capacity", "dk-effect", "dk-strategy", "dk-change"].forEach(pick);
    assemble();
    toast("已在当前价值观内随机换一组语料");
    return;
  }
  if (action === "desk-copy") {
    e.preventDefault();
    const out = document.getElementById("desk-output");
    const text = out ? Array.from(out.querySelectorAll(".essay p")).map((p) => p.textContent).join("\n\n") : "";
    if (!text) {
      toast("先生成三段", "error");
      return;
    }
    navigator.clipboard?.writeText(text).then(() => toast("已复制三段")).catch(() => toast("复制失败，请手动选择", "error"));
    return;
  }
  if (action === "corpus-reset") {
    e.preventDefault();
    const s = document.getElementById("corpus-search");
    const sel = document.getElementById("corpus-slot");
    if (s) s.value = "";
    if (sel) sel.value = "";
    filterCorpus();
    return;
  }
  if (action === "print") {
    e.preventDefault();
    window.print();
    return;
  }
}

document.addEventListener("click", (e) => {
  const actionEl = e.target.closest("[data-action]");
  if (actionEl) {
    handleAction(actionEl, e);
    return;
  }
  const local = e.target.closest("a[data-local-anchor]");
  if (local) {
    e.preventDefault();
    const id = (local.getAttribute("href") || "").replace(/^#/, "");
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
});

document.addEventListener("input", (e) => {
  if (e.target.closest("#corpus-search")) filterCorpus();
});

document.addEventListener("keydown", (e) => {
  if (isOverlayOpen()) return;
  const tag = e.target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || e.target.isContentEditable) return;
  if (e.key === "Escape") return;
});

window.addEventListener("hashchange", () => render());
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isOverlayOpen()) closeOverlay();
});

function errorView(err) {
  return `<section class="view"><div class="error-card">
    <p class="eyebrow">RENDER ERROR</p>
    <h1>页面渲染失败</h1>
    <p>${escapeHtml(err?.message || String(err))}</p>
    <p class="muted">打开浏览器控制台可以看到完整堆栈。</p>
    <a class="btn" href="#/today">${icon("home", 15)} 回到今日</a>
  </div>${footer()}</section>`;
}

function notFoundView() {
  return `<section class="view"><div class="error-card">
    <p class="eyebrow">404</p>
    <h1>这个页面不存在</h1>
    <p>链接可能拼错了，或者内容已经移动。</p>
    <div class="error-actions">
      <a class="btn btn-primary" href="#/today">${icon("calendar", 15)} 今日复习</a>
      <a class="btn" href="#/strategy">${icon("map", 15)} 策略目录</a>
    </div>
  </div>${footer()}</section>`;
}

/* ---------------- 启动 ---------------- */

if (!location.hash) {
  history.replaceState(null, "", "#/today");
}
updateThemeUI();
render();
