import { SUBJECT_LIST, CHAPTERS, CHAINS, topicById, chapterById } from '../data/index.js';
import { subjectStats, chapterStats } from '../stats.js';
import { icon, escapeHtml, importanceBars, footer, sectionHead, tag, progressRing } from '../ui.js';

export function mapView(store, query = {}) {
  const subjectId = query.subject === 'coa' ? 'coa' : 'ds';
  const subject = SUBJECT_LIST.find((s) => s.id === subjectId);
  const stats = subjectStats(store, subjectId);
  const lastTopic = store.state.lastTopic ? topicById.get(store.state.lastTopic) : null;
  const lastChapter = lastTopic ? lastTopic.chapter : null;
  const defaultOpen = (chapterId) => {
    if (lastChapter) return chapterId === lastChapter;
    return false;
  };
  const firstOpenChapter = defaultOpen && subject.chapters.some((c) => defaultOpen(c.id))
    ? lastChapter
    : (subject.chapters.find((c) => chapterStats(store, c.id).studied < c.topics.length)?.id || subject.chapters[0]?.id);

  const chains = CHAINS.filter((c) => c.subject === subjectId || c.subject === 'cross');

  return `<section class="view view-map ${subjectId === 'coa' ? 'is-coa' : 'is-ds'}">
    <header class="map-head">
      <div>
        <p class="eyebrow">KNOWLEDGE MAP</p>
        <h1>知识地图</h1>
        <p class="lede">从科目到章节，再到考点。先把框架走一遍，再往里填细节。点击章节展开考点，点击考点进入阅读。</p>
      </div>
      <div class="map-head-side">
        ${progressRing(stats.pct, 84, 6)}
        <div class="map-head-note">
          <strong>${stats.studied} / ${stats.total}</strong>
          <span>个考点已开始</span>
        </div>
      </div>
    </header>

    <div class="subject-switch" role="tablist" aria-label="选择科目">
      ${SUBJECT_LIST.map((s) => {
        const st = subjectStats(store, s.id);
        return `<a class="subject-tab ${s.id === subjectId ? 'is-active' : ''} ${s.id === 'coa' ? 'is-coa' : 'is-ds'}" href="#/map?subject=${s.id}" role="tab" aria-selected="${s.id === subjectId}">
          <span class="st-no">${s.no}</span>
          <span class="st-body">
            <span class="st-name">${s.name}</span>
            <span class="st-en">${s.en}</span>
          </span>
          <span class="st-pct"><b>${st.pct}%</b><span>${st.mastered} / ${st.total} 掌握</span></span>
        </a>`;
      }).join('')}
    </div>

    <section class="subject-hero ${subjectId === 'coa' ? 'is-coa' : 'is-ds'}">
      <div class="sh-copy">
        <p class="eyebrow">SUBJECT ${subject.no} · ${subject.en}</p>
        <h2>${subject.name}</h2>
        <p class="sh-tagline">${subject.tagline}</p>
        <p class="sh-intro">${subject.intro}</p>
      </div>
      <div class="sh-stats">
        <div><strong>${subject.chapters.length}</strong><span>章</span></div>
        <div><strong>${stats.total}</strong><span>考点</span></div>
        <div><strong>${stats.mastered}</strong><span>已掌握</span></div>
        <div><strong>${stats.due}</strong><span>待复习</span></div>
      </div>
    </section>

    <div class="map-toolbar">
      <div class="map-toolbar-title"><span class="eyebrow">CHAPTERS</span><span>${subject.chapters.length} 章 · ${stats.total} 个考点</span></div>
      <div class="map-toolbar-actions">
        <button type="button" class="text-btn" data-action="toggle-all-chapters">${icon('layers', 14)} <span>展开全部</span></button>
        <a class="text-btn" href="#/chapter/${subject.chapters[0].id}">${icon('list', 14)} 从第一章开始</a>
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
              <span class="cc-h3">${chapter.title}</span>
              <span class="cc-tagline">${chapter.tagline}</span>
            </span>
            <span class="cc-progress">
              <span class="cc-track"><i style="width:${cst.pct}%"></i></span>
              <span class="cc-num">${cst.studied} / ${cst.total}</span>
            </span>
            <span class="cc-count">${cst.total} 考点</span>
            <span class="cc-chev">${icon('chevron', 20)}</span>
          </summary>
          <div class="chapter-body">
            <div class="map-topics">
              ${chapter.topics.map((topic) => {
                const level = store.levelOf(topic.id);
                const qn = (topic.questions || []).length;
                return `<a class="map-topic" href="#/topic/${topic.id}">
                  <span class="status-dot level-${level}" title="${level ? `掌握度 ${level}/4` : '未学'}"></span>
                  <span class="mt-main">
                    <span class="mt-title">${escapeHtml(topic.title)}</span>
                    <span class="mt-kicker">${escapeHtml(topic.kicker)}</span>
                  </span>
                  <span class="mt-meta">
                    ${importanceBars(topic.importance)}
                    ${qn ? `<span class="mt-q">${qn} 真题</span>` : '<span class="mt-q is-empty">—</span>'}
                  </span>
                  <span class="mt-level">${level ? ['', '初识', '熟悉', '掌握', '熟练'][level] : '未学'}</span>
                  <span class="mt-arrow">${icon('arrowRight', 16)}</span>
                </a>`;
              }).join('')}
            </div>
            <div class="chapter-foot">
              <span>${escapeHtml(chapter.examFocus)}</span>
              <a class="text-link" href="#/chapter/${chapter.id}">进入本章 ${icon('arrowRight', 14)}</a>
            </div>
          </div>
        </details>`;
      }).join('')}
    </div>

    <section class="chains-section">
      ${sectionHead({
        eyebrow: 'THREADS',
        title: '横向串联',
        desc: '这些线把不同章节的考点接在一起。沿着线走一遍，比孤立地背更能记住。',
      })}
      <div class="chain-grid">
        ${chains.map((chain, i) => `<article class="chain-card ${chain.subject === 'cross' ? 'is-cross' : ''}">
          <header class="chain-head">
            <span class="chain-no">${String(i + 1).padStart(2, '0')}${chain.subject === 'cross' ? ' · 跨学科' : ''}</span>
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
        <h3>地图走完了，去题里验证一下。</h3>
        <p>按章节筛真题，先做，再看解析。</p>
      </div>
      <a class="btn btn-primary" href="#/questions?subject=${subjectId}">${icon('file', 16)} 打开真题库</a>
    </div>

    ${footer()}
  </section>`;
}
