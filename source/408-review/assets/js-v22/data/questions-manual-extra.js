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
  {
    id: 'q-2010-coa-21',
    year: 2010,
    no: '21',
    label: '真题',
    subject: 'coa',
    chapter: 'coa-6',
    topics: ['coa-6-3'],
    type: '选择',
    difficulty: 2,
    score: '2 分',
    tags: ['中断服务程序', '单级中断', '执行顺序'],
    stem: '单级中断系统中，中断服务程序内的执行顺序是：<br>I. 保护现场<br>II. 开中断<br>III. 关中断<br>IV. 保存断点<br>V. 中断事件处理<br>VI. 恢复现场<br>VII. 中断返回',
    options: ['I→V→VI→II→VII', 'III→I→V→VI→VII', 'III→IV→V→VI→VII', 'IV→I→V→VI→VII'],
    answer: 'A',
    analysis: `<p><strong>选 A。</strong> 这里要区分“广义的中断服务程序”和“狭义的中断事件处理”：</p>
      <ul>
      <li><strong>广义</strong>：从进入中断服务程序开始，包括保护现场（I）、中断事件处理（V）、恢复现场（VI）、开中断（II）、中断返回（VII）。</li>
      <li><strong>狭义</strong>：只指其中的“中断事件处理”（V），它是广义服务程序里的一个环节。</li>
      </ul>
      <p>III 关中断、IV 保存断点属于<strong>中断隐指令</strong>，在进入服务程序之前由硬件完成，不算“服务程序内”的步骤，所以 B、C、D 都把响应阶段混进来了。</p>
      <p>单级中断不允许多重嵌套，服务程序处理期间保持关中断；直到恢复现场后，才开中断并中断返回。因此顺序是 I→V→VI→II→VII。</p>`,
  },
  {
    id: 'q-2011-coa-19',
    year: 2011,
    no: '19',
    label: '真题',
    subject: 'coa',
    chapter: 'coa-4',
    topics: ['coa-4-1', 'coa-6-3'],
    type: '选择',
    difficulty: 2,
    score: '2 分',
    tags: ['指令周期', '空操作', '中断响应'],
    stem: '假定不采用 Cache 和指令预取技术，且机器处于“开中断”状态。在下列有关指令执行的叙述中，错误的是：',
    options: [
      '每个指令周期中 CPU 都至少访问内存一次',
      '每个指令周期一定大于等于一个 CPU 时钟周期',
      '空操作指令的指令周期中任何寄存器的内容都不会被改变',
      '当前程序在每条指令执行结束时都可能被外部中断打断',
    ],
    answer: 'C',
    analysis: `<p><strong>选 C。</strong> 逐项看：</p>
      <ul>
      <li><strong>A 对</strong>：没有 Cache、没有指令预取，取指必须访问主存取指令，所以每个指令周期至少访问内存一次。</li>
      <li><strong>B 对</strong>：一个指令周期由若干时钟周期组成，至少一个时钟周期。</li>
      <li><strong>C 错</strong>：空操作指令虽然不做运算，但取指后 <strong>PC 仍要增量</strong>，MAR、MDR、IR 等寄存器也会参与取指；说“任何寄存器都不改变”太绝对。</li>
      <li><strong>D 对</strong>：开中断时，CPU 在每条指令执行结束时检查中断请求，有可能响应外部中断；“可能”不是“一定”。</li>
      </ul>`,
  },
  {
    id: 'q-2011-coa-21',
    year: 2011,
    no: '21',
    label: '真题',
    subject: 'coa',
    chapter: 'coa-6',
    topics: ['coa-6-3'],
    type: '选择',
    difficulty: 2,
    score: '2 分',
    tags: ['中断屏蔽字', '中断优先级'],
    stem: '某计算机有五级中断 L4～L0，中断屏蔽字为 M4M3M2M1M0，Mi=1（0≤i≤4）表示对 Li 级中断进行屏蔽。若中断响应优先级从高到低的顺序是 L4→L0→L2→L1→L3，则 <strong>L1</strong> 的中断处理程序中设置的中断屏蔽字是：',
    options: ['11110', '01101', '00011', '01010'],
    answer: 'D',
    analysis: `<p><strong>选 D。</strong> 在 L1 的服务程序中：</p>
      <ul>
      <li>比 L1 响应优先级高的有 L4、L0、L2，应允许它们打断，所以 M4=0、M0=0、M2=0。</li>
      <li>L1 自己不能再嵌套自己，M1=1。</li>
      <li>L3 比 L1 低，应屏蔽，M3=1。</li>
      </ul>
      <p>按 M4 M3 M2 M1 M0 排列就是 <strong>0 1 0 1 0</strong>，即 01010。</p>
      <p>易错：题目问的是 L1，不是 L4；若问 L4（最高响应优先级），则应屏蔽所有更低级及自身，不能套本题答案。</p>`,
  },
  {
    id: 'q-io-bus-data-lines',
    year: null,
    no: '',
    label: '选择',
    subject: 'coa',
    chapter: 'coa-5',
    topics: ['coa-5-2', 'coa-6-1'],
    type: '选择',
    difficulty: 2,
    tags: ['I/O 总线', '数据线', '命令字', '状态字', '中断类型号'],
    stem: '下列选项中，在 I/O 总线的数据线上传输的信息包括：<br>I. I/O 接口中的命令字<br>II. I/O 接口中的状态字<br>III. 中断类型号',
    options: ['仅 I、II', '仅 I、III', '仅 II、III', 'I、II、III'],
    answer: 'D',
    analysis: `<p><strong>选 D。</strong> I/O 总线的数据线不只传“纯数据”，CPU 与接口之间的命令字、接口返回的状态字、中断控制器送来的中断类型号，都要经过数据线传送：</p>
      <ul>
      <li><strong>命令字</strong>：CPU 写到接口的控制端口，告诉接口启动、允许中断等。</li>
      <li><strong>状态字</strong>：接口送到 CPU，表示就绪、忙、错误等。</li>
      <li><strong>中断类型号</strong>：CPU 响应中断时，中断控制器通过数据线送类型号，CPU 再用它查中断向量表。</li>
      </ul>
      <p>地址线负责送端口地址/设备选择；控制线负责读/写、中断请求/应答、总线请求/授权等。不要把“数据线”理解成只传用户数据。</p>`,
  },
  {
    id: 'q-2012-coa-22',
    year: 2012,
    no: '22',
    label: '真题',
    subject: 'coa',
    chapter: 'coa-6',
    topics: ['coa-6-3'],
    type: '选择',
    difficulty: 2,
    score: '2 分',
    tags: ['中断隐指令', '中断响应'],
    stem: '响应外部中断的过程中，中断隐指令完成的操作，除保护断点外，还包括：<br>I. 关中断<br>II. 保存通用寄存器的内容<br>III. 形成中断服务程序入口地址并送 PC',
    options: ['仅 I、II', '仅 I、III', '仅 II、III', 'I、II、III'],
    answer: 'B',
    analysis: `<p><strong>选 B。</strong> 中断隐指令由硬件完成：关中断（I）、保存断点、形成服务程序入口并送 PC（III）。</p>
      <p>通用寄存器的内容由<strong>中断服务程序</strong>用指令压栈保护（II 不属于隐指令）。所以选“仅 I、III”。</p>`,
  },
  {
    id: 'q-2014-coa-21',
    year: 2014,
    no: '21',
    label: '真题',
    subject: 'coa',
    chapter: 'coa-6',
    topics: ['coa-6-1'],
    type: '选择',
    difficulty: 2,
    score: '2 分',
    tags: ['I/O 接口', 'I/O 端口', '编址'],
    stem: '下列有关 I/O 接口的叙述中，错误的是：',
    options: [
      '状态端口和控制端口可以合用同一个寄存器',
      'I/O 接口中 CPU 可访问的寄存器称为 I/O 端口',
      '采用独立编址方式时，I/O 端口地址和主存地址可能相同',
      '采用统一编址方式时，CPU 不能用访存指令访问 I/O 端口',
    ],
    answer: 'D',
    analysis: `<p><strong>选 D。</strong> 逐项看：</p>
      <ul>
      <li><strong>A 对</strong>：状态端口和控制端口可以合用一个寄存器，不同位分别表示状态和控制。</li>
      <li><strong>B 对</strong>：CPU 可访问的接口寄存器就是 I/O 端口。</li>
      <li><strong>C 对</strong>：独立编址的端口地址空间和主存地址空间是两套，地址值可以相同，靠指令/控制信号区分。</li>
      <li><strong>D 错</strong>：统一编址（存储器映射）正是把端口映射到主存地址空间，CPU 可以用普通 load/store 访存指令访问 I/O 端口。</li>
      </ul>`,
  },
  {
    id: 'q-2015-coa-21',
    year: 2015,
    no: '21',
    label: '真题',
    subject: 'coa',
    chapter: 'coa-6',
    topics: ['coa-6-1'],
    type: '选择',
    difficulty: 2,
    score: '2 分',
    tags: ['I/O 端口', '中断 I/O', '打印接口'],
    stem: '在采用中断 I/O 方式控制打印输出的情况下，CPU 和打印控制接口中的 I/O 端口之间交换的信息不可能是：',
    options: ['打印字符', '主存地址', '设备状态', '控制命令'],
    answer: 'B',
    analysis: `<p><strong>选 B。</strong> CPU 与打印接口的端口之间交换的是：</p>
      <ul>
      <li><strong>打印字符</strong>：CPU 写到数据端口，接口再送给打印机。</li>
      <li><strong>设备状态</strong>：接口把“忙/就绪/缺纸”等状态送 CPU。</li>
      <li><strong>控制命令</strong>：CPU 写控制端口，启动打印、允许中断等。</li>
      </ul>
      <p><strong>主存地址</strong>不是 CPU 与 I/O 端口之间交换的内容：中断 I/O 由 CPU 执行服务程序搬运数据，数据经 CPU 通用寄存器/接口数据端口传送；主存地址由 CPU 在访存时使用，不发给打印接口。DMA 才需要把主存地址给 DMA 控制器，但本题是中断 I/O。</p>`,
  },
  {
    id: 'q-2017-coa-21',
    year: 2017,
    no: '21',
    label: '真题',
    subject: 'coa',
    chapter: 'coa-6',
    topics: ['coa-6-1'],
    type: '选择',
    difficulty: 1,
    score: '2 分',
    tags: ['I/O 指令', 'I/O 端口', '通用寄存器'],
    stem: 'I/O 指令实现的数据传送通常发生在：',
    options: ['I/O 设备和 I/O 端口之间', '通用寄存器和 I/O 设备之间', 'I/O 端口和 I/O 端口之间', '通用寄存器和 I/O 端口之间'],
    answer: 'D',
    analysis: `<p><strong>选 D。</strong> I/O 指令（如 IN/OUT）是 CPU 执行的指令，操作数在<strong>通用寄存器</strong>和<strong>I/O 端口</strong>之间：</p>
      <ul>
      <li>IN：端口 → 通用寄存器；</li>
      <li>OUT：通用寄存器 → 端口。</li>
      </ul>
      <p>CPU 不能直接用一条 I/O 指令访问设备内部；设备与端口之间是接口/设备侧的硬件握手，不经过 I/O 指令。端口到端口也不能由一条 I/O 指令直接完成。</p>`,
  },
  {
    id: 'q-2017-coa-22',
    year: 2017,
    no: '22',
    label: '真题',
    subject: 'coa',
    chapter: 'coa-6',
    topics: ['coa-6-3'],
    type: '选择',
    difficulty: 2,
    score: '2 分',
    tags: ['多重中断', '开中断', '中断响应'],
    stem: '下列关于多重中断系统的叙述中，错误的是：',
    options: ['在一条指令执行结束时响应中断', '中断处理期间 CPU 处于关中断状态', '中断请求的产生与当前指令的执行无关', 'CPU 通过采样中断请求信号检测中断请求'],
    answer: 'B',
    analysis: `<p><strong>选 B。</strong> 多重中断的关键就是“中断处理期间可以开中断”，让更高处理优先级的中断嵌套进来；如果全程关中断，就退化成单级中断了。</p>
      <ul>
      <li>A 对：外中断通常在指令边界响应。</li>
      <li>B 错：保护现场后可以开中断，允许嵌套；恢复现场前再关中断。</li>
      <li>C 对：外中断请求由设备/时钟等外部事件产生，和当前指令执行无关。</li>
      <li>D 对：CPU 在指令结束时采样中断请求信号（或由中断控制器送 INTR）。</li>
      </ul>`,
  },
  {
    id: 'q-2019-coa-22',
    year: 2019,
    no: '22',
    label: '真题',
    subject: 'coa',
    chapter: 'coa-6',
    topics: ['coa-6-2'],
    type: '选择',
    difficulty: 2,
    score: '2 分',
    tags: ['DMA', '设备驱动', '总线请求', '中断后处理'],
    stem: '下列关于 DMA 方式的叙述中，正确的是：<br>I. DMA 传送前由设备驱动程序设置传送参数<br>II. 数据传送前由 DMA 控制器请求总线使用权<br>III. 数据传送由 DMA 控制器直接控制总线完成<br>IV. DMA 传送结束后的处理由中断服务程序完成',
    options: ['仅 I、II', '仅 I、III、IV', '仅 II、III、IV', 'I、II、III、IV'],
    answer: 'D',
    analysis: `<p><strong>选 D。</strong> 四项都正确：</p>
      <ul>
      <li>I：设备驱动程序负责初始化 DMA 控制器（内存地址、设备地址、传送长度、方向）。</li>
      <li>II：DMA 控制器通过 HRQ 申请总线，得到 HLDA 后才能传送。</li>
      <li>III：传送过程由 DMA 控制器直接控制总线，在设备与主存之间搬数据，不经过 CPU 通用寄存器。</li>
      <li>IV：DMA 结束时向 CPU 发中断，CPU 执行中断服务程序做校验、结束处理。</li>
      </ul>`,
  },
  {
    id: 'q-2020-coa-21',
    year: 2020,
    no: '21',
    label: '真题',
    subject: 'coa',
    chapter: 'coa-6',
    topics: ['coa-6-3'],
    type: '选择',
    difficulty: 2,
    score: '2 分',
    tags: ['外部中断', 'NMI', '可屏蔽中断'],
    stem: '外部中断包括不可屏蔽中断（NMI）和可屏蔽中断，下列关于外部中断的叙述中，错误的是：',
    options: ['CPU 处于关中断状态时，也能响应 NMI 请求', '一旦可屏蔽中断请求信号有效，CPU 将立即响应', '不可屏蔽中断的优先级比可屏蔽中断的优先级高', '可通过中断屏蔽字改变可屏蔽中断的处理优先级'],
    answer: 'B',
    analysis: `<p><strong>选 B。</strong> 可屏蔽中断请求有效，只是“有请求”，还要满足响应条件：</p>
      <ul>
      <li>当前指令执行结束；</li>
      <li>IF=1（开中断）；</li>
      <li>没有更高优先级/屏蔽字阻挡。</li>
      </ul>
      <p>所以不是“立即响应”。其余三项：A 对，NMI 不受 IF 影响；C 对，NMI 通常优先级更高；D 对，屏蔽字决定处理优先级/能否嵌套。</p>`,
  },
  {
    id: 'q-2020-coa-22',
    year: 2020,
    no: '22',
    label: '真题',
    subject: 'coa',
    chapter: 'coa-6',
    topics: ['coa-6-2'],
    type: '选择',
    difficulty: 3,
    score: '2 分',
    tags: ['周期挪用', 'DMA', '数据缓冲寄存器'],
    stem: '若设备采用周期挪用 DMA 方式进行输入和输出，每次 DMA 传送的数据块大小为 512 字节，相应的 I/O 接口中有一个 32 位数据缓冲寄存器。对于数据输入过程，下列叙述中，错误的是：',
    options: ['每准备好 32 位数据，DMA 控制器就发出一次总线请求', '相对于 CPU，DMA 控制器的总线使用权的优先级更高', '在整个数据块的传送过程中，CPU 不可以访问主存储器', '数据块传送结束时，会产生“DMA 传送结束”中断请求'],
    answer: 'C',
    analysis: `<p><strong>选 C。</strong> 周期挪用的特点是“每次只偷一个总线周期”，不是整块期间霸占总线：</p>
      <ul>
      <li>A 对：接口缓冲寄存器 32 位 = 4 B，每准备好 4 B 就请求一次总线；512 B 共需 512/4=128 次传送/请求。</li>
      <li>B 对：DMA 请求通常优先于 CPU 访存。</li>
      <li>C 错：DMA 只在它占用的总线周期内阻止 CPU 访存，其他周期 CPU 仍可访问主存；不是整个数据块期间都不能访问。</li>
      <li>D 对：块传送结束，DMA 发中断请求，CPU 做后处理。</li>
      </ul>`,
  },
  {
    id: 'q-2021-coa-22',
    year: 2021,
    no: '22',
    label: '真题',
    subject: 'coa',
    chapter: 'coa-6',
    topics: ['coa-6-3'],
    type: '选择',
    difficulty: 2,
    score: '2 分',
    tags: ['多重中断', '用户态', '内核态'],
    stem: '下列是关于多重中断系统中 CPU 响应中断的叙述，其中错误的是：',
    options: ['仅在用户态（执行用户程序）下，CPU 才能检测和响应中断', 'CPU 只有在检测到中断请求信号后，才会进入中断响应周期', '进入中断响应周期时，CPU 一定处于中断允许（开中断）状态', '若 CPU 检测到中断请求信号，则一定存在未被屏蔽的中断源请求信号'],
    answer: 'A',
    analysis: `<p><strong>选 A。</strong> CPU 在用户态和内核态都可以检测/响应中断；中断服务程序本身就在内核态运行，若只能在用户态响应，嵌套就无从谈起。</p>
      <p>B 对：先有请求信号，才进入响应周期。D 对：能被 CPU 检测到的请求，至少是当前未被屏蔽的。C 在“可屏蔽中断”语境下成立（开中断才响应）；NMI 是例外，但本题要选的是明显错误的 A。</p>`,
  },
  {
    id: 'q-2022-coa-21',
    year: 2022,
    no: '21',
    label: '真题',
    subject: 'coa',
    chapter: 'coa-6',
    topics: ['coa-6-2', 'coa-6-3'],
    type: '选择',
    difficulty: 2,
    score: '2 分',
    tags: ['中断 I/O', '字符设备', '准备数据时间'],
    stem: '下列关于中断 I/O 方式的叙述中，不正确的是：',
    options: ['适用于键盘、针式打印机等字符型设备', '外设和主机之间的数据传送通过软件完成', '外设准备数据的时间应小于中断处理时间', '外设为某进程准备数据时 CPU 可运行其他进程'],
    answer: 'C',
    analysis: `<p><strong>选 C。</strong> 中断 I/O 适合键盘、打印机等字符型/中低速设备，CPU 启动设备后可以运行其他进程；数据传送由中断服务程序（软件）完成。</p>
      <p>C 错在方向：外设准备数据的时间应<strong>大于</strong>（至少不短于）CPU 的中断处理时间，否则 CPU 还没处理完上一个数据，设备又准备好下一个，容易丢失数据。不是“应小于”。</p>`,
  },
  {
    id: 'q-2023-coa-21',
    year: 2023,
    no: '21',
    label: '真题',
    subject: 'coa',
    chapter: 'coa-6',
    topics: ['coa-6-3'],
    type: '选择',
    difficulty: 2,
    score: '2 分',
    tags: ['异常', '中断请求', '中断响应', '中断结束'],
    stem: '下列关于硬件和异常/中断关系的叙述中，错误的是：',
    options: [
      'CPU 在执行一条指令过程中检测异常事件',
      'CPU 在执行完一条指令时检测中断请求信号',
      '开中断时 CPU 检测到中断请求后就进行中断响应',
      '外部设备通过中断控制器向 CPU 发中断结束信号',
    ],
    answer: 'D',
    analysis: `<p><strong>选 D。</strong> 中断结束信号（EOI）不是“设备发给 CPU”的：</p>
      <ul>
      <li>设备/接口向中断控制器发<strong>中断请求</strong>；</li>
      <li>中断控制器向 CPU 发 INTR；</li>
      <li>CPU 响应后，在服务程序结尾向中断控制器发 <strong>EOI</strong>，表示本次中断处理结束。</li>
      </ul>
      <p>A 对：异常由当前指令执行过程产生，可在指令执行中检测。B 对：外中断通常在指令执行结束时检测。C 对：开中断且满足响应条件时，CPU 检测到请求后进入响应；D 把 EOI 的方向说反了。</p>`,
  },
  {
    id: 'q-2023-coa-22',
    year: 2023,
    no: '22',
    label: '真题',
    subject: 'coa',
    chapter: 'coa-6',
    topics: ['coa-6-2'],
    type: '选择',
    difficulty: 1,
    score: '2 分',
    tags: ['I/O 控制方式', 'DMA'],
    stem: '下列关于 I/O 控制方式的叙述中，错误的是：',
    options: [
      '查询方式下，通过 CPU 执行查询程序进行 I/O 操作',
      '中断方式下，通过 CPU 执行中断服务程序进行 I/O 操作',
      'DMA 方式下，通过 CPU 执行 DMA 传送程序进行 I/O 操作',
      '对于 SSD、网络适配器等高速设备，采用 DMA 方式输入/输出',
    ],
    answer: 'C',
    analysis: `<p><strong>选 C。</strong> DMA 的数据传送由 <strong>DMA 控制器硬件</strong>直接控制总线完成，不需要 CPU 执行“DMA 传送程序”来搬数据。CPU 只负责预处理（设置参数、启动）和后处理（结束中断）。</p>
      <p>查询方式靠 CPU 执行查询程序；中断方式靠 CPU 执行中断服务程序；SSD、网卡等高速成块设备适合 DMA。C 把 DMA 说成“CPU 执行传送程序”，错。</p>`,
  },
  {
    id: 'q-2024-coa-21',
    year: 2024,
    no: '21',
    label: '真题',
    subject: 'coa',
    chapter: 'coa-6',
    topics: ['coa-6-3'],
    type: '选择',
    difficulty: 2,
    score: '2 分',
    tags: ['中断屏蔽字', '响应优先级', '处理优先级'],
    stem: '下列关于中断 I/O 方式的叙述中，错误的是：',
    options: [
      '中断屏蔽字用于确定中断响应的优先级',
      '保存断点和程序状态字在中断响应阶段完成',
      '保存通用寄存器和设置新中断屏蔽字由软件实现',
      '单重中断方式下中断处理时 CPU 处于关中断状态',
    ],
    answer: 'A',
    analysis: `<p><strong>选 A。</strong> 中断屏蔽字决定的是<strong>处理优先级</strong>（进入服务程序后谁能打断谁），不是“中断响应的优先级”。响应优先级由硬件排队/中断控制器决定。</p>
      <p>B 对：保存断点、PSW 属于中断响应阶段的隐指令。C 对：通用寄存器保护、设置新屏蔽字由服务程序软件完成。D 对：单重中断不允许嵌套，处理期间保持关中断。</p>`,
  },
  {
    id: 'q-2024-coa-22',
    year: 2024,
    no: '22',
    label: '真题',
    subject: 'coa',
    chapter: 'coa-6',
    topics: ['coa-6-2'],
    type: '选择',
    difficulty: 2,
    score: '2 分',
    tags: ['DMA', '数据通路'],
    stem: 'DMA 控制 I/O 方式下，设备的输入/输出由 DMA 控制器控制完成，此时，DMA 控制器控制的数据传输通路位于：',
    options: ['CPU 和主存之间', 'CPU 和 DMA 控制器之间', '设备接口和主存之间', '设备接口和 DMA 控制器之间'],
    answer: 'C',
    analysis: `<p><strong>选 C。</strong> DMA 的数据通路是<strong>设备接口 ↔ 主存</strong>：DMA 控制器给出主存地址、发读写命令，数据在设备接口的数据缓冲寄存器和主存之间直接传送，不经过 CPU 通用寄存器。</p>
      <p>DMA 控制器本身是“控制者”，不是数据必须经过的中间站；CPU 只在预处理/后处理时介入。</p>`,
  },
  {
    id: 'q-2009-coa-43',
    year: 2009,
    no: '43',
    label: '真题',
    subject: 'coa',
    chapter: 'coa-6',
    topics: ['coa-6-2', 'coa-6-3'],
    type: '综合',
    difficulty: 4,
    score: '8 分',
    tags: ['中断 I/O', 'DMA', 'CPU 开销', '计算'],
    stem: '某计算机的 CPU 主频为 500MHz，CPI 为 5（即执行每条指令平均需 5 个时钟周期）。假定某外设的数据传输率为 0.5MB/s，采用中断方式与主机进行数据传送，以 32 位为传输单位，对应的中断服务程序包含 18 条指令，中断服务的其他开销相当于 2 条指令的执行时间。请回答下列问题，要求给出计算过程。<br>（1）在中断方式下，CPU 用于该外设 I/O 的时间占整个 CPU 时间的百分比是多少？<br>（2）当该外设的数据传输率达到 5MB/s 时，改用 DMA 方式传送数据。假定每次 DMA 传送块大小为 5000B，且 DMA 预处理和后处理的总开销为 500 个时钟周期，则 CPU 用于该外设 I/O 的时间占整个 CPU 时间的百分比是多少（假设 DMA 与 CPU 之间没有访存冲突）？',
    answer: '',
    analysis: `<p><strong>（1）2.5%。</strong></p>
      <ul>
      <li>32 位 = 4B，中断次数 = $0.5\\text{ MB/s}\\div4\\text{ B}=125000$ 次/s。</li>
      <li>每次中断服务：18 条 + 2 条开销 = 20 条指令；CPI=5，所以 $20\\times5=100$ 个时钟周期。</li>
      <li>每秒 CPU 用于中断的周期：$125000\\times100=12.5\\text{ M}$。</li>
      <li>占比：$12.5\\text{ M}\\div500\\text{ M}=2.5\\%$。</li>
      </ul>
      <p><strong>（2）0.1%。</strong></p>
      <ul>
      <li>DMA 块数 = $5\\text{ MB/s}\\div5000\\text{ B}=1000$ 块/s。</li>
      <li>每块 CPU 开销 500 个时钟周期，CPU 周期 = $1000\\times500=500000$ 个/s。</li>
      <li>占比：$500000\\div500\\text{ M}=0.1\\%$。</li>
      </ul>
      <p>注意：DMA 传送本身不占 CPU 周期；这里只算 CPU 的预处理/后处理开销（题设无访存冲突）。</p>`,
  },
  {
    id: 'q-2016-coa-44',
    year: 2016,
    no: '44',
    label: '真题',
    subject: 'coa',
    chapter: 'coa-6',
    topics: ['coa-6-3'],
    type: '综合',
    difficulty: 4,
    score: '9 分',
    tags: ['异步串行', '中断 I/O', '时钟周期', '中断响应'],
    stem: '假定 CPU 主频为 50MHz，CPI 为 4。设备 D 采用异步串行通信方式向主机传送 7 位 ASCII 字符，通信规程中有 1 位奇校验位和 1 位停止位，从 D 接收启动命令到字符送入 I/O 端口需要 0.5ms。请回答下列问题，要求说明理由。<br>（1）每传送一个字符，在异步串行通信线上共需传输多少位？在设备 D 持续工作过程中，每秒钟最多可向 I/O 端口送入多少个字符？<br>（2）I/O 端口每收到一个字符申请一次中断，中断响应需 10 个时钟周期，中断服务程序共有 20 条指令，其中第 15 条指令启动 D 工作。若 CPU 需从 D 读取 1000 个字符，则完成这一任务所需时间大约是多少个时钟周期？CPU 用于完成这一任务的时间大约是多少个时钟周期？在中断响应阶段 CPU 进行了哪些操作？',
    answer: '',
    analysis: `<p><strong>（1）10 位；2000 个字符/s。</strong></p>
      <ul>
      <li>异步串行一帧包括 1 位起始位 + 7 位数据 + 1 位奇校验 + 1 位停止位 = <strong>10 位</strong>。</li>
      <li>从启动到字符送入端口需 0.5ms，持续工作时每 0.5ms 一个字符，所以 $1\\text{ s}\\div0.5\\text{ ms}=2000$ 个/s。</li>
      </ul>
      <p><strong>（2）任务时间约 25,070,000 个时钟周期；CPU 时间约 90,000 个时钟周期。</strong></p>
      <ul>
      <li>0.5ms 在 50MHz 下是 $0.5\\text{ ms}\\times50\\text{ M}=25000$ 个时钟周期。</li>
      <li>每个字符的中断路径：中断响应 10 个周期 + 启动 D 之前的 15 条指令 × CPI 4 = 10+60=70 个周期；再加上设备传送的 25000 个周期，合计 <strong>25070</strong> 个周期/字符。</li>
      <li>为什么只加 15 条，不加 20 条？第 15 条指令才启动 D；剩下 5 条指令在设备传送 0.5ms 期间执行，已经和 25000 个周期重叠，不能再加一遍。</li>
      <li>1000 个字符：$1000\\times25070=25,070,000$ 个周期。</li>
      <li>CPU 时间要算全部 20 条指令：$1000\\times(10+20\\times4)=1000\\times90=90,000$ 个周期。</li>
      </ul>
      <p>中断响应阶段（隐指令）：关中断、保存断点（PC/PSW）、识别中断源/形成中断服务程序入口地址并送 PC（以及切换 CPU 模式）。通用寄存器由服务程序保存。</p>
      <p>“任务时间”和“CPU 时间”不是一回事：任务时间由设备每字符 0.5ms + 启动前的中断路径决定；CPU 时间只算 CPU 真正执行中断响应和服务程序的周期。</p>`,
  },
  {
    id: 'q-2018-coa-43',
    year: 2018,
    no: '43',
    label: '真题',
    subject: 'coa',
    chapter: 'coa-6',
    topics: ['coa-6-2', 'coa-6-3'],
    type: '综合',
    difficulty: 4,
    score: '8 分',
    tags: ['定时查询', '中断 I/O', 'DMA', 'CPU 开销', '计算'],
    stem: '假定计算机的主频为 500MHz，CPI 为 4。现有设备 A 和 B，其数据传输率分别为 2MB/s 和 40MB/s，对应 I/O 接口中各有一个 32 位数据缓冲寄存器。请回答下列问题，要求给出计算过程。<br>（1）若设备 A 采用定时查询 I/O 方式，每次输入/输出都至少执行 10 条指令。设备 A 最多间隔多长时间查询一次才能不丢失数据？CPU 用于设备 A 输入/输出的时间占 CPU 总时间的百分比至少是多少？<br>（2）在中断 I/O 方式下，若每次中断响应和中断处理的总时钟周期数至少为 400，则设备 B 能否采用中断 I/O 方式？为什么？<br>（3）若设备 B 采用 DMA 方式，每次 DMA 传送的数据块大小为 1000B，CPU 用于 DMA 预处理和后处理的总时钟周期数为 500，则 CPU 用于设备 B 输入/输出的时间占 CPU 总时间的百分比最多是多少？',
    answer: '',
    analysis: `<p><strong>（1）最多 2μs 查询一次；占比至少 4%。</strong></p>
      <ul>
      <li>32 位缓冲 = 4B。A 的速率 2MB/s，每 $4\\text{ B}\\div2\\text{ MB/s}=2\\mu s$ 产生一个数据，所以查询间隔不能超过 2μs。</li>
      <li>每次查询 10 条指令，CPI=4，共 40 个时钟周期；500MHz 下 $40/500\\text{ M}=80\\text{ ns}$。</li>
      <li>占比：$80\\text{ ns}\\div2\\mu s=4\\%$。</li>
      </ul>
      <p><strong>（2）不能。</strong> B 的速率 40MB/s，每 4B 一次中断，中断频率 $40\\text{ MB/s}\\div4\\text{ B}=10\\text{ M}$ 次/s。每次至少 400 周期，需要 $10\\text{ M}\\times400=4\\text{ G}$ 周期/s，远大于 CPU 的 500M 周期/s，CPU 根本处理不过来。</p>
      <p><strong>（3）最多 4%。</strong></p>
      <ul>
      <li>B 的块数：$40\\text{ MB/s}\\div1000\\text{ B}=40000$ 块/s。</li>
      <li>CPU 开销：$40000\\times500=20\\text{ M}$ 周期/s。</li>
      <li>占比：$20\\text{ M}\\div500\\text{ M}=4\\%$。</li>
      </ul>`,
  },
];
