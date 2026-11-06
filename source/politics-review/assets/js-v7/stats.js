import { SUBJECT_LIST, chapterById, topicsOfChapter, reviewableTopicsOfChapter } from './data/index.js';
import { today } from './store.js';

export function topicStats(store, ids) {
  const list = ids || [];
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
    studiedPct: total ? Math.round((studied / total) * 100) : 0,
  };
}

export function subjectStats(store, subjectId) {
  const subject = SUBJECT_LIST.find((s) => s.id === subjectId);
  const ids = subject
    ? subject.chapters.flatMap((c) => c.topics.filter((t) => !t.pending).map((t) => t.id))
    : [];
  return { ...topicStats(store, ids), subject };
}

export function chapterStats(store, chapterId) {
  const all = topicsOfChapter(chapterId);
  const reviewable = reviewableTopicsOfChapter(chapterId);
  const stats = topicStats(store, reviewable.map((t) => t.id));
  return { ...stats, total: all.length, reviewable: reviewable.length, topics: all, pending: all.length - reviewable.length };
}

export function overallStats(store) {
  const ids = SUBJECT_LIST.flatMap((s) => s.chapters.flatMap((c) => c.topics.filter((t) => !t.pending).map((t) => t.id)));
  return topicStats(store, ids);
}

export function examCountdown(examDate = null) {
  if (!examDate) return null;
  const t = today();
  const d = Math.round((new Date(`${examDate}T00:00:00`) - new Date(`${t}T00:00:00`)) / 86400000);
  return { days: d, date: examDate };
}

export function chapterLabel(chapterId) {
  const c = chapterById.get(chapterId);
  return c ? `${c.no} ${c.short}` : '';
}
