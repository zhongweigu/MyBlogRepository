import { META, SUBJECTS, CHAPTERS, CHAINS } from './meta.js';
import { DS_TOPICS } from './ds.js';
import { COA_TOPICS } from './coa.js';
import { OS_TOPICS } from './os.js';
import { DS_EXTRA_TOPICS } from './ds-extra.js';
import { COA_EXTRA_TOPICS } from './coa-extra.js';
import { DS_SUPPLEMENTS } from './supplements-ds.js';
import { COA_SUPPLEMENTS } from './supplements-coa.js';
import { QUESTIONS as CURATED_QUESTIONS } from './questions.js';
import { EXTRA_QUESTIONS } from './questions-extra.js';
import { MANUAL_EXTRA_QUESTIONS } from './questions-manual-extra.js';

export { META, SUBJECTS, CHAPTERS, CHAINS };

const SUPPLEMENTS = { ...DS_SUPPLEMENTS, ...COA_SUPPLEMENTS };

function mergeTopic(base, extra) {
  if (!extra) return base;
  const hidden = new Set(extra.hidePoints || []);
  return {
    ...base,
    ...extra,
    exam: { ...(base.exam || {}), ...(extra.exam || {}) },
    points: [
      ...(base.points || []).filter((p) => !hidden.has(p.t)),
      ...(extra.points || []),
    ],
    pitfalls: [...(base.pitfalls || []), ...(extra.pitfalls || [])],
    links: [...(base.links || []), ...(extra.links || [])],
    questions: [...new Set([...(base.questions || []), ...(extra.questions || [])])],
    tables: [...(base.tables || []), ...(extra.tables || [])],
    figures: [...(base.figures || []), ...(extra.figures || [])],
  };
}

export const TOPICS = [...DS_TOPICS, ...DS_EXTRA_TOPICS, ...COA_TOPICS, ...COA_EXTRA_TOPICS, ...OS_TOPICS]
  .map((t) => mergeTopic(t, SUPPLEMENTS[t.id]));

export const topicById = new Map(TOPICS.map((t) => [t.id, t]));
export const chapterById = new Map(CHAPTERS.map((c) => [c.id, c]));
export const subjectById = new Map(Object.values(SUBJECTS).map((s) => [s.id, s]));

function questionFingerprint(q) {
  const text = String(q.stem || '')
    .replace(/<[^>]+>/g, '')
    .replace(/【20\d{2}】/g, '')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, '')
    .slice(0, 64);
  return `${q.year || ''}|${q.subject || ''}|${text}`;
}

// 手写题优先；自动抽取只补手写题没覆盖到的。按题干前 64 字去重。
const seenQuestions = new Set();
export const QUESTIONS = [...CURATED_QUESTIONS, ...EXTRA_QUESTIONS, ...MANUAL_EXTRA_QUESTIONS].filter((q) => {
  const key = questionFingerprint(q);
  if (seenQuestions.has(key)) return false;
  seenQuestions.add(key);
  return true;
});

// 把自动题挂回 topic，考点页和真题页共用同一份列表。
for (const question of QUESTIONS) {
  for (const topicId of question.topics || []) {
    const topic = topicById.get(topicId);
    if (!topic) continue;
    topic.questions = [...new Set([...(topic.questions || []), question.id])];
  }
}

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
