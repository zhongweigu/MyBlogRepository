import { DIAGRAMS, DIAGRAM_GROUPS } from '../data/diagrams.js';
import { topicById, chapterById, subjectById } from '../data/index.js';
import { escapeHtml, icon, footer, sectionHead } from '../ui.js';

export function diagramsView(store, query = {}) {
  const group = DIAGRAM_GROUPS.some((g) => g.id === query.group) ? query.group : 'all';
  const list = group === 'all' ? DIAGRAMS : DIAGRAMS.filter((d) => d.group === group);
  const featured = DIAGRAMS.find((d) => d.id === 'dg-address-path') || DIAGRAMS[0];
  const gridList = group === 'all' ? list.filter((d) => d.id !== featured.id) : list;

  return `<section class="view view-diagrams">
    <header class="lib-hero">
      <p class="eyebrow">DIAGRAMS · 图解库</p>
      <h1>把一类题的图，先画出来。</h1>
      <p class="lib-lede">不是每张插图都值得单独看。这里只收“代表一类题型”的图：地址翻译全链路、Cache 字段划分、流水线时空图、AVL 旋转、图的最短路……先看图，再回考点读推导。</p>
      <div class="lib-meta"><span><b>${DIAGRAMS.length}</b> 张关键图</span><span><b>${DIAGRAM_GROUPS.length - 1}</b> 个主题</span><span>图片可点击放大</span></div>
    </header>

    <nav class="lib-tabs" aria-label="图解分类">
      ${DIAGRAM_GROUPS.map((g) => `<a class="lib-tab ${g.id === group ? 'is-active' : ''}" href="#/diagrams${g.id === 'all' ? '' : `?group=${g.id}`}">${escapeHtml(g.label)}<span>${g.id === 'all' ? DIAGRAMS.length : DIAGRAMS.filter((d) => d.group === g.id).length}</span></a>`).join('')}
    </nav>

    ${group === 'all' ? `<section class="diagram-feature">
      <div class="df-copy">
        <p class="eyebrow">FEATURED · 典型综合题</p>
        <h2>${escapeHtml(featured.title)}</h2>
        <p>${featured.caption}</p>
        <p class="df-why">${featured.why}</p>
        <a class="text-link" href="#/topic/${featured.topic}">去考点读完整推导 ${icon('arrowRight', 14)}</a>
      </div>
      <button type="button" class="df-image" data-action="zoom-image" data-src="${featured.src}" data-caption="${escapeHtml(featured.caption)}">
        <img src="${featured.src}" alt="${escapeHtml(featured.title)}" loading="lazy" decoding="async">
      </button>
    </section>` : ''}

    <div class="diagram-grid">
      ${gridList.map((d) => diagramCard(d)).join('')}
    </div>

    ${footer()}
  </section>`;
}

function diagramCard(d) {
  const topic = topicById.get(d.topic);
  const chapter = chapterById.get(topic?.chapter);
  const subject = chapter ? subjectById.get(chapter.subject) : null;
  const groupLabel = DIAGRAM_GROUPS.find((g) => g.id === d.group)?.label || d.group;
  return `<article class="diagram-card-lib ${subject?.id === 'coa' ? 'is-coa' : 'is-ds'}" data-group="${d.group}">
    <button type="button" class="dc-image" data-action="zoom-image" data-src="${d.src}" data-caption="${escapeHtml(d.caption)}">
      <img src="${d.src}" alt="${escapeHtml(d.title)}" loading="lazy" decoding="async">
      <span class="dc-zoom">${icon('search', 13)} 放大</span>
    </button>
    <div class="dc-body">
      <div class="dc-meta"><span>${escapeHtml(groupLabel)}</span><span>${chapter ? `${chapter.no} ${escapeHtml(chapter.short)}` : ''}</span></div>
      <h2>${escapeHtml(d.title)}</h2>
      <p>${d.why}</p>
      ${topic ? `<a class="dc-link" href="#/topic/${topic.id}">${escapeHtml(topic.title)} ${icon('arrowRight', 13)}</a>` : ''}
    </div>
  </article>`;
}
