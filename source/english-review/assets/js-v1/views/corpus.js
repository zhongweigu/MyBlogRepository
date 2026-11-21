import { CORPUS, EXTRA_CORPUS, THEME_MAP } from "../data/corpus.js";
import { escapeHtml, icon, footer, srcMark } from "../ui.js";

const SLOT_NAMES = {
  behavior: "【具体行为】个人行为",
  outcome: "【可见成果】个人成果",
  field: "【相关领域】政策领域",
  capacity: "【个人能力/行为】政策能力",
  effect: "【社会效果】社会效果",
  strategy: "【相关战略】相关战略",
  change: "【社会变化】社会变化",
};

function slotBlock(v, key) {
  const items = v.slots[key] || [];
  if (!items.length) return "";
  if (key === "strategy") {
    return `<div class="slot-block" data-slot="${key}">
      <h4>${SLOT_NAMES[key]}</h4>
      <ul class="slot-list">
        ${items.map((it) => `<li class="is-group"><span class="en">${escapeHtml(it.en)}</span><span class="zh">${escapeHtml(it.zh)}</span></li>${(it.subs || []).map(([zh, en]) => `<li class="is-sub"><span class="en">${escapeHtml(en)}</span><span class="zh">${escapeHtml(zh)}</span></li>`).join("")}`).join("")}
      </ul>
    </div>`;
  }
  return `<div class="slot-block" data-slot="${key}">
    <h4>${SLOT_NAMES[key]}</h4>
    <ul class="slot-list">
      ${items.map(([en, zh]) => `<li><span class="en">${escapeHtml(en)}</span><span class="zh">${escapeHtml(zh)}</span></li>`).join("")}
    </ul>
  </div>`;
}

export function corpusView() {
  const total = CORPUS.reduce((n, v) => n + Object.values(v.slots).reduce((m, arr) => m + arr.length, 0), 0);
  return `<section class="view view-corpus">
    <div class="en-hero">
      <div>
        <p class="eyebrow">CORPUS · 七类核心价值观</p>
        <h1>主题词先归类，<em>再取语料</em></h1>
        <p class="lede">整份语料库按「价值观 → 7 个槽位」重排：先确定主题词属于哪一类，再按模板的空位取词。七个槽位与模板的七个填空一一对应，取词时直接看词性。</p>
      </div>
      <div class="en-hero-side">
        <div class="en-hero-stat"><span>价值观</span><b>${CORPUS.length}</b></div>
        <div class="en-hero-stat"><span>条目</span><b>${total}</b></div>
        <div class="en-hero-stat"><span>槽位</span><b>7</b></div>
        <div class="en-hero-stat"><span>来源</span><b>PDF</b></div>
      </div>
    </div>

    <div class="en-filter" style="margin-top:18px">
      <input type="search" id="corpus-search" placeholder="搜英文或中文，例如 livable / 宜居 / 养老" aria-label="搜索语料">
      <select id="corpus-slot" style="padding:7px 10px;border:1px solid var(--line);border-radius:6px;background:var(--card);color:var(--ink);font-size:12px">
        <option value="">全部槽位</option>
        ${Object.entries(SLOT_NAMES).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}
      </select>
      <button type="button" class="btn btn-sm" data-action="corpus-reset">重置</button>
    </div>

    <div class="filter-chips" style="margin-bottom:16px">
      ${CORPUS.map((v) => `<a class="filter-chip" href="#v-${v.id}" data-local-anchor>${v.no}. ${v.name} <span class="muted">${v.en}</span></a>`).join("")}
    </div>

    <div class="en-note">${srcMark("A")} 条目与中英对照逐条来自《语料库部分》；${srcMark("B")} 分组标题的英文概括（如 the seven guarantees）、槽位归类与真题覆盖标注为整理。友善 / 爱国 / 诚信三类在 PDF 中排在分栏右侧，已复原。</div>

    <div id="corpus-list">
      ${CORPUS.map((v) => `<div class="value-card" id="v-${v.id}" data-value="${v.id}" style="margin-top:16px">
        <div class="value-head">
          <h2>${v.no}. ${v.name}</h2>
          <span class="en-name">${v.en}</span>
          ${v.priority ? '<span class="en-tag is-a">重点</span>' : ""}
        </div>
        <p class="value-meta"><b>适用主题：</b>${v.themes}</p>
        <p class="value-meta"><b>真题覆盖（原 PDF 标注）：</b>${v.exams}</p>
        <div class="en-grid cols-2" style="margin-top:10px">
          ${["behavior", "outcome", "field", "capacity", "effect", "change"].map((k) => slotBlock(v, k)).join("")}
        </div>
        ${slotBlock(v, "strategy")}
      </div>`).join("")}
    </div>

    <div class="en-section">
      <div class="en-section-head"><h2>自主补充语料（选背）</h2><span class="en-section-note">${srcMark("A")} PDF 末尾单列</span></div>
      <div class="table-card"><div class="table-scroll"><table class="slot-table">
        <thead><tr><th>英文</th><th>中文</th></tr></thead>
        <tbody>${EXTRA_CORPUS.map(([en, zh]) => `<tr><td class="en">${escapeHtml(en)}</td><td>${escapeHtml(zh)}</td></tr>`).join("")}</tbody>
      </table></div></div>
      <p class="muted" style="font-size:12px;margin-top:8px">这 6 条偏“总论”，适合在结尾升华或第二段收束时用一句；不要整段堆政策名词。</p>
    </div>

    <div class="en-section">
      <div class="en-section-head"><h2>主题词决策表</h2><span class="en-section-note">${srcMark("B")} 由七年真题归纳</span></div>
      <div class="table-card"><div class="table-scroll"><table class="slot-table">
        <thead><tr><th>年份</th><th>材料</th><th>价值观</th><th>主题词</th><th>退路</th></tr></thead>
        <tbody>${THEME_MAP.map((t) => `<tr><td>${t.year}</td><td>${t.material}</td><td>${t.valueName}</td><td class="en">${t.theme}<br><span class="muted">${t.themeZh}</span></td><td class="en">${t.fallback}</td></tr>`).join("")}</tbody>
      </table></div></div>
    </div>

    ${footer()}
  </section>`;
}

export function filterCorpus() {
  const q = (document.getElementById("corpus-search")?.value || "").trim().toLowerCase();
  const slot = document.getElementById("corpus-slot")?.value || "";
  document.querySelectorAll("#corpus-list .value-card").forEach((card) => {
    let visibleBlocks = 0;
    card.querySelectorAll(".slot-block").forEach((block) => {
      const slotOk = !slot || block.dataset.slot === slot;
      const text = block.textContent.toLowerCase();
      const textOk = !q || text.includes(q);
      const show = slotOk && textOk;
      block.style.display = show ? "" : "none";
      if (show) visibleBlocks += 1;
    });
    card.style.display = visibleBlocks ? "" : "none";
  });
}
