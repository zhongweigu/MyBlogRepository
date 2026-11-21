import { BIG_VERSIONS, MATERIAL_RULES } from "../data/templates.js";
import { LETTERS, LETTER_RULES, LETTER_TASKS } from "../data/letters.js";
import { PARAGRAPHS, PICTURE, CHARTS } from "../data/library.js";
import { WORDS, COLLOCATIONS, CONNECTORS, FUNCTIONS, CHINGLISH, AUTHORITIES } from "../data/expressions.js";
import { escapeHtml, icon, footer, srcMark } from "../ui.js";

const TABS = [
  ["big", "大作文模板"],
  ["letters", "小作文"],
  ["para", "段落功能"],
  ["picture", "图画"],
  ["chart", "图表"],
  ["expr", "表达"],
  ["func", "句型"],
];

function tabBar(active) {
  return `<div class="filter-chips" style="margin:16px 0 8px">
    ${TABS.map(([id, label]) => `<a class="filter-chip${id === active ? " is-active" : ""}" href="#/recite?tab=${id}">${label}</a>`).join("")}
  </div>`;
}

function bigView() {
  return `<div class="en-note">${srcMark("A")} 三版模板正文逐字来自《模版部分》《模版使用说明》；${srcMark("B")} 适用条件、限制与比较为整理。先选一版背熟，不要三版混用。</div>
  <div class="en-grid cols-3" style="margin-top:16px">
    ${BIG_VERSIONS.map((v) => `<div class="en-card">
      <span class="en-card-no">${v.badge} · ${v.words} 词</span>
      <h3>${v.name}</h3>
      <p>${v.subtitle}</p>
      <p><b>适合：</b>${v.bestFor}</p>
      <a class="text-link" href="#/recite?tab=big&v=${v.id}" style="margin-top:auto">看全文与填空表 →</a>
    </div>`).join("")}
  </div>

  <div class="table-card" style="margin-top:14px"><div class="table-head"><h3>三版差异对照</h3></div><div class="table-scroll"><table class="slot-table">
    <thead><tr><th></th><th>满分版</th><th>简化版</th><th>速通版</th></tr></thead>
    <tbody>
      <tr><td>填空数</td><td>9 类</td><td>5 类</td><td>5 类（含机构）</td></tr>
      <tr><td>第二段</td><td>五句，含战略与社会变化</td><td>五句，成果/能力固定</td><td>五个编号句，①④分材料类型</td></tr>
      <tr><td>论据强度</td><td>政策 + 战略 + 变化，最具体</td><td>政策 + 社会效果</td><td>战略 + 机构/期刊（实证）</td></tr>
      <tr><td>背诵负担</td><td>最高</td><td>中</td><td>最低</td></tr>
      <tr><td>风险</td><td>空多，现场决策慢</td><td>固定句多，易“万能腔”</td><td>机构名要真实，否则像编造</td></tr>
      <tr><td>适合</td><td>目标 17+</td><td>目标 13–16</td><td>临考 1–2 周</td></tr>
    </tbody>
  </table></div></div>

  <div class="en-note" style="margin-top:12px">${srcMark("A")} <b>最低背诵量（PDF 建议）：</b>至少背熟 3 个价值观（文明、和谐、敬业）；每个价值观记住 2–3 个【具体行为】；高级版、速通版记住所选主题对应的【相关战略】；简化版记住【相关领域】和【社会效果】。先达到这条线，再扩到七类。</div>

  ${BIG_VERSIONS.map((v) => `<div class="en-section" id="v-${v.id}">
    <div class="en-section-head"><h2>${v.name}</h2><span class="en-section-note">${v.badge} · ${v.words} 词</span></div>
    ${v.paragraphs.map((p) => `<div style="margin-bottom:18px">
      <div class="eyebrow" style="margin-bottom:6px">${p.role}</div>
      ${p.note ? `<p class="muted" style="font-size:12px;margin:0 0 8px">${p.note}</p>` : ""}
      <div class="en-grid" style="gap:10px">
        ${p.blocks.map((b) => `<div class="essay">
          <div class="essay-meta"><b>${b.label}</b>${srcMark(b.src)}</div>
          <p>${escapeHtml(b.en)}</p>
          <div class="essay-zh"><p>${escapeHtml(b.zh)}</p></div>
        </div>`).join("")}
      </div>
    </div>`).join("")}
    <div class="table-card"><div class="table-head"><h3>填空表（${v.fills.length} 类）</h3></div><div class="table-scroll"><table class="slot-table">
      <thead><tr><th>#</th><th>填空项</th><th>从哪里找</th><th>词性 / 接法</th></tr></thead>
      <tbody>${v.fills.map((f) => `<tr><td>${f[0]}</td><td>${f[1]}</td><td>${f[2]}</td><td>${f[3]}</td></tr>`).join("")}</tbody>
    </table></div></div>
    <div class="en-note" style="margin-top:12px"><b>使用限制：</b>${v.constraints.map((c, i) => `${i + 1}. ${c}`).join("　")}</div>
  </div>`).join("")}

  <div class="en-section">
    <div class="en-section-head"><h2>三种材料怎么起手</h2><span class="en-section-note">${srcMark("A")} 句型 · ${srcMark("B")} 要点</span></div>
    <div class="table-card"><div class="table-scroll"><table class="slot-table">
      <thead><tr><th>材料</th><th>第一段起手</th><th>必须写</th><th>不要写</th></tr></thead>
      <tbody>${MATERIAL_RULES.map((m) => `<tr><td>${m.name}</td><td class="en" style="font-size:11.5px">${escapeHtml(m.first)}</td><td>${m.must.join("、")}</td><td>${m.avoid.join("、")}</td></tr>`).join("")}</tbody>
    </table></div></div>
  </div>`;
}

function lettersView(query = {}) {
  return `<div class="en-note">${srcMark("C")} 四份 PDF 只含大作文；本模块依据 A 节大纲（书信、通知、告示、纪要，约 100 词）扩充，未伪装成原始资料。每个场景三段式 + 可替换表达 + 完整范文 + 常见错误。</div>

  <div class="en-section">
    <div class="en-section-head"><h2>格式与评分</h2><span class="en-section-note">先保任务，再谈语言</span></div>
    <div class="en-grid cols-2">
      <div class="en-card"><h3>格式清单</h3><ul class="clean" style="font-size:12.5px;line-height:1.9;margin:0;padding-left:18px">${LETTER_RULES.format.map((x) => `<li>${x}</li>`).join("")}</ul></div>
      <div class="en-card"><h3>评分与字数</h3><ul class="clean" style="font-size:12.5px;line-height:1.9;margin:0;padding-left:18px">${LETTER_RULES.scoring.map((x) => `<li>${x}</li>`).join("")}</ul></div>
    </div>
  </div>

  <div class="en-section">
    <div class="en-section-head"><h2>场景 → 任务对应</h2><span class="en-section-note">13 个场景</span></div>
    <div class="table-card"><div class="table-scroll"><table class="slot-table">
      <thead><tr><th>场景</th><th>必须覆盖的内容</th><th>高频词</th></tr></thead>
      <tbody>${LETTER_TASKS.map((t) => `<tr><td><a class="text-link" href="#/recite?tab=letters&open=${t[3]}">${t[0]}</a></td><td>${t[1]}</td><td class="en" style="font-size:11.5px">${t[2]}</td></tr>`).join("")}</tbody>
    </table></div></div>
  </div>

  <div class="en-section">
    <div class="en-section-head"><h2>场景模板</h2><span class="en-section-note">点开看范文</span></div>
    <div class="en-grid" style="gap:10px">
      ${LETTERS.map((l) => `<details class="review-card" data-letter="${l.id}"${query.open === l.id ? " open" : ""}>
        <summary><span class="rc-tag">应用文</span><span class="rc-q"><b>${l.name}</b> · ${l.use}</span>${icon("chevron", 16, "rc-chev")}</summary>
        <div class="rc-a">
          <p><b>语气：</b>${l.tone}</p>
          <p><b>三个要点：</b>${l.tasks.join("；")}</p>
          <div class="essay" style="margin:10px 0">
            ${l.sample.en.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
          </div>
          <div class="essay-zh">${l.sample.zh.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}</div>
          <div style="margin-top:12px">
            <p><b>开头可换：</b></p>
            ${l.opening.map((o) => `<p style="font-size:12.5px"><span class="en">${escapeHtml(o.en)}</span><br><span class="muted">${escapeHtml(o.zh)}</span></p>`).join("")}
            <p><b>结尾可换：</b></p>
            ${l.closing.map((o) => `<p style="font-size:12.5px"><span class="en">${escapeHtml(o.en)}</span><br><span class="muted">${escapeHtml(o.zh)}</span></p>`).join("")}
            <p><b>替换词：</b>${l.swaps.map(([zh, en]) => `${zh} → <span class="en">${en}</span>`).join("；")}</p>
            <p><b>题目变化：</b>${l.variants.map((v) => `${v.cond}——${v.change}`).join("　")}</p>
            <p style="color:var(--red)"><b>常见错误：</b>${l.pitfalls.join("；")}</p>
          </div>
        </div>
      </details>`).join("")}
    </div>
  </div>`;
}

function paraView() {
  return `<div class="en-note">${srcMark("A")} 标 A 的句子来自 PDF 模板；${srcMark("C")} 标 C 的是按同一功能扩充的句型。每个功能都给了「什么时候用」和「容易错在哪」，不要只背句子。</div>
  <div class="en-grid cols-2" style="margin-top:16px">
    ${PARAGRAPHS.map((p) => `<div class="en-card">
      <span class="en-card-no">${p.role}</span>
      <h3>${p.name}</h3>
      <p>${p.when}</p>
      ${p.patterns.map((pt) => `<div style="border-top:1px dotted var(--line-soft);padding-top:8px">
        <p style="font-family:Georgia,serif;font-size:12.5px;line-height:1.75;color:var(--en-ink)">${srcMark(pt.src)}${escapeHtml(pt.en)}</p>
        <p style="font-size:12px">${escapeHtml(pt.zh)}</p>
        <p style="font-size:11px;color:var(--ink-3)">注：${escapeHtml(pt.note)}</p>
      </div>`).join("")}
      <p style="font-size:11.5px;color:var(--ink-3)"><b>衔接：</b>${p.link.map(escapeHtml).join(" / ")}</p>
      <p style="font-size:11.5px;color:var(--red)"><b>易错：</b>${p.pitfall}</p>
    </div>`).join("")}
  </div>`;
}

function pictureView() {
  return `<div class="en-note">图画题的核心不是“描述得多细”，而是“描述完能不能落到主题”。四个层次要分清：客观描述 → 内容概括 → 寓意提炼 → 意义分析。</div>
  <div class="en-section">
    <div class="en-section-head"><h2>四个层次</h2><span class="en-section-note">写到哪一层，决定分数段</span></div>
    <div class="en-grid cols-2">
      ${PICTURE.levels.map((l) => `<div class="en-card">
        <span class="en-card-no">${l.id.toUpperCase()}</span>
        <h3>${l.name}</h3>
        <p><b>问自己：</b>${l.question}</p>
        <p><b>写：</b>${l.write.join("、")}</p>
        <p><b>不要：</b>${l.not.join("、")}</p>
        <p class="en" style="font-family:Georgia,serif;border-left:2px solid var(--indigo-line);padding-left:10px">${escapeHtml(l.sample)}</p>
      </div>`).join("")}
    </div>
  </div>

  <div class="en-section">
    <div class="en-section-head"><h2>三个万能公式</h2><span class="en-section-note">${srcMark("A")} 模版使用说明</span></div>
    <div class="en-grid cols-3">
      ${PICTURE.formulas.map((f) => `<div class="en-card">
        <h3>${f.name}</h3>
        <p style="font-family:var(--mono);font-size:11px">${escapeHtml(f.formula)}</p>
        <p class="en" style="font-family:Georgia,serif">${escapeHtml(f.example)}</p>
        <p>${escapeHtml(f.zh)}</p>
        <p style="font-size:11px;color:var(--ink-3)">${f.note}</p>
      </div>`).join("")}
    </div>
  </div>

  <div class="en-section">
    <div class="en-section-head"><h2>词汇：表情 / 动作 / 场景 / 关系</h2><span class="en-section-note">${srcMark("A")} 加粗项为 PDF 原列</span></div>
    <div class="en-grid cols-2">
      <div class="en-card"><h3>表情</h3><ul class="clean" style="margin:0;padding-left:18px;font-size:12.5px;line-height:1.9">${PICTURE.emotions.map(([en, zh]) => `<li><span class="en">${en}</span> — ${zh}</li>`).join("")}</ul></div>
      <div class="en-card"><h3>动作</h3><ul class="clean" style="margin:0;padding-left:18px;font-size:12.5px;line-height:1.9">${PICTURE.actions.map(([en, zh]) => `<li><span class="en">${en}</span> — ${zh}</li>`).join("")}</ul></div>
      <div class="en-card"><h3>场景</h3><ul class="clean" style="margin:0;padding-left:18px;font-size:12.5px;line-height:1.9">${PICTURE.scenes.map(([en, zh]) => `<li><span class="en">${en}</span> — ${zh}</li>`).join("")}</ul></div>
      <div class="en-card"><h3>人物关系</h3><ul class="clean" style="margin:0;padding-left:18px;font-size:12.5px;line-height:1.9">${PICTURE.relations.map(([en, zh]) => `<li><span class="en">${en}</span> — ${zh}</li>`).join("")}</ul></div>
    </div>
  </div>

  <div class="en-section">
    <div class="en-section-head"><h2>从图画过渡到主题</h2><span class="en-section-note">四类过渡句</span></div>
    <div class="table-card"><div class="table-scroll"><table class="slot-table">
      <thead><tr><th>用途</th><th>句型</th><th>中文</th></tr></thead>
      <tbody>${PICTURE.transitions.map((t) => `<tr><td>${t.use}</td><td class="en">${srcMark(t.src)}${escapeHtml(t.en)}</td><td>${escapeHtml(t.zh)}</td></tr>`).join("")}</tbody>
    </table></div></div>
    <div class="en-note" style="margin-top:12px"><b>常见失分：</b>${PICTURE.pitfalls.map((p) => `${p}`).join("　")}</div>
  </div>`;
}

function chartView() {
  return `<div class="en-note">图表作文不是翻译数据。第一段只做三件事：交代图表类型与对象、给出最有代表性的数据、概括趋势；第二段才解释原因与意义。</div>
  <div class="en-section">
    <div class="en-section-head"><h2>五类图表</h2><span class="en-section-note">读图重点与专属句型</span></div>
    <div class="en-grid cols-2">
      ${CHARTS.types.map((t) => `<div class="en-card">
        <span class="en-card-no">${t.id.toUpperCase()}</span>
        <h3>${t.name}</h3>
        <p><b>先看：</b>${t.read.join("；")}</p>
        ${t.patterns.map((p) => `<p class="en" style="font-family:Georgia,serif;font-size:12.5px">${srcMark(p.src)}${escapeHtml(p.en)}<br><span style="font-family:var(--sans);font-size:11.5px;color:var(--ink-3)">${escapeHtml(p.zh)}</span></p>`).join("")}
      </div>`).join("")}
    </div>
  </div>

  <div class="en-section">
    <div class="en-section-head"><h2>数据动作库</h2><span class="en-section-note">升 / 降 / 平 / 最值 / 比较 / 占比 / 趋势 / 异常</span></div>
    <div class="en-grid cols-2">
      ${Object.entries(CHARTS.moves).map(([k, list]) => `<div class="en-card">
        <h3>${{ up: "上升", down: "下降", flat: "持平", maxmin: "最值", compare: "比较", share: "占比", trend: "趋势", abnormal: "异常" }[k]}</h3>
        <ul class="clean" style="margin:0;padding-left:18px;font-size:12.5px;line-height:1.85">
          ${list.map(([en, zh, note]) => `<li><span class="en">${escapeHtml(en)}</span> — ${escapeHtml(zh)}${note ? `<span class="muted">（${escapeHtml(note)}）</span>` : ""}</li>`).join("")}
        </ul>
      </div>`).join("")}
    </div>
  </div>

  <div class="en-section">
    <div class="en-section-head"><h2>从数据到分析</h2><span class="en-section-note">过渡句</span></div>
    <div class="table-card"><div class="table-scroll"><table class="slot-table">
      <thead><tr><th>句型</th><th>中文</th></tr></thead>
      <tbody>${CHARTS.transitions.map((t) => `<tr><td class="en">${srcMark(t.src)}${escapeHtml(t.en)}</td><td>${escapeHtml(t.zh)}</td></tr>`).join("")}</tbody>
    </table></div></div>
    <div class="en-note" style="margin-top:12px"><b>常见失分：</b>${CHARTS.pitfalls.join("　")}</div>
  </div>`;
}

function exprView() {
  const group = (title, rows, cols = 3) => `<div class="en-section">
    <div class="en-section-head"><h2>${title}</h2><span class="en-section-note">${rows.length} 条</span></div>
    <div class="en-grid cols-${cols}" style="gap:8px">
      ${rows.map((r) => `<div class="en-card" style="padding:12px 14px;gap:4px">
        <p class="en" style="font-family:Georgia,serif;font-size:13px">${escapeHtml(r[0])}</p>
        <p style="font-size:11.5px">${escapeHtml(r[1])}</p>
        ${r[2] ? `<p style="font-size:11px;color:var(--ink-3)">${escapeHtml(r[2])}</p>` : ""}
      </div>`).join("")}
    </div>
  </div>`;

  return `<div class="en-note">${srcMark("C")} 本页为扩充表达库。优先选准确、自然、好记的搭配；生僻词与复杂但不自然的句式不收。</div>
  ${group("高频动词", WORDS.verbs)}
  ${group("抽象名词", WORDS.nouns)}
  ${group("形容词", WORDS.adjectives)}
  ${group("副词", WORDS.adverbs, 4)}
  ${group("固定搭配", COLLOCATIONS, 2)}

  <div class="en-section">
    <div class="en-section-head"><h2>中式表达对照</h2><span class="en-section-note">先改搭配，再改句式</span></div>
    <div class="table-card"><div class="table-scroll"><table class="slot-table">
      <thead><tr><th>容易写成</th><th>改为</th><th>为什么</th></tr></thead>
      <tbody>${CHINGLISH.map(([bad, good, why]) => `<tr><td class="en">${escapeHtml(bad)}</td><td class="en">${escapeHtml(good)}</td><td>${escapeHtml(why)}</td></tr>`).join("")}</tbody>
    </table></div></div>
  </div>

  <div class="en-section">
    <div class="en-section-head"><h2>可引用的机构与期刊</h2><span class="en-section-note">第⑤句用</span></div>
    <div class="table-card"><div class="table-scroll"><table class="slot-table">
      <thead><tr><th>英文</th><th>中文</th><th>适合主题</th></tr></thead>
      <tbody>${AUTHORITIES.map((a) => `<tr><td class="en">${a[0]}</td><td>${a[1]}</td><td>${a[2]}</td></tr>`).join("")}</tbody>
    </table></div></div>
    <div class="en-note" style="margin-top:10px">不要把机构名当成“高级词”硬塞；它的作用是让论据看起来可检验。编造一个不存在的研究，比不写更危险。</div>
  </div>`;
}

function funcView() {
  return `<div class="en-note">${srcMark("C")} 按写作功能整理的迁移句型。每个功能记 1–2 句即可，考场优先用最熟的那句，不要临场拼长难句。</div>
  <div class="en-grid cols-2" style="margin-top:16px">
    ${FUNCTIONS.map((f) => `<div class="en-card">
      <h3>${f.name}</h3>
      ${f.patterns.map(([en, zh]) => `<div style="border-top:1px dotted var(--line-soft);padding-top:8px">
        <p class="en" style="font-family:Georgia,serif;font-size:12.5px;line-height:1.75">${escapeHtml(en)}</p>
        <p style="font-size:12px">${escapeHtml(zh)}</p>
      </div>`).join("")}
    </div>`).join("")}
  </div>

  <div class="en-section">
    <div class="en-section-head"><h2>连接表达</h2><span class="en-section-note">别再只用 however / moreover</span></div>
    <div class="en-grid cols-2">
      ${Object.entries(CONNECTORS).map(([k, list]) => `<div class="en-card">
        <h3>${{ cause: "原因", result: "结果", contrast: "转折 / 对比", addition: "递进", concession: "让步", comparison: "比较", sequence: "顺序", emphasis: "强调" }[k]}</h3>
        <ul class="clean" style="margin:0;padding-left:18px;font-size:12.5px;line-height:1.85">
          ${list.map(([en, zh, note]) => `<li><span class="en">${escapeHtml(en)}</span> — ${escapeHtml(zh)}<span class="muted">（${escapeHtml(note)}）</span></li>`).join("")}
        </ul>
      </div>`).join("")}
    </div>
  </div>`;
}

export function reciteView(query = {}) {
  const tab = TABS.some(([id]) => id === query.tab) ? query.tab : "big";
  const body = { big: bigView, letters: () => lettersView(query), para: paraView, picture: pictureView, chart: chartView, expr: exprView, func: funcView }[tab]();
  return `<section class="view view-recite">
    <div class="en-hero">
      <div>
        <p class="eyebrow">RECITE · 背诵库</p>
        <h1>按功能背，<em>不按 PDF 页码背</em></h1>
        <p class="lede">模板、场景、段落、图画、图表、表达与句型分开放；每一块都注明适用场景与来源。背诵的顺序建议：先三版模板骨架，再七类语料，最后补小作文与句型。</p>
      </div>
      <div class="en-hero-side">
        <div class="en-hero-stat"><span>大作文版本</span><b>3</b></div>
        <div class="en-hero-stat"><span>小作文场景</span><b>${LETTERS.length}</b></div>
        <div class="en-hero-stat"><span>段落功能</span><b>${PARAGRAPHS.length}</b></div>
        <div class="en-hero-stat"><span>句型</span><b>${FUNCTIONS.length}</b></div>
      </div>
    </div>
    ${tabBar(tab)}
    ${body}
    ${footer()}
  </section>`;
}
