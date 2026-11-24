import { CORPUS, EXTRA_CORPUS } from "../data/corpus.js";
import { escapeHtml, footer, pageHead } from "../ui.js";

const SLOTS = [
  ["behavior", "个人行为"],
  ["outcome", "个人成果"],
  ["field", "政策领域"],
  ["capacity", "政策能力"],
  ["effect", "社会效果"],
  ["strategy", "相关战略"],
  ["change", "社会变化"],
];
const SLOT_NAME = Object.fromEntries(SLOTS);
const STOP = new Set("a an the in on of to and for with by at from as its their his her our your this that these those".split(" "));

function highlightLead(en) {
  const tokens = [...en.matchAll(/[A-Za-z][A-Za-z'’-]*/g)];
  const picked = [];
  for (const t of tokens) {
    const w = t[0].toLowerCase();
    if (STOP.has(w)) continue;
    if (!picked.length) picked.push(t);
    else { picked.push(t); break; }
  }
  if (picked.length < 1) return escapeHtml(en);
  const start = picked[0].index;
  const end = picked[picked.length - 1].index + picked[picked.length - 1][0].length;
  return `${escapeHtml(en.slice(0, start))}<b>${escapeHtml(en.slice(start, end))}</b>${escapeHtml(en.slice(end))}`;
}

function row(en, zh) {
  return `<div class="corpus-row"><div class="corpus-en">${highlightLead(en)}</div><div class="corpus-zh">${escapeHtml(zh)}</div></div>`;
}

function strategyRow(it) {
  return `<div class="corpus-row"><div class="corpus-en">${highlightLead(it.en)}</div><div class="corpus-zh">${escapeHtml(it.zh)}</div></div>
    ${(it.subs || []).map(([zh, en]) => `<div class="corpus-row corpus-sub"><div class="corpus-en">${highlightLead(en)}</div><div class="corpus-zh">${escapeHtml(zh)}</div></div>`).join("")}`;
}

export function corpusView() {
  return `<section class="view view-corpus">
    ${pageHead({
      eyebrow: "CORPUS · 语料",
      title: "主题词定了，来这里取词",
      desc: "按七类价值观 × 七个槽位排列；英文是主体，下划线处是核心搭配。先记短句，再记长句。",
    })}

    <div class="corpus-toolbar">
      <input type="search" id="corpus-search" placeholder="搜英文或中文，例如 livable / 宜居 / 养老" aria-label="搜索语料">
      <select id="corpus-slot" aria-label="按槽位筛选">
        <option value="">全部槽位</option>
        ${SLOTS.map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}
      </select>
      <button type="button" class="btn btn-sm" data-action="corpus-reset">重置</button>
    </div>

    <nav class="recite-index" aria-label="价值观索引">
      ${CORPUS.map((v) => `<a href="#/corpus?v=${v.id}"><b>${v.no}</b>${v.name}</a>`).join("")}
      <a href="#/corpus?v=extra"><b>+</b>选背</a>
    </nav>

    ${CORPUS.map((v) => `<section class="corpus-value" id="corpus-${v.id}" data-value="${v.id}">
      <h2>${v.no}. ${v.name}<span class="en">${v.en}</span></h2>
      <p class="meta">适用：${escapeHtml(v.themes)}　|　真题：${escapeHtml(v.exams)}</p>
      ${SLOTS.map(([slot, label]) => {
        const items = v.slots[slot] || [];
        if (!items.length) return "";
        return `<div class="corpus-slot" data-slot="${slot}">
          <h4>${label}</h4>
          ${items.map((it) => (slot === "strategy" ? strategyRow(it) : row(it[0], it[1]))).join("")}
        </div>`;
      }).join("")}
    </section>`).join("")}

    <section class="corpus-value" id="corpus-extra" data-value="extra">
      <h2>选背 · 总论<span class="en">EXTRA</span></h2>
      <p class="meta">原 PDF 末尾单列，适合结尾升华或第二段收束用一句。</p>
      <div class="corpus-slot" data-slot="extra">
        ${EXTRA_CORPUS.map(([en, zh]) => row(en, zh)).join("")}
      </div>
    </section>

    ${footer()}
  </section>`;
}

export function filterCorpus() {
  const q = (document.getElementById("corpus-search")?.value || "").trim().toLowerCase();
  const slot = document.getElementById("corpus-slot")?.value || "";
  document.querySelectorAll(".view-corpus .corpus-value").forEach((card) => {
    let visible = 0;
    card.querySelectorAll(".corpus-slot").forEach((block) => {
      const slotOk = !slot || block.dataset.slot === slot;
      const textOk = !q || block.textContent.toLowerCase().includes(q);
      const show = slotOk && textOk;
      block.style.display = show ? "" : "none";
      if (show) visible += 1;
    });
    card.style.display = visible ? "" : "none";
  });
}
