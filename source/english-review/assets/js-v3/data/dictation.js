// 默写题库：从背诵模板、应用文模板、语料库自动派生
import { RECITE_GROUPS } from "./recite-groups.js";
import { LETTER_TPL } from "./letter-templates.js";
import { LETTERS } from "./letters.js";
import { CORPUS, EXTRA_CORPUS } from "./corpus.js";

const SLOT_NAME = {
  behavior: "个人行为",
  outcome: "个人成果",
  field: "政策领域",
  capacity: "政策能力",
  effect: "社会效果",
  strategy: "相关战略",
  change: "社会变化",
};

const items = [];
const push = (item) => items.push(item);

// 一、背诵模板六类
RECITE_GROUPS.forEach((group) => {
  group.sections.forEach((section) => {
    section.items.forEach((item, i) => {
      push({
        id: `tpl:${group.id}:${section.id}:${i}`,
        scope: `tpl:${group.id}`,
        scopeName: group.name,
        label: `${group.name} · ${section.name}`,
        zh: item.zh,
        en: item.en,
        note: item.use || "",
      });
    });
  });
});

// 二、应用文模板
LETTERS.forEach((letter) => {
  const tpl = LETTER_TPL[letter.id];
  if (!tpl) return;
  [["opening", "开头"], ["body", "主体"], ["closing", "结尾"]].forEach(([key, name]) => {
    (tpl[key] || []).forEach((item, i) => {
      push({
        id: `letter:${letter.id}:${key}:${i}`,
        scope: "letters",
        scopeName: "应用文",
        label: `应用文 · ${letter.name} · ${name}`,
        zh: item.zh,
        en: item.en,
        note: item.use || letter.use,
      });
    });
  });
});

// 三、语料七类 + 选背
CORPUS.forEach((value) => {
  Object.keys(SLOT_NAME).forEach((slot) => {
    const list = value.slots[slot] || [];
    list.forEach((entry, i) => {
      if (slot === "strategy") {
        push({
          id: `corpus:${value.id}:${slot}:${i}`,
          scope: `corpus:${value.id}`,
          scopeName: `语料 · ${value.name}`,
          label: `语料 · ${value.name} · ${SLOT_NAME[slot]}`,
          zh: entry.zh,
          en: entry.en,
          note: value.name,
        });
        (entry.subs || []).forEach(([zh, en], j) => {
          push({
            id: `corpus:${value.id}:${slot}:${i}:sub${j}`,
            scope: `corpus:${value.id}`,
            scopeName: `语料 · ${value.name}`,
            label: `语料 · ${value.name} · ${SLOT_NAME[slot]}`,
            zh,
            en,
            note: entry.zh,
          });
        });
      } else {
        push({
          id: `corpus:${value.id}:${slot}:${i}`,
          scope: `corpus:${value.id}`,
          scopeName: `语料 · ${value.name}`,
          label: `语料 · ${value.name} · ${SLOT_NAME[slot]}`,
          zh: entry[1],
          en: entry[0],
          note: value.name,
        });
      }
    });
  });
});

EXTRA_CORPUS.forEach(([en, zh], i) => {
  push({
    id: `corpus:extra:${i}`,
    scope: "corpus:extra",
    scopeName: "语料 · 选背",
    label: "语料 · 选背 · 总论",
    zh,
    en,
    note: "原 PDF 末尾单列",
  });
});

export const DICTATION_ITEMS = items;

export const DICTATION_SCOPES = [
  { value: "all", label: `全部（${items.length} 条）` },
  {
    label: "背诵 · 六类",
    options: RECITE_GROUPS.map((g) => ({
      value: `tpl:${g.id}`,
      label: `${g.no}、${g.name}`,
    })),
  },
  { value: "letters", label: "背诵 · 应用文（13 类）" },
  {
    label: "语料 · 七类",
    options: CORPUS.map((v) => ({
      value: `corpus:${v.id}`,
      label: `语料 · ${v.name}`,
    })),
  },
  { value: "corpus:extra", label: "语料 · 选背" },
];

const VALID = new Set([
  "all",
  "letters",
  "corpus:extra",
  ...RECITE_GROUPS.map((g) => `tpl:${g.id}`),
  ...CORPUS.map((v) => `corpus:${v.id}`),
]);

export function normalizeScope(scope) {
  return VALID.has(scope) ? scope : "all";
}

export function itemsForScope(scope) {
  const s = normalizeScope(scope);
  return s === "all" ? items.slice() : items.filter((x) => x.scope === s);
}

export function scopeLabel(scope) {
  const s = normalizeScope(scope);
  if (s === "all") return "全部";
  if (s === "letters") return "应用文";
  for (const group of DICTATION_SCOPES) {
    if (group.value === s) return group.label;
    const hit = (group.options || []).find((o) => o.value === s);
    if (hit) return hit.label;
  }
  return "全部";
}
