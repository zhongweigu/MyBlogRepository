import { META, topicById, chapterById, subjectById } from '../data/index.js';
import { REVIEW_CARDS } from '../data/review-cards.js';
import { examCountdown } from '../stats.js';
import { escapeHtml, icon, footer, todayLabel, subjectClass } from '../ui.js';

const TODAY_COUNT = 25;

/**
 * 每日固定批次：按“日期 + 当前卡片库”生成，不使用学习进度。
 * 术语卡与流程卡混在同一个池里，随机抽 25 张；同一天多次打开结果相同。
 */
export function todayView() {
  const label = todayLabel();
  const dateKey = shanghaiDateKey();
  const seed = hashString(dateKey);
  const cards = seededShuffle(REVIEW_CARDS, seed).slice(0, TODAY_COUNT);
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
      <h1>今天：25 张卡片，术语与流程打混。</h1>
      <p class="daily-lede">不用打卡，也不用标记掌握程度。先看问题在心里作答，想完再展开答案核对。每天按上海日期从当前卡片库重新抽取，同一天内容相同，次日换一批。</p>
      <p class="daily-note">日期批次：<b>${dateKey}</b> · 从 ${REVIEW_CARDS.length} 张卡片中随机抽取</p>
      <div class="daily-actions">
        <a class="btn btn-primary btn-lg" href="#/glossary">${icon('arrowRight', 16)} 查看完整复习库</a>
        <a class="btn btn-lg" href="#/map">${icon('map', 16)} 知识地图</a>
      </div>
    </header>

    <section class="daily-module daily-section" aria-labelledby="daily-cards-title">
      <header class="daily-module-head">
        <div>
          <p class="eyebrow">CARDS · ${TODAY_COUNT}</p>
          <h2 id="daily-cards-title">今日随机卡片</h2>
          <p>术语、流程混排；先回答卡片上的问题，再展开核对答案、检查点和来源。</p>
        </div>
        <div class="daily-module-count"><b>${TODAY_COUNT}</b><span>张卡片</span></div>
      </header>
      <div class="daily-term-list">
        ${cards.map((card, index) => cardItem(card, index)).join('')}
      </div>
    </section>

    ${footer()}
  </section>`;
}

function cardItem(card, index) {
  const topic = card.topic ? topicById.get(card.topic) : null;
  const chapter = topic ? chapterById.get(topic.chapter) : null;
  const subject = chapter ? subjectById.get(chapter.subject) : null;
  const kind = card.kind === 'flow' ? '流程' : '术语';
  const answer = card.kind === 'flow'
    ? `<ol>${(card.answer || []).map((step) => `<li>${escapeHtml(step)}</li>`).join('')}</ol>`
    : `<p>${escapeHtml(card.answer || '')}</p>`;
  const checkpoints = (card.checkpoints || []).length
    ? `<div class="dr-check"><strong>掌握检查点</strong><ul>${card.checkpoints.map((x) => `<li>${escapeHtml(x)}</li>`).join('')}</ul></div>`
    : '';
  const source = topic
    ? `<a class="dr-link" href="#/topic/${topic.id}">回看考点：${escapeHtml(topic.title)} ${icon('arrowRight', 12)}</a>`
    : '';
  return `<details class="dr-card ${card.kind === 'flow' ? 'dr-flow' : 'dr-term'} ${subjectClass(subject?.id)}">
    <summary>
      <span class="dr-no">${String(index + 1).padStart(2, '0')}</span>
      <span class="dr-main">
        <small>${kind} · ${escapeHtml(subject?.name || '408')}${chapter ? ` · ${escapeHtml(chapter.short)}` : ''}</small>
        <strong>${escapeHtml(card.question || card.title)}</strong>
      </span>
      <span class="dr-hint">展开答案</span>
    </summary>
    <div class="dr-answer">
      ${answer}
      ${card.goal ? `<p class="dr-goal"><strong>复习目标：</strong>${escapeHtml(card.goal)}</p>` : ''}
      ${checkpoints}
      ${source}
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
