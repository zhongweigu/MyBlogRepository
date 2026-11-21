// 大作文三套模板（满分版 / 简化版 / 速通版）
// 来源 A：大作文一页纸（模版部分）.pdf + 模版使用说明部分.pdf
// 说明：模板正文逐字保留；「使用条件」「填空来源」「限制」为整理归纳（B）。

export const BIG_VERSIONS = [
  {
    id: "full",
    name: "满分版",
    badge: "9 个空",
    words: "190–220",
    subtitle: "个人 → 政策 → 社会 → 战略，四层递进，论据最具体",
    bestFor: "备考时间充足、目标 15+ 分、能背 7 类语料中至少 3 类",
    paragraphs: [
      {
        id: "p1",
        role: "第一段 · 总起 + 材料描述",
        note: "按材料类型选一句起手；图画描述必须自己写，图表按类别与数据填，文本先概括再表态。",
        blocks: [
          {
            label: "图画",
            src: "A",
            en: "Though deceptively simple, this scene conveys a meaningful message: 【图画描述】. It serves as a compelling testament to the significance of 【主题词】.",
            zh: "尽管画面看似简单，却传递出深刻的寓意：【图画描述】。它有力地证明了【主题词】的重要性。",
          },
          {
            label: "图表",
            src: "A",
            en: "The figures in the bar chart/line chart/pie chart/table reveal notable changes/differences concerning 【主题词】.",
            zh: "条形图／折线图／饼图／表格中的数据，揭示了有关【主题词】的显著变化／差异。",
          },
          {
            label: "动态图",
            src: "A",
            en: "Between 【起始时间】 and 【终止时间】, the number/proportion of 【类别一】 rose/fell from about 【数据1】 to around 【数据2】, while that of 【类别二】 increased/decreased slightly/sharply from roughly 【数据3】 to approximately 【数据4】. By contrast, the figure for 【类别三】 remained broadly stable at around 【数据5】.",
            zh: "从【起始时间】到【终止时间】，【类别一】的数量／比例从约【数据1】上升／下降至约【数据2】；【类别二】则从约【数据3】小幅／大幅增加／减少至约【数据4】。相比之下，【类别三】的相应数值保持在约【数据5】，总体稳定。",
          },
          {
            label: "静态图",
            src: "A",
            en: "【类别一】 accounts for the largest share, at 【最大比例】, followed by 【类别二】, 【类别三】 and 【类别四】 at 【第二比例】, 【第三比例】 and 【第四比例】 respectively.",
            zh: "【类别一】占比最高，达到【最大比例】；随后是【类别二】、【类别三】和【类别四】，分别占【第二比例】、【第三比例】和【第四比例】。",
          },
          {
            label: "文本评论",
            src: "A",
            en: "【主题词】 has long been a subject of public debate. The passage offers a fresh perspective on this issue, arguing that 【提炼文段大意】. While this view may not convince everyone, I find it original and illuminating, and I agree with it wholeheartedly.",
            zh: "长期以来，【主题词】一直是公众讨论的议题。上述文段为这一问题提供了新的视角，主张【提炼文段大意】。虽然这一观点未必能说服所有人，但我认为它新颖而富有启发性，并完全赞同。",
          },
        ],
      },
      {
        id: "p2",
        role: "第二段 · 中心段落（五句）",
        note: "①主题总起 ②个人行为+成果 ③政策领域+能力 ④社会效果 ⑤相关战略+社会变化。五句各司其职，不要打乱。",
        blocks: [
          {
            label: "整段",
            src: "A",
            en: "【主题词】 has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people 【具体行为】, ultimately contributing to 【可见成果】. National policies on 【相关领域】 likewise focus on empowering individuals to 【个人能力/行为】. Beyond personal advancement, this principle can strengthen communities by 【社会效果】, laying the groundwork for sustainable progress. This is in line with national strategies for 【相关战略】: as this principle takes root, 【社会变化】.",
            zh: "【主题词】受到关注，一个重要原因是其影响深远。在个人层面，它体现在人们【具体行为】的方式之中，最终有助于【可见成果】。国家在【相关领域】方面的政策，同样着重于使个人能够【个人能力/行为】。除个人发展之外，这一原则还可以通过【社会效果】增强社区，为可持续进步奠定基础。这与国家的【相关战略】相契合：随着这一理念逐渐扎根，【社会变化】。",
          },
        ],
      },
      {
        id: "p3",
        role: "第三段 · 总结",
        note: "固定句，只换主题词。注意：主题词在第一、二、三段必须完全一致。",
        blocks: [
          {
            label: "整段",
            src: "A",
            en: "In conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when 【主题词】 guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
            zh: "总之，人们已经形成一种基于理性认识的共识，即当【主题词】指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
          },
        ],
      },
    ],
    fills: [
      ["1", "图画描述", "自己写", "地点 + 主语 + 定语从句 + 动作 + doing"],
      ["2", "主题词", "7 选 1 或顺藤摸瓜向下细化", "名词短语，第一、二、三段同形"],
      ["3", "具体行为", "语料包「个人行为」", "the way people + 动词原形短语"],
      ["4", "可见成果", "语料包「个人成果」", "contributing to + 名词/动名词"],
      ["5", "相关领域", "语料包「政策领域」", "National policies on + 名词"],
      ["6", "个人能力/行为", "语料包「政策能力」", "empowering individuals to + 动词原形"],
      ["7", "社会效果", "语料包「社会效果」", "by + 动名词短语"],
      ["8", "相关战略", "语料包「相关战略」", "strategies for + 名词/动名词"],
      ["9", "社会变化", "语料包「社会变化」", "as this principle takes root, + 完整小句"],
    ],
    constraints: [
      "五句顺序固定：总起 → 个人 → 政策 → 社会 → 战略。若把「政策」放最后，会显得论证层级混乱。",
      "【可见成果】必须是名词或动名词；写成句子（people become happier）会破坏 ultimately contributing to 的结构。",
      "【社会变化】必须是完整主谓小句，不能只填名词。",
      "主题词过长（超过 6 个词）时，第三段读起来会拖沓，优先选 3–5 个词的短语。",
    ],
  },
  {
    id: "simple",
    name: "简化版",
    badge: "5 个空",
    words: "185–200",
    subtitle: "保留个人/政策/社会三层，成果与能力固定，背诵量减半",
    bestFor: "时间紧、只求稳过 12–14 分、能背 3 类语料的核心词",
    paragraphs: [
      {
        id: "p1",
        role: "第一段 · 与满分版相同",
        note: "图画/图表/文本的起手句完全沿用满分版；图表数据句也相同。",
        blocks: [
          {
            label: "图画",
            src: "A",
            en: "Though deceptively simple, this scene conveys a meaningful message: 【图画描述】. It serves as a compelling testament to the significance of 【主题词】.",
            zh: "尽管画面看似简单，却传递出深刻的寓意：【图画描述】。它有力地证明了【主题词】的重要性。",
          },
        ],
      },
      {
        id: "p2",
        role: "第二段 · 固定五句",
        note: "比满分版少 4 个空：成果固定为 personal development and well-being，能力固定为 achieve their full potential，删去相关战略与社会变化。",
        blocks: [
          {
            label: "整段",
            src: "A",
            en: "【主题词】 has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people 【具体行为】, ultimately contributing to personal development and well-being. National policies on 【相关领域】 likewise focus on empowering individuals to achieve their full potential. Beyond personal advancement, this principle can strengthen communities by 【社会效果】, laying the groundwork for sustainable progress. As this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.",
            zh: "【主题词】受到关注，一个重要原因是其影响深远。在个人层面，它体现在人们【具体行为】的方式之中，最终有助于个人发展与福祉。国家在【相关领域】方面的政策，同样着重于使个人能够充分发挥自身潜能。除个人发展之外，这一原则还可以通过【社会效果】增强社区，为可持续进步奠定基础。随着这一理念在全社会逐渐扎根，它会产生连锁效应，促进社会和谐与长期繁荣。",
          },
        ],
      },
      {
        id: "p3",
        role: "第三段 · 与满分版相同",
        blocks: [
          {
            label: "整段",
            src: "A",
            en: "In conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when 【主题词】 guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
            zh: "总之，人们已经形成一种基于理性认识的共识，即当【主题词】指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
          },
        ],
      },
    ],
    fills: [
      ["1", "图画/图表/文本描述", "根据题面自己写", "整个题面描述算一类"],
      ["2", "主题词", "7 选 1 或向下细化", "第一、二、三段同形"],
      ["3", "具体行为", "语料包「个人行为」", "the way people + 动词原形"],
      ["4", "相关领域", "语料包「政策领域」", "education / innovation / economic development 也可"],
      ["5", "社会效果", "语料包「社会效果」", "by + 动名词短语"],
    ],
    constraints: [
      "第二段固定五句：主题总起 → 个人行为与固定成果 → 政策领域与固定能力 → 社会效果 → 宏观收束。",
      "不要自行加第六句；加了就要多背一套衔接，收益低于风险。",
      "若图画材料极个人化（如 2020 习惯），【社会效果】要选能与「个人习惯」自然衔接的条目（如 building a culture of excellence and accountability）。",
    ],
  },
  {
    id: "express",
    name: "速通版",
    badge: "5 个空 · 双分支",
    words: "195–210",
    subtitle: "五句编号模板，①④句按材料类型选分支，⑤句用机构/期刊作实证",
    bestFor: "临考 1–2 周、只需背 5 句骨架 + 1 个主题的语料",
    paragraphs: [
      {
        id: "p1",
        role: "第一段 · 一句起手",
        note: "this scene / this bar chart / this table / this passage 按材料替换；描述处仍要自己写。",
        blocks: [
          {
            label: "整段",
            src: "A",
            en: "Though deceptively simple, this scene / this 【图表名称】 / this passage conveys a meaningful message: 【图画／图表／文本描述】. It serves as a compelling testament to the significance of 【主题词】.",
            zh: "尽管画面／【图表名称】／文本看似简单，却传递出深刻的寓意／信息：【图画／图表／文本描述】。它有力地证明了【主题词】的重要性。",
          },
        ],
      },
      {
        id: "p2",
        role: "第二段 · 五个编号句",
        note: "同一编号只选一句；①④句按「优先级顺序」选分支；②⑤句斜线部分各选一种；③句固定。",
        blocks: [
          {
            label: "① 主题体现（图画优先）",
            src: "A",
            en: "To begin with, experience suggests that 【主题词】 finds direct expression in phenomena exemplified by the way people 【具体行为】.",
            zh: "首先，从经验上讲，【主题词】直接体现在以人们【具体行为】为代表的现象之中。",
          },
          {
            label: "① 行为动机（图表优先）",
            src: "A",
            en: "To begin with, experience suggests that this trend/pattern can be explained in part by people's desire to 【具体行为】.",
            zh: "首先，从经验上讲，这一趋势／模式可以部分归因于人们【具体行为】的愿望。",
          },
          {
            label: "② 行动动机（任选一）",
            src: "A",
            en: "This is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences.",
            zh: "这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。",
          },
          {
            label: "② 个人典范（任选一）",
            src: "A",
            en: "Those who value such practices are exemplars of self-improvement and higher achievement.",
            zh: "重视这类做法的人，是自我完善和更高成就的典范。",
          },
          {
            label: "③ 转入社会条件（固定）",
            src: "A",
            en: "However, we should recognise that social conditions fundamentally shape the choices available to individuals.",
            zh: "然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。",
          },
          {
            label: "④ 战略推动（图表优先）",
            src: "A",
            en: "From this perspective, it is the promotion of national strategies for 【相关战略】 that provides impetus for these developments.",
            zh: "基于这一认识，正是国家在【相关战略】方面的战略倡导与推广，为这些发展变化提供了动力。",
          },
          {
            label: "④ 共同坚持（图画优先）",
            src: "A",
            en: "From this perspective, a shared commitment to 【相关战略】 can create the conditions for communities and nations to flourish in harmony, laying the groundwork for sustainable progress.",
            zh: "基于这一认识，对【相关战略】的共同坚持能够为社区和国家在和谐中蓬勃发展创造条件，为可持续进步奠定基础。",
          },
          {
            label: "⑤ 研究支持（任选一）",
            src: "A",
            en: "A study / An article published by 【权威机构／期刊】 lends support to the view that 【主题词】 plays an important role in driving this trend / fostering community prosperity.",
            zh: "【权威机构／期刊】刊载的一项研究／一篇文章支持这样一种观点，即【主题词】在推动这一趋势／促进社区繁荣方面发挥着重要作用。",
          },
          {
            label: "⑤ 多指标一致（任选一）",
            src: "A",
            en: "A study / An article published by 【权威机构／期刊】 lends support to the view that societies placing greater emphasis on 【主题词】 enjoy higher levels of vitality and prosperity, a pattern consistent across multiple indicators.",
            zh: "【权威机构／期刊】刊载的一项研究／一篇文章支持这样一种观点，即更重视【主题词】的社会拥有更高水平的活力与繁荣，这一模式在多项指标上保持一致。",
          },
        ],
      },
      {
        id: "p3",
        role: "第三段 · 与满分版相同",
        blocks: [
          {
            label: "整段",
            src: "A",
            en: "In conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when 【主题词】 guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.",
            zh: "总之，人们已经形成一种基于理性认识的共识，即当【主题词】指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。",
          },
        ],
      },
    ],
    fills: [
      ["1", "图画/图表/文本描述", "根据题面自己写", "this scene / this bar chart / this table / this passage"],
      ["2", "主题词", "7 选 1 或向下细化", "第一段、第⑤句、第三段同形"],
      ["3", "具体行为", "语料包「个人行为」", "接 the way people 或 people's desire to，均动词原形"],
      ["4", "相关战略", "语料包「相关战略」", "名词/动名词；特别偏个人的题可换贴题价值观"],
      ["5", "权威机构/期刊", "所选研究或文章的实际出处", "A study / An article published by …"],
    ],
    constraints: [
      "【权威机构／期刊】要写「有实体」的来源（如 Nankai University / Peking University / The Economist），不能编造不存在的研究。",
      "第②句以「／」分开的两个版本任选其一，都是固定句，不再填主题或行为。",
      "①④句的「优先级」指优先选用的材料类型，不是只能用于该类型；关键是句子能承接上一句。",
      "trend 对应趋势（折线、时间序列），pattern 对应分布/行为模式（饼图、柱状图、图画群像）。",
    ],
  },
];

// 三种材料的第一段处理（整理归纳 B，原文依据在「模版使用说明」第三、四步）
export const MATERIAL_RULES = [
  {
    id: "picture",
    name: "图画",
    first: "Though deceptively simple, this scene conveys a meaningful message: 【描述】. It serves as a compelling testament to the significance of 【主题词】.",
    must: ["写出地点", "写出一到两个人物/主体", "写出动作或表情", "写出图中文字（若有）"],
    avoid: ["逐个人物点名", "加入图里没有的情节", "只写「图中的人很开心」而不落到行为"],
  },
  {
    id: "chart",
    name: "图表",
    first: "The figures in the bar chart/line chart/pie chart/table reveal notable changes/differences concerning 【主题词】.",
    must: ["图表类型", "时间范围或调查对象", "最大项/变化最大项 + 数据", "一句整体趋势"],
    avoid: ["逐个数据报数", "把百分比写成人数", "年份与数值错位"],
  },
  {
    id: "text",
    name: "文字材料",
    first: "【主题词】 has long been a subject of public debate. The passage offers a fresh perspective on this issue, arguing that 【文段大意】. While this view may not convince everyone, I find it original and illuminating, and I agree with it wholeheartedly.",
    must: ["一句话概括作者主张", "一句自己的态度", "把材料关键词改成自己的主题词"],
    avoid: ["整句照抄材料", "逐句翻译", "既同意又反对"],
  },
  {
    id: "mixed",
    name: "混合材料",
    first: "两句起手：第一句写图画/第一份材料，第二句用 The accompanying chart/table shows that… 接第二份材料，最后用 It serves as a compelling testament to… 落到同一个主题词。",
    must: ["每份材料只抓一个关键点", "用并列或对比连接", "最后合并到同一个主题词"],
    avoid: ["给两份材料各写一个主题", "把两份材料写成两段"],
  },
];
