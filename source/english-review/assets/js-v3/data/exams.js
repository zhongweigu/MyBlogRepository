// 历年真题套写（英语一 2020–2026）
// 范文与中文对照来自 exam-texts.js（PDF 自动抽取，来源 A）；
// 题目材料、官方定性、审题与填空拆解为整理（B），已逐条标注。

import { EXAM_TEXTS } from "./exam-texts.js";

const META = [
  {
    year: "2026",
    kind: "图表（饼图 + 柱状图）",
    title: "养老机器人：消费者接受度与首要关注点",
    image: "/english-review/assets/img/exam-2026.png",
    material:
      "左图：一项关于养老机器人的消费者接受度调查——完全接受 39.3%、部分接受 32.8%、不接受 27.9%。右图：首要关注点——安全 46.3%、价格 24.9%、便利 10.7%。",
    official: null,
    officialNote:
      "截至本资料整理时，教育部 2026 年《考试分析》尚未出版（PDF 作者亦说明“官方还没出”）。此处只保留命题角度的分析，不冒充官方定性。",
    analysis: {
      info: "两幅图共同呈现消费者对养老机器人的态度：接受度三分，关注点三项，安全在关注点中最高。",
      meaning:
        "消费者有不同接受程度，而安全、价格、便利都是实际使用中的问题。技术进入养老场景，需要回应照护是否安全、是否用得起、是否方便。由“机器人”与“人的使用条件”结合，可以讨论科技进步怎样服务生活。",
      choice:
        "从富强类的科技进步与和谐类的民生需求结合，确定 people-centered technological development。具体行为写运用技术解决养老问题，个人收益是便利与福祉，社会收益落在养老服务质量和生活品质。",
    },
    slots: [
      ["具体行为", "apply technology to solve practical problems in elderly care", "运用技术解决养老中的实际问题", "富强类【具体行为】+ in elderly care"],
      ["可见成果", "greater convenience and overall well-being", "更大的便利与整体福祉", "富强【可见成果】+ 和谐【可见成果】"],
      ["相关领域", "public service improvement", "公共服务改进", "富强类【相关领域】"],
      ["个人能力", "benefit from technological progress", "受益于技术进步", "富强类【个人能力/行为】"],
      ["社会效果", "improving service quality and quality of life", "提升服务质量与生活品质", "富强【社会效果】+ 和谐【社会效果】"],
      ["相关战略", "elderly care", "养老保障", "和谐类【相关战略】"],
      ["社会变化", "vulnerable groups receive better care", "弱势群体得到更好的照顾", "友善类【社会变化】"],
    ],
    versions: [
      { name: "满分版", note: "7 个可替换槽 + 两图分述；第一段用两套静态图句架。", themeZh: "以人为本的科技发展" },
      { name: "简化版", note: "成果与能力固定，删去战略与社会变化，第二段五句收束。", themeZh: "以人为本的科技发展" },
      { name: "速通版 · 标准套写", note: "①句用图表分支（people's desire to…），④句用战略推动分支，⑤句挂南开大学。", themeZh: "以人为本的科技发展" },
      { name: "速通版 · 无脑套写", note: "主题词退到 technological development，行为直接复用图中的“安全、便利”。", themeZh: "科技发展" },
    ],
    takeaways: [
      "两幅图要各写一句，但只落到一个主题词；不要写成“接受度说明……关注点说明……”两套主题。",
      "“安全”是关注点里最高的，但它不是主题；主题是技术服务人的需要。",
      "满分版第一段没有单独的 It serves as… 收束句，主题已在总起句出现。纯图表题可以这样省一句，把空间留给数据；图画题仍建议保留收束句。",
      "无脑套写不是降级，而是把主题词换成更容易接住材料的短语；立意仍要正面。",
    ],
  },
  {
    year: "2025",
    kind: "表格",
    title: "全国居民每百户耐用消费品拥有量（2014—2023）",
    image: "/english-review/assets/img/exam-2025.png",
    material:
      "表格列出 2014、2017、2020、2023 年空调、洗衣机、电冰箱（柜）每百户拥有量：空调 75.2→96.1→117.7→145.9；洗衣机 83.7→91.7→96.7→98.2；冰箱 85.5→95.3→101.8→103.4（单位：台）。",
    official:
      "考生应总结出提示信息所表达的主题思想，即新时代人民群众消费水平的稳步提升和民生福祉的持续增进。",
    officialNote:
      "摘自 PDF 收录的教育部《2025 年全国硕士研究生招生考试英语（一）、英语（二）试题分析》截图（模版使用说明 p.21）。同一份《试题评价》还指出：英语（一）写作 B 节“首次以表格形式呈现提示信息，重点考查学生科学思维、经济思维等思维品质以及理论联系实际的能力”。",
    analysis: {
      info: "2014—2023 年三类家电都增加，空调 75.2→145.9（约 +94%），洗衣机 83.7→98.2（约 +17%），冰箱 85.5→103.4（约 +21%）。",
      meaning:
        "空调更直接关联居住舒适度，其突出增幅可以联系居民对舒适生活的追求；洗衣机和冰箱的增长体现生活便利程度提升。分析由“家电更多”落到“日常生活更舒适、更便利”。",
      choice:
        "从富强类的经济发展与和谐类的生活品质出发，提炼 high-quality development：个人使用空调改善居住感受，经济与技术进步提供条件，社会层面写生活水平提高与发展成果共享。",
    },
    slots: [
      ["具体行为", "use air conditioners to enjoy a more comfortable life", "使用空调，享受更舒适的生活", "由首段 air conditioners 自组"],
      ["可见成果", "enhanced quality of life and personal satisfaction", "生活品质的提升与个人满足感", "富强【可见成果】+ 和谐【可见成果】"],
      ["相关领域", "economic development", "经济发展", "富强类【相关领域】"],
      ["个人能力", "benefit from technological progress", "受益于技术进步", "富强类【个人能力/行为】"],
      ["社会效果", "raising living standards", "提高生活水平", "富强类【社会效果】"],
      ["相关战略", "common prosperity for all", "全体人民共同富裕", "富强类【相关战略】"],
      ["社会变化", "living conditions improve", "生活条件得到改善", "富强类【社会变化】"],
    ],
    versions: [
      { name: "满分版", note: "表格用 the figures in the table reveal…；动态句写两组，第三组单独一句。", themeZh: "高质量发展" },
      { name: "简化版", note: "同一主题，第二段换成固定成果与固定能力。", themeZh: "高质量发展" },
      { name: "速通版 · 标准套写", note: "①句用趋势分支（this trend…），④句用战略推动，⑤句南开大学。", themeZh: "高质量发展" },
      { name: "速通版 · 无脑套写", note: "主题词退到 improving living standards，行为改为 use more household appliances。", themeZh: "提高生活水平" },
    ],
    takeaways: [
      "表格题不要逐格报数：选空调作为主趋势，另两类各一句带过即可。",
      "单位 per hundred households 必须写；漏掉会变成“全国有 145.9 台空调”。",
      "2025 是英语一首次表格题，说明“英一必图画”的押题思路已经失效。",
    ],
  },
  {
    year: "2024",
    kind: "图画 + 柱状图",
    title: "家门口的新公园与城市公园数量增长",
    image: "/english-review/assets/img/exam-2024.png",
    material:
      "左图：新建社区公园里，居民在树木与“市民健身区”旁跑步、散步，一个男孩说“家门口新建的小公园真不错！”。右图：某市近三年公园数量 406（2020）→532（2021）→670（2022），单位：座。",
    official:
      "考生应总结出提示信息所表达的主题思想，即建设宜居城市、增进民生福祉。解读须完全基于图画内容，特别是人物话语的意义和指向性，不宜偏离图画而自行发挥。",
    officialNote:
      "摘自 PDF 收录的教育部《2024 年……英语（一）、英语（二）试题评价》及试题分析截图（模版使用说明 p.20、p.29）。《试题评价》还指出：B 节“以图画、图表双重形式呈现新时代城市公园建设成果，要求学生运用科学思维分析两种媒介信息之间的关联，探寻现象和数据背后的本质”。",
    analysis: {
      info: "“家门口”说明使用便利，“真不错”表现居民满意，锻炼场景体现公园进入日常生活；图表进一步显示这种公共空间在持续增加。",
      meaning:
        "把两种材料联系起来，可以看到城市建设如何改善居民的运动、休闲与交往条件。",
      choice:
        "从和谐类的民生与居住环境出发，结合富强类的公共服务，选择 building livable cities：个人享受便利与健康生活，社区获得交往空间，公共服务逐渐更容易获得。",
    },
    slots: [
      ["具体行为", "pursue healthy lifestyles in well-designed environments", "在精心设计的环境中追求健康的生活方式", "和谐类【个人能力/行为】"],
      ["可见成果", "a fulfilling life and personal satisfaction", "充实的生活与个人满足感", "和谐类【可见成果】"],
      ["相关领域", "sustainable urban development", "城市可持续发展", "和谐类【相关领域】"],
      ["个人能力", "access improved public services and recreational facilities", "获得更完善的公共服务和休闲设施", "和谐类【个人能力/行为】"],
      ["社会效果", "fostering neighborhood ties and mutual support", "加强邻里联系与相互支持", "和谐类【社会效果】"],
      ["相关战略", "building livable, resilient and smart cities", "建设宜居、韧性、智慧城市", "和谐类【相关战略】"],
      ["社会变化", "public facilities multiply and community spaces become more accessible", "公共设施增多，社区空间更便捷易达", "和谐类【社会变化】"],
    ],
    versions: [
      { name: "满分版", note: "第一段用 while 把图画与图表并置；数据句补 passing 532 in 2021。", themeZh: "建设宜居城市" },
      { name: "简化版", note: "同主题，第二段固定成果与能力。", themeZh: "建设宜居城市" },
      { name: "速通版 · 标准套写", note: "①句用图画分支（finds direct expression…），④句用共同坚持分支。", themeZh: "建设宜居城市" },
      { name: "速通版 · 无脑套写", note: "主题词退到 improving city life，行为改为 exercise in parks near their homes。", themeZh: "改善城市生活" },
    ],
    takeaways: [
      "官方原话是“建设宜居城市、增进民生福祉”，只写环保或全民健身会掉档。",
      "混合材料要“各写一句、合到一个主题”，不要给图画和图表各一个主题。",
      "数据不必全写，406→670 已足够，532 作为中间点可写可不写。",
    ],
  },
  {
    year: "2023",
    kind: "图画",
    title: "村里的龙舟赛越来越热闹",
    image: "/english-review/assets/img/exam-2023.png",
    material:
      "河上两条龙舟奋力比赛，岸边站满呐喊助威的观众；前景两位老人携手观赛，其中一人感叹：“真好啊，咱们村的龙舟赛越来越热闹了！”",
    official:
      "第二部分解读图画含意。通过分析人物话语，考生应总结出图画所表达的主题思想，即新时代乡村振兴特别是乡村文化振兴。图画解读须完全基于图画内容，特别是人物话语的意义和指向性，不宜偏离图画而自行发挥。",
    officialNote:
      "摘自 PDF 收录的教育部《2023 年……试题分析》截图（模版使用说明 p.19）。官方还明确文章应包含三部分：描述图画 → 解读含意 → 展开议论。",
    analysis: {
      info: "龙舟比赛既是村民参加的活动，也是熟悉的乡土习俗。观众聚集、老人称赞“越来越热闹”，说明这种习俗正在吸引更多参与者。",
      meaning:
        "传统活动因此同时连接个人的文化体验、村民的共同记忆和乡村的公共生活。",
      choice:
        "从文明类的文化传承、爱国类的共同习俗出发，并加入“村里”这一空间限定，确定 cultural revitalization in rural areas。个人行为写参加乡村文化活动，社会部分展开文化生活、邻里联系与年轻一代的参与。",
    },
    slots: [
      ["具体行为", "participate in cultural practices and preserve shared customs through dragon boat races", "通过龙舟比赛参与文化活动并传承共同习俗", "爱国类【具体行为】+ through…"],
      ["可见成果", "meaningful connections to history and community", "与历史和社区建立有意义的联系", "爱国类【可见成果】"],
      ["相关领域", "cultural heritage preservation", "文化遗产保护", "文明类【相关领域】"],
      ["个人能力", "appreciate traditional wisdom and integrate it with modern life", "欣赏传统智慧并融入现代生活", "文明类【个人能力/行为】"],
      ["社会效果", "enriching cultural life and fostering neighborhood ties", "丰富文化生活并加强邻里联系", "文明【社会效果】+ 和谐【社会效果】"],
      ["相关战略", "rural cultural revitalization", "乡村文化振兴", "和谐类【相关战略】"],
      ["社会变化", "cultural activities proliferate and younger generations embrace heritage with fresh enthusiasm", "文化活动增多，年轻一代以新热情传承遗产", "文明【社会变化】+ 爱国【社会变化】"],
    ],
    versions: [
      { name: "满分版", note: "图画描述用 on a hillside overlooking… + with one remarking…；引用原话。", themeZh: "乡村文化振兴" },
      { name: "简化版", note: "同主题，第二段固定成果与能力。", themeZh: "乡村文化振兴" },
      { name: "速通版 · 标准套写", note: "①句换成 appreciate cultural heritage and participate actively in traditional festivals。", themeZh: "乡村文化振兴" },
      { name: "速通版 · 无脑套写", note: "主题词退到 keeping village traditions alive，行为写 watch and take part in village dragon boat races。", themeZh: "让乡村传统保持活力" },
    ],
    takeaways: [
      "官方定性是“乡村文化振兴”，只写“传统文化”会显得空。",
      "图中人物话语必须进入描述，因为它是命题人给的“指向性”。",
      "“村里”这个空间限定要体现在主题词里（in rural areas）。",
    ],
  },
  {
    year: "2022",
    kind: "图画",
    title: "不是本专业的讲座，要不要听",
    image: "/english-review/assets/img/exam-2022.png",
    material:
      "校园讲座公告栏前，两名学生讨论。一人说：“这讲座不是我们专业的，听了也没多大用。”另一人回答：“去听听肯定有好处。”",
    official: null,
    officialNote: "PDF 未收录该年官方《试题分析》原文，此处只保留原 PDF 的审题分析，不冒充官方表述。",
    analysis: {
      info: "两人面对同一个学习机会，判断标准不同：一人看知识与当前专业的直接关系，另一人愿意先接触、理解新内容。",
      meaning:
        "后者体现了主动求知和开放的学习态度：学习的价值可以超出一门课程或眼前的考试。由“愿意走进讲座”可以进一步谈持续拓展知识。",
      choice:
        "从文明类的教育与主动求知出发，确定 lifelong learning。具体行为把终身学习落实为主动参加不同学科的讲座；成果写理解能力与判断力，公共层面再扩展到文化生活与学习型社会。",
    },
    slots: [
      ["具体行为", "pursue knowledge actively by attending lectures outside their major", "通过参加专业之外的讲座积极求知", "文明类【具体行为】+ by attending…"],
      ["可见成果", "enhanced intellectual capacity and refined judgment", "智力水平的提升与成熟的判断力", "文明类【可见成果】×2 组合"],
      ["相关领域", "quality education", "素质教育", "文明类【相关领域】"],
      ["个人能力", "pursue lifelong learning and develop cultural literacy", "持续学习并培养文化素养", "文明类【个人能力/行为】"],
      ["社会效果", "enriching cultural life", "丰富文化生活", "文明类【社会效果】"],
      ["相关战略", "building a learning society", "建设学习型社会", "文明类【相关战略】"],
      ["社会变化", "more people participate in lifelong learning", "更多人参与终身学习", "文明类【社会变化】"],
    ],
    versions: [
      { name: "满分版", note: "多了 For example 一句（a lecture outside our major may offer a new way to solve a familiar problem），是七篇里唯一主动加例子的。", themeZh: "终身学习" },
      { name: "简化版", note: "删去 For example，其余同主题。", themeZh: "终身学习" },
      { name: "速通版 · 标准套写", note: "①句用 pursue knowledge actively and think critically across disciplines；②句用 Those who value… 分支。", themeZh: "终身学习" },
      { name: "速通版 · 无脑套写", note: "主题词退到 learning beyond one's major，战略换成 prioritizing education。", themeZh: "学习专业之外的知识" },
    ],
    takeaways: [
      "不要把材料理解成“要不要听讲座”，要理解成“要不要接触专业之外的知识”。",
      "2019 年后英语一反复考“学习/教育”，主题词要能向上接到学习型社会。",
      "满分版加的 For example 是可选动作：有具体例子就加，没有就删，不影响结构。",
    ],
  },
  {
    year: "2021",
    kind: "图画",
    title: "学戏的孩子与父亲",
    image: "/english-review/assets/img/exam-2021.png",
    material:
      "一名穿戏服、持道具的孩子对父亲说：“爸爸，好多同学觉得学唱戏不好玩。”父亲微笑回应：“你自己不是喜欢吗？那就足够了。”",
    official: null,
    officialNote: "PDF 只收录了该年题目图片与命题解读，未收录官方《试题分析》原文。",
    analysis: {
      info: "孩子对戏曲有真实兴趣，同时受到同伴评价的影响。父亲把判断的依据放回孩子自身的喜爱，鼓励他继续学习。",
      meaning:
        "戏曲是传统文化的具体载体，对这份兴趣的尊重，也体现了对传统文化价值的认同。",
      choice:
        "从文明、爱国类的文化传承和文化认同出发，选用 cultural confidence。这里的自信通过继续学习戏曲、欣赏传统艺术体现出来，个人的文化认同与社会层面的传承可以顺势衔接。",
    },
    slots: [
      ["具体行为", "appreciate cultural heritage by learning traditional opera", "通过学习传统戏曲欣赏文化遗产", "文明类【具体行为】+ by learning…"],
      ["可见成果", "deeper cultural identity and personal satisfaction", "更深厚的文化认同与个人满足感", "文明【可见成果】+ 和谐【可见成果】"],
      ["相关领域", "cultural heritage preservation", "文化遗产保护", "文明类【相关领域】"],
      ["个人能力", "appreciate traditional wisdom and integrate it with modern life", "欣赏传统智慧并融入现代生活", "文明类【个人能力/行为】"],
      ["社会效果", "fostering cultural continuity and social cohesion", "促进文化传承与社会凝聚", "爱国类【社会效果】"],
      ["相关战略", "preserving China's cultural heritage", "保护中华文化遗产", "文明类【相关战略】"],
      ["社会变化", "younger generations embrace heritage with fresh enthusiasm", "年轻一代以新热情拥抱文化遗产", "爱国类【社会变化】"],
    ],
    versions: [
      { name: "满分版", note: "描述用 beside his father… while his father smiles and replies…，完整保留对话。", themeZh: "文化自信" },
      { name: "简化版", note: "同主题，第二段固定成果与能力。", themeZh: "文化自信" },
      { name: "速通版 · 标准套写", note: "①句用 appreciate cultural heritage and cultivate refined tastes。", themeZh: "文化自信" },
      { name: "速通版 · 无脑套写", note: "主题词退到 valuing traditional culture，行为写 learn traditional opera because they enjoy it。", themeZh: "重视传统文化" },
    ],
    takeaways: [
      "只写“自信”会丢掉戏曲这个文化载体；只写“传统文化”会丢掉“自信”这一层。",
      "父亲的话是命题人给的立意方向：兴趣 → 认同 → 自信。",
      "孙悟空/戏曲道具不是装饰，是“传统文化”的能指，描述时至少要提 costume 或 opera。",
    ],
  },
  {
    year: "2020",
    kind: "图画（两幅对比）",
    title: "习惯：尽早完成，还是拖到最后",
    image: "/english-review/assets/img/exam-2020.png",
    material:
      "左图：女孩坐在堆着材料的书桌前认真书写，说“尽早完成才放心”。右图：男孩靠坐在另一张桌旁，说“不到最后不动手”。两图下方标注“习惯”。",
    official: null,
    officialNote: "PDF 未收录该年官方《试题分析》原文，此处只保留原 PDF 的审题分析。",
    analysis: {
      info: "两个人面对的都是需要完成的事情，差异在于何时开始、怎样安排自己的行动。女孩主动推进任务，把安心建立在已经完成的工作上；男孩依靠最后期限催促自己行动。",
      meaning:
        "由这种对比可以提炼出主动管理时间、及时落实计划的积极态度。",
      choice:
        "从敬业类的执行力和行动意识出发，进一步落到个人日常习惯，选用 self-discipline。它既能解释“尽早完成”的行动，也能解释主动约束拖延的态度。",
    },
    slots: [
      ["具体行为", "turn plans into action and replace excuses with effort", "将计划化为行动，以努力代替借口", "敬业类【具体行为】"],
      ["可见成果", "tangible achievements and reduced stress", "切实的成果与减轻的压力", "敬业【可见成果】+ 和谐【可见成果】"],
      ["相关领域", "quality education", "素质教育", "文明类【相关领域】"],
      ["个人能力", "bridge the gap between knowing and doing", "缩小认知与行动之间的差距", "敬业类【个人能力/行为】"],
      ["社会效果", "building a culture of excellence and accountability", "形成追求卓越、重视责任的风气", "敬业类【社会效果】"],
      ["相关战略", "a spirit of hard work and dedication", "劳动、奋斗与奉献精神", "敬业类【相关战略】"],
      ["社会变化", "professional standards rise across industries", "各行业的职业标准普遍提高", "敬业类【社会变化】"],
    ],
    versions: [
      { name: "满分版", note: "多一句 For example（starting an assignment early leaves time to check for mistakes）。", themeZh: "自律" },
      { name: "简化版", note: "删去例子，固定成果与能力。", themeZh: "自律" },
      { name: "速通版 · 标准套写", note: "①句用图画分支，②句用 Those who value…；④句用共同坚持。", themeZh: "自律" },
      { name: "速通版 · 无脑套写", note: "主题词退到 developing good habits，行为写 start their work early and finish it on time。", themeZh: "培养良好习惯" },
    ],
    takeaways: [
      "两幅对比图的关键不是“谁对谁错”，而是两种时间管理方式；主题词要能同时解释两边。",
      "2020 是“向下细化”的典型：敬业太高压不住，落到自律/时间管理。",
      "标题“习惯”是提示，不是主题；主题要写成 self-discipline 或 developing good habits。",
    ],
  },
];

export const EXAMS = META.map((m) => ({
  ...m,
  versions: m.versions.map((v, i) => ({ ...v, ...EXAM_TEXTS[m.year][i] })),
}));

export const EXAM_INDEX = EXAMS.map((e) => ({ year: e.year, title: e.title, kind: e.kind }));
