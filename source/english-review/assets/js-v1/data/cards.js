// 每日复习卡：由语料库、模板、小作文、句型与策略自动派生 + 手工策略卡
// 卡片只用于「今日」滚动复习，不做掌握度记录。

import { CORPUS, THEME_MAP } from "./corpus.js";
import { BIG_VERSIONS } from "./templates.js";
import { LETTERS } from "./letters.js";
import { CONNECTORS, CHINGLISH, FUNCTIONS } from "./expressions.js";

const SLOT_LABEL = {
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
const push = (tag, front, back, hint, source) => {
  n += 1;
  cards.push({ id: `c${String(n).padStart(3, "0")}`, tag, front, back, hint, source });
};

// 1. 语料：中 → 英
CORPUS.forEach((v) => {
  Object.keys(SLOT_LABEL).forEach((slot) => {
    const items = v.slots[slot] || [];
    items.forEach((item, i) => {
      if (slot === "strategy") {
        push(
          `语料·${v.name}·${SLOT_LABEL[slot]}`,
          `「${item.zh}」的政策英文是？`,
          `<span class="en">${item.en}</span>`,
          v.exams,
          `${v.name}类【相关战略】`,
        );
        (item.subs || []).forEach(([zh, en]) => {
          push(
            `语料·${v.name}·${SLOT_LABEL[slot]}`,
            `「${zh}」的英文是？`,
            `<span class="en">${en}</span>`,
            `属于「${item.zh}」`,
            `${v.name}类【相关战略】子项`,
          );
        });
      } else {
        const [en, zh] = item;
        push(
          `语料·${v.name}·${SLOT_LABEL[slot]}`,
          `「${zh}」用英语怎么写？（${SLOT_LABEL[slot]}）`,
          `<span class="en">${en}</span>`,
          `真题覆盖：${v.exams}`,
          `${v.name}类【${SLOT_LABEL[slot]}】`,
        );
      }
    });
  });
});

// 2. 模板句：给中文/给功能，写英文
const TPL_CARDS = [
  ["大作文·第一段", "图画作文的万能起手句（含“看似简单却寓意深刻”）", "Though deceptively simple, this scene conveys a meaningful message: 【图画描述】. It serves as a compelling testament to the significance of 【主题词】.", "满分/简化/速通三版共用", "模版部分 p.3"],
  ["大作文·第二段", "第二段的五句顺序是什么？", "①主题总起（has attracted attention…）→ ②个人行为与成果 → ③政策领域与能力 → ④社会效果 → ⑤相关战略与社会变化。", "顺序不能换；换了就是层级混乱", "模版使用说明 p.10"],
  ["大作文·第二段", "把“个人层面”接到“社会层面”的那句英文", "Beyond personal advancement, this principle can strengthen communities by 【社会效果】, laying the groundwork for sustainable progress.", "beyond 是上升信号词", "模版部分 p.4"],
  ["大作文·第三段", "结尾固定句（三版共用）", "In conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when 【主题词】 guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.", "只换主题词", "模版部分 p.4"],
  ["大作文·动态图", "动态图三句：起始、对比、稳定", "Between 【起始】 and 【终止】, the number/proportion of 【类别一】 rose/fell from about 【数据1】 to around 【数据2】, while that of 【类别二】 increased/decreased slightly/sharply from roughly 【数据3】 to approximately 【数据4】. By contrast, the figure for 【类别三】 remained broadly stable at around 【数据5】.", "没有稳定项就删最后一句，改为 also rose", "模版使用说明 p.6"],
  ["大作文·静态图", "静态图最高项 + 其余项的句架", "【类别一】 accounts for the largest share, at 【最大比例】, followed by 【类别二】, 【类别三】 and 【类别四】 at 【第二比例】, 【第三比例】 and 【第四比例】 respectively.", "多选调查改 has the highest percentage", "模版使用说明 p.7"],
  ["大作文·速通", "速通版第③句（固定，承上启下）", "However, we should recognise that social conditions fundamentally shape the choices available to individuals.", "从个人动机转向社会条件", "模版部分 p.6"],
  ["大作文·速通", "速通版第⑤句的两个版本", "A study / An article published by 【权威机构／期刊】 lends support to the view that 【主题词】 plays an important role in driving this trend / fostering community prosperity. ／ …that societies placing greater emphasis on 【主题词】 enjoy higher levels of vitality and prosperity, a pattern consistent across multiple indicators.", "机构要有实体，不能编", "模版使用说明 p.13"],
];
TPL_CARDS.forEach(([tag, front, back, hint, source]) => push(tag, front, back, hint, source));

// 3. 小作文：任务 → 英文要点
LETTERS.forEach((l) => {
  push(
    `小作文·${l.name}`,
    `${l.name}：题目要求通常包含哪几个内容要点？`,
    l.tasks.map((t, i) => `${i + 1}. ${t}`).join("<br>"),
    `语气：${l.tone}`,
    "扩充（依据 A 节大纲）",
  );
  push(
    `小作文·${l.name}`,
    `${l.name}：开头目的句（写出一句）`,
    `<span class="en">${l.opening[0].en}</span><br><span class="muted">${l.opening[0].zh}</span>`,
    "开头只写一次目的，第二段不要再写 I am writing to…",
    "扩充",
  );
});

// 4. 连接与句型
Object.entries(CONNECTORS).forEach(([group, list]) => {
  const gname = { cause: "原因", result: "结果", contrast: "转折/对比", addition: "递进", concession: "让步", comparison: "比较", sequence: "顺序", emphasis: "强调" }[group];
  list.slice(0, 3).forEach(([en, zh, note]) => {
    push(`连接·${gname}`, `「${zh}」的连接表达（写出一个）`, `<span class="en">${en}</span>`, note, "扩充");
  });
});

FUNCTIONS.slice(0, 6).forEach((f) => {
  push(`句型·${f.name}`, `${f.name}：写出一句可迁移句型`, `<span class="en">${f.patterns[0][0]}</span><br><span class="muted">${f.patterns[0][1]}</span>`, "注意填空处的词性", "扩充");
});

CHINGLISH.slice(0, 8).forEach(([bad, good, note]) => {
  push("避坑·中式英语", `这句有什么问题：${bad}`, `<span class="en">${good}</span><br><span class="muted">${note}</span>`, "先判断搭配，再改", "扩充");
});

// 5. 策略卡
const STRATEGY_CARDS = [
  ["策略·大纲", "英语一写作 B 节字数与分值", "160–200 词（标点不计），20 分；A 节约 100 词，10 分。", "大纲原文", "模版使用说明 p.16"],
  ["策略·评分", "评分时先定什么，再给分？", "先根据文章的内容和语言确定其所属档次，然后按该档次的要求来给分。", "所以“内容+语言”决定档位", "模版使用说明 p.17"],
  ["策略·评分", "书写差会怎样？", "如书写较差，以致影响读者理解，将分数降低一个档次。", "卷面是硬指标", "模版使用说明 p.17"],
  ["策略·评分", "B 节第五档的要求", "很好地完成试题规定的任务：包含并有效阐述所有内容要点；使用丰富的语法结构和词汇；语法结构和词汇准确，错误极少；有效使用多种衔接手段，内容连贯、流畅，层次清晰；文体格式和语体恰当贴切。", "17–20 分", "模版使用说明 p.17"],
  ["策略·命题", "教育部对 2023 英语一图画（龙舟）的定性", "新时代乡村振兴特别是乡村文化振兴。", "只写“传统文化”偏低", "官方试题分析截图（p.19）"],
  ["策略·命题", "教育部对 2024 英语一（公园+柱状图）的定性", "建设宜居城市、增进民生福祉。", "只写环保/健身偏低", "官方试题分析截图（p.20）"],
  ["策略·命题", "教育部对 2025 英语一（表格）的定性", "新时代人民群众消费水平的稳步提升和民生福祉的持续增进。", "不是“家电变多”", "官方试题分析截图（p.21）"],
  ["策略·立意", "无论材料是正面、负面还是利弊兼有，主题词应怎么写？", "都从正面积极方向思考，主题词写正确合理的做法。", "负面材料 = 命题人希望我们不要这样做", "模版使用说明 p.3"],
  ["策略·立意", "图画/图表/文本混合时，要写几个主题？", "一个。多份材料要么都是表面现象，要么一份是现象一份是本质；分开写两个主题就上当了。", "每份材料各写一句，合并到一个主题词", "模版使用说明 p.4"],
  ["策略·结构", "大作文三段的职能", "第一段：描述材料 + 引出主题；第二段：个人 → 社会/国家，论证好处；第三段：总结 + 倡导/展望。", "总分总，不要写成四段", "模版使用说明 p.30"],
  ["策略·套用", "模板里哪些必须改，哪些不能改？", "必须改：材料描述、主题词、7 个语料槽；不能改：五句顺序、固定句骨架、衔接词。", "改骨架最容易出语法错", "模版使用说明 p.13"],
  ["策略·套用", "什么时候不能用宏大叙事？", "题目明确限定在个人生活细节、且材料没有公共指向时，向下细化主题词（如 self-discipline），不要硬拔到国家战略。", "2020 就是典型", "整理"],
  ["策略·考场", "大作文时间怎么分？", "审题 3 分钟 → 写第一段 6 分钟 → 第二段 10 分钟 → 第三段 4 分钟 → 检查 4 分钟，合计约 27 分钟。", "给检查留时间", "扩充"],
  ["策略·考场", "写到多少词、一行写多少词？", "180–220 词；0.5 笔一行 9–15 词，写满卷面。", "太少显空，太多易错", "模版使用说明 p.31"],
  ["策略·小作文", "A 节评分重点", "内容要点的覆盖、文章的组织连贯性、语言的准确性、文体格式和语体的恰当性。", "漏点=掉档", "模版使用说明 p.17"],
  ["策略·小作文", "通知的格式", "正文上方居中 NOTICE；正文写事由、时间地点、参与方式；右下角落款单位与日期；不用 Dear…/Yours…", "告示同理", "扩充"],
  ["策略·小作文", "纪要必须有的要素", "标题、时间、地点、出席人、讨论要点、形成的决定、记录人与日期。", "过去时为主", "扩充"],
  ["策略·论证", "“实证”在作文里怎么体现？", "引用有实体的来源：机构（Peking University / WHO）、期刊（The Economist / Nature）、政策文本（national strategies for…），并点出结论。", "不要编名人名言", "模版使用说明 p.30"],
  ["策略·论证", "“思辨”在作文里怎么体现？", "从个人实践上升到社会实践：先写个人行为与成果，再写社会效果与战略，最后下结论。", "这正是模板第二段的骨架", "模版使用说明 p.30"],
];
STRATEGY_CARDS.forEach(([tag, front, back, hint, source]) => push(tag, front, back, hint, source));

// 6. 主题词决策
THEME_MAP.forEach((t) => {
  push(
    "真题·主题词",
    `${t.year} 英语一（${t.topic}）的主题词是什么？`,
    `<span class="en">${t.theme}</span>（${t.themeZh}）<br><span class="muted">退路：${t.fallback}</span>`,
    t.note,
    "套写实操 PDF",
  );
});

export const CARDS = cards;
export const CARD_TAGS = Array.from(new Set(cards.map((c) => c.tag.split("·")[0])));
