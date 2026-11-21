import { CORPUS, THEME_MAP } from "../data/corpus.js";
import { BIG_VERSIONS, MATERIAL_RULES } from "../data/templates.js";
import { $, escapeHtml, icon, footer, srcMark } from "../ui.js";

const MATERIALS = [
  { id: "picture", label: "图画" },
  { id: "chart", label: "图表" },
  { id: "text", label: "文字材料" },
];

function opt(value, label, selected) {
  return `<option value="${escapeHtml(value)}"${value === selected ? " selected" : ""}>${escapeHtml(label)}</option>`;
}

function slotOptions(valueId, slotId) {
  const v = CORPUS.find((x) => x.id === valueId) || CORPUS[0];
  const items = v.slots[slotId] || [];
  return items
    .map((it) => {
      if (slotId === "strategy") return opt(it.en, `${it.en}（${it.zh}）`);
      return opt(it[0], `${it[0]}（${it[1]}）`);
    })
    .join("");
}

function slotValue(valueId, slotId, index = 0) {
  const v = CORPUS.find((x) => x.id === valueId) || CORPUS[0];
  const items = v.slots[slotId] || [];
  if (!items.length) return "";
  const it = items[Math.min(index, items.length - 1)];
  return slotId === "strategy" ? it.en : it[0];
}

function firstParagraph(material, theme, desc) {
  if (material === "chart") {
    return `The figures in the bar chart/line chart/pie chart/table reveal notable changes/differences concerning ${theme}. ${desc}`;
  }
  if (material === "text") {
    return `${theme} has long been a subject of public debate. The passage offers a fresh perspective on this issue, arguing that ${desc}. While this view may not convince everyone, I find it original and illuminating, and I agree with it wholeheartedly.`;
  }
  return `Though deceptively simple, this scene conveys a meaningful message: ${desc}. It serves as a compelling testament to the significance of ${theme}.`;
}

export function refreshSlots(valueId) {
  const v = CORPUS.find((x) => x.id === valueId) || CORPUS[0];
  ["behavior", "outcome", "field", "capacity", "effect", "strategy", "change"].forEach((k) => {
    const sel = document.getElementById(`dk-${k}`);
    if (!sel) return;
    sel.innerHTML = slotOptions(v.id, k);
  });
}

export function assemble() {
  const material = $("#dk-material")?.value || "picture";
  const valueId = $("#dk-value")?.value || "harmony";
  const theme = ($("#dk-theme")?.value || "").trim() || "【主题词】";
  const desc = ($("#dk-desc")?.value || "").trim() || (material === "chart" ? "【数据句：时间 + 类别 + 数据，一句趋势】" : material === "text" ? "【一句话概括作者主张】" : "【地点 + 人物 + 动作/表情 + 图中文字】");

  const picks = {};
  ["behavior", "outcome", "field", "capacity", "effect", "strategy", "change"].forEach((k) => {
    picks[k] = $(`#dk-${k}`)?.value || slotValue(valueId, k);
  });

  const p1 = firstParagraph(material, theme, desc);
  const p2 = `${theme} has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people ${picks.behavior}, ultimately contributing to ${picks.outcome}. National policies on ${picks.field} likewise focus on empowering individuals to ${picks.capacity}. Beyond personal advancement, this principle can strengthen communities by ${picks.effect}, laying the groundwork for sustainable progress. This is in line with national strategies for ${picks.strategy}: as this principle takes root, ${picks.change}.`;
  const p3 = `In conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when ${theme} guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.`;

  const words = [p1, p2, p3].join(" ").split(/\s+/).filter(Boolean).length;

  const out = $("#desk-output");
  if (!out) return;
  out.innerHTML = `<div class="essay">
      <div class="essay-meta"><b>${BIG_VERSIONS[0].name}</b><span>·</span><span>${words} 词（含占位符）</span><span>·</span><span>${MATERIALS.find((m) => m.id === material)?.label || "图画"}</span></div>
      <p>${escapeHtml(p1)}</p>
      <p>${escapeHtml(p2)}</p>
      <p>${escapeHtml(p3)}</p>
    </div>
    <div class="en-note" style="margin-top:12px">${icon("info", 14)} 先保证三段的主题词完全一致，再检查七个空位的词性：行为/能力是动词原形，成果/领域/战略是名词短语，效果是动名词，变化是完整小句。</div>`;
}

function steps() {
  const items = [
    ["审题", "3 分钟", "判断材料类型（图画/图表/文字/混合）与任务（describe / interpret / comment）。圈出图题、坐标、图例、人物话语。", "#/strategy/str-03"],
    ["立意", "2 分钟", "从材料细节向上归到一类价值观，再落到 3–5 个词的主题词；一律取正面做法。太高就向下细化。", "#/strategy/str-02"],
    ["定结构", "2 分钟", "三段：描述+主题 → 个人/政策/社会 → 总结。选版本：满分（9 空）/简化（5 空）/速通（5 句）。", "#/recite?tab=big"],
    ["填空", "18 分钟", "按 ①主题 ②行为 ③成果 ④领域 ⑤能力 ⑥效果 ⑦战略 ⑧变化 的顺序填；语料库直接取词，不现场造句。", "#/corpus"],
    ["检查", "4 分钟", "主题词一致、时态统一、三单/复数、拼写、字数 180–220、卷面。", "#/strategy/str-09"],
  ];
  return `<div class="flow">
    ${items.map(([name, time, desc, href]) => `<div class="flow-step">
      <h3>${name} <span class="muted" style="font-family:var(--mono);font-size:11px">${time}</span></h3>
      <p>${desc}</p>
      <p><a class="text-link" href="${href}">展开这一步 →</a></p>
    </div>`).join("")}
  </div>`;
}

function builder() {
  const v = CORPUS[0];
  return `<div class="en-card" style="padding:22px 22px 20px">
    <div class="en-grid cols-2" style="gap:14px">
      <label style="display:grid;gap:6px;font-size:12px;color:var(--ink-3)">材料类型
        <select id="dk-material" style="padding:8px;border:1px solid var(--line);border-radius:6px;background:var(--card);color:var(--ink)">
          ${MATERIALS.map((m) => opt(m.id, m.label, "picture")).join("")}
        </select>
      </label>
      <label style="display:grid;gap:6px;font-size:12px;color:var(--ink-3)">价值观（语料来源）
        <select id="dk-value" style="padding:8px;border:1px solid var(--line);border-radius:6px;background:var(--card);color:var(--ink)">
          ${CORPUS.map((x) => opt(x.id, `${x.no}. ${x.name} ${x.en}`, "harmony")).join("")}
        </select>
      </label>
    </div>
    <label style="display:grid;gap:6px;font-size:12px;color:var(--ink-3);margin-top:12px">主题词（3–5 个词的名词短语）
      <input id="dk-theme" type="text" value="building livable cities" style="padding:8px 10px;border:1px solid var(--line);border-radius:6px;background:var(--card);color:var(--ink)">
    </label>
    <label style="display:grid;gap:6px;font-size:12px;color:var(--ink-3);margin-top:12px">材料描述（自己写；图表可先留空）
      <input id="dk-desc" type="text" placeholder="In a newly built community park, several residents exercise…" style="padding:8px 10px;border:1px solid var(--line);border-radius:6px;background:var(--card);color:var(--ink)">
    </label>

    <div class="en-grid cols-2" style="gap:10px;margin-top:14px">
      ${[
        ["behavior", "具体行为"],
        ["outcome", "可见成果"],
        ["field", "相关领域"],
        ["capacity", "个人能力/行为"],
        ["effect", "社会效果"],
        ["strategy", "相关战略"],
        ["change", "社会变化"],
      ].map(([k, label]) => `<label style="display:grid;gap:4px;font-size:11.5px;color:var(--ink-3)">${label}
        <select id="dk-${k}" style="padding:7px;border:1px solid var(--line);border-radius:6px;background:var(--card);color:var(--ink);font-size:12px">
          ${slotOptions(v.id, k)}
        </select>
      </label>`).join("")}
    </div>

    <div class="en-filter" style="margin:16px 0 4px">
      <button type="button" class="btn btn-primary btn-sm" data-action="desk-build">${icon("spark", 14)} 生成三段</button>
      <button type="button" class="btn btn-sm" data-action="desk-random">${icon("shuffle", 14)} 随机换一组</button>
      <button type="button" class="btn btn-sm" data-action="desk-copy">${icon("copy", 14)} 复制</button>
    </div>
    <div id="desk-output" aria-live="polite"></div>
  </div>`;
}

function exampleRow() {
  return `<div class="table-card" style="margin-top:14px"><div class="table-scroll"><table class="slot-table">
    <thead><tr><th>年份</th><th>材料</th><th>主题词</th><th>退路（更易组织）</th></tr></thead>
    <tbody>
      ${THEME_MAP.map((t) => `<tr><td>${t.year}</td><td>${t.material}</td><td class="en">${t.theme}</td><td class="en">${t.fallback}</td></tr>`).join("")}
    </tbody>
  </table></div></div>`;
}

export function deskView() {
  return `<section class="view view-desk">
    <div class="en-hero">
      <div>
        <p class="eyebrow">WRITING DESK · 五步套写</p>
        <h1>拿到题目，<em>先做决策</em>，再动笔</h1>
        <p class="lede">模板解决“句子怎么写”，这一页解决“写什么、先写哪句、哪些词必须换”。下面的组装器把三版模板与七类语料接在一起：选材料、选价值观、填主题词，看三段如何成形。</p>
      </div>
      <div class="en-hero-side">
        <div class="en-hero-stat"><span>审题</span><b>3′</b></div>
        <div class="en-hero-stat"><span>写作</span><b>20′</b></div>
        <div class="en-hero-stat"><span>检查</span><b>4′</b></div>
        <div class="en-hero-stat"><span>目标词数</span><b>180–220</b></div>
      </div>
    </div>

    <div class="en-section">
      <div class="en-section-head"><h2>五步流程</h2><span class="en-section-note">按顺序执行，不跳步</span></div>
      ${steps()}
    </div>

    <div class="en-section">
      <div class="en-section-head"><h2>套写组装器</h2><span class="en-section-note">满分版骨架 · 7 个语料槽 + 主题词</span></div>
      ${builder()}
    </div>

    <div class="en-section">
      <div class="en-section-head"><h2>三种材料的第一段</h2><span class="en-section-note">${srcMark("A")} 原文 · ${srcMark("B")} 归纳</span></div>
      <div class="en-grid cols-2">
        ${MATERIAL_RULES.map((m) => `<div class="en-card">
          <span class="en-card-no">${m.name}</span>
          <p style="font-family:Georgia,serif;font-size:12.5px;line-height:1.8;color:var(--en-ink)">${escapeHtml(m.first)}</p>
          <p><b>必须写：</b>${m.must.join("、")}</p>
          <p><b>不要写：</b>${m.avoid.join("、")}</p>
        </div>`).join("")}
      </div>
    </div>

    <div class="en-section">
      <div class="en-section-head"><h2>历年主题词速查</h2><span class="en-section-note">先照抄结构，再换词</span></div>
      ${exampleRow()}
    </div>

    ${footer()}
  </section>`;
}
