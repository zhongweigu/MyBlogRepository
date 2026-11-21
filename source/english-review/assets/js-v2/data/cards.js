// 每日复习卡：从模板组、语料、应用文自动派生
import { RECITE_GROUPS } from "./recite-groups.js";
import { LETTER_TPL } from "./letter-templates.js";
import { LETTERS } from "./letters.js";
import { CORPUS } from "./corpus.js";

const SLOT = {
  behavior: "个人行为",
  outcome: "个人成果",
  field: "政策领域",
  capacity: "政策能力",
  effect: "社会效果",
  strategy: "相关战略",
  change: "社会变化",
};

const cards = [];
let n = 0;
const add = (tag, front, items, hint, source) => {
  if (!items.length) return;
  n += 1;
  cards.push({ id: `c${String(n).padStart(4, "0")}`, tag, front, items, hint, source });
};
const chunk = (list, size) => {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
};

// 模板：每个子类按 5 句一张卡
RECITE_GROUPS.forEach((g) => {
  g.sections.forEach((s) => {
    chunk(s.items || [], 5).forEach((items, i) => {
      add(
        `模板 · ${g.name}`,
        `${g.no}、${s.name}${i > 0 ? `（第 ${i + 1} 组）` : ""}`,
        items.map((x) => ({ en: x.en, zh: x.zh })),
        s.hint,
        "背诵模板",
      );
    });
  });
});

// 语料：每个槽位 5–8 条一张卡
CORPUS.forEach((v) => {
  Object.keys(SLOT).forEach((slot) => {
    const list = (v.slots[slot] || []).map((it) => {
      if (slot === "strategy") return { en: it.en, zh: it.zh };
      return { en: it[0], zh: it[1] };
    });
    chunk(list, 6).forEach((items, i) => {
      add(
        `语料 · ${v.name}`,
        `${v.name} · ${SLOT[slot]}${i > 0 ? `（第 ${i + 1} 组）` : ""}`,
        items,
        v.exams,
        "语料库",
      );
    });
  });
});

// 应用文：每类一张卡，取开头/主体/结尾各 1–2 句
LETTERS.forEach((l) => {
  const t = LETTER_TPL[l.id];
  if (!t) return;
  const items = [
    ...(t.opening || []).slice(0, 2),
    ...(t.body || []).slice(0, 2),
    ...(t.closing || []).slice(0, 2),
  ].map((x) => ({ en: x.en, zh: x.zh }));
  add(`小作文 · ${l.name}`, `${l.name}：开头 / 主体 / 结尾`, items, l.tone, "小作文模板");
});

export const CARDS = cards;
