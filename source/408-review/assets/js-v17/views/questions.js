import { QUESTIONS, SUBJECT_LIST, CHAPTERS, chapterById, subjectById } from '../data/index.js';
import { icon, escapeHtml, footer, emptyBlock, tag } from '../ui.js';
import { questionCard } from '../components/question-card.js';

export function questionsView(store, query = {}) {
  const subject = query.subject === 'ds' || query.subject === 'coa' ? query.subject : 'all';
  const chapter = query.chapter && chapterById.has(query.chapter) ? query.chapter : 'all';
  const year = query.year && /^\d{4}$/.test(query.year) ? Number(query.year) : 'all';
  const type = query.type && ['选择', '综合'].includes(query.type) ? query.type : 'all';
  const group = query.group === 'year' ? 'year' : 'chapter';
  const openId = query.q || '';

  let list = QUESTIONS.slice();
  if (subject !== 'all') list = list.filter((q) => q.subject === subject);
  if (chapter !== 'all') list = list.filter((q) => q.chapter === chapter);
  if (year !== 'all') list = list.filter((q) => q.year === year);
  if (type !== 'all') list = list.filter((q) => q.type === type);
  list.sort((a, b) => (b.year || 0) - (a.year || 0) || String(a.no).localeCompare(String(b.no)));

  const years = [...new Set(QUESTIONS.map((q) => q.year).filter(Boolean))].sort((a, b) => b - a);
  const chapterOptions = CHAPTERS.filter((c) => subject === 'all' || c.subject === subject);
  const groups = groupQuestions(list, group);

  const urlFor = (patch) => {
    const params = new URLSearchParams();
    const next = { subject, chapter, year, type, group, ...patch };
    if (next.subject && next.subject !== 'all') params.set('subject', next.subject);
    if (next.chapter && next.chapter !== 'all') params.set('chapter', next.chapter);
    if (next.year && next.year !== 'all') params.set('year', String(next.year));
    if (next.type && next.type !== 'all') params.set('type', next.type);
    if (next.group && next.group !== 'chapter') params.set('group', next.group);
    const qs = params.toString();
    return `#/questions${qs ? `?${qs}` : ''}`;
  };

  const dsCount = QUESTIONS.filter((q) => q.subject === 'ds').length;
  const coaCount = QUESTIONS.filter((q) => q.subject === 'coa').length;
  const choiceCount = QUESTIONS.filter((q) => q.type === '选择').length;
  const bigCount = QUESTIONS.filter((q) => q.type === '综合').length;

  return `<section class="view view-questions">
    <header class="q-hero">
      <div class="q-hero-copy">
        <p class="eyebrow">QUESTION BANK</p>
        <h1>真题</h1>
        <p class="lede">按科目、章节、年份和题型归档。先做，再看解析；每道题都能回到它对应的考点。</p>
      </div>
      <div class="q-hero-stats">
        <div><strong>${QUESTIONS.length}</strong><span>道题</span></div>
        <div><strong>${dsCount}</strong><span>数据结构</span></div>
        <div><strong>${coaCount}</strong><span>组成原理</span></div>
        <div><strong>${years[0]}</strong><span>最近年份</span></div>
      </div>
    </header>

    <div class="q-type-tabs" role="group" aria-label="选择题与大题">
      <a class="${type === 'all' ? 'is-active' : ''}" href="${urlFor({ type: 'all' })}">全部<b>${QUESTIONS.length}</b></a>
      <a class="${type === '选择' ? 'is-active' : ''}" href="${urlFor({ type: '选择' })}">选择题<b>${choiceCount}</b></a>
      <a class="${type === '综合' ? 'is-active' : ''}" href="${urlFor({ type: '综合' })}">大题<b>${bigCount}</b></a>
    </div>

    <div class="filter-bar">
      <div class="filter-row">
        <div class="filter-chips" role="group" aria-label="科目筛选">
          <a class="filter-chip ${subject === 'all' ? 'is-active' : ''}" href="${urlFor({ subject: 'all', chapter: 'all' })}">全部</a>
          ${SUBJECT_LIST.map((s) => `<a class="filter-chip ${s.id === 'coa' ? 'is-coa' : 'is-ds'} ${subject === s.id ? 'is-active' : ''}" href="${urlFor({ subject: s.id, chapter: 'all' })}"><span class="fc-dot"></span>${s.name}</a>`).join('')}
        </div>
        <div class="filter-selects">
          <label class="select-wrap"><span>章节</span><select data-filter="chapter" aria-label="按章节筛选">
            <option value="all">全部章节</option>
            ${chapterOptions.map((c) => `<option value="${c.id}" ${chapter === c.id ? 'selected' : ''}>${subjectById.get(c.subject)?.name.slice(0, 2)} · ${c.no} ${escapeHtml(c.short)}</option>`).join('')}
          </select></label>
          <label class="select-wrap"><span>年份</span><select data-filter="year" aria-label="按年份筛选">
            <option value="all">全部年份</option>
            ${years.map((y) => `<option value="${y}" ${year === y ? 'selected' : ''}>${y}</option>`).join('')}
          </select></label>
          <label class="select-wrap"><span>题型</span><select data-filter="type" aria-label="按题型筛选">
            <option value="all">全部题型</option>
            <option value="选择" ${type === '选择' ? 'selected' : ''}>选择题</option>
            <option value="综合" ${type === '综合' ? 'selected' : ''}>大题</option>
          </select></label>
        </div>
        <button type="button" class="btn btn-sm btn-shuffle" data-action="shuffle-question">${icon('shuffle', 15)} 随机一题</button>
      </div>
      ${list.length !== QUESTIONS.length ? `<div class="filter-active"><span>已筛选：${list.length} 道</span><a href="#/questions">${icon('close', 13)} 清除筛选</a></div>` : ''}
    </div>

    <div class="q-results-head">
      <span class="q-results-count"><b>${list.length}</b> 道题${subject !== 'all' ? ` · ${subjectById.get(subject)?.name}` : ''}${year !== 'all' ? ` · ${year}` : ''}${type !== 'all' ? ` · ${type === '综合' ? '大题' : '选择题'}` : ''}</span>
      <div class="view-toggle" role="group" aria-label="分组方式">
        <a class="${group === 'year' ? 'is-active' : ''}" href="${urlFor({ group: 'year' })}">${icon('calendar', 14)} 按年份</a>
        <a class="${group === 'chapter' ? 'is-active' : ''}" href="${urlFor({ group: 'chapter' })}">${icon('list', 14)} 按章节</a>
      </div>
    </div>

    <div class="q-groups">
      ${list.length ? groups.map((g) => `<section class="q-group">
        <header class="q-group-head">
          <div class="qgh-main">
            <span class="qgh-kicker">${g.kicker}</span>
            <h2>${g.title}</h2>
          </div>
          <span class="qgh-count">${g.items.length} 道</span>
        </header>
        <div class="q-list">
          ${g.items.map((q) => questionCard(q, { open: q.id === openId })).join('')}
        </div>
      </section>`).join('') : emptyBlock({
        iconName: 'filter',
        title: '这组筛选下还没有题',
        desc: '换一个章节、年份或题型试试；也可以清除筛选看全部。',
        action: `<a class="btn btn-sm" href="#/questions">清除筛选</a>`,
      })}
    </div>

    <div class="q-footnote">
      ${icon('info', 14)}
      <span>从站内《408 考点强化》与《408 真题分类》整理：例题、真题统一归档，解析保留原笔记思路；每题都能回到对应考点。当前共 ${QUESTIONS.length} 道。</span>
    </div>

    ${footer()}
  </section>`;
}

function groupQuestions(list, group) {
  if (!list.length) return [];
  if (group === 'chapter') {
    const map = new Map();
    for (const q of list) {
      if (!map.has(q.chapter)) map.set(q.chapter, []);
      map.get(q.chapter).push(q);
    }
    return [...map.entries()]
      .map(([chapterId, items]) => {
        const c = chapterById.get(chapterId);
        const s = c ? subjectById.get(c.subject) : null;
        return {
          key: chapterId,
          kicker: s?.name || '',
          title: c ? `${c.no} ${c.title}` : '未分类',
          order: CHAPTERS.findIndex((x) => x.id === chapterId),
          items,
        };
      })
      .sort((a, b) => a.order - b.order);
  }
  const map = new Map();
  for (const q of list) {
    if (!map.has(q.year)) map.set(q.year, []);
    map.get(q.year).push(q);
  }
  return [...map.entries()]
    .sort((a, b) => (b[0] || 0) - (a[0] || 0))
    .map(([year, items]) => ({
      key: String(year),
      kicker: 'YEAR',
      title: year ? `${year} 年` : '未编年例题',
      items,
    }));
}
