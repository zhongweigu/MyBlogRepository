import { chapterById, topicsOfChapter, questionsOfChapter, subjectOf, CHAINS, topicById } from '../data/index.js';
import { chapterStats } from '../stats.js';
import { icon, escapeHtml, importanceBars, footer, tag, emptyBlock, dueLabel, subjectClass } from '../ui.js';
import { today } from '../store.js';
import { questionRow } from '../components/question-card.js';

export function chapterView(store, chapterId) {
  const chapter = chapterById.get(chapterId);
  if (!chapter) return null;
  const subject = subjectOf(chapterId);
  const topics = topicsOfChapter(chapterId);
  const stats = chapterStats(store, chapterId);
  const questions = questionsOfChapter(chapterId);
  const chapterChains = CHAINS.filter((c) => c.steps.some((s) => topics.some((t) => t.id === s.topic)));
  const t = today();

  return `<section class="view view-chapter ${subjectClass(subject?.id)}">
    <nav class="breadcrumb" aria-label="面包屑">
      <a href="#/map?subject=${subject?.id || 'ds'}">知识地图</a>
      <span class="bc-sep">/</span>
      <a href="#/map?subject=${subject?.id || 'ds'}">${escapeHtml(subject?.name || '')}</a>
      <span class="bc-sep">/</span>
      <span class="bc-current">${escapeHtml(chapter.title)}</span>
    </nav>

    <header class="chapter-hero">
      <span class="chapter-ghost" aria-hidden="true">${chapter.no}</span>
      <div class="chapter-hero-main">
        <p class="eyebrow">${subject?.name || ''} · CHAPTER ${chapter.no}</p>
        <h1>${escapeHtml(chapter.title)}</h1>
        <p class="chapter-tagline">${escapeHtml(chapter.tagline)}</p>
        <p class="chapter-intro">${escapeHtml(chapter.intro)}</p>
        <div class="chapter-actions">
          <button type="button" class="btn btn-primary" data-action="start-chapter-runner" data-chapter="${chapter.id}">${icon('play', 16)} 滚动复习本章</button>
          <a class="btn" href="#/questions?chapter=${chapter.id}">${icon('file', 16)} 本章真题</a>
          <a class="btn btn-ghost" href="#/map?subject=${subject?.id || 'ds'}">${icon('arrowLeft', 16)} 返回地图</a>
        </div>
      </div>
      <aside class="chapter-hero-stats">
        <div class="chs-item"><strong>${stats.total}</strong><span>考点</span></div>
        <div class="chs-item"><strong>${questions.length}</strong><span>真题</span></div>
        <div class="chs-item"><strong>${chapter.minutes || 40}</strong><span>分钟</span></div>
        <div class="chs-progress">
          <div class="chs-ring">${progressPct(stats.pct)}</div>
          <span>平均掌握度</span>
        </div>
      </aside>
    </header>

    <div class="chapter-thread">
      <span class="thread-caption">${icon('link', 14)} 本章脉络</span>
      <div class="thread-track">
        ${topics.map((topic, i) => `${i ? `<span class="thread-arrow">${icon('arrowRight', 13)}</span>` : ''}<a class="thread-node" href="#/topic/${topic.id}"><span>${String(i + 1).padStart(2, '0')}</span>${escapeHtml(topic.kicker)}</a>`).join('')}
      </div>
    </div>

    <details class="chapter-recite">
      <summary>
        <span>本章背诵清单</span>
        <small>${topics.length} 个考点 · ${topics.reduce((n, t) => n + (t.points?.length || 0), 0)} 条</small>
      </summary>
      <div class="chapter-recite-grid">
        ${topics.map((topic) => `<article class="chapter-recite-card">
          <h3><a href="#/topic/${topic.id}">${escapeHtml(topic.title)}</a></h3>
          <p>${topic.takeaway}</p>
          <ol>${(topic.points || []).map((p) => `<li><strong>${escapeHtml(p.t)}</strong>${escapeHtml(p.lead)}</li>`).join('')}</ol>
        </article>`).join('')}
      </div>
    </details>

    <div class="chapter-body-grid">
      <div class="chapter-main">
        <div class="ladder-head">
          <div><p class="eyebrow">TOPICS</p><h2>本章考点</h2></div>
          <span class="ladder-hint">${stats.studied} 个已开始 · ${stats.mastered} 个已掌握</span>
        </div>
        <div class="topic-ladder">
          ${topics.map((topic, i) => {
            const level = store.levelOf(topic.id);
            const due = store.entry(topic.id)?.due;
            const qn = (topic.questions || []).length;
            return `<a class="ladder-item" href="#/topic/${topic.id}">
              <span class="li-no">${String(i + 1).padStart(2, '0')}</span>
              <span class="li-main">
                <span class="li-title">${escapeHtml(topic.title)}</span>
                <span class="li-kicker">${escapeHtml(topic.kicker)}</span>
                <span class="li-take">${escapeHtml(topic.takeaway)}</span>
              </span>
              <span class="li-side">
                <span class="status-pill level-${level}">${level ? ['', '初识', '熟悉', '掌握', '熟练'][level] : '未学'}</span>
                ${due && due <= t ? `<span class="due-pill">到期</span>` : ''}
                <span class="li-imp">${importanceBars(topic.importance)}</span>
                <span class="li-q">${qn ? `${qn} 道真题` : '暂无真题'}</span>
              </span>
              <span class="li-arrow">${icon('arrowRight', 18)}</span>
            </a>`;
          }).join('')}
        </div>

        <section class="chapter-exam">
          <div class="section-head">
            <div><p class="eyebrow">PAST EXAM</p><h2>本章真题</h2></div>
            <a class="text-link" href="#/questions?chapter=${chapter.id}">全部 ${questions.length} 道 ${icon('arrowRight', 14)}</a>
          </div>
          ${questions.length ? `<div class="question-rows">${questions.slice(0, 4).map(questionRow).join('')}</div>` : emptyBlock({ iconName: 'file', title: '本章真题还在整理', desc: '可以先做其他章节的题目，或者回到考点页看例题。' })}
        </section>
      </div>

      <aside class="chapter-side">
        <section class="side-card">
          <p class="eyebrow">EXAM FOCUS</p>
          <h3>这一章怎么考</h3>
          <p>${escapeHtml(chapter.examFocus)}</p>
        </section>
        <section class="side-card">
          <p class="eyebrow">THREAD</p>
          <h3>一句话记住本章</h3>
          <p class="side-quote">${escapeHtml(chapter.thread)}</p>
        </section>
        ${chapterChains.length ? `<section class="side-card">
          <p class="eyebrow">CONNECTIONS</p>
          <h3>这些脉络经过本章</h3>
          <div class="side-chains">
            ${chapterChains.slice(0, 3).map((c) => `<a href="#/topic/${c.steps[0].topic}">${icon('link', 14)}<span>${escapeHtml(c.title)}</span>${icon('arrowRight', 13)}</a>`).join('')}
          </div>
        </section>` : ''}
      </aside>
    </div>

    ${footer()}
  </section>`;
}

function progressPct(pct) {
  const c = 2 * Math.PI * 22;
  return `<svg viewBox="0 0 52 52" width="52" height="52" aria-hidden="true">
    <circle cx="26" cy="26" r="22" fill="none" stroke="var(--line-soft)" stroke-width="4"/>
    <circle cx="26" cy="26" r="22" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"
      stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${(c * (1 - pct / 100)).toFixed(1)}" transform="rotate(-90 26 26)"/>
  </svg><b>${pct}<small>%</small></b>`;
}
