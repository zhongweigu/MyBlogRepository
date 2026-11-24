import { GROUP as G1 } from "./g1-start.js";
import { GROUP as G2 } from "./g2-picture.js";
import { GROUP as G3 } from "./g3-chart.js";
import { GROUP as G4 } from "./g4-analysis.js";
import { LETTER_TPL } from "./letter-templates.js";

const pick = (prefix) => G4.sections.filter((s) => s.id.startsWith(prefix));

// 二、描述内容：图画 + 图表/文字合并为一组，避免两个“二”
const DESCRIPTION = {
  id: "description",
  no: "二",
  name: "描述内容",
  note: "看到什么写什么：先人物/方位/动作，再数据/趋势/占比；一句一行，不写成整段。",
  sections: [...G2.sections, ...G3.sections],
};

const MEANING = {
  id: "meaning",
  no: "三",
  name: "寓意主题",
  note: "描述之后必须抬到主题词；图画提炼品质，图表提炼趋势，文字提炼主张。",
  sections: pick("meaning-"),
};

const ANALYSIS = {
  id: "analysis",
  no: "四",
  name: "分析论证",
  note: "按“个人 → 社会 → 政策”上升；原因、影响、对比让步按题目选一层展开。",
  sections: pick("analysis-"),
};

const ENDING = {
  id: "ending",
  no: "五",
  name: "结尾",
  note: "结尾只回扣主题，不再举例、不再加新数据；4–5 句够用。",
  sections: pick("ending-"),
};

const LINK = {
  id: "link",
  no: "六",
  name: "衔接",
  note: "段内递进、段间过渡、图表→原因、图画→寓意、材料→观点；短句为主。",
  sections: pick("link-"),
};

export const RECITE_GROUPS = [G1, DESCRIPTION, MEANING, ANALYSIS, ENDING, LINK];
export { LETTER_TPL };

export const RECITE_COUNT = RECITE_GROUPS.reduce(
  (n, g) => n + g.sections.reduce((m, s) => m + s.items.length, 0),
  0,
);
