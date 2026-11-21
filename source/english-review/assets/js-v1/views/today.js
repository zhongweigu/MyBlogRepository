import { CARDS } from "../data/cards.js";
import { SITE, STRATEGY } from "../data/meta.js";
import { $, $$, todayLabel, escapeHtml, icon, footer } from "../ui.js";

/* 确定性随机：同一天多次打开内容相同，次日自动换一批 */
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

function dailyCards(key, count = 12) {
  const rng = mulberry32(hash(`en:${key}`));
  const pool = CARDS.map((c) => ({ ...c, r: rng() })).sort((a, b) => a.r - b.r);
  const picked = [];
  const groupCount = {};
  for (const card of pool) {
    const g = card.tag.split("·")[0];
    if ((groupCount[g] || 0) >= 3) continue;
    picked.push(card);
    groupCount[g] = (groupCount[g] || 0) + 1;
    if (picked.length >= count) break;
  }
  return picked;
}

function heroCard() {
  const d = todayLabel();
  return `<section class="en-hero">
    <div>
      <p class="eyebrow">${d.full}</p>
      <h1>今天背 12 张，<em>考场直接调用</em></h1>
      <p class="lede">先看问题、自己默写，再展开答案。语料按「价值观 → 槽位」组织，模板按「材料类型 → 段落」组织；背的不是整篇，是能在考场上换词的骨架。</p>
      <div class="en-tags" style="margin-top:14px">
        <a class="en-tag is-a" href="#/desk">写作台 · 五步套写</a>
        <a class="en-tag" href="#/exams">2020–2026 真题</a>
        <a class="en-tag" href="#/sources">资料完整性</a>
      </div>
    </div>
    <div class="en-hero-side">
      <div class="en-hero-stat"><span>语料卡</span><b>${CARDS.filter((c) => c.tag.startsWith("语料")).length}</b></div>
      <div class="en-hero-stat"><span>模板句</span><b>${CARDS.filter((c) => c.tag.startsWith("大作文")).length}</b></div>
      <div class="en-hero-stat"><span>策略卡</span><b>${CARDS.filter((c) => c.tag.startsWith("策略")).length}</b></div>
      <div class="en-hero-stat"><span>真题套写</span><b>7 年 × 4 版</b></div>
    </div>
  </section>`;
}

function quoteOfDay(key) {
  const list = [
    ["It serves as a compelling testament to the significance of 【主题词】.", "图画/文本收束句，万能但不空。"],
    ["Beyond personal advancement, this principle can strengthen communities by 【社会效果】.", "从个人上升到社会的那一句。"],
    ["However, we should recognise that social conditions fundamentally shape the choices available to individuals.", "速通版第③句，从动机转向条件。"],
    ["A study / An article published by 【权威机构／期刊】 lends support to the view that 【主题词】 plays an important role in driving this trend.", "第⑤句：用有实体的来源做“实证”。"],
    ["In conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when 【主题词】 guides action.", "第三段固定句，只换主题词。"],
  ];
  const i = hash(key) % list.length;
  return list[i];
}

function quickLinks() {
  const links = [
    ["#/desk", "写作台", "审题 → 立意 → 结构 → 填空 → 检查，含在线组装器", "pen"],
    ["#/recite?tab=big", "大作文模板", "满分 / 简化 / 速通三版，9·5·5 个空", "book"],
    ["#/recite?tab=letters", "小作文", "13 个场景：邀请、建议、感谢、道歉……", "file"],
    ["#/corpus", "语料库", "七类价值观 × 7 个槽位，全量", "grid"],
    ["#/exams", "真题套写", "2026–2020，每年四版范文 + 拆解", "archive"],
    ["#/strategy", "策略", "评分标准、命题趋势、审题与图表/文字材料", "map"],
  ];
  return `<div class="en-grid cols-3" style="margin-top:18px">
    ${links.map(([href, title, desc, ic]) => `<a class="en-card" href="${href}">
      <span class="en-card-no">${icon(ic, 14)} GO</span>
      <h3>${title}</h3>
      <p>${desc}</p>
      <span class="en-card-foot">打开 →</span>
    </a>`).join("")}
  </div>`;
}

export function todayView() {
  const d = todayLabel();
  const cards = dailyCards(d.key, 12);
  const [quote, quoteNote] = quoteOfDay(d.key);

  return `<section class="view view-today">
    ${heroCard()}

    <div class="en-section">
      <div class="en-section-head">
        <h2>今日 12 张</h2>
        <span class="en-section-note">${d.short} · 同一天内容固定，次日自动换一批</span>
      </div>
      <div class="en-grid" style="gap:10px">
        ${cards.map((c) => `<details class="review-card">
          <summary>
            <span class="rc-tag">${escapeHtml(c.tag)}</span>
            <span class="rc-q">${escapeHtml(c.front)}</span>
            ${icon("chevron", 16, "rc-chev")}
          </summary>
          <div class="rc-a">${c.back}${c.hint ? `<div class="rc-hint">提示：${escapeHtml(c.hint)} · 来源：${escapeHtml(c.source)}</div>` : ""}</div>
        </details>`).join("")}
      </div>
      <div class="en-note" style="margin-top:12px">${icon("info", 14)} 先盖住答案默写，再展开对照。写不出时只记「填什么词性」（动词原形 / 名词 / 动名词 / 完整小句），考场上用大白话填也比空着强。</div>
    </div>

    <div class="en-section">
      <div class="en-section-head"><h2>今日一句</h2><span class="en-section-note">模板骨架</span></div>
      <div class="essay">
        <div class="essay-meta"><b>模板骨架</b><span>·</span><span>先背熟一句，再扩到一段</span></div>
        <p>${quote}</p>
      </div>
      <p class="muted" style="margin-top:8px;font-size:12px">${quoteNote}</p>
    </div>

    <div class="en-section">
      <div class="en-section-head"><h2>从哪里开始</h2><span class="en-section-note">按当前阶段选</span></div>
      ${quickLinks()}
    </div>

    <div class="en-section">
      <div class="en-section-head"><h2>策略速览</h2><span class="en-section-note">完整长文在策略页</span></div>
      <div class="en-grid cols-2">
        ${STRATEGY.slice(0, 4).map((s) => `<a class="en-card" href="#/strategy/${s.id}">
          <span class="en-card-no">${s.no}</span>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
          <span class="en-card-foot">${s.minutes} 分钟 · ${s.tags.join(" / ")}</span>
        </a>`).join("")}
      </div>
    </div>

    ${footer()}
  </section>`;
}
