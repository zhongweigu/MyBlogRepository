/**
 * 数据结构原有考点的补充层
 * 只放原考点没有展开的细节、图解和对比，不重复 base points。
 */

const fig = (name, caption) => ({
  src: `/408-review/assets/img/${name}`,
  caption,
});

export const DS_SUPPLEMENTS = {
  'ds-2-1': {
    points: [
      {
        t: '基本操作与移动次数',
        lead: '顺序表的插入 / 删除，先看移动区间，再取平均。',
        body: `<p>在第 i 个位置插入：原来第 i 到第 n 个元素都要后移一位，移动 <span class="fx">n−i+1</span> 个；等概率插入时平均移动 <span class="fx">n/2</span> 个。删除第 i 个元素：第 i+1 到第 n 个元素前移，移动 <span class="fx">n−i</span> 个；平均 <span class="fx">(n−1)/2</span> 个。</p>
        <p>链表在已知前驱时插入 / 删除只改指针，但“按位找第 i 个”仍要 O(n)。这就是“链表插入 O(1)”必须带前驱条件的原因。</p>`,
      },
      {
        t: '双链表、循环链表与静态链表',
        lead: '多一个前驱指针，或少一个头尾边界；静态链表用数组下标模拟指针。',
        body: `<p><strong>双链表</strong>每个结点存 prior 和 next，找前驱 O(1)，插入删除要改四个指针；<strong>循环链表</strong>尾结点的 next 指回头结点，从任意结点出发都能遍历全表；<strong>静态链表</strong>用数组存 data 和 next 下标，插入删除改下标，适合不支持指针的语言。</p>
        <p>双链表插入时最容易漏改“后继的 prior”；带头结点的循环链表判空是 <code>head->next == head</code>。</p>`,
      },
    ],
    figures: [
      fig('ds-array-linked-list.svg', '顺序表按下标直接算地址；单链表按位查找要逐个走，已知前驱时插入删除只改指针。'),
    ],
  },

  'ds-2-2': {
    hidePoints: ['合法出栈序列：卡特兰数与禁模式'],
    points: [
      {
        t: '循环队列的三种判空 / 判满',
        lead: '牺牲单元、加 size、加 tag；元素个数统一用取模算。',
        body: `<p>牺牲一个单元：队空 <code>front==rear</code>，队满 <code>(rear+1)%M==front</code>，最多存 M−1 个。加 size：size=0 空、size=M 满，可以存满。加 tag：最近一次是入队则满、是出队则空。</p>
        <p>元素个数 = <span class="fx">(rear−front+M)%M</span>（rear 指向队尾后一位时）。三种方案都要能区分“空”和“满”，因为 front 与 rear 相遇时两种状态长得一样。</p>`,
      },
    ],
    figures: [
      fig('ds-stack-queue.svg', '栈只在 top 一端进出；循环队列用取模把出队留下的空位重新利用，front 与 rear 相遇时要靠牺牲单元 / size / tag 区分空与满。'),
    ],
  },

  'ds-2-3': {
    order: 4,
    points: [
      {
        t: '中缀转后缀的完整优先级表',
        lead: '栈外优先级决定入栈，栈内优先级决定弹出。',
        body: `<p>操作数直接输出；左括号入栈；右括号不断弹栈输出直到左括号；普通运算符入栈前，弹出栈顶所有<strong>栈内优先级不低于它</strong>的运算符。栈内左括号优先级最低，只有右括号能把它弹出。</p>
        <p>以 <code>a+b-a*((c+d)/e-f)+g</code> 为例，转换结果是 <code>ab+acd+e/f-*-g+</code>。2012 年那道“栈内最多同时存几个运算符”的题，就是在这个模拟过程里数峰值。</p>`,
        figures: [
          fig('expr-eval-table.webp', '中缀转后缀 / 后缀求值的扫描表：每一步看当前 token、栈内容和输出，栈内左括号要单独处理。'),
        ],
      },
    ],
  },

  'ds-2-4': {
    order: 6,
    figures: [
      fig('symmetric-matrix.webp', '对称矩阵只存一半；按行优先存下三角时，i≥j 用公式，i<j 交换下标。'),
      fig('compressed-array-index.webp', '从二维下标到一维下标的映射：先算行首偏移，再加行内偏移。'),
    ],
  },

  'ds-2-5': {
    order: 7,
    points: [
      {
        t: 'next 与 nextval 的代码口径',
        lead: 'next 求最长相等前后缀，nextval 跳过必然失配的字符。',
        body: `<p>按 next 从 0 开始的常见代码：<code>next[1]=0, j=0; i=1</code>；比较 <code>T[i]</code> 与 <code>T[j]</code>，相等则 <code>next[++i]=++j</code>，否则 <code>j=next[j]</code>。求 nextval 时，若 <code>T[i]==T[j]</code> 则 <code>nextval[i]=nextval[j]</code>，否则 <code>nextval[i]=j</code>。</p>
        <p>不同教材的 next 第一位可能是 0 或 −1，代码整体差 1；考试先看题目给的数组，不要背死一个版本。</p>`,
        figures: [
          fig('nextval-motivation.webp', 'nextval 的动机：失配后按 next 滑过去，如果还是同一个字符，比较必然再次失败；nextval 把这类冗余跳过。'),
        ],
      },
    ],
  },

  'ds-3-1': {
    hidePoints: ['由遍历序列构造二叉树'],
    points: [
      {
        t: '九条计数结论与三条推导主线',
        lead: '结点数 = 度之和 + 1，是所有树计数题的根。',
        body: `<p>① 结点总数 = 所有结点的度之和 + 1；② 非空二叉树 <span class="fx">n<sub>0</sub>=n<sub>2</sub>+1</span>；③ 第 i 层最多 <span class="fx">m<sup>i−1</sup></span> 个；④ 高度 h 的 m 叉树最多 <span class="fx">(m<sup>h</sup>−1)/(m−1)</span> 个；⑤ n 个结点的完全二叉树高度 <span class="fx">⌈log₂(n+1)⌉</span>。</p>
        <p>①推②：<span class="fx">n<sub>0</sub>+n<sub>1</sub>+n<sub>2</sub> = n<sub>1</sub>+2n<sub>2</sub>+1</span>，移项即 <span class="fx">n<sub>0</sub>=n<sub>2</sub>+1</span>。③推④：等比数列求和。④推⑤：由 <span class="fx">2<sup>h−1</sup>−1 &lt; n ≤ 2<sup>h</sup>−1</span> 解出 h。</p>`,
        figures: [
          fig('tree-count-formulas.webp', '树与二叉树的九条计数结论：结点数与度数的关系、n₀=n₂+1、每层上限、满 m 叉树、完全二叉树高度与编号。'),
        ],
      },
      {
        t: '森林与正则 k 叉树的计数',
        lead: '森林边数 = 非根结点数；正则 k 叉树的叶子数由非叶结点数决定。',
        body: `<p>森林有 n 个结点、e 条边，则树的棵数 = n−e：每棵树除根外每个结点恰好一条父边。正则 k 叉树每个非叶结点有 k 个孩子，设非叶结点 m 个，则叶子 <span class="fx">m(k−1)+1</span> 个。</p>
        <p>高度为 h 的正则 k 叉树，结点最多 <span class="fx">(k<sup>h</sup>−1)/(k−1)</span>，最少 <span class="fx">k(h−1)+1</span>（每层只留一个结点继续长）。</p>`,
      },
    ],
    questions: ['q-2016-ds-forest'],
  },

  'ds-3-2': {
    order: 3,
    figures: [
      fig('threaded-tree-2014.webp', '中序线索化后，结点 X 的左右线索分别指向中序前驱和后继；先看标志位，再决定是线索还是孩子。'),
    ],
  },

  'ds-3-3': {
    order: 4,
    hidePoints: ['树的三种存储方式'],
    figures: [
      fig('ds-tree-forest.svg', '左孩子右兄弟：A 的左孩子是 B，B 的右孩子是 C，C 的右孩子是 D；B 的左孩子是 E。'),
    ],
  },

  'ds-3-4': {
    order: 5,
    figures: [
      fig('huffman-tree-example.webp', '哈夫曼树的构造：每次取最小两个权值合并，新结点权值为和；WPL 等于所有非叶结点权值之和。'),
    ],
  },

  'ds-4-1': {
    hidePoints: ['十字链表与邻接多重表'],
    points: [
      {
        t: '邻接矩阵的幂与度的关系',
        lead: 'A^m[i][j] 是长度为 m 的路径条数；无向图 A² 的对角线是度。',
        body: `<p>邻接矩阵 A 中 <span class="fx">A<sup>m</sup>[i][j]</span> 表示从 i 到 j 长度为 m 的路径条数。无向图 <span class="fx">A<sup>2</sup>[i][i]</span> 等于 deg(i)；有向图则不一定，因为入边和出边方向不同。</p>
        <p>邻接矩阵空间 O(V²)，判边 O(1)，适合稠密图；邻接表空间 O(V+E)，遍历邻接点快，适合稀疏图。求入度时邻接表要扫描全表，或另建逆邻接表。</p>`,
        figures: [
          fig('adj-matrix-2015-graph.webp', '邻接矩阵与 A^m 的含义：矩阵元素表示边是否存在，A^m 的元素表示长度为 m 的路径条数。'),
        ],
      },
      {
        t: '图的基本性质速查',
        lead: '握手定理、完全图边数、连通图边数下限。',
        body: `<p>无向图 <span class="fx">Σdeg=2E</span>，奇度顶点有偶数个；有向图 <span class="fx">Σin=Σout=E</span>。n 个顶点的无向完全图有 <span class="fx">n(n−1)/2</span> 条边，有向完全图有 <span class="fx">n(n−1)</span> 条弧。n 个顶点的连通无向图至少 n−1 条边；强连通有向图至少 n 条边。</p>`,
      },
    ],
  },

  'ds-4-2': {
    order: 3,
    points: [
      {
        t: 'DFS / BFS 的复杂度与序列',
        lead: '矩阵 O(V²)，表 O(V+E)；序列不唯一，但连通分量唯一。',
        body: `<p>DFS 用栈（递归）一条路走到底，BFS 用队列一层层扩散。邻接矩阵下每个顶点都要扫一行，复杂度 O(V²)；邻接表下每条边只检查一次，复杂度 O(V+E)。</p>
        <p>遍历序列与邻接点的存储顺序有关，所以不唯一；但“哪些顶点在同一个连通分量”唯一。非连通图外层要对每个未访问顶点调用一次，调用次数就是连通分量数。</p>`,
        figures: [
          fig('ds-graph-traversal.svg', '同一张图的 DFS 与 BFS：DFS 走到底再回溯，BFS 先访问完一层再下一层。'),
        ],
      },
    ],
  },

  'ds-4-3': {
    order: 4,
    points: [
      {
        t: 'MST 唯一性与最短路的边界',
        lead: 'MST 的“代价”唯一，树本身不一定唯一；Dijkstra 不能负权，Floyd 不能负环。',
        body: `<p>MST 的边权和唯一；树可能不唯一。各边权互不相等是 MST 唯一的充分不必要条件。权值最小的边不一定出现在每一棵 MST 中：三条权值为 1 的边围成三角形时，任一棵生成树只能取两条。</p>
        <p>Dijkstra 依赖“已确定顶点的 dist 不会再变小”，所以不能有负权边；Floyd 允许负权边，但不能有负环，且 k 必须在最外层。Prim 与 Kruskal 在 MST 唯一时结果相同。</p>`,
        figures: [
          fig('prim-2017-graph.webp', 'Prim 的选点过程：已选集合逐渐扩大，每次选一条连接集合内外的最小边。'),
          fig('dijkstra-2016-graph.webp', 'Dijkstra 的单源最短路径：每次确定一个距离最小的顶点，再用它松弛邻边。'),
          fig('floyd-31-graph.webp', 'Floyd 的多源最短路径：k 在外层，逐步允许经过更多中间顶点。'),
        ],
      },
    ],
    questions: ['q-2012-ds-mst'],
  },

  'ds-4-4': {
    order: 5,
    figures: [
      fig('critical-2011-graph.webp', 'AOE 网的关键路径：先正推 ve，再反推 vl，e=l 的活动组成关键路径。'),
    ],
  },

  'ds-5-1': {
    points: [
      {
        t: '顺序查找与 ASL',
        lead: '顺序 / 链式都能用，不要求有序；有序表可以提前停。',
        body: `<p>等概率成功 ASL = <span class="fx">(n+1)/2</span>。失败时：有哨兵 n+1 次，无哨兵 n 次；有序表比较到比 key 大就停，ASL 失败约为 <span class="fx">n/2 + n/(n+1)</span>。</p>
        <p>顺序查找的优点是存储结构不限、插入删除方便；缺点是 n 大时太慢。2013 年那道“折半反而更慢”的题，前提是各元素查找概率不相等：把高概率元素放前面、用顺序查找，加权 ASL 可以低于折半。</p>`,
      },
    ],
    figures: [
      fig('binary-search-decision-tree.webp', '折半查找判定树：圆形结点是成功结点，方形结点是失败区间；比较次数看层数。'),
      fig('block-search-structure.webp', '分块查找：索引表记录各块最大关键字和起始地址；块间有序，块内可以无序。'),
    ],
  },

  'ds-5-2': {
    points: [
      {
        t: 'AVL 删除：可能一路旋转',
        lead: '删除先按 BST 删，再沿路径向上检查；与插入不同，可能多次旋转。',
        body: `<p>删除叶子直接删；只有一个孩子就用孩子顶替；有两个孩子时与中序前驱或后继交换，再删除替代结点。删除后从父结点向上更新高度和 BF，遇到 |BF|=2 就按 LL/RR/LR/RL 旋转。</p>
        <p>一次旋转后子树高度可能降低，导致更高层祖先继续失衡，所以删除可能要做多次旋转；插入通常只需调整最小不平衡子树一次。</p>`,
        figures: [
          fig('avl-delete-cases.webp', 'AVL 删除的四种情形：删叶子、孩子上位、与中序前驱交换、与中序后继交换。'),
        ],
      },
    ],
    figures: [
      fig('avl-insert-cases.webp', 'AVL 插入的四种失衡：LL、RR、LR、RL；灰色结点是新插入结点。'),
    ],
    questions: ['q-2013-ds-avl'],
  },

  'ds-5-3': {
    figures: [
      fig('btree-search-example.webp', 'B 树查找：结点内比较后沿指针下降；内部结点也可能命中。'),
      fig('bplus-search-example.webp', 'B+ 树查找：内部结点只作索引，必须走到叶子；叶子之间用指针顺序链接。'),
      fig('hash-chaining.webp', '拉链法：同义词挂成链表；插入、删除只改指针，失败查找要走完整条链并判断空指针。'),
      fig('hash-probe-asl-example.webp', '开放定址法的 ASL 计算：每个初始散列地址都要探测到空槽，失败比较次数按探测长度统计。'),
    ],
    questions: ['q-2014-ds-btree', 'q-2014-ds-hash', 'q-2023-ds-hash'],
  },

  'ds-5-4': {
    figures: [
      fig('ds-red-black.svg', '红黑树示例：根黑、红结点孩子黑、每条路径黑高相同；最长路径不超过最短路径的两倍。'),
    ],
  },

  'ds-6-1': {
    figures: [
      fig('insertion-sort-partition.webp', '直接插入排序的分区：A[0] 是哨兵，A[1..i−1] 已有序，A[i..n] 未排序；正序最好、逆序最坏。'),
    ],
    questions: ['q-2022-ds-sort'],
  },

  'ds-6-2': {
    questions: ['q-2009-ds-sort'],
  },

  'ds-6-3': {
    figures: [
      fig('loser-tree.webp', '败者树：每个内部结点记录“败者”，冠军沿路径更新；k 路归并每次只需 O(log k) 次比较。'),
      fig('external-sort-multiway.webp', '多路归并：k 越大归并趟数越少，磁盘读写次数越少；代价是输入缓冲区和内部比较增加。'),
      fig('optimal-merge-tree.webp', '最佳归并树：每次合并最短的 k 个段，WPL 最小；不足 k 个时补长度为 0 的虚段。'),
    ],
  },
};
