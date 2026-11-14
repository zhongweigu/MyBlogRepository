import { META, topicById, chapterById, subjectById } from '../data/index.js';
import { REVIEW_TERMS } from '../data/review-terms.js';
import { REVIEW_FLOWS } from '../data/review-flows.js';
import { examCountdown } from '../stats.js';
import { escapeHtml, icon, footer, todayLabel, subjectClass } from '../ui.js';

const TERM_COUNT = 20;
const FLOW_COUNT = 5;

/**
 * 每日固定批次：按“日期 + 当前知识库数据”生成，不使用学习进度。
 * 同一天多次打开结果相同；换一天会换一批。
 */
export function todayView() {
  const label = todayLabel();
  const dateKey = shanghaiDateKey();
  const seed = hashString(dateKey);
  const terms = seededShuffle(REVIEW_TERMS, seed).slice(0, TERM_COUNT);
  const flows = seededShuffle(REVIEW_FLOWS, seed ^ 0x9e3779b9).slice(0, FLOW_COUNT);
  const countdown = META.examDate ? examCountdown(META.examDate) : null;

  return `<section class="view view-today daily-view">
    <header class="daily-hero">
      <div class="daily-date-row">
        <span class="eyebrow">${label.full}</span>
        ${countdown
          ? `<span class="countdown ${countdown.days < 0 ? 'is-over' : countdown.days <= 30 ? 'is-near' : ''}" title="按 ${META.examDate} 估算">
              ${icon('clock', 14)} 距初试 ${countdown.days >= 0 ? `约 <b>${countdown.days}</b> 天` : '已过'}
            </span>`
          : ''}
      </div>
      <h1>今天：20 个术语，5 个流程。</h1>
      <p class="daily-lede">不用打卡，也不用标记掌握程度。先看术语复述含义、看流程复述步骤，想完再展开答案。每天按日期从当前知识库重新抽取，内容会随知识库更新。</p>
      <p class="daily-note">日期批次：<b>${dateKey}</b> · 同一天多次打开内容相同，次日自动换一批。</p>
    </header>

    <section class="daily-module daily-section" aria-labelledby="daily-terms-title">
      <header class="daily-module-head">
        <div>
          <p class="eyebrow">TERMS · 20</p>
          <h2 id="daily-terms-title">术语复述</h2>
          <p>看术语，先在心里回答“它是什么”；再展开核对定义。</p>
        </div>
        <div class="daily-module-count"><b>20</b><span>个术语</span></div>
      </header>
      <div class="daily-term-list">
        ${terms.map((term, index) => termItem(term, index)).join('')}
      </div>
    </section>

    <section class="daily-module daily-section" aria-labelledby="daily-flows-title">
      <header class="daily-module-head">
        <div>
          <p class="eyebrow">FLOWS · 5</p>
          <h2 id="daily-flows-title">流程复述</h2>
          <p>先按顺序复述关键步骤，再展开答案检查遗漏的环节。</p>
        </div>
        <div class="daily-module-count"><b>5</b><span>个流程</span></div>
      </header>
      <div class="daily-flow-list">
        ${flows.map((flow, index) => flowItem(flow, index)).join('')}
      </div>
    </section>

    ${footer()}
  </section>`;
}

function termItem(term, index) {
  const topic = term.topic ? topicById.get(term.topic) : null;
  const chapter = topic ? chapterById.get(topic.chapter) : null;
  const subject = chapter ? subjectById.get(chapter.subject) : null;
  return `<details class="dr-card dr-term ${subjectClass(subject?.id)}">
    <summary>
      <span class="dr-no">${String(index + 1).padStart(2, '0')}</span>
      <span class="dr-main"><strong>${escapeHtml(term.t)}</strong><small>${escapeHtml(subject?.name || '408')}${chapter ? ` · ${escapeHtml(chapter.short)}` : ''}</small></span>
      <span class="dr-hint">展开答案</span>
    </summary>
    <div class="dr-answer">
      <p>${escapeHtml(term.d)}</p>
      ${topic ? `<a class="dr-link" href="#/topic/${topic.id}">回看考点：${escapeHtml(topic.title)} ${icon('arrowRight', 12)}</a>` : ''}
    </div>
  </details>`;
}

function flowItem(flow, index) {
  const topic = flow.topic ? topicById.get(flow.topic) : null;
  const chapter = topic ? chapterById.get(topic.chapter) : null;
  const subject = chapter ? subjectById.get(chapter.subject) : null;
  return `<details class="dr-card dr-flow ${subjectClass(subject?.id)}">
    <summary>
      <span class="dr-no">${String(index + 1).padStart(2, '0')}</span>
      <span class="dr-main"><strong>${escapeHtml(flow.t)}</strong><small>${escapeHtml(subject?.name || '408')}${chapter ? ` · ${escapeHtml(chapter.short)}` : ''}</small></span>
      <span class="dr-hint">展开步骤</span>
    </summary>
    <div class="dr-answer">
      <ol>${flow.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}</ol>
      ${topic ? `<a class="dr-link" href="#/topic/${topic.id}">回看考点：${escapeHtml(topic.title)} ${icon('arrowRight', 12)}</a>` : ''}
    </div>
  </details>`;
}

function shanghaiDateKey() {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
  } catch {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
}

function hashString(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededShuffle(list, seed) {
  let state = seed >>> 0;
  const random = () => {
    state = (state + 0x6D2B79F5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const out = list.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
