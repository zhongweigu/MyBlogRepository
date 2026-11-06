/**
 * 术语库
 * - CORE_TERMS：跨章节最常被问到的核心词，手写定义。
 * - 其余从 52 个考点的 points 自动抽取：术语用知识点标题，释义用一句线索。
 * 不另做英文版；保留中文术语和必要的英文缩写。
 */

import { TOPICS, CHAPTERS } from './index.js';

export const CORE_TERMS = [
  { term: '时间复杂度', def: '算法执行时间随问题规模增长的数量级；只保留最高阶，忽略常数和低阶项。', topic: 'ds-1-1', kind: '核心' },
  { term: '卡特兰数', def: 'n 个元素固定入栈顺序时合法出栈序列的数目，Cₙ = 1/(n+1)·C(2n,n)；先序固定的二叉树棵数也是它。', topic: 'ds-2-6', kind: '核心' },
  { term: '循环队列', def: '用取模把顺序队列的首尾接起来，解决假溢出；front 与 rear 相遇时要靠牺牲单元、size 或 tag 区分空满。', topic: 'ds-2-2', kind: '核心' },
  { term: '线索二叉树', def: '利用二叉链表 n+1 个空链域存放中序前驱/后继；ltag/rtag 为 1 时指针是线索。', topic: 'ds-3-2', kind: '核心' },
  { term: '哈夫曼编码', def: '按字符频率构造最优前缀编码；WPL 最小，译码无歧义。', topic: 'ds-3-4', kind: '核心' },
  { term: '并查集', def: '用双亲表示维护不相交集合，支持 find / union；路径压缩 + 按秩合并接近常数时间。', topic: 'ds-3-4', kind: '核心' },
  { term: '最小生成树', def: '连通无向图中边权和最小的生成树；Prim 选点适合稠密图，Kruskal 选边适合稀疏图。', topic: 'ds-4-3', kind: '核心' },
  { term: '关键路径', def: 'AOE 网中源点到汇点的最长路径；e = l 的活动为关键活动，长度等于工期。', topic: 'ds-4-4', kind: '核心' },
  { term: '平衡因子', def: 'AVL 中结点左子树高度减右子树高度；每个结点的 BF 只能是 −1、0、1。', topic: 'ds-5-2', kind: '核心' },
  { term: 'B 树', def: '多路平衡查找树；m 阶 B 树每个结点最多 m 棵子树、m−1 个关键字，非根至少 ⌈m/2⌉ 棵子树。', topic: 'ds-5-3', kind: '核心' },
  { term: 'B+ 树', def: '内部结点只存索引，所有关键字和记录指针在叶子，叶子按顺序链接；查找必须到叶子。', topic: 'ds-5-3', kind: '核心' },
  { term: '散列表', def: '用散列函数把关键字映射到地址；ASL 取决于装填因子和冲突处理方法，不直接看 n、m 的绝对值。', topic: 'ds-5-3', kind: '核心' },
  { term: '装填因子', def: 'α = n/m，表中关键字数除以散列表长度；α 越大，冲突概率通常越高。', topic: 'ds-5-3', kind: '核心' },
  { term: '排序稳定性', def: '排序前后相等关键字的相对次序不变；插入、冒泡、归并、基数稳定，快排、选择、堆排序不稳定。', topic: 'ds-6-2', kind: '核心' },
  { term: '最佳归并树', def: '把初始归并段长度当权值构造 k 叉哈夫曼树，使 WPL（读写量）最小；不足 k 个时补长度为 0 的虚段。', topic: 'ds-6-3', kind: '核心' },
  { term: '败者树', def: 'k 路归并中记录“败者”的完全二叉树，每次只需 O(log k) 次比较就能选出最小段首。', topic: 'ds-6-3', kind: '核心' },
  { term: '补码', def: 'n 位补码按最高位负权展开：V = −bₙ₋₁2ⁿ⁻¹ + Σbᵢ2ⁱ；加减统一，0 唯一。', topic: 'coa-2-1', kind: '核心' },
  { term: '移码', def: '真值加偏置得到的编码，常用于阶码；普通 n 位移码偏置为 2ⁿ⁻¹。', topic: 'coa-2-6', kind: '核心' },
  { term: 'IEEE 754', def: '浮点数标准：1 位符号 + 阶码（偏置 2ᵏ⁻¹−1）+ 尾数；规格化数有隐藏的 1。', topic: 'coa-2-2', kind: '核心' },
  { term: '阶码与尾数', def: '阶码决定数量级，尾数决定有效数字；对阶时小阶向大阶看齐，尾数右移。', topic: 'coa-2-3', kind: '核心' },
  { term: '大小端', def: '多字节数据在内存中的字节顺序；小端低字节在低地址，大端高字节在低地址。', topic: 'coa-2-4', kind: '核心' },
  { term: '边界对齐', def: '数据地址按自身大小对齐，结构体成员间可能填充；用空间换访问效率。', topic: 'coa-2-4', kind: '核心' },
  { term: 'Cache', def: '位于 CPU 与主存之间的小容量高速 SRAM，利用时间/空间局部性减少平均访存时间。', topic: 'coa-3-3', kind: '核心' },
  { term: '直接映射', def: '主存块只能放到唯一 Cache 行：行号 = 块号 mod 行数；冲突高但硬件简单。', topic: 'coa-3-3', kind: '核心' },
  { term: '组相联', def: 'Cache 分组，组间直接映射、组内全相联；索引位数按组数算，组内行数决定替换位。', topic: 'coa-3-3', kind: '核心' },
  { term: '写回与全写', def: '写回：只写 Cache，置脏位，替换时写回主存；全写：同时写 Cache 和主存，常配写缓冲。', topic: 'coa-3-4', kind: '核心' },
  { term: 'TLB', def: '页表的 Cache，缓存 VPN→PFN 的最近映射；TLB 命中只省地址转换，不代表数据在 Cache。', topic: 'coa-3-5', kind: '核心' },
  { term: '页表', def: '虚拟页号到物理页框号的映射表；页表项含有效位、脏位、访问位和保护位。', topic: 'coa-3-5', kind: '核心' },
  { term: '缺页', def: '访问的页面不在主存，CPU 产生缺页异常，由 OS 选页框、调页、更新页表后重新执行。', topic: 'coa-3-5', kind: '核心' },
  { term: 'AMAT', def: '平均访存时间：先 Cache 后主存用 T_c + (1−H)T_m；同时访问用 H·T_c + (1−H)T_m。', topic: 'coa-3-4', kind: '核心' },
  { term: 'CPI', def: '每条指令平均时钟周期数；不同指令加权，流水线停顿时把停顿周期另加。', topic: 'coa-1-2', kind: '核心' },
  { term: 'MIPS', def: '每秒百万条指令：f / (CPI × 10⁶)；只在指令集、编译器、程序特征相近时可比。', topic: 'coa-1-2', kind: '核心' },
  { term: '指令流水线', def: '把指令执行拆成若干段重叠执行；理想 CPI=1，总时间 (k+n−1)Δt，加速比上限 k。', topic: 'coa-4-3', kind: '核心' },
  { term: '流水线级别', def: '部件功能级（运算器内部）、处理机级（指令流水）、处理器间级（多机宏流水）三种粒度。', topic: 'coa-4-3', kind: '核心' },
  { term: '静态 / 动态流水线', def: '静态流水线同一时刻各段只执行一种功能；动态流水线各段可同时执行不同功能，允许一条流水线里出现多种运算。', topic: 'coa-4-3', kind: '核心' },
  { term: '线性 / 非线性流水线', def: '线性流水线各段顺序连接、无反馈；非线性流水线有反馈或循环回路，同一段可能被多次使用。', topic: 'coa-4-3', kind: '核心' },
  { term: '超标量', def: '每个时钟周期发射多条相互独立的指令，配多套功能部件；理想 CPI 可小于 1，靠硬件动态调度或编译器静态调度。', topic: 'coa-4-3', kind: '核心' },
  { term: '超流水线', def: '把每个流水段再细分，一个时钟周期内一个功能部件使用多次；主频更高、流水线更深，冒险和开销也更多。', topic: 'coa-4-3', kind: '核心' },
  { term: '超长指令字 VLIW', def: '编译器把多条可并行操作拼成一条超长指令，指令内有多个操作码字段；硬件简单，靠编译器挖并行，代码膨胀。', topic: 'coa-4-3', kind: '核心' },
  { term: 'SISD / SIMD / MISD / MIMD', def: '按指令流和数据流分类：SISD 单指令单数据、SIMD 单指令多数据、MISD 多指令单数据（基本不存在）、MIMD 多指令多数据。', topic: 'coa-4-6', kind: '核心' },
  { term: 'SMP', def: '共享内存多处理器：多个处理器共享一个主存和单一地址空间，都能用 load/store 访问共享变量；分 UMA / NUMA。', topic: 'coa-4-6', kind: '核心' },
  { term: '多核处理器', def: '一个 CPU 芯片内集成多个核，每个核有独立执行资源，通常共享最后一级 Cache 和主存；核间通过共享内存通信。', topic: 'coa-4-6', kind: '核心' },
  { term: '向量处理器', def: 'SIMD 思想的进阶，一条指令处理一个向量；主存常采用多端口/多模块交叉，配向量寄存器组。', topic: 'coa-4-6', kind: '核心' },
  { term: '细粒度 / 粗粒度多线程', def: '细粒度每个时钟轮换线程，粗粒度遇到长停顿才切换；两者同一时刻只有一个线程占用流水线，不是真正并行。', topic: 'coa-4-6', kind: '核心' },
  { term: '同时多线程 SMT', def: '每个周期同时发射多个线程的指令，共享一套流水线但多个线程同时在途；需要更多寄存器和重命名资源。', topic: 'coa-4-6', kind: '核心' },
  { term: '结构冒险', def: '多条指令争用同一硬件部件；靠分离 Cache、增加端口或停顿解决。', topic: 'coa-4-3', kind: '核心' },
  { term: '数据冒险', def: '后一条指令依赖前一条结果；靠转发/旁路，load-use 必须停顿一拍。', topic: 'coa-4-3', kind: '核心' },
  { term: '控制冒险', def: '分支方向未定导致下一条指令不确定；靠分支预测、延迟槽、提前比较解决。', topic: 'coa-4-3', kind: '核心' },
  { term: '数据通路', def: '数据在 CPU 各部件之间流动的路径，由组合逻辑（运算、选择、译码）和状态元件（寄存器、触发器）交替组成。', topic: 'coa-4-4', kind: '核心' },
  { term: '组合逻辑元件', def: '输出只取决于当前输入、不带记忆的元件，如 MUX、加法器、ALU、译码器；输入变化后经门延迟输出才稳定。', topic: 'coa-4-4', kind: '核心' },
  { term: '状态元件', def: '带记忆的元件，如触发器 / 寄存器；只在时钟有效边沿写入，写入后保持到下一个边沿。', topic: 'coa-4-4', kind: '核心' },
  { term: '时钟周期', def: '相邻状态元件之间完成一次“输出→组合逻辑→建立”的最小时间；由关键路径决定，Tclk ≥ Tcq + Tcomb,max + Tsetup。', topic: 'coa-4-4', kind: '核心' },
  { term: '建立时间', def: '时钟有效边沿到来前，输入必须保持稳定的最短时间；不满足会采样到不稳定值。', topic: 'coa-4-4', kind: '核心' },
  { term: '保持时间', def: '时钟有效边沿到来后，输入仍需保持稳定的最短时间；不满足会使新值过快冲掉旧值。', topic: 'coa-4-4', kind: '核心' },
  { term: '单总线数据通路', def: '所有部件共用一条内部总线；同一拍只能有一个输出源，ALU 双输入靠 Y 暂存，结果靠 Z 暂存。', topic: 'coa-4-4', kind: '核心' },
  { term: '控制信号', def: '控制数据通路各部件“何时输出、何时写入、做什么操作”的信号，如 Xout/Xin、Read/Write、ALUop、SRop、MUXop。', topic: 'coa-4-4', kind: '核心' },
  { term: '三态门', def: '受控制信号控制、可把输出置为高阻的门；用于把部件选择性地接到总线上，避免总线冲突。', topic: 'coa-4-4', kind: '核心' },
  { term: '暂存器 Y / Z', def: '单总线数据通路中锁存 ALU 一个输入（Y）和 ALU 输出（Z）的寄存器，解决双输入和结果回写问题。', topic: 'coa-4-4', kind: '核心' },
  { term: '程序可见寄存器', def: '程序员能通过指令访问或感知的寄存器，如 GPRs、PC、PSW/FR；MAR、MDR、IR、Y/Z 等通常不可见。', topic: 'coa-4-4', kind: '核心' },
  { term: '微命令', def: '控制部件发出的最小控制信号，例如打开某个寄存器输出、ALU 做某种运算。', topic: 'coa-4-5', kind: '核心' },
  { term: '微操作', def: '执行部件收到微命令后完成的最基本操作；微命令是“信号”，微操作是“动作”。', topic: 'coa-4-5', kind: '核心' },
  { term: '微指令', def: '一个时钟周期内同时发出的一组微命令，通常分操作控制字段和顺序控制字段。', topic: 'coa-4-5', kind: '核心' },
  { term: '微周期', def: '从控制存储器取出一条微指令并执行完所需的时间。', topic: 'coa-4-5', kind: '核心' },
  { term: '控制存储器 CM', def: '存放微程序的只读存储器；按微地址寻访，一个单元存一条微指令，位数等于微指令字长。', topic: 'coa-4-5', kind: '核心' },
  { term: 'CMAR / μPC', def: '微地址寄存器，接收微地址形成部件送来的微地址，为从 CM 读微指令做准备；类比主存的 MAR。', topic: 'coa-4-5', kind: '核心' },
  { term: 'CMDR / μIR', def: '微指令寄存器，存放从 CM 取出的当前微指令；位数等于微指令字长，类比主存的 IR。', topic: 'coa-4-5', kind: '核心' },
  { term: '微地址形成部件', def: '根据机器指令操作码、微程序入口、顺序逻辑和标志，形成初始或后继微地址。', topic: 'coa-4-5', kind: '核心' },
  { term: '水平型微指令', def: '并行控制信号多、微指令长、微程序短、执行快；垂直型相反，控制信号少、需译码、微程序长。', topic: 'coa-4-5', kind: '核心' },
  { term: '字段直接编码', def: '把互斥微命令分在同一段、相容的分在不同段，段内编码后再译码；n 个互斥微命令通常需 ceil(log2(n+1)) 位。', topic: 'coa-4-5', kind: '核心' },
  { term: '断定方式', def: '下一条微指令地址由微指令的下址字段直接给出，或按条件码在多个候选地址中选择；区别于增量 +1。', topic: 'coa-4-5', kind: '核心' },
  { term: '微程序', def: '把控制信号编成微指令存在控制存储器；微程序控制器灵活但比硬布线慢。', topic: 'coa-4-5', kind: '核心' },
  { term: '总线', def: '连接 CPU、主存、I/O 的共享传输通路；分地址、数据、控制三组，需仲裁和时序。', topic: 'coa-5-1', kind: '核心' },
  { term: '总线分时 / 共享', def: '多个部件共享同一组信号线；同一时刻只能有一个主设备驱动，其他设备等待，所以需要仲裁。', topic: 'coa-5-1', kind: '核心' },
  { term: '总线事务', def: '一次完整总线操作，通常分地址传送、设备响应/数据准备、数据传送三个阶段；可跨多个时钟周期。', topic: 'coa-5-2', kind: '核心' },
  { term: '突发传输', def: '只送一次首地址，连续传送多个数据，地址自动递增；减少地址开销，适合 Cache 行/成块数据。', topic: 'coa-5-2', kind: '核心' },
  { term: '同步 / 异步串行', def: '同步串行有共享时钟线，按同一时钟采样；异步串行无共享时钟，用起始位/停止位定界，按约定波特率采样。', topic: 'coa-5-2', kind: '核心' },
  { term: '同步定时', def: '所有设备按统一时钟节拍动作；控制简单、速度快，但受最慢设备和时钟偏斜限制，慢设备可插等待。', topic: 'coa-5-2', kind: '核心' },
  { term: '不互锁 / 半互锁 / 全互锁', def: '异步握手的三档：不互锁不等应答；半互锁一方不等待撤销；全互锁双方都等对方撤销后才结束。', topic: 'coa-5-2', kind: '核心' },
  { term: '半同步定时', def: '同步时钟 + WAIT/应答，慢设备可插入等待周期；兼顾同步的简单和异步的灵活。', topic: 'coa-5-2', kind: '核心' },
  { term: '分离式事务', def: '主设备发完请求/地址后释放总线，数据阶段再申请；提高总线利用率，但单次事务延迟和复杂度增加。', topic: 'coa-5-2', kind: '核心' },
  { term: '南北桥', def: '北桥靠近 CPU，连接主存、显卡等高速部件；南桥连接 USB、SATA、音频等低速 I/O。', topic: 'coa-5-2', kind: '核心' },
  { term: '总线带宽 / 工作频率', def: '带宽 = 宽度 × 工作频率（每秒传送次数）；工作频率可能等于时钟频率除以每个总线周期的时钟数。', topic: 'coa-5-1', kind: '核心' },
  { term: 'DMA', def: 'DMA 控制器直接在主存与设备间搬运数据，CPU 只在开始/结束介入；适合成块高速 I/O。', topic: 'coa-6-2', kind: '核心' },
  { term: 'I/O 接口', def: 'CPU 与设备之间的缓冲/翻译部件：数据缓冲、状态/控制寄存器、地址译码、设备界面控制逻辑。', topic: 'coa-6-1', kind: '核心' },
  { term: 'I/O 端口', def: '接口中可被 CPU 直接访问的寄存器（数据/状态/控制端口）；端口是接口的一部分，不等于整个接口。', topic: 'coa-6-1', kind: '核心' },
  { term: '独立编址 / 统一编址', def: '独立编址用 IN/OUT 和独立 I/O 空间；统一编址把端口和主存统一编址，用 load/store 访问并占用主存地址空间。', topic: 'coa-6-1', kind: '核心' },
  { term: '程序查询', def: 'CPU 不断读设备状态，未就绪就循环等待；控制简单，但 CPU 与外设串行，利用率低。', topic: 'coa-6-2', kind: '核心' },
  { term: '中断向量', def: '中断服务程序的入口地址；CPU 用中断类型号查向量表得到它，类型号本身不是入口地址。', topic: 'coa-6-3', kind: '核心' },
  { term: '多重中断 / 屏蔽字', def: '硬件排队决定响应顺序；屏蔽字 0 允许、1 屏蔽，决定进入服务程序后能否被更高处理优先级的中断嵌套。', topic: 'coa-6-3', kind: '核心' },
  { term: '中断隐指令', def: '响应中断时由硬件自动完成的一组操作：关中断、保存断点等；不是一条真正的机器指令。', topic: 'coa-6-3', kind: '核心' },
  { term: '中断请求 / 应答', def: '设备经中断控制器向 CPU 发 INTR；CPU 用 INTA 应答并取得类型号，控制器按优先级/屏蔽选请求。', topic: 'coa-6-3', kind: '核心' },
  { term: '断点', def: '中断返回后继续执行的地址；外中断保存的是下一条指令地址，故障异常保存的是当前指令地址。', topic: 'coa-6-3', kind: '核心' },
  { term: '中断返回地址', def: '外中断返回下一条指令；故障返回当前指令重试；陷阱返回下一条；终止不返回。', topic: 'coa-6-3', kind: '核心' },
  { term: '中断嵌套', def: '高处理优先级中断打断当前服务程序；按栈后进先出，高优先级先返回，再回到被打断的服务程序。', topic: 'coa-6-3', kind: '核心' },
  { term: 'DMA 流程', def: 'CPU 预处理（AR/DAR/WC）→ DMA 申请总线并传送（地址+1、计数−1）→ 结束时中断 CPU 做后处理。', topic: 'coa-6-2', kind: '核心' },
  { term: 'DMA 块传输 / 单字传输', def: '块传输是总任务规模；单字传输（周期挪用）是每次占用总线的粒度，块传输通常由多次单字传送组成。', topic: 'coa-6-2', kind: '核心' },
  { term: 'RAID', def: '用条带化、镜像或校验把多块磁盘组织成逻辑盘；RAID 0 无冗余，1 镜像，5 分布式校验。', topic: 'coa-3-7', kind: '核心' },
];

const clean = (value) => String(value || '')
  .replace(/<[^>]+>/g, '')
  .replace(/\s+/g, ' ')
  .trim();

const chapterOrder = new Map(CHAPTERS.map((chapter, index) => [chapter.id, index]));
const topicChapter = new Map(TOPICS.map((topic) => [topic.id, topic.chapter]));
const core = CORE_TERMS.map((item) => ({
  ...item,
  chapter: item.chapter || topicChapter.get(item.topic) || '',
}));

const auto = [];
for (const topic of TOPICS) {
  auto.push({
    term: clean(topic.title),
    def: clean(topic.takeaway),
    topic: topic.id,
    chapter: topic.chapter,
    kind: '考点',
  });
  for (const point of topic.points || []) {
    const term = clean(point.t);
    if (!term) continue;
    auto.push({
      term,
      def: clean(point.lead),
      topic: topic.id,
      chapter: topic.chapter,
      kind: '知识点',
    });
  }
}

const seen = new Set();
export const GLOSSARY = [...core, ...auto]
  .filter((item) => {
    if (!item.term || !item.topic) return false;
    const key = `${item.term}::${item.topic}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  })
  .sort((a, b) => {
    if (a.kind === '核心' && b.kind !== '核心') return -1;
    if (a.kind !== '核心' && b.kind === '核心') return 1;
    const ca = chapterOrder.get(a.chapter) ?? 999;
    const cb = chapterOrder.get(b.chapter) ?? 999;
    if (ca !== cb) return ca - cb;
    return a.term.localeCompare(b.term, 'zh');
  });

export const GLOSSARY_COUNT = GLOSSARY.length;
