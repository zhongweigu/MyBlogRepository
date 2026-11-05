import { META, SUBJECT_LIST, QUESTIONS, topicById, chapterById } from '../data/index.js';
import { overallStats, subjectStats, reviewGuide, pickDailyTopic, examCountdown, dayIndex } from '../stats.js';
import { today } from '../store.js';
import {
  escapeHtml, icon, fmtDateCN, progressRing, footer, sectionHead, tag, subjectClass, todayLabel,
} from '../ui.js';
import { questionCard } from '../components/question-card.js';

function dailyQuestion(seed = dayIndex()) {
  if (!QUESTIONS.length) return null;
  return QUESTIONS[seed % QUESTIONS.length];
}

export function todayView(store) {
  const t = today();
  const label = todayLabel();
  const overall = overallStats(store);
  const due = store.dueTopics();
  const fresh = store.newTopics(3).map((id) => topicById.get(id)).filter(Boolean);
  const queue = store.queue();
  const todayCount = store.todayCount();
  const streak = store.streak();
  const countdown = META.examDate ? examCountdown(META.examDate) : null;
  const q = dailyQuestion();
  const dailyPoint = pickDailyTopic();
  const guide = reviewGuide(store);
  const last = store.state.lastTopic ? topicById.get(store.state.lastTopic) : null;

  const title = due.length
    ? '今天，先把到期的清掉。'
    : fresh.length
      ? '今天，开一个新考点。'
      : '今天，把熟悉的再滚一遍。';

  const lede = due.length
    ? `有 ${due.length} 个考点到期。先回忆，再翻答案——回忆本身才是复习。`
    : fresh.length
      ? '到期队列是空的。挑一个还没碰过的考点，先建立第一遍印象。'
      : '所有考点都已经有记录。今天适合串脉络、做真题，或者把最薄的一章回看一遍。';

  return `<section class="view view-today">
    <div class="today-hero">
      <div class="today-hero-copy">
        <div class="today-date-row">
          <span class="eyebrow">${label.full}</span>
          ${countdown && store.settings.countdown
            ? `<span class="countdown ${countdown.days < 0 ? 'is-over' : countdown.days <= 30 ? 'is-near' : ''}" title="按 ${META.examDate} 估算">
                ${icon('clock', 14)} 距初试${countdown.days >= 0 ? ` 约 <b>${countdown.days}</b> 天` : '已过'}
              </span>`
            : ''}
        </div>
        <h1>${title}</h1>
        <p class="today-lede">${lede}</p>
        <div class="today-actions">
          ${queue.length
            ? `<button type="button" class="btn btn-primary btn-lg" data-action="start-queue">
                ${icon('play', 17)} 开始今日复习
                <span class="btn-count">${queue.length}</span>
              </button>`
            : `<a class="btn btn-primary btn-lg" href="#/questions">${icon('file', 17)} 去真题库</a>`}
          <a class="btn btn-lg" href="#/map">${icon('map', 17)} 知识地图</a>
          ${last ? `<a class="text-link" href="#/topic/${last.id}">继续上次 · ${escapeHtml(last.title)} ${icon('arrowRight', 14)}</a>` : ''}
        </div>
      </div>
      <aside class="today-ring-wrap">
        ${progressRing(overall.pct, 104, 7)}
        <p class="ring-caption"><b>${overall.studied}</b> / ${overall.total} 个考点已开始</p>
        <p class="ring-sub">已掌握 <b>${overall.mastered}</b> 个 · 今日复习 <b>${todayCount.reviews}</b> 次</p>
      </aside>
    </div>

    <div class="today-grid">
      <div class="today-main">
        <section class="panel plan-panel">
          ${sectionHead({
            eyebrow: 'TODAY’S PLAN',
            title: '今日三件事',
            desc: '不用多，按顺序做完就好。',
            actions: `<span class="shortcut-hint">${icon('keyboard', 14)} 按 <kbd>/</kbd> 搜索</span>`,
          })}
          <ol class="plan-list">
            <li class="plan-item ${due.length ? 'is-primary' : ''}">
              <span class="plan-index">01</span>
              <span class="plan-icon ${due.length ? 'is-live' : ''}">${icon('rotate', 20)}</span>
              <div class="plan-copy">
                <h3>${due.length ? `清掉 <em>${due.length}</em> 个到期考点` : '到期队列已清空'}</h3>
                <p>${due.length ? '先不看书，按回忆模式过一遍；想不起来就看一眼抓手。' : '没有到期考点，可以直接进入下一项。'}</p>
              </div>
              ${due.length
                ? `<button type="button" class="plan-btn" data-action="start-queue">开始 <span>${due.length}</span></button>`
                : `<span class="plan-done">${icon('check', 16)} 已完成</span>`}
            </li>
            <li class="plan-item">
              <span class="plan-index">02</span>
              <span class="plan-icon">${icon('spark', 20)}</span>
              <div class="plan-copy">
                <h3>开 <em>${fresh.length || 0}</em> 个新考点</h3>
                <p>${fresh[0] ? `下一站《${escapeHtml(fresh[0].title)}》，先读一句话抓手。` : '所有考点都已开始，可以回头串联或做真题。'}</p>
              </div>
              ${fresh[0]
                ? `<a class="plan-btn" href="#/topic/${fresh[0].id}">去读 <span>${icon('arrowRight', 14)}</span></a>`
                : `<a class="plan-btn" href="#/questions">去真题库 <span>${icon('arrowRight', 14)}</span></a>`}
            </li>
            <li class="plan-item">
              <span class="plan-index">03</span>
              <span class="plan-icon">${icon('file', 20)}</span>
              <div class="plan-copy">
                <h3>做 <em>1</em> 道真题</h3>
                <p>${q ? `${q.year} 年 · 第 ${q.no} 题 · ${escapeHtml(q.type)}；先自己想，再看解析。` : '真题库还在整理中。'}</p>
              </div>
              ${q ? `<a class="plan-btn" href="#/questions?q=${q.id}">今日一题 <span>${icon('arrowRight', 14)}</span></a>` : ''}
            </li>
          </ol>
        </section>

        <section class="panel daily-panel">
          <div class="daily-tabs" role="tablist" aria-label="每日内容">
            <button type="button" class="daily-tab is-active" role="tab" aria-selected="true" data-action="daily-tab" data-tab="question">${icon('file', 16)} 每日一题</button>
            <button type="button" class="daily-tab" role="tab" aria-selected="false" data-action="daily-tab" data-tab="point">${icon('book', 16)} 每日一点</button>
            <span class="daily-tab-spacer"></span>
            <button type="button" class="text-btn" data-action="shuffle-daily">${icon('shuffle', 14)} 换一题</button>
          </div>
          <div class="daily-pane is-active" data-pane="question" id="daily-question-slot">
            ${q ? questionCard(q, { compact: true, open: false }) : '<p class="muted">暂无题目。</p>'}
          </div>
          <div class="daily-pane" data-pane="point" hidden>
            ${dailyPoint ? dailyPointCard(dailyPoint) : ''}
          </div>
        </section>
      </div>

      <aside class="today-side">
        <section class="panel guide-panel">
          ${sectionHead({ eyebrow: 'REVIEW GUIDE', title: '复习指引', desc: '按你当前的进度生成。' })}
          <ol class="guide-list">
            ${guide.map((g, i) => `<li class="guide-item">
              <span class="guide-no">${String(i + 1).padStart(2, '0')}</span>
              <div class="guide-copy">
                <h4>${g.action === 'start-queue'
                  ? `<button type="button" class="link-btn" data-action="start-queue">${escapeHtml(g.title)}</button>`
                  : `<a href="${g.href}">${escapeHtml(g.title)}</a>`}</h4>
                <p>${escapeHtml(g.desc)}</p>
              </div>
              <span class="guide-icon">${icon(g.icon, 16)}</span>
            </li>`).join('')}
          </ol>
        </section>

        <section class="panel stats-panel">
          ${sectionHead({ eyebrow: 'PROGRESS', title: '科目进度', desc: '' })}
          <div class="subject-bars">
            ${SUBJECT_LIST.map((s) => {
              const st = subjectStats(store, s.id);
              return `<a class="subject-bar ${subjectClass(s.id)}" href="#/map?subject=${s.id}">
                <div class="sb-head"><span class="sb-dot"></span><strong>${s.name}</strong><span>${st.mastered} / ${st.total}</span></div>
                <div class="sb-track"><i style="width:${st.pct}%"></i></div>
                <div class="sb-foot"><span>${st.studied} 个已开始</span><span>${st.pct}%</span></div>
              </a>`;
            }).join('')}
          </div>
          <div class="streak-row">
            <span class="streak-flame">${icon('flame', 18)}</span>
            <div><strong>${streak} 天</strong><span>连续复习</span></div>
            <div class="streak-today">今天 ${todayCount.reviews} 次</div>
          </div>
        </section>

        <section class="panel rhythm-panel">
          ${sectionHead({ eyebrow: 'RHYTHM', title: '复习节奏', desc: '' })}
          ${heatmap(store)}
          ${forecast(store)}
        </section>
      </aside>
    </div>
    ${footer()}
  </section>`;
}

export function dailyQuestionCard(index) {
  const q = QUESTIONS[index % QUESTIONS.length];
  return q ? questionCard(q, { compact: true, open: false }) : '<p class="muted">暂无题目。</p>';
}

function dailyPointCard(topic) {
  const chapter = chapterById.get(topic.chapter);
  return `<div class="daily-point">
    <div class="dp-meta"><span class="eyebrow">${chapter?.no || ''} ${chapter ? escapeHtml(chapter.short) : ''}</span><span>今日一点</span></div>
    <h3>${escapeHtml(topic.title)}</h3>
    <p class="dp-take">${escapeHtml(topic.takeaway)}</p>
    <div class="dp-foot">
      <span class="tags">${(topic.exam?.types || []).map((t) => tag(t, 'plain')).join('')}${tag(`考频 ${topic.importance}/5`, 'plain')}</span>
      <a class="text-link" href="#/topic/${topic.id}">读完整考点 ${icon('arrowRight', 14)}</a>
    </div>
  </div>`;
}

function heatmap(store) {
  const cells = store.heatmap(10);
  const todayKey = today();
  const hasData = cells.some((c) => c.reviews > 0 || c.questions > 0);
  return `<div class="heatmap-wrap">
    <div class="heatmap" role="img" aria-label="最近十周复习热力图">
      ${cells.map((c) => {
        const activity = c.reviews + c.questions;
        const lv = activity === 0 ? 0 : activity <= 1 ? 1 : activity <= 3 ? 2 : 3;
        return `<span class="heat-cell l${lv} ${c.date === todayKey ? 'is-today' : ''}" title="${c.date} · 复习 ${c.reviews} 次${c.questions ? ` · 真题 ${c.questions} 道` : ''}"></span>`;
      }).join('')}
    </div>
    <div class="heat-legend"><span>少</span><i class="l0"></i><i class="l1"></i><i class="l2"></i><i class="l3"></i><span>多</span></div>
    ${hasData ? '' : '<p class="heat-empty">还没有复习记录。完成一轮后，这里会亮起来。</p>'}
  </div>`;
}

function forecast(store) {
  const data = store.forecast(7);
  const max = Math.max(1, ...data.map((d) => d.count));
  const total = data.reduce((s, d) => s + d.count, 0);
  if (!total) {
    return `<p class="forecast-empty">未来 7 天暂无到期考点。新考点会在复习后自动排期。</p>`;
  }
  const labels = ['今', '明', '后', '三', '四', '五', '六'];
  return `<div class="forecast">
    <div class="forecast-head"><span>未来 7 天到期</span><span>${total} 个</span></div>
    <div class="forecast-bars">
      ${data.map((d, i) => `<div class="fc-col" title="${fmtDateCN(d.date)} · ${d.count} 个">
        <i style="height:${Math.max(4, Math.round((d.count / max) * 46))}px"></i>
        <span>${labels[i]}</span>
      </div>`).join('')}
    </div>
  </div>`;
}
