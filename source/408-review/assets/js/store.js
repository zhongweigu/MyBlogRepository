/**
 * 本地进度存储 + 间隔复习调度
 * ------------------------------------------------------------
 * 纯静态页面，没有后端：所有进度存在 localStorage。
 * 换浏览器 / 清缓存会丢，手册页提供导出与导入。
 */

const KEY = 'review408.v1';

import { ORDERED_TOPICS } from './data/index.js';
const ORDERED_TOPIC_IDS = ORDERED_TOPICS.map((t) => t.id);

export const LEVELS = [
  { v: 0, label: '未学', short: '未学' },
  { v: 1, label: '初识', short: '初识' },
  { v: 2, label: '熟悉', short: '熟悉' },
  { v: 3, label: '掌握', short: '掌握' },
  { v: 4, label: '熟练', short: '熟练' },
];

const INTERVAL = { 1: 1, 2: 3, 3: 7, 4: 15 };

export function dateKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseDate(key) {
  return new Date(`${key}T00:00:00`);
}

export function addDays(key, n) {
  const d = parseDate(key);
  d.setDate(d.getDate() + n);
  return dateKey(d);
}

export function diffDays(from, to) {
  return Math.round((parseDate(to) - parseDate(from)) / 86400000);
}

export function today() {
  return dateKey(new Date());
}

function emptyState() {
  return {
    version: 1,
    progress: {},
    history: {},
    lastTopic: null,
    settings: { theme: null, countdown: true },
  };
}

export class Store {
  constructor() {
    this.state = this.load();
    this.listeners = new Set();
  }

  load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return emptyState();
      const parsed = JSON.parse(raw);
      return {
        ...emptyState(),
        ...parsed,
        progress: parsed.progress || {},
        history: parsed.history || {},
        settings: { ...emptyState().settings, ...(parsed.settings || {}) },
      };
    } catch (err) {
      console.warn('[408] 读取本地进度失败，已使用空进度', err);
      return emptyState();
    }
  }

  save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(this.state));
    } catch (err) {
      console.warn('[408] 保存进度失败', err);
    }
  }

  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  emit() {
    this.listeners.forEach((fn) => fn(this.state));
  }

  get settings() {
    return this.state.settings;
  }

  setSetting(key, value) {
    this.state.settings[key] = value;
    this.save();
    this.emit();
  }

  entry(topicId) {
    return this.state.progress[topicId] || null;
  }

  levelOf(topicId) {
    return this.entry(topicId)?.level || 0;
  }

  setLevel(topicId, level, { silent = false } = {}) {
    const t = today();
    if (!level) {
      delete this.state.progress[topicId];
    } else {
      const prev = this.entry(topicId);
      this.state.progress[topicId] = {
        level,
        due: addDays(t, INTERVAL[level] || 1),
        last: new Date().toISOString(),
        reps: (prev?.reps || 0) + 1,
        lapses: prev?.lapses || 0,
      };
    }
    this.state.lastTopic = topicId;
    this.save();
    if (!silent) this.emit();
  }

  /** 回忆模式评分：forgot / fuzzy / known / easy */
  rate(topicId, rating) {
    const cur = this.levelOf(topicId);
    let level;
    let gap;
    if (rating === 'forgot') {
      level = 1;
      gap = 1;
    } else if (rating === 'fuzzy') {
      level = Math.max(1, Math.min(cur || 1, 2));
      gap = 1;
    } else if (rating === 'known') {
      level = Math.min(4, Math.max(2, cur + 1));
      gap = level >= 3 ? 7 : 3;
    } else {
      level = Math.min(4, Math.max(3, cur + 2));
      gap = level >= 4 ? 15 : 7;
    }
    const prev = this.entry(topicId);
    this.state.progress[topicId] = {
      level,
      due: addDays(today(), gap),
      last: new Date().toISOString(),
      reps: (prev?.reps || 0) + 1,
      lapses: (prev?.lapses || 0) + (rating === 'forgot' ? 1 : 0),
    };
    this.state.lastTopic = topicId;
    this.touch(today(), { reviews: 1 });
    this.save();
    this.emit();
    return { level, due: this.state.progress[topicId].due, gap };
  }

  touch(day, patch) {
    const h = this.state.history[day] || { reviews: 0, questions: 0 };
    this.state.history[day] = {
      reviews: (h.reviews || 0) + (patch.reviews || 0),
      questions: (h.questions || 0) + (patch.questions || 0),
    };
  }

  markQuestionSeen() {
    this.touch(today(), { questions: 1 });
    this.save();
    this.emit();
  }

  setLastTopic(topicId) {
    if (this.state.lastTopic === topicId) return;
    this.state.lastTopic = topicId;
    this.save();
  }

  dueTopics() {
    const t = today();
    return Object.entries(this.state.progress)
      .filter(([, p]) => p.level > 0 && p.due && p.due <= t)
      .sort((a, b) => (a[1].due || '').localeCompare(b[1].due || ''))
      .map(([id]) => id);
  }

  newTopics(limit = 3) {
    return ORDERED_TOPIC_IDS.filter((id) => !this.state.progress[id]).slice(0, limit);
  }

  /** 今日队列：先清到期，再补新考点 */
  queue({ dueLimit = 5, newLimit = 3 } = {}) {
    const due = this.dueTopics().slice(0, dueLimit).map((id) => ({ id, kind: 'due' }));
    const fresh = this.newTopics(newLimit).map((id) => ({ id, kind: 'new' }));
    return [...due, ...fresh];
  }

  streak() {
    let cursor = today();
    const active = (key) => (this.state.history[key]?.reviews || 0) + (this.state.history[key]?.questions || 0) > 0;
    if (!active(cursor)) cursor = addDays(cursor, -1);
    let n = 0;
    while (active(cursor)) {
      n += 1;
      cursor = addDays(cursor, -1);
    }
    return n;
  }

  todayCount() {
    return this.state.history[today()] || { reviews: 0, questions: 0 };
  }

  forecast(days = 7) {
    const out = [];
    for (let i = 0; i < days; i += 1) {
      const key = addDays(today(), i);
      const count = Object.values(this.state.progress).filter((p) => p.due === key).length;
      out.push({ date: key, count });
    }
    return out;
  }

  heatmap(weeks = 10) {
    const out = [];
    const end = parseDate(today());
    // 以“本周日”为最后一格，保证每一列都是周一到周日
    const day = end.getDay() === 0 ? 7 : end.getDay();
    const sunday = new Date(end);
    sunday.setDate(end.getDate() + ((7 - day) % 7));
    for (let i = weeks * 7 - 1; i >= 0; i -= 1) {
      const d = new Date(sunday);
      d.setDate(sunday.getDate() - i);
      const key = dateKey(d);
      const h = this.state.history[key] || { reviews: 0, questions: 0 };
      out.push({ date: key, reviews: h.reviews || 0, questions: h.questions || 0, weekday: d.getDay() });
    }
    return out;
  }

  exportData() {
    return JSON.stringify(this.state, null, 2);
  }

  importData(text) {
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== 'object' || typeof parsed.progress !== 'object') {
      throw new Error('格式不正确：缺少 progress 字段');
    }
    this.state = {
      ...emptyState(),
      ...parsed,
      progress: parsed.progress || {},
      history: parsed.history || {},
      settings: { ...emptyState().settings, ...(parsed.settings || {}) },
    };
    this.save();
    this.emit();
  }

  reset() {
    this.state = emptyState();
    this.save();
    this.emit();
  }
}
