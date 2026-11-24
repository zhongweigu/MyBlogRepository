// 英语复习台 · 站点元信息与资料来源清单
// 来源标记：A = 原始资料原文；B = 由原始资料整理归纳；C = Agent 自主扩充。

export const SITE = {
  title: '英语复习台',
  subtitle: '考研英语一 · 作文',
  desc: '背诵、写作流程、真题套写与策略，一个为考场服务的作文复习台。',
  updated: '2026-11-21',
};

// 七类价值观（与语料库顺序一致）
export const VALUES = [
  { id: 'harmony', name: '和谐', en: 'Harmony', priority: true, hue: 'teal' },
  { id: 'prosperity', name: '富强', en: 'Prosperity', priority: true, hue: 'amber' },
  { id: 'civilization', name: '文明', en: 'Civilization', priority: true, hue: 'indigo' },
  { id: 'dedication', name: '敬业', en: 'Dedication', priority: false, hue: 'green' },
  { id: 'kindness', name: '友善', en: 'Kindness', priority: false, hue: 'teal' },
  { id: 'patriotism', name: '爱国', en: 'Patriotism', priority: false, hue: 'red' },
  { id: 'integrity', name: '诚信', en: 'Integrity', priority: false, hue: 'violet' },
];

// 语料槽位（与模板 9 个空一一对应）
export const SLOTS = [
  { id: 'behavior', name: '个人行为', fill: '【具体行为】', where: 'the way people … / people’s desire to …', form: '动词原形短语' },
  { id: 'outcome', name: '个人成果', fill: '【可见成果】', where: 'ultimately contributing to …', form: '名词 / 动名词短语' },
  { id: 'field', name: '政策领域', fill: '【相关领域】', where: 'National policies on …', form: '名词短语' },
  { id: 'capacity', name: '政策能力', fill: '【个人能力/行为】', where: 'empowering individuals to …', form: '动词原形短语' },
  { id: 'effect', name: '社会效果', fill: '【社会效果】', where: 'strengthen communities by …', form: '动名词短语' },
  { id: 'strategy', name: '相关战略', fill: '【相关战略】', where: 'national strategies for …', form: '名词 / 动名词短语' },
  { id: 'change', name: '社会变化', fill: '【社会变化】', where: 'as this principle takes root, …', form: '完整主谓小句' },
];

// PDF 资料清单（第一阶段：资料盘点）
export const SOURCES = [
  {
    id: 'tpl',
    file: '大作文一页纸（模版部分）.pdf',
    pages: 7,
    category: '作文模板库',
    read: 'full',
    readNote: '7 页文字层全部提取；第 3–7 页为三套模板正文与中文翻译。',
    organized: 'full',
    into: ['大作文模板库 · 满分版 / 简化版 / 速通版', '首页 hero 与今日卡'],
    note: 'PDF 内“满分 / 简化 / 速通”三版模板是整套体系的骨架，已逐句录入并保留中文对照。',
  },
  {
    id: 'use',
    file: '大作文一页纸（模版使用说明部分）.pdf',
    pages: 31,
    category: '模板使用说明',
    read: 'full',
    readNote: '文字层 31 页全部提取；第 16–29 页含教育部《考试分析》《试题评价》截图，另按 120dpi 渲染后逐页人工阅读（OCR 由模型完成），关键段落已摘录。',
    organized: 'full',
    into: ['策略部分 01–04', '模板使用限制'],
    note: '第 30–31 页为“思辨 + 实证”的阅卷取向分析；第 16–17 页为大纲写作要求与评分原则/档次原文截图。',
  },
  {
    id: 'corpus',
    file: '大作文一页纸（语料库部分）.pdf',
    pages: 14,
    category: '作文语料库',
    read: 'full',
    readNote: '14 页文字层全部提取；PDF 为分栏排版，提取后按“价值观 → 槽位”重新归位，条目一条未删。',
    organized: 'full',
    into: ['语料库（七类价值观）', '今日卡', '真题套写填空'],
    note: '第 10–13 页标题与条目在文本层错位（5 友善 / 6 爱国 / 7 诚信），已按语义与原文顺序复原，并保留全部条目。',
  },
  {
    id: 'prac',
    file: '大作文一页纸（套写实操-英一）.pdf',
    pages: 99,
    category: '历年真题套写',
    read: 'full',
    readNote: '99 页文字层全部提取；2026–2020 共 7 年 × 4 个版本（满分 / 简化 / 速通·标准 / 速通·无脑）的范文与中文对照全文录入，审题分析与各版语料来源归入真题页的槽位表。',
    organized: 'full',
    into: ['真题示例（5 篇代表）', '语料槽位来源'],
    note: '每年题目原图已从 PDF 裁切为 PNG，放入 assets/img/exam-<年份>.png。',
  },
];

// 策略文章（长文，正文在 assets/content/str-XX.html）
export const STRATEGY = [
  {
    id: 'str-01',
    no: '01',
    title: '图画：看到什么，套哪句',
    desc: '先看图，再决定描述句、寓意句、分析句。每一步配模板。',
    tags: ['图画', '描述', '寓意'],
    minutes: 8,
  },
  {
    id: 'str-02',
    no: '02',
    title: '图表：先读图，再套句',
    desc: '柱/线/饼/表/组合图的读法；必写数据、趋势句、过渡句。',
    tags: ['图表', '数据', '趋势'],
    minutes: 8,
  },
  {
    id: 'str-03',
    no: '03',
    title: '文字材料：概括，不照抄',
    desc: '抓论点、辨态度、压成一句，再接模板。',
    tags: ['文字材料', '概括', '观点'],
    minutes: 6,
  },
  {
    id: 'str-04',
    no: '04',
    title: '评分与考场：字数、卷面、检查',
    desc: '官方字数与评分要点；40 分钟怎么分；最后检查什么。',
    tags: ['评分', '考场', '检查'],
    minutes: 5,
  },
];

export const NAV = [
  { id: 'today', href: '#/today', label: '今日', icon: 'calendar' },
  { id: 'recite', href: '#/recite', label: '背诵', icon: 'book' },
  { id: 'corpus', href: '#/corpus', label: '语料', icon: 'grid' },
  { id: 'exams', href: '#/exams', label: '真题', icon: 'file' },
  { id: 'strategy', href: '#/strategy', label: '策略', icon: 'map' },
];
