import { CARDS } from "../data/cards.js";
import { STRATEGY } from "../data/meta.js";
import { todayLabel, escapeHtml, icon, footer, pageHead, renderEn } from "../ui.js";

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(a) {
  return function rng() {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function dailyCards(key, count = 10) {
  const rng = mulberry32(hash(`en2:${key}`));
  const pool = CARDS.map((c) => ({ ...c, r: rng() })).sort((a, b) => a.r - b.r);
  const picked = [];
  const group = {};
  for (const card of pool) {
    const g = card.tag.split("·")[0].trim();
    if ((group[g] || 0) >= 4) continue;
    picked.push(card);
    group[g] = (group[g] || 0) + 1;
    if (picked.length >= count) break;
  }
  return picked;
}

export function todayView() {
  const d = todayLabel();
  const cards = dailyCards(d.key, 10);

  return `<section class="view view-today">
    ${pageHead({
      eyebrow: `TODAY · ${d.full}`,
      title: "今天背这 10 组",
      desc: "先看标题默写，再展开对照。<mark class=\"hl\">高亮</mark>处是核心搭配；写不出时只记“填什么词性”，考场上用大白话填也比空着强。",
    })}
    <div class="today-links">
      <a href="#/recite">背诵模板</a>
      <a href="#/recite?g=letters">应用文</a>
      <a href="#/corpus">语料库</a>
      <a href="#/exams">真题示例</a>
      <a href="#/strategy">策略</a>
    </div>

    ${cards.map((c, i) => `<details class="review-card"${i === 0 ? " open" : ""}>
      <summary>
        <span class="rc-tag">${escapeHtml(c.tag)}</span>
        <span class="rc-q">${escapeHtml(c.front)}</span>
        ${icon("chevron", 14, "rc-chev")}
      </summary>
      <div class="rc-a">
        ${c.items.map((x) => `<p style="margin:0 0 8px"><span class="en">${renderEn(x.en)}</span><br><span class="muted">${escapeHtml(x.zh || "")}</span></p>`).join("")}
        ${c.hint ? `<p class="small muted" style="margin:6px 0 0">${escapeHtml(c.hint)} · ${escapeHtml(c.source)}</p>` : ""}
      </div>
    </details>`).join("")}

    <div style="margin-top:34px;padding-top:14px;border-top:1px solid var(--line)">
      <p class="small muted" style="margin:0 0 8px">策略只服务于“这句什么时候用”：</p>
      ${STRATEGY.map((s) => `<p class="small" style="margin:0 0 4px"><a href="#/strategy/${s.id}">${s.no} ${escapeHtml(s.title)}</a></p>`).join("")}
    </div>

    ${footer()}
  </section>`;
}
