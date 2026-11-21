import { SOURCES, SITE, STRATEGY } from "../data/meta.js";
import { CORPUS, EXTRA_CORPUS } from "../data/corpus.js";
import { LETTERS } from "../data/letters.js";
import { PARAGRAPHS } from "../data/library.js";
import { EXAMS } from "../data/exams.js";
import { CARDS } from "../data/cards.js";
import { icon, footer, srcMark } from "../ui.js";

const COVERAGE = [
  ["三版大作文模板（满分 / 简化 / 速通）", "模版部分 p.3–7、使用说明 p.4–15", "#/recite?tab=big", "A"],
  ["9 / 5 / 5 个填空项与来源表", "使用说明 p.11–15", "#/recite?tab=big", "A"],
  ["图画两类公式与示例（2023 / 2020）", "使用说明 p.5–6", "#/recite?tab=picture", "A"],
  ["图表动态 / 静态公式与示例（2025 / 2020 英二）", "使用说明 p.6–8", "#/recite?tab=chart", "A"],
  ["混合材料写法（2024 图画+图表）", "使用说明 p.9–10", "#/recite?tab=big · #/exams?year=2024", "A"],
  ["七类价值观语料（行为/成果/领域/能力/效果/战略/变化）", "语料库 p.3–13", "#/corpus", "A"],
  ["自主补充语料 6 条", "语料库 p.14", "#/corpus", "A"],
  ["2020–2026 四版范文 + 中文对照", "套写实操 p.9–99", "#/exams", "A"],
  ["逐年审题与主题分析", "套写实操 p.10 起每年「写作解析」", "#/exams", "B"],
  ["大纲写作要求、A/B 节字数与分值", "使用说明 p.16（官方截图）", "#/strategy/str-01", "A"],
  ["评分原则、五档 / 四档标准", "使用说明 p.17（官方截图）", "#/strategy/str-01", "A"],
  ["2023 / 2024 / 2025 官方试题分析与定性", "使用说明 p.19–21、p.28–29（官方截图）", "#/strategy/str-02", "A"],
  ["宏大叙事、思辨 + 实证、卷面与字数", "使用说明 p.18、p.30–31", "#/strategy/str-02 · str-09", "A"],
  ["审题七步、图表五步、文字材料法", "由模板说明与真题归纳", "#/strategy/str-03–06", "B"],
  ["小作文 13 个场景", "PDF 未涉及（A 节），依据大纲扩充", "#/recite?tab=letters", "C"],
  ["基础表达、搭配、连接、句型、中式英语对照", "PDF 只有零星句子，主体为扩充", "#/recite?tab=expr · func", "C"],
];

export function sourcesView() {
  const totalEntries = CORPUS.reduce((n, v) => n + Object.values(v.slots).reduce((m, arr) => m + arr.length, 0), 0) + EXTRA_CORPUS.length;
  return `<section class="view view-sources">
    <div class="en-hero">
      <div>
        <p class="eyebrow">SOURCES · 资料与完整性</p>
        <h1>每一段内容，<em>都能追到出处</em></h1>
        <p class="lede">四份 PDF、151 页，全部读取并归位。这一页记录：文件清单、读取方式、提取到什么、放进了哪个模块，以及哪些地方还不能打满分。</p>
      </div>
      <div class="en-hero-side">
        <div class="en-hero-stat"><span>PDF</span><b>4</b></div>
        <div class="en-hero-stat"><span>页数</span><b>151</b></div>
        <div class="en-hero-stat"><span>语料条目</span><b>${totalEntries}</b></div>
        <div class="en-hero-stat"><span>范文</span><b>${EXAMS.length * 4}</b></div>
      </div>
    </div>

    <div class="en-section">
      <div class="en-section-head"><h2>来源标记</h2><span class="en-section-note">全文统一使用</span></div>
      <div class="en-grid cols-3">
        <div class="en-card"><span class="en-card-no">${srcMark("A")} 原始资料</span><p>直接来自 PDF，保留原文、原有表达与逻辑。模板句、语料条目、官方文件引文均属此类。</p></div>
        <div class="en-card"><span class="en-card-no">${srcMark("B")} 整理归纳</span><p>由原始资料中的多个知识点整合、分类、重组而成，不改变原意。如七类语料的槽位归类、逐年审题的三段式拆解。</p></div>
        <div class="en-card"><span class="en-card-no">${srcMark("C")} 自主扩充</span><p>依据大纲、真题与阅卷要求补充，未伪装成原始资料。小作文全部、表达库主体、部分策略方法属此类。</p></div>
      </div>
    </div>

    <div class="en-section">
      <div class="en-section-head"><h2>文件清单与读取状态</h2><span class="en-section-note">第一阶段 · 资料盘点</span></div>
      <div class="grid" style="display:grid;gap:10px">
        ${SOURCES.map((s) => `<div class="en-card" style="padding:18px 20px">
          <div style="display:flex;gap:10px;align-items:baseline;flex-wrap:wrap">
            <span class="en-card-no">${s.pages} 页</span>
            <h3 style="font-size:15px">${s.file}</h3>
            <span class="en-tag is-a">${s.category}</span>
            <span class="en-tag">读取：${s.read === "full" ? "全文" : "部分"}</span>
            <span class="en-tag">整理：${s.organized === "full" ? "已完成" : "进行中"}</span>
          </div>
          <p><b>读取记录：</b>${s.readNote}</p>
          <p><b>去向：</b>${s.into.join("；")}</p>
          <p style="color:var(--ink-3)"><b>备注：</b>${s.note}</p>
        </div>`).join("")}
      </div>
    </div>

    <div class="en-section">
      <div class="en-section-head"><h2>原始内容 → 复习台位置</h2><span class="en-section-note">完整性对照</span></div>
      <div class="table-card"><div class="table-scroll"><table class="slot-table">
        <thead><tr><th>原始内容</th><th>出处</th><th>现在在哪</th><th>来源</th></tr></thead>
        <tbody>${COVERAGE.map(([a, b, c, d]) => `<tr><td>${a}</td><td style="font-size:11.5px">${b}</td><td>${c}</td><td>${srcMark(d)}</td></tr>`).join("")}</tbody>
      </table></div></div>
    </div>

    <div class="en-section">
      <div class="en-section-head"><h2>重复、版本与矛盾</h2><span class="en-section-note">保留原文，注明区别</span></div>
      <div class="en-grid cols-2">
        <div class="en-card">
          <h3>三份 PDF 共有的模板</h3>
          <p>《模版部分》《模版使用说明》《套写实操》都收了三版模板。处理方式：以《模版部分》的模板正文为主版本；《使用说明》补充 9/5/5 填表、优先级与限制；《套写实操》补充逐年四版范文。三处表述一致，未删任何一处有价值说明。</p>
        </div>
        <div class="en-card">
          <h3>2026 满分版少一句收束</h3>
          <p>其余年份满分版第一段以 It serves as a compelling testament to… 收束；2026 年纯图表满分版没有这一句，主题在段首 The figures… concerning 中已出现。两种都符合模板逻辑，已在真题页分别标注，不判定哪一版“错误”。</p>
        </div>
        <div class="en-card">
          <h3>英美拼写混用</h3>
          <p>原始 PDF 中 behavior / behaviour、neighborhood / neighbourhood、favour 等混用（大纲明确英美拼写均可接受）。平台保留原文；扩充部分统一用英式拼写。考场上任选一种，全文一致即可。</p>
        </div>
        <div class="en-card">
          <h3>真题覆盖标注不完全可靠</h3>
          <p>《语料库部分》给每类价值观标了“真题覆盖”，但部分年份与材料的对应关系较宽（如把 2015 英一归入和谐、友善两类）。平台照录并注明“原 PDF 标注”，未擅自改写；实际立意以真题页的官方定性/审题分析为准。</p>
        </div>
      </div>
    </div>

    <div class="en-section">
      <div class="en-section-head"><h2>逐年提取记录</h2><span class="en-section-note">套写实操 · 99 页</span></div>
      <div class="table-card"><div class="table-scroll"><table class="slot-table">
        <thead><tr><th>年份</th><th>满分版起始页</th><th>简化版</th><th>速通·标准</th><th>速通·无脑</th><th>已录入内容</th></tr></thead>
        <tbody>
          <tr><td>2026</td><td>p.9</td><td>p.13</td><td>p.16</td><td>p.19</td><td>4 篇范文 + 中文对照 + 审题 + 逐句语料来源</td></tr>
          <tr><td>2025</td><td>p.22</td><td>p.26</td><td>p.29</td><td>p.32</td><td>同上；表格数据 12 个，范文取舍 6 个</td></tr>
          <tr><td>2024</td><td>p.35</td><td>p.39</td><td>p.42</td><td>p.45</td><td>同上；含图画+图表的两种描述句</td></tr>
          <tr><td>2023</td><td>p.48</td><td>p.52</td><td>p.55</td><td>p.58</td><td>同上；含人物话语引用</td></tr>
          <tr><td>2022</td><td>p.61</td><td>p.65</td><td>p.68</td><td>p.71</td><td>同上；满分版多一句 For example</td></tr>
          <tr><td>2021</td><td>p.74</td><td>p.78</td><td>p.81</td><td>p.84</td><td>同上；含戏服/道具描述</td></tr>
          <tr><td>2020</td><td>p.87</td><td>p.91</td><td>p.94</td><td>p.97</td><td>同上；双图对比 + 标题“习惯”</td></tr>
        </tbody>
      </table></div></div>
      <p class="muted" style="font-size:12px;margin-top:8px">每版含 1 页范文、1 页中文对照、1–2 页写作解析。四版合计 28 篇范文，已全部进入 <a href="#/exams">真题套写库</a>。</p>
    </div>

    <div class="en-section">
      <div class="en-section-head"><h2>自检结果</h2><span class="en-section-note">对照任务书 A–D</span></div>
      <div class="en-grid cols-2">
        <div class="en-card"><h3>A · 资料完整性</h3><ul style="margin:0;padding-left:18px;font-size:12.5px;line-height:1.9">
          <li>4 份 PDF 全部读取；文字层用 PyMuPDF 全量提取，截图页人工阅读。</li>
          <li>三版模板、9/5/5 填空表、七类语料、28 篇范文全部进入复习台。</li>
          <li>小作文不属于四份 PDF，已标注为扩充。</li>
          <li>重复内容（三份 PDF 共有的模板）保留一处主版本，其余注明出处，未删减。</li>
        </ul></div>
        <div class="en-card"><h3>B · 背诵体系</h3><ul style="margin:0;padding-left:18px;font-size:12.5px;line-height:1.9">
          <li>小作文 ${LETTERS.length} 个场景；大作文 3 版模板 + ${PARAGRAPHS.length} 个段落功能。</li>
          <li>图画 4 层 + 3 公式；图表 5 类 + 8 组数据动作。</li>
          <li>语料库 ${totalEntries} 条，7 个槽位与模板一一对应。</li>
          <li>每日卡 ${CARDS.length} 张，覆盖语料、模板、小作文、句型、策略。</li>
        </ul></div>
        <div class="en-card"><h3>C · 策略体系</h3><ul style="margin:0;padding-left:18px;font-size:12.5px;line-height:1.9">
          <li>${STRATEGY.length} 篇长文：认知 → 趋势 → 审题 → 图画 → 图表 → 文字 → 小作文 → 套用 → 考场。</li>
          <li>写作台提供五步流程与在线组装器，可直接演练。</li>
          <li>模板调用关系写成「通用 / 场景 / 主题」三层，并给出不可机械套用的情形。</li>
        </ul></div>
        <div class="en-card"><h3>D · 考试适配</h3><ul style="margin:0;padding-left:18px;font-size:12.5px;line-height:1.9">
          <li>字数、分值、评分档次全部引用大纲原文。</li>
          <li>宏大叙事以官方定性为锚（2023 乡村文化振兴 / 2024 宜居城市 / 2025 民生福祉）。</li>
          <li>所有扩充英文经过搭配与语域检查；存疑表达不进核心背诵。</li>
        </ul></div>
      </div>
    </div>

    <div class="en-section">
      <div class="en-section-head"><h2>语言审核记录</h2><span class="en-section-note">扩充内容的八项检查</span></div>
      <div class="en-grid cols-2">
        <div class="en-card">
          <h3>查了什么</h3>
          <ul style="margin:0;padding-left:18px;font-size:12.5px;line-height:1.9">
            <li>语法：主谓一致、时态、冠词、单复数、句子完整性。</li>
            <li>搭配：动词+名词、介词、形容词+名词是否自然（如 contribute to / account for / focus on）。</li>
            <li>语域：是否适合考场正式书面语；避免口语缩写与俚语。</li>
            <li>中式英语：逐条与 <a href="#/recite?tab=expr">中式表达对照表</a> 比对。</li>
            <li>冗余：同一句里不重复同义表达；不堆两个近义词求“高级”。</li>
            <li>可记性：长句拆到 12–20 词；一个句型只保留一个记忆点。</li>
            <li>与题目匹配：每句都标注适用材料/段落，避免“万能到没有场景”。</li>
            <li>英美拼写：原文照录，扩充统一英式，并在小作文页注明。</li>
          </ul>
        </div>
        <div class="en-card">
          <h3>改掉了什么</h3>
          <ul style="margin:0;padding-left:18px;font-size:12.5px;line-height:1.9">
            <li>learn more knowledge → acquire knowledge（knowledge 不与 learn more 搭配）。</li>
            <li>can let us → enable us to（let 后不带 to，且偏口语）。</li>
            <li>In a word → In short / In conclusion（In a word 不是“总之”）。</li>
            <li>Last but not least → Finally / More importantly（模板腔，语域不合）。</li>
            <li>improve our English level → improve our English（level 是中式搭配）。</li>
            <li>只保留一条“待核验”规则：分组标题的英文概括（如 the seven guarantees）为整理，不作为原文引用。</li>
          </ul>
        </div>
      </div>
      <div class="en-note" style="margin-top:12px"><b>抽样复核：</b>28 篇范文的词数与 PDF 标注逐一核对，全部一致（195/193/202/196…）；语料库 148 个英文片段逐条比对，未发现缺条；七类语料的“真题覆盖”按原文照录，未改写。</div>
    </div>

    <div class="en-section">
      <div class="en-section-head"><h2>尚未完成 / 需要人工确认</h2><span class="en-section-note">如实列出</span></div>
      <div class="en-note" style="line-height:2">
        1. <b>小作文仍是扩充版</b>：目前 13 个场景按大纲与常见真题场景编写，尚未逐年对齐英语一 A 节真题（2010–2026），后续应补“年份—场景—任务点”对照。<br>
        2. <b>2026 官方定性缺失</b>：教育部 2026《考试分析》在资料整理时尚未出版，2026 页只保留命题角度分析，未冒充官方。<br>
        3. <b>2020–2022 官方原文缺失</b>：PDF 只收录题目图片与作者解读，未收录官方《试题分析》，这三年的“官方定性”栏留空。<br>
        4. <b>截图识读</b>：使用说明第 16–29 页是官方文件截图，文字由模型逐页阅读后摘录；极小字与表格可能有识读误差，关键句已用上下文校对，引用时以“摘自截图”标注。<br>
        5. <b>语料库分栏复原</b>：PDF 第 10–13 页为双栏，文本层顺序错位；已按语义复原，但若与原版排版有出入，以原 PDF 为准。<br>
        6. <b>真题题目原图</b>：7 张已从 PDF 裁切（assets/img/exam-*.png）；如需更高清版本，需提供原始题面 PDF 或图片。
      </div>
    </div>

    <div class="en-section">
      <div class="en-section-head"><h2>维护约定</h2><span class="en-section-note">下一次更新看这里</span></div>
      <div class="en-note">
        数据在 <code>assets/js-v1/data/</code>：<code>corpus.js</code>（语料）、<code>templates.js</code>（模板）、<code>letters.js</code>（小作文）、<code>library.js</code>（段落/图画/图表）、<code>expressions.js</code>（表达）、<code>exams.js</code> + <code>exam-texts.js</code>（真题）、<code>cards.js</code>（每日卡）。<br>
        长文在 <code>assets/content/str-XX.html</code>。改 JS/CSS 时必须递增 <code>js-v1</code> / <code>english.css?v=</code>，否则 CDN 缓存不会更新。<br>
        新增真题：先在 <code>exam-texts.js</code> 补四版范文，再在 <code>exams.js</code> 补主题、官方定性、槽位与提醒。
      </div>
    </div>

    ${footer()}
  </section>`;
}
