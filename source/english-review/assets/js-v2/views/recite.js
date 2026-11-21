import { RECITE_GROUPS, RECITE_COUNT, LETTER_TPL } from "../data/recite-groups.js";
import { LETTERS } from "../data/letters.js";
import { escapeHtml, icon, footer, pageHead, renderEn } from "../ui.js";

function sectionHtml(section, group) {
  const items = section.items || [];
  if (!items.length) return "";
  return `<section class="tpl-section" id="s-${group.id}-${section.id}">
    <div class="tpl-section-head">
      <h3>${escapeHtml(section.name)}</h3>
      <span class="hint">${escapeHtml(section.hint || "")}</span>
    </div>
    <ol class="tpl-list">
      ${items.map((it, i) => `<li class="tpl-row">
        <span class="tpl-num">${String(i + 1).padStart(2, "0")}</span>
        <div>
          <p class="tpl-en">${renderEn(it.en)}</p>
          <p class="tpl-zh">${escapeHtml(it.zh || "")}${it.use ? `<span class="tpl-use">· ${escapeHtml(it.use)}</span>` : ""}${it.src ? `<span class="src-mark src-${it.src.toLowerCase()}">${it.src}</span>` : ""}</p>
        </div>
      </li>`).join("")}
    </ol>
  </section>`;
}

function groupHtml(group) {
  const count = group.sections.reduce((n, s) => n + (s.items?.length || 0), 0);
  return `<section class="recite-group" id="g-${group.id}">
    <div class="group-head">
      <h2>${escapeHtml(group.no)}、${escapeHtml(group.name)}</h2>
      <span class="en">${escapeHtml(group.id)}</span>
      <span class="count">${count} 句</span>
    </div>
    ${group.note ? `<p class="group-note">${escapeHtml(group.note)}</p>` : ""}
    ${group.sections.map((s) => sectionHtml(s, group)).join("")}
  </section>`;
}

function letterHtml(l) {
  const tpl = LETTER_TPL[l.id] || { opening: [], body: [], closing: [] };
  const col = (title, list) => `<div class="letter-tpl-col">
    <h4>${title}</h4>
    ${list.map((x) => `<p>${renderEn(x.en)}<br><span class="tpl-zh">${escapeHtml(x.zh || "")}</span></p>`).join("")}
  </div>`;
  return `<section class="letter-card" data-letter="${l.id}" id="l-${l.id}">
    <h3>${escapeHtml(l.name)} <span class="src-mark src-c">C</span></h3>
    <p class="meta">${escapeHtml(l.use)} · ${escapeHtml(l.tone)}</p>
    <div class="letter-tpl">
      ${col("开头 · OPENING", tpl.opening)}
      ${col("主体 · BODY", tpl.body)}
      ${col("结尾 · CLOSING", tpl.closing)}
    </div>
    <details style="margin-top:8px">
      <summary class="small muted" style="cursor:pointer">看完整范文（约 100 词）</summary>
      <div class="letter-sample">
        ${l.sample.en.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
      </div>
    </details>
    <p class="letter-extra"><b>替换：</b>${l.swaps.map(([zh, en]) => `${zh} → <span style="font-family:Georgia,serif">${escapeHtml(en)}</span>`).join("；")}</p>
    <p class="letter-extra"><b>易错：</b>${l.pitfalls.join("；")}</p>
  </section>`;
}

export function reciteView(query = {}) {
  const only = RECITE_GROUPS.some((g) => g.id === query.g) || query.g === "letters" ? query.g : "";
  const groups = only && only !== "letters" ? RECITE_GROUPS.filter((g) => g.id === only) : only === "letters" ? [] : RECITE_GROUPS;
  const showLetters = !only || only === "letters";
  return `<section class="view view-recite">
    ${pageHead({
      eyebrow: "RECITE · 背诵",
      title: "先背句子，再谈策略",
      desc: "按段落功能分组，一句一行；<mark class=\"hl\">高亮</mark>处是核心搭配，先记它。英文是主体，中文只做注释。应用文模板在最后。",
    })}

    <nav class="recite-index" aria-label="背诵分组">
      ${RECITE_GROUPS.map((g) => `<a href="#/recite?g=${g.id}"><b>${g.no}</b>${escapeHtml(g.name)}</a>`).join("")}
      <a href="#/recite?g=letters"><b>七</b>应用文</a>
      <span class="muted" style="margin-left:auto">${RECITE_COUNT} 句模板</span>
    </nav>
    ${only ? `<p class="small" style="margin:10px 0 0"><a href="#/recite">← 显示全部六类</a></p>` : ""}

    ${groups.map(groupHtml).join("")}

    ${showLetters ? `<section class="recite-group" id="g-letters">
      <div class="group-head">
        <h2>七、应用文</h2>
        <span class="en">letters</span>
        <span class="count">${LETTERS.length} 类</span>
      </div>
      <p class="group-note">每类先给可背模板（开头 / 主体 / 结尾），点开看完整范文。约 100 词，三个要点必须写全。</p>
      ${LETTERS.map(letterHtml).join("")}
    </section>` : ""}

    ${footer()}
  </section>`;
}
