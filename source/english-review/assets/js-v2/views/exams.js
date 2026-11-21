import { EXAMS } from "../data/exams.js";
import { escapeHtml, footer, pageHead } from "../ui.js";

const YEARS = ["2026", "2025", "2024", "2023", "2021"];

// 可背句：按年份标出，渲染时高亮（长句优先，避免嵌套）
const REUSE = {
  2026: [
    "reveal notable differences concerning",
    "accounts for the largest share",
    "followed by",
    "At the individual level, it is reflected in the way people",
    "ultimately contributing to",
    "National policies on",
    "empowering individuals to",
    "Beyond personal advancement, this principle can strengthen communities by",
    "laying the groundwork for sustainable progress",
    "This is in line with national strategies for",
    "a rational consensus has emerged",
  ],
  2025: [
    "The figures in the table reveal notable changes concerning",
    "rose sharply from about",
    "increased slightly from roughly",
    "while that of",
    "At the individual level, it is reflected in the way people",
    "ultimately contributing to",
    "Beyond personal advancement",
    "raising living standards",
    "as this principle takes root",
  ],
  2024: [
    "Though deceptively simple, this scene conveys a meaningful message",
    "with one saying",
    "while the accompanying bar chart shows that",
    "It serves as a compelling testament to the significance of",
    "pursue healthy lifestyles in well-designed environments",
    "access improved public services and recreational facilities",
    "fostering neighborhood ties and mutual support",
  ],
  2023: [
    "on a hillside overlooking their village",
    "with one remarking joyfully",
    "It serves as a compelling testament to the significance of",
    "participate in cultural practices and preserve shared customs",
    "meaningful connections to history and community",
    "appreciate traditional wisdom and integrate it with modern life",
    "enriching cultural life and fostering neighborhood ties",
    "younger generations embrace heritage with fresh enthusiasm",
  ],
  2021: [
    "beside his father",
    "while his father smiles and replies",
    "encouraging him to follow his interest",
    "It serves as a compelling testament to the significance of",
    "appreciate cultural heritage by learning traditional opera",
    "deeper cultural identity and personal satisfaction",
    "fostering cultural continuity and social cohesion",
    "younger generations embrace heritage with fresh enthusiasm",
  ],
};

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

function highlight(text, year) {
  let html = escapeHtml(text);
  const marks = (REUSE[year] || []).map((x) => escapeHtml(x)).sort((a, b) => b.length - a.length);
  marks.forEach((phrase) => {
    html = html.split(phrase).join(`<mark class="hl">${phrase}</mark>`);
  });
  return html;
}

export function examsView(query = {}) {
  const year = YEARS.includes(query.year) ? query.year : YEARS[0];
  const exam = EXAMS.find((e) => e.year === year);
  const version = exam.versions[0];
  const paras = paragraphs(version.essay);

  return `<section class="view view-exams">
    ${pageHead({
      eyebrow: "EXAMS · 真题示例",
      title: "看五篇，背可复用的句子",
      desc: "图画、图表、混合各选代表年份；每篇只留一版主范文，<mark class=\"hl\">高亮</mark>处是可直接搬走的句子。",
    })}

    <div class="exam-tabs">
      ${YEARS.map((y) => `<a class="exam-tab${y === year ? " is-active" : ""}" href="#/exams?year=${y}">${y}</a>`).join("")}
    </div>

    <div class="exam-head">
      <div>
        <h2>${exam.year} · ${escapeHtml(exam.title)}</h2>
        <p class="meta">${escapeHtml(exam.kind)} · ${escapeHtml(exam.versions[0].theme)}</p>
        <p class="small" style="margin:0 0 8px;line-height:1.8">${escapeHtml(exam.material)}</p>
        ${exam.official ? `<p class="official"><b>官方定性：</b>${escapeHtml(exam.official)}</p>` : `<p class="official"><b>官方定性：</b>未收录（${escapeHtml(exam.officialNote)}）</p>`}
      </div>
      <figure class="exam-figure">
        <a href="${exam.image}" data-action="zoom-image" data-src="${exam.image}" data-caption="${exam.year} 年题目材料">
          <img src="${exam.image}" alt="${exam.year} 年英语一作文题目材料" loading="lazy">
        </a>
        <figcaption>${exam.year} 年题目材料 · 点击看大图</figcaption>
      </figure>
    </div>

    <div class="exam-essay">
      <h3>可背句高亮 · 满分版 ${version.words} 词</h3>
      ${paras.map((p) => `<p>${highlight(p, year)}</p>`).join("")}
    </div>

    <div class="exam-takeaway">
      <b>这一篇记住三点：</b>${exam.takeaways.slice(0, 3).map((t, i) => `${i + 1}. ${escapeHtml(t)}`).join("　")}
      <br><a class="small" href="#/corpus">去语料库取这一篇的词 →</a>
    </div>

    ${footer()}
  </section>`;
}
