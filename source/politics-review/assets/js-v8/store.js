/**
 * 本地进度存储 + 间隔复习调度（政治复习台）
 * ------------------------------------------------------------
 * 纯静态页面：进度只存在浏览器 localStorage。
 * 队列只看已经有正文的专题（REVIEWABLE_IDS），待补专题不参与。
 */

import { REVIEWABLE_IDS } from './data/index.js';

const KEY = 'reviewmy.v1';
export const LEVELS = [
  { v: 0, label: '未学' },
  { v: 1, label: '初识' },
  { v: 2, label: '熟悉' },
  { v: 3, label: '掌握' },
  { v: 4, label: '熟练' },
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
      console.warn('[政治] 读取本地进度失败，已使用空进度', err);
      return emptyState();
    }
  }

  save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(this.state));
    } catch (err) {
      console.warn('[政治] 保存进度失败', err);
    }
  }

  get settings() {
    return this.state.settings;
  }

  setSetting(key, value) {
    this.state.settings[key] = value;
    this.save();
  }

  entry(topicId) {
    return this.state.progress[topicId] || null;
  }

  levelOf(topicId) {
    return this.entry(topicId)?.level || 0;
  }

  setLevel(topicId, level) {
    if (!level) {
      delete this.state.progress[topicId];
    } else {
      const prev = this.entry(topicId);
      this.state.progress[topicId] = {
        level,
        due: addDays(today(), INTERVAL[level] || 1),
        last: new Date().toISOString(),
        reps: (prev?.reps || 0) + 1,
        lapses: prev?.lapses || 0,
      };
    }
    this.state.lastTopic = topicId;
    this.save();
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
    return { level, due: this.state.progress[topicId].due, gap };
  }

  touch(day, patch) {
    const h = this.state.history[day] || { reviews: 0 };
    this.state.history[day] = { reviews: (h.reviews || 0) + (patch.reviews || 0) };
  }

  setLastTopic(topicId) {
    if (this.state.lastTopic === topicId) return;
    this.state.lastTopic = topicId;
    this.save();
  }

  dueTopics() {
    const t = today();
    return REVIEWABLE_IDS
      .filter((id) => {
        const p = this.state.progress[id];
        return p && p.level > 0 && p.due && p.due <= t;
      })
      .sort((a, b) => (this.state.progress[a].due || '').localeCompare(this.state.progress[b].due || ''));
  }

  newTopics(limit = 3) {
    return REVIEWABLE_IDS.filter((id) => !this.state.progress[id]).slice(0, limit);
  }

  /** 今日队列：到期优先，不足的用没学过的专题补齐 */
  dailyQueue(limit = 8) {
    const due = this.dueTopics().map((id) => ({ id, kind: 'due' }));
    const fresh = this.newTopics(limit).map((id) => ({ id, kind: 'new' }));
    return [...due, ...fresh].slice(0, limit);
  }

  todayCount() {
    return this.state.history[today()] || { reviews: 0 };
  }

  reset() {
    this.state = emptyState();
    this.save();
  }
}
