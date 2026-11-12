import { META, TOPICS, topicById, chapterById, subjectById } from '../data/index.js';
import { examCountdown } from '../stats.js';
import { LEVELS } from '../store.js';import { escapeHtml, icon, footer, todayLabel, subjectClass } from '../ui.js';

const DAILY_LIMIT = 10;

/**
 * 今日页只保留一个模块：每日知识点复习。
 * 队列优先取到期考点，不足 10 个时用新考点补齐；
 * 全部学完且没有到期时，从最薄弱的考点里抽查。
 */
export function todayView(store) {
  const label = todayLabel();
  const countdown = META.examDate ? examCountdown(META.examDate) : null;
  const dueCount = store.dueTopics().length;
  const queue = store.dailyQueue(DAILY_LIMIT);

  const items = queue.length
    ? queue.map((item) => ({ ...item, topic: topicById.get(item.id) })).filter((x) => x.topic)
    : fallbackTopics(store).map((topic) => ({ id: topic.id, kind: 'extra', topic }));

  const todayCount = store.todayCount();
  const newCount = items.filter((x) => x.kind === 'new').length;
  const extraCount = items.filter((x) => x.kind === 'extra').length;
  const headline = items.length
    ? `今天，复习这 ${items.length} 个考点。`
    : '今天，暂时没有要复习的考点。';

  return `<section class="view view-today daily-view">
    <header class="daily-hero">
      <div class="daily-date-row">
        <span class="eyebrow">${label.full}</span>
        ${countdown && store.settings.countdown
          ? `<span class="countdown ${countdown.days < 0 ? 'is-over' : countdown.days <= 30 ? 'is-near' : ''}" title="按 ${META.examDate} 估算">
              ${icon('clock', 14)} 距初试${countdown.days >= 0 ? ` 约 <b>${countdown.days}</b> 天` : '已过'}
            </span>`
          : ''}
      </div>
      <h1>${headline}</h1>
      <p class="daily-lede">每天从到期考点和新考点里随机抽 ${items.length || DAILY_LIMIT} 个；先按问题回忆，再展开要点。不追求一次记完，追求下次还能想起来。</p>
      <div class="daily-actions">
        ${items.length
          ? `<button type="button" class="btn btn-primary btn-lg" data-action="start-queue">
              ${icon('play', 17)} 开始今日复习
              <span class="btn-count">${items.length}</span>
            </button>`
          : `<a class="btn btn-primary btn-lg" href="#/map">${icon('map', 17)} 去知识地图</a>`}
        <a class="btn btn-lg" href="#/map">${icon('map', 17)} 知识地图</a>
      </div>
      <p class="daily-note">
        今日已复习 <b>${todayCount.reviews}</b> 次
        · 到期 <b>${dueCount}</b> 个
        ${newCount ? ` · 新考点 <b>${newCount}</b> 个` : ''}
        ${extraCount ? ` · 抽查 <b>${extraCount}</b> 个` : ''}
      </p>
    </header>

    <section class="daily-module" aria-labelledby="daily-module-title">
      <header class="daily-module-head">
        <div>
          <p class="eyebrow">DAILY REVIEW</p>
          <h2 id="daily-module-title">每日知识点复习</h2>
          <p>顺序每天打乱；先按“先回忆”的问题自测，回忆不上来就点“读全文”。</p>
        </div>
        <div class="daily-module-count">
          <b>${items.length}</b>
          <span>个考点</span>
        </div>
      </header>

      ${items.length ? `<ol class="daily-list">
        ${items.map((item, i) => dailyItem(item, i, store)).join('')}
      </ol>` : `<div class="daily-empty">
        ${icon('check', 22)}
        <h3>今天没有待复习的考点</h3>
        <p>所有考点都已经有记录。去知识地图挑一个最薄的章节，或者直接读一篇考点全文。</p>
        <a class="btn btn-sm" href="#/map">去知识地图</a>
      </div>`}
    </section>

    ${footer()}
  </section>`;
}

function dailyItem(item, index, store) {
  const { topic, kind } = item;
  const chapter = chapterById.get(topic.chapter);
  const subject = chapter ? subjectById.get(chapter.subject) : null;
  const level = store.levelOf(topic.id);
  const kindLabel = kind === 'new' ? '新考点' : kind === 'extra' ? '抽查' : '到期';
  return `<li class="daily-item ${subjectClass(subject?.id)}">
    <span class="di-no">${String(index + 1).padStart(2, '0')}</span>
    <div class="di-main">
      <div class="di-meta">
        <span class="di-subject">${escapeHtml(subject?.name || '')}</span>
        <span>${chapter ? `${chapter.no} ${escapeHtml(chapter.short)}` : ''}</span>
        <span class="di-kind ${kind === 'new' ? 'is-new' : ''}">${kindLabel}</span>
      </div>
      <h3><a href="#/topic/${topic.id}">${escapeHtml(topic.title)}</a></h3>
      <p class="di-take">${topic.takeaway}</p>
      <div class="di-foot">
        <span class="di-level">${LEVELS[level]?.label || '未学'}</span>
        <span class="di-dots" aria-hidden="true">${[1, 2, 3, 4].map((n) => `<i class="${level >= n ? 'on' : ''}"></i>`).join('')}</span>
        <a class="di-read" href="#/topic/${topic.id}">读全文 ${icon('arrowRight', 13)}</a>
      </div>
    </div>
    <button type="button" class="di-review" data-action="start-topic-runner" data-topic="${topic.id}" data-kind="${kind}">
      ${icon('play', 14)} 复习
    </button>
  </li>`;
}

/** 全部有记录、且没有到期时，从最薄弱的考点池里随机抽。 */
function fallbackTopics(store) {
  const pool = TOPICS
    .filter((topic) => store.levelOf(topic.id) < 4)
    .sort((a, b) => {
      const la = store.levelOf(a.id);
      const lb = store.levelOf(b.id);
      if (la !== lb) return la - lb;
      return (b.importance || 0) - (a.importance || 0);
    })
    .slice(0, DAILY_LIMIT * 2);
  return shuffle(pool).slice(0, DAILY_LIMIT);
}

function shuffle(list) {
  const out = list.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
