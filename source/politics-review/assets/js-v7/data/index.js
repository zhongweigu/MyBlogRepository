import { META, SUBJECTS, CHAPTERS, CHAINS } from './meta.js';
import { CORE_TOPICS } from './topics-core.js';
import { SX_TOPICS } from './topics-sx.js';
import { SX_ARTICLES } from './sx-articles.js';
import { XZ_TOPICS } from './topics-xz.js';
import { PENDING_TOPICS } from './topics-pending.js';

export { META, SUBJECTS, CHAPTERS, CHAINS };

export const TOPICS = [
  ...CORE_TOPICS,
  ...SX_TOPICS.map((t) => ({ ...t, article: SX_ARTICLES[t.id] || '' })),
  ...XZ_TOPICS,
  ...PENDING_TOPICS,
];

export const topicById = new Map(TOPICS.map((t) => [t.id, t]));
export const chapterById = new Map(CHAPTERS.map((c) => [c.id, c]));
export const subjectById = new Map(Object.values(SUBJECTS).map((s) => [s.id, s]));

/** 已经有正文的专题：每日队列、进度统计、术语抽取只看这些 */
export const REVIEWABLE_TOPICS = TOPICS.filter((t) => !t.pending);

/**
 * 每日队列用的专题顺序：按科目轮转，避免 70 个专题排成「马原全学完才轮到史纲」。
 */
export const REVIEWABLE_IDS = (() => {
  const groups = Object.values(SUBJECTS).map((subject) => subject.chapters
    .flatMap((cid) => TOPICS.filter((t) => t.chapter === cid).sort((a, b) => a.order - b.order))
    .filter((t) => !t.pending)
    .map((t) => t.id));
  const out = [];
  const max = Math.max(0, ...groups.map((g) => g.length));
  for (let i = 0; i < max; i += 1) {
    for (const group of groups) {
      if (group[i]) out.push(group[i]);
    }
  }
  return out;
})();

/** 科目 → 章 → 专题 的完整有序结构（含待补专题，地图要显示全貌） */
export const SUBJECT_LIST = Object.values(SUBJECTS).map((subject) => {
  const chapters = subject.chapters
    .map((id) => chapterById.get(id))
    .filter(Boolean)
    .map((chapter) => {
      const topics = TOPICS
        .filter((t) => t.chapter === chapter.id)
        .sort((a, b) => a.order - b.order);
      return { ...chapter, topics };
    });
  return { ...subject, chapters };
});

/** 按「科目 → 章 → 专题」排好的全部专题 */
export const ORDERED_TOPICS = SUBJECT_LIST.flatMap((s) => s.chapters.flatMap((c) => c.topics));

export function topicsOfChapter(chapterId) {
  return TOPICS.filter((t) => t.chapter === chapterId).sort((a, b) => a.order - b.order);
}

export function reviewableTopicsOfChapter(chapterId) {
  return topicsOfChapter(chapterId).filter((t) => !t.pending);
}

export function adjacentTopics(topicId) {
  const index = ORDERED_TOPICS.findIndex((t) => t.id === topicId);
  return {
    prev: index > 0 ? ORDERED_TOPICS[index - 1] : null,
    next: index >= 0 && index < ORDERED_TOPICS.length - 1 ? ORDERED_TOPICS[index + 1] : null,
    index,
  };
}

export function subjectOf(chapterId) {
  const chapter = chapterById.get(chapterId);
  return chapter ? SUBJECT_LIST.find((s) => s.id === chapter.subject) || null : null;
}

export function subjectOfTopic(topic) {
  return SUBJECT_LIST.find((s) => s.id === chapterById.get(topic.chapter)?.subject) || null;
}

export function chainsOfSubject(subjectId) {
  return CHAINS.filter((c) => c.subject === subjectId);
}

export function chainsOfTopic(topicId) {
  return CHAINS.filter((c) => c.steps.some((s) => s.topic === topicId));
}
