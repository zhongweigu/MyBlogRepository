import { EXAMS } from "../data/exams.js";
import { escapeHtml, icon, footer, srcMark } from "../ui.js";

function sentences(text) {
  const out = [];
  let start = 0;
  for (let i = 0; i < text.length; i += 1) {
    const c = text[i];
    if (c === "." || c === "!" || c === "?") {
      let j = i + 1;
      if (text[j] === '"' || text[j] === "”") j += 1;
      if (text[j] === " ") {
        const next = text[j + 1] || "";
        if (/[A-Z“"]/.test(next)) {
          out.push(text.slice(start, i + 1));
          start = j + 1;
          i = j;
        }
      }
    }
  }
  if (start < text.length) out.push(text.slice(start));
  return out.filter((s) => s.trim());
}

function paragraphs(essay) {
  const ss = sentences(essay);
  const i2 = ss.findIndex((s) => s.includes("has attracted attention") || s.startsWith("To begin with"));
  const i3 = ss.findIndex((s) => s.startsWith("In conclusion"));
  if (i2 < 0 || i3 < 0) return [essay];
  return [ss.slice(0, i2).join(" "), ss.slice(i2, i3).join(" "), ss.slice(i3).join(" ")];
}

function yearTabs(active) {
  return `<div class="exam-year-tabs">
    ${EXAMS.map((e) => `<a class="exam-year-tab${e.year === active.year ? " is-active" : ""}" href="#/exams?year=${e.year}">${e.year}</a>`).join("")}
  </div>`;
}

function versionView(exam, idx, query) {
  const v = exam.versions[idx];
  const paras = paragraphs(v.essay);
  const words = v.essay.split(/\s+/).filter(Boolean).length;
  return `<div class="en-section">
    <div class="en-section-head"><h2>范文 · ${v.name}</h2><span class="en-section-note">${words} 词 · ${v.themeZh}</span></div>
    <p class="muted" style="font-size:12px;margin:0 0 10px">${v.note}</p>
    <div class="essay">
      <div class="essay-meta"><b>${escapeHtml(v.theme)}</b>${srcMark("A")}</div>
      ${paras.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
    </div>
    <details style="margin-top:10px">
      <summary style="cursor:pointer;font-size:12px;color:var(--ink-3)">展开中文对照</summary>
      <div class="essay-zh" style="margin-top:8px"><p>${escapeHtml(v.zh)}</p></div>
    </details>
    <div class="en-tags" style="margin-top:12px">
      <a class="en-tag" href="#/exams?year=${exam.year}&v=${Math.max(0, idx - 1)}">上一版</a>
      <a class="en-tag" href="#/exams?year=${exam.year}&v=${Math.min(3, idx + 1)}">下一版</a>
      <span class="en-tag">${idx + 1} / 4</span>
    </div>
  </div>`;
}

export function examsView(query = {}) {
  const year = EXAMS.some((e) => e.year === query.year) ? query.year : EXAMS[0].year;
  const exam = EXAMS.find((e) => e.year === year);
  const vi = Math.min(3, Math.max(0, Number(query.v || 0)));
  const v = exam.versions[vi];

  return `<section class="view view-exams">
    <div class="en-hero">
      <div>
        <p class="eyebrow">EXAMS · 2020–2026</p>
        <h1>七年真题，<em>四版范文对照</em></h1>
        <p class="lede">每年收录满分版、简化版、速通标准与速通无脑四篇。先看主题词怎么从材料里长出来，再看同一主题如何用不同骨架承载；最后看填空拆解，确认每个词从哪来。</p>
      </div>
      <div class="en-hero-side">
        <div class="en-hero-stat"><span>年份</span><b>7</b></div>
        <div class="en-hero-stat"><span>范文</span><b>28 篇</b></div>
        <div class="en-hero-stat"><span>官方定性</span><b>3 年</b></div>
        <div class="en-hero-stat"><span>题目原图</span><b>7</b></div>
      </div>
    </div>

    ${yearTabs(exam)}

    <div class="en-grid cols-2" style="margin-top:18px;align-items:start">
      <div>
        <div class="en-section-head" style="margin-top:0"><h2>${exam.year} · ${exam.title}</h2><span class="en-section-note">${exam.kind}</span></div>
        <p style="font-size:12.5px;line-height:1.85;color:var(--ink-2)">${exam.material}</p>
        ${exam.official ? `<div class="en-note" style="margin-top:10px"><b>官方定性（${srcMark("A")}）：</b>${exam.official}<br><span style="font-size:11px;color:var(--ink-3)">${exam.officialNote}</span></div>` : `<div class="en-note" style="margin-top:10px"><b>官方定性：</b>未收录。<br><span style="font-size:11px;color:var(--ink-3)">${exam.officialNote}</span></div>`}
      </div>
      <figure class="exam-figure">
        <a href="${exam.image}" data-action="zoom-image" data-src="${exam.image}" data-caption="${exam.year} 年英语一 B 节题目材料">
          <img src="${exam.image}" alt="${exam.year} 年英语一作文题目材料" loading="lazy">
        </a>
        <figcaption>${exam.year} 年题目材料 · 点击看大图（从 PDF 裁切）</figcaption>
      </figure>
    </div>

    <div class="en-section">
      <div class="en-section-head"><h2>审题与主题</h2><span class="en-section-note">${srcMark("B")} 整理自 PDF 写作解析</span></div>
      <div class="en-grid cols-3">
        <div class="en-card"><span class="en-card-no">01 信息</span><p>${exam.analysis.info}</p></div>
        <div class="en-card"><span class="en-card-no">02 含义</span><p>${exam.analysis.meaning}</p></div>
        <div class="en-card"><span class="en-card-no">03 主题</span><p>${exam.analysis.choice}</p></div>
      </div>
    </div>

    <div class="ver-tabs">
      ${exam.versions.map((ver, i) => `<a class="ver-tab${i === vi ? " is-active" : ""}" href="#/exams?year=${exam.year}&v=${i}">${ver.name}</a>`).join("")}
    </div>

    ${versionView(exam, vi, query)}

    <div class="en-section">
      <div class="en-section-head"><h2>满分版填空拆解</h2><span class="en-section-note">${srcMark("B")} 每个词从哪来</span></div>
      <div class="table-card"><div class="table-scroll"><table class="slot-table">
        <thead><tr><th>槽位</th><th>填入</th><th>中文</th><th>语料出处</th></tr></thead>
        <tbody>${exam.slots.map((s) => `<tr><td>${s[0]}</td><td class="en">${escapeHtml(s[1])}</td><td>${escapeHtml(s[2])}</td><td style="font-size:11.5px">${escapeHtml(s[3])}</td></tr>`).join("")}</tbody>
      </table></div></div>
    </div>

    <div class="en-section">
      <div class="en-section-head"><h2>这一年的三个提醒</h2><span class="en-section-note">${srcMark("B")} 归纳</span></div>
      <div class="en-note">${exam.takeaways.map((t, i) => `${i + 1}. ${t}`).join("<br>")}</div>
    </div>

    <div class="en-section">
      <div class="en-section-head"><h2>四版怎么选</h2><span class="en-section-note">同一道题，四种负担</span></div>
      <div class="grid" style="display:grid;gap:8px">
        ${exam.versions.map((ver, i) => `<div class="en-card" style="padding:12px 14px">
          <span class="en-card-no">${ver.name} · ${ver.words || ""} 词</span>
          <p style="font-family:Georgia,serif">${escapeHtml(ver.theme)}</p>
          <p>${ver.note}</p>
        </div>`).join("")}
      </div>
    </div>

    ${footer()}
  </section>`;
}
