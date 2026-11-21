// 小作文（应用文）可背模板库
// 来源 C（Agent 扩充）：与 letters.js 的 13 个场景 id 一一对应，未混入 PDF 原文。
// 用法：[[...]] 标核心搭配，【...】为可替换项；一句一行，按开头 + 主体 + 结尾组合成约 100 词小作文。

export const LETTER_TPL = {
  invite: {
    opening: [
      { en: "On behalf of the Student Union, I am writing to [[invite you to]] serve as a judge at our English speech contest.", zh: "我谨代表学生会写信邀请您担任英语演讲比赛的评委。", use: "邀请信开头" },
      { en: "I am writing to [[express my sincere wish]] that you could attend our annual culture festival as a guest.", zh: "我写信表达诚挚愿望，希望您能作为嘉宾出席我们的年度文化节。", use: "正式邀请开头" },
      { en: "It would be great if you could [[come along to]] our class reunion at the canteen this Saturday evening.", zh: "如果你能来参加周六晚上在食堂的班级聚会，那就太好了。", use: "朋友间邀请" },
    ],
    body: [
      { en: "The event [[is scheduled for]] 【时间】 in 【地点】, and about two hundred students are expected to attend.", zh: "活动定于【时间】在【地点】举行，预计约两百名学生参加。", use: "交代时间地点" },
      { en: "【数字】 contestants will [[deliver a five-minute speech]] on 【主题】, and three judges will comment on their performance.", zh: "【数字】名选手将围绕【主题】作五分钟演讲，三位评委将点评他们的表现。", use: "说明活动内容" },
      { en: "Your presence would [[add great value to]] the occasion, as your expertise would offer our students fresh insight and encouragement.", zh: "您的到来将为活动增色，因为您的专业知识会给学生带来新的启发与鼓励。", use: "说明对方价值" },
      { en: "We would be grateful if you could [[confirm your availability]] by 【日期】 so that we can finalise the programme.", zh: "如果您能在【日期】前确认是否出席，我们将不胜感激，以便最终确定流程。", use: "请对方确认" },
    ],
    closing: [
      { en: "We [[look forward to]] welcoming you and to hearing your views on the students' work.", zh: "我们期待欢迎您到来，并聆听您对学生作品的看法。", use: "期待出席" },
      { en: "Please [[feel free to]] contact me if you need any further details about the arrangement.", zh: "如需有关安排的更多细节，请随时与我联系。", use: "提供联系方式" },
      { en: "I hope you can [[make it]] and share the evening with our students.", zh: "希望你能前来，与我们的学生共度这个夜晚。", use: "期待成行" },
    ],
  },
  suggest: {
    opening: [
      { en: "I am writing to [[offer several suggestions]] regarding the opening hours of the university library.", zh: "我写信就大学图书馆的开放时间提出几点建议。", use: "建议信开头" },
      { en: "As a student who uses the library almost every day, I would like to [[put forward]] two practical proposals.", zh: "作为几乎每天使用图书馆的学生，我想提出两条切实可行的建议。", use: "学生身份切入" },
      { en: "Thank you for [[asking for my advice]] on how to improve the service, and I am glad to share a few thoughts.", zh: "感谢您就如何改进服务征求我的意见，我很乐意谈几点想法。", use: "回应征求意见" },
    ],
    body: [
      { en: "Although the collection is impressive, students often [[find it difficult to]] secure a seat during the exam weeks.", zh: "尽管馆藏令人印象深刻，但考试周学生常常很难找到座位。", use: "指出问题" },
      { en: "I would therefore suggest [[extending the opening hours]] to eleven in the evening during that period.", zh: "因此我建议在那段时间将开放时间延长到晚上十一点。", use: "第一条建议" },
      { en: "In addition, it would be helpful to [[subscribe to]] the academic databases most frequently requested by students.", zh: "此外，订阅学生最常使用的学术数据库将会很有帮助。", use: "第二条建议" },
      { en: "These measures would not [[require a large budget]], yet they would make a noticeable difference to those who rely on the library.", zh: "这些措施不需要很大预算，却会给依赖图书馆的人带来明显改变。", use: "说明可行性" },
    ],
    closing: [
      { en: "I hope these proposals will be [[taken into consideration]] by the committee before the next semester begins.", zh: "希望委员会在下学期开始前考虑这些建议。", use: "希望被采纳" },
      { en: "I would be glad to [[provide further details]] or help collect students' opinions if needed.", zh: "如需更多细节或协助收集学生意见，我很乐意帮忙。", use: "愿意补充" },
      { en: "Thank you for your time, and I [[look forward to]] hearing from you at your convenience.", zh: "感谢您的时间，期待您在方便时回复。", use: "期待回复" },
    ],
  },
  thanks: {
    opening: [
      { en: "I am writing to [[express my sincere gratitude]] for the letter of recommendation you wrote for my graduate application.", zh: "我写信对您为我的研究生申请撰写推荐信表达诚挚感谢。", use: "正式感谢" },
      { en: "On behalf of our delegation, I would like to [[thank you warmly]] for the hospitality you showed us during the visit.", zh: "我谨代表代表团，对您在我们访问期间的热情接待表示衷心感谢。", use: "代表团体致谢" },
      { en: "I am still [[thinking about]] the weekend we spent together, and I want to thank you for making it so memorable.", zh: "我仍在回想我们一起度过的周末，谢谢你让它如此难忘。", use: "朋友间感谢" },
    ],
    body: [
      { en: "Your help could not [[have come at a better time]], as I was struggling to present my research experience clearly.", zh: "您的帮助来得正是时候，当时我正为如何清楚呈现研究经历而发愁。", use: "说明时机" },
      { en: "Thanks to your detailed comments, I [[revised my personal statement]] and submitted it well before the deadline.", zh: "多亏您细致的意见，我修改了个人陈述，并在截止日期前很久就提交了。", use: "具体结果" },
      { en: "Your patience also [[made a real difference to]] my confidence, and I no longer doubt my ability to explain my ideas.", zh: "您的耐心也实实在在地改变了我的信心，我不再怀疑自己表达想法的能力。", use: "说明影响" },
    ],
    closing: [
      { en: "Please [[accept my sincere thanks]] once again for your time and generous support.", zh: "请再次接受我对您的时间与慷慨支持的诚挚谢意。", use: "再次致谢" },
      { en: "I hope I can [[repay your kindness]] some day, perhaps by helping other students in the same way.", zh: "希望有朝一日能回报您的好意，或许是以同样的方式帮助其他学生。", use: "表达回馈" },
      { en: "I will always [[remember your help]] and wish you every success in your work.", zh: "我会永远记得您的帮助，并祝您工作顺利。", use: "表达祝福" },
    ],
  },
  apology: {
    opening: [
      { en: "I am writing to [[apologize for]] being unable to attend the group meeting scheduled for Friday afternoon.", zh: "我写信为无法参加周五下午的组会道歉。", use: "正式道歉" },
      { en: "Please [[accept my sincere apology]] for the delay in delivering the report you requested last week.", zh: "请接受我对上周您所需报告延误交付的诚挚歉意。", use: "商务道歉" },
      { en: "I am really sorry that I [[let you down]] by cancelling our trip at such short notice.", zh: "很抱歉我在这么短的时间内取消旅行，让你失望了。", use: "朋友间道歉" },
    ],
    body: [
      { en: "A sudden high fever has [[kept me in bed]] since Wednesday, and my doctor has advised me to rest for three days.", zh: "周三起我突发高烧一直卧床，医生建议我休息三天。", use: "说明原因" },
      { en: "I fully understand that the meeting is important for our project, and I [[regret the inconvenience]] my absence may cause.", zh: "我完全理解这次会议对项目很重要，也为缺席可能带来的不便深感抱歉。", use: "承认影响" },
      { en: "To [[make up for]] it, I have finished my part of the report in advance and will send it to you before noon.", zh: "为弥补，我已提前完成报告中我负责的部分，并会在中午前发给您。", use: "补救措施" },
      { en: "I will [[set two reminders]] next time so that a similar delay will not happen again.", zh: "下次我会设两个提醒，以免再次出现类似延误。", use: "防止再犯" },
    ],
    closing: [
      { en: "I sincerely hope you can [[understand my situation]] and accept my apology for the trouble caused.", zh: "我真诚希望您能理解我的情况，并接受我因造成麻烦而作出的道歉。", use: "请求谅解" },
      { en: "Once again, I am sorry for any trouble I have caused, and I [[deeply regret]] any plan you had to change.", zh: "再次为造成的麻烦致歉，也很抱歉让您不得不改变原计划。", use: "再次致歉" },
      { en: "Thank you for your patience, and I [[look forward to]] seeing you at the next meeting.", zh: "感谢您的耐心，期待在下次会议上见到您。", use: "期待见面" },
    ],
  },
  apply: {
    opening: [
      { en: "I am writing to [[apply for]] the volunteer position at the International Culture Festival advertised on the university website.", zh: "我写信申请校园网站上发布的国际文化节志愿者岗位。", use: "申请职位" },
      { en: "I would like to [[be considered for]] the scholarship, as I meet the academic requirements stated in the notice.", zh: "我希望获得这项奖学金的考虑，因为我符合通知中列出的学业要求。", use: "申请奖学金" },
      { en: "Please [[accept this letter]] as my formal application for the summer internship in your publishing house.", zh: "请将此信视为我对贵出版社暑期实习的正式申请。", use: "提交申请" },
    ],
    body: [
      { en: "As a junior majoring in English, I have [[served as a student guide]] for two campus open days.", zh: "作为英语专业大三学生，我曾在两次校园开放日中担任学生向导。", use: "相关经历" },
      { en: "This experience has [[equipped me with]] strong communication skills and a good command of spoken English.", zh: "这段经历使我具备了较强的沟通能力和良好的英语口语。", use: "能力证明" },
      { en: "I am drawn to this programme because it offers a chance to [[introduce Chinese culture]] to visitors from different countries.", zh: "我之所以被该项目吸引，是因为它提供了向各国访客介绍中国文化的机会。", use: "申请动机" },
      { en: "I am [[available from July to September]], and I enclose my CV for your reference.", zh: "我七至九月均可到岗，并随信附上简历供您参考。", use: "时间与附件" },
    ],
    closing: [
      { en: "I would be grateful for the opportunity to [[discuss my application]] further at an interview.", zh: "如能有机会在面试中进一步说明我的申请，我将不胜感激。", use: "请求面试" },
      { en: "Thank you for your time and consideration, and I [[look forward to]] hearing from you.", zh: "感谢您的时间与考虑，期待您的回复。", use: "感谢考虑" },
      { en: "Please [[do not hesitate to]] contact me if you need any additional documents.", zh: "如需补充材料，请随时与我联系。", use: "提供联系方式" },
    ],
  },
  notice: {
    opening: [
      { en: "To enrich campus life and encourage cross-cultural communication, the Student Union [[will hold]] an English corner every Friday evening.", zh: "为丰富校园生活、促进跨文化交流，学生会将于每周五晚举办英语角。", use: "通知开头" },
      { en: "This notice is to [[inform all students]] that the opening hours of the library will change next month.", zh: "本通知告知全体同学，图书馆开放时间将于下月调整。", use: "告知变更" },
      { en: "Volunteers are [[urgently needed]] for the campus sports meeting, which will take place on 【日期】.", zh: "校园运动会急需志愿者，活动将于【日期】举行。", use: "招募开头" },
    ],
    body: [
      { en: "The first session is [[scheduled for]] 【时间】 in 【地点】, and later sessions will follow the same pattern.", zh: "首次活动定于【时间】在【地点】举行，之后各次安排相同。", use: "时间地点" },
      { en: "Each session will [[centre on]] a different topic, and two native speakers will join us as guest hosts.", zh: "每次活动围绕不同话题展开，并邀请两位母语者作为嘉宾主持。", use: "活动内容" },
      { en: "Those who wish to participate should [[sign up]] at the Student Union office before 【日期】.", zh: "有意参加者请于【日期】前到学生会办公室报名。", use: "报名方式" },
      { en: "For further information, please [[contact the organiser]] by email or visit our office during office hours.", zh: "更多信息请通过邮件联系组织者，或在办公时间到办公室咨询。", use: "联系方式" },
    ],
    closing: [
      { en: "All students are [[warmly welcome]] to attend, and no previous experience is required.", zh: "欢迎全体同学参加，无需相关经验。", use: "欢迎参加" },
      { en: "The Student Union [[looks forward to]] your active participation in this meaningful event.", zh: "学生会期待大家积极参与这项有意义的活动。", use: "期待参与" },
      { en: "This notice is [[issued by]] 【单位】 on 【日期】, and will remain on the board.", zh: "本通知由【单位】于【日期】发布，并将在公告栏保留。", use: "落款单位" },
    ],
  },
  recommend: {
    opening: [
      { en: "If you are looking for a book that explains Chinese society in a readable way, I would [[strongly recommend]] From the Soil.", zh: "如果你在找一本通俗解释中国社会的书，我强烈推荐《乡土中国》。", use: "推荐书籍" },
      { en: "I am writing to [[recommend]] a former student of mine for the research assistant position in your laboratory.", zh: "我写信推荐我过去的一名学生，申请您实验室的研究助理岗位。", use: "推荐他人" },
      { en: "If you have ever wanted to understand Chinese village life, this book is [[well worth reading]].", zh: "如果你曾想了解中国乡村生活，这本书很值得一读。", use: "引起兴趣" },
    ],
    body: [
      { en: "What makes it [[stand out]] is its clarity, since the author uses village life rather than abstract terms.", zh: "它最突出之处是清晰：作者用乡村生活而非抽象术语来说明问题。", use: "突出优点" },
      { en: "Unlike many academic books, it [[explains difficult ideas]] through stories that ordinary readers can follow.", zh: "与许多学术著作不同，它通过普通读者能跟上的故事来解释难懂的观点。", use: "对比说明" },
      { en: "It is particularly suitable for international students, who may [[find academic articles]] on Chinese society too specialised.", zh: "它尤其适合留学生，他们可能觉得关于中国社会的学术文章过于专门。", use: "适合人群" },
      { en: "I have [[read it three times]] and still discover something new in its short chapters.", zh: "我读了三遍，仍能在它简短的章节里发现新东西。", use: "个人体验" },
    ],
    closing: [
      { en: "I am confident that it will [[not disappoint you]] once you start reading.", zh: "我相信你一旦开始读，它不会让你失望。", use: "表达信心" },
      { en: "I would be happy to [[lend you my copy]] if you are interested.", zh: "如果你感兴趣，我很乐意把我的那本借给你。", use: "提供借阅" },
      { en: "Do let me know what you think after you [[finish the first chapter]].", zh: "读完第一章后，请一定告诉我你的想法。", use: "请对方反馈" },
    ],
  },
  introduce: {
    opening: [
      { en: "Since you are interested in Chinese festivals, I would like to [[tell you something about]] the Spring Festival.", zh: "既然你对中国节日感兴趣，我想介绍一些春节的情况。", use: "介绍节日" },
      { en: "I am writing to [[introduce to you]] my friend Chen Wei, who will study in your department next term.", zh: "我写信向你介绍我的朋友陈伟，他下学期将在你们系学习。", use: "介绍他人" },
      { en: "You asked about our online course on Chinese calligraphy, so I would like to [[give you a brief account]] of it.", zh: "你问起我们的中国书法线上课程，我想简要介绍一下。", use: "介绍课程" },
    ],
    body: [
      { en: "It is [[celebrated in late January]] or early February, and it usually involves family reunions and festive meals.", zh: "它在一月下旬或二月初庆祝，通常包括家庭团聚和节日餐食。", use: "时间习俗" },
      { en: "Families [[put up couplets]] on the door and gather for a reunion dinner on New Year's Eve.", zh: "家家户户在门上贴春联，并在除夕团聚吃年夜饭。", use: "具体活动" },
      { en: "What makes it special is the idea of returning home, which [[reflects the value]] Chinese people place on family.", zh: "它的特别之处在于回家的观念，这体现了中国人对家庭的重视。", use: "文化内涵" },
      { en: "If you visit China in winter, you could [[join a family dinner]] and see how the festival is celebrated.", zh: "如果你冬天来中国，可以参加一次家庭聚餐，看看节日如何庆祝。", use: "体验建议" },
    ],
    closing: [
      { en: "I hope this [[gives you a clearer picture]] of the festival and its meaning.", zh: "希望这能让你更清楚地了解这个节日及其意义。", use: "帮助了解" },
      { en: "I would be glad to [[show you around]] if you come to China next year.", zh: "如果你明年来中国，我很乐意带你四处看看。", use: "愿意陪同" },
      { en: "Do write back and tell me which aspect of the festival [[interests you most]].", zh: "请回信告诉我，这个节日哪个方面最让你感兴趣。", use: "期待回信" },
    ],
  },
  complain: {
    opening: [
      { en: "I am writing to [[complain about]] the laptop I purchased from your online store on 【日期】.", zh: "我写信投诉我于【日期】在贵网店购买的笔记本电脑。", use: "投诉产品" },
      { en: "I am writing to [[express my dissatisfaction]] with the service I received at your restaurant last Saturday evening.", zh: "我写信表达对上周六晚在贵餐厅所接受服务的不满。", use: "投诉服务" },
      { en: "I regret to say that the goods delivered to me last week [[failed to meet]] the standard described on your website.", zh: "很遗憾，上周送达的商品未达到贵网站描述的标准。", use: "正式投诉" },
    ],
    body: [
      { en: "Although the product arrived on time, the screen [[went blank]] after only three days of normal use.", zh: "产品虽按时送达，但正常使用仅三天后屏幕便无故黑屏。", use: "描述问题" },
      { en: "I contacted your customer service twice, but no one [[responded to my emails]] or offered any explanation.", zh: "我两次联系客服，但无人回复我的邮件，也未作任何解释。", use: "联系未果" },
      { en: "As a result, I was unable to [[complete an important assignment]] and had to borrow a friend's computer.", zh: "结果我无法完成一项重要作业，只好借用朋友的电脑。", use: "造成影响" },
      { en: "I would therefore [[ask for a replacement]] or a full refund within seven working days.", zh: "因此我要求在七个工作日内换货或全额退款。", use: "提出要求" },
    ],
    closing: [
      { en: "I [[look forward to]] your prompt response and to a satisfactory solution to this matter.", zh: "期待您及时回复，并期待此事得到满意解决。", use: "期待回复" },
      { en: "Thank you for your attention, and I hope this problem can be [[settled without further delay]].", zh: "感谢您对此事的关注，希望问题能尽快解决而不再拖延。", use: "希望解决" },
      { en: "I have kept the receipt and will [[send a copy]] if you need it.", zh: "我保留了收据，如需可发送复印件。", use: "附上凭证" },
    ],
  },
  inquire: {
    opening: [
      { en: "I am writing to [[inquire about]] the summer programme in British literature advertised on your university website.", zh: "我写信咨询贵校网站上宣传的英国文学暑期项目。", use: "咨询项目" },
      { en: "I would be grateful if you could [[provide some information]] about the conference on environmental protection next month.", zh: "如您能提供下月环保会议的相关信息，我将不胜感激。", use: "咨询会议" },
      { en: "Could you please [[send me the details]] of the flat you advertised near the campus?", zh: "您能发给我贵方在校园附近出租公寓的详细信息吗？", use: "咨询租房" },
    ],
    body: [
      { en: "I would like to know whether the courses are [[taught in English]] and how long the programme lasts.", zh: "我想了解课程是否用英语授课，以及项目持续多久。", use: "课程问题" },
      { en: "I am also wondering whether scholarships are [[available for international students]] and how much the tuition fee is.", zh: "我还想知道是否为国际学生提供奖学金，以及学费是多少。", use: "费用问题" },
      { en: "For your reference, I am a sophomore majoring in English and [[particularly interested in]] modern fiction.", zh: "供您参考，我是英语专业大二学生，尤其对现代小说感兴趣。", use: "自我介绍" },
      { en: "As the application deadline is approaching, I would [[appreciate your reply]] at your earliest convenience.", zh: "由于申请截止日期临近，如能尽早回复我将不胜感激。", use: "说明紧迫" },
    ],
    closing: [
      { en: "Thank you for your help, and I [[look forward to]] hearing from you soon.", zh: "感谢您的帮助，期待尽快收到回复。", use: "感谢帮助" },
      { en: "Please let me know if you need any [[further information]] about my background or my studies.", zh: "如需关于我背景或学业的更多信息，请告知。", use: "补充信息" },
      { en: "I would be grateful if you could [[send me a brochure]] or a link to the online application.", zh: "如能发给我一份手册或在线申请链接，我将不胜感激。", use: "索要资料" },
    ],
  },
  congratulate: {
    opening: [
      { en: "I am writing to [[offer my warmest congratulations]] on your admission to the graduate programme at Peking University.", zh: "我写信热烈祝贺你被北京大学研究生项目录取。", use: "祝贺录取" },
      { en: "Please [[accept my heartfelt congratulations]] on winning first prize in the national translation contest.", zh: "请接受我对你获得全国翻译比赛一等奖的衷心祝贺。", use: "祝贺获奖" },
      { en: "Congratulations on [[completing your degree]] despite all the difficulties of the past two years.", zh: "祝贺你在过去两年的种种困难中顺利完成学业。", use: "祝贺毕业" },
    ],
    body: [
      { en: "This achievement is [[well deserved]], as you have spent two years preparing for the examination while completing your courses.", zh: "这一成就实至名归：两年来你在完成课程的同时备考。", use: "肯定努力" },
      { en: "I still remember the nights you [[studied in the library]] until it closed, and those quiet efforts have finally paid off.", zh: "我仍记得你在图书馆学到闭馆的夜晚，那些默默的努力终于有了回报。", use: "回忆细节" },
      { en: "I am sure you will [[bring the same dedication]] to your new role and achieve even more.", zh: "我相信你会把同样的投入带到新角色中，取得更大成就。", use: "展望未来" },
    ],
    closing: [
      { en: "I wish you [[even greater success]] in the years ahead, and I am sure there is much more to come.", zh: "祝你在未来几年取得更大成功，我相信还有更多成就等着你。", use: "祝愿未来" },
      { en: "I look forward to [[celebrating with you]] when we meet during the holiday.", zh: "期待假期见面时与你一同庆祝。", use: "期待庆祝" },
      { en: "Please [[accept my best wishes]] for your future study and work, and keep in touch.", zh: "请接受我对你未来学习与工作的美好祝愿，并保持联系。", use: "表达祝福" },
    ],
  },
  decline: {
    opening: [
      { en: "Thank you very much for your kind invitation to [[speak at the conference]] next month, which I genuinely appreciate.", zh: "非常感谢您邀请我在下个月的会议上发言，我由衷感激。", use: "婉拒邀请" },
      { en: "I am grateful for the [[opportunity you have offered me]], and I have thought about it carefully.", zh: "我很感激您给我提供的机会，并已认真考虑。", use: "婉拒录用" },
      { en: "Thanks for [[thinking of me]] when you planned the trip, and I am sorry that I cannot join you.", zh: "谢谢你策划旅行时想到我，很抱歉我不能同行。", use: "婉拒朋友" },
    ],
    body: [
      { en: "Unfortunately, I will [[be unable to attend]] because I have already committed to fieldwork in Yunnan during that period.", zh: "不幸的是，由于我已承诺那段时间在云南做田野调查，将无法出席。", use: "明确拒绝" },
      { en: "I fully understand the importance of the event, and I [[deeply regret]] that I cannot take part this time.", zh: "我完全理解这次活动的重要性，深表遗憾这次不能参加。", use: "表达遗憾" },
      { en: "I would be glad to [[recommend my colleague]] Dr. Liu, who has published extensively on this topic.", zh: "我很乐意推荐我的同事刘博士，他在该领域发表过大量成果。", use: "推荐替代" },
      { en: "I hope we will have another chance to [[work together]] on a similar project next year.", zh: "希望明年我们有机会在类似项目上合作。", use: "期待再合作" },
    ],
    closing: [
      { en: "I [[sincerely appreciate]] your trust, and I am sorry for any inconvenience my decision may cause.", zh: "我由衷感谢您的信任，也为我的决定可能带来的不便感到抱歉。", use: "感谢信任" },
      { en: "I hope our paths will cross again, and I [[wish you every success]] with the event.", zh: "希望我们再次相遇，并祝活动圆满成功。", use: "祝愿活动" },
      { en: "Please [[accept my apologies]] once more, and thank you for your patience and understanding.", zh: "请再次接受我的歉意，感谢您的耐心与理解。", use: "再次致歉" },
    ],
  },
  minutes: {
    opening: [
      { en: "These are the [[minutes of the meeting]] on 【主题】 held on 【日期】 in 【地点】.", zh: "以下是【日期】在【地点】召开的【主题】会议纪要。", use: "纪要标题" },
      { en: "The meeting [[took place]] from 【开始时间】 to 【结束时间】, and 【人数】 members attended.", zh: "会议于【开始时间】至【结束时间】举行，【人数】名成员出席。", use: "会议信息" },
      { en: "The chair opened the meeting by [[approving the previous minutes]] and outlining the main issues for discussion.", zh: "主席通过确认上次纪要并概述主要议题宣布会议开始。", use: "开场程序" },
    ],
    body: [
      { en: "The meeting [[focused on]] the organisation of 【活动】, especially the budget and the schedule of performances.", zh: "会议围绕【活动】的组织展开，尤其是预算与演出安排。", use: "讨论议题" },
      { en: "Members [[raised several concerns]] about publicity, and it was suggested that posters be placed in every dormitory.", zh: "成员就宣传提出若干关切，并建议在每栋宿舍楼张贴海报。", use: "讨论意见" },
      { en: "It was [[unanimously agreed]] that each department would submit its programme by 【日期】.", zh: "会议一致同意各部门于【日期】前提交节目单。", use: "第一项决议" },
      { en: "It was also decided that the publicity department would [[design the posters]] and promote the event on social media.", zh: "会议还决定由宣传部设计海报并在社交媒体上宣传。", use: "第二项决议" },
    ],
    closing: [
      { en: "The meeting [[came to a close]] at 【结束时间】, and the next meeting was fixed for 【日期】.", zh: "会议于【结束时间】结束，下次会议定于【日期】。", use: "结束时间" },
      { en: "These minutes will be [[circulated to]] all members, and any corrections should be reported before 【日期】.", zh: "本纪要将在全体成员中传阅，如有更正请于【日期】前反馈。", use: "分发纪要" },
      { en: "These minutes were [[taken by]] 【姓名】 and approved by the chair on 【日期】.", zh: "本纪要由【姓名】记录，并于【日期】经主席确认。", use: "记录与确认" },
    ],
  },
};
