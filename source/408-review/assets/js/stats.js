import { ORDERED_TOPICS, TOPICS, SUBJECT_LIST, chapterById, topicsOfChapter, questionsOfChapter, CHAINS } from './data/index.js';
import { today, addDays } from './store.js';

export function topicStats(store, ids) {
  const list = ids || ORDERED_TOPICS.map((t) => t.id);
  let studied = 0;
  let mastered = 0;
  let levelSum = 0;
  let due = 0;
  const t = today();
  for (const id of list) {
    const p = store.entry(id);
    const lv = p?.level || 0;
    if (lv > 0) studied += 1;
    if (lv >= 3) mastered += 1;
    levelSum += lv;
    if (p?.due && p.due <= t) due += 1;
  }
  const total = list.length;
  return {
    total,
    studied,
    mastered,
    due,
    levelSum,
    avgLevel: total ? levelSum / total : 0,
    pct: total ? Math.round((levelSum / (total * 4)) * 100) : 0,
    startedPct: total ? Math.round((studied / total) * 100) : 0,
    masteredPct: total ? Math.round((mastered / total) * 100) : 0,
  };
}

export function subjectStats(store, subjectId) {
  const subject = SUBJECT_LIST.find((s) => s.id === subjectId);
  const ids = subject ? subject.chapters.flatMap((c) => c.topics.map((t) => t.id)) : [];
  return { ...topicStats(store, ids), subject };
}

export function chapterStats(store, chapterId) {
  const topics = topicsOfChapter(chapterId);
  const ids = topics.map((t) => t.id);
  const qs = questionsOfChapter(chapterId);
  return { ...topicStats(store, ids), questions: qs.length, topics };
}

export function overallStats(store) {
  const base = topicStats(store);
  return { ...base, questions: 0, chains: CHAINS.length };
}

export function weakestChapter(store) {
  const candidates = [];
  for (const subject of SUBJECT_LIST) {
    for (const chapter of subject.chapters) {
      const s = chapterStats(store, chapter.id);
      if (s.studied > 0) candidates.push({ chapter, ...s });
    }
  }
  if (!candidates.length) {
    return { chapter: SUBJECT_LIST[0]?.chapters[0], ...chapterStats(store, SUBJECT_LIST[0]?.chapters[0]?.id) };
  }
  candidates.sort((a, b) => a.avgLevel - b.avgLevel || b.studied - a.studied);
  return candidates[0];
}

export function nextFreshTopic(store) {
  return ORDERED_TOPICS.find((t) => !store.entry(t.id)) || null;
}

export function subjectOf(chapterId) {
  const chapter = chapterById.get(chapterId);
  return chapter ? SUBJECT_LIST.find((s) => s.id === chapter.subject) : null;
}

export function pickChain(store) {
  const scored = CHAINS.map((chain) => {
    const fresh = chain.steps.filter((s) => !store.entry(s.topic)).length;
    return { chain, fresh };
  }).sort((a, b) => b.fresh - a.fresh);
  return scored[0]?.chain || null;
}

export function dayIndex(key = today()) {
  const d = new Date(`${key}T00:00:00`);
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d - start) / 86400000);
}

export function pickDailyTopic(seed = dayIndex()) {
  if (!TOPICS.length) return null;
  return TOPICS[seed % TOPICS.length];
}

export function reviewGuide(store) {
  const t = today();
  const due = store.dueTopics();
  const fresh = nextFreshTopic(store);
  const weak = weakestChapter(store);
  const chain = pickChain(store);
  const hasProgress = Object.keys(store.state.progress).length > 0;
  const items = [];

  if (due.length) {
    items.push({
      kind: 'due',
      title: `先清掉 ${due.length} 个到期考点`,
      desc: '到期的先复习，再开新坑；预计 ' + Math.max(5, due.length * 3) + ' 分钟。',
      href: '#/today',
      action: 'start-queue',
      icon: 'rotate',
    });
  } else {
    items.push({
      kind: 'fresh',
      title: fresh ? `从《${fresh.title}》开始` : '今天的到期队列是空的',
      desc: fresh ? '按章节顺序推进，先把第一个新考点读一遍。' : '可以去真题库随机抽一道，保持手感。',
      href: fresh ? `#/topic/${fresh.id}` : '#/questions',
      icon: 'spark',
    });
  }

  if (fresh && due.length) {
    items.push({
      kind: 'fresh',
      title: `再开一个新考点`,
      desc: `下一站《${fresh.title}》，先看一句话抓手，再展开知识点。`,
      href: `#/topic/${fresh.id}`,
      icon: 'arrowRight',
    });
  }

  if (hasProgress && weak?.chapter) {
    items.push({
      kind: 'weak',
      title: `回看《${weak.chapter.title}》`,
      desc: `本章平均掌握度 ${Math.round(weak.avgLevel * 25)}%，是当前最薄的一块。`,
      href: `#/chapter/${weak.chapter.id}`,
      icon: 'target',
    });
  }

  if (!hasProgress) {
    items.push({
      kind: 'map',
      title: '先看一遍知识地图',
      desc: '把六章标题过一遍，知道每一章大概在讲什么，再进入细节。',
      href: '#/map',
      icon: 'map',
    });
    items.push({
      kind: 'question',
      title: '先做一道 2011 真题',
      desc: '不用急着蒙对，先感受一下 408 怎么把考点变成一道题。',
      href: '#/questions?q=q-2011-ds-1',
      icon: 'file',
    });
  } else if (chain) {
    const first = chain.steps[0];
    items.push({
      kind: 'chain',
      title: `把「${chain.title}」串一遍`,
      desc: chain.note,
      href: `#/topic/${first.topic}`,
      icon: 'link',
    });
  }

  return items.slice(0, 3);
}

export function examCountdown(examDate = null) {
  if (!examDate) return null;
  const t = today();
  const d = Math.round((new Date(`${examDate}T00:00:00`) - new Date(`${t}T00:00:00`)) / 86400000);
  return { days: d, date: examDate };
}

export function nextDueSummary(store) {
  const t = today();
  const entries = Object.entries(store.state.progress)
    .filter(([, p]) => p.due && p.due >= t)
    .sort((a, b) => a[1].due.localeCompare(b[1].due));
  return entries[0]?.[1]?.due || null;
}

export { addDays };
