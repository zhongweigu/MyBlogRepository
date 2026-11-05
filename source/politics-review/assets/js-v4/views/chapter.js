import { chapterById, topicsOfChapter, subjectOf, CHAINS } from '../data/index.js';
import { chapterStats } from '../stats.js';
import { icon, escapeHtml, importanceBars, footer, markTerms } from '../ui.js';
import { today } from '../store.js';

export function chapterView(store, chapterId) {
  const chapter = chapterById.get(chapterId);
  if (!chapter) return null;
  const subject = subjectOf(chapterId);
  const topics = topicsOfChapter(chapterId);
  const stats = chapterStats(store, chapterId);
  const chapterChains = CHAINS.filter((c) => c.steps.some((s) => topics.some((t) => t.id === s.topic)));
  const t = today();

  return `<section class="view view-chapter is-my">
    <nav class="breadcrumb" aria-label="面包屑">
      <a href="#/map">知识地图</a>
      <span class="bc-sep">/</span>
      <a href="#/map">${escapeHtml(subject?.name || '')}</a>
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
          <button type="button" class="btn btn-primary" data-action="start-chapter-runner" data-chapter="${chapter.id}">${icon('play', 16)} 滚动复习本板块</button>
          <a class="btn" href="#/glossary">${icon('book', 16)} 术语库</a>
          <a class="btn btn-ghost" href="#/map">${icon('arrowLeft', 16)} 返回地图</a>
        </div>
      </div>
      <aside class="chapter-hero-stats">
        <div class="chs-item"><strong>${stats.total}</strong><span>专题</span></div>
        <div class="chs-item"><strong>${stats.pending}</strong><span>待补</span></div>
        <div class="chs-item"><strong>${chapter.minutes || 40}</strong><span>分钟</span></div>
        <div class="chs-progress">
          <div class="chs-ring">${progressPct(stats.pct)}</div>
          <span>平均掌握度</span>
        </div>
      </aside>
    </header>

    <div class="chapter-thread">
      <span class="thread-caption">${icon('link', 14)} 本板块脉络</span>
      <div class="thread-track">
        ${topics.map((topic, i) => `${i ? `<span class="thread-arrow">${icon('arrowRight', 13)}</span>` : ''}<a class="thread-node" href="#/topic/${topic.id}"><span>${String(i + 1).padStart(2, '0')}</span>${escapeHtml(topic.kicker)}</a>`).join('')}
      </div>
    </div>

    <div class="chapter-body-grid">
      <div class="chapter-main">
        <div class="ladder-head">
          <div><p class="eyebrow">TOPICS</p><h2>本板块专题</h2></div>
          <span class="ladder-hint">${stats.studied} 个已开始 · ${stats.mastered} 个已掌握</span>
        </div>
        <div class="topic-ladder">
          ${topics.map((topic, i) => {
            const level = store.levelOf(topic.id);
            const due = store.entry(topic.id)?.due;
            return `<a class="ladder-item ${topic.pending ? 'is-pending' : ''}" href="#/topic/${topic.id}">
              <span class="li-no">${String(i + 1).padStart(2, '0')}</span>
              <span class="li-main">
                <span class="li-title">${escapeHtml(topic.title)}</span>
                <span class="li-kicker">${escapeHtml(topic.kicker)}</span>
                <span class="li-take">${markTerms(topic.takeaway)}</span>
              </span>
              <span class="li-side">
                <span class="status-pill level-${level}">${topic.pending ? '待补' : level ? ['', '初识', '熟悉', '掌握', '熟练'][level] : '未学'}</span>
                ${due && due <= t ? '<span class="due-pill">到期</span>' : ''}
                <span class="li-imp">${importanceBars(topic.importance)}</span>
                <span class="li-q">${topic.points.length ? `${topic.points.length} 个知识点` : '暂无正文'}</span>
              </span>
              <span class="li-arrow">${icon('arrowRight', 18)}</span>
            </a>`;
          }).join('')}
        </div>
      </div>

      <aside class="chapter-side">
        <section class="side-card">
          <p class="eyebrow">EXAM FOCUS</p>
          <h3>这一块怎么考</h3>
          <p>${escapeHtml(chapter.examFocus)}</p>
        </section>
        <section class="side-card">
          <p class="eyebrow">THREAD</p>
          <h3>一句话记住本板块</h3>
          <p class="side-quote">${escapeHtml(chapter.thread)}</p>
        </section>
        ${chapterChains.length ? `<section class="side-card">
          <p class="eyebrow">CONNECTIONS</p>
          <h3>这些脉络经过本板块</h3>
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
