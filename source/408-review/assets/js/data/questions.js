/**
 * 真题
 * ------------------------------------------------------------
 * 字段：id / year / no / subject / chapter / topics[] / type / difficulty / score
 *       stem（HTML） / options[] / answer / analysis（HTML） / tags[]
 * 选项只放文字，字母由页面自动生成；answer 填正确选项的字母。
 * 没有选项的题（综合题）省略 options / answer，直接把解答写在 analysis 里。
 */

export const QUESTIONS = [
  {
    id: 'q-2011-ds-1',
    year: 2011,
    no: '1',
    subject: 'ds',
    chapter: 'ds-1',
    topics: ['ds-1-1'],
    type: '选择',
    difficulty: 2,
    score: '2 分',
    tags: ['复杂度', '循环', '对数'],
    stem: '设 n 是描述问题规模的非负整数，下面程序片段的时间复杂度是：<pre class="code"><code>x = 2;\nwhile (x &lt; n / 2)\n    x = 2 * x;</code></pre>',
    options: ['O(log₂n)', 'O(n)', 'O(nlog₂n)', 'O(n²)'],
    answer: 'A',
    analysis: `<p>设 <code>x = 2 * x</code> 执行 t 次。第 t 次执行后 <span class="fx">x = 2<sup>t+1</sup></span>，循环退出条件给出 <span class="fx">2<sup>t+1</sup> ≥ n/2</span>，于是 <span class="fx">t ≈ log₂n</span>，取数量级得 <span class="fx">O(log n)</span>。</p>
      <p>也可以直接联系归并排序：每次都把规模除以 2，层数就是 <span class="fx">log₂n</span>。</p>`,
  },
  {
    id: 'q-2017-ds-1',
    year: 2017,
    no: '1',
    subject: 'ds',
    chapter: 'ds-1',
    topics: ['ds-1-1'],
    type: '选择',
    difficulty: 3,
    score: '2 分',
    tags: ['复杂度', '循环', '平方根'],
    stem: '下列函数的时间复杂度是：<pre class="code"><code>int func(int n) {\n    int i = 0, sum = 0;\n    while (sum &lt; n) sum += ++i;\n    return i;\n}</code></pre>',
    options: ['O(n)', 'O(nlog₂n)', 'O(√n)', 'O(n²)'],
    answer: 'C',
    analysis: `<p>设循环体执行 t 次。第 t 次时 <code>i = t</code>，<code>sum = 1 + 2 + … + t = t(t+1)/2</code>。退出条件 <span class="fx">t(t+1)/2 ≥ n</span> 给出 <span class="fx">t ≈ √(2n)</span>，所以 <span class="fx">O(√n)</span>。</p>
      <p>易错点：只看到 <code>while</code> 就写 <span class="fx">O(n)</span>。这里的循环变量是累加增长的，不是每次加 1。</p>`,
  },
  {
    id: 'q-2014-ds-1',
    year: 2014,
    no: '1',
    subject: 'ds',
    chapter: 'ds-1',
    topics: ['ds-1-1'],
    type: '选择',
    difficulty: 2,
    score: '2 分',
    tags: ['复杂度', '嵌套循环'],
    stem: '下列程序段的时间复杂度是：<pre class="code"><code>count = 0;\nfor (k = 1; k &lt;= n; k *= 2)\n    for (j = 1; j &lt;= n; j++)\n        count++;</code></pre>',
    options: ['O(log₂n)', 'O(n)', 'O(nlog₂n)', 'O(n²)'],
    answer: 'C',
    analysis: `<p>外层 <code>k *= 2</code>，执行 <span class="fx">⌈log₂n⌉</span> 轮；内层固定执行 n 次，且与外层变量无关，所以内外相乘：<span class="fx">O(n log n)</span>。</p>
      <p>判断口诀：内外<strong>无关</strong>就相乘；如果内层的上界依赖外层变量（例如 <code>j &lt;= k</code>），才需要逐轮求和。</p>`,
  },
  {
    id: 'q-2012-ds-1',
    year: 2012,
    no: '1',
    subject: 'ds',
    chapter: 'ds-1',
    topics: ['ds-1-2'],
    type: '选择',
    difficulty: 2,
    score: '2 分',
    tags: ['复杂度', '递归'],
    stem: '求整数 n（n ≥ 0）阶乘的算法如下，其时间复杂度是：<pre class="code"><code>int fact(int n) {\n    if (n &lt;= 1) return 1;\n    return n * fact(n - 1);\n}</code></pre>',
    options: ['O(n)', 'O(n²)', 'O(nlog₂n)', 'O(log₂n)'],
    answer: 'A',
    analysis: `<p>每次调用只做一次比较和一次乘法，代价 <span class="fx">O(1)</span>；从 n 递归到 1，调用次数为 n。两者相乘得 <span class="fx">O(n)</span>。</p>
      <p>空间复杂度才是 <span class="fx">O(n)</span>——递归栈深度为 n。时间和空间不要混。</p>`,
  },
  {
    id: 'q-2011-ds-stack',
    year: 2011,
    no: '2',
    subject: 'ds',
    chapter: 'ds-2',
    topics: ['ds-2-2'],
    type: '选择',
    difficulty: 3,
    score: '2 分',
    tags: ['栈', '出栈序列', '卡特兰数'],
    stem: '元素 a, b, c, d, e 依次进入初始为空的栈中。若元素入栈后可停留、可出栈，直到所有元素都出栈，则在所有可能的出栈序列中，以元素 d 开头的序列个数是：',
    options: ['3', '4', '5', '6'],
    answer: 'B',
    analysis: `<p>d 要第一个出栈，说明 d 入栈前 a、b、c 都已经入栈；d 弹出后，栈里从顶到底依次是 c、b、a，它们的出栈顺序被唯一确定为 <code>c b a</code>。</p>
      <p>e 还没入栈，可以在 d 之后的任意时刻入栈、出栈，相当于插入 <code>c b a</code> 的四个空隙：<code>e c b a</code>、<code>c e b a</code>、<code>c b e a</code>、<code>c b a e</code>，共 4 个。</p>`,
  },
  {
    id: 'q-2015-ds-kmp',
    year: 2015,
    no: '4',
    subject: 'ds',
    chapter: 'ds-2',
    topics: ['ds-2-5'],
    type: '选择',
    difficulty: 4,
    score: '2 分',
    tags: ['串', 'KMP', 'next'],
    stem: '已知字符串 s 为 <code>abaabaabacacaabaabcc</code>，模式串 t 为 <code>abaabc</code>。采用 KMP 算法进行匹配，第一次出现“失配”（s[i] ≠ t[j]）时，i = j = 5，则下次开始匹配时，i 和 j 的值分别为：',
    options: ['i = 1，j = 0', 'i = 5，j = 0', 'i = 5，j = 2', 'i = 6，j = 2'],
    answer: 'C',
    analysis: `<p>模式串 <code>abaabc</code> 的 next 数组（从 0 开始）为：</p>
      <table class="mini-table"><thead><tr><th>位序</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr></thead>
      <tbody><tr><td>字符</td><td>a</td><td>b</td><td>a</td><td>a</td><td>b</td><td>c</td></tr>
      <tr><td>next</td><td>0</td><td>1</td><td>1</td><td>2</td><td>2</td><td>3</td></tr></tbody></table>
      <p>失配发生在 j = 5，KMP 让主串指针 i 原地不动，只把 j 改成 <code>next[5] = 2</code>。所以下次从 i = 5、j = 2 开始，选 C。</p>`,
  },
  {
    id: 'q-2024-ds-kmp',
    year: 2024,
    no: '5',
    subject: 'ds',
    chapter: 'ds-2',
    topics: ['ds-2-5'],
    type: '选择',
    difficulty: 4,
    score: '2 分',
    tags: ['串', 'KMP', 'nextval'],
    stem: 'KMP 算法使用修正后的 next 数组进行模式匹配，模式串 S 为 <code>aabaab</code>。当主串的某个字符与 S 的某个字符失配时，S 向右滑动的最长距离是：',
    options: ['5', '4', '3', '2'],
    answer: 'A',
    analysis: `<p>“修正后的 next”就是 nextval：</p>
      <table class="mini-table"><thead><tr><th>位序</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr></thead>
      <tbody><tr><td>字符</td><td>a</td><td>a</td><td>b</td><td>a</td><td>a</td><td>b</td></tr>
      <tr><td>next</td><td>0</td><td>1</td><td>2</td><td>1</td><td>2</td><td>3</td></tr>
      <tr><td>nextval</td><td>0</td><td>0</td><td>2</td><td>0</td><td>0</td><td>2</td></tr></tbody></table>
      <p>第 j 位失配时右滑 <span class="fx">j − nextval[j]</span> 格。逐位算：1、2、1、4、5、4，最大是第 5 位的 5，选 A。</p>`,
  },
  {
    id: 'q-2016-ds-matrix',
    year: 2016,
    no: '3',
    subject: 'ds',
    chapter: 'ds-2',
    topics: ['ds-2-4'],
    type: '选择',
    difficulty: 3,
    score: '2 分',
    tags: ['矩阵压缩', '三对角矩阵'],
    stem: '有一个 100 阶的三对角矩阵 M，其元素 m<sub>i,j</sub>（1 ≤ i, j ≤ 100）按行优先依次压缩存入下标从 0 开始的一维数组 N 中。元素 m<sub>30,30</sub> 在 N 中的下标是：',
    options: ['86', '87', '88', '89'],
    answer: 'B',
    analysis: `<p>数 m<sub>30,30</sub> 前面有多少个元素：第 1 行只有 2 个；第 2~29 行每行 3 个，共 28×3 = 84 个；第 30 行中 m<sub>30,30</sub> 前面还有 m<sub>30,29</sub> 一个。合计 2 + 84 + 1 = 87，下标为 87。</p>
      <p>通式：<span class="fx">k = 2i + j − 3</span>，代入 i = j = 30 得 87。</p>`,
  },
  {
    id: 'q-2021-ds-array',
    year: 2021,
    no: '4',
    subject: 'ds',
    chapter: 'ds-2',
    topics: ['ds-2-4'],
    type: '选择',
    difficulty: 3,
    score: '2 分',
    tags: ['数组', '行优先', '地址计算'],
    stem: '二维数组 A 按行优先方式存储，每个元素占用 1 个存储单元。若元素 <code>A[0][0]</code> 的存储地址是 100，<code>A[3][3]</code> 的存储地址是 220，则元素 <code>A[5][5]</code> 的存储地址是：',
    options: ['295', '300', '301', '306'],
    answer: 'B',
    analysis: `<p>设每行有 R 个元素。按行优先，<code>A[3][3]</code> 相对首地址偏移 <span class="fx">3R + 3</span>，所以 <span class="fx">3R + 3 = 220 − 100 = 120</span>，解得 R = 39。</p>
      <p><code>A[5][5]</code> 的偏移是 <span class="fx">5×39 + 5 = 200</span>，地址为 100 + 200 = 300。</p>`,
  },
  {
    id: 'q-2010-ds-tree',
    year: 2010,
    no: '5',
    subject: 'ds',
    chapter: 'ds-3',
    topics: ['ds-3-1'],
    type: '选择',
    difficulty: 3,
    score: '2 分',
    tags: ['树', '度', '叶子'],
    stem: '在一棵度为 4 的树 T 中，若有 20 个度为 4 的结点、10 个度为 3 的结点、1 个度为 2 的结点、10 个度为 1 的结点，则树 T 的叶结点的个数是：',
    options: ['41', '82', '113', '122'],
    answer: 'B',
    analysis: `<p>树版本的握手定理：结点总数 = 所有结点的度之和 + 1。度之和 = 20×4 + 10×3 + 1×2 + 10×1 = 122，所以结点总数 N = 123。</p>
      <p>非叶结点数为 20 + 10 + 1 + 10 = 41，叶结点数 = 123 − 41 = 82。</p>`,
  },
  {
    id: 'q-2017-ds-graph',
    year: 2017,
    no: '6',
    subject: 'ds',
    chapter: 'ds-4',
    topics: ['ds-4-1'],
    type: '选择',
    difficulty: 3,
    score: '2 分',
    tags: ['图', '度', '握手定理'],
    stem: '已知无向图 G 含有 16 条边，其中度为 4 的顶点个数为 3、度为 3 的顶点个数为 4，其他顶点的度均小于 3。图 G 所含的顶点个数至少是：',
    options: ['10', '11', '13', '15'],
    answer: 'B',
    analysis: `<p>所有顶点的度之和是 2×16 = 32。已确定的 7 个顶点占 4×3 + 3×4 = 24 度，还剩 8 度。</p>
      <p>要让顶点数最少，就让剩余顶点每个分摊尽可能多的度；它们度都小于 3，最大取 2，所以至少要 8/2 = 4 个顶点。总数 3 + 4 + 4 = 11。</p>`,
  },
  {
    id: 'q-2012-ds-merge',
    year: 2012,
    no: '41',
    subject: 'ds',
    chapter: 'ds-6',
    topics: ['ds-6-3', 'ds-3-4'],
    type: '综合',
    difficulty: 4,
    score: '10 分',
    tags: ['外部排序', '最佳归并树', '哈夫曼'],
    stem: '设有 6 个有序表 A、B、C、D、E、F，分别含有 10、35、40、50、60 和 200 个数据元素，各表中的元素按升序排列。要求通过 5 次两两合并，将 6 个表最终合并为 1 个升序表，并使最坏情况下比较的总次数达到最小。请回答下列问题：<br>1）给出完整的合并过程，并求出最坏情况下比较的总次数。<br>2）根据你的合并过程，描述 n（n ≥ 2）个不等长升序表的合并策略，并说明理由。',
    analysis: `<p><strong>1）每次挑最短的两个合并：</strong></p>
      <table class="mini-table"><thead><tr><th>步骤</th><th>合并</th><th>合并后长度</th><th>最坏比较次数</th></tr></thead>
      <tbody><tr><td>①</td><td>10 + 35</td><td>45</td><td>44</td></tr>
      <tr><td>②</td><td>40 + 45</td><td>85</td><td>84</td></tr>
      <tr><td>③</td><td>50 + 60</td><td>110</td><td>109</td></tr>
      <tr><td>④</td><td>85 + 110</td><td>195</td><td>194</td></tr>
      <tr><td>⑤</td><td>195 + 200</td><td>395</td><td>394</td></tr></tbody></table>
      <p>两个长度分别为 m、n 的有序表归并，最坏比较 <span class="fx">m + n − 1</span> 次。总次数 = 44 + 84 + 109 + 194 + 394 = <strong>825</strong>。</p>
      <p><strong>2）策略：</strong>把各表长度当作权值，照哈夫曼树的构造过程，每次选长度最短的两个合并，重复 n−1 次。</p>
      <p><strong>理由：</strong>总比较次数可写成“每次合并后新表长度之和 − (n−1)”，而前者正是合并树的 WPL；n−1 固定，所以要最小化 WPL，就是构造哈夫曼树。</p>`,
  },
  {
    id: 'q-2021-coa-13',
    year: 2021,
    no: '13',
    subject: 'coa',
    chapter: 'coa-2',
    topics: ['coa-2-1'],
    type: '选择',
    difficulty: 3,
    score: '2 分',
    tags: ['补码', '无符号数', '真值'],
    stem: '已知带符号整数用补码表示，变量 x、y、z 的机器数分别为 <code>FFFDH</code>、<code>FFDFH</code>、<code>7FFCH</code>，下列结论中正确的是：',
    options: [
      '若 x、y、z 为无符号整数，则 z &lt; x &lt; y',
      '若 x、y、z 为无符号整数，则 x &lt; y &lt; z',
      '若 x、y、z 为带符号整数，则 x &lt; y &lt; z',
      '若 x、y、z 为带符号整数，则 y &lt; x &lt; z',
    ],
    answer: 'D',
    analysis: `<p>按无符号看：FFFDH = 65533，FFDFH = 65503，7FFCH = 32764，所以 <span class="fx">z &lt; y &lt; x</span>，A、B 都不对。</p>
      <p>按带符号补码看：FFFDH = −3，FFDFH = −33，7FFCH = +32764，所以 <span class="fx">y &lt; x &lt; z</span>，D 对、C 错。</p>`,
  },
  {
    id: 'q-2023-coa-13',
    year: 2023,
    no: '13',
    subject: 'coa',
    chapter: 'coa-2',
    topics: ['coa-2-1'],
    type: '选择',
    difficulty: 2,
    score: '2 分',
    tags: ['补码', '机器数'],
    stem: '若 <code>short</code> 型变量 <code>x = -8190</code>，则 x 的机器数是：',
    options: ['E002H', 'E001H', '9FFFH', '9FFEH'],
    answer: 'A',
    analysis: `<p><code>short</code> 是 16 位，负数用补码：<span class="fx">2<sup>16</sup> − 8190 = 65536 − 8190 = 57346 = E002H</span>。</p>
      <p>也可以先写出 8190 = 1FFEH，取反得 E001H，再加 1 得 E002H。</p>`,
  },
  {
    id: 'q-2012-coa-13',
    year: 2012,
    no: '13',
    subject: 'coa',
    chapter: 'coa-2',
    topics: ['coa-2-4'],
    type: '选择',
    difficulty: 2,
    score: '2 分',
    tags: ['类型转换', '零扩展', '无符号'],
    stem: '假定编译器规定 <code>int</code> 和 <code>short</code> 型长度分别为 32 位和 16 位，执行：<pre class="code"><code>unsigned short x = 65530;\nunsigned int y = x;</code></pre>得到 y 的机器数为：',
    options: ['0000 7FFAH', '0000 FFFAH', 'FFFF 7FFAH', 'FFFF FFFAH'],
    answer: 'B',
    analysis: `<p>x 是 16 位无符号数，<span class="fx">65530 = FFFAH</span>；转成 32 位 <code>unsigned int</code> 做<strong>零扩展</strong>，高 16 位补 0，得 <code>0000 FFFAH</code>。</p>
      <p>如果是有符号 <code>short</code>，则要做符号扩展，高位补 1，结果会是 <code>FFFF FFFAH</code>。</p>`,
  },
  {
    id: 'q-2010-coa-cache',
    year: 2010,
    no: '44',
    subject: 'coa',
    chapter: 'coa-3',
    topics: ['coa-3-3', 'coa-3-4'],
    type: '综合',
    difficulty: 4,
    score: '10 分',
    tags: ['Cache', '直接映射', '命中率', '数组访问'],
    stem: '主存地址空间 256MB，按字节编址。指令 Cache 与数据 Cache 分离，均有 8 行，行大小 64B，数据 Cache 采用直接映射。<code>int a[256][256]</code> 按行优先存放，首地址 320，<code>int</code> 占 32 位，i、j、sum 在寄存器中：<pre class="code"><code>// 程序 A\nfor (i = 0; i &lt; 256; i++)\n    for (j = 0; j &lt; 256; j++)\n        sum += a[i][j];\n\n// 程序 B\nfor (j = 0; j &lt; 256; j++)\n    for (i = 0; i &lt; 256; i++)\n        sum += a[i][j];</code></pre>求两个程序的数据访问命中率，并说明哪个执行时间更短。',
    analysis: `<p><strong>A 的命中率 15/16 = 93.75%，B 的命中率 0，A 更快。</strong></p>
      <p>一个块 64B、一个 int 4B，每块装 16 个元素；一行 256 个 int 占 1024B，正好 16 个主存块，Cache 有 8 行。</p>
      <p><strong>程序 A（按行）</strong>：a[i][0..15] 在同一个块里，访问 a[i][0] 时缺失并调入整块，接下来的 15 个元素连续命中，到 a[i][16] 才换下一块。每 16 次访问缺 1 次，<span class="fx">H<sub>A</sub> = 15/16 = 93.75%</span>。</p>
      <p><strong>程序 B（按列）</strong>：相邻两次访问 a[i][j] 和 a[i+1][j] 相差 1024B，即跨过 16 个主存块。块号相差 16 的两个块对 8 取模相同，映射到同一行，每次访问都把前一行刚调入的块换出去，<span class="fx">H<sub>B</sub> = 0</span>。</p>
      <p>A 的访存次数远少于 B，执行时间更短。</p>`,
  },
  {
    id: 'q-2017-coa-43',
    year: 2017,
    no: '43',
    subject: 'coa',
    chapter: 'coa-2',
    topics: ['coa-2-2', 'coa-2-3', 'coa-2-4', 'coa-1-2'],
    type: '综合',
    difficulty: 5,
    score: '13 分',
    tags: ['IEEE 754', '溢出', '类型转换', '有效数字'],
    stem: `已知 <span class="fx">f(n) = Σ<sub>i=0</sub><sup>n</sup> 2<sup>i</sup> = 2<sup>n+1</sup> − 1</span>，计算 f(n) 的 C 语言函数 f1 如下：<pre class="code"><code>int f1(unsigned n) {\n    int sum = 1, power = 1;\n    for (unsigned i = 0; i &lt;= n - 1; i++) {\n        power *= 2;\n        sum += power;\n    }\n    return sum;\n}</code></pre>将 f1 中的 int 都改为 float，可得到计算 f(n) 的另一个函数 f2。假设 unsigned 和 int 型数据都占 32 位，float 采用 IEEE 754 单精度标准。请回答：<br>1）当 n = 0 时，f1 会出现死循环，为什么？若将变量 i 和 n 都定义为 int 型，f1 是否还会死循环？<br>2）f1(23) 和 f2(23) 的返回值是否相等？机器数各是什么（十六进制）？<br>3）f1(24) 和 f2(24) 的返回值分别为 33 554 431 和 33 554 432.0，为什么不相等？<br>4）f(31) = 2<sup>32</sup> − 1，而 f1(31) 的返回值却为 −1，为什么？若使 f1(n) 的返回值与 f(n) 相等，最大的 n 是多少？<br>5）f2(127) 的机器数为 7F80 0000H，对应的值是什么？若使 f2(n) 的结果不溢出，最大的 n 是多少？若使 f2(n) 的结果精确（无舍入），最大的 n 是多少？`,
    analysis: `<p><strong>（1）会死循环。</strong>n = 0 且为 <code>unsigned</code> 时，<code>n − 1</code> 回绕成 FFFFFFFFH（无符号最大值），<code>i = 0 ≤ n−1</code> 恒成立，i 溢出回绕后仍成立。若 i、n 改为 <code>int</code>，<code>n−1 = −1</code>，<code>i = 0 ≤ −1</code> 不成立，循环一次也不执行，返回 1，不会死循环。</p>
      <p><strong>（2）相等。</strong>f(23) = 2²⁴ − 1 = 16 777 215。f1 用 int，机器数 <code>00FF FFFFH</code>；该值在 float 的 24 位有效数字内可精确表示，机器数 <code>4B7F FFFFH</code>。</p>
      <p><strong>（3）</strong>f(24) = 2²⁵ − 1 = 33 554 431，int 能精确表示；float 只有 24 位有效数字，2²⁵ − 1 需要 25 位，舍入到 2²⁵ = 33 554 432，所以 f2 比 f1 大 1。</p>
      <p><strong>（4）</strong>f1 的 sum 是 32 位 int，f(31) = 2³² − 1 超出 int 范围，结果位全 1，按补码解释就是 −1。要让 f1 不溢出，需 <span class="fx">2<sup>n+1</sup> − 1 ≤ 2<sup>31</sup> − 1</span>，即 n ≤ 30，最大 n = 30。</p>
      <p><strong>（5）</strong><code>7F80 0000H</code> 的阶码全 1、尾数为 0，表示 +∞。</p>
      <p>f2 不溢出要求 f(n) 不超过 float 最大有限值。n = 127 时 f(127) = 2¹²⁸ − 1，远大于溢出阈值，舍入为 +∞；n = 126 时 f(126) = 2¹²⁷ − 1，会舍入成 2¹²⁷，仍是有限数，所以最大 n = 126。</p>
      <p>若要结果精确（无舍入），需 2<sup>n+1</sup> − 1 的二进制不超过 24 位有效数字，即 n + 1 ≤ 24，最大 n = 23。</p>`,
  },
];
