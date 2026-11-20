/**
 * 学习卡文案：先回忆的问题、背诵清单的公共生成逻辑。
 * 不追求每个考点一套完全不同的模板，而是保证问题覆盖“包括什么 / 步骤 / 公式 / 易错”。
 */

export function recallPrompts(topic) {
  const points = topic.points || [];
  const count = Math.max(points.length, 1);
  const isOs = String(topic.chapter || '').startsWith('os-');
  const prompts = [
    topic.recall,
    `「${topic.title}」包括哪些核心内容？先不看笔记，至少说出 ${Math.min(count, 6)} 个关键词。`,
    `这些内容之间的顺序 / 判定步骤是什么？如果题目要求“一步步做”，第一步和最后一步分别是什么？`,
    isOs
      ? `这一节的关键判断条件、状态切换路径或对比关系是什么？换一个场景还成立吗？`
      : `涉及哪些公式、复杂度、位数或计算公式？把每个量代表什么都交代清楚。`,
    topic.pitfalls?.length
      ? `最容易错的地方是什么？至少说出一条“看起来对、其实是坑”的说法。`
      : `如果题目换一个问法，你还能从哪几个角度回答？`,
  ].filter(Boolean);
  return [...new Set(prompts)].slice(0, 4);
}

export function recitePoints(topic) {
  return (topic.points || []).map((point) => ({
    title: point.t,
    lead: point.lead,
  }));
}

export function quickFacts(topic) {
  const facts = [];
  facts.push({ label: '一句话', value: topic.takeaway });
  if (topic.exam?.types?.length) facts.push({ label: '题型', value: topic.exam.types.join(' / ') });
  if (topic.exam?.years?.length) facts.push({ label: '年份', value: topic.exam.years.join(' / ') });
  return facts;
}
