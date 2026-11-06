/**
 * 计算机组成原理原有考点的补充层
 * order 在这里统一重排，figures / questions / tables 只补 base 没有的部分。
 */

const fig = (name, caption) => ({
  src: `/408-review/assets/img/${name}`,
  caption,
});

export const COA_SUPPLEMENTS = {
  'coa-1-2': {
    order: 4,
    points: [
      {
        t: '平均 CPI 与流水线停顿',
        lead: '不同指令 CPI 不同就加权；有停顿时把停顿周期加进总周期。',
        body: `<p>若程序由 k 类指令组成，第 i 类有 N<sub>i</sub> 条、CPI<sub>i</sub>，则 <span class="fx">CPI = Σ(N<sub>i</sub>×CPI<sub>i</sub>)/N</span>。流水线、Cache 缺失等停顿要另加：<span class="fx">C = N×CPI<sub>ideal</sub> + 停顿周期</span>。</p>
        <p>比较“优化前后”时，指令数、CPI、主频三项要一起代入。主频提高但 CPI 上升，执行时间可能不变甚至变长。</p>`,
      },
    ],
    tables: [
      {
        title: '三个性能量一起变',
        head: ['变化', '对执行时间的影响'],
        rows: [
          ['主频↑，CPI 不变', '执行时间按比例下降'],
          ['主频↑，CPI↑', '可能抵消，甚至变慢'],
          ['指令数↓，CPI↑', '要重新代入，不能只看一项'],
          ['Cache 命中率↑', '停顿周期↓，实际 CPI↓'],
        ],
      },
    ],
  },

  'coa-2-1': {
    order: 2,
    points: [
      {
        t: '加法器：从全加器到先行进位',
        lead: '串行进位逐级传，先行进位用生成 / 传播信号并行算。',
        body: `<p>全加器输入 A、B、C<sub>in</sub>，输出 S 和 C<sub>out</sub>。串行进位加法器把 n 个全加器串起来，进位逐级传递，延迟 O(n)；并行进位（先行进位）用 <span class="fx">G<sub>i</sub>=A<sub>i</sub>B<sub>i</sub></span>、<span class="fx">P<sub>i</sub>=A<sub>i</sub>⊕B<sub>i</sub></span> 提前算出各级进位，延迟降到 O(log n) 量级。</p>
        <p>408 常考“进位延迟”“组内并行、组间串行”的折中，不会要求画完整电路。</p>`,
      },
      {
        t: '补码加减与四个标志位',
        lead: '加法器只做加法；减法变成加相反数，溢出和进位不是一回事。',
        body: `<p>补码减法 <span class="fx">[A−B]<sub>补</sub>=[A]<sub>补</sub>+[−B]<sub>补</sub></span>，<span class="fx">[−B]<sub>补</sub></span> 是 B 各位取反再加 1。加法器输出后产生标志位：ZF 结果为零、SF 结果符号位、CF 无符号进位 / 借位、OF 有符号溢出。</p>
        <p>溢出判断：双符号位 01 正溢、10 负溢；或看“最高位进位”与“符号位进位”是否不同。无符号数看 CF，有符号数看 OF。</p>`,
        figures: [
          fig('add-sub-flags.webp', '补码加减与标志位：加法器统一做加法，减法通过加相反数实现；CF、OF、SF、ZF 各有不同含义。'),
        ],
      },
    ],
    tables: [
      {
        title: '加法器类型',
        head: ['类型', '进位方式', '延迟', '特点'],
        rows: [
          ['串行进位', '逐级传递', 'O(n)', '简单、慢'],
          ['先行进位', '并行生成 / 传播', 'O(log n)', '快、硬件多'],
          ['组内并行、组间串行', '分组折中', '介于两者', '408 常见'],
        ],
      },
    ],
  },

  'coa-2-2': { order: 4 },
  'coa-2-3': { order: 5 },
  'coa-2-4': { order: 6, questions: ['q-2024-coa-type'] },
  'coa-2-5': { order: 7 },

  'coa-3-1': {
    hidePoints: ['SRAM vs DRAM', 'ROM 与 Flash'],
  },

  'coa-3-2': {
    order: 3,
    figures: [
      fig('memory-word-bit-expansion.webp', '主存芯片的字位扩展：位扩展增加字长，字扩展增加容量，片选由高位地址译码产生。'),
      fig('bank-time-diagram.webp', '多体交叉存储器的时间图：连续地址分散到不同体，流水线式并行访问，提高连续访问带宽。'),
    ],
  },

  'coa-3-3': {
    order: 5,
    figures: [
      fig('address-division-views.webp', '同一段地址在不同问题里有不同的字段划分：Cache 看 Tag / 索引 / 块内偏移，虚拟存储看虚页号 / 页内地址。'),
    ],
  },

  'coa-3-4': {
    order: 6,
    points: [
      {
        t: '数组访问与 Cache 命中率',
        lead: '按行访问利用空间局部性，按列访问可能每次缺失。',
        body: `<p>二维数组按行优先存放。程序 A 按行遍历，一个块调入后连续访问块内多个元素，命中率高；程序 B 按列遍历，相邻访问跨过整行，若 Cache 行数不足以容纳一行，可能每次都被替换出去，命中率骤降。</p>
        <p>2010 年那道题：块 64B、int 4B，每块 16 个元素；8 行 Cache，一行 256 个 int 占 16 个块。按行命中率 15/16，按列命中率 0。</p>`,
      },
    ],
  },

  'coa-3-5': {
    order: 7,
    figures: [
      fig('coa-address-path.svg', '一条地址的完整旅程：VA 拆虚页号和偏移，TLB 命中直接得页框号，未命中查页表，拼成 PA 后再拆 Cache 的 Tag / 索引 / 块内偏移。'),
      fig('tlb-cache-access-path.webp', 'TLB 与 Cache 的访问路径：先查 TLB 做虚实转换，再用物理地址查 Cache；TLB 缺失查页表，缺页才由 OS 调入页面。'),
      fig('virtual-memory-address-translation.webp', '虚拟地址到物理地址的转换：虚页号查页表得到页框号，页内偏移保持不变。'),
    ],
  },

  'coa-4-1': {},
  'coa-4-2': {
    figures: [
      fig('call-stack-frame.webp', '函数调用的栈帧：参数、返回地址、旧 EBP、局部变量按调用约定排列；call / ret 与 push / pop 改变 ESP。'),
    ],
  },
  'coa-4-3': {
    order: 5,
    figures: [
      fig('coa-pipeline.svg', '五段流水线的时空图：k=5、n=5，总时间 9Δt，理想加速比 25/9≈2.78；每个周期有一条指令进入、一条离开。'),
    ],
  },
  'coa-5-1': {},
  'coa-5-2': {},
};
