/**
 * 由 scripts/extract-questions.py 从两篇《408 考点强化》自动抽取。
 * 不要手改本文件；要改题目请改源帖子或抽取脚本，然后重新运行。
 */

export const EXTRA_QUESTIONS = [
  {
    "id": "q-auto-ds-372",
    "year": 2021,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-2",
    "topics": [
      "ds-2-1"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>已知头指针 $h$ 指向一个带头结点的非空循环单链表，结点结构为 <code>data | next</code>，其中 <code>next</code> 是指向直接后继的指针；$p$ 是尾指针，$q$ 是临时指针。现要删除该链表的第一个元素，正确的语句序列是</p>",
    "options": [
      "h-&gt;next = h-&gt;next-&gt;next; q = h-&gt;next; free(q);",
      "q = h-&gt;next; h-&gt;next = h-&gt;next-&gt;next; free(q);",
      "q = h-&gt;next; h-&gt;next = q-&gt;next; if (p != q) p = h; free(q);",
      "q = h-&gt;next; h-&gt;next = q-&gt;next; if (p == q) p = h; free(q);"
    ],
    "answer": "D",
    "analysis": "<p><strong>选 D。</strong> 删带头结点链表的第一个元素，分「摘链」和「善后尾指针」两步：</p>\n<ul>\n<li><strong>摘链</strong>：<code>q = h-&gt;next</code> 先记住第一个元素（要删的就是它），<code>h-&gt;next = q-&gt;next</code> 让头结点直接指向第二个元素。</li>\n<li><strong>善后尾指针</strong>：如果被删的恰好就是 $p$ 指向的那个结点（也就是链表只剩这一个元素，此时 $p == q$），删完 $p$ 就是悬空指针，必须把它指回头结点 $h$；不是的话 $p$ 不用动。</li>\n</ul>\n<p>逐个看选项：</p>\n<ul>\n<li><strong>A</strong>：先改了 <code>h-&gt;next</code> 才取 <code>q</code>，<code>q</code> 拿到的是<strong>第二个</strong>结点，删错对象，而且完全没管 $p$。</li>\n<li><strong>B</strong>：摘链本身是对的，但没管 $p$——只剩一个元素时会留下悬空的尾指针。</li>\n<li><strong>C</strong>：判断写反了，<code>p != q</code>（不是尾结点）反而去改 $p$。</li>\n<li><strong>D</strong>：摘链正确，且只在 <code>p == q</code> 时把 $p$ 指回 $h$，正确。</li>\n</ul>"
  },
  {
    "id": "q-auto-ds-399",
    "year": 2011,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-2",
    "topics": [
      "ds-2-2"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>元素 a, b, c, d, e 依次进入初始为空的栈中，若元素入栈后可停留、可出栈，直到所有元素都出栈，则在所有可能的出栈序列中，以元素 d 开头的序列个数是</p>",
    "options": [
      "3",
      "4",
      "5",
      "6"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B，4 个。</strong> 以 d 开头，说明 d 出栈之前 a、b、c 一定都已经入栈了——入栈顺序固定，d 想第一个出栈，就得先把 a、b、c、d 依次压进去，再弹 d。</p>\n<p>d 弹出后：</p>\n<ul>\n<li>栈里从上到下是 c、b、a，它们的出栈顺序被栈唯一确定成 <strong>c b a</strong>；</li>\n<li>e 还没入栈，可以在 d 之后的<strong>任意时刻</strong>入栈、出栈。</li>\n</ul>\n<p>于是只剩「把 e 插进 c b a」这一件事，e 有 4 个位置可选：</p>\n<ul>\n<li>插在 c 前 → <code>e c b a</code></li>\n<li>插在 c、b 之间 → <code>c e b a</code></li>\n<li>插在 b、a 之间 → <code>c b e a</code></li>\n<li>插在 a 后 → <code>c b a e</code></li>\n</ul>\n<p>所以共有 <strong>4</strong> 个。</p>"
  },
  {
    "id": "q-auto-ds-443",
    "year": 2022,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-2",
    "topics": [
      "ds-2-2"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>给定有限符号集 S，in 和 out 均为 S 中所有元素的任意排列。对于初始为空的栈 st，下列叙述中，正确的是</p>",
    "options": [
      "若 in 是 st 的入栈序列，则不能判断 out 是否为其可能的出栈序列",
      "若 out 是 st 的出栈序列，则不能判断 in 是否为其可能的入栈序列",
      "若 in 是 st 的入栈序列，out 是对应 in 的出栈序列，则 in 和 out 一定不同",
      "若 in 是 st 的入栈序列，out 是对应 in 的出栈序列，则 in 和 out 可能互为倒序"
    ],
    "answer": "D",
    "analysis": "<p><strong>选 D。</strong></p>\n<ul>\n<li>A、B 说\"不能判断\"——其实<strong>都能判断</strong>：给定候选序列，用上面那条「禁模式」判据（或者老实模拟一遍）就能判定它是不是合法出栈序列；反过来也一样，栈的过程是可逆的，把时间倒过来看即可。</li>\n<li>C 说 in 和 out 一定不同——<strong>可以相同</strong>：1 进 1 出、2 进 2 出……出栈序列就是 1, 2, 3, …，和入栈序列一模一样。</li>\n<li>D 说可能互为倒序——<strong>对</strong>：把 1…n 全部压栈再全部弹出，出栈序列就是 n, …, 2, 1，正是入栈序列的倒序。</li>\n</ul>"
  },
  {
    "id": "q-auto-ds-564",
    "year": 2016,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-2",
    "topics": [
      "ds-2-2"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>火车车轨的入口和出口之间有 $n$ 条轨道，列车的行进方向均为从左至右，列车可驶入任意一条轨道。现有编号为 1~9 的 9 列列车，驶入的次序依次是 8, 4, 2, 5, 3, 9, 1, 6, 7。若期望驶出的次序依次为 1~9，则 $n$ 至少是</p>",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "answer": "C",
    "analysis": "<p><strong>选 C，至少 4 条轨道。</strong></p>\n<p>每条轨道就是一条<strong>队列</strong>（先进先出）：列车按驶入顺序进去，也只能按这个顺序出来。而期望的驶出次序是 1~9 的<strong>完全升序</strong>，所以<strong>同一条轨道上的列车编号必须是递增的</strong>——否则\"大的在前、小的在后\"，小的那列会被永久堵在后面出不来。</p>\n<p>于是问题变成：<strong>把驶入序列 8, 4, 2, 5, 3, 9, 1, 6, 7 划分成尽量少的递增子序列</strong>。最少要几条，等于这条序列<strong>最长递减子序列的长度</strong>：</p>\n<blockquote>\n<p>8, 4, 2, 1（也有 8, 5, 3, 1）—— 长度为 4。</p>\n</blockquote>\n<p>所以至少要 4 条。4 条也确实够：</p>\n<table>\n<thead>\n<tr>\n<th>轨道</th>\n<th>放进哪些车</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>8, 9</td>\n</tr>\n<tr>\n<td>2</td>\n<td>4, 5, 6, 7</td>\n</tr>\n<tr>\n<td>3</td>\n<td>2, 3</td>\n</tr>\n<tr>\n<td>4</td>\n<td>1</td>\n</tr>\n</tbody>\n</table>\n<p>（按驶入顺序往轨道上放，保证每条轨道内部递增。）驶出时按 1 → 2 → 3 → 4 清空，正好得到 1~9 ✅。</p>"
  },
  {
    "id": "q-auto-ds-596",
    "year": null,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-2",
    "topics": [
      "ds-2-2"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>若元素 a, b, c, d, e, f 依次入栈，允许入栈、出栈操作交替进行，但不允许连续 4 次出栈操作，则以下不可能得到的出栈序列是</p>",
    "options": [
      "acbedf",
      "abcdef",
      "fedcba",
      "abcdfe"
    ],
    "answer": "C",
    "analysis": "<p><strong>选 C。</strong> 判断的关键是：<strong>输出序列里那些\"连着弹出来\"的段，能不能靠插一次入栈打断。</strong></p>\n<ul>\n<li><strong>C 是 <code>f e d c b a</code></strong>：想让 f 第一个出来，只能把 a、b、c、d、e、f <strong>全部压进栈</strong>，然后连着弹出 f、e、d、c、b、a —— <strong>连续 6 次出栈</strong> ✗ 直接出局。</li>\n<li><strong>A <code>a c b e d f</code></strong>：压 a 弹 a；压 b、压 c 弹 c，弹 b；压 d、压 e 弹 e，弹 d；压 f 弹 f —— 最长只连弹 2 次 ✅。</li>\n<li><strong>B <code>a b c d e f</code></strong>：压一个弹一个，最多连弹 1 次 ✅。</li>\n<li><strong>D <code>a b c d f e</code></strong>：前四个各自压一个弹一个，最后压 e、压 f 再弹 f、e —— 连弹 2 次 ✅。</li>\n</ul>\n<p>一个够用的快速检查：<strong>输出序列里如果没有连续 4 个递减的元素，就一定没问题</strong>（连弹 k 次在输出里必然表现为 k 个连续递减的值）。但反过来不成立——有些序列虽然没有 4 个连续递减，却因为\"想弹的元素一直被压在下面、插不进新的入栈\"而被迫连弹 4 次。所以这类题最稳的做法还是<strong>对着选项把操作演一遍</strong>。</p>"
  },
  {
    "id": "q-auto-ds-618",
    "year": null,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-2",
    "topics": [
      "ds-2-2"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>栈的入栈序列为 1, 2, 3, …, $n$，出栈序列为 $P_1, P_2, P_3, \\dots, P_n$。若 $P_3 = 3$，则 $P_4$ 的可能取值的个数是</p>",
    "options": [
      "$n-3$",
      "$n-2$",
      "$n-1$",
      "无法确定"
    ],
    "answer": "C",
    "analysis": "<p><strong>选 C（$n-1$ 个）。</strong></p>\n<p>$P_3 = 3$ 说明\"3 是第 3 个被弹出的\"，所以在弹 3 的那一刻，<strong>3 一定在栈顶</strong>。比 3 先入栈的只有 1、2，它们在 3 下面（1 又在 2 下面），也可能已经作为 $P_1$、$P_2$ 被弹走了。于是紧接着的 $P_4$ 只有三种可能：</p>\n<ol>\n<li>栈里还剩 2（1、2 都没弹过）→ 栈顶是 2，$P_4$ 能取 <strong>2</strong>；</li>\n<li>栈里只剩 1（2 已被弹走）→ 栈顶是 1，$P_4$ 能取 <strong>1</strong>；</li>\n<li>继续压入 4、5、… 再弹 → $P_4$ 能取 <strong>4 ~ $n$ 里的任意值</strong>（一直压到目标值，再把它弹出来）。</li>\n</ol>\n<p>三种合起来，$P_4$ 可取的正是 1, 2, 4, 5, …, $n$ —— 除了 3 自己（早弹过了）之外都能取到，共 <strong>$n-1$</strong> 个。</p>\n<p>顺手把两个\"不容易想到\"的取值演一遍：</p>\n<ul>\n<li><strong>$P_4 = 2$</strong>：压 1、压 2、压 3、压 4、压 5，然后连弹 5、4、3 —— 于是 $P_1 = 5$、$P_2 = 4$、$P_3 = 3$，此时栈顶是 2，$P_4 = 2$ ✅；</li>\n<li><strong>$P_4 = 1$</strong>：压 1、压 2，弹 2（$P_1 = 2$）；压 3、压 4，弹 4（$P_2 = 4$）、弹 3（$P_3 = 3$）；这时栈里只剩 1，弹出来即 $P_4 = 1$ ✅。</li>\n</ul>"
  },
  {
    "id": "q-auto-ds-663",
    "year": 2015,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-2",
    "topics": [
      "ds-2-6"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>先序序列为 a, b, c, d 的不同二叉树的个数是</p>",
    "options": [
      "13",
      "14",
      "15",
      "16"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B（14 个）。</strong> 关键是认出这题在考卡特兰数。</p>\n<p>中序 + 先序可以唯一确定一棵二叉树；再对着<strong>遍历的代码</strong>看：先序序列其实就是<strong>入栈序列</strong>，中序序列就是<strong>出栈序列</strong>（下面单独展开讲了原因）。所以\"先序序列固定为 a, b, c, d，能确定多少棵二叉树\"，等价于\"给定入栈序列，有多少种合法的出栈序列\"：</p>\n<p>$$C_4 = \\frac{1}{4+1}\\binom{8}{4} = \\frac{70}{5} = 14$$</p>\n<p>所以选 B。</p>"
  },
  {
    "id": "q-auto-ds-740",
    "year": null,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-2",
    "topics": [
      "ds-2-6"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>【题目】具有 5 个结点的二叉树有着相同的先序和中序遍历序列 \"ooops\"，则这样的二叉树可以确定的不同形状有多少？</p>",
    "options": [
      "1",
      "3",
      "5",
      "6"
    ],
    "answer": "C",
    "analysis": "<p><strong>选 C（5 种）。</strong></p>\n<p><strong>坑在哪</strong>：前面刚说\"先序 + 中序唯一确定一棵二叉树\"，但那条结论有个前提——<strong>所有结点的值互不相同</strong>。这里 \"ooops\" 里有三个 o，它们<strong>是三个不同的结点，只是符号恰好都写成 o</strong>。字符串上分不清谁是谁，同一个字符串就可能对应好几棵树，所以不能张口就答\"1 棵\"。</p>\n<p><strong>怎么数</strong>：把三个 o <strong>编上号</strong>，记作 $O_1, O_2, O_3$（怎么编都行，反正符号都是 o，最后只数形状）。</p>\n<ol>\n<li>先序固定成 $O_1 O_2 O_3 p s$ —— 题目给的先序字符串就是\"三个 o，然后 p，然后 s\"。</li>\n<li>中序也必须形如「三个 o 的某个排列 + p + s」，因为中序字符串同样要等于 \"ooops\"：<strong>p 在第 4 位、s 在第 5 位，这两位已经钉死，不用管</strong>。</li>\n<li>于是只剩一件事：<strong>先序是 $O_1 O_2 O_3$ 时，前三个 o 能排出多少种合法的中序？</strong> 这正是栈模型里\"入栈序列已定，有多少种合法出栈序列\"——$n = 3$ 的卡特兰数：</li>\n</ol>\n<p>$$C_3 = \\frac{1}{3+1}\\binom{6}{3} = 5$$</p>\n<p><strong>为什么能把 p、s 直接忽略</strong>：中序要求 p、s 排在最后两位 ⇒ 弹出 p 之前，三个 o 必须<strong>全部</strong>弹完 ⇒ 也就是说 p 是在三个 o 都出栈之后才入栈的，全程栈里只折腾这三个 o。所以前面三个 o 的合法排列，恰好就是\"3 个元素进出栈\"的全部合法出栈序列，共 5 种。</p>\n<p><strong>为什么 5 种中序刚好对应 5 种形状</strong>：编号之后各结点互不相同，每个合法的中序都唯一确定一棵二叉树；而这 5 棵树的先序又完全一样（都是 $O_1O_2O_3ps$），<strong>形状相同 + 先序相同 ⇒ 只能是同一棵树</strong>，所以它们的形状两两不同。把编号擦掉，正是 5 种不同的树形。</p>\n<p>所以选 C。</p>"
  },
  {
    "id": "q-auto-ds-821",
    "year": 2014,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-2",
    "topics": [
      "ds-2-2"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>循环队列放在一维数组 A[0…M−1] 中，end1 指向队首元素，end2 指向队尾元素的后一个位置。假设队列两端均可进行入队和出队操作，队列中最多能容纳 M−1 个元素。初始时为空。下列判断队空和队满的条件中，正确的是</p>",
    "options": [
      "队空：<code>end1 == end2</code>；队满：<code>end1 == (end2 + 1) mod M</code>",
      "队空：<code>end1 == end2</code>；队满：<code>end2 == (end1 + 1) mod (M − 1)</code>",
      "队空：<code>end2 == (end1 + 1) mod M</code>；队满：<code>end1 == (end2 + 1) mod M</code>",
      "队空：<code>end1 == (end2 + 1) mod M</code>；队满：<code>end2 == (end1 + 1) mod (M − 1)</code>"
    ],
    "answer": "A",
    "analysis": "<p><strong>选 A。</strong> 这题就是上面「约定 A + 牺牲一个单元」的翻版：<code>end1</code> 相当于 <code>front</code>（指向队首元素），<code>end2</code> 相当于 <code>rear</code>（指向队尾元素的后一个位置）。</p>\n<ul>\n<li>队空：两个指针重合，<code>end1 == end2</code>；</li>\n<li>队满：牺牲一个单元，<code>end1 == (end2 + 1) mod M</code>（最多存 M−1 个）。</li>\n</ul>\n<p>B、D 里那个 <code>mod (M − 1)</code> 是干扰项——<strong>取模一定是对数组长度 M 取</strong>，跟\"最多能存几个\"没有关系。</p>"
  },
  {
    "id": "q-auto-ds-841",
    "year": 2019,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-2",
    "topics": [
      "ds-2-2"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>请设计一个队列，要求满足：①初始时队列为空；②入队时，允许增加队列占用空间；③出队后，出队元素所占用的空间可重复使用，即整个队列所占用的空间只增不减；④入队操作和出队操作的时间复杂度始终保持为 $O(1)$。请回答：</p>\n<ol>\n<li>该队列是应选择链式存储结构，还是应选择顺序存储结构？</li>\n<li>画出队列的初始状态，并给出判断队空和队满的条件。</li>\n<li>画出第一个元素入队后的队列状态。</li>\n<li>给出入队操作和出队操作的基本过程。</li>\n</ol>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>设计思路（这道题的关键）</strong>：</p>\n<ol>\n<li><strong>选存储结构</strong>：要\"能动态增长 + 空间只增不减 + 出入队都 $O(1)$\" ⇒ 顺序存储扩容得整体搬移（$O(n)$，破坏 ④），只能<strong>链式存储</strong>。</li>\n<li><strong>让出队的空间还能再用</strong>：出队时把 front 处的结点腾空、front 后移，腾出来的结点不能丢 ⇒ 让 <strong>rear 的 next 循环回前面</strong>，所以要用<strong>循环链表</strong>。</li>\n<li><strong>初始状态不能一个结点都没有</strong>：否则\"初始队空\"和\"所有元素都出队后的队空\"没法用同一套办法判别 ⇒ 一开始就造一个<strong>空结点</strong>，<code>front = rear</code> 都指向它。</li>\n<li><strong>怎么区分空和满</strong>：<code>front == rear</code> 既可能是空也可能是满 ⇒ 用最常规的<strong>牺牲一个单元</strong>（永远留一个空结点不用）。</li>\n<li><strong>rear 怎么定义</strong>（最容易卡住的一步）：若按直觉定义成\"指向队尾元素\"，<strong>第一个元素入队和后续入队的操作就不统一</strong>——初始入队时 rear 不动、赋值后再挂一个空结点；后续入队却要 rear 先后移、再赋值、再挂空结点。为了让两处一致，只能把 rear 定义成\"<strong>指向最后一个元素的下一个结点</strong>\"，也就是那个牺牲的空结点；这样入队永远是\"先填 rear 指的空结点，再让 rear 落到下一个空结点上\"。</li>\n<li>于是：<strong>队空 <code>front == rear</code>，队满 <code>rear-&gt;next == front</code></strong>。</li>\n</ol>\n<p><strong>（1）链式存储结构。</strong></p>\n<p><strong>（2）初始状态与判据。</strong> 初始时 <code>front = rear</code> 指向同一个空结点，且它的 <code>next</code> 指向它自己（自环，让\"循环\"从一开始就成立）：</p>\n<pre><code class=\"language-text\">front\nrear  →   [ 空 ] ↺\n</code></pre>\n<ul>\n<li><strong>队空</strong>：<code>front == rear</code>（两指针重合，一个元素都没有）；</li>\n<li><strong>队满</strong>：<code>rear-&gt;next == front</code>。</li>\n</ul>\n<p>这里的\"队满\"要注意语义：它<strong>不是\"不能再入队\"</strong>，而是\"<strong>已经没有任何空闲结点可以复用了，再入队就必须新申请空间</strong>\"——正因如此，这个队列才能一路增长下去（要求 ②）。</p>\n<p><strong>（3）第一个元素入队后。</strong> 把数据写进 <code>rear</code> 指的那个空结点（它成为队尾元素）；因为后面已经没有空结点了，再新申请一个空结点挂到它后面当缓冲：</p>\n<pre><code class=\"language-text\">front          rear\n  ↓             ↓\n[ a ]  →  [ 空 ] ↺\n</code></pre>\n<p>此时队列里只有 a，却已经没有可复用的空闲结点了，所以\"队满\"为真——下一次入队得再申请一个结点。</p>\n<p><strong>（4）基本过程。</strong></p>\n<ul>\n<li><strong>入队</strong>：① 把 x 写进 <code>rear</code> 指的那个空结点（它成为新的队尾）；② 再看 <code>rear</code> 后面：如果那里已经是新申请来的空结点，就把 <code>rear</code> 直接移过去；如果后面是 <code>front</code>（说明没有空闲结点了），就新申请一个空结点挂在队尾之后，<code>rear</code> 指向它。</li>\n<li><strong>出队</strong>：① 若 <code>front == rear</code> 则队空，报错返回；② 取出 <code>front</code> 所在结点的数据；③ <code>front</code> 后移一个结点——腾出来的结点<strong>留在环里</strong>，等 <code>rear</code> 转一圈回来时复用（这就是要求 ③）。</li>\n</ul>\n<p><strong>完整代码实现</strong>：</p>\n<pre><code class=\"language-c\">typedef struct LNode {\n    ElemType data;\n    struct LNode *next;\n} LNode, *QueuePtr;\n\ntypedef struct {\n    QueuePtr front;   // 队首元素所在的结点\n    QueuePtr rear;    // 队尾元素的下一个结点（永远是那个空结点）\n} LinkQueue;\n\n// 初始化\nvoid InitQueue(LinkQueue &amp;Q) {\n    QueuePtr p = (QueuePtr) malloc(sizeof(LNode));\n    p-&gt;next = p;                     // 自环\n    Q.front = Q.rear = p;            // 队空\n}\n\nbool QueueEmpty(LinkQueue Q) { return Q.front == Q.rear; }\nbool QueueFull (LinkQueue Q) { return Q.rear-&gt;next == Q.front; }\n\n// 入队\nvoid EnQueue(LinkQueue &amp;Q, ElemType x) {\n    Q.rear-&gt;data = x;                        // ① 缓冲结点写入 x，它成为新的队尾\n    if (Q.rear-&gt;next == Q.front) {           // ② 后面没有空结点 → 新申请一个挂上\n        QueuePtr s = (QueuePtr) malloc(sizeof(LNode));\n        s-&gt;next = Q.front;\n        Q.rear-&gt;next = s;\n        Q.rear = s;\n    } else {\n        Q.rear = Q.rear-&gt;next;               // ③ 后面本来就空着（出队腾出来的）→ 移过去复用\n    }\n}\n\n// 出队\nbool DeQueue(LinkQueue &amp;Q, ElemType &amp;x) {\n    if (Q.front == Q.rear) return false;     // 队空\n    x = Q.front-&gt;data;\n    Q.front = Q.front-&gt;next;                 // front 后移，旧结点留在环里等复用\n    return true;\n}\n</code></pre>\n<p>出队时<strong>可以不用清空</strong>旧结点：哪些结点是\"空闲可复用\"的，完全由 <code>front</code>、<code>rear</code> 的位置关系决定，下一次入队走 ③ 分支时会直接把它覆盖掉。</p>"
  },
  {
    "id": "q-auto-ds-951",
    "year": 2025,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-2",
    "topics": [
      "ds-2-3"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>对于括号匹配问题，符号栈初始为空，容量为 3，不能实现的表达式是</p>",
    "options": [
      "<code>(a+[b+(c+d)/e]+f)+g−h</code>",
      "<code>[a*((b+c)/(d−e)+f/g)]−h</code>",
      "<code>[a*(b−(c−d)*e/(f+g))−h]</code>",
      "<code>[a−(b+[c*(d+e)−f]+g+h)]</code>"
    ],
    "answer": "D",
    "analysis": "<p><strong>选 D。</strong> 演算方法：从左到右扫一遍，遇左括号栈深 +1、遇右括号栈深 −1，<strong>过程中栈深的最大值就是这条表达式需要的容量</strong>（顺带核对一下配对类型是否一致）。</p>\n<ul>\n<li>A：栈深 1 → 2 → 3 → 2 → 1 → 0，最大 <strong>3</strong> ✅</li>\n<li>B：1 → 2 → 3 → 2 → 3 → 2 → 1 → 0，最大 <strong>3</strong> ✅</li>\n<li>C：1 → 2 → 3 → 2 → 3 → 2 → 1 → 0，最大 <strong>3</strong> ✅</li>\n<li>D：1 → 2 → 3 → <strong>4</strong> ✗ 中途就要 4 个格子，容量 3 放不下</li>\n</ul>\n<p>所以选 D。</p>"
  },
  {
    "id": "q-auto-ds-1022",
    "year": 2012,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-2",
    "topics": [
      "ds-2-3"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>已知操作符包括 <code>+</code> <code>-</code> <code>*</code> <code>/</code> <code>(</code> <code>)</code>。将中缀表达式 <code>a+b-a*((c+d)/e-f)+g</code> 转换为等价的后缀表达式 <code>ab+acd+e/f-*-g+</code> 时，用栈存放暂时还不能确定运算次序的操作符。栈初始时为空，转换过程中同时保存在栈中的操作符的最大个数是</p>",
    "options": [
      "5",
      "7",
      "8",
      "11"
    ],
    "answer": "A",
    "analysis": "<p><strong>选 A（5 个）。</strong> 按规则从左到右走一遍（栈里只放运算符，方括号内从左到右是栈底到栈顶）：</p>\n<table>\n<thead>\n<tr>\n<th>扫到</th>\n<th>动作</th>\n<th>栈</th>\n<th>已输出</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>a</code></td>\n<td>输出</td>\n<td>[]</td>\n<td>a</td>\n</tr>\n<tr>\n<td><code>+</code></td>\n<td>入栈</td>\n<td>[+]</td>\n<td>a</td>\n</tr>\n<tr>\n<td><code>b</code></td>\n<td>输出</td>\n<td>[+]</td>\n<td>ab</td>\n</tr>\n<tr>\n<td><code>-</code></td>\n<td><code>+</code> ≥ <code>-</code>，弹出 <code>+</code> 输出；<code>-</code> 入栈</td>\n<td>[- ]</td>\n<td>ab+</td>\n</tr>\n<tr>\n<td><code>a</code></td>\n<td>输出</td>\n<td>[- ]</td>\n<td>ab+a</td>\n</tr>\n<tr>\n<td><code>*</code></td>\n<td><code>-</code> &lt; <code>*</code>，不弹；<code>*</code> 入栈</td>\n<td>[- *]</td>\n<td>ab+a</td>\n</tr>\n<tr>\n<td><code>(</code></td>\n<td>入栈</td>\n<td>[- * (]</td>\n<td>ab+a</td>\n</tr>\n<tr>\n<td><code>(</code></td>\n<td>入栈</td>\n<td>[- * ( (]</td>\n<td>ab+a</td>\n</tr>\n<tr>\n<td><code>c</code></td>\n<td>输出</td>\n<td>[- * ( (]</td>\n<td>ab+ac</td>\n</tr>\n<tr>\n<td><code>+</code></td>\n<td>栈顶是 <code>(</code>，停；<code>+</code> 入栈</td>\n<td>[- * ( ( +] ← <strong>5 个</strong></td>\n<td>ab+ac</td>\n</tr>\n<tr>\n<td><code>d</code></td>\n<td>输出</td>\n<td>[- * ( ( +]</td>\n<td>ab+acd</td>\n</tr>\n<tr>\n<td><code>)</code></td>\n<td>弹到 <code>(</code> 为止：弹出 <code>+</code> 输出，再弹掉 <code>(</code></td>\n<td>[- * (]</td>\n<td>ab+acd+</td>\n</tr>\n<tr>\n<td><code>/</code></td>\n<td>栈顶是 <code>(</code>，停；<code>/</code> 入栈</td>\n<td>[- * ( /]</td>\n<td>ab+acd+</td>\n</tr>\n<tr>\n<td><code>e</code></td>\n<td>输出</td>\n<td>[- * ( /]</td>\n<td>ab+acd+e</td>\n</tr>\n<tr>\n<td><code>-</code></td>\n<td><code>/</code> ≥ <code>-</code>，弹出 <code>/</code> 输出；栈顶 <code>(</code> 停；<code>-</code> 入栈</td>\n<td>[- * ( -]</td>\n<td>ab+acd+e/</td>\n</tr>\n<tr>\n<td><code>f</code></td>\n<td>输出</td>\n<td>[- * ( -]</td>\n<td>ab+acd+e/f</td>\n</tr>\n<tr>\n<td><code>)</code></td>\n<td>弹出 <code>-</code> 输出，再弹掉 <code>(</code></td>\n<td>[- *]</td>\n<td>ab+acd+e/f-</td>\n</tr>\n<tr>\n<td><code>+</code></td>\n<td><code>*</code> ≥ <code>+</code>、<code>-</code> ≥ <code>+</code>，依次弹出输出；<code>+</code> 入栈</td>\n<td>[+]</td>\n<td>ab+acd+e/f-*-</td>\n</tr>\n<tr>\n<td><code>g</code></td>\n<td>输出</td>\n<td>[+]</td>\n<td>ab+acd+e/f-*-g</td>\n</tr>\n<tr>\n<td>结束</td>\n<td>弹出 <code>+</code></td>\n<td>[]</td>\n<td>ab+acd+e/f-*-g+</td>\n</tr>\n</tbody>\n</table>\n<p>结果与题目给的后缀表达式一致 ✅。过程中栈里最多同时有 <strong>5</strong> 个运算符（<code>- * ( ( +</code>），选 A。</p>"
  },
  {
    "id": "q-auto-ds-1064",
    "year": 2015,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-2",
    "topics": [
      "ds-2-3"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>已知程序如下：</p>\n<pre><code class=\"language-c\">int S(int n)\n{ return (n&lt;=0) ? 0 : S(n-1)+n; }\nvoid main()\n{ cout &lt;&lt; S(1); }\n</code></pre>\n<p>程序运行时使用栈来保存调用过程的信息，自栈底到栈顶保存的信息依次对应的是</p>",
    "options": [
      "<code>main() → S(1) → S(0)</code>",
      "<code>S(0) → S(1) → main()</code>",
      "<code>main() → S(0) → S(1)</code>",
      "<code>S(1) → S(0) → main()</code>"
    ],
    "answer": "A",
    "analysis": "<p><strong>选 A。</strong> 调用顺序是 <code>main</code> 调 <code>S(1)</code>、<code>S(1)</code> 内部又调 <code>S(0)</code>，所以自栈底到栈顶就是 <code>main() → S(1) → S(0)</code>：最早进入的压在底下，最后进入的落在顶上。</p>"
  },
  {
    "id": "q-auto-ds-1165",
    "year": 2016,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-2",
    "topics": [
      "ds-2-4"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>有一个 100 阶的三对角矩阵 M，其元素 $m_{i,j}$（$1 \\le i, j \\le 100$）按行优先依次压缩存入下标从 0 开始的一维数组 N 中。元素 $m_{30,30}$ 在 N 中的下标是</p>",
    "options": [
      "86",
      "87",
      "88",
      "89"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B（87）。</strong> 三对角矩阵每行最多 3 个元素（$|i-j| \\le 1$）。下标从 0 开始，所以<strong>数 $m_{30,30}$ 前面有多少个元素</strong>即可：</p>\n<ul>\n<li>第 1 行只有 2 个元素（$m_{1,1}$、$m_{1,2}$）；</li>\n<li>第 2 ~ 29 行每行 3 个，共 $28 \\times 3 = 84$ 个；</li>\n<li>于是第 30 行之前共 $2 + 84 = 86$ 个；</li>\n<li>第 30 行依次是 $m_{30,29}$、$m_{30,30}$、$m_{30,31}$，$m_{30,30}$ 是本行第 2 个，前面还有 1 个。</li>\n</ul>\n<p>合计前面 $86 + 1 = 87$ 个元素，下标就是 <strong>87</strong>。</p>\n<p>通式：三对角矩阵按行优先存储（$i, j$ 从 1 开始、数组下标从 0 开始）时，$A[i][j]$ 的下标 $= 2i + j - 3$，代入 $i = j = 30$ 同样得 87。</p>"
  },
  {
    "id": "q-auto-ds-1187",
    "year": 2021,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-2",
    "topics": [
      "ds-2-4"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>二维数组 A 按行优先方式存储，每个元素占用 1 个存储单元。若元素 <code>A[0][0]</code> 的存储地址是 100，<code>A[3][3]</code> 的存储地址是 220，则元素 <code>A[5][5]</code> 的存储地址是</p>",
    "options": [
      "295",
      "300",
      "301",
      "306"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B（300）。</strong> 考的是\"行列号 ↔ 一维地址\"的换算。</p>\n<p>设每行有 $x$ 列。从 $A[0][0]$ 到 $A[3][3]$ 跨过 3 整行、再多 3 个元素：</p>\n<p>$$3x + 3 = 220 - 100 = 120 \\;\\Longrightarrow\\; x = 39$$</p>\n<p>即每行 39 列，于是</p>\n<p>$$A[5][5] = 100 + 5x + 5 = 100 + 5 \\times 39 + 5 = 300$$</p>"
  },
  {
    "id": "q-auto-ds-1208",
    "year": 2023,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-2",
    "topics": [
      "ds-2-4"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>若采用三元组表存储结构存储稀疏矩阵 M，则除三元组表外，下列数据中还需要保存的是</p>\n<ul>\n<li>Ⅰ. M 的行数</li>\n<li>Ⅱ. M 中包含非零元素的行数</li>\n<li>Ⅲ. M 的列数</li>\n<li>Ⅳ. M 中包含非零元素的列数</li>\n</ul>",
    "options": [
      "仅 Ⅰ、Ⅲ",
      "仅 Ⅰ、Ⅳ",
      "仅 Ⅱ、Ⅳ",
      "Ⅰ、Ⅱ、Ⅲ、Ⅳ"
    ],
    "answer": "A",
    "analysis": "<p><strong>选 A。</strong> 三元组表只记了每个非零元素的（行号、列号、值），要把它<strong>还原成矩阵</strong>，还缺矩阵的形状——<strong>行数和列数</strong>（Ⅰ、Ⅲ）。至于哪几行、哪几列含非零元素，遍历一遍三元组就能统计出来，不必额外保存。</p>"
  },
  {
    "id": "q-auto-ds-1226",
    "year": null,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-2",
    "topics": [
      "ds-2-4"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>有一个 $n \\times n$ 的对称矩阵 A，将其上三角部分（含主对角线）<strong>按列</strong>存放在一维数组 B 中，且规定 <code>A[0][0]</code> 放在 <code>B[0]</code> 处。若 $i \\le j$，则 <code>A[i][j]</code> 在数组 B 中的下标为</p>",
    "options": [
      "$\\frac{j(j+1)}{2} + i$",
      "$\\frac{i(i+1)}{2} + j$",
      "$\\frac{n(n-1)}{2} - \\frac{(n-j)(n-j-1)}{2} + i$",
      "$\\frac{j(j-1)}{2} + i$"
    ],
    "answer": "A",
    "analysis": "<p><strong>选 A。</strong> 按列存上三角，每列存的是一个\"竖条\"：第 0 列 1 个（$A[0][0]$）、第 1 列 2 个（$A[0][1]$、$A[1][1]$）……第 $j$ 列 $j+1$ 个（$A[0][j]$ 到 $A[j][j]$）。</p>\n<p>所以 $A[i][j]$（$i \\le j$）前面的元素数：</p>\n<ul>\n<li>前 $j$ 列：$1 + 2 + \\dots + j = \\frac{j(j+1)}{2}$ 个；</li>\n<li>本列之内：$A[0][j]$ 到 $A[i-1][j]$，共 $i$ 个。</li>\n</ul>\n<p>即下标为 $\\frac{j(j+1)}{2} + i$。核对：$A[0][0] \\to 0$、$A[0][1] \\to 1$、$A[1][1] \\to 2$ ✅。</p>"
  },
  {
    "id": "q-auto-ds-1373",
    "year": 2015,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-2",
    "topics": [
      "ds-2-5"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>已知字符串 s 为 <code>abaabaabacacaabaabcc</code>，模式串 t 为 <code>abaabc</code>。采用 KMP 算法进行匹配，第一次出现\"失配\"（$s[i] \\ne t[j]$）时，$i = j = 5$，则下次开始匹配时，i 和 j 的值分别为</p>",
    "options": [
      "$i = 1$，$j = 0$",
      "$i = 5$，$j = 0$",
      "$i = 5$，$j = 2$",
      "$i = 6$，$j = 2$"
    ],
    "answer": "C",
    "analysis": "<p><strong>选 C（i = 5，j = 2）。</strong> 模式串 <code>abaabc</code> 的 next 数组（从 0 开始）是：</p>\n<table>\n<thead>\n<tr>\n<th>位序</th>\n<th>1</th>\n<th>2</th>\n<th>3</th>\n<th>4</th>\n<th>5</th>\n<th>6</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>模式串</td>\n<td>a</td>\n<td>b</td>\n<td>a</td>\n<td>a</td>\n<td>b</td>\n<td>c</td>\n</tr>\n<tr>\n<td>next</td>\n<td>0</td>\n<td>1</td>\n<td>1</td>\n<td>2</td>\n<td>2</td>\n<td>3</td>\n</tr>\n</tbody>\n</table>\n<p>失配发生在 $j = 5$：KMP 让主串指针 i 原地不动，只把 j 改成 <code>next[5] = 2</code>，所以下次开始匹配时是 $i = 5$、$j = 2$。</p>"
  },
  {
    "id": "q-auto-ds-1393",
    "year": 2024,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-2",
    "topics": [
      "ds-2-5"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>KMP 算法使用修正后的 next 数组进行模式匹配，模式串 S 为 <code>aabaab</code>，当主串的某个字符与 S 的某个字符失配时，S 向右滑动的最长距离是</p>",
    "options": [
      "5",
      "4",
      "3",
      "2"
    ],
    "answer": "A",
    "analysis": "<p><strong>选 A（5）。</strong> \"修正后的 next 数组\"就是 nextval：</p>\n<table>\n<thead>\n<tr>\n<th>位序</th>\n<th>1</th>\n<th>2</th>\n<th>3</th>\n<th>4</th>\n<th>5</th>\n<th>6</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>模式串</td>\n<td>a</td>\n<td>a</td>\n<td>b</td>\n<td>a</td>\n<td>a</td>\n<td>b</td>\n</tr>\n<tr>\n<td>next</td>\n<td>0</td>\n<td>1</td>\n<td>2</td>\n<td>1</td>\n<td>2</td>\n<td>3</td>\n</tr>\n<tr>\n<td>nextval</td>\n<td>0</td>\n<td>0</td>\n<td>2</td>\n<td>0</td>\n<td>0</td>\n<td>2</td>\n</tr>\n<tr>\n<td>右滑距离 $j - \\mathrm{nextval}[j]$</td>\n<td>1</td>\n<td>2</td>\n<td>1</td>\n<td>4</td>\n<td>5</td>\n<td>4</td>\n</tr>\n</tbody>\n</table>\n<p>第 $j$ 位失配时，模式串右滑 $j - \\mathrm{nextval}[j]$ 格（滑完之后 nextval[j] 就是新的 j）。表里最大的是第 5 位失配时的 5，所以选 A。</p>"
  },
  {
    "id": "q-auto-ds-1429",
    "year": 2010,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-3",
    "topics": [
      "ds-3-1"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>在一棵度为 4 的树 T 中，若有 20 个度为 4 的结点、10 个度为 3 的结点、1 个度为 2 的结点、10 个度为 1 的结点，则树 T 的叶结点的个数是</p>",
    "options": [
      "41",
      "82",
      "113",
      "122"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B（82）。</strong> 直接套 ① 那条恒等式「结点总数 = 所有结点的度之和 + 1」：度之和 $= 20 \\times 4 + 10 \\times 3 + 1 \\times 2 + 10 \\times 1 = 122$，于是结点总数 $N = 122 + 1 = 123$，叶结点数 $n_0 = 123 - (20 + 10 + 1 + 10) = 82$。</p>"
  },
  {
    "id": "q-auto-ds-1442",
    "year": 2016,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-3",
    "topics": [
      "ds-3-1"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>若森林 F 有 15 条边、25 个结点，则 F 包含树的个数是</p>",
    "options": [
      "8",
      "9",
      "10",
      "11"
    ],
    "answer": "C",
    "analysis": "<p><strong>选 C（10）。</strong> 每棵树里，除根以外的每个结点都恰好往上连一条边，所以<strong>整个森林的边数 = 非根结点的个数</strong>：25 个结点里非根的有 15 个，根结点就是 $25 - 15 = 10$ 个，而一个根结点对应一棵树，森林里共 10 棵树。</p>"
  },
  {
    "id": "q-auto-ds-1455",
    "year": 2016,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-3",
    "topics": [
      "ds-3-1"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>若一棵非空 k（$k \\ge 2$）叉树 T 中的每个非叶结点都有 k 个孩子，则称 T 为正则 k 叉树。请回答下列问题并给出推导过程。\n1）若 T 有 m 个非叶结点，则 T 中的叶结点有多少个？\n2）若 T 的高度为 h（单结点的树 $h = 1$），则 T 的结点数最多为多少个？最少为多少个？</p>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>1）叶结点有 $m(k-1) + 1$ 个。</strong> 设叶结点数为 $n_0$，结点总数就是 $N = m + n_0$。每个非叶结点都有 k 个孩子，孩子总数是 $mk$；而除根以外每个结点都是别人的孩子，孩子总数又等于 $N - 1$。两式相等：$mk = m + n_0 - 1$，解得 $n_0 = m(k-1) + 1$。</p>\n<p><strong>2）最多 $\\frac{k^h - 1}{k - 1}$ 个，最少 $k(h-1) + 1$ 个。</strong></p>\n<p>最多：让每一层都长满——第 1 层 1 个、第 2 层 k 个、第 3 层 $k^2$ 个……第 h 层 $k^{h-1}$ 个，等比求和得 $1 + k + k^2 + \\dots + k^{h-1} = \\frac{k^h - 1}{k - 1}$。</p>\n<p>最少：树高为 h，就要求有结点一直伸到第 h 层。根必须是非叶结点（否则高度只有 1），于是第 2 层固定有 k 个结点；这 k 个里只留一个继续长孩子、其余 $k-1$ 个当叶子，第 3 层又只有 k 个……直到第 h 层，每层都是 k 个。总数 = 第 1 层的 1 个 + 第 2 到第 h 层每层的 k 个 = $1 + k(h-1)$。</p>"
  },
  {
    "id": "q-auto-ds-1471",
    "year": null,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-3",
    "topics": [
      "ds-3-1"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>已知一棵完全二叉树有 128 个叶子结点，根节点的深度为 1，那么这棵树可能的最大深度是</p>",
    "options": [
      "7",
      "8",
      "9",
      "10"
    ],
    "answer": "C",
    "analysis": "<p><strong>选 C（9）。</strong> 完全二叉树的叶结点数由结点总数唯一决定：$n$ 为偶数时 $n_0 = n/2$，$n$ 为奇数时 $n_0 = (n+1)/2$，合起来就是 $n_0 = \\lceil n/2 \\rceil$。反过来由 $n_0 = 128$ 得 $n = 255$ 或 $n = 256$。</p>\n<p>深度要最大，结点数就取多的那个，$n = 256$：前 8 层是满的，共 $2^8 - 1 = 255$ 个结点，多出的 1 个落在第 9 层。这时第 9 层那 1 个是叶结点，第 8 层里它的父结点有了孩子、剩下的 127 个才是叶结点，加起来正好 128。用 ⑤ 的公式核对：$h = \\lfloor \\log_2 256 \\rfloor + 1 = 9$。</p>"
  },
  {
    "id": "q-auto-ds-1486",
    "year": null,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-3",
    "topics": [
      "ds-3-1"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>给定结点总数 n，则不能确定叶子结点数量的是</p>",
    "options": [
      "满二叉树",
      "完全二叉树",
      "哈夫曼树",
      "二叉搜索树"
    ],
    "answer": "D",
    "analysis": "<p><strong>选 D。</strong> 前三种的叶结点数都能由 $n$ 直接算出：满二叉树是 $n_0 = \\frac{n+1}{2}$，哈夫曼树也是 $n_0 = \\frac{n+1}{2}$（每个非叶结点都有两个孩子，$n_1 = 0$），完全二叉树是 $n_0 = \\lceil n/2 \\rceil$。</p>\n<p>二叉搜索树的形状取决于结点插入的先后顺序，同一个 $n$ 能长出各种形态：$n = 3$ 时，链状的 BST 只有 1 个叶结点，根带两个孩子的那种有 2 个，叶结点数并不唯一。</p>"
  },
  {
    "id": "q-auto-ds-1534",
    "year": 2020,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-3",
    "topics": [
      "ds-3-5"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>对于任意一棵高度为 5 且有 10 个结点的二叉树，若采用顺序存储结构保存，每个结点占 1 个存储单元（仅存放结点的数据信息），则存放该二叉树需要的存储单元数量至少是</p>",
    "options": [
      "31",
      "16",
      "15",
      "10"
    ],
    "answer": "A",
    "analysis": "<p><strong>选 A（31）。</strong> 关键词是「<strong>任意</strong>」和「至少」：问的是\"保证任意一棵高 5、10 个结点的二叉树都装得下\"需要多少单元，所以按最坏情况算，而不是挑一棵省地方的树（完全二叉树 10 个结点只到下标 15 附近）。顺序存储的下标就是完全二叉树的编号，高度为 5 的树，结点下标最大会落在第 5 层的最后一个位置，也就是 $2^5 - 1 = 31$：让路径一路向右走（$1 \\to 3 \\to 7 \\to 15 \\to 31$），最后那个结点就能放到第 5 层最右边；这条斜链只占 5 个结点，剩下 5 个随便挂在别的空位上，照样是高 5、10 个结点的二叉树。所以至少需要 31 个存储单元。</p>"
  },
  {
    "id": "q-auto-ds-1547",
    "year": null,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-3",
    "topics": [
      "ds-3-5"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>具有 n 个结点的三叉树用三叉链表表示，则树中空指针域的个数为</p>",
    "options": [
      "$3n+1$",
      "$2n+1$",
      "$3n-1$",
      "$3n$"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B（$2n+1$）。</strong> 三叉链表的每个结点有 3 个指针域，$n$ 个结点一共 $3n$ 个。从下往上看，除根结点以外每个结点都恰好被父结点的一个指针指着，所以非空的指针域只有 $n-1$ 个，空指针域就是 $3n - (n-1) = 2n+1$ 个。（同一套算法放在二叉链表上：$2n - (n-1) = n+1$，正好和前面那条对上。）</p>"
  },
  {
    "id": "q-auto-ds-1605",
    "year": 2011,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-3",
    "topics": [
      "ds-3-5"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>一棵二叉树的前序遍历序列和后序遍历序列分别为 <code>1, 2, 3, 4</code> 和 <code>4, 3, 2, 1</code>，该二叉树的中序遍历序列不会是</p>",
    "options": [
      "<code>1, 2, 3, 4</code>",
      "<code>2, 3, 4, 1</code>",
      "<code>3, 2, 4, 1</code>",
      "<code>4, 3, 2, 1</code>"
    ],
    "answer": "C",
    "analysis": "<p><strong>选 C。</strong> 先序 <code>1 2 3 4</code> 定出 1 是根（后序最后一位也是 1，对上了）、2 是 1 唯一的孩子、3 是 2 唯一的孩子、4 是 3 唯一的孩子——这棵树的骨架就是一条 4 个结点的单链；至于每一节挂在左边还是右边，先序 + 后序看不出来（这正是这对组合定不出树的地方）。</p>\n<p>单链里每个结点只有一棵子树，那棵子树的所有结点在中序里必须全排在它同一侧。看 C：<code>3, 2, 4, 1</code> 里 2 唯一的孩子子树是 <code>{3, 4}</code>，可 3 在 2 左边、4 在 2 右边，被 2 劈成了两半——出不来。另外三个都能构造：<code>1,2,3,4</code> 是 2、3、4 依次挂在右边，<code>4,3,2,1</code> 是依次挂在左边，<code>2,3,4,1</code> 是 2 挂 1 左边、其余挂右边。</p>"
  },
  {
    "id": "q-auto-ds-1620",
    "year": 2012,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-3",
    "topics": [
      "ds-3-5"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>若一棵二叉树的前序遍历序列为 <code>a, e, b, d, c</code>，后序遍历序列为 <code>b, c, d, e, a</code>，则根结点的孩子结点</p>",
    "options": [
      "只有 e",
      "有 e、b",
      "有 e、c",
      "无法确定"
    ],
    "answer": "A",
    "analysis": "<p><strong>选 A（只有 e）。</strong> 先序 + 后序定不出整棵树的形状，那就只挑能确定的部分往下推。</p>\n<p><strong>a 是根</strong>：前序第一个是 a，后序最后一个也是 a，对上了。</p>\n<p><strong>e 是这棵子树的根</strong>：去掉 a，剩下前序 <code>e b d c</code>、后序 <code>b c d e</code>——前序的第一个、后序的最后一个都是 e。</p>\n<p><strong>e 有没有兄弟</strong>：不妨假设有。先序去掉 a 之后必然是两块——e 的子树整段在前、兄弟的子树整段在后（兄弟那棵子树只可能由 e 后面那些结点 <code>b d c</code> 组成）；后序的排法则是「e 的子树 → 兄弟的子树 → a」。e 是它那棵子树的根，在后序里排在 e 的子树那一段的最后，所以兄弟的子树必须整段落在 e 的<strong>后面</strong>。可实际后序 <code>b c d e a</code> 里，e 已经紧挨着 a 了（它后面只剩 a 一个），b、c、d 又全排在 e 前面——兄弟的子树无处可放，矛盾。所以 e 没有兄弟。</p>\n<p><strong>另一条路，直接从定义看</strong>：先序的结构是 <code>a [L] [R]</code>、后序是 <code>[L] [R] a</code>；去掉 a 之后，「前序的第一个」是 L 的根、「后序的最后一个」是 R 的根，而现在这两个位置都是 e，说明 e 既在 L 也在 R——e 只有一个，L 和 R 就不可能同时存在，e 只能是唯一的孩子。</p>\n<p>小心别选 D：先序 + 后序定不出来的是「这个孩子挂在左边还是右边」以及往下各层的形状，根有几个孩子是定得出来的。</p>"
  },
  {
    "id": "q-auto-ds-1883",
    "year": 2014,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-3",
    "topics": [
      "ds-3-2"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>若对下图所示的二叉树进行中序线索化，则结点 X 的左、右线索指向的结点分别是</p>\n<p><img alt=\"2014 题图：a 是根，左孩子 b、右孩子 c；b 的左孩子是 d、右孩子是 X；d 的左孩子是 e\" src=\"/408-review/assets/textbook/ds-threaded-tree-2014.webp\" /></p>",
    "options": [
      "e, c",
      "e, a",
      "d, c",
      "b, a"
    ],
    "answer": "D",
    "analysis": "<p><strong>选 D（b, a）。</strong> 中序遍历这棵树得到 <code>e d b X a c</code>：排在 X 前面的 b 是它的前驱，排在后面的 a 是它的后继。</p>\n<p>X 是叶结点，左、右指针本来都空着，线索化时两个都要改成线索——左线索指向前驱 b、右线索指向后继 a，所以是 D。</p>"
  },
  {
    "id": "q-auto-ds-1900",
    "year": 2010,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-3",
    "topics": [
      "ds-3-2"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>下列线索二叉树中（用虚线表示线索），符合后序线索树定义的是（四个选项见下图）</p>\n<p><img alt=\"后序线索树选择题的四个选项 A、B、C、D：同一棵二叉树（a 的左孩子 b、右孩子 c，b 的右孩子 d）配了不同的虚线走向\" src=\"/408-review/assets/textbook/ds-threaded-postorder-choices.webp\" /></p>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>选 D。</strong> 这棵树的后序序列是 <code>d b c a</code>，按「左指针空就指前驱、右指针空就指后继」逐个数：</p>\n<table>\n<thead>\n<tr>\n<th>结点</th>\n<th>空的指针</th>\n<th>该指向谁</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>a</td>\n<td>没有</td>\n<td>左右都是真孩子，不产生线索</td>\n</tr>\n<tr>\n<td>b</td>\n<td>左</td>\n<td>前驱 d</td>\n</tr>\n<tr>\n<td>c</td>\n<td>左、右</td>\n<td>左指前驱 b、右指后继 a</td>\n</tr>\n<tr>\n<td>d</td>\n<td>左、右</td>\n<td>左指针是后序第一个、没有前驱（仍是 NULL），右指后继 b</td>\n</tr>\n</tbody>\n</table>\n<p>也就是说虚线该是「b 的左线索指 d、c 的左线索指 b、c 的右线索指 a、d 的右线索指 b」这四条，只有 D 全对得上。</p>\n<p>另外三个都能挑出对不上的地方：A 把 d 的右线索指到了 c，B 里有两条线索都指向 a（后序里指向 a 的只该有 c 那一条），C 里 d 的右线索也指到了 c。</p>"
  },
  {
    "id": "q-auto-ds-1921",
    "year": null,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-3",
    "topics": [
      "ds-3-2"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>下列关于二叉树的叙述中，正确的是</p>",
    "options": [
      "若二叉树的先序遍历结果是 <code>ABCD</code>，则其中序遍历结果可以是 <code>DABC</code>",
      "如果二叉树的先序遍历序列和中序遍历序列的最后一个结点相同，那么该结点一定是整棵树最右侧的叶子结点",
      "要交换二叉树所有分支结点的左右子树，最好利用中序遍历作为框架解决",
      "删除一棵二叉树可以通过先序递归方式依次释放所有结点"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B。</strong></p>\n<ul>\n<li><strong>A 错</strong>：先序 <code>ABCD</code> 定出根是 A。若中序是 <code>DABC</code>，那 A 左边只有 <code>D</code>（左子树）、右边是 <code>BC</code>（右子树），先序就应该是 A、D、BC 拼起来得 <code>ADBC</code>，和题给的 <code>ABCD</code> 对不上。</li>\n<li><strong>B 对</strong>：先序的最后一个结点，是从根出发「有右孩子就往右、没有右孩子才往左」走到底的那个；中序的最后一个结点是顺着右孩子走到底的<strong>最右下</strong>结点（它必然没有右孩子）。这两个位置要是同一个结点，它就连左孩子也不能有——否则先序的最后会拐进它的左子树里。所以它一定是最右侧的叶子结点。</li>\n<li><strong>C 错</strong>：交换左右子树用<strong>后序</strong>（先序也行）做框架都可以，唯独<strong>中序不行</strong>——中序的框架是「左、根、右」，把根的左右孩子换完再去遍历\"左子树\"时，走进去的已经是被换过来的原右子树，原左子树整条都被漏掉。</li>\n<li><strong>D 错</strong>：释放结点必须<strong>最后</strong>释放根，否则根的左右孩子指针一丢，剩下的结点再也找不到。所以要用<strong>后序</strong>递归，而不是先序。</li>\n</ul>"
  },
  {
    "id": "q-auto-ds-1964",
    "year": 2009,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-3",
    "topics": [
      "ds-3-3"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>将森林转换为对应的二叉树，若在二叉树中，结点 u 是结点 v 的父结点的父结点，则在原来的森林中，u 和 v 可能具有的关系是</p>\n<p>Ⅰ. 父子关系\nⅡ. 兄弟关系\nⅢ. u 的父结点和 v 的父结点是兄弟关系</p>",
    "options": [
      "只有 Ⅱ",
      "Ⅰ 和 Ⅱ",
      "Ⅰ 和 Ⅲ",
      "Ⅰ、Ⅱ 和 Ⅲ"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B（Ⅰ 和 Ⅱ）。</strong> 把二叉树里 u → w → v 这条两步路径拆开，每一步只有两种走法：<strong>往左下</strong>进到第一个孩子、<strong>往右下</strong>进到下一个兄弟。</p>\n<ul>\n<li><strong>左 + 右</strong>：w 是 u 的第一个孩子，v 又是 w 的下一个兄弟 → v 也是 u 的孩子，u、v 是<strong>父子关系</strong>（Ⅰ 成立）；</li>\n<li><strong>右 + 右</strong>：u、w、v 是同一个父亲的连续三个兄弟 → u、v 是<strong>兄弟关系</strong>（Ⅱ 成立）；</li>\n<li><strong>左 + 左</strong>：v 是 u 的孙子；</li>\n<li><strong>右 + 左</strong>：u 是 v 的父亲的兄弟。</li>\n</ul>\n<p>后两种都凑不出 Ⅲ 说的那层关系，所以 Ⅲ 不成立，选 B。</p>"
  },
  {
    "id": "q-auto-ds-1988",
    "year": 2011,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-3",
    "topics": [
      "ds-3-3"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>已知一棵有 2011 个结点的树，其叶结点个数为 116，该树对应的二叉树中无右孩子的结点个数是</p>",
    "options": [
      "115",
      "116",
      "1895",
      "1896"
    ],
    "answer": "D",
    "analysis": "<p><strong>选 D（1896）。</strong> 直接套上面那条结论：非终端结点数 $= 2011 - 116 = 1895$，每个非终端结点贡献一个「最后一个孩子」（它在二叉树里没有右孩子），再加上树根（它没有下一个根，也就没有右孩子），一共 $1895 + 1 = 1896$ 个。</p>"
  },
  {
    "id": "q-auto-ds-2001",
    "year": 2020,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-3",
    "topics": [
      "ds-3-3"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>已知森林 F 及与之对应的二叉树 T，若 F 的先根遍历序列是 <code>a, b, c, d, e, f</code>，后根遍历序列是 <code>b, a, d, f, e, c</code>，则 T 的后序遍历序列是</p>",
    "options": [
      "<code>b, a, d, f, e, c</code>",
      "<code>b, d, f, e, c, a</code>",
      "<code>b, f, e, d, c, a</code>",
      "<code>f, e, d, c, b, a</code>"
    ],
    "answer": "C",
    "analysis": "<p><strong>选 C。</strong> 先套两条等价关系：<strong>森林的先根遍历 = 二叉树 T 的先序</strong>、<strong>森林的后根遍历 = 二叉树 T 的中序</strong>。所以 T 的先序是 <code>a b c d e f</code>、中序是 <code>b a d f e c</code>，题目就变成了\"由先序 + 中序求后序\"。</p>\n<ul>\n<li>先序第一个是 a（中序里 a 也在，位置对得上）→ 中序里 a 左边只有 <code>b</code>、右边是 <code>d f e c</code>；左子树就一个结点 b，右子树的先序段是 <code>c d e f</code>。</li>\n<li>右子树：先序段 <code>c d e f</code>、中序段 <code>d f e c</code> → 根是 c，中序里 c 排在最末尾 → c 没有右子树，左子树是 <code>d f e</code>。</li>\n<li><code>d f e</code>：先序段 <code>d e f</code>、中序段 <code>d f e</code> → 根是 d，中序里 d 排最前面 → d 没有左子树，右子树是 <code>f e</code>。</li>\n<li><code>f e</code>：先序段 <code>e f</code>、中序段 <code>f e</code> → 根是 e，f 是 e 的左孩子。</li>\n</ul>\n<p>按后序「左、右、根」拼起来：左子树给出 <code>b</code>，右子树依次给出 <code>f e d c</code>，最后才是根 a → <code>b, f, e, d, c, a</code>，选 C。</p>"
  },
  {
    "id": "q-auto-ds-2021",
    "year": null,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-3",
    "topics": [
      "ds-3-3"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>森林 F 对应的二叉树是 B，若 F 有 n 个非终端结点，则 B 中右指针域为空的结点个数为</p>",
    "options": [
      "$n-1$",
      "$n$",
      "$n+1$",
      "$n+2$"
    ],
    "answer": "C",
    "analysis": "<p><strong>选 C（$n+1$）。</strong> 非终端结点就是<strong>有孩子</strong>的结点，落到二叉树上它必定有一棵左子树（左孩子 = 它的第一个孩子）；从这棵左子树<strong>一路往右下</strong>走（右孩子 = 下一个兄弟），走到头的那个结点右指针就是空的——它表示\"没有下一个兄弟了\"，也就是这个非终端结点的<strong>最后一个孩子</strong>。n 个非终端结点各贡献这样一个结点，已经有 n 个。</p>\n<p>还差一个：<strong>根链最末尾的那个结点</strong>（森林里最后一棵树的根），它没有\"下一个根\"，右指针同样是空的。</p>\n<p>合计 $n + 1$ 个，选 C。这条推理也正是前面第三条常用结论的来历。</p>"
  },
  {
    "id": "q-auto-ds-2076",
    "year": 2015,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-3",
    "topics": [
      "ds-3-4"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>下列选项给出的是从根分别到达两个叶结点路径上的权值序列，能属于同一棵哈夫曼树的是</p>",
    "options": [
      "24, 10, 5 和 24, 10, 7",
      "24, 10, 5 和 24, 12, 7",
      "24, 10, 10 和 24, 14, 11",
      "24, 10, 5 和 24, 14, 6"
    ],
    "answer": "D",
    "analysis": "<p><strong>选 D。</strong> 哈夫曼树里每个非终端结点的值 = 它两个孩子值之和，所以两条从根出发的路径必须处处对得上这个加法。</p>\n<ul>\n<li><strong>A</strong>：两条路径在 10 处才分叉，说明 10 的两个孩子是 5 和 7，可 $5 + 7 = 12 \\ne 10$；</li>\n<li><strong>B</strong>：两条路径在根处分叉，根的两个孩子是 10 和 12，可 $10 + 12 = 22 \\ne 24$；</li>\n<li><strong>C</strong>：第一条路径是 24 → 10 → 10，结点不可能等于自己孩子的值（那兄弟就得是 0 权值）；</li>\n<li><strong>D</strong>：根的孩子是 10 和 14（$10 + 14 = 24$）、10 的孩子是 5 和 5（$5 + 5 = 10$）、14 的孩子是 6 和 8（$6 + 8 = 14$）——三个加法全对；而且 5、5、6、8 按哈夫曼的合并顺序（$5+5$、$6+8$、$10+14$）正好能构造出来。</li>\n</ul>"
  },
  {
    "id": "q-auto-ds-2094",
    "year": 2018,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-3",
    "topics": [
      "ds-3-4"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>已知字符集 {a, b, c, d, e, f}，若各字符出现的次数分别为 6, 3, 8, 2, 10, 4，则对应字符集中各字符的哈夫曼编码可能是</p>",
    "options": [
      "<code>00, 1011, 01, 1010, 11, 100</code>",
      "<code>00, 100, 110, 00, 0010, 01</code>",
      "<code>10, 1011, 11, 0011, 00, 010</code>",
      "<code>0011, 10, 11, 0010, 01, 000</code>"
    ],
    "answer": "A",
    "analysis": "<p><strong>选 A。</strong> 先把哈夫曼树构出来定编码长度：按频率合并 $2 + 3 = 5$、$4 + 5 = 9$、$6 + 8 = 14$、$9 + 10 = 19$、$14 + 19 = 33$（每一步取的都是当前最小的两个，顺序唯一），于是各字符的位数是 <strong>a 2 位、c 2 位、e 2 位、f 3 位、b 4 位、d 4 位</strong>。</p>\n<p>据此看选项：</p>\n<ul>\n<li><strong>A</strong> 的长度正好是「6→2 位、3→4 位、8→2 位、2→4 位、10→2 位、4→3 位」，逐个核对也没有谁是谁的前缀；</li>\n<li><strong>B</strong> 里 <code>00</code> 出现了两次（a 和 d），本身还和 <code>0010</code> 冲突；</li>\n<li><strong>C</strong> 里 <code>00</code>（e）是 <code>0011</code>（d）的前缀，前缀编码被破坏；</li>\n<li><strong>D</strong> 把 a 排成 4 位、b 排成 2 位，和「频率高的编码短」正好拧着。</li>\n</ul>"
  },
  {
    "id": "q-auto-ds-2114",
    "year": 2023,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-3",
    "topics": [
      "ds-3-4"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>在由 6 个字符组成的字符集 s 中，各字符出现的频次分别为 3, 4, 5, 6, 8, 10，为 s 构造的哈夫曼编码的加权平均长度为</p>",
    "options": [
      "2.4",
      "2.5",
      "2.67",
      "2.75"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B（2.5）。</strong> 先按频次构造哈夫曼树，合并过程是 $3+4=7$、$5+6=11$、$7+8=15$、$10+11=21$、$15+21=36$。</p>\n<p>WPL 用累加式直接读：$7+11+15+21+36 = 90$（换成定义式核一下也对：频次 3、4、5、6 的四个字符都占 3 位，8、10 的占 2 位，$3\\times3+4\\times3+5\\times3+6\\times3+8\\times2+10\\times2 = 90$）。</p>\n<p>加权平均长度就是 WPL 平均到每个字符上：$90 \\div (3+4+5+6+8+10) = 90 \\div 36 = 2.5$，选 B。</p>"
  },
  {
    "id": "q-auto-ds-2131",
    "year": 2012,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-3",
    "topics": [
      "ds-3-4"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>设有 6 个有序表 A、B、C、D、E、F，分别含有 10、35、40、50、60 和 200 个数据元素，各表中的元素按升序排列。要求通过 5 次两两合并，将 6 个表最终合并为 1 个升序表，并使最坏情况下比较的总次数达到最小。请回答下列问题：</p>\n<p>1）给出完整的合并过程，并求出最坏情况下比较的总次数。\n2）根据你的合并过程，描述 n（$n \\ge 2$）个不等长升序表的合并策略，并说明理由。</p>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>1）按\"每次挑最短的两个\"合并：</strong></p>\n<table>\n<thead>\n<tr>\n<th>步骤</th>\n<th>合并</th>\n<th>合并后长度</th>\n<th>最坏比较次数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>①</td>\n<td>10 + 35</td>\n<td>45</td>\n<td>44</td>\n</tr>\n<tr>\n<td>②</td>\n<td>40 + 45</td>\n<td>85</td>\n<td>84</td>\n</tr>\n<tr>\n<td>③</td>\n<td>50 + 60</td>\n<td>110</td>\n<td>109</td>\n</tr>\n<tr>\n<td>④</td>\n<td>85 + 110</td>\n<td>195</td>\n<td>194</td>\n</tr>\n<tr>\n<td>⑤</td>\n<td>195 + 200</td>\n<td>395</td>\n<td>394</td>\n</tr>\n</tbody>\n</table>\n<p>两个长度分别为 m、n 的有序表归并，最坏要比较 $m+n-1$ 次（每比较一次输出一个元素，只剩最后一个时不用再比），所以最坏情况下比较的总次数是</p>\n<p>$$44+84+109+194+394 = 825$$</p>\n<p><strong>2）策略：把各个表的长度当作权值，照哈夫曼树的构造过程来合并</strong>——每次从当前所有表里选<strong>长度最短的两个</strong>合并，重复 $n-1$ 次到只剩一个表。</p>\n<p><strong>理由</strong>：这个总次数可以改写成 $\\sum(\\text{每次合并后新表的长度}) - (n-1)$，而\"每次合并后新表的长度之和\"正是这棵合并树的 <strong>WPL</strong>（各表长度 × 它参与合并的层数，加起来）。$n-1$ 是固定的，所以要让总次数最小，就等价于让这棵合并树的 WPL 最小——而 WPL 最小的二叉树正是哈夫曼树，也就是\"每次合并最短的两个\"。</p>"
  },
  {
    "id": "q-auto-ds-2158",
    "year": 2020,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-3",
    "topics": [
      "ds-3-4"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>若任意一个字符的编码都不是其他字符编码的前缀，则称这种编码具有前缀特性。现有某字符集（字符个数 $\\ge 2$）的不等长编码，每个字符的编码均为二进制的 0、1 序列，最长为 L 位，且具有前缀特性。请回答以下问题：</p>\n<p>1）哪种数据结构适宜保存上述具有前缀特性的不等长编码？\n2）基于你所设计的数据结构，简述从 0/1 串到字符串的译码过程。\n3）简述判定某字符集的不等长编码是否具有前缀特性的过程。</p>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>1）一棵二叉树。</strong> 每个结点带左、右两个孩子指针，字符存放在叶子上：一个字符的编码就是一条从根出发的路径，编码的 0 表示往左孩子走、1 表示往右孩子走，路径的终点存放该字符。因为编码满足前缀特性，任何一条这样的路径都不会中途撞上别的字符，整组编码正好铺成这棵树。（这种树不必是哈夫曼树——前缀编码只要求\"编码互不为前缀\"，哈夫曼树只是其中<strong>比较常用</strong>的一种。）</p>\n<p><strong>2）译码过程</strong>：把一个指针放在根结点上，从左往右扫描 0/1 串——读到 0 就沿左孩子走一步，读到 1 就沿右孩子走一步；走到存放字符的结点时输出该字符，并把指针<strong>退回根结点</strong>，接着读后面的位。0/1 串扫完，也就译出了完整的字符串。</p>\n<p><strong>3）判定过程</strong>：就是反过来\"把这组编码填进一棵二叉树\"，边走边建。</p>\n<ul>\n<li>先准备一棵只有根结点的空树；</li>\n<li>依次处理每个字符的编码：指针回到根，从左往右逐位扫描——遇到 0 就往左孩子走，左孩子不存在就新建一个；遇到 1 就往右孩子走，右孩子不存在就新建一个；编码扫完之后，在指针停留的那个结点上写下这个字符；</li>\n<li>处理过程中只要出现下面任意一种情况，就说明这组编码<strong>不具备</strong>前缀特性：一是扫描某个编码时<strong>从头到尾没有新建过任何结点</strong>，说明这条路径之前已经被别的编码走完了——这个编码要么和某个字符的编码完全相同，要么是某个更长编码的前缀；二是扫描<strong>中途走到了一个已经写着字符的结点</strong>，说明前面那个字符的编码是它的前缀；</li>\n<li>所有编码都这样顺利处理完、上面两种情况都没出现，则说明这组编码<strong>具有</strong>前缀特性。</li>\n</ul>"
  },
  {
    "id": "q-auto-ds-2179",
    "year": null,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-3",
    "topics": [
      "ds-3-4"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>对字符进行哈夫曼编码时，不可能的方案是</p>",
    "options": [
      "<code>00, 01, 10, 11</code>",
      "<code>00, 010, 011, 100, 101, 11</code>",
      "<code>00, 100, 101, 110, 111</code>",
      "<code>0000, 0001, 001, 01, 1</code>"
    ],
    "answer": "C",
    "analysis": "<p><strong>选 C。</strong> 哈夫曼树里<strong>不可能有度为 1 的结点</strong>——构造时每次都是拿两个结点合并成一个新的，所以每个非叶结点必定左右孩子齐全。把每组编码展开成二叉树，逐个看内部结点：</p>\n<ul>\n<li><strong>A</strong>：根分出 <code>0</code>、<code>1</code> 两支，每支再各分两个叶子（<code>00/01</code> 和 <code>10/11</code>），内部结点都是两个孩子 ✓；</li>\n<li><strong>B</strong>：<code>0</code> 这支出 <code>00</code> 和 <code>01</code>，其中 <code>01</code> 再分出 <code>010</code>、<code>011</code>；<code>1</code> 这支出 <code>10</code>（再分出 <code>100</code>、<code>101</code>）和 <code>11</code>——每处也都是两个孩子 ✓；</li>\n<li><strong>C</strong>：以 <code>0</code> 开头的只有 <code>00</code> 一条，也就是说 <code>0</code> 那个结点<strong>只有左孩子、没有右孩子</strong>，出现了<strong>度为 1</strong> 的结点 ✗——这不是哈夫曼树该有的形状，所以不可能；</li>\n<li><strong>D</strong>：<code>1</code> 是叶子；<code>0</code> 这支出 <code>01</code> 和 <code>00</code>，<code>00</code> 再出 <code>001</code> 和 <code>000</code>，<code>000</code> 再出 <code>0000</code>、<code>0001</code>，从头到尾每个内部结点都是两个孩子 ✓。</li>\n</ul>"
  },
  {
    "id": "q-auto-ds-2197",
    "year": null,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-3",
    "topics": [
      "ds-3-4"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>如果要求哈夫曼编码的长度小于等于 4，并且现在已经对 2 个字符编码为 <code>0</code> 和 <code>10</code>，则最多还可以对多少个字符进行编码？</p>",
    "options": [
      "3",
      "4",
      "5",
      "6"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B（4）。</strong> 已经用掉 <code>0</code> 和 <code>10</code> 之后，还能用的编码必须同时躲开这两条：</p>\n<ul>\n<li>不能以 <code>0</code> 开头——否则 <code>0</code> 就是它的前缀；</li>\n<li>不能以 <code>10</code> 开头——否则 <code>10</code> 是它的前缀。</li>\n</ul>\n<p>两条合起来，剩下的编码<strong>只能以 <code>11</code> 开头</strong>。从 <code>11</code> 这个结点往下算，长度上限 4 位、已经用掉 2 位，还剩 $4-2=2$ 层可供分叉，最多放得下 $2^2 = 4$ 个字符，取满就是 <code>1100</code>、<code>1101</code>、<code>1110</code>、<code>1111</code> 这四个四位编码。</p>\n<p>（反过来，如果图省事用 <code>11</code>、<code>110</code> 这种更短的编码，它自己会占掉一整片位置，能放的字符反而更少——想让数量最多，就要把可用位置都用最深的编码填满。）</p>"
  },
  {
    "id": "q-auto-ds-2407",
    "year": 2017,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-4",
    "topics": [
      "ds-4-1"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>已知无向图 G 含有 16 条边，其中度为 4 的顶点个数为 3、度为 3 的顶点个数为 4，其他顶点的度均小于 3。图 G 所含的顶点个数至少是</p>",
    "options": [
      "10",
      "11",
      "13",
      "15"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B（11）。</strong> 抓手就是「度之和等于边数的 2 倍」：所有顶点的度之和是 $2 \\times 16 = 32$。</p>\n<p>已经确定的 7 个顶点占掉 $4 \\times 3 + 3 \\times 4 = 24$ 度，还剩 $32 - 24 = 8$ 度要留给「其他顶点」。<strong>要让顶点个数最少，就得让每个剩余顶点分摊到的度尽量大</strong>——它们的度都小于 3，最大只能取 2，所以至少要 $8 \\div 2 = 4$ 个顶点。</p>\n<p>顶点总数 $3 + 4 + 4 = 11$，选 B。</p>"
  },
  {
    "id": "q-auto-ds-2424",
    "year": 2022,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-4",
    "topics": [
      "ds-4-1"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>对于无向图 $G = (V, E)$，下列选项中，正确的是</p>",
    "options": [
      "当 $|V| &gt; |E|$ 时，$G$ 一定是连通的",
      "当 $|V| &lt; |E|$ 时，$G$ 一定是连通的",
      "当 $|V| = |E| - 1$ 时，$G$ 一定是不连通的",
      "当 $|V| &gt; |E| + 1$ 时，$G$ 一定是不连通的"
    ],
    "answer": "D",
    "analysis": "<p><strong>选 D。</strong> 判据就是第 ⑤ 条：$n$ 个顶点的连通无向图<strong>至少要有 $n - 1$ 条边</strong>。</p>\n<ul>\n<li><strong>D 对</strong>：$|V| &gt; |E| + 1$ 即 $|E| &lt; |V| - 1$，边数连\"连通\"的门槛都够不着，图必然不连通；</li>\n<li><strong>A 错</strong>：三角形（3 个顶点 3 条边）再加一个孤立顶点，$|V| = 4 &gt; |E| = 3$，照样不连通；</li>\n<li><strong>B 错</strong>：两个互不相交的 $K_4$ 一共 8 个顶点 12 条边，$|V| &lt; |E|$ 但图是断成两块的；</li>\n<li><strong>C 错</strong>：$|V| = |E| - 1$ 即 $|E| = |V| + 1$，比最低要求还多两条边——$K_4$ 去掉一条边就是 4 个顶点 5 条边，连通得好好的。</li>\n</ul>"
  },
  {
    "id": "q-auto-ds-2442",
    "year": null,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-4",
    "topics": [
      "ds-4-1"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>若一个具有 $n$ 个顶点、$n$ 条边的连通无向图中，恰好只有一个环，则它的不同生成树的数量是</p>",
    "options": [
      "1",
      "$n$",
      "$n - 1$",
      "$n^2$"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B（$n$）。</strong> $n$ 个顶点配 $n - 1$ 条边才是树，这个图多出来 1 条边，多出来的这条边正好落在<strong>唯一那个环</strong>上。</p>\n<p>要得到生成树就得<strong>破环</strong>：从环上删掉任意一条边，剩下的 $n - 1$ 条边正好把 $n$ 个顶点连成一棵树；删环以外的边则环原样还在，成不了树。所以<strong>生成树的棵数 = 唯一那个环上的边数</strong>，本题里环上共有 $n$ 条边，一共 $n$ 棵，选 B。</p>"
  },
  {
    "id": "q-auto-ds-2457",
    "year": null,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-4",
    "topics": [
      "ds-4-1"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>具有 35 个顶点和 10 条边的无向图的连通分量最多是</p>",
    "options": [
      "35",
      "30",
      "31",
      "32"
    ],
    "answer": "C",
    "analysis": "<p><strong>选 C（31）。</strong> 想让连通分量<strong>最多</strong>，这 10 条边就得尽量\"挤\"在少数几个顶点上——只要一条边额外用到一个别的顶点，那个顶点就从\"自成一个分量\"变成\"某个分量的一员\"，分量总数就少一个。</p>\n<p>那 10 条边最少能用几个顶点装下？$k$ 个顶点的无向完全图有 $\\frac{k(k-1)}{2}$ 条边，$\\frac{k(k-1)}{2} \\ge 10$ 的最小 $k$ 是 5（$\\frac{5 \\times 4}{2} = 10$）——这 5 个顶点正好拼成一个 $K_5$，合成 <strong>1 个</strong>连通分量。</p>\n<p>剩下 $35 - 5 = 30$ 个顶点一条边都不沾，每个自成一个连通分量。所以最多 $1 + 30 = 31$ 个，选 C。</p>"
  },
  {
    "id": "q-auto-ds-2485",
    "year": 2015,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-4",
    "topics": [
      "ds-4-1"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>已知含有 5 个顶点的图 G 如下图所示。</p>\n<p><img alt=\"2015 题图：顶点 0 与 1、2、4 相邻，1 与 0、3、4 相邻，2 与 0、3 相邻，3 与 1、2、4 相邻，4 与 0、1、3 相邻\" src=\"/408-review/assets/textbook/ds-adj-matrix-2015-graph.webp\" /></p>\n<p>请回答下列问题：</p>\n<p>1）写出图 G 的邻接矩阵 $A$（行、列下标从 0 开始）。\n2）求 $A^2$，矩阵 $A^2$ 中位于 0 行 3 列元素值的含义是什么？\n3）若已知具有 $n$（$n \\ge 2$）个顶点的图的邻接矩阵为 $B$，则 $B^m$（$2 \\le m \\le n$）中非零元素的含义是什么？</p>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>1）</strong> 邻接矩阵的第 $i$ 行第 $j$ 列记的是「$i$ 到 $j$ 有没有边」，有边写 1、无边写 0（无向图的邻接矩阵一定对称）：</p>\n<p>$$A = \\begin{pmatrix}\n0 &amp; 1 &amp; 1 &amp; 0 &amp; 1 \\\\\n1 &amp; 0 &amp; 0 &amp; 1 &amp; 1 \\\\\n1 &amp; 0 &amp; 0 &amp; 1 &amp; 0 \\\\\n0 &amp; 1 &amp; 1 &amp; 0 &amp; 1 \\\\\n1 &amp; 1 &amp; 0 &amp; 1 &amp; 0\n\\end{pmatrix}$$</p>\n<p><strong>2）</strong> 照矩阵乘法算，$A^2[i][j] = \\sum_k A[i][k] \\cdot A[k][j]$——求和里每一项「1」都对应一条 $i \\to k \\to j$ 的两步路径：</p>\n<p>$$A^2 = \\begin{pmatrix}\n3 &amp; 1 &amp; 0 &amp; 3 &amp; 1 \\\\\n1 &amp; 3 &amp; 2 &amp; 1 &amp; 2 \\\\\n0 &amp; 2 &amp; 2 &amp; 0 &amp; 2 \\\\\n3 &amp; 1 &amp; 0 &amp; 3 &amp; 1 \\\\\n1 &amp; 2 &amp; 2 &amp; 1 &amp; 3\n\\end{pmatrix}$$</p>\n<p>其中 0 行 3 列的元素值是 3，含义是<strong>从顶点 0 到顶点 3 长度为 2 的路径有 3 条</strong>：$0 \\to 1 \\to 3$、$0 \\to 2 \\to 3$、$0 \\to 4 \\to 3$。</p>\n<p><strong>3）</strong> $B^m$ 中第 $i$ 行第 $j$ 列的元素值，是<strong>从顶点 $i$ 到顶点 $j$ 长度为 $m$ 的路径条数</strong>；非零元素就意味着顶点 $i$ 到 $j$ 存在长度为 $m$ 的路径。</p>"
  },
  {
    "id": "q-auto-ds-2579",
    "year": 2024,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-4",
    "topics": [
      "ds-4-5"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>若无向图 $G = (V, E)$ 的邻接多重表如下图所示，则 G 中顶点 b 与 d 的度分别是</p>\n<p><img alt=\"2024 题图：邻接多重表，左边是 5 个顶点结点 a~e，右边是 7 个边结点，每个边结点依次存 ivex、ilink、jvex、jlink\" src=\"/408-review/assets/textbook/ds-adjacency-multilist-2024.webp\" /></p>",
    "options": [
      "0, 2",
      "2, 4",
      "2, 5",
      "3, 4"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B（2, 4）。</strong> 邻接多重表里<strong>每条边只占一个结点</strong>，结点里的两个编号字段（<code>ivex</code>、<code>jvex</code>）就是这条边两端的顶点。把表里 7 个边结点逐个读出来，图 G 的边是 $(0,1)$、$(1,3)$、$(2,0)$、$(2,3)$、$(2,4)$、$(0,3)$、$(3,4)$，也就是 a—b、b—d、c—a、c—d、c—e、a—d、d—e 这 7 条。</p>\n<ul>\n<li><strong>b（编号 1）</strong> 出现在 $(0,1)$、$(1,3)$ 这两条边里 → 度为 <strong>2</strong>；</li>\n<li><strong>d（编号 3）</strong> 出现在 $(1,3)$、$(2,3)$、$(0,3)$、$(3,4)$ 这四条边里 → 度为 <strong>4</strong>。</li>\n</ul>\n<p>所以是 2 和 4，选 B。也可以直接从 b、d 的 <code>firstedge</code> 出发，顺着各自那条链数边结点个数，结果一样——这正是邻接多重表「便于计算结点的度」的地方。</p>"
  },
  {
    "id": "q-auto-ds-2906",
    "year": 2020,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-4",
    "topics": [
      "ds-4-2"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>修改递归方式实现的图的深度优先搜索（DFS）算法，将输出（访问）顶点信息的语句移到退出递归前（执行输出语句后立刻退出递归）。采用修改后的算法遍历有向无环图 G，若输出结果中包含 G 中的全部顶点，则输出的顶点序列是 G 的</p>",
    "options": [
      "拓扑有序序列",
      "逆拓扑有序序列",
      "广度优先搜索序列",
      "深度优先搜索序列"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B（逆拓扑有序序列）。</strong> 输出语句挪到递归返回之前，等于<strong>谁先走完谁先输出</strong>。改完的 DFS 是这样：</p>\n<pre><code class=\"language-c\">void DFS(Graph G, int v)\n{\n    for (w = FirstAdjVex(G, v); w &gt;= 0; w = NextAdjVex(G, v, w))\n    {\n        if (!visited[w])\n            DFS(G, w);\n    }\n    cout &lt;&lt; v;                          // 所有后继都回来了，才输出自己\n    visited[v] = true;\n}\n</code></pre>\n<p>顶点 $v$ 能到达的顶点全在它这次递归里，会先于 $v$ 输出——所以每条边 $u \\to v$ 在输出序列里都是\"$v$ 在前、$u$ 在后\"。而拓扑序要求\"$u$ 在前、$v$ 在后\"，这正好是它的<strong>逆序</strong>。</p>\n<p>换成前面 <code>finishTime</code> 的说法就是：输出顺序是 <code>finishTime</code> <strong>从小到大</strong>，而拓扑序要按 <code>finishTime</code> 从大到小排，两者互为逆序。</p>"
  },
  {
    "id": "q-auto-ds-2994",
    "year": 2012,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-4",
    "topics": [
      "ds-4-4"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>若用邻接矩阵存储有向图，矩阵中主对角线以下的元素均为零，则关于该图拓扑排序的结论是</p>",
    "options": [
      "存在，且唯一",
      "存在，且不唯一",
      "存在，可能不唯一",
      "无法确定是否存在"
    ],
    "answer": "C",
    "analysis": "<p><strong>选 C（存在，可能不唯一）。</strong></p>\n<ul>\n<li><strong>一定存在</strong>：主对角线以下全为 0，也就是 $i &gt; j$ 时 $A[i][j] = 0$——边只能从<strong>小号顶点指向大号顶点</strong>。图里不可能有环：沿着环走一圈，顶点编号只能一直变大，绕回起点就矛盾了。没有环，拓扑排序一定存在。</li>\n<li><strong>但不一定唯一</strong>：一条边都没有的图（邻接矩阵全是 0，当然也满足\"下三角全零\"）随便什么顺序都是合法拓扑序；而如果图是一条链 $0 \\to 1 \\to \\dots \\to n-1$，顺序就被钉死了。所以只能说\"存在，<strong>可能</strong>不唯一\"。</li>\n</ul>"
  },
  {
    "id": "q-auto-ds-3010",
    "year": 2016,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-4",
    "topics": [
      "ds-4-4"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>若对 $n$ 个顶点、$e$ 条弧的有向图采用邻接表存储，则拓扑排序算法的时间复杂度是</p>",
    "options": [
      "$O(n)$",
      "$O(n + e)$",
      "$O(n^2)$",
      "$O(ne)$"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B（$O(n + e)$）。</strong> 对着上面那段实现数：开头扫一遍所有顶点建初始栈，$O(n)$；之后每个顶点恰好进栈、出栈各一次，$O(n)$；每出栈一个顶点，顺着它的边表把所有出边扫一遍，所有边加起来是 $e$ 条，$O(e)$。合计 $O(n + e)$。</p>\n<p>（用邻接矩阵就退化成 $O(n^2)$——每出栈一个顶点都得扫一整行才找得到它的出边，这正是选项 C 的来历。）</p>"
  },
  {
    "id": "q-auto-ds-3048",
    "year": 2019,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-4",
    "topics": [
      "ds-4-4"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>用有向无环图描述表达式 $(x+y)((x+y)/x)$，需要的顶点个数至少是</p>",
    "options": [
      "5",
      "6",
      "8",
      "9"
    ],
    "answer": "A",
    "analysis": "<p><strong>选 A（5）。</strong> 原式的运算分三层：最里面是 $x+y$，然后是 $(x+y)/x$，最后两者相乘。</p>\n<p>顶点 = <strong>每个操作数一个叶子 + 每个不同的子表达式一个内部结点</strong>：</p>\n<ul>\n<li>操作数：$x$、$y$，共 2 个；</li>\n<li>运算符：$+$（$x+y$）、$/$（$(x+y)/x$）、$*$（最外层的乘法），共 3 个。</li>\n</ul>\n<p>$x+y$ 在原式里出现两次，DAG 只画一个结点；$x$ 既是 $x+y$ 的操作数、又是除法的除数，也只画一次。合计 $2 + 3 = 5$ 个，选 A。</p>"
  },
  {
    "id": "q-auto-ds-3107",
    "year": 2012,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-4",
    "topics": [
      "ds-4-3"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>下列关于最小生成树的叙述中，正确的是</p>\n<p>Ⅰ. 最小生成树的代价唯一\nⅡ. 所有权值最小的边一定会出现在所有的最小生成树中\nⅢ. 使用 Prim 算法从不同顶点开始得到的最小生成树一定相同\nⅣ. 使用 Prim 算法和 Kruskal 算法得到的最小生成树总不相同</p>",
    "options": [
      "仅 Ⅰ",
      "仅 Ⅱ",
      "仅 Ⅰ、Ⅲ",
      "仅 Ⅱ、Ⅳ"
    ],
    "answer": "A",
    "analysis": "<p><strong>选 A（仅 Ⅰ）。</strong></p>\n<ul>\n<li><strong>Ⅰ 对</strong>：最小生成树的<strong>代价</strong>（边权之和）是唯一的——树不唯一时，几棵生成树的权值和一定相等，否则\"最小\"就无从谈起；</li>\n<li><strong>Ⅱ 错</strong>：权值最小的边也可能进不了生成树。比如三条权值为 1 的边围成一个三角形，任一棵生成树只能取其中两条，总有一条最小边被排掉；</li>\n<li><strong>Ⅲ 错</strong>：MST 不唯一时，从不同顶点出发、按 Prim 走出来的不一定是同一棵；</li>\n<li><strong>Ⅳ 错</strong>：MST 唯一时，Prim 和 Kruskal 只会得到同一棵，所以不是\"总不相同\"。</li>\n</ul>"
  },
  {
    "id": "q-auto-ds-3130",
    "year": 2017,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-4",
    "topics": [
      "ds-4-3"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>使用 Prim 算法求带权连通图的最小（代价）生成树（MST）。请回答下列问题：</p>\n<p>1）对下列图 G，从顶点 A 开始求 G 的 MST，依次给出按算法选出的边。\n2）图 G 的 MST 是唯一的吗？\n3）对任意的带权连通图，满足什么条件时，其 MST 是唯一的？</p>\n<p><img alt=\"2017 题图：5 个顶点 A~E，A—B 6、A—E 5、A—D 4、B—C 4、C—E 5、C—D 6、D—E 4\" src=\"/408-review/assets/textbook/ds-prim-2017-graph.webp\" /></p>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>1）依次选出 (A, D) 4、(D, E) 4、(C, E) 5、(B, C) 4，总代价 17。</strong></p>\n<p>Prim 从 A 出发，每一步都挑\"离当前树最近\"的顶点：</p>\n<table>\n<thead>\n<tr>\n<th>步骤</th>\n<th>当前树 T</th>\n<th>候选边（权值）</th>\n<th>选中的边</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>{A}</td>\n<td>A—D 4、A—E 5、A—B 6</td>\n<td>(A, D) 4</td>\n</tr>\n<tr>\n<td>2</td>\n<td>{A, D}</td>\n<td>D—E 4、A—E 5、A—B 6、D—C 6</td>\n<td>(D, E) 4</td>\n</tr>\n<tr>\n<td>3</td>\n<td>{A, D, E}</td>\n<td>C—E 5、A—B 6、C—D 6</td>\n<td>(C, E) 5</td>\n</tr>\n<tr>\n<td>4</td>\n<td>{A, D, E, C}</td>\n<td>B—C 4</td>\n<td>(B, C) 4</td>\n</tr>\n</tbody>\n</table>\n<p>总代价 $4 + 4 + 5 + 4 = 17$。</p>\n<p><strong>2）唯一。</strong> 权值为 4 的三条边（A—D、D—E、B—C）本身不成环，而 4 条边的最小总和只能是 $4+4+4+5$，所以三条都得选上——此时顶点分成 {A, D, E} 与 {B, C} 两块。能把两块接起来的边只有 A—B 6、C—E 5、C—D 6，最小的是 5，且只有 C—E 这一条，没有第二种选法。</p>\n<p><strong>3）</strong> 各边<strong>权值互不相等</strong>时，MST 一定唯一。（这是充分条件：本题里权值有重复，MST 照样唯一。）</p>"
  },
  {
    "id": "q-auto-ds-3198",
    "year": 2016,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-4",
    "topics": [
      "ds-4-3"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>使用 Dijkstra 算法求下图中从顶点 1 到其他各顶点的最短路径，依次得到的各最短路径的目标顶点是</p>\n<p><img alt=\"2016 题图：有向带权图，1→2 5、2→3 2、1→5 4、2→4 9、3→5 6、4→1 2、5→2 6、5→4 7、5→6 5、6→3 2\" src=\"/408-review/assets/textbook/ds-dijkstra-2016-graph.webp\" /></p>",
    "options": [
      "5, 2, 3, 4, 6",
      "5, 2, 3, 6, 4",
      "5, 2, 4, 3, 6",
      "5, 2, 6, 3, 4"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B（5, 2, 3, 6, 4）。</strong> 从 1 出发，初始 <code>dist[1] = 0</code>、其余全是 $\\infty$；每轮挑 <code>dist</code> 最小且还没确定的顶点，再拿它的出边去松弛别人：</p>\n<table>\n<thead>\n<tr>\n<th>步骤</th>\n<th>选中（<code>dist</code> 值）</th>\n<th>本轮更新的 <code>dist</code></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>①</td>\n<td>1（0）</td>\n<td>$d_2 = 5$（1→2）、$d_5 = 4$（1→5）</td>\n</tr>\n<tr>\n<td>②</td>\n<td>5（4）</td>\n<td>$d_4 = 11$（1→5→4）、$d_6 = 9$（1→5→6）；5→2 要 $4+6 = 10 &gt; 5$，不改</td>\n</tr>\n<tr>\n<td>③</td>\n<td>2（5）</td>\n<td>$d_3 = 7$（1→2→3）；2→4 要 $5+9 = 14 &gt; 11$，不改</td>\n</tr>\n<tr>\n<td>④</td>\n<td>3（7）</td>\n<td>3→5 要 $7+6 = 13 &gt; 4$，不改</td>\n</tr>\n<tr>\n<td>⑤</td>\n<td>6（9）</td>\n<td>6→3 要 $9+2 = 11 &gt; 7$，不改</td>\n</tr>\n<tr>\n<td>⑥</td>\n<td>4（11）</td>\n<td>4→1 要 $11+2 = 13 &gt; 0$，不改</td>\n</tr>\n</tbody>\n</table>\n<p>确定顺序是 1 → 5 → 2 → 3 → 6 → 4，去掉起点，依次就是 5、2、3、6、4，选 B。</p>"
  },
  {
    "id": "q-auto-ds-3224",
    "year": null,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-4",
    "topics": [
      "ds-4-3"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>用 Floyd 算法求下图的最短路径，得到的 dist 矩阵结果是</p>\n<table>\n<thead>\n<tr>\n<th>A</th>\n<th>B</th>\n<th>C</th>\n<th>D</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>$\\begin{pmatrix}1&amp;0&amp;0&amp;0\\\\1&amp;1&amp;1&amp;1\\\\1&amp;1&amp;1&amp;1\\\\1&amp;1&amp;1&amp;1\\end{pmatrix}$</td>\n<td>$\\begin{pmatrix}1&amp;\\infty&amp;\\infty&amp;0\\\\2&amp;1&amp;1&amp;1\\\\3&amp;1&amp;1&amp;2\\\\1&amp;2&amp;1&amp;1\\end{pmatrix}$</td>\n<td>$\\begin{pmatrix}0&amp;0&amp;0&amp;0\\\\2&amp;0&amp;1&amp;1\\\\3&amp;1&amp;0&amp;2\\\\1&amp;2&amp;1&amp;0\\end{pmatrix}$</td>\n<td>$\\begin{pmatrix}0&amp;\\infty&amp;\\infty&amp;\\infty\\\\2&amp;0&amp;1&amp;1\\\\3&amp;1&amp;0&amp;2\\\\1&amp;2&amp;1&amp;0\\end{pmatrix}$</td>\n</tr>\n</tbody>\n</table>\n<p><img alt=\"31 题图：4 个顶点的有向图，4→1、2→4、4→3、2→3、3→2，每条边权都是 1\" src=\"/408-review/assets/textbook/ds-floyd-31-graph.webp\" /></p>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>选 D。</strong> 图里每条边的权都是 1，先写出初始矩阵（没边记 $\\infty$、自己到自己记 0）：</p>\n<p>$$D^{(0)} = \\begin{pmatrix}\n0 &amp; \\infty &amp; \\infty &amp; \\infty \\\\\n\\infty &amp; 0 &amp; 1 &amp; 1 \\\\\n\\infty &amp; 1 &amp; 0 &amp; \\infty \\\\\n1 &amp; \\infty &amp; 1 &amp; 0\n\\end{pmatrix}$$</p>\n<p>接着依次拿 1、2、3、4 当中转点，每轮只改\"绕一下会更短\"的格子：</p>\n<table>\n<thead>\n<tr>\n<th>中转点</th>\n<th>能改哪些格子</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>1 没有出边，什么都改不了，$D^{(1)} = D^{(0)}$</td>\n</tr>\n<tr>\n<td>2</td>\n<td>$d_{3,2} = 1$，绕 2 能到 4：$d_{3,4} = 1 + 1 = 2$（原来是 $\\infty$）</td>\n</tr>\n<tr>\n<td>3</td>\n<td>$d_{4,3} = 1$，绕 3 能到 2：$d_{4,2} = 1 + 1 = 2$</td>\n</tr>\n<tr>\n<td>4</td>\n<td>$d_{2,4} = 1$、$d_{3,4} = 2$：$d_{2,1} = 1 + 1 = 2$、$d_{3,1} = 2 + 1 = 3$</td>\n</tr>\n</tbody>\n</table>\n<p>四轮走完：</p>\n<p>$$D^{(4)} = \\begin{pmatrix}\n0 &amp; \\infty &amp; \\infty &amp; \\infty \\\\\n2 &amp; 0 &amp; 1 &amp; 1 \\\\\n3 &amp; 1 &amp; 0 &amp; 2 \\\\\n1 &amp; 2 &amp; 1 &amp; 0\n\\end{pmatrix}$$</p>\n<p>和选项 D 一模一样。</p>"
  },
  {
    "id": "q-auto-ds-3291",
    "year": 2013,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-4",
    "topics": [
      "ds-4-4"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>下列 AOE 网表示一项包含 8 个活动的工程。通过同时加快若干活动的进度可缩短整个工程的工期。在下列选项中，加快其进度就可缩短工程工期的是</p>\n<p><img alt=\"2013 题图：AOE 网，1→2 为 a=3、1→3 为 b=8、3→2 为 d=4、2→4 为 c=9、2→5 为 e=6、3→5 为 f=10、4→6 为 g=6、5→6 为 h=9\" src=\"/408-review/assets/textbook/ds-aoe-2013-graph.webp\" /></p>",
    "options": [
      "c 和 e",
      "d 和 c",
      "f 和 d",
      "f 和 h"
    ],
    "answer": "C",
    "analysis": "<p><strong>选 C（f 和 d）。</strong></p>\n<p>先算事件的时间参数（$v_e$ 从源点往后取 max，$v_l$ 从汇点往前取 min）：</p>\n<table>\n<thead>\n<tr>\n<th>事件</th>\n<th>1</th>\n<th>2</th>\n<th>3</th>\n<th>4</th>\n<th>5</th>\n<th>6</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>$v_e$</td>\n<td>0</td>\n<td>12</td>\n<td>8</td>\n<td>21</td>\n<td>18</td>\n<td>27</td>\n</tr>\n<tr>\n<td>$v_l$</td>\n<td>0</td>\n<td>12</td>\n<td>8</td>\n<td>21</td>\n<td>18</td>\n<td>27</td>\n</tr>\n</tbody>\n</table>\n<p>再用 $e$（弧起点的 $v_e$）和 $l$（弧终点的 $v_l$ 减弧权）算余量：只有 a 的余量不为 0（$l - e = 9$），<strong>b、d、c、e、f、g、h 的余量全是 0</strong>，都是关键活动。</p>\n<p>于是关键路径有三条，长度都是 27：</p>\n<ul>\n<li>1→3→2→4→6：$b + d + c + g = 8 + 4 + 9 + 6 = 27$</li>\n<li>1→3→2→5→6：$b + d + e + h = 8 + 4 + 6 + 9 = 27$</li>\n<li>1→3→5→6：$b + f + h = 8 + 10 + 9 = 27$</li>\n</ul>\n<p>工期被这三条<strong>同时</strong>卡着，只有让三条都变短才会缩短，所以逐个选项看\"覆盖了哪几条关键路径\"：</p>\n<ul>\n<li><strong>A（c、e）</strong>：c 只压到第 1 条、e 只压到第 2 条，第 3 条（b、f、h）没动 ✗</li>\n<li><strong>B（d、c）</strong>：d 压到第 1、2 条，第 3 条仍然没动 ✗</li>\n<li><strong>C（f、d）</strong>：d 压到第 1、2 条，f 压到第 3 条——三条全覆盖 ✓</li>\n<li><strong>D（f、h）</strong>：第 1 条（b、d、c、g）完全没被碰到 ✗</li>\n</ul>\n<p>所以选 C。</p>"
  },
  {
    "id": "q-auto-ds-3330",
    "year": 2011,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-4",
    "topics": [
      "ds-4-4"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>已知有 6 个顶点（编号为 0~5）的有向带权图 G，其邻接矩阵 A 为上三角矩阵，按行为主序（行优先）保存在如下的一维数组中：</p>\n<p><code>4, 6, ∞, ∞, ∞, 5, ∞, ∞, ∞, 4, 3, ∞, ∞, 3, 3</code></p>\n<p>要求：</p>\n<p>1）写出图 G 的邻接矩阵 A。\n2）画出有向带权图 G。\n3）求图 G 的关键路径，并计算该关键路径的长度。</p>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>1）</strong> 上三角只存 $i &lt; j$ 的部分，按行切开正好是 $5 + 4 + 3 + 2 + 1 = 15$ 个数：第 0 行 5 个、第 1 行 4 个、第 2 行 3 个、第 3 行 2 个、第 4 行 1 个。</p>\n<p>$$A = \\begin{pmatrix}\n0 &amp; 4 &amp; 6 &amp; \\infty &amp; \\infty &amp; \\infty \\\\\n\\infty &amp; 0 &amp; 5 &amp; \\infty &amp; \\infty &amp; \\infty \\\\\n\\infty &amp; \\infty &amp; 0 &amp; 4 &amp; 3 &amp; \\infty \\\\\n\\infty &amp; \\infty &amp; \\infty &amp; 0 &amp; \\infty &amp; 3 \\\\\n\\infty &amp; \\infty &amp; \\infty &amp; \\infty &amp; 0 &amp; 3 \\\\\n\\infty &amp; \\infty &amp; \\infty &amp; \\infty &amp; \\infty &amp; 0\n\\end{pmatrix}$$</p>\n<p>（对角线记 0；下三角没有边，记 $\\infty$。）</p>\n<p><strong>2）</strong> 从矩阵里读出的 7 条弧是 0→1（4）、0→2（6）、1→2（5）、2→3（4）、2→4（3）、3→5（3）、4→5（3）：</p>\n<p><img alt=\"2011 题图：6 个顶点的有向带权图，0→1 为 4、0→2 为 6、1→2 为 5、2→3 为 4、2→4 为 3、3→5 为 3、4→5 为 3\" src=\"/408-review/assets/textbook/ds-critical-2011-graph.webp\" /></p>\n<p><strong>3）关键路径是 0→1→2→3→5，长度 16。</strong></p>\n<p><strong>第一步：从源点往后推每个事件的最早发生时间 $v_e$</strong>（汇合点取 max，取\"最晚到齐\"的那条路）：</p>\n<ul>\n<li>$v_e(0) = 0$</li>\n<li>$v_e(1) = v_e(0) + 4 = 4$</li>\n<li>$v_e(2) = \\max\\{v_e(0)+6,\\ v_e(1)+5\\} = \\max\\{6,\\ 9\\} = 9$（两条路进来，取长的）</li>\n<li>$v_e(3) = v_e(2) + 4 = 13$</li>\n<li>$v_e(4) = v_e(2) + 3 = 12$</li>\n<li>$v_e(5) = \\max\\{v_e(3)+3,\\ v_e(4)+3\\} = \\max\\{16,\\ 15\\} = 16$（汇点，$v_e(5)$ 就是工期）</li>\n</ul>\n<p><strong>第二步：从汇点往前推导每个事件的最迟发生时间 $v_l$</strong>（分叉处取 min，取\"最先卡住\"的那条路；先令 $v_l(5) = v_e(5) = 16$）：</p>\n<ul>\n<li>$v_l(4) = 16 - 3 = 13$</li>\n<li>$v_l(3) = 16 - 3 = 13$</li>\n<li>$v_l(2) = \\min\\{v_l(3)-4,\\ v_l(4)-3\\} = \\min\\{9,\\ 10\\} = 9$</li>\n<li>$v_l(1) = v_l(2) - 5 = 4$</li>\n<li>$v_l(0) = \\min\\{v_l(1)-4,\\ v_l(2)-6\\} = \\min\\{0,\\ 3\\} = 0$</li>\n</ul>\n<p>两轮结果合起来：</p>\n<table>\n<thead>\n<tr>\n<th>事件</th>\n<th>0</th>\n<th>1</th>\n<th>2</th>\n<th>3</th>\n<th>4</th>\n<th>5</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>$v_e$</td>\n<td>0</td>\n<td>4</td>\n<td>9</td>\n<td>13</td>\n<td>12</td>\n<td>16</td>\n</tr>\n<tr>\n<td>$v_l$</td>\n<td>0</td>\n<td>4</td>\n<td>9</td>\n<td>13</td>\n<td>13</td>\n<td>16</td>\n</tr>\n</tbody>\n</table>\n<p><strong>第三步：算每条弧（活动）的最早开始时间 $e$、最迟开始时间 $l$</strong>——$e$ 取弧<strong>起点</strong>的 $v_e$，$l$ 取弧<strong>终点</strong>的 $v_l$ 减去这条弧的权，两者之差就是余量：</p>\n<table>\n<thead>\n<tr>\n<th>弧</th>\n<th>权</th>\n<th>$e = v_e(\\text{起点})$</th>\n<th>$l = v_l(\\text{终点}) - \\text{权}$</th>\n<th>余量 $l - e$</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>0→1</td>\n<td>4</td>\n<td>0</td>\n<td>$4 - 4 = 0$</td>\n<td><strong>0</strong></td>\n</tr>\n<tr>\n<td>0→2</td>\n<td>6</td>\n<td>0</td>\n<td>$9 - 6 = 3$</td>\n<td>3</td>\n</tr>\n<tr>\n<td>1→2</td>\n<td>5</td>\n<td>4</td>\n<td>$9 - 5 = 4$</td>\n<td><strong>0</strong></td>\n</tr>\n<tr>\n<td>2→3</td>\n<td>4</td>\n<td>9</td>\n<td>$13 - 4 = 9$</td>\n<td><strong>0</strong></td>\n</tr>\n<tr>\n<td>2→4</td>\n<td>3</td>\n<td>9</td>\n<td>$13 - 3 = 10$</td>\n<td>1</td>\n</tr>\n<tr>\n<td>3→5</td>\n<td>3</td>\n<td>13</td>\n<td>$16 - 3 = 13$</td>\n<td><strong>0</strong></td>\n</tr>\n<tr>\n<td>4→5</td>\n<td>3</td>\n<td>12</td>\n<td>$16 - 3 = 13$</td>\n<td>1</td>\n</tr>\n</tbody>\n</table>\n<p>余量为 0 的四条弧 0→1、1→2、2→3、3→5 是关键活动，串起来就是<strong>关键路径 0→1→2→3→5</strong>，长度 $4 + 5 + 4 + 3 = 16$。经过 4 的那条支路（2→4、4→5）余量都是 1，不在关键路径上。</p>"
  },
  {
    "id": "q-auto-ds-3480",
    "year": null,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-5",
    "topics": [
      "ds-5-1"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>【题目】对含 600 个元素的有序顺序表进行折半查找，关键字间的比较次数最多是</p>",
    "options": [
      "9",
      "10",
      "30",
      "300"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B（10 次）。</strong></p>\n<p>折半查找的最多比较次数就是判定树的高度：</p>\n<p>$$h = \\lceil \\log_2(n+1) \\rceil$$</p>\n<p>代入 $n = 600$，得 $h = \\lceil \\log_2 601 \\rceil$。因为</p>\n<p>$$2^9 = 512 &lt; 601 \\le 1024 = 2^{10}$$</p>\n<p>所以 $9 &lt; \\log_2 601 \\le 10$，向上取整为 10，最多比较 10 次。</p>\n<p>为什么判定树的高度一定和同结点数的完全二叉树一样？每折半一次，查找区间就尽量对半分：</p>\n<ul>\n<li>除最后一次划分外，左右两边基本对称，树是一层层\"对称生长\"的；</li>\n<li>区间缩到最后，问题规模只会剩下 2 或 3：剩 3 个时，<code>mid</code> 正好取中间，左右各一个，仍是完全二叉树的形状；剩 2 个时，向下取整会让 <code>mid</code> 取左边那个，最后一次划分长出\"只有右孩子\"的不对称结构；</li>\n<li>所以只有最后一层可能不符合完全二叉树\"从左到右填满\"的规则，但<strong>高度不变</strong>，仍然等于同结点数完全二叉树的高度 $\\lceil \\log_2(n+1) \\rceil$。</li>\n</ul>\n<p><img alt=\"折半查找判定树的生长：除最后一次划分外逐层对称展开，最后问题规模为 2 或 3，只有最后一层可能不满，但高度与同结点数的完全二叉树相同\" src=\"/408-review/assets/textbook/ds-binary-search-height-growth.webp\" /></p>"
  },
  {
    "id": "q-auto-ds-3511",
    "year": 2017,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-5",
    "topics": [
      "ds-5-1"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>下列二叉树中，可能成为折半查找判定树（不含外部结点）的是</p>\n<p><img alt=\"2017 题图：四个不带关键字的二叉树选项 A、B、C、D，只比较树形\" src=\"/408-review/assets/textbook/ds-binary-search-decision-2017-options.webp\" /></p>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>选 A。</strong></p>\n<p>先看根结点定下这棵树用的是哪种取整，再逐层检查有没有混用：</p>\n<ul>\n<li>每个结点左、右子树的结点数最多差 1；</li>\n<li>若 <code>mid = ⌊(low+high)/2⌋</code>（向下取整），则<strong>左子树不多于右子树</strong>；</li>\n<li>若 <code>mid = ⌈(low+high)/2⌉</code>（向上取整），则<strong>左子树不少于右子树</strong>。</li>\n</ul>\n<p>整棵树必须统一按其中一种来，不能有的结点左多、有的结点右多。</p>\n<ul>\n<li><strong>A</strong>：根左 5、右 4；根的左孩子左右各 2；根的右孩子左 2、右 1；再往下每棵 2 个结点的子树都是\"左 1 右 0\"。所有结点都满足\"左 ≥ 右\"，相当于统一按向上取整，<strong>可以</strong>。</li>\n<li><strong>B</strong>：根左右各 5，没问题；但左边两棵 2 结点子树是\"左 1 右 0\"（左多），右边两棵是\"左 0 右 1\"（右多）——同一棵树里混用了两种取整，<strong>不行</strong>。</li>\n<li><strong>C</strong>：根左右各 4；左孩子的子树是\"左 1 右 2\"（左少），右孩子的子树是\"左 2 右 1\"（左多），两种取整混用，<strong>不行</strong>。</li>\n<li><strong>D</strong>：根左 4、右 5（左少，按向下取整）；但它下面 2 结点的子树都是\"左 1 右 0\"（左多，按向上取整），同样混用，<strong>不行</strong>。</li>\n</ul>\n<p>所以选 A。</p>"
  },
  {
    "id": "q-auto-ds-3536",
    "year": 2013,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-5",
    "topics": [
      "ds-5-1"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>设包含 4 个数据元素的集合 $S = \\{\\text{'do'}, \\text{'for'}, \\text{'repeat'}, \\text{'while'}\\}$，各元素的查找概率依次为 $p_1 = 0.35$、$p_2 = 0.15$、$p_3 = 0.15$、$p_4 = 0.35$。将 $S$ 保存在一个长度为 4 的顺序表中，采用折半查找法，查找成功时的平均查找长度为 2.2。</p>\n<p>1）若采用顺序存储结构保存 $S$，且要求平均查找长度更短，则元素应如何排列？应使用何种查找方法？查找成功时的平均查找长度是多少？</p>\n<p>2）若采用链式存储结构保存 $S$，且要求平均查找长度更短，则元素应如何排列？应使用何种查找方法？查找成功时的平均查找长度是多少？</p>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>两问答案相同：按查找概率从大到小排列，采用顺序查找，ASL = 2.1。</strong></p>\n<p><strong>先看题干的 2.2 是怎么来的。</strong> 折半查找要求表按关键字有序，字符串的自然顺序是字典序：</p>\n<p>$$\\text{'do'} &lt; \\text{'for'} &lt; \\text{'repeat'} &lt; \\text{'while'}$$</p>\n<p>所以顺序表只能排成 <code>do, for, repeat, while</code>，概率依次是 0.35、0.15、0.15、0.35。折半查找第一次取 <code>mid = 2</code>，判定树是：</p>\n<ul>\n<li>第 1 层：<code>for</code>（0.15），比较 1 次；</li>\n<li>第 2 层：<code>do</code>（0.35）、<code>repeat</code>（0.15），各比较 2 次；</li>\n<li>第 3 层：<code>while</code>（0.35），比较 3 次。</li>\n</ul>\n<p>不同元素概率不同，ASL 要按概率加权，不能直接除以 4（$c_i$ 是查找第 $i$ 个元素时的比较次数）：</p>\n<p>$$\\text{ASL} = \\sum_{i=1}^{n} p_i c_i$$</p>\n<p>代入：</p>\n<p>$$\\text{ASL}_{\\text{折半}} = 0.15 \\times 1 + 0.35 \\times 2 + 0.15 \\times 2 + 0.35 \\times 3 = 0.15 + 0.7 + 0.3 + 1.05 = 2.2$$</p>\n<p>这正是题干给出的 2.2。</p>\n<p><strong>为什么顺序查找能更短？</strong> 折半查找的比较次数由判定树决定，和概率无关：它把概率只有 0.15 的 <code>for</code> 放在根上（只比 1 次），却让概率 0.35 的 <code>do</code> 比 2 次、<code>while</code> 比 3 次。概率高的元素反而在深层，加权后 ASL 就被拉高了。</p>\n<p>把元素按概率从大到小排列：</p>\n<p><code>do(0.35), while(0.35), for(0.15), repeat(0.15)</code></p>\n<p>（两个 0.35 谁在前都行，两个 0.15 同理。）顺序查找的比较次数依次是 1、2、3、4：</p>\n<p>$$\\text{ASL}_{\\text{顺序}} = 0.35 \\times 1 + 0.35 \\times 2 + 0.15 \\times 3 + 0.15 \\times 4 = 0.35 + 0.7 + 0.45 + 0.6 = 2.1$$</p>\n<p>$2.1 &lt; 2.2$，所以<strong>顺序查找反而更优</strong>。</p>\n<p><strong>两问的区别只在存储结构：</strong></p>\n<p>1）顺序存储：可以顺序查找，也可以折半查找；但按概率排好序后表不再按字典序有序，不能再用折半。选顺序查找，ASL = 2.1。</p>\n<p>2）链式存储：本来就不能折半（链表无法随机访问 <code>mid</code>），只能顺序查找；同样按概率降序排列，ASL = 2.1。</p>\n<p>所以两问的排列、方法和结果完全一样：<strong>按概率降序 + 顺序查找 + ASL = 2.1</strong>。</p>\n<blockquote>\n<p>注：这里\"顺序查找更优\"的前提是<strong>各元素查找概率不相等</strong>。等概率时，折半查找的 $O(\\log n)$ 仍然明显优于顺序查找的 $O(n)$，不能把这道题的结论推广成\"顺序查找总比折半快\"。</p>\n</blockquote>"
  },
  {
    "id": "q-auto-ds-3739",
    "year": 2013,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-5",
    "topics": [
      "ds-5-2"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>若将关键字 1, 2, 3, 4, 5, 6, 7 依次插入初始为空的平衡二叉树 T，则 T 中平衡因子为 0 的分支结点的个数是</p>",
    "options": [
      "0",
      "1",
      "2",
      "3"
    ],
    "answer": "D",
    "analysis": "<p><strong>选 D（3 个）。</strong></p>\n<p>$7 = 2^3 - 1$，由上面的结论，1~7 依次插入后是一棵高度为 3 的满二叉树：根是 4，左孩子 2（左右孩子 1、3），右孩子 6（左右孩子 5、7）。</p>\n<p>分支结点（非叶结点）是 4、2、6，它们的左右子树高度都相等，BF 全为 0。叶子 1、3、5、7 的 BF 也是 0，但题目问的是<strong>分支结点</strong>，不算叶子。</p>\n<p>所以 BF=0 的分支结点有 3 个，选 D。</p>"
  },
  {
    "id": "q-auto-ds-3785",
    "year": 2019,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-5",
    "topics": [
      "ds-5-2"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>在任意一棵非空平衡二叉树（AVL 树）T1 中，删除某结点 v 之后形成平衡二叉树 T2，再将 v 插入 T2 形成平衡二叉树 T3。下列关于 T1 与 T3 的叙述中，正确的是</p>\n<ul>\n<li>Ⅰ. 若 v 是 T1 的叶结点，则 T1 与 T3 可能不相同</li>\n<li>Ⅱ. 若 v 不是 T1 的叶结点，则 T1 与 T3 一定不相同</li>\n<li>Ⅲ. 若 v 不是 T1 的叶结点，则 T1 与 T3 一定相同</li>\n</ul>",
    "options": [
      "仅 Ⅰ",
      "仅 Ⅱ",
      "仅 Ⅰ、Ⅱ",
      "仅 Ⅰ、Ⅲ"
    ],
    "answer": "A",
    "analysis": "<p><strong>选 A（仅 Ⅰ）。</strong></p>\n<p>AVL 的删除和插入不是互逆操作：删除可能触发旋转，插入又可能触发新的旋转，所以 T3 不一定回到 T1。下面用 <code>根(左, 右)</code> 简写树形，<code>_</code> 表示空。</p>\n<ul>\n<li><strong>例①（v 是叶子）</strong>：T1 = <code>2(1, 4(3,5))</code>。删 1 后根 2 右重，左旋得 T2 = <code>4(2(_,3),5)</code>；重插 1 得 T3 = <code>4(2(1,3),5)</code>。T1 根 2、T3 根 4，<strong>可能不同</strong>，Ⅰ 对。</li>\n<li><strong>例②（v 不是叶子，会变）</strong>：T1 = <code>3(1(_,2), 5(4,6))</code>。删 1（只有右孩子 2）得 T2 = <code>3(2,5(4,6))</code>；重插 1 得 T3 = <code>3(2(1,_),5(4,6))</code>，与 T1 <strong>不同</strong>，Ⅲ 错。</li>\n<li><strong>例③（v 不是叶子，不变）</strong>：T1 = <code>2(1,3)</code>。删根 2（用前驱 1 代替）得 T2 = <code>1(_,3)</code>；重插 2 后经 RL 旋转回到 <code>2(1,3)</code>，与 T1 <strong>相同</strong>，Ⅱ 错。</li>\n</ul>\n<p>因此只有 Ⅰ 正确，选 A。</p>"
  },
  {
    "id": "q-auto-ds-3844",
    "year": 2012,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-5",
    "topics": [
      "ds-5-2"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>若平衡二叉树的高度为 6，且所有非叶结点的平衡因子均为 1，则该平衡二叉树的结点总数为</p>",
    "options": [
      "12",
      "20",
      "32",
      "33"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B（20）。</strong></p>\n<p>所有非叶结点的 BF 都是 1（没有 0），说明每个内部结点左右子树高度都差 1，整棵树取到了高度 6 时的<strong>最少结点数</strong>。</p>\n<p>由性质①：</p>\n<p>$$n_6 = n_5 + n_4 + 1$$</p>\n<p>查前面的数列，$n_4 = 7$、$n_5 = 12$，所以</p>\n<p>$$n_6 = 12 + 7 + 1 = 20$$</p>\n<p>选 B。</p>\n<p>选项里的 12 正好是 $n_5$、33 是 $n_7$，32 是 $2^5$，都是按相邻高度或满二叉树设的干扰项。</p>"
  },
  {
    "id": "q-auto-ds-3921",
    "year": 2014,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-5",
    "topics": [
      "ds-5-3"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>在一棵有 15 个关键字的 4 阶 B 树中，含关键字的结点个数最多是</p>",
    "options": [
      "5",
      "6",
      "10",
      "15"
    ],
    "answer": "D",
    "analysis": "<p><strong>选 D（15）。</strong></p>\n<p>要让含关键字的结点数最多，就让每个结点只放 1 个关键字。4 阶 B 树每个结点最多 3 个关键字、最少 1 个；每个内部结点 1 个关键字时有两个孩子，正好可以长成一棵高度 4 的满二叉树：</p>\n<ul>\n<li>第 1 层 1 个、第 2 层 2 个、第 3 层 4 个、第 4 层 8 个；</li>\n<li>合计 $1+2+4+8=15$ 个结点、15 个关键字。</li>\n</ul>\n<p>结点数不可能超过关键字数（每个结点至少 1 个关键字），所以最多就是 15，选 D。</p>"
  },
  {
    "id": "q-auto-ds-3961",
    "year": 2021,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-5",
    "topics": [
      "ds-5-3"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>在一棵高度为 3 的 3 阶 B 树中，根为第 1 层，若第 2 层中有 4 个关键字，则该树的结点数最多是</p>",
    "options": [
      "11",
      "10",
      "9",
      "8"
    ],
    "answer": "A",
    "analysis": "<p><strong>选 A（11）。</strong></p>\n<p>3 阶 B 树每个结点最多 2 个关键字、3 个孩子；根结点关键字数为 1 或 2，非根结点也是 1 或 2。</p>\n<p>设根有 $K_1$ 个关键字，则第 2 层有 $K_1+1$ 个结点。要让总结点数最多，先让第 2 层结点数最多，取 $K_1=2$，于是第 2 层有 3 个结点。</p>\n<p>第 2 层一共 4 个关键字，分给 3 个结点，每个结点 1 或 2 个关键字，最优分配是 <code>2,1,1</code>：</p>\n<ul>\n<li>2 个关键字的结点有 3 个孩子；</li>\n<li>1 个关键字的结点有 2 个孩子；</li>\n<li>第 3 层共有 $3+2+2=7$ 个结点。</li>\n</ul>\n<p>总结点数 $=1+3+7=11$，选 A。</p>\n<p>（若根只放 1 个关键字，第 2 层只有 2 个结点，要装 4 个关键字只能各放 2 个，第 3 层 6 个结点，总数只有 9。）</p>"
  },
  {
    "id": "q-auto-ds-4033",
    "year": 2017,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-5",
    "topics": [
      "ds-5-3"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>下列应用中，适合使用 B+ 树的是</p>",
    "options": [
      "编译器中的词法分析",
      "关系数据库中的索引",
      "网络中的路由表快速查找",
      "操作系统的磁盘空闲块管理"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B（关系数据库中的索引）。</strong></p>\n<p>B+ 树把全部关键字和记录指针放在叶结点，叶子按关键字顺序链接，内部结点只存索引。这带来两个数据库最需要的能力：</p>\n<ul>\n<li>内部结点不存记录，扇出大、树矮，查一条记录访问的磁盘块少；</li>\n<li>叶子链表支持范围查询和顺序扫描（例如 <code>WHERE id BETWEEN 10 AND 20</code>）。</li>\n</ul>\n<p>其他选项的常用结构：</p>\n<ul>\n<li>词法分析：DFA/状态机（或哈希表）；</li>\n<li>路由表：Trie/前缀树、哈希；</li>\n<li>磁盘空闲块管理：位图、空闲链表/成组链接。</li>\n</ul>"
  },
  {
    "id": "q-auto-ds-4083",
    "year": 2020,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-5",
    "topics": [
      "ds-5-3"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>依次将关键字 5, 6, 9, 13, 8, 2, 12, 15 插入初始为空的 4 阶 B 树后，根结点中包含的关键字是</p>",
    "options": [
      "8",
      "6, 9",
      "8, 13",
      "9, 12"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B（6, 9）。</strong></p>\n<p>4 阶 B 树每个结点最多 3 个关键字。插入过程：</p>\n<table>\n<thead>\n<tr>\n<th>插入</th>\n<th>变化</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>5, 6, 9</td>\n<td>根结点 <code>[5,6,9]</code>，已满</td>\n</tr>\n<tr>\n<td>13</td>\n<td><code>[5,6,9,13]</code> 溢出，6 上移；根 <code>[6]</code>，孩子 <code>[5]</code>、<code>[9,13]</code></td>\n</tr>\n<tr>\n<td>8</td>\n<td>$8&gt;6$，进入右子树，变 <code>[8,9,13]</code></td>\n</tr>\n<tr>\n<td>2</td>\n<td>$2&lt;6$，进入左子树，变 <code>[2,5]</code></td>\n</tr>\n<tr>\n<td>12</td>\n<td>右子树 <code>[8,9,12,13]</code> 溢出，9 上移；根 <code>[6,9]</code>，孩子 <code>[2,5]</code>、<code>[8]</code>、<code>[12,13]</code></td>\n</tr>\n<tr>\n<td>15</td>\n<td>$15&gt;9$，进入最右子树，变 <code>[12,13,15]</code></td>\n</tr>\n</tbody>\n</table>\n<p>最后根结点是 <code>[6,9]</code>，选 B。</p>"
  },
  {
    "id": "q-auto-ds-4146",
    "year": 2022,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-5",
    "topics": [
      "ds-5-3"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>在下图所示的 5 阶 B 树 T 中，删除关键字 260 之后需要进行必要的调整，得到新的 B 树 T1。下列选项中，不可能是 T1 根结点中关键字序列的是</p>\n<p><img alt=\"2022 题图：5 阶 B 树，根结点 60、90、260、350；五个孩子分别为 30、50；70、80、85；100、110；280、300；400、500\" src=\"/408-review/assets/textbook/ds-btree-2022-delete.webp\" /></p>",
    "options": [
      "60, 90, 280",
      "60, 90, 350",
      "60, 85, 110, 350",
      "60, 90, 110, 350"
    ],
    "answer": "D",
    "analysis": "<p><strong>选 D。</strong></p>\n<p>5 阶 B 树每个结点最多 4 个关键字；非根结点最少 2 个关键字，所以 <code>[100,110]</code> 和 <code>[280,300]</code> 删掉一个就下溢。</p>\n<p>260 在根结点，先按 B 树删除规则用前驱或后继替代：</p>\n<p><strong>① 用前驱 110 替代 260</strong>：根暂时变成 <code>[60,90,110,350]</code>，左孩子 <code>[100]</code> 下溢。</p>\n<ul>\n<li>左兄弟 <code>[70,80,85]</code> 有 3 个关键字，够借：父结点 90 下移、85 上移，根变成 <code>[60,85,110,350]</code>——C 可能；</li>\n<li>不借而与右兄弟合并：父结点 110 下移，<code>[100] + 110 + [280,300]</code> 合成 <code>[100,110,280,300]</code>，根变成 <code>[60,90,350]</code>——B 可能。</li>\n</ul>\n<p><strong>② 用后继 280 替代 260</strong>：根暂时变成 <code>[60,90,280,350]</code>，右孩子 <code>[300]</code> 下溢；左右兄弟都只有 2 个关键字，不够借，只能合并。</p>\n<ul>\n<li>与左兄弟合并：<code>[100,110] + 280 + [300]</code> 合成 <code>[100,110,280,300]</code>，根变成 <code>[60,90,350]</code>——B 可能；</li>\n<li>与右兄弟合并：<code>[300] + 350 + [400,500]</code> 合成 <code>[300,350,400,500]</code>，根变成 <code>[60,90,280]</code>——A 可能。</li>\n</ul>\n<p><strong>D <code>[60,90,110,350]</code> 只是用前驱 110 替代 260 后的中间状态</strong>：此时 <code>[100]</code> 还下溢，必须继续借或合并，根一定会变（变成 B 或 C），所以 D 不可能是调整后的 T1 根结点序列。</p>\n<p>所以选 D。</p>"
  },
  {
    "id": "q-auto-ds-4205",
    "year": 2014,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-5",
    "topics": [
      "ds-5-3"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>用哈希（散列）方法处理冲突（碰撞）时可能出现堆积（聚集）现象，下列选项中，会受堆积现象直接影响的是</p>",
    "options": [
      "存储效率",
      "散列函数",
      "装填（装载）因子",
      "平均查找长度"
    ],
    "answer": "D",
    "analysis": "<p><strong>选 D（平均查找长度）。</strong></p>\n<p>堆积是用线性探测处理冲突时，冲突的关键字挤占了后面的槽，导致本来散列地址不同的关键字也被迫继续往后探测。它直接拉长的是<strong>探测序列</strong>，所以平均查找长度（ASL）变长。</p>\n<p>其他选项：</p>\n<ul>\n<li>存储效率：堆积不改变表长和关键字个数，不直接改变空间利用率；</li>\n<li>散列函数：它是映射规则，堆积是冲突处理造成的，不会反过来改变散列函数；</li>\n<li>装填因子：$\\alpha=n/m$ 由关键字数和表长决定，堆积不改变 $\\alpha$。</li>\n</ul>"
  },
  {
    "id": "q-auto-ds-4281",
    "year": 2023,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-5",
    "topics": [
      "ds-5-3"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>现有长度为 5、初始为空的散列表 HT，散列函数 $H(k)=(k+4)\\bmod 5$，用线性探查再散列法解决冲突。若将关键字序列 2022, 12, 25 依次插入 HT，然后删除关键字 25，则 HT 中查找失败的平均查找长度为</p>",
    "options": [
      "1",
      "1.6",
      "1.8",
      "2.2"
    ],
    "answer": "C",
    "analysis": "<p><strong>选 C（1.8）。</strong></p>\n<p>插入过程：</p>\n<ul>\n<li>$H(2022)=(2022+4)\\bmod 5=2026\\bmod 5=1$，放在地址 1；</li>\n<li>$H(12)=16\\bmod 5=1$，冲突，线性探测到地址 2；</li>\n<li>$H(25)=29\\bmod 5=4$，放在地址 4。</li>\n</ul>\n<p>表为 <code>[空, 2022, 12, 空, 25]</code>。</p>\n<p>删除 25 时不能把地址 4 直接置空，否则会截断探测链；要做删除标记。删除后：</p>\n<table>\n<thead>\n<tr>\n<th>地址</th>\n<th>0</th>\n<th>1</th>\n<th>2</th>\n<th>3</th>\n<th>4</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>状态</td>\n<td>空</td>\n<td>2022</td>\n<td>12</td>\n<td>空</td>\n<td>删除标记</td>\n</tr>\n</tbody>\n</table>\n<p>失败查找从每个可能的散列地址 0~4 出发，探测到<strong>真正的空槽</strong>为止（删除标记不算空）：</p>\n<table>\n<thead>\n<tr>\n<th>起始地址</th>\n<th>0</th>\n<th>1</th>\n<th>2</th>\n<th>3</th>\n<th>4</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>比较次数</td>\n<td>1</td>\n<td>3</td>\n<td>2</td>\n<td>1</td>\n<td>2</td>\n</tr>\n</tbody>\n</table>\n<ul>\n<li>从 4 出发：地址 4 是删除标记（算一次比较），继续回绕到 0，0 为空，共 2 次；</li>\n<li>其余：0 空 → 1 次；1→2→3 空 → 3 次；2→3 空 → 2 次；3 空 → 1 次。</li>\n</ul>\n<p>$$\\text{ASL}_{失败}=\\frac{1+3+2+1+2}{5}=1.8$$</p>\n<p>选 C。</p>\n<blockquote>\n<p>易错：如果删除 25 时直接把地址 4 置空，从 4 出发一次就失败，$\\text{ASL}_{失败}=8/5=1.6$，会误选 B。开放定址法必须用删除标记。</p>\n</blockquote>"
  },
  {
    "id": "q-auto-ds-4332",
    "year": 2024,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-5",
    "topics": [
      "ds-5-3"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>将关键字序列 20, 3, 11, 18, 9, 14, 7 依次存储到初始为空、长度为 11 的散列表 HT 中，散列函数 $H(key)=(key\\times3)\\bmod 11$。$H(key)$ 计算出的初始散列地址为 $H_0$，发生冲突时探查地址序列是 $H_1,H_2,H_3,\\dots$，其中 $H_k=(H_0+k^2)\\bmod 11$，$k=1,2,3,\\dots$。</p>\n<p>请回答下列问题：</p>\n<p>1）画出所构造的 HT，并计算 HT 的装填因子。\n2）给出在 HT 中查找关键字 14 的关键字比较序列。\n3）在 HT 中查找关键字 8，确认查找失败时的散列地址是多少？</p>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>1）HT 如下，装填因子 $\\alpha=7/11\\approx0.64$。</strong></p>\n<table>\n<thead>\n<tr>\n<th>地址</th>\n<th>0</th>\n<th>1</th>\n<th>2</th>\n<th>3</th>\n<th>4</th>\n<th>5</th>\n<th>6</th>\n<th>7</th>\n<th>8</th>\n<th>9</th>\n<th>10</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>关键字</td>\n<td>11</td>\n<td>空</td>\n<td>14</td>\n<td>7</td>\n<td>空</td>\n<td>20</td>\n<td>9</td>\n<td>空</td>\n<td>空</td>\n<td>3</td>\n<td>18</td>\n</tr>\n</tbody>\n</table>\n<p>插入过程：</p>\n<ul>\n<li>20：$H_0=5$，放地址 5；</li>\n<li>3：$H_0=9$，放地址 9；</li>\n<li>11：$H_0=0$，放地址 0；</li>\n<li>18：$H_0=10$，放地址 10；</li>\n<li>9：$H_0=5$ 冲突，$H_1=6$，放地址 6；</li>\n<li>14：$H_0=9$ 冲突，$H_1=10$ 冲突，$H_2=2$，放地址 2；</li>\n<li>7：$H_0=10$ 冲突，$H_1=0$ 冲突，$H_2=3$，放地址 3。</li>\n</ul>\n<p>共有 $n=7$ 个关键字，表长 $m=11$，所以 $\\alpha=7/11\\approx0.64$。</p>\n<p><strong>2）查找 14：关键字比较序列是 3, 18, 14。</strong></p>\n<p>$H(14)=42\\bmod11=9$：地址 9 是 3，$H_1=10$ 是 18，$H_2=2$ 是 14，命中。对应地址序列 $9\\to10\\to2$。</p>\n<p><strong>3）查找 8 失败，确认失败的散列地址是 7。</strong></p>\n<p>$H(8)=24\\bmod11=2$：地址 2 是 14，$H_1=3$ 是 7，$H_2=6$ 是 9，$H_3=0$ 是 11，$H_4=7$ 为空，查找失败。探测地址序列是 $2\\to3\\to6\\to0\\to7$。</p>"
  },
  {
    "id": "q-auto-ds-4376",
    "year": null,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-5",
    "topics": [
      "ds-5-3"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>【题目】散列表长 $m=14$，$H(key)=key\\bmod 11$，若插入关键字 15、38、61、84，并使用二次探测法解决冲突，则 49 的散列地址是</p>",
    "options": [
      "8",
      "3",
      "5",
      "9"
    ],
    "answer": "D",
    "analysis": "<p><strong>选 D（9）。</strong></p>\n<p>先算初始地址（除数是 11）：</p>\n<ul>\n<li>$15\\bmod11=4$，放地址 4；</li>\n<li>$38\\bmod11=5$，放地址 5；</li>\n<li>$61\\bmod11=6$，放地址 6；</li>\n<li>$84\\bmod11=7$，放地址 7。</li>\n</ul>\n<p>49 的初始地址是 $49\\bmod11=5$，地址 5 已被 38 占用。按正向平方探测，回绕对<strong>表长 14</strong> 取模：</p>\n<ul>\n<li>$H_1=(5+1^2)\\bmod14=6$，被 61 占用；</li>\n<li>$H_2=(5+2^2)\\bmod14=9$，空，放地址 9。</li>\n</ul>\n<p>所以 49 的散列地址是 9，选 D。</p>\n<blockquote>\n<p>注意：这题用 11 回绕碰巧也会得到 9，但规则上探测地址必须对表长 $m=14$ 取模；换一组数据就可能不同。</p>\n</blockquote>"
  },
  {
    "id": "q-auto-ds-4650",
    "year": null,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-6",
    "topics": [
      "ds-6-1"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>【题目】对含 6 个元素的逆序序列进行直接插入排序，关键字比较次数和元素移动次数分别是</p>",
    "options": [
      "15，21",
      "15，25",
      "30，25",
      "21，15"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B（15，25）。</strong></p>\n<p>比较次数：$n=6$，最坏情况</p>\n<p>$$\\frac{n(n-1)}{2}=\\frac{6\\times5}{2}=15$$</p>\n<p>移动次数：</p>\n<p>$$\\frac{(n+4)(n-1)}{2}=\\frac{10\\times5}{2}=25$$</p>\n<p>也可以按趟数：第 $i$ 趟移动 $i+1$ 次，$i=2,\\dots,6$，共 $3+4+5+6+7=25$ 次。其中每趟有 2 次是哨兵复制，真正的元素后移是 $1+2+3+4+5=15$ 次。</p>"
  },
  {
    "id": "q-auto-ds-5277",
    "year": 2021,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-6",
    "topics": [
      "ds-6-1"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>将关键字 <code>6, 9, 1, 5, 8, 4, 7</code> 依次插入初始为空的大根堆 H，得到的 H 是</p>",
    "options": [
      "9,8,7,6,5,4,1",
      "9,8,7,5,6,1,4",
      "9,8,7,5,6,4,1",
      "9,6,7,5,8,4,1"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B（9,8,7,5,6,1,4）。</strong></p>\n<p>每插入一个元素，先放到堆底（数组末尾），再和父结点比较、向上调整：</p>\n<table>\n<thead>\n<tr>\n<th>插入</th>\n<th>插入后（调整前）</th>\n<th>调整后</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>6</td>\n<td><code>6</code></td>\n<td><code>6</code></td>\n</tr>\n<tr>\n<td>9</td>\n<td><code>6,9</code></td>\n<td><code>9,6</code>（9 上浮）</td>\n</tr>\n<tr>\n<td>1</td>\n<td><code>9,6,1</code></td>\n<td><code>9,6,1</code></td>\n</tr>\n<tr>\n<td>5</td>\n<td><code>9,6,1,5</code></td>\n<td><code>9,6,1,5</code>（5 &lt; 6）</td>\n</tr>\n<tr>\n<td>8</td>\n<td><code>9,6,1,5,8</code></td>\n<td><code>9,8,1,5,6</code>（8 与 6 交换）</td>\n</tr>\n<tr>\n<td>4</td>\n<td><code>9,8,1,5,6,4</code></td>\n<td><code>9,8,4,5,6,1</code>（4 与 1 交换）</td>\n</tr>\n<tr>\n<td>7</td>\n<td><code>9,8,4,5,6,1,7</code></td>\n<td><code>9,8,7,5,6,1,4</code>（7 与 4 交换）</td>\n</tr>\n</tbody>\n</table>\n<p>所以最终是 <code>9,8,7,5,6,1,4</code>，选 B。</p>\n<blockquote>\n<p>注意：A、B、C 都是合法的大根堆，单看\"是不是堆\"选不出来；题目是\"依次插入空堆\"，必须按上浮过程走。不要用 <code>BuildMaxHeap</code> 的从后往前下坠法代替，两者可能得到不同的合法堆。</p>\n</blockquote>"
  },
  {
    "id": "q-auto-ds-5436",
    "year": null,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-6",
    "topics": [
      "ds-6-1"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>【题目】下列排序算法中，排序过程中比较次数的数量级与序列初始状态无关的是</p>",
    "options": [
      "归并排序",
      "插入排序",
      "快速排序",
      "冒泡排序"
    ],
    "answer": "A",
    "analysis": "<p><strong>选 A（归并排序）。</strong></p>\n<p>归并排序总是把区间对半分，每层合并都要扫描这一层的全部元素，层数是 ⌈log₂ n⌉，所以最好、最坏、平均的比较次数数量级都是 Θ(n log n)，与初始序列无关。</p>\n<p>前面的\"最多 m+n-1、最少 min{m,n}\"说的是<strong>单次 Merge</strong> 的精确范围；它只影响常数因子，不改变 Θ(n log n) 这个数量级。</p>\n<p>其余三个都会随初始状态变化：</p>\n<table>\n<thead>\n<tr>\n<th>算法</th>\n<th>最好</th>\n<th>最坏</th>\n<th>是否与初始状态有关</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>归并排序</td>\n<td>Θ(n log n)</td>\n<td>Θ(n log n)</td>\n<td>无关</td>\n</tr>\n<tr>\n<td>插入排序</td>\n<td>n-1</td>\n<td>n(n-1)/2</td>\n<td>有关</td>\n</tr>\n<tr>\n<td>快速排序</td>\n<td>Θ(n log n)</td>\n<td>O(n²)</td>\n<td>有关</td>\n</tr>\n<tr>\n<td>冒泡排序</td>\n<td>n-1（带 <code>flag</code>）</td>\n<td>n(n-1)/2</td>\n<td>有关</td>\n</tr>\n</tbody>\n</table>\n<blockquote>\n<p>注意：题目问的是\"数量级\"。插入排序最好 O(n)、最坏 O(n²)，冒泡同理；快速排序最好/平均 O(n log n)、最坏 O(n²)，所以都不能说与初始状态无关。</p>\n<p>补充：简单选择排序的比较次数固定为 n(n-1)/2，数量级也与初始状态无关；本题选项里没有它，不要误以为只有归并排序一个。</p>\n</blockquote>"
  },
  {
    "id": "q-auto-ds-5466",
    "year": null,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-6",
    "topics": [
      "ds-6-1"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>【题目】一组经过第一趟二路归并排序后的记录关键字为 <code>{25, 50, 15, 35, 80, 85, 20, 40, 36, 70}</code>，其中包含 5 个长度为 2 的有序表。用二路归并排序算法对该序列进行第二趟归并后的结果是</p>",
    "options": [
      "15,25,35,50,80,20,85,40,70,36",
      "15,25,35,50,20,40,80,85,36,70",
      "15,25,50,35,80,85,20,36,40,70",
      "15,25,35,50,80,20,36,40,70,85"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B。</strong></p>\n<p>先把题干的 5 个有序表按相邻顺序排开：</p>\n<p><code>[25,50] [15,35] [80,85] [20,40] [36,70]</code></p>\n<p>第二趟相邻两两归并：</p>\n<ul>\n<li>第 1、2 个 → <code>15,25,35,50</code></li>\n<li>第 3、4 个 → <code>20,40,80,85</code></li>\n<li>第 5 个没有配对，原样保留 <code>36,70</code></li>\n</ul>\n<p>拼起来是 <code>15,25,35,50,20,40,80,85,36,70</code>，选 B。</p>"
  },
  {
    "id": "q-auto-ds-5721",
    "year": 2009,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-6",
    "topics": [
      "ds-6-2"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>若数据元素序列 <code>{11, 12, 13, 7, 8, 9, 23, 4, 5}</code> 是采用下列排序算法之一得到的第二趟排序后的结果，则该排序算法只能是</p>",
    "options": [
      "冒泡排序",
      "插入排序",
      "选择排序",
      "二路归并排序"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B（插入排序）。</strong></p>\n<p>插入排序前两趟只处理前三个元素：先放入 11，再插入 12、13，得到 <code>11,12,13</code>，后面的元素原封不动——正好是题干的序列。</p>\n<p>其余三个都对不上：</p>\n<table>\n<thead>\n<tr>\n<th>算法</th>\n<th>两趟后的特征</th>\n<th>本题序列</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>插入排序</td>\n<td>前 3 个有序，后面不动</td>\n<td><code>11,12,13</code> 有序，符合</td>\n</tr>\n<tr>\n<td>冒泡排序</td>\n<td>左→右：末尾是最大两个 13、23；右→左：开头是最小两个 4、5</td>\n<td>末尾是 4、5、开头是 11、12，不符合</td>\n</tr>\n<tr>\n<td>选择排序</td>\n<td>前两个是最小的两个 4、5</td>\n<td>开头是 11、12，不符合</td>\n</tr>\n<tr>\n<td>二路归并排序</td>\n<td>第二趟后每 4 个一组应有序</td>\n<td><code>11,12,13,7</code> 不是有序，不符合</td>\n</tr>\n</tbody>\n</table>\n<p>所以只能是插入排序，选 B。</p>\n<blockquote>\n<p>注：二路归并这里按自底向上的口径（第一趟长度 2、第二趟长度 4）；递归实现的中间分组可能不同，但这道题按考试口径判断。</p>\n</blockquote>"
  },
  {
    "id": "q-auto-ds-5749",
    "year": 2022,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-6",
    "topics": [
      "ds-6-2"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>对数据进行排序时，若采用直接插入排序而不采用快速排序，则可能的原因是</p>\n<ul>\n<li><strong>I.</strong> 大部分元素已有序</li>\n<li><strong>II.</strong> 待排序元素数量很少</li>\n<li><strong>III.</strong> 要求空间复杂度为 O(1)</li>\n<li><strong>IV.</strong> 要求排序算法是稳定的</li>\n</ul>",
    "options": [
      "仅 I、II",
      "仅 III、IV",
      "仅 I、II、IV",
      "I、II、III、IV"
    ],
    "answer": "D",
    "analysis": "<p><strong>选 D（I、II、III、IV）。</strong></p>\n<ul>\n<li><strong>I 大部分元素已有序</strong>：直接插入排序接近 O(n)；快排如果枢轴取得不好（例如总取首元素），在基本有序时容易退化。</li>\n<li><strong>II 元素数量很少</strong>：插入排序常数小、没有递归开销，通常比快排更合适。</li>\n<li><strong>III 要求空间 O(1)</strong>：直接插入是 O(1)；快排的递归栈平均 O(log n)、最坏 O(n)。</li>\n<li><strong>IV 要求稳定</strong>：直接插入稳定；标准原地快排不稳定。</li>\n</ul>\n<p>四条都可能，选 D。</p>\n<blockquote>\n<p>注：这里讨论的是标准原地快排；如果允许额外空间或特殊实现，稳定性和空间结论可能改变。</p>\n</blockquote>"
  },
  {
    "id": "q-auto-ds-5776",
    "year": 2017,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-6",
    "topics": [
      "ds-6-2"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>在内部排序时，若选择了归并排序而未选择插入排序，则可能的理由是</p>\n<ul>\n<li><strong>I.</strong> 归并排序的程序代码更短</li>\n<li><strong>II.</strong> 归并排序的占用空间更少</li>\n<li><strong>III.</strong> 归并排序的运行效率更高</li>\n</ul>",
    "options": [
      "仅 II",
      "仅 III",
      "仅 I、II",
      "仅 I、III"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B（仅 III）。</strong></p>\n<ul>\n<li><strong>I 错</strong>：归并排序要写递归、合并和辅助数组，代码通常比直接插入长。</li>\n<li><strong>II 错</strong>：归并排序需要 O(n) 的辅助数组，插入排序只要 O(1)。</li>\n<li><strong>III 对</strong>：归并排序是 O(n log n)，插入排序最坏 / 平均是 O(n²)。</li>\n</ul>\n<p>所以只有 III，选 B。</p>\n<blockquote>\n<p>注：如果数据已经基本有序，插入排序可能达到 O(n)，这时它可能更快；但题目问的是一般理由，III 成立。</p>\n</blockquote>"
  },
  {
    "id": "q-auto-ds-5801",
    "year": 2019,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-6",
    "topics": [
      "ds-6-2"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>排序过程中，对尚未确定最终位置的所有元素进行一遍处理称为一趟。下列序列中，不可能是快速排序第二趟结果的是</p>",
    "options": [
      "5, 2, 16, 12, 28, 60, 32, 72",
      "2, 16, 5, 28, 12, 60, 32, 72",
      "2, 12, 16, 5, 28, 32, 72, 60",
      "5, 2, 12, 28, 16, 32, 72, 60"
    ],
    "answer": "D",
    "analysis": "<p><strong>选 D。</strong></p>\n<p>题干说的\"一趟\"是：把所有尚未确定最终位置的元素处理一遍。快排第一趟定下第一个枢轴；第二趟要把第一趟分出的<strong>每个当前子表</strong>都划分一次（如果第一趟枢轴在端点，就只有一边）。</p>\n<p>最终有序序列是 <code>2,5,12,16,28,32,60,72</code>。逐个看：</p>\n<table>\n<thead>\n<tr>\n<th>选项</th>\n<th>可作第一枢轴</th>\n<th>第二趟</th>\n<th>结论</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>A</td>\n<td>72</td>\n<td>左段以 28 为枢轴</td>\n<td>可能</td>\n</tr>\n<tr>\n<td>B</td>\n<td>2</td>\n<td>右段以 28 为枢轴</td>\n<td>可能</td>\n</tr>\n<tr>\n<td>C</td>\n<td>28</td>\n<td>左段以 2、右段以 32 为枢轴</td>\n<td>可能</td>\n</tr>\n<tr>\n<td>D</td>\n<td>12 或 32</td>\n<td>12 的左侧 <code>[5,2]</code> 没有到位元素；32 的右侧 <code>[72,60]</code> 没有到位元素</td>\n<td>不可能</td>\n</tr>\n</tbody>\n</table>\n<p>D 无论第一枢轴选 12 还是 32，都会有一侧的非空子表找不到能当枢轴的到位元素，所以不可能，选 D。</p>\n<blockquote>\n<p>注：判断\"能不能\"时，枢轴可以选任意元素，只要存在一种选法即可；A、B、C 都能找到对应的枢轴安排。</p>\n</blockquote>"
  },
  {
    "id": "q-auto-ds-5928",
    "year": 2019,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-6",
    "topics": [
      "ds-6-3"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>设外存上有 120 个初始归并段，进行 12 路归并时，为实现最佳归并，需要补充的虚段个数是</p>",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B（2 个）。</strong></p>\n<p>12 路归并的最佳归并树必须是一棵严格 12 叉树。严格 $k$ 叉树满足</p>\n<p>$$n_0=(k-1)n_k+1$$</p>\n<p>现在 $k=12$、$n_0=120$，先看叶子数是否满足这个同余关系：</p>\n<p>$$(120-1)\\bmod(12-1)=119\\bmod 11=9$$</p>\n<p>余数不为 0，说明 120 个叶子凑不成严格 12 叉树。需要补的虚段数为</p>\n<p>$$(k-1)-\\big((n_0-1)\\bmod(k-1)\\big)=11-9=2$$</p>\n<p>补 2 个长度为 0 的虚段后，$n_0=122$，内部结点数 $n_k=(122-1)/11=11$，正好是严格 12 叉树。</p>\n<blockquote>\n<p>常见错误：拿 $120\\bmod 12=0$ 去判断，误以为不用补。严格 $k$ 叉树的判据是 $(n_0-1)\\bmod(k-1)$，不是 $n_0\\bmod k$。</p>\n</blockquote>"
  },
  {
    "id": "q-auto-ds-5957",
    "year": 2023,
    "no": "",
    "label": "例题",
    "subject": "ds",
    "chapter": "ds-6",
    "topics": [
      "ds-6-3"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>对含有 $n$（$n&gt;0$）个记录的文件进行外部排序，采用置换-选择排序生成初始归并段时需要使用一个工作区，工作区中能保存 $m$ 个记录。请回答：</p>\n<ol>\n<li>若文件中含有 19 个记录，其关键字依次是 51, 94, 37, 92, 14, 63, 15, 99, 48, 56, 23, 60, 31, 17, 43, 8, 90, 166, 100，则当 $m=4$ 时，可生成几个初始归并段？各是什么？</li>\n<li>对任意的 $m$（$n\\gg m&gt;0$），生成的第一个初始归并段的长度最大值和最小值分别是多少？</li>\n</ol>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>（1）3 个初始归并段：</strong></p>\n<table>\n<thead>\n<tr>\n<th>归并段</th>\n<th>记录</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>第 1 段</td>\n<td>37, 51, 63, 92, 94, 99</td>\n</tr>\n<tr>\n<td>第 2 段</td>\n<td>14, 15, 23, 31, 48, 56, 60, 90, 166</td>\n</tr>\n<tr>\n<td>第 3 段</td>\n<td>8, 17, 43, 100</td>\n</tr>\n</tbody>\n</table>\n<p>置换-选择排序的规则：工作区里同时放着当前段和下一段的候选记录。每次输出工作区中<strong>不小于刚输出记录</strong>的最小者，再用下一条输入记录补位——新记录比刚输出的大，就留在本段继续参与；比刚输出的小，就冻结到下一段。工作区全部冻结时，本段结束，再解冻开始下一段。</p>\n<p>第 1 段（初始工作区 51, 94, 37, 92）：</p>\n<table>\n<thead>\n<tr>\n<th>输出</th>\n<th>读入</th>\n<th>比较</th>\n<th>处理</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>37</td>\n<td>14</td>\n<td>14 &lt; 37</td>\n<td>冻结</td>\n</tr>\n<tr>\n<td>51</td>\n<td>63</td>\n<td>63 &gt; 51</td>\n<td>进入本段</td>\n</tr>\n<tr>\n<td>63</td>\n<td>15</td>\n<td>15 &lt; 63</td>\n<td>冻结</td>\n</tr>\n<tr>\n<td>92</td>\n<td>99</td>\n<td>99 &gt; 92</td>\n<td>进入本段</td>\n</tr>\n<tr>\n<td>94</td>\n<td>48</td>\n<td>48 &lt; 94</td>\n<td>冻结</td>\n</tr>\n<tr>\n<td>99</td>\n<td>56</td>\n<td>56 &lt; 99</td>\n<td>冻结</td>\n</tr>\n</tbody>\n</table>\n<p>此时工作区为 14, 15, 48, 56，全部冻结，第 1 段结束。</p>\n<p>第 2 段（工作区解冻）：</p>\n<table>\n<thead>\n<tr>\n<th>输出</th>\n<th>读入</th>\n<th>比较</th>\n<th>处理</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>14</td>\n<td>23</td>\n<td>23 &gt; 14</td>\n<td>进入本段</td>\n</tr>\n<tr>\n<td>15</td>\n<td>60</td>\n<td>60 &gt; 15</td>\n<td>进入本段</td>\n</tr>\n<tr>\n<td>23</td>\n<td>31</td>\n<td>31 &gt; 23</td>\n<td>进入本段</td>\n</tr>\n<tr>\n<td>31</td>\n<td>17</td>\n<td>17 &lt; 31</td>\n<td>冻结</td>\n</tr>\n<tr>\n<td>48</td>\n<td>43</td>\n<td>43 &lt; 48</td>\n<td>冻结</td>\n</tr>\n<tr>\n<td>56</td>\n<td>8</td>\n<td>8 &lt; 56</td>\n<td>冻结</td>\n</tr>\n<tr>\n<td>60</td>\n<td>90</td>\n<td>90 &gt; 60</td>\n<td>进入本段</td>\n</tr>\n<tr>\n<td>90</td>\n<td>166</td>\n<td>166 &gt; 90</td>\n<td>进入本段</td>\n</tr>\n<tr>\n<td>166</td>\n<td>100</td>\n<td>100 &lt; 166</td>\n<td>冻结</td>\n</tr>\n</tbody>\n</table>\n<p>此时输入记录已读完，工作区为 8, 17, 43, 100，全部属于下一段，第 2 段结束。</p>\n<p>第 3 段：输入已空，把工作区剩下的记录按升序输出，得到 8, 17, 43, 100。</p>\n<p>核对：三段长度分别为 6、9、4，合计 19，正好覆盖全部记录。</p>\n<p><strong>（2）第一个归并段长度的最大值是 $n$，最小值是 $m$。</strong></p>\n<ul>\n<li><strong>最大值 $n$</strong>：若文件本身按关键字递增，每读入一条新记录都大于刚输出的记录，都能留在本段，所以第一段可以一直延伸到文件末尾，长度达到 $n$。</li>\n<li><strong>最小值 $m$</strong>：工作区最初装入的 $m$ 个记录一定都属于第一段，所以第一段至少有 $m$ 个记录。若文件按关键字严格递减，每读入的新记录都小于刚输出的记录，全部被冻结；输出完最初 $m$ 个记录后工作区全冻结，第一段恰好结束，长度为 $m$。</li>\n</ul>\n<blockquote>\n<p>置换-选择排序的平均段长约为 $2m$，但具体长度取决于输入顺序：最好可到 $n$，最坏只有 $m$。这也是它能减少初始段数的原因——平均比\"每段恰好 $m$ 个\"的简单分段多一倍。</p>\n</blockquote>"
  },
  {
    "id": "q-auto-coa-1488",
    "year": 2021,
    "no": "13",
    "label": "",
    "subject": "coa",
    "chapter": "coa-2",
    "topics": [
      "coa-2-6"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>已知带符号整数用补码表示，变量 <code>x</code>、<code>y</code>、<code>z</code> 的机器数分别为 <code>FFFDH</code>、<code>FFDFH</code>、<code>7FFCH</code>，下列结论中正确的是（ ）。</p>",
    "options": [
      "若 x、y、z 为无符号整数，则 z &lt; x &lt; y",
      "若 x、y、z 为无符号整数，则 x &lt; y &lt; z",
      "若 x、y、z 为带符号整数，则 x &lt; y &lt; z",
      "若 x、y、z 为带符号整数，则 y &lt; x &lt; z"
    ],
    "answer": "D",
    "analysis": "<p><strong>选 D。</strong></p>\n<p>按无符号数看：<code>FFFDH</code> = 65533，<code>FFDFH</code> = 65503，<code>7FFCH</code> = 32764，所以 z &lt; y &lt; x，A、B 都不对。</p>\n<p>按带符号补码看：<code>FFFDH</code> = -3，<code>FFDFH</code> = -33，<code>7FFCH</code> = +32764，所以 y &lt; x &lt; z，D 对、C 错。</p>"
  },
  {
    "id": "q-auto-coa-1511",
    "year": 2023,
    "no": "13",
    "label": "",
    "subject": "coa",
    "chapter": "coa-2",
    "topics": [
      "coa-2-1"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>若 <code>short</code> 型变量 <code>x = -8190</code>，则 <code>x</code> 的机器数是（ ）。</p>",
    "options": [
      "<code>E002H</code>",
      "<code>E001H</code>",
      "<code>9FFFH</code>",
      "<code>9FFEH</code>"
    ],
    "answer": "A",
    "analysis": "<p><strong>选 A。</strong></p>\n<p><code>short</code> 是 16 位，负数用补码表示：</p>\n<p>$$[-8190]_{\\text{补}}=2^{16}-8190=65536-8190=57346=\\text{E002H}$$</p>\n<p>也可以先写出 $8190=\\text{1FFEH}$，取反得 $\\text{E001H}$，再加 1 得 $\\text{E002H}$。</p>"
  },
  {
    "id": "q-auto-coa-1552",
    "year": 2023,
    "no": "14",
    "label": "",
    "subject": "coa",
    "chapter": "coa-2",
    "topics": [
      "coa-2-2"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>已知 <code>float</code> 型变量用 IEEE 754 单精度浮点数格式表示，若 <code>float</code> 型变量 <code>x</code> 的机器数为 <code>8020 0000H</code>，则 <code>x</code> 的值是（ ）。</p>",
    "options": [
      "$-2^{-128}$",
      "$-1.01\\times2^{-127}$",
      "$-1.01\\times2^{-126}$",
      "非数（NaN）"
    ],
    "answer": "A",
    "analysis": "<p><strong>选 A。</strong></p>\n<p><code>8020 0000H</code> 拆成 32 位：符号位 S=1，阶码 E=0，尾数 <code>010 0000...</code>，所以它是非规格化负数。</p>\n<p>非规格化数的真值为 $(-1)^S\\times0.M\\times2^{-126}$；尾数 <code>010 0000...</code> $=0.01_2=2^{-2}$，于是</p>\n<p>$$x=-2^{-2}\\times2^{-126}=-2^{-128}$$</p>"
  },
  {
    "id": "q-auto-coa-1571",
    "year": 2022,
    "no": "14",
    "label": "",
    "subject": "coa",
    "chapter": "coa-2",
    "topics": [
      "coa-2-2"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>$-0.4375$ 的 IEEE 754 单精度浮点数表示为（ ）。</p>",
    "options": [
      "<code>BEE0 0000H</code>",
      "<code>BF60 0000H</code>",
      "<code>BF70 0000H</code>",
      "<code>C0E0 0000H</code>"
    ],
    "answer": "A",
    "analysis": "<p><strong>选 A。</strong></p>\n<p>$0.4375=7/16=0.0111_2=1.11_2\\times2^{-2}$，所以符号位 S=1，阶码</p>\n<p>$$E=-2+127=125=0111\\,1101_2$$</p>\n<p>尾数去掉隐藏位 1 后为 <code>110 0000...</code>。拼接起来是 <code>1 0111 1101 110 0000...</code>，即 <code>BEE0 0000H</code>。</p>"
  },
  {
    "id": "q-auto-coa-1618",
    "year": 2009,
    "no": "13",
    "label": "",
    "subject": "coa",
    "chapter": "coa-2",
    "topics": [
      "coa-2-3"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>浮点数加、减运算过程一般包括对阶、尾数运算、规格化、舍入和判溢出等步骤。设浮点数的阶码和尾数均采用补码表示，且位数分别为 5 位和 7 位（均含 2 位符号位）。若有二个数 $X=2^7\\times29/32$，$Y=2^5\\times5/8$，则用浮点加法计算 $X+Y$ 的最终结果是（ ）。</p>",
    "options": [
      "<code>00111 1100010</code>",
      "<code>00111 0100010</code>",
      "<code>01000 0010001</code>",
      "发生溢出"
    ],
    "answer": "D",
    "analysis": "<p><strong>选 D。</strong></p>\n<p>$X=0.11101_2\\times2^7$，$Y=0.10100_2\\times2^5$。</p>\n<p>对阶：$Y$ 的尾数右移 2 位，得 $0.00101_2\\times2^7$。</p>\n<p>尾数相加：$0.11101+0.00101=1.00010$，规格化为 $0.100010\\times2^8$；舍入到 5 位尾数为 $0.10001\\times2^8$。</p>\n<p>阶码 5 位含 2 位符号位，只有 3 位数值，范围是 $-8\\sim+7$。$+8$ 的编码为 <code>01 000</code>，双符号位 <code>01</code> 表示溢出，所以选 D。</p>\n<blockquote>\n<p>C 的尾数 <code>0010001</code> 正好是 $0.10001$，但阶码 <code>01000</code> 已经是溢出编码。</p>\n<p>这里没有隐藏位：本题的尾数是补码纯小数，规格化后写成 $0.1xxx$，最高位的 1 是显式存进尾数的；IEEE 754 才是 $1.M$ 形式，把小数点前的 1 隐藏起来。两种格式不要混用。</p>\n</blockquote>"
  },
  {
    "id": "q-auto-coa-1653",
    "year": 2016,
    "no": "13",
    "label": "",
    "subject": "coa",
    "chapter": "coa-2",
    "topics": [
      "coa-2-4"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<pre><code class=\"language-c\">short si = -32767;\nunsigned short usi = si;\n</code></pre>\n<p>执行上述两条语句后，<code>usi</code> 的值为（ ）。</p>",
    "options": [
      "-32767",
      "32767",
      "32768",
      "32769"
    ],
    "answer": "D",
    "analysis": "<p><strong>选 D。</strong></p>\n<p><code>short</code> 是 16 位，$-32767$ 的补码为 $65536-32767=32769$，即 <code>8001H</code>。把它按 <code>unsigned short</code> 解释，值就是 32769。</p>"
  },
  {
    "id": "q-auto-coa-1673",
    "year": 2012,
    "no": "13",
    "label": "",
    "subject": "coa",
    "chapter": "coa-2",
    "topics": [
      "coa-2-4"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>假定编译器规定 <code>int</code> 和 <code>short</code> 型长度分别为 32 位和 16 位，执行：</p>\n<pre><code class=\"language-c\">unsigned short x = 65530;\nunsigned int y = x;\n</code></pre>\n<p>得到 <code>y</code> 的机器数为（ ）。</p>",
    "options": [
      "<code>0000 7FFAH</code>",
      "<code>0000 FFFAH</code>",
      "<code>FFFF 7FFAH</code>",
      "<code>FFFF FFFAH</code>"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B。</strong></p>\n<p><code>x</code> 是 16 位无符号数，$65530=\\text{FFFAH}$；转成 32 位 <code>unsigned int</code> 做零扩展，高 16 位补 0，得到 <code>0000 FFFAH</code>。</p>"
  },
  {
    "id": "q-auto-coa-1695",
    "year": 2024,
    "no": "12",
    "label": "",
    "subject": "coa",
    "chapter": "coa-2",
    "topics": [
      "coa-2-4"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<pre><code class=\"language-c\">int i = 32777;\nshort si = i;\nint j = si;\n</code></pre>\n<p>执行上述代码段后，<code>j</code> 的值是（ ）。</p>",
    "options": [
      "-32777",
      "-32759",
      "32759",
      "32777"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B。</strong></p>\n<p><code>i=32777</code> 超过 16 位 <code>short</code> 的最大值 32767，赋给 <code>si</code> 时截断低 16 位：$32777-65536=-32759$。再把 <code>si</code> 赋给 <code>int</code>，做符号扩展，值仍为 $-32759$。</p>"
  },
  {
    "id": "q-auto-coa-1716",
    "year": 2025,
    "no": "12",
    "label": "",
    "subject": "coa",
    "chapter": "coa-2",
    "topics": [
      "coa-2-4"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>在 32 位计算机上执行：</p>\n<pre><code class=\"language-c\">short si = -32767;\nunsigned int ui = si;\n</code></pre>\n<p><code>ui</code> 的真值为（ ）。</p>",
    "options": [
      "$2^{15}+1$",
      "$2^{15}$",
      "$2^{32}-2^{15}-1$",
      "$2^{32}-2^{15}+1$"
    ],
    "answer": "D",
    "analysis": "<p><strong>选 D。</strong></p>\n<p><code>si=-32767</code> 的 16 位补码是 <code>8001H</code>。转成 32 位 <code>unsigned int</code> 时先符号扩展为 <code>FFFF 8001H</code>，再按无符号数解释：</p>\n<p>$$2^{32}-2^{15}+1=4294934529$$</p>"
  },
  {
    "id": "q-auto-coa-1754",
    "year": 2023,
    "no": "16",
    "label": "",
    "subject": "coa",
    "chapter": "coa-2",
    "topics": [
      "coa-2-1"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>已知 <code>x</code>、<code>y</code> 为 <code>int</code> 类型，当 <code>x=100</code>、<code>y=200</code> 时，执行“x 减 y”指令得到的溢出标志 OF 和借位标志 CF 分别为 0、1；那么当 <code>x=10</code>、<code>y=-20</code> 时，执行该指令得到的 OF 和 CF 分别为（ ）。</p>",
    "options": [
      "OF=0，CF=0",
      "OF=0，CF=1",
      "OF=1，CF=0",
      "OF=1，CF=1"
    ],
    "answer": "B",
    "analysis": "<p><strong>选 B。</strong></p>\n<ul>\n<li><strong>CF 看无符号</strong>：<code>y=-20</code> 在 32 位下是 <code>FFFFFFECH</code>，无符号值很大；$10$ 减它需要借位，所以 CF=1。</li>\n<li><strong>OF 看带符号</strong>：$10-(-20)=30$，在 <code>int</code> 范围内，没有溢出，所以 OF=0。</li>\n</ul>\n<p>对照题目给的第一组：$100-200=-100$ 也没有带符号溢出（OF=0），但无符号 $100&lt;200$ 需要借位（CF=1），与“OF=0、CF=1”一致。</p>"
  },
  {
    "id": "q-auto-coa-1772",
    "year": 2011,
    "no": "17",
    "label": "",
    "subject": "coa",
    "chapter": "coa-2",
    "topics": [
      "coa-2-1"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>某机器有一个标志寄存器，其中有进位/借位标志 CF、零标志 ZF、符号标志 SF 和溢出标志 OF，条件转移指令 bgt（无符号整数比较大于时转移）的转移条件是（ ）。</p>",
    "options": [
      "$\\overline{CF+OF}=1$",
      "$\\overline{SF+ZF}=1$",
      "$\\overline{CF+ZF}=1$",
      "$\\overline{CF+SF}=1$"
    ],
    "answer": "C",
    "analysis": "<p><strong>选 C。</strong></p>\n<p>无符号整数比较 $A&gt;B$ 时，做 $A-B$：没有借位，所以 CF=0；结果不为 0，所以 ZF=0。于是</p>\n<p>$$\\overline{CF+ZF}=\\overline{0+0}=1$$</p>\n<p>所以转移条件是 $\\overline{CF+ZF}=1$，选 C。</p>\n<blockquote>\n<p>原题四个选项的表达式上方都有取反横线；如果漏掉横线，C 就变成“CF 或 ZF 为 1”，那是小于等于的条件，不是大于。</p>\n</blockquote>"
  },
  {
    "id": "q-auto-coa-1801",
    "year": 2020,
    "no": "14",
    "label": "",
    "subject": "coa",
    "chapter": "coa-2",
    "topics": [
      "coa-2-4"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>在按字节编址、采用小端方式的 32 位计算机中，按边界对齐方式为以下 C 语言结构型变量 <code>a</code> 分配存储空间：</p>\n<pre><code class=\"language-c\">struct record {\n    short x1;\n    int x2;\n} a;\n</code></pre>\n<p>若 <code>a</code> 的首地址为 <code>2020 FE00H</code>，<code>a</code> 的成员变量 <code>x2</code> 的机器数为 <code>1234 0000H</code>，则其中 <code>34H</code> 所在存储单元的地址是（ ）。</p>",
    "options": [
      "<code>2020 FE03H</code>",
      "<code>2020 FE04H</code>",
      "<code>2020 FE05H</code>",
      "<code>2020 FE06H</code>"
    ],
    "answer": "D",
    "analysis": "<p><strong>选 D。</strong></p>\n<ul>\n<li><code>x1</code> 是 <code>short</code>，占 2B，放在 <code>2020 FE00H</code>～<code>2020 FE01H</code>；</li>\n<li><code>x2</code> 是 <code>int</code>，4 字节对齐，起始地址不能是 <code>FE02H</code>，补 2B 空洞后从 <code>2020 FE04H</code> 开始；</li>\n<li>小端方式下 <code>1234 0000H</code> 按字节从低地址到高地址是 <code>00H、00H、34H、12H</code>，分别放在 <code>FE04H</code>～<code>FE07H</code>。</li>\n</ul>\n<p>所以 <code>34H</code> 在 <code>2020 FE06H</code>。</p>"
  },
  {
    "id": "q-auto-coa-1829",
    "year": 2019,
    "no": "15",
    "label": "",
    "subject": "coa",
    "chapter": "coa-2",
    "topics": [
      "coa-2-4"
    ],
    "type": "选择",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>某计算机采用大端方式，按字节编址。某指令中操作数的机器数为 <code>1234 FF00H</code>，该操作数采用基址寻址方式，形式地址（用补码表示）为 <code>FF12H</code>，基址寄存器的内容为 <code>F000 0000H</code>，则该操作数的 LSB（最低有效字节）所在的地址是（ ）。</p>",
    "options": [
      "<code>F000 FF12H</code>",
      "<code>F000 FF15H</code>",
      "<code>EFFF FF12H</code>",
      "<code>EFFF FF15H</code>"
    ],
    "answer": "D",
    "analysis": "<p><strong>选 D。</strong></p>\n<p>形式地址 <code>FF12H</code> 是 16 位补码，符号扩展为 32 位是 <code>FFFF FF12H</code>，即 $-238$。有效地址：</p>\n<p>$$\\text{EA}=\\text{F000 0000H}+\\text{FFFF FF12H}=\\text{EFFF FF12H}$$</p>\n<p>大端方式下，最低有效字节 <code>00H</code> 放在最高地址，即 $\\text{EA}+3$：</p>\n<p>$$\\text{EFFF FF12H}+3=\\text{EFFF FF15H}$$</p>"
  },
  {
    "id": "q-auto-coa-2917",
    "year": 2021,
    "no": "44",
    "label": "",
    "subject": "coa",
    "chapter": "coa-3",
    "topics": [
      "coa-3-3"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>假设计算机 M 的主存地址为 24 位，按字节编址；采用分页存储管理方式，虚拟地址为 30 位，页大小为 4KB；TLB 采用 2 路组相联方式和 LRU 替换策略，共 8 组。请回答下列问题。</p>\n<ol>\n<li>虚拟地址中哪几位表示虚页号？哪几位表示页内地址？</li>\n<li>已知访问 TLB 时虚页号高位部分用作 TLB 标记，低位部分用作 TLB 组号，M 的虚拟地址中哪几位是 TLB 标记？哪几位是 TLB 组号？</li>\n</ol>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>1. 虚页号 VA[29:12]（18 位）；页内地址 VA[11:0]（12 位）。</strong></p>\n<p>页大小 $4\\mathrm{KB}=2^{12}$，页内地址 12 位；虚拟地址 30 位，虚页号 $30-12=18$ 位。</p>\n<p><strong>2. TLB 标记 VA[29:15]（15 位）；TLB 组号 VA[14:12]（3 位）。</strong></p>\n<p>TLB 共 8 组，组号 $\\log_2 8=3$ 位，取虚页号的低 3 位；虚页号共 18 位，剩下的高 15 位是 TLB 标记。</p>\n<p>题目虽然提到 LRU，但虚拟地址本身没有功能位，LRU 位是 TLB 表项里的，所以划分虚拟地址时不需要减去 LRU 位。</p>"
  },
  {
    "id": "q-auto-coa-2938",
    "year": 2018,
    "no": "44",
    "label": "",
    "subject": "coa",
    "chapter": "coa-3",
    "topics": [
      "coa-3-3"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>某计算机采用页式虚拟存储管理方式，按字节编址。CPU 进行存储访问的过程如题 44 图所示：</p>\n<p><img alt=\"2018 年第 44 题的 CPU 访存过程：虚拟地址分为 20 位虚页号和 12 位页内地址；TLB 逐项比较标记、有效位和实页号；页表为两级（10 位页目录索引 + 10 位页表索引）；Cache 为 2 路组相联，物理地址分为 20 位标记、3 位组号和 5 位块内地址\" src=\"/408-review/assets/textbook/coa-2018-cache-tlb-figure.webp\" /></p>\n<ol>\n<li>主存物理地址占多少位？</li>\n<li>TLB 采用什么映射方式？TLB 是用 SRAM 还是 DRAM 实现？</li>\n<li>Cache 采用什么映射方式？若 Cache 采用 LRU 替换算法和回写（Write Back）策略，则 Cache 每行中除数据（Data）、Tag 和有效位外，还应有哪些附加位？Cache 的总容量是多少？Cache 中有效位的作用是什么？</li>\n<li>若 CPU 给出的虚拟地址为 <code>0008 C040H</code>，则对应的物理地址是多少？是否在 Cache 中命中？说明理由。若 CPU 给出的虚拟地址为 <code>0007 C260H</code>，则该地址所在主存块映射到的 Cache 组号是多少？</li>\n</ol>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>1. 物理地址 28 位。</strong></p>\n<p>实页号 16 位（TLB 中的实页号是 4 位十六进制数），页内地址 12 位，共 $16+12=28$ 位。</p>\n<p><strong>2. 全相联映射；用 SRAM 实现。</strong></p>\n<p>TLB 的 4 项并行比较，没有组索引，标记就是整个虚页号（20 位），所以是全相联。TLB 和 Cache 一样追求速度，用 SRAM。</p>\n<p><strong>3. 2 路组相联；附加位为修改位（脏位）1 位、LRU 位 1 位；总容量 558B；有效位标记该行是否装有有效主存块。</strong></p>\n<p>路数看 Cache 的结构：图中有左右两路 Tag 阵列和两个比较器，比较结果经多路选择器二选一，所以每组 2 路。</p>\n<p>data 大小看物理地址的低位：Cache 下方标出物理地址划分为 20 位 | 3 位 | 5 位，5 位块内地址说明一个块有 $2^5=32$ 个字节，即每行数据 32B；3 位组号说明有 $2^3=8$ 组，每组 2 路，共 16 行。每行位数：</p>\n<p>$$20\\text{（Tag）}+32\\times8\\text{（数据）}+1\\text{（有效位）}+1\\text{（脏位）}+1\\text{（LRU）}=279\\text{ 位}$$</p>\n<p>$$16\\times279=4464\\text{ 位}=558\\mathrm{B}$$</p>\n<p>有效位用于区分“这一行恰好标记相同”和“这一行根本没装过有效块”，初始时 Cache 内容随机，必须靠有效位判断。</p>\n<p><strong>4. 物理地址 <code>0040040H</code>，不命中；第二个地址的组号是 3。</strong></p>\n<p><code>0008 C040H</code> 的虚页号是 <code>0008CH</code>，页内地址是 <code>040H</code>。TLB 中 <code>0008CH</code> 有效，实页号为 <code>0040H</code>，所以</p>\n<p>$$\\text{PA}=0040\\mathrm{H}\\times 2^{12}+040\\mathrm{H}=0040040\\mathrm{H}$$</p>\n<p>用 PA 查 Cache：组号 $=(0040040\\mathrm{H}\\gg 5)\\bmod 8=2$，标记 $=0040040\\mathrm{H}\\gg 8=00400\\mathrm{H}$。第 2 组中标记 <code>00400H</code> 的那一行有效位为 0，所以不命中。</p>\n<p><code>0007 C260H</code> 的 Cache 组号取物理地址的第 7～5 位。页内地址 12 位，Cache 索引加块内地址 8 位，都落在页内地址里，转换前后不变。取 <code>260H</code> 的第 7～5 位：</p>\n<p>$$(260\\mathrm{H}\\gg 5)\\bmod 8=3$$</p>\n<p>所以组号为 3。</p>"
  },
  {
    "id": "q-auto-coa-2998",
    "year": 2010,
    "no": "44",
    "label": "",
    "subject": "coa",
    "chapter": "coa-3",
    "topics": [
      "coa-3-4"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>主存地址空间 256MB，按字节编址。指令 Cache 与数据 Cache 分离，均有 8 行，行大小 64B，数据 Cache 采用直接映射。<code>int a[256][256]</code> 按行优先存放，首地址 320，<code>int</code> 占 32 位，<code>i</code>、<code>j</code>、<code>sum</code> 在寄存器中：</p>\n<pre><code class=\"language-c\">// 程序 A\nfor (i = 0; i &lt; 256; i++)\n    for (j = 0; j &lt; 256; j++)\n        sum += a[i][j];\n\n// 程序 B\nfor (j = 0; j &lt; 256; j++)\n    for (i = 0; i &lt; 256; i++)\n        sum += a[i][j];\n</code></pre>\n<p>求两个程序的数据访问命中率，并说明哪个执行时间更短。</p>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>A 的命中率 15/16 = 93.75%，B 的命中率 0，A 更快。</strong></p>\n<p>一个块 64B、一个 <code>int</code> 4B，每块装 16 个元素；一行 256 个 <code>int</code> 占 1024B，正好 16 个主存块。</p>\n<p><strong>程序 A（按行）</strong>：<code>a[i][0..15]</code> 在同一个块里，访问 <code>a[i][0]</code> 时缺失并调入整块，接下来的 15 个元素连续命中，到 <code>a[i][16]</code> 才换下一块。每 16 次访问缺 1 次：</p>\n<p>$$H_A=\\frac{15}{16}=93.75\\%$$</p>\n<p><strong>程序 B（按列）</strong>：相邻两次访问 <code>a[i][j]</code> 和 <code>a[i+1][j]</code> 相差 1024B，即跨过 16 个主存块。数据 Cache 只有 8 行，块号相差 16 的两个块对 8 取模相同，映射到同一行，每次访问都把前一行刚调入的块换出去：</p>\n<p>$$H_B=0$$</p>\n<p>A 的访存次数远少于 B，执行时间更短。</p>"
  },
  {
    "id": "q-auto-coa-3034",
    "year": 2020,
    "no": "44",
    "label": "",
    "subject": "coa",
    "chapter": "coa-3",
    "topics": [
      "coa-3-4"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>主存地址 32 位，按字节编址，8 路组相联，直写（Write Through），LRU，主存块 64B，数据区 32KB，开始时 Cache 为空：</p>\n<pre><code class=\"language-c\">for (k = 0; k &lt; 1024; k++)\n    s[k] = 2 * s[k];\n</code></pre>\n<p><code>s</code> 为 <code>int</code>（4B），<code>k</code> 在寄存器中，<code>s</code> 的起始地址为 <code>0080 00C0H</code>，求访问 <code>s</code> 的数据 Cache 缺失次数。</p>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>缺失 64 次。</strong></p>\n<p>题中的 64B 是主存块大小，也就是 Cache 行里的数据块；Cache 行 = 64B 数据块 + Tag + 有效位 + LRU 位等，整行比 64B 大。算块数（行数）时只用数据块大小，只有问 Cache 总容量时，才把标记和控制位加进去。</p>\n<p>先算 Cache 的组数：数据区 $32\\mathrm{KB}$、块 $64\\mathrm{B}$，共 $32\\mathrm{KB}/64\\mathrm{B}=512$ 行；8 路组相联，组数 $=512/8=64$。</p>\n<p><code>s</code> 占 $1024\\times4=4\\mathrm{KB}$，共 $4\\mathrm{KB}/64\\mathrm{B}=64$ 个主存块。起始地址的低 6 位为 0，64 个块连续排列；64 个块对 64 组取模，正好各占一个组，不发生冲突。开始时 Cache 为空，每个块第一次访问都要调入，共缺失 64 次；每块装 16 个 <code>int</code>，调入后块内其余 15 次访问命中。</p>\n<blockquote>\n<p>这里能正好算 64 个块，是因为起始地址 <code>0080 00C0H</code> 的低 6 位为 0、正好落在块边界上。数组的起始地址不一定对齐到主存块：若起点在块中间，首块和末块都只被占一部分，4KB 会跨 65 个块，缺失次数要按实际跨过的块数算。</p>\n</blockquote>"
  },
  {
    "id": "q-auto-coa-3059",
    "year": 2023,
    "no": "43",
    "label": "",
    "subject": "coa",
    "chapter": "coa-3",
    "topics": [
      "coa-3-4"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>32 位计算机，请求分页，虚拟地址 32 位，页大小 4KB；Cache 采用 4 路组相联，主存块 32B，数据区 8KB。<code>int a[24][64]</code> 按行优先存放，<code>int</code> 占 4B，起始虚拟地址 <code>0042 2000H</code>。分别按行、按列执行 <code>a[i][j] = 10</code>，求数组共占多少主存块，以及两种访问方式的 Cache 命中率。</p>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>数组占 192 块；按行、按列的命中率都是 87.5%。</strong></p>\n<p>数组大小 $24\\times64\\times4=6144$ 字节，每块 32B，占 $6144/32=192$ 块；每块装 $32/4=8$ 个 <code>int</code>。Cache 共 $8\\mathrm{K}/32=256$ 行，4 路 → 64 组。</p>\n<p><strong>按行访问</strong>：一块里的 8 个元素连续访问，首元素缺失、其余 7 次命中：</p>\n<p>$$H=\\frac{7}{8}=87.5\\%$$</p>\n<p><strong>按列访问</strong>：相邻两行同一列相差 256B，即相差 8 个主存块。第 <code>i</code> 行的块号是“起点 $+8i$”，$8i$ 对 64 取模只有 8 种结果，24 个块只落在 8 个组里，每组 3 块。4 路组相联每组能放 4 块，这 3 块可以同时驻留；每个块装的是同一行连续的 8 个 <code>j</code>，后续 7 次列访问都命中：</p>\n<p>$$H=\\frac{7}{8}=87.5\\%$$</p>"
  },
  {
    "id": "q-auto-coa-3089",
    "year": 2020,
    "no": "44",
    "label": "",
    "subject": "coa",
    "chapter": "coa-3",
    "topics": [
      "coa-3-4"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>主存地址 32 位，按字节编址，指令 Cache 和数据 Cache 与主存之间均采用 8 路组相联、直写（Write Through）和 LRU 替换，主存块 64B，数据区容量各 32KB，开始时 Cache 均为空。</p>\n<ol>\n<li>Cache 每一行中 Tag、LRU 位各占几位？是否有修改位？</li>\n<li><code>for (k = 0; k &lt; 1024; k++) s[k] = 2 * s[k];</code> 中，<code>s</code> 为 <code>int</code>（4B），<code>k</code> 在寄存器中，<code>s</code> 的起始地址为 <code>0080 00C0H</code>，求访问 <code>s</code> 的数据 Cache 缺失次数。</li>\n<li>若 CPU 最先的访问是读取主存单元 <code>0001 0003H</code> 中的指令，简述从 Cache 中访问该指令的过程，包括缺失处理。</li>\n</ol>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>1. Tag 20 位，LRU 3 位，没有修改位。</strong></p>\n<p>$32\\mathrm{K}/64=512$ 行，8 路 → $512/8=64$ 组，组号 6 位；块内地址 $\\log_2 64=6$ 位。于是</p>\n<p>$$\\text{Tag}=32-6-6=20\\text{ 位}$$</p>\n<p>LRU 需区分组内 8 行的新旧，$\\log_2 8=3$ 位。写策略是直写，Cache 与主存始终一致，不需要脏位。</p>\n<p><strong>2. 缺失 64 次。</strong>（过程见题型2 第 2 问。）</p>\n<p><strong>3. 取指过程。</strong></p>\n<p><code>0001 0003H</code> 按 Cache 字段拆开：</p>\n<table>\n<thead>\n<tr>\n<th>字段</th>\n<th>位数</th>\n<th>该地址的值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Tag</td>\n<td>20</td>\n<td><code>00010H</code></td>\n</tr>\n<tr>\n<td>组号</td>\n<td>6</td>\n<td><code>00H</code></td>\n</tr>\n<tr>\n<td>块内地址</td>\n<td>6</td>\n<td><code>03H</code></td>\n</tr>\n</tbody>\n</table>\n<p>按组号 0 找到指令 Cache 的第 0 组，比较组内 8 行的有效位和 Tag。开始时 Cache 为空，有效位全为 0，判定缺失。于是选一个空闲行（若组已满则按 LRU 选一行；指令 Cache 只读，没有脏位，不需要写回），从主存地址 <code>0001 0000H</code> 开始读出一个 64B 主存块写入该行数据区，并置 Tag 为 <code>00010H</code>、有效位为 1。最后按块内地址 <code>03H</code> 从该行取出指令送 CPU。之后再访问这一块就能直接命中。</p>"
  },
  {
    "id": "q-auto-coa-3148",
    "year": 2011,
    "no": "44",
    "label": "",
    "subject": "coa",
    "chapter": "coa-3",
    "topics": [
      "coa-3-5"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p><img alt=\"2011 年第 44 题：虚拟地址空间 16MB、主存 1MB、页大小 4KB，Cache 直接映射 8 行、块 32B；题中给出页表、Cache 和 TLB 的部分内容，要求求地址位数、Cache 字段、物理地址与命中情况，以及 TLB 查询\" src=\"/408-review/assets/textbook/coa-2011-44-question.webp\" /></p>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>1. 虚拟地址 24 位，虚页号 12 位；物理地址 20 位，页框号 8 位。</strong></p>\n<p>$16\\mathrm{MB}=2^{24}$，$1\\mathrm{MB}=2^{20}$，页大小 $4\\mathrm{KB}=2^{12}$，所以</p>\n<p>$$\\text{虚页号}=24-12=12\\text{ 位（第 23～12 位）}$$</p>\n<p>$$\\text{页框号}=20-12=8\\text{ 位（第 19～12 位）}$$</p>\n<p><strong>2. 标记 12 位、组号 3 位、块内地址 5 位。</strong></p>\n<p>Cache 共 8 行，直接映射 → 行号（组号）$\\log_2 8=3$ 位（第 7～5 位）；块 32B → 块内地址 5 位（第 4～0 位）；剩下的标记</p>\n<p>$$20-3-5=12\\text{ 位（第 19～8 位）}$$</p>\n<p><strong>3. 页面在主存，物理地址 <code>04C60H</code>，Cache 不命中。</strong></p>\n<p><code>001C60H</code> 的低 12 位是页内偏移 <code>C60H</code>，高 12 位是虚页号 <code>001H</code>。查页表，虚页 1 的有效位为 1，页框号为 <code>04H</code>，所以</p>\n<p>$$\\text{PA}=04\\mathrm{H}\\times 2^{12}+\\mathrm{C60H}=04\\mathrm{C60H}$$</p>\n<p>用 <code>04C60H</code> 查 Cache：组号 $=(04\\mathrm{C60H}\\gg 5)\\bmod 8=3$，标记 $=04\\mathrm{C60H}\\gg 8=04\\mathrm{CH}$。Cache 第 3 行有效，但标记是 <code>105H</code>，与 <code>04CH</code> 不同，因此不命中。</p>\n<p><strong>4. 页面在主存。</strong></p>\n<p><code>024BACH</code> 的虚页号是 <code>024H</code>，页内偏移是 <code>BACH</code>。TLB 共 8 项、4 路 → 2 组，组号取虚页号的最低位：</p>\n<p>$$\\text{组号}=024\\mathrm{H}\\bmod 2=0,\\qquad \\text{TLB 标记}=024\\mathrm{H}\\gg 1=012\\mathrm{H}$$</p>\n<p>组 0 中存在有效项，标记恰好是 <code>012H</code>，所以 TLB 命中，页框号为 <code>1FH</code>，该页在主存（物理地址为 <code>1F BACH</code>）。</p>"
  },
  {
    "id": "q-auto-coa-3194",
    "year": 2025,
    "no": "43",
    "label": "",
    "subject": "coa",
    "chapter": "coa-3",
    "topics": [
      "coa-3-5"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>计算机 M 字长 32 位，按字节编址。数据 Cache 数据区 32KB，8 路组相联，主存块 64B；Cache 命中时间 2 个时钟周期，缺失损失 200 个时钟周期。M 采用页式虚拟存储，页面大小 4KB。数组 <code>d</code> 的起始地址为 <code>0180 0020H</code>：</p>\n<pre><code class=\"language-c\">int x, d[2048], i;\nfor (i = 0; i &lt; 2048; i++)\n    d[i] = d[i] / x;\n</code></pre>\n<ol>\n<li>主存地址中的 Cache 组号、块内地址各占几位？虚拟地址 VA 中哪些位可以作为 Cache 索引？</li>\n<li><code>d[100]</code> 的虚拟地址是多少？所在主存块对应的 Cache 组号是多少？</li>\n<li>设代码已在 Cache 中，<code>i</code>、<code>x</code> 已装入内存但不在 Cache 中。<code>d[0]</code> 在其主存块内的偏移量是多少？执行 <code>for</code> 循环时访问 <code>d</code> 的 Cache 缺失率和数组元素的平均访问时间各是多少？</li>\n<li><code>d</code> 分布在几个页中？若代码已在主存、<code>d</code> 不在主存，执行 <code>for</code> 循环时访问 <code>d</code> 引起的缺页次数是多少？</li>\n</ol>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>1. 组号 6 位，块内地址 6 位；VA 的第 11～6 位可作索引。</strong></p>\n<p>数据区 $32\\mathrm{KB}$、块 $64\\mathrm{B}$，共 $32\\mathrm{K}/64=512$ 行；8 路 → $512/8=64$ 组，组号 $\\log_2 64=6$ 位，块内地址 $\\log_2 64=6$ 位。</p>\n<p>页大小 4KB → 页内偏移 12 位。Cache 索引加块内地址正好 $6+6=12$ 位，全部落在页内偏移里，所以虚拟地址的第 11～6 位可以直接当索引。</p>\n<p><strong>2. <code>d[100]</code> 的虚拟地址是 <code>0180 01B0H</code>，组号是 6。</strong></p>\n<p>$$0180\\,0020\\mathrm{H}+100\\times4=0180\\,01\\mathrm{B0H}$$</p>\n<p>组号取地址的第 11～6 位：<code>1B0H</code> 的二进制为 <code>0001 1011 0000</code>，中间 6 位是 <code>000110</code>，即 6。</p>\n<p><strong>3. 偏移量 32B；缺失率 6.30%，平均访问时间 14.60 个时钟周期。</strong></p>\n<p>起始地址低 6 位是 <code>100000B</code>，即 32，所以 <code>d[0]</code> 在块内偏移 32B 处。</p>\n<p>数组 8KB，从偏移 32B 处开始，跨过 129 个主存块：首块放 8 个元素，中间 127 块各放 16 个，末块放 8 个。Cache 有 64 组、8 路，129 个块中每组最多 3 块，不会冲突，每个块只需调入一次：</p>\n<p>$$\\text{缺失率}=\\frac{129}{2048}=6.30\\%$$</p>\n<p>$$T_a=2+6.30\\%\\times200=14.60\\text{ 个时钟周期}$$</p>\n<p><strong>4. <code>d</code> 分布在 3 个页中，缺页 3 次。</strong></p>\n<p><code>d</code> 的地址范围是 <code>0180 0020H</code>～<code>0180 201FH</code>：第一页 <code>0180 0000H</code>～<code>0180 0FFFH</code>，第二页 <code>0180 1000H</code>～<code>0180 1FFFH</code>，末尾 32 字节落在第三页 <code>0180 2000H</code> 起。顺序访问时每页第一次访问触发一次缺页，共 3 次。</p>"
  },
  {
    "id": "q-auto-coa-3257",
    "year": 2013,
    "no": "43",
    "label": "",
    "subject": "coa",
    "chapter": "coa-3",
    "topics": [
      "coa-3-4"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>某 32 位计算机，CPU 主频 800MHz，Cache 命中时 CPI 为 4，Cache 块大小 32B。主存采用 8 体交叉存储，每个体的存储字长 32 位，存储周期 40ns；存储器总线宽度 32 位，总线时钟频率 200MHz，支持突发传送。每次读突发传送总线事务包括送首地址和命令、存储器准备数据、传送数据；每次突发传送 32B，传送地址或 32 位数据均需要一个总线时钟周期。</p>\n<ol>\n<li>CPU 和总线的时钟周期各是多少？总线带宽是多少？</li>\n<li>Cache 缺失时，需要几个读突发传送总线事务来完成一个主存块的读取？</li>\n<li>存储器总线完成一次读突发传送总线事务需要多少时间？</li>\n<li>程序 BP 共执行 100 条指令，平均每条指令访存 1.2 次，Cache 缺失率 5%，不考虑替换等开销，BP 的 CPU 执行时间是多少？</li>\n</ol>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>1. CPU 周期 1.25ns，总线周期 5ns，带宽 800MB/s。</strong></p>\n<p>$$T_{\\text{CPU}}=\\frac{1}{800\\mathrm{MHz}}=1.25\\,\\mathrm{ns},\\qquad T_{\\text{bus}}=\\frac{1}{200\\mathrm{MHz}}=5\\,\\mathrm{ns}$$</p>\n<p>总线每个时钟传 32 位，即 4B：</p>\n<p>$$\\text{带宽}=\\frac{4\\mathrm{B}}{5\\,\\mathrm{ns}}=800\\,\\mathrm{MB/s}$$</p>\n<p><strong>2. 1 个突发事务。</strong></p>\n<p>突发传送是“只送一次首地址和命令，随后连续传送一串地址相邻的数据”，地址由存储器内部自动递增，不必每个字都重新送地址。本题一次突发传送 32B，总线宽度 32 位（4B），即一次事务连续传 $32/4=8$ 个数据，正好覆盖一个 32B 的主存块，所以取一个块只需 1 个事务。</p>\n<p><strong>什么时候用。</strong> 搬一整段连续数据时才会用，典型场景是 Cache 缺失后调入一个主存块、DMA 成块搬运外设数据、磁盘按块读写主存。只读一个孤立的字、或地址不连续时，按普通单字传送算。</p>\n<p><strong>怎么判断。</strong> 看三点：①要搬的数据是连续的一整块；②题目明确“支持突发传送”或给出突发长度；③数据量是总线宽度的整数倍。本题三条都满足：Cache 缺块，32B 连续，每次突发 32B（即 8 个 32 位字），所以一个块只需一次事务。</p>\n<p><strong>3. 85ns。</strong></p>\n<p>准备数据和传送数据是重叠的，画成体-时间图：</p>\n<p><img alt=\"8 体交叉、突发传送的体-时间图：体0 在 5ns 启动，之后每隔 5ns 启动下一个体，体7 在 40ns 启动；体0 在 45ns 准备好第一个字，总线每隔 5ns 传送一个 32 位字；体7 在 80ns 准备好，最后一个字 80～85ns 传完\" src=\"/408-review/assets/textbook/coa-bank-time-diagram.webp\" /></p>\n<ul>\n<li>0～5ns：送首地址和命令；</li>\n<li>体 0 在 5ns 启动，之后每隔 5ns 启动下一个体，体 7 在 $5+7\\times5=40\\mathrm{ns}$ 启动；</li>\n<li>每个体的存取周期是 40ns，体 0 在 $5+40=45\\mathrm{ns}$ 准备好第一个字，总线从 45ns 起每隔 5ns 传送一个 32 位字；</li>\n<li>体 7 在 $40+40=80\\mathrm{ns}$ 准备好，最后一个字在 80～85ns 传完。</li>\n</ul>\n<p>$$5+(8-1)\\times5+40+5=85\\,\\mathrm{ns}$$</p>\n<p><strong>4. 1010ns。</strong></p>\n<p>$$100\\times4\\times1.25=500\\,\\mathrm{ns}$$</p>\n<p>CPI = 4 是 Cache 命中时的 CPI，取指和 1.2 次访存在命中情况下的时间已经包含在这 500ns 里；1.2 只用来数访存次数、求缺失次数，不能再乘一次命中时间。</p>\n<p>访存 $100\\times1.2=120$ 次，缺失 $120\\times5\\%=6$ 次：</p>\n<p>$$6\\times85=510\\,\\mathrm{ns}$$</p>\n<p>$$T_{\\text{CPU}}=500+510=1010\\,\\mathrm{ns}$$</p>"
  },
  {
    "id": "q-auto-coa-4068",
    "year": 2010,
    "no": "43",
    "label": "",
    "subject": "coa",
    "chapter": "coa-4",
    "topics": [
      "coa-4-2"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>某计算机字长为 16 位，主存地址空间大小为 128KB，按字编址。采用单字长指令格式，指令各字段定义如下表所示（Ms/Rs 描述源操作数，Md/Rd 描述目的操作数）：</p>\n<table>\n<thead>\n<tr>\n<th>字段</th>\n<th>OP</th>\n<th>Ms</th>\n<th>Rs</th>\n<th>Md</th>\n<th>Rd</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>位数</td>\n<td>4</td>\n<td>3</td>\n<td>3</td>\n<td>3</td>\n<td>3</td>\n</tr>\n<tr>\n<td>位置</td>\n<td>15～12</td>\n<td>11～9</td>\n<td>8～6</td>\n<td>5～3</td>\n<td>2～0</td>\n</tr>\n</tbody>\n</table>\n<p>转移指令采用相对寻址方式，相对偏移量用补码表示，寻址方式定义见下表：</p>\n<table>\n<thead>\n<tr>\n<th>Ms/Md</th>\n<th>寻址方式</th>\n<th>助记符</th>\n<th>含义</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>000B</code></td>\n<td>寄存器直接</td>\n<td><code>Rn</code></td>\n<td>操作数 = (Rn)</td>\n</tr>\n<tr>\n<td><code>001B</code></td>\n<td>寄存器间接</td>\n<td><code>(Rn)</code></td>\n<td>操作数 = ((Rn))</td>\n</tr>\n<tr>\n<td><code>010B</code></td>\n<td>寄存器间接、自增</td>\n<td><code>(Rn)+</code></td>\n<td>操作数 = ((Rn))，(Rn)+1 → Rn</td>\n</tr>\n<tr>\n<td><code>011B</code></td>\n<td>相对</td>\n<td><code>D(Rn)</code></td>\n<td>转移目标地址 = (PC) + (Rn)</td>\n</tr>\n</tbody>\n</table>\n<p>注：(X) 表示存储器地址 X 或寄存器 X 的内容。</p>\n<p>请回答：</p>\n<ol>\n<li>该指令系统最多可有多少条指令？该计算机最多可有多少个通用寄存器？存储器地址寄存器（MAR）和存储器数据寄存器（MDR）至少各需要多少位？</li>\n<li>（原题第 2 问，转移指令的目标地址范围，从略。）</li>\n<li>若操作码 <code>0010B</code> 表示加法操作（助记符为 <code>add</code>），寄存器 R4 和 R5 的编号分别为 <code>100B</code> 和 <code>101B</code>，R4 的内容为 <code>1234H</code>，R5 的内容为 <code>5678H</code>，地址 <code>1234H</code> 中的内容为 <code>5678H</code>，地址 <code>5678H</code> 中的内容为 <code>1234H</code>，则汇编语言为 <code>add (R4), (R5)+</code>（逗号前为源操作数，逗号后为目的操作数）对应的机器码是什么（用十六进制表示）？该指令执行后，哪些寄存器和存储单元中的内容会改变？改变后的内容是什么？</li>\n</ol>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>（1）</strong> OP 占 4 位，最多 $2^4=16$ 条指令；Rs、Rd 各占 3 位，最多 $2^3=8$ 个通用寄存器。按字编址时，地址空间 128KB 合 $128\\mathrm{KB}\\div2\\mathrm{B}=64\\mathrm{K}$ 个字 $=2^{16}$ 个字，所以 MAR 至少 16 位；MDR 要能存下一个字，至少 16 位。</p>\n<p><strong>（3）</strong> 先按字段拆开 <code>add (R4), (R5)+</code>：</p>\n<table>\n<thead>\n<tr>\n<th>字段</th>\n<th>值</th>\n<th>依据</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>OP</td>\n<td><code>0010</code></td>\n<td>add</td>\n</tr>\n<tr>\n<td>Ms</td>\n<td><code>001</code></td>\n<td>源操作数 (R4) 是寄存器间接</td>\n</tr>\n<tr>\n<td>Rs</td>\n<td><code>100</code></td>\n<td>R4</td>\n</tr>\n<tr>\n<td>Md</td>\n<td><code>010</code></td>\n<td>目的操作数 (R5)+ 是寄存器间接、自增</td>\n</tr>\n<tr>\n<td>Rd</td>\n<td><code>101</code></td>\n<td>R5</td>\n</tr>\n</tbody>\n</table>\n<p>拼起来是 <code>0010 001 100 010 101B</code>，即 <strong><code>2315H</code></strong>。</p>\n<p>指令执行过程：</p>\n<ul>\n<li>源操作数 <code>(R4)</code>：寄存器间接，操作数为 $\\mathrm{M}[1234\\mathrm{H}]=5678\\mathrm{H}$；</li>\n<li>目的操作数 <code>(R5)+</code>：先读出 $\\mathrm{M}[5678\\mathrm{H}]=1234\\mathrm{H}$，再令 R5 加 1，R5 变为 <code>5679H</code>；</li>\n<li>相加：$5678\\mathrm{H}+1234\\mathrm{H}=68\\mathrm{ACH}$，写回目的操作数所在的存储单元，即 $\\mathrm{M}[5678\\mathrm{H}]=68\\mathrm{ACH}$。</li>\n</ul>\n<p>所以执行后，R5 的内容变为 <code>5679H</code>，存储单元 <code>5678H</code> 的内容变为 <code>68ACH</code>；R4 仍为 <code>1234H</code>，存储单元 <code>1234H</code> 仍为 <code>5678H</code>。</p>\n<p><strong>这个自增到底怎么发生的。</strong> 把 <code>(R5)+</code> 拆成三个问题看：</p>\n<blockquote>\n<ul>\n<li><strong>什么时候自增</strong>：在按 (R5) 读出目的操作数之后、本次访存结束时自增，也就是「取完操作数就 +1」。它和 add 的加法本身无关——哪怕把 add 换成只读操作数的 cmp，只要操作数用 <code>(Rn)+</code>，取完操作数照样自增。</li>\n<li><strong>自增的是谁</strong>：是目的操作数寻址方式里的 Rn，也就是 Rd 字段选中的 R5。源操作数 <code>(R4)</code> 的寻址方式是寄存器间接、不带自增，所以 R4 不变。</li>\n<li><strong>结果保存在哪</strong>：加法的结果 <code>68ACH</code> 写到自增前的地址 <code>5678H</code>；自增的结果 <code>5679H</code> 写回 R5。写回目的操作数用的是取操作数时已经算出的旧地址，不会因为 R5 刚加过 1 就写到 <code>5679H</code>。</li>\n</ul>\n</blockquote>\n<p>还有两点容易混：自增改的是<strong>寄存器里的地址</strong>，不是把存储单元的内容加 1；自增的对象是<strong>寄存器 R5</strong>，不是存储单元 <code>5678H</code>。按字编址时一个地址就是一个字（16 位），「指向下一个字」就是 +1；若按字节编址且操作数占 2 字节，才需要 +2。</p>"
  },
  {
    "id": "q-auto-coa-4128",
    "year": 2013,
    "no": "44",
    "label": "",
    "subject": "coa",
    "chapter": "coa-4",
    "topics": [
      "coa-4-2"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>某计算机采用 16 位定长指令字格式，CPU 中有一个标志寄存器，其中包含进位/借位标志 CF、零标志 ZF 和符号标志 NF。假定为该机设计了条件转移指令，其格式如下：</p>\n<table>\n<thead>\n<tr>\n<th>字段</th>\n<th>OP</th>\n<th>C</th>\n<th>Z</th>\n<th>N</th>\n<th>OFFSET</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>位数</td>\n<td>5</td>\n<td>1</td>\n<td>1</td>\n<td>1</td>\n<td>8</td>\n</tr>\n<tr>\n<td>位置</td>\n<td>15～11</td>\n<td>10</td>\n<td>9</td>\n<td>8</td>\n<td>7～0</td>\n</tr>\n</tbody>\n</table>\n<p>其中，<code>00000</code> 为操作码 OP；C、Z 和 N 分别为 CF、ZF 和 NF 的对应检测位，某检测位为 1 时表示需检测对应标志位，需检测的标志位中只要有一个为 1 就转移，否则不转移。例如，若 C=1、Z=0、N=1，则需检测 CF 和 NF 的值，当 CF=1 或 NF=1 时发生转移；OFFSET 是相对偏移量，用补码表示。转移执行时，转移目标地址为 (PC)+2+2×OFFSET；顺序执行时，下条指令地址为 (PC)+2。请回答下列问题。</p>\n<ol>\n<li>该计算机存储器按字节编址还是按字编址？该条件转移指令向后（反向）最多可跳转多少条指令？</li>\n<li>某条件转移指令的地址为 <code>200CH</code>，指令内容为 <code>00000 0 1 1 11100011</code>，若该指令执行时 CF=0、ZF=0、NF=1，则该指令执行后 PC 的值是多少？若该指令执行时 CF=1、ZF=0、NF=0，则 PC 的值又是多少？请给出计算过程。</li>\n<li>实现“无符号数比较小于等于时转移”功能的指令中，C、Z 和 N 应各是什么？</li>\n<li>以下是该指令对应的数据通路示意图，要求给出图中部件①～③的名称或功能说明。</li>\n</ol>\n<p><img alt=\"条件转移指令的数据通路示意图，图中 ①～③ 待填\" src=\"/408-review/assets/textbook/coa-branch-datapath.webp\" /></p>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>（1）按字节编址；向后最多 128 条指令。</strong></p>\n<p>指令字长 16 位，即 2 字节。顺序执行时下条指令地址是 (PC)+2，说明 PC 每取一条指令加 2 个编址单位，编址单位是字节；若按字编址（字长 16 位），下条指令地址应当是 (PC)+1。</p>\n<p>OFFSET 是 8 位补码，范围 $-128\\sim+127$。公式里乘 2，是因为 OFFSET 以指令条数为单位、每条指令 2 字节；取最小值 $-128$，从自增后的 PC 往回最多跨过 128 条指令。</p>\n<p><strong>（2）</strong> 先拆指令字：C=0、Z=1、N=1、OFFSET=<code>11100011B</code>。OFFSET 按 8 位补码解释，<code>11100011B</code> $=256-227=-29$。</p>\n<ul>\n<li>CF=0、ZF=0、NF=1：C=0 不检测 CF；Z=1 检测 ZF=0；N=1 检测 NF=1。检测的标志位中有一个为 1，<strong>转移</strong>。取指后 PC 先自增为 <code>200EH</code>，再加偏移：</li>\n</ul>\n<p>$$200\\mathrm{EH}+2\\times(-29)=200\\mathrm{EH}-58=1\\mathrm{FD}4\\mathrm{H}$$</p>\n<p>所以执行后 PC = <strong><code>1FD4H</code></strong>。</p>\n<ul>\n<li>CF=1、ZF=0、NF=0：C=0，CF 虽然为 1 也不检测；Z=1 检测 ZF=0，N=1 检测 NF=0，两个都为 0，<strong>不转移</strong>。PC 顺序加 2，执行后 PC = <strong><code>200EH</code></strong>。</li>\n</ul>\n<blockquote>\n<p><strong>转移地址的算法：PC 先自增，再叠偏移。</strong> 取指结束时 PC 已经变成 (PC)+2，指向顺序执行的下一条指令；转移目标是在这个自增后的 PC 上再加 2×OFFSET，所以公式写成 (PC)+2+2×OFFSET。做题时先写出 PC+2（本题为 <code>200EH</code>），再叠加 2×OFFSET；漏掉 +2 就会少算一条指令，把 <code>1FD4H</code> 错算成 <code>1FD2H</code>。</p>\n</blockquote>\n<p><strong>（3）C=1、Z=1、N=0。</strong></p>\n<p>无符号数比较 $A\\le B$ 用 $A-B$ 判断：$A&lt;B$ 时有借位，CF=1；$A=B$ 时 ZF=1。所以“小于等于”就是 CF=1 或 ZF=1，C、Z 都要置 1；无符号比较不看符号，N 置 0（若置 1，NF=1 时会误转移）。</p>\n<p><strong>（4）① 指令寄存器（IR）；② 移位器（左移一位）；③ 加法器。</strong></p>\n<ul>\n<li>① 指令寄存器：暂存当前指令，分出 OP、C、Z、N、OFFSET 五个字段；</li>\n<li>② 移位器：把符号扩展后的 OFFSET 左移一位，得到 2×OFFSET；</li>\n<li>③ 加法器：把 (PC)+2 与 2×OFFSET 相加，得到转移目标地址。</li>\n</ul>\n<p>C、Z、N 分别与 CF、ZF、NF 相与，三个与门的输出再或起来，作为多路选择器的控制信号：条件成立时选 ③ 送来的转移目标，条件不成立时选 (PC)+2，最后写回 PC。</p>"
  },
  {
    "id": "q-auto-coa-4180",
    "year": 2014,
    "no": "44",
    "label": "",
    "subject": "coa",
    "chapter": "coa-4",
    "topics": [
      "coa-4-2"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>某程序中有如下循环代码段 P：</p>\n<pre><code class=\"language-c\">for (int i = 0; i &lt; N; i++) sum += A[i];\n</code></pre>\n<p>假设编译时变量 sum 和 i 分别分配在寄存器 R1 和 R2 中，常量 N 在寄存器 R6 中，数组 A 的首地址在寄存器 R3 中。程序段 P 起始地址为 <code>08048100H</code>，对应的汇编代码和机器代码如下表所示。</p>\n<table>\n<thead>\n<tr>\n<th>编号</th>\n<th>地址</th>\n<th>机器代码</th>\n<th>汇编代码</th>\n<th>注释</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td><code>08048100H</code></td>\n<td><code>00022080H</code></td>\n<td><code>loop: sll R4, R2, 2</code></td>\n<td>(R2) 左移 2 位 → R4</td>\n</tr>\n<tr>\n<td>2</td>\n<td><code>08048104H</code></td>\n<td><code>00083020H</code></td>\n<td><code>add R4, R4, R3</code></td>\n<td>(R4)+(R3) → R4</td>\n</tr>\n<tr>\n<td>3</td>\n<td><code>08048108H</code></td>\n<td><code>8C850000H</code></td>\n<td><code>load R5, 0(R4)</code></td>\n<td>((R4)+0) → R5</td>\n</tr>\n<tr>\n<td>4</td>\n<td><code>0804810CH</code></td>\n<td><code>00250820H</code></td>\n<td><code>add R1, R1, R5</code></td>\n<td>(R1)+(R5) → R1</td>\n</tr>\n<tr>\n<td>5</td>\n<td><code>08048110H</code></td>\n<td><code>20420001H</code></td>\n<td><code>add R2, R2, 1</code></td>\n<td>(R2)+1 → R2</td>\n</tr>\n<tr>\n<td>6</td>\n<td><code>08048114H</code></td>\n<td><code>1446FFFAH</code></td>\n<td><code>bne R2, R6, loop</code></td>\n<td>if((R2)≠(R6)) goto loop</td>\n</tr>\n</tbody>\n</table>\n<p>执行上述代码的计算机 M 采用 32 位定长指令字，其中分支指令 bne 采用如下格式：</p>\n<table>\n<thead>\n<tr>\n<th>字段</th>\n<th>OP</th>\n<th>Rs</th>\n<th>Rd</th>\n<th>OFFSET</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>位置</td>\n<td>31～26</td>\n<td>25～21</td>\n<td>20～16</td>\n<td>15～0</td>\n</tr>\n<tr>\n<td>位数</td>\n<td>6</td>\n<td>5</td>\n<td>5</td>\n<td>16</td>\n</tr>\n</tbody>\n</table>\n<p>OP 为操作码；Rs 和 Rd 为寄存器编号；OFFSET 为偏移量，用补码表示。请回答下列问题，并说明理由。</p>\n<ol>\n<li>M 的存储器编址单位是什么？</li>\n<li>已知 <code>sll</code> 指令实现左移功能，数组 A 中每个元素占多少位？</li>\n<li>表中 bne 指令的 OFFSET 字段的值是多少？已知 bne 指令采用相对寻址方式，当前 PC 内容为 bne 指令地址，通过分析表中指令地址和 bne 指令内容，推断出 bne 指令的转移目标地址计算公式。</li>\n<li>若 M 采用如下“按序发射、按序完成”的 5 级指令流水线：IF（取指）、ID（译码及取数）、EXE（执行）、MEM（访存）、WB（写回寄存器），且硬件不采取任何转发措施，分支指令的执行均引起 3 个时钟周期的阻塞，则 P 中哪些指令的执行会由于数据相关而发生流水线阻塞？哪条指令的执行会发生控制冒险？为什么指令 1 的执行不会因为与指令 5 的数据相关而发生阻塞？</li>\n</ol>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>（1）按字节编址。</strong> 指令长 32 位，即 4 字节；表中相邻指令的地址差都是 4（<code>08048100H</code>→<code>104H</code>→<code>108H</code>…），说明一个地址对应 1 字节。</p>\n<p><strong>（2）32 位（4 字节）。</strong> <code>sll R4, R2, 2</code> 把下标 i 左移 2 位，相当于乘 4；而 A[i] 的地址 = A 首地址 + i × 元素大小，所以元素大小 = 4B = 32 位。</p>\n<p><strong>（3）OFFSET = -6，即 <code>FFFAH</code>；转移目标地址 = (PC) + 4 + 4×OFFSET（PC 为 bne 指令地址）。</strong></p>\n<p>先把 <code>1446FFFAH</code> 拆成字段：</p>\n<table>\n<thead>\n<tr>\n<th>字段</th>\n<th>值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>OP</td>\n<td><code>000101B</code> = 5</td>\n</tr>\n<tr>\n<td>Rs</td>\n<td><code>00010B</code> = 2（R2）</td>\n</tr>\n<tr>\n<td>Rd</td>\n<td><code>00110B</code> = 6（R6）</td>\n</tr>\n<tr>\n<td>OFFSET</td>\n<td><code>FFFAH</code></td>\n</tr>\n</tbody>\n</table>\n<p><code>FFFAH</code> 按 16 位补码解释：$65530-65536=-6$。验证：bne 在 <code>08048114H</code>，目标 loop 在 <code>08048100H</code>，</p>\n<p>$$08048114\\mathrm{H}+4+4\\times(-6)=08048118\\mathrm{H}-24=08048100\\mathrm{H}$$</p>\n<p>正好回到 loop。等价写法：目标地址 = (PC+4) + 4×OFFSET，其中 PC+4 是 bne 的下一条指令地址。</p>\n<p><strong>（4）因数据相关阻塞的指令是 2、3、4、6；控制冒险发生在指令 6（bne）。</strong></p>\n<table>\n<thead>\n<tr>\n<th>指令</th>\n<th>依赖</th>\n<th>类型</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>2</td>\n<td>读 R4（1 写 R4）</td>\n<td>RAW</td>\n</tr>\n<tr>\n<td>3</td>\n<td>读 R4（2 写 R4）</td>\n<td>RAW</td>\n</tr>\n<tr>\n<td>4</td>\n<td>读 R5（3 写 R5）</td>\n<td>RAW，且是 load-use</td>\n</tr>\n<tr>\n<td>6</td>\n<td>读 R2（5 写 R2）</td>\n<td>RAW</td>\n</tr>\n</tbody>\n</table>\n<p>没有转发时，消费者要等生产者 WB 写回后才能读，所以这四条都要停。指令 6 本身是分支，条件/目标确定前继续取指可能取错，属于控制冒险；分支还会让后续取指停 3 个周期。</p>\n<p>指令 1 不会因为与指令 5 的相关而停：指令 1 读 R2、指令 5 写 R2。就同一轮看，这是反相关（WAR），指令 1 的读在指令 5 的写之前，不用等；就下一轮看，指令 1 虽然要读指令 5 写回的 R2，但两者之间隔着指令 6 和分支的 3 拍阻塞，等下一轮指令 1 到 ID 时，指令 5 早已写回，也不会停。</p>"
  },
  {
    "id": "q-auto-coa-4251",
    "year": 2017,
    "no": "44",
    "label": "",
    "subject": "coa",
    "chapter": "coa-4",
    "topics": [
      "coa-4-2"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>在按字节编址的计算机 M 上，题 43 中 f1 的部分源程序与对应的机器级代码（包括指令的虚拟地址）如下表所示。f1、f2 来自前面的 2017-43：f1 用 <code>int</code> 计算 $f(n)$，f2 把 f1 中的 <code>int</code> 都换成 <code>float</code>。</p>\n<pre><code class=\"language-c\">int f1(unsigned n) {\n    ...\n    for (unsigned i = 0; i &lt;= n - 1; i++) {\n        ...\n        power *= 2;\n        ...\n    }\n    ...\n    return sum;\n}\n</code></pre>\n<table>\n<thead>\n<tr>\n<th>行号</th>\n<th>虚拟地址</th>\n<th>机器码</th>\n<th>汇编指令</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td><code>00401020H</code></td>\n<td><code>55</code></td>\n<td><code>push ebp</code></td>\n</tr>\n<tr>\n<td>…</td>\n<td>…</td>\n<td>…</td>\n<td>…</td>\n</tr>\n<tr>\n<td>20</td>\n<td><code>0040105EH</code></td>\n<td><code>39 4D F4</code></td>\n<td><code>cmp dword ptr [ebp-0Ch], ecx</code></td>\n</tr>\n<tr>\n<td>…</td>\n<td>…</td>\n<td>…</td>\n<td>…</td>\n</tr>\n<tr>\n<td>23</td>\n<td><code>00401066H</code></td>\n<td><code>D1 E2</code></td>\n<td><code>shl edx, 1</code></td>\n</tr>\n<tr>\n<td>…</td>\n<td>…</td>\n<td>…</td>\n<td>…</td>\n</tr>\n<tr>\n<td>35</td>\n<td><code>0040107FH</code></td>\n<td><code>C3</code></td>\n<td><code>ret</code></td>\n</tr>\n</tbody>\n</table>\n<p>其中，机器级代码行包括行号、虚拟地址、机器指令和汇编指令。请回答下列问题。</p>\n<ol>\n<li>计算机 M 是 RISC 还是 CISC？为什么？</li>\n<li>f1 的机器指令代码共占多少字节？要求给出计算过程。</li>\n<li>第 20 条指令 cmp 通过 i 减 n−1 实现对 i 和 n−1 的比较。执行 f1(0) 过程中，当 i=0 时，cmp 指令执行后，进/借位标志 CF 的内容是什么？要求给出计算过程。</li>\n<li>第 23 条指令 shl 通过左移操作实现了 <code>power *= 2</code> 运算，在 f2 中能否也用 shl 指令实现 <code>power *= 2</code>？为什么？</li>\n</ol>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>（1）CISC。</strong> 指令长度不固定：<code>push ebp</code> 是 1 字节（<code>55</code>），<code>cmp</code> 是 3 字节（<code>39 4D F4</code>），<code>shl</code> 是 2 字节（<code>D1 E2</code>），<code>ret</code> 是 1 字节（<code>C3</code>）；指令格式也不规整，<code>cmp</code> 还带 <code>[ebp-0Ch]</code> 这样的基址加偏移寻址。RISC 的特征是定长、格式规整、寻址方式少，和表中不符。</p>\n<p><strong>（2）96 字节。</strong> 第一条指令在 <code>00401020H</code>，最后一条 <code>ret</code> 在 <code>0040107FH</code>、长 1 字节，所以代码的结束边界是 <code>00401080H</code>：</p>\n<p>$$00401080\\mathrm{H}-00401020\\mathrm{H}=60\\mathrm{H}=96$$</p>\n<p>也可以按「末条地址 − 首地址 + 末条长度」算：<code>0040107FH − 00401020H + 1 = 96</code>。</p>\n<p><strong>（3）CF=1。</strong> <code>n</code> 是无符号数，f1(0) 时 $n=0$，$n-1$ 按 32 位无符号回绕成 <code>FFFFFFFFH</code>。<code>cmp</code> 做 $i-(n-1)$，即 <code>00000000H − FFFFFFFFH</code>：被减数小于减数，无符号减法需要借位，所以 CF=1；差值为 <code>00000001H</code>。</p>\n<p><strong>（4）不能。</strong> f2 中的 <code>power</code> 是 <code>float</code>，<code>shl</code> 是整数左移，它把 IEEE 754 的 32 位位串整体左移一位：符号位、阶码、尾数都会错位，移完并不是把浮点数值乘 2。f2 里的 <code>power *= 2</code> 要用浮点乘法（或直接把阶码加 1），不能用 <code>shl</code>。</p>"
  },
  {
    "id": "q-auto-coa-4301",
    "year": 2023,
    "no": "44",
    "label": "",
    "subject": "coa",
    "chapter": "coa-4",
    "topics": [
      "coa-4-2"
    ],
    "type": "综合",
    "difficulty": 3,
    "tags": [
      "例题"
    ],
    "stem": "<p>背景（来自 2023-43）：计算机 M 字长 32 位，按字节编址，采用请求调页的虚拟存储管理，虚拟地址 32 位，页大小 4KB。C 程序段中 <code>int a[24][64]</code> 按行优先存放，首地址为 <code>0042 2000H</code>，<code>sizeof(int)=4</code>；执行前数组 a 不在主存，执行过程中不发生页面置换。</p>\n<pre><code class=\"language-c\">int a[24][64];\nfor (i = 0; i &lt; 24; i++)\n    for (j = 0; j &lt; 64; j++)\n        a[i][j] = 10;\n</code></pre>\n<p>该程序段在 M 上的部分机器级代码如下，每个机器级代码行中依次包含指令序号、虚拟地址、机器指令和汇编指令。</p>\n<table>\n<thead>\n<tr>\n<th>指令序号</th>\n<th>虚拟地址</th>\n<th>机器码</th>\n<th>汇编指令</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td><code>00401072H</code></td>\n<td><code>C7 45 F8 00 00 00 00</code></td>\n<td><code>mov [ebp-8], 0</code></td>\n</tr>\n<tr>\n<td>2</td>\n<td><code>00401079H</code></td>\n<td><code>EB 09</code></td>\n<td><code>jmp 00401084h</code></td>\n</tr>\n<tr>\n<td>3</td>\n<td><code>0040107BH</code></td>\n<td><code>8B 55 F8</code></td>\n<td><code>mov eax, [ebp-8]</code></td>\n</tr>\n<tr>\n<td>…</td>\n<td>…</td>\n<td>…</td>\n<td>…</td>\n</tr>\n<tr>\n<td>7</td>\n<td><code>00401088H</code></td>\n<td><code>7D 32</code></td>\n<td><code>jge 004010bch</code></td>\n</tr>\n<tr>\n<td>8</td>\n<td><code>0040108AH</code></td>\n<td><code>C7 45 FC 00 00 00 00</code></td>\n<td><code>mov [ebp-4], 0</code></td>\n</tr>\n<tr>\n<td>…</td>\n<td>…</td>\n<td>…</td>\n<td>…</td>\n</tr>\n<tr>\n<td>19</td>\n<td><code>004010AEH</code></td>\n<td><code>C7 84 82 00 20 42 00 0A 00 00 00</code></td>\n<td><code>mov [ecx+edx*4+00422000h], 0Ah</code></td>\n</tr>\n<tr>\n<td>20</td>\n<td>…</td>\n<td>…</td>\n<td>…</td>\n</tr>\n</tbody>\n</table>\n<p>请回答下列问题。</p>\n<ol>\n<li>第 20 条指令的虚拟地址是多少？</li>\n<li>已知第 2 条 jmp 和第 7 条 jge 都是跳转指令，其操作码分别是 EBH 和 7DH，跳转目标地址分别为 <code>0040 1084H</code>、<code>0040 10BCH</code>，这两条指令都采用什么寻址方式？给出第 2 条指令 jmp 的跳转目标地址计算过程。</li>\n<li>已知第 19 条 mov 指令的功能为“a[i][j]←10”，其中 ecx 和 edx 为寄存器名，<code>0042 2000H</code> 是数组 a 的首地址，指令中源操作数采用什么寻址方式？已知 edx 中存放的是变量 j，ecx 中存放的是什么？根据该指令的机器码判断计算机 M 采用大端还是小端方式。</li>\n<li>第一次执行第 19 条指令时，取指令过程中是否会发生缺页异常？为什么？</li>\n</ol>",
    "options": null,
    "answer": "",
    "analysis": "<p><strong>（1）<code>004010B9H</code>。</strong> 第 19 条指令从 <code>004010AEH</code> 开始，机器码占 11 字节（<code>C7 84 82</code> 3 字节 + 4 字节位移 + 4 字节立即数），所以下一条指令地址为</p>\n<p>$$004010AE\\mathrm{H}+0\\mathrm{BH}=004010B9\\mathrm{H}$$</p>\n<p><strong>（2）两条都采用相对寻址。</strong> 转移目标 = 下一条指令地址 + 8 位补码偏移量。第 2 条 jmp 在 <code>00401079H</code>，指令长 2 字节（<code>EB 09</code>），下一条指令地址为 <code>00401079H+2=0040107BH</code>，偏移量为 <code>09H</code>：</p>\n<p>$$0040107\\mathrm{B}\\mathrm{H}+09\\mathrm{H}=00401084\\mathrm{H}$$</p>\n<p><strong>（3）源操作数采用立即数寻址；ecx 中存放 <code>i×64×4</code>，即 <code>i×256</code>（i 左移 8 位）；M 采用小端方式。</strong></p>\n<ul>\n<li>第 19 条指令的源操作数是 <code>0Ah</code>，直接写在指令里，属于立即（数）寻址。</li>\n<li>a[i][j] 的地址 $=00422000\\mathrm{H}+(i\\times64+j)\\times4=00422000\\mathrm{H}+i\\times256+j\\times4$，而指令写成 <code>[ecx+edx*4+00422000h]</code>、edx 中存的是 j，所以 ecx 中存的是 $i\\times256$。</li>\n<li>机器码中 <code>00422000H</code> 存为 <code>00 20 42 00</code>，低字节在前，是小端；立即数 <code>0Ah</code> 也存成 <code>0A 00 00 00</code>，同样说明是小端。</li>\n</ul>\n<p><strong>（4）不会。</strong> 第 19 条指令的 11 字节在 <code>004010AEH</code>～<code>004010B8H</code>，位于代码页 <code>00401000H</code>～<code>00401FFFH</code>（4KB）内，取第 1～18 条指令时该页已经调入主存，而且本条取指没有跨页，所以取指令不会缺页。第一次执行时可能缺页的是数据页 <code>00422000H</code>（数组不在主存），但那是取数据，不是取指令。</p>"
  }
];
