import { SOURCES, STRATEGY } from "../data/meta.js";
import { CORPUS, EXTRA_CORPUS } from "../data/corpus.js";
import { LETTERS } from "../data/letters.js";
import { EXAMS } from "../data/exams.js";
import { CARDS } from "../data/cards.js";
import { DICTATION_ITEMS } from "../data/dictation.js";
import { footer, pageHead, escapeHtml } from "../ui.js";

const COVERAGE = [
  ["三版大作文模板（满分 / 简化 / 速通）", "模版部分 p.3–7、使用说明 p.4–15", "#/recite", "A"],
  ["9 / 5 / 5 个填空项与来源表", "使用说明 p.11–15", "#/recite", "A"],
  ["图画公式与示例（2023 / 2020）", "使用说明 p.5–6", "#/recite", "A"],
  ["图表公式与示例（2025 / 2020 英二）", "使用说明 p.6–8", "#/recite", "A"],
  ["七类价值观语料（行为/成果/领域/能力/效果/战略/变化）", "语料库 p.3–13", "#/corpus", "A"],
  ["2020–2026 范文与中文对照", "套写实操 p.9–99", "#/exams", "A"],
  ["官方写作要求、字数与评分原则", "使用说明 p.16–17（截图）", "#/strategy/str-04", "A"],
  ["2023 / 2024 / 2025 官方定性", "使用说明 p.19–21、p.28–29（截图）", "#/exams", "A"],
  ["小作文 13 场景与可背模板", "PDF 未涉及，依据大纲扩充", "#/recite?g=letters", "C"],
  ["模板句扩写（323 句）", "以 PDF 例句为骨架仿写", "#/recite", "C"],
  ["默写题库（背诵 + 语料）", "从现有模板与语料自动派生", "#/dictation", "B"],
];

export function sourcesView() {
  const corpusCount = CORPUS.reduce((n, v) => n + Object.values(v.slots).reduce((m, arr) => m + arr.length, 0), 0) + EXTRA_CORPUS.length;

  return `<section class="view view-sources">
    ${pageHead({
      eyebrow: "SOURCES · 资料",
      title: "每段内容，都能追到出处",
      desc: "四份 PDF、151 页；A = 原文，B = 整理，C = 扩充。官方未收录的年份留空，不补写。",
    })}

    <h2 style="font-family:var(--serif);font-size:19px;margin:26px 0 8px">文件清单</h2>
    <table class="src-table">
      <thead><tr><th>文件</th><th>页数</th><th>类别</th><th>读取</th><th>去向</th></tr></thead>
      <tbody>
        ${SOURCES.map((s) => `<tr>
          <td>${escapeHtml(s.file)}</td>
          <td>${s.pages}</td>
          <td>${escapeHtml(s.category)}</td>
          <td>全文</td>
          <td>${escapeHtml(s.into.join("；"))}</td>
        </tr>`).join("")}
      </tbody>
    </table>

    <h2 style="font-family:var(--serif);font-size:19px;margin:28px 0 8px">内容去向</h2>
    <table class="src-table">
      <thead><tr><th>原始内容</th><th>出处</th><th>现在在哪</th><th>来源</th></tr></thead>
      <tbody>
        ${COVERAGE.map(([a, b, c, d]) => `<tr><td>${escapeHtml(a)}</td><td class="small">${escapeHtml(b)}</td><td class="small">${escapeHtml(c)}</td><td>${d}</td></tr>`).join("")}
      </tbody>
    </table>

    <h2 style="font-family:var(--serif);font-size:19px;margin:28px 0 8px">数量</h2>
    <p class="small" style="line-height:2">
      PDF 4 份 / 151 页；语料 ${corpusCount} 条；真题 ${EXAMS.length} 年 × 4 版（页面只展示 5 篇主范文）；
      小作文 ${LETTERS.length} 类；每日卡 ${CARDS.length} 张；默写题库 ${DICTATION_ITEMS.length} 条；策略 ${STRATEGY.length} 篇。
    </p>

    <h2 style="font-family:var(--serif);font-size:19px;margin:28px 0 8px">尚未完成</h2>
    <ol class="small" style="line-height:2;padding-left:20px;color:var(--ink-2)">
      <li>小作文 13 类是扩充（C），尚未按 2010–2026 英语一 A 节真题逐年对齐。</li>
      <li>2020–2022 官方《试题分析》未收录；2026 官方《考试分析》未出版，只有题目与作者审题。</li>
      <li>《模版使用说明》第 16–29 页为官方截图，摘录可能有识读误差；关键引用已上下文校对。</li>
      <li>语料库第 10–13 页为分栏排版，文本层错位，已按语义复原；如有出入以原 PDF 为准。</li>
      <li>模板句为仿写扩充（C），英文经过搭配与语域检查，但仍建议以老师/真题范文为准。</li>
    </ol>

    ${footer()}
  </section>`;
}
