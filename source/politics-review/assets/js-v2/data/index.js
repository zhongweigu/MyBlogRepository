import { META, SUBJECTS, CHAPTERS, CHAINS } from './meta.js';
import { CORE_TOPICS } from './topics-core.js';
import { PENDING_TOPICS } from './topics-pending.js';

export { META, SUBJECTS, CHAPTERS, CHAINS };

export const TOPICS = [...CORE_TOPICS, ...PENDING_TOPICS].sort((a, b) => a.order - b.order);

export const topicById = new Map(TOPICS.map((t) => [t.id, t]));
export const chapterById = new Map(CHAPTERS.map((c) => [c.id, c]));
export const subjectById = new Map(Object.values(SUBJECTS).map((s) => [s.id, s]));

/** 已经有正文的专题：每日队列、进度统计、术语抽取只看这些 */
export const REVIEWABLE_TOPICS = TOPICS.filter((t) => !t.pending);
export const REVIEWABLE_IDS = REVIEWABLE_TOPICS.map((t) => t.id);

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
