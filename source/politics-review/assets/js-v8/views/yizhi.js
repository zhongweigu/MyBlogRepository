import { YIZHI } from '../data/yizhi.js';
import { topicById, chapterById, SUBJECTS } from '../data/index.js';
import { escapeHtml, icon, footer } from '../ui.js';

const SUBJECT_NAME = { my: '马原', sx: '史纲', xz: '新思想与法治' };

function strip(html) {
  return String(html).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

export function yizhiView(store, query = {}) {
  const subject = query.subject && SUBJECTS[query.subject] ? query.subject : 'all';
  const list = subject === 'all' ? YIZHI : YIZHI.filter((i) => i.subject === subject);

  // 按知识库章节分组，保持手册顺序
  const groups = [];
  const index = new Map();
  for (const item of list) {
    const topic = topicById.get(item.topic);
    const chapter = topic ? chapterById.get(topic.chapter) : null;
    const key = chapter ? chapter.id : 'other';
    if (!index.has(key)) {
      const group = { id: key, chapter, subject: item.subject, items: [] };
      index.set(key, group);
      groups.push(group);
    }
    index.get(key).items.push(item);
  }

  return `<section class="view view-yizhi">
    <header class="yz-hero">
      <p class="eyebrow">ONE PAGE · 一页纸</p>
      <h1>一页纸 · 知识点手册</h1>
      <p class="yz-lede">100 个知识点的原文卡片，文字与彩色圈画照手册保留；每张卡片都能跳进知识库看展开讲解与记忆方法。</p>
      <div class="yz-meta"><span><b>${YIZHI.length}</b> 个知识点</span><span>马原 36 · 史纲 58 · 新思想与法治 6</span><span>颜色即重点：<em class="yz-r">红</em> <em class="yz-b">蓝</em> <em class="yz-a">浅蓝</em> <em class="yz-o">橙</em> <em class="yz-p">紫</em></span></div>
    </header>

    <div class="yz-toolbar">
      <div class="lib-tabs" role="group" aria-label="科目筛选">
        <a class="lib-tab ${subject === 'all' ? 'is-active' : ''}" href="#/yizhi">全部<span>${YIZHI.length}</span></a>
        ${Object.values(SUBJECTS).map((s) => `<a class="lib-tab ${subject === s.id ? 'is-active' : ''}" href="#/yizhi?subject=${s.id}">${escapeHtml(s.name)}<span>${YIZHI.filter((i) => i.subject === s.id).length}</span></a>`).join('')}
      </div>
      <label class="glossary-search">
        <span>${icon('search', 15)}</span>
        <input type="search" data-yizhi-search placeholder="搜知识点、关键词…" aria-label="搜索一页纸">
        <kbd data-yizhi-count>${list.length}</kbd>
      </label>
    </div>

    ${groups.map((group) => `
      <section class="yz-group">
        <header class="yz-group-head">
          <span class="yz-sub">${escapeHtml(SUBJECT_NAME[group.subject] || '')}</span>
          <h2>${escapeHtml(group.chapter ? `${group.chapter.no} ${group.chapter.title}` : '其他')}</h2>
          <span class="yz-group-count">${group.items.length} 个知识点</span>
        </header>
        <div class="yz-grid">
          ${group.items.map((item) => yizhiCard(item)).join('')}
        </div>
      </section>`).join('')}

    <p class="yz-empty" data-yizhi-empty hidden>没有匹配的知识点。</p>
    ${footer()}
  </section>`;
}

function yizhiCard(item) {
  const topic = topicById.get(item.topic);
  const text = `${item.title} ${strip(item.body)}`.toLowerCase();
  return `<article class="yz-card is-${item.subject}" data-yizhi="${escapeHtml(text)}">
    <header class="yz-card-head">
      <span class="yz-no">知识点 ${item.n}</span>
      <h3>${escapeHtml(item.title)}</h3>
    </header>
    <div class="yz-body">${item.body}</div>
    ${topic ? `<a class="yz-link" href="#/topic/${topic.id}">${icon('arrowRight', 13)} 知识库详解 · ${escapeHtml(topic.title)}</a>` : ''}
  </article>`;
}

export function filterYizhi(value) {
  const q = String(value || '').trim().toLowerCase();
  let shown = 0;
  document.querySelectorAll('[data-yizhi]').forEach((card) => {
    const hit = !q || (card.dataset.yizhi || '').includes(q);
    card.hidden = !hit;
    if (hit) shown += 1;
  });
  document.querySelectorAll('.yz-group').forEach((group) => {
    group.hidden = !group.querySelector('[data-yizhi]:not([hidden])');
  });
  const empty = document.querySelector('[data-yizhi-empty]');
  if (empty) empty.hidden = shown !== 0;
  const count = document.querySelector('[data-yizhi-count]');
  if (count) count.textContent = shown;
}
