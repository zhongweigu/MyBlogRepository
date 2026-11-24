import { DICTATION_ITEMS, DICTATION_SCOPES, itemsForScope, normalizeScope } from "../data/dictation.js";
import { escapeHtml, footer, icon, pageHead, renderEn } from "../ui.js";

let pool = [];
let lastId = null;

function scopeSelect(selected) {
  return `<select id="quiz-scope" aria-label="选择题库范围">
    ${DICTATION_SCOPES.map((group) => {
      if (group.options) {
        return `<optgroup label="${escapeHtml(group.label)}">
          ${group.options.map((o) => `<option value="${escapeHtml(o.value)}"${o.value === selected ? " selected" : ""}>${escapeHtml(o.label)}</option>`).join("")}
        </optgroup>`;
      }
      return `<option value="${escapeHtml(group.value)}"${group.value === selected ? " selected" : ""}>${escapeHtml(group.label)}</option>`;
    }).join("")}
  </select>`;
}

function pick() {
  if (!pool.length) return null;
  if (pool.length === 1) return pool[0];
  let item = null;
  let guard = 0;
  do {
    item = pool[Math.floor(Math.random() * pool.length)];
    guard += 1;
  } while (item.id === lastId && guard < 20);
  lastId = item.id;
  return item;
}

function cardHtml(item) {
  if (!item) {
    return `<div class="quiz-card"><p class="quiz-zh">这个范围暂时没有内容。</p></div>`;
  }
  return `<article class="quiz-card" data-item="${escapeHtml(item.id)}">
    <div class="quiz-meta">
      <span>${escapeHtml(item.label)}</span>
      <span>${pool.length} 条</span>
    </div>
    <p class="quiz-instruction">看中文，默写英文。</p>
    <p class="quiz-zh">${escapeHtml(item.zh)}</p>
    ${item.note && item.note !== item.scopeName ? `<p class="quiz-note">用在哪：${escapeHtml(item.note)}</p>` : ""}
    <textarea class="quiz-input" id="quiz-input" rows="3" placeholder="在这里默写（不会检查对错）" spellcheck="false"></textarea>
    <div class="quiz-actions">
      <button type="button" class="btn" data-quiz-next>${icon("shuffle", 15)} 换一张</button>
      <span class="small muted">不检查对错，自己对照答案</span>
    </div>
    <details class="quiz-answer">
      <summary>${icon("eye", 14)} 显示英文答案</summary>
      <p class="en">${renderEn(item.en)}</p>
      <p class="small muted">${escapeHtml(item.label)}</p>
    </details>
  </article>`;
}

function draw(stage) {
  const item = pick();
  stage.innerHTML = cardHtml(item);
}

export function dictationView(query = {}) {
  const scope = normalizeScope(query.scope);
  pool = itemsForScope(scope);
  lastId = null;
  const first = pick();

  return `<section class="view view-dictation" data-scope="${escapeHtml(scope)}">
    ${pageHead({
      eyebrow: "DICTATION · 默写",
      title: "看中文，默写英文",
      desc: "一张卡一条。写不出来就展开答案，不检查对错；点“换一张”继续。范围可以选背诵六类、应用文，或语料的某个主题。",
    })}

    <div class="mode-tabs">
      <a href="#/recite">背诵模板</a>
      <a class="is-active" href="#/dictation">默写自测</a>
    </div>

    <div class="quiz-toolbar">
      <label>范围 ${scopeSelect(scope)}</label>
      <span class="small muted">题库 ${DICTATION_ITEMS.length} 条 · 当前范围 ${pool.length} 条</span>
    </div>

    <div class="quiz-stage" id="quiz-stage">${cardHtml(first)}</div>

    <p class="small muted" style="margin:16px 0 0">题库覆盖背诵模板、13 类应用文和七类语料；中文是提示，英文答案在折叠里。</p>

    ${footer()}
  </section>`;
}

export function initDictation() {
  const stage = document.getElementById("quiz-stage");
  if (!stage || stage.dataset.bound === "1") return;
  stage.dataset.bound = "1";

  stage.addEventListener("click", (e) => {
    if (e.target.closest("[data-quiz-next]")) draw(stage);
  });

  const select = document.getElementById("quiz-scope");
  if (select) {
    select.addEventListener("change", () => {
      const scope = select.value;
      location.hash = scope === "all" ? "#/dictation" : `#/dictation?scope=${scope}`;
    });
  }
}
