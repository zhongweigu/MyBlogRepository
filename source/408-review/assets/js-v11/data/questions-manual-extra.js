/**
 * 原帖里没有被 <u>例题 标记、但确实完整的题目。
 * 这些题在源帖里是“练习”或“习题训练”，extract-questions.py 抓不到，
 * 由这里手工补；以后遇到同类“裸题”，先补脚本，补不了再放这里。
 */

export const MANUAL_EXTRA_QUESTIONS = [
  {
    id: 'q-manual-2010-deque',
    year: 2010,
    no: '',
    label: '例题',
    subject: 'ds',
    chapter: 'ds-2',
    topics: ['ds-2-2'],
    type: '选择',
    difficulty: 3,
    tags: ['双端队列', '输出受限'],
    stem: '某队列允许在其两端进行入队操作，但仅允许在一端进行出队操作。若元素 a, b, c, d, e 依次入此队列后再进行出队操作，则不可能得到的出队序列是：',
    options: [
      'b, a, c, d, e',
      'd, b, a, c, e',
      'd, b, c, a, e',
      'e, c, b, a, d',
    ],
    answer: 'C',
    analysis: `<p><strong>选 C。</strong> 只能在一端出队，所以出队序列就是最终队列内容。判据：从最大的 e 开始，每次看当前最大元素是否在剩余序列的两端，在就剥掉。</p>
      <ul><li>A：e 在右端 → d 在右端 → c 在右端 → b 在左端，合法。</li>
      <li>B：e 在右端 → d 在左端 → c 在右端，合法。</li>
      <li>C：e 在右端 → d 在左端 → 剩下 b, c, a，c 卡在中间，非法。</li>
      <li>D：e 在左端 → d 在右端 → c 在右端 → b 在右端，合法。</li></ul>`,
  },
  {
    id: 'q-manual-2025-loop',
    year: 2025,
    no: '',
    label: '练习',
    subject: 'ds',
    chapter: 'ds-1',
    topics: ['ds-1-1'],
    type: '综合',
    difficulty: 3,
    tags: ['复杂度', '循环', '平方根'],
    stem: '下列程序段的时间复杂度是：<pre class="code"><code>int count = 0;\nfor (int i = 1; i * i &lt;= n; i++)\n    for (int j = 1; j &lt;= i; j++)\n        count++;</code></pre>',
    analysis: `<p>外层条件是 <span class="fx">i² ≤ n</span>，所以 <span class="fx">i</span> 一共约 <span class="fx">√n</span> 轮；第 i 轮内层执行 i 次。</p>
      <p>总次数 <span class="fx">1+2+…+√n = √n(√n+1)/2</span>，取数量级得 <span class="fx">O(n)</span>。</p>`,
  },
  {
    id: 'q-manual-2014-loop',
    year: 2014,
    no: '',
    label: '例题',
    subject: 'ds',
    chapter: 'ds-1',
    topics: ['ds-1-1'],
    type: '综合',
    difficulty: 3,
    tags: ['复杂度', '嵌套循环'],
    stem: '下列程序段的时间复杂度是：<pre class="code"><code>count = 0;\nfor (k = 1; k &lt;= n; k *= 2)\n    for (j = 1; j &lt;= n; j++)\n        count++;</code></pre>',
    analysis: `<p>外层 <code>k *= 2</code>，执行 <span class="fx">⌈log₂n⌉</span> 轮；内层固定执行 n 次，且与外层变量无关，所以相乘得 <span class="fx">O(n log n)</span>。</p>`,
  },
  {
    id: 'q-manual-2022-loop',
    year: 2022,
    no: '',
    label: '例题',
    subject: 'ds',
    chapter: 'ds-1',
    topics: ['ds-1-1'],
    type: '综合',
    difficulty: 3,
    tags: ['复杂度', '嵌套循环', '等比数列'],
    stem: '下列程序段的时间复杂度是：<pre class="code"><code>int sum = 0;\nfor (int i = 1; i &lt; n; i *= 2)\n    for (int j = 0; j &lt; i; j++)\n        sum++;</code></pre>',
    analysis: `<p>外层 <span class="fx">i=1,2,4,…,2^k</span>，约 <span class="fx">log₂n</span> 轮；第 i 轮内层执行 i 次。</p>
      <p>总数 <span class="fx">1+2+4+…+2^k = 2^{k+1}−1 &lt; 2n</span>，所以 <span class="fx">T(n)=O(n)</span>。</p>`,
  },
  {
    id: 'q-manual-ex-1',
    year: null,
    no: '1',
    label: '习题',
    subject: 'ds',
    chapter: 'ds-1',
    topics: ['ds-1-1'],
    type: '综合',
    difficulty: 2,
    tags: ['复杂度', '并列循环'],
    stem: '下列算法的时间复杂度为：<pre class="code"><code>void fun(int n) {\n    for (int i = 1; i &lt; n; i *= 2)\n        for (int j = 0; j &lt; n; j++)\n            printf("A");\n    for (int i = 0; i &lt; n; i++)\n        for (int j = 0; j &lt; n; j++)\n            printf("B");\n}</code></pre>',
    analysis: `<p>两段循环是并列关系，工作量相加：前一段外层 <span class="fx">i *= 2</span> 是 <span class="fx">O(log n)</span>、内层 n 次，共 <span class="fx">O(n log n)</span>；后一段两层都跑满 n，共 <span class="fx">O(n²)</span>。取大的，所以 <span class="fx">T(n)=O(n²)</span>。</p>`,
  },
  {
    id: 'q-manual-ex-2',
    year: null,
    no: '2',
    label: '习题',
    subject: 'ds',
    chapter: 'ds-1',
    topics: ['ds-1-1'],
    type: '综合',
    difficulty: 2,
    tags: ['复杂度', '嵌套循环'],
    stem: '下列算法的时间复杂度为：<pre class="code"><code>void fun(int n) {\n    for (int i = 0; i &lt; n; i++)\n        for (int j = 1; j &lt; n; j *= 2)\n            printf("BOK!");\n}</code></pre>',
    analysis: `<p>内外层互相独立：外层 n 次，内层 <span class="fx">j *= 2</span> 共 <span class="fx">log₂n</span> 次，直接相乘得 <span class="fx">O(n log n)</span>。</p>`,
  },
  {
    id: 'q-manual-ex-3',
    year: null,
    no: '3',
    label: '习题',
    subject: 'ds',
    chapter: 'ds-1',
    topics: ['ds-1-2'],
    type: '综合',
    difficulty: 2,
    tags: ['复杂度', '递归'],
    stem: '下列算法的时间复杂度为：<pre class="code"><code>int fun(int n) {\n    if (n &lt;= 1)\n        return 1;\n    else\n        return fun(n - 1) + 1;\n}</code></pre>',
    analysis: `<p>单分支递归，每次 n 减 1，调用 n 次；每次调用做一次比较和一次加法，代价 <span class="fx">O(1)</span>。相乘得 <span class="fx">O(n)</span>。</p>`,
  },
  {
    id: 'q-manual-ex-4',
    year: null,
    no: '4',
    label: '习题',
    subject: 'ds',
    chapter: 'ds-1',
    topics: ['ds-1-1'],
    type: '综合',
    difficulty: 3,
    tags: ['复杂度', '层层制约'],
    stem: '下列算法的时间复杂度为：<pre class="code"><code>int count = 1;\nfor (int i = 1; i &lt;= n; i++) {\n    for (int j = 2 * i; j &lt;= n; j++)\n        count = count + j;\n}</code></pre>',
    analysis: `<p>外层 i 从 1 到 n；内层 j 从 2i 到 n，只有 <span class="fx">i ≤ n/2</span> 时才有内层，这一轮是 <span class="fx">n−2i+1</span> 次。</p>
      <p>求和 <span class="fx">Σ(n−2i+1) = n²/4</span>，所以 <span class="fx">T(n)=O(n²)</span>。</p>`,
  },
  {
    id: 'q-2015-coa-43',
    year: 2015,
    no: '43',
    label: '',
    subject: 'coa',
    chapter: 'coa-4',
    topics: ['coa-4-4'],
    type: '综合',
    difficulty: 5,
    score: '13 分',
    tags: ['数据通路', '单总线', '控制信号'],
    stem: `<p>某 16 位计算机的主存按字节编址，存取单位为 16 位；采用 16 位定长指令字格式；CPU 采用单总线结构，主要部分如下图所示。图中 R0～R3 为通用寄存器；T 为暂存器；SR 为移位寄存器，可实现直送（mov）、左移一位（left）、右移一位（right）3 种操作，控制信号为 SRop，SR 的输出由信号 SRout 控制；ALU 可实现直送 A（mova）、A 加 B（add）、A 减 B（sub）、A 与 B（and）、A 或 B（or）、非 A（not）、A 加 1（inc）7 种操作，控制信号为 ALUop。</p>
      <p><img alt="2015-43 单总线数据通路：R0~R3、T、SR、ALU、MUX、MAR、MDR、PC、IR 和主存通过内部总线连接" src="/408-review/assets/textbook/coa-2015-43-datapath.webp"></p>
      <p><img alt="2015-43 设问：程序员可见寄存器、T 的作用、ALUop/SRop 位数、SRout 控制部件、端点连线、MUX 输入 2" src="/408-review/assets/textbook/coa-2015-43-questions.webp"></p>`,
    analysis: `<p><strong>（1）程序员可见的是 R0～R3 和 PC。</strong> T 是 CPU 内部暂存器，程序员不可见。单总线同一拍只能送一个数据，而 ALU 需要两个操作数；T 先把一个操作数锁存住，ALU 再和总线上的另一个操作数运算，避免两个输入争用总线。</p>
      <p><strong>（2）ALUop 至少 3 位</strong>（7 种操作，$2^2<7\\le 2^3$）；<strong>SRop 至少 2 位</strong>（3 种操作，$2^1<3\\le 2^2$）。</p>
      <p><strong>（3）SRout 控制三态门</strong>：SRout=1 时把 SR 的输出接到内部总线，SRout=0 时断开，避免 SR 长期占用总线。</p>
      <p><strong>（4）①、②、③、⑤、⑧</strong> 应连接到控制部件的输出端；它们分别是 SRout、SRop、ALUop、Tin、MUXop 一类控制信号。</p>
      <p><strong>（5）需要补的两条连线是 ⑥→⑨、⑦→④。</strong> 端点 ⑥ 的数据送到 ⑨，端点 ⑦ 的数据送到 ④；方向按“起点→终点”写。</p>
      <p><strong>（6）MUX 的输入端 2 是常数 +2。</strong> 指令字长 16 位，主存按字节编址，一条指令占 2 个内存单元；顺序执行时下一条指令地址为 (PC)+2，所以 MUX 需要一路固定的 2 参与 PC 增量。</p>`,
  },
  {
    id: 'q-2015-coa-44',
    year: 2015,
    no: '44',
    label: '',
    subject: 'coa',
    chapter: 'coa-4',
    topics: ['coa-4-4', 'coa-4-5'],
    type: '综合',
    difficulty: 5,
    score: '12 分',
    tags: ['控制信号', '指令格式', '单总线'],
    stem: `<p>题 43 中描述的计算机如下图所示。为便于独立作答，这里附该 CPU 的单总线数据通路图。该机指令格式如题 44 图 b 所示，支持寄存器直接和寄存器间接两种寻址方式，寻址方式位分别为 0 和 1，通用寄存器 R0～R3 的编号分别为 0、1、2 和 3。</p>
      <p><img alt="2015-44 题 43 的单总线数据通路图" src="/408-review/assets/textbook/coa-2015-43-datapath.webp"></p>
      <p><img alt="2015-44 图 a：部分指令控制信号；图 b：16 位指令格式" src="/408-review/assets/textbook/coa-2015-44-control.webp"></p>
      <p><img alt="2015-44 图 b：指令格式，包含操作码、寻址方式位和寄存器编号" src="/408-review/assets/textbook/coa-2015-44-format.webp"></p>
      <p>请回答：<br>（1）该机的指令系统最多可定义多少条指令？<br>（2）若 inc、shl 和 sub 的操作码分别为 01H、02H 和 03H，写出 <code>inc R1</code>、<code>shl R2,R1</code>、<code>sub R3,(R1),R2</code> 的机器代码。<br>（3）写出图 a 中标号①～⑧处的控制信号或取值。<br>（4）<code>sub R1,R3,(R2)</code> 和 <code>inc R1</code> 的执行阶段至少各需要多少个时钟周期？</p>`,
    analysis: `<p><strong>（1）128 条。</strong> 指令字 16 位，操作码占 7 位，$2^7=128$。</p>
      <p><strong>（2）</strong> <code>inc R1</code> = <code>0240H</code>；<code>shl R2,R1</code> = <code>0488H</code>；<code>sub R3,(R1),R2</code> = <code>06EAH</code>。</p>
      <p><strong>（3）</strong> ① 0；② mov；③ mova；④ left；⑤ read；⑥ sub；⑦ mov；⑧ Srout。</p>
      <p><strong>（4）</strong> <code>sub R1,R3,(R2)</code> 的执行阶段至少 <strong>4 个时钟周期</strong>；<code>inc R1</code> 至少 <strong>2 个时钟周期</strong>。单总线每拍只能有一个输出源，取数、运算、写回不能压在同一拍。</p>`,
  },
  {
    id: 'q-2022-coa-43',
    year: 2022,
    no: '43',
    label: '',
    subject: 'coa',
    chapter: 'coa-4',
    topics: ['coa-4-4', 'coa-4-5'],
    type: '综合',
    difficulty: 5,
    score: '15 分',
    tags: ['数据通路', '控制信号', '标志位', 'GPRs'],
    stem: `<p>某 CPU 中部分数据通路如题 43 图所示，其中 GPRs 为通用寄存器组；FR 为标志寄存器，用于存放 ALU 产生的标志信息；带箭头虚线表示控制信号，如 Read、Write 分别表示主存读、主存写，MDRin 表示内部总线上数据写入 MDR，MDRout 表示 MDR 的内容送内部总线。</p>
      <p><img alt="2022-43 数据通路：MAR、MDR、PC、IR、Y、Z、ALU、FR、GPRs 与系统总线" src="/408-review/assets/textbook/coa-2022-43-datapath.webp"></p>
      <p><img alt="2022-43 设问：SF/OF 表达式、Y/Z 作用、GPRs 数量、取指控制信号序列、控制部件" src="/408-review/assets/textbook/coa-2022-43-questions.webp"></p>`,
    analysis: `<p><strong>（1）</strong> $SF=F_{15}$。加法溢出：$OF=A_{15}B_{15}\\overline{F_{15}}+\\overline{A_{15}}\\overline{B_{15}}F_{15}$。减法溢出：$OF=A_{15}\\overline{B_{15}}\\overline{F_{15}}+\\overline{A_{15}}B_{15}F_{15}$。</p>
      <p><strong>（2）</strong> 单总线同一拍只能传一个数据，而 ALU 需要两个输入；Y 锁存一个操作数，Z 锁存 ALU 的输出，下一拍再写回总线。这样既解决双输入，又避免 ALU 输出直接回总线形成组合逻辑环路。</p>
      <p><strong>（3）</strong> GPRs 最多 $2^4=16$ 个通用寄存器；rs、rd 来自 IR；rd 接地址译码器（选择写哪个寄存器），rs 接多路选择器（选择读哪个寄存器）。</p>
      <p><strong>（4）</strong> 取指阶段至少 <strong>7 个时钟周期</strong>：PCout、MARin → 发 Read、MDRin（主存读约 5 拍）→ MDRout、IRin → PC 增量。控制信号序列按“PC→MAR、Read、M→MDR、MDR→IR、PC+1”展开；单总线相邻操作不能同拍。</p>
      <p><strong>（5）</strong> 控制信号由控制单元（CU）产生；连到 CU 输入端的主要是 IR（操作码）和 FR（标志位），以及时钟/时序信号。ALU 的输出先送 FR 和 Z，不直接作为 CU 的控制输入。</p>`,
  },
];
