import { SUBJECT_LIST, CHAINS, topicById } from '../data/index.js';
import { subjectStats, chapterStats } from '../stats.js';
import { icon, escapeHtml, importanceBars, footer, sectionHead, progressRing } from '../ui.js';

export function mapView(store) {
  const subject = SUBJECT_LIST[0];
  const stats = subjectStats(store, subject.id);
  const lastTopic = store.state.lastTopic ? topicById.get(store.state.lastTopic) : null;
  const lastChapter = lastTopic ? lastTopic.chapter : null;
  const firstOpenChapter = lastChapter && subject.chapters.some((c) => c.id === lastChapter)
    ? lastChapter
    : (subject.chapters.find((c) => {
      const cs = chapterStats(store, c.id);
      return cs.studied < cs.reviewable;
    })?.id || subject.chapters[0]?.id);

  const chains = CHAINS.filter((c) => c.subject === subject.id);

  return `<section class="view view-map is-my">
    <header class="map-head">
      <div>
        <p class="eyebrow">KNOWLEDGE MAP</p>
        <h1>知识地图</h1>
        <p class="lede">从导论到科学社会主义，六个板块、二十九个专题。先把框架走一遍，再往里填细节；点章节展开专题，点专题进入阅读。</p>
      </div>
      <div class="map-head-side">
        ${progressRing(stats.pct, 84, 6)}
        <div class="map-head-note">
          <strong>${stats.studied} / ${stats.total}</strong>
          <span>个专题已开始</span>
        </div>
      </div>
    </header>

    <section class="subject-hero is-my">
      <div class="sh-copy">
        <p class="eyebrow">SUBJECT ${subject.no} · ${subject.en}</p>
        <h2>${escapeHtml(subject.name)}</h2>
        <p class="sh-tagline">${escapeHtml(subject.tagline)}</p>
        <p class="sh-intro">${escapeHtml(subject.intro)}</p>
      </div>
      <div class="sh-stats">
        <div><strong>${subject.chapters.length}</strong><span>板块</span></div>
        <div><strong>${stats.total}</strong><span>专题</span></div>
        <div><strong>${stats.mastered}</strong><span>已掌握</span></div>
        <div><strong>${stats.due}</strong><span>待复习</span></div>
      </div>
    </section>

    <div class="map-toolbar">
      <div class="map-toolbar-title"><span class="eyebrow">CHAPTERS</span><span>${subject.chapters.length} 个板块 · ${stats.total} 个专题</span></div>
      <div class="map-toolbar-actions">
        <button type="button" class="text-btn" data-action="toggle-all-chapters">${icon('layers', 14)} <span>展开全部</span></button>
        <a class="text-btn" href="#/chapter/${subject.chapters[0].id}">${icon('list', 14)} 从第一个板块开始</a>
      </div>
    </div>

    <div class="chapter-stack">
      ${subject.chapters.map((chapter) => {
        const cst = chapterStats(store, chapter.id);
        const isOpen = chapter.id === firstOpenChapter;
        return `<details class="chapter-card ${chapter.id === lastChapter ? 'is-current' : ''}" ${isOpen ? 'open' : ''} data-chapter="${chapter.id}">
          <summary class="chapter-summary">
            <span class="cc-no">${chapter.no}</span>
            <span class="cc-title">
              <span class="cc-h3">${escapeHtml(chapter.title)}</span>
              <span class="cc-tagline">${escapeHtml(chapter.tagline)}</span>
            </span>
            <span class="cc-progress">
              <span class="cc-track"><i style="width:${cst.pct}%"></i></span>
              <span class="cc-num">${cst.reviewable ? `${cst.studied} / ${cst.reviewable}` : '待补'}</span>
            </span>
            <span class="cc-count">${cst.reviewable ? `${cst.total} 专题` : `待补 ${cst.pending}`}</span>
            <span class="cc-chev">${icon('chevron', 20)}</span>
          </summary>
          <div class="chapter-body">
            <div class="map-topics">
              ${chapter.topics.map((topic) => {
                const level = store.levelOf(topic.id);
                return `<a class="map-topic ${topic.pending ? 'is-pending' : ''}" href="#/topic/${topic.id}">
                  <span class="status-dot level-${level}" title="${level ? `掌握度 ${level}/4` : '未学'}"></span>
                  <span class="mt-main">
                    <span class="mt-title">${escapeHtml(topic.title)}</span>
                    <span class="mt-kicker">${escapeHtml(topic.kicker)}</span>
                  </span>
                  <span class="mt-meta">
                    ${importanceBars(topic.importance)}
                    ${topic.pending ? '<span class="mt-q is-pending">待补</span>' : '<span class="mt-q is-empty">—</span>'}
                  </span>
                  <span class="mt-level">${topic.pending ? '待补' : level ? ['', '初识', '熟悉', '掌握', '熟练'][level] : '未学'}</span>
                  <span class="mt-arrow">${icon('arrowRight', 16)}</span>
                </a>`;
              }).join('')}
            </div>
            <div class="chapter-foot">
              <span>${escapeHtml(chapter.examFocus)}</span>
              <a class="text-link" href="#/chapter/${chapter.id}">进入本板块 ${icon('arrowRight', 14)}</a>
            </div>
          </div>
        </details>`;
      }).join('')}
    </div>

    <section class="chains-section">
      ${sectionHead({
        eyebrow: 'THREADS',
        title: '横向串联',
        desc: '这些线把不同板块的专题接在一起。沿着线走一遍，比孤立地背更能记住。',
      })}
      <div class="chain-grid">
        ${chains.map((chain, i) => `<article class="chain-card">
          <header class="chain-head">
            <span class="chain-no">${String(i + 1).padStart(2, '0')}</span>
            <h3>${escapeHtml(chain.title)}</h3>
            <p>${escapeHtml(chain.note)}</p>
          </header>
          <div class="chain-steps">
            ${chain.steps.map((step, j) => {
              const topic = topicById.get(step.topic);
              if (!topic) return '';
              return `${j ? '<span class="chain-arrow">' + icon('arrowRight', 13) + '</span>' : ''}<a class="chain-step" href="#/topic/${topic.id}"><span class="cs-no">${String(j + 1).padStart(2, '0')}</span><span>${escapeHtml(step.label)}</span></a>`;
            }).join('')}
          </div>
        </article>`).join('')}
      </div>
    </section>

    <div class="map-bottom-cta">
      <div>
        <p class="eyebrow">NEXT</p>
        <h3>地图走完了，回到今日队列。</h3>
        <p>按到期顺序滚动复习，每个专题先回忆，再读全文。</p>
      </div>
      <a class="btn btn-primary" href="#/today">${icon('calendar', 16)} 打开今日复习</a>
    </div>

    ${footer()}
  </section>`;
}
