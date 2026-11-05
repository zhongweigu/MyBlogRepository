import { META, SUBJECTS, CHAPTERS, CHAINS } from './meta.js';
import { DS_TOPICS } from './ds.js';
import { COA_TOPICS } from './coa.js';
import { QUESTIONS } from './questions.js';

export { META, SUBJECTS, CHAPTERS, CHAINS, QUESTIONS };

export const TOPICS = [...DS_TOPICS, ...COA_TOPICS];

export const topicById = new Map(TOPICS.map((t) => [t.id, t]));
export const chapterById = new Map(CHAPTERS.map((c) => [c.id, c]));
export const subjectById = new Map(Object.values(SUBJECTS).map((s) => [s.id, s]));
export const questionById = new Map(QUESTIONS.map((q) => [q.id, q]));

/** 科目 → 章节 → 考点 的完整有序结构 */
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

export const CHAPTER_ORDER = SUBJECT_LIST.flatMap((s) => s.chapters.map((c) => c.id));

/** 按“科目 → 章节 → 章内序号”排好的考点 */
export const ORDERED_TOPICS = SUBJECT_LIST.flatMap((s) => s.chapters.flatMap((c) => c.topics));

export function topicsOfChapter(chapterId) {
  const chapter = chapterById.get(chapterId);
  if (!chapter) return [];
  return TOPICS.filter((t) => t.chapter === chapterId).sort((a, b) => a.order - b.order);
}

export function questionsOfChapter(chapterId) {
  return QUESTIONS.filter((q) => q.chapter === chapterId);
}

export function questionsOfTopic(topicId) {
  return QUESTIONS.filter((q) => q.topics.includes(topicId));
}

export function chaptersOfSubject(subjectId) {
  const subject = SUBJECT_LIST.find((s) => s.id === subjectId);
  return subject ? subject.chapters : [];
}

export function chainsOfSubject(subjectId) {
  return CHAINS.filter((c) => c.subject === subjectId || (subjectId === 'cross' && c.subject === 'cross'));
}

export function chainsOfTopic(topicId) {
  return CHAINS.filter((c) => c.steps.some((s) => s.topic === topicId));
}

export function adjacentTopics(topicId) {
  const index = ORDERED_TOPICS.findIndex((t) => t.id === topicId);
  return {
    prev: index > 0 ? ORDERED_TOPICS[index - 1] : null,
    next: index >= 0 && index < ORDERED_TOPICS.length - 1 ? ORDERED_TOPICS[index + 1] : null,
    index,
  };
}

export function subjectOfTopic(topic) {
  return SUBJECT_LIST.find((s) => s.id === chapterById.get(topic.chapter)?.subject) || null;
}

export function subjectOf(chapterId) {
  const chapter = chapterById.get(chapterId);
  return chapter ? SUBJECT_LIST.find((s) => s.id === chapter.subject) || null : null;
}
