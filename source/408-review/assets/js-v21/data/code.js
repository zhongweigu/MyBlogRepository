/**
 * 由 scripts/extract-code.py 从数据结构长文自动抽取。
 * 不要手改；要调整标题/说明，先改 content 或脚本后重跑。
 */

export const CODE_SNIPPETS = [
  {
    "id": "code-ds-2-5-1",
    "topic": "ds-2-5",
    "chapter": "ds-2",
    "title": "nextval 数组的求法",
    "lang": "c",
    "explanation": "KMP 匹配",
    "code": "int Index_KMP(SString S, SString T, int next[]) {\n    int i = 1, j = 1;\n    while (i <= S.length && j <= T.length) {\n        if (j == 0 || S.ch[i] == T.ch[j]) {\n            ++i; ++j;                        // 继续比较后继字符\n        } else {\n            j = next[j];                     // 模式串向右滑动（主串指针 i 不回溯）\n        }\n    }\n    if (j > T.length)\n        return i - T.length;                 // 匹配成功\n    else\n        return 0;\n}"
  },
  {
    "id": "code-ds-2-5-2",
    "topic": "ds-2-5",
    "chapter": "ds-2",
    "title": "nextval 数组的求法",
    "lang": "c",
    "explanation": "求 next",
    "code": "void get_next(SString T, int next[]) {\n    int i = 1, j = 0;\n    next[1] = 0;\n    while (i < T.length) {\n        if (j == 0 || T.ch[i] == T.ch[j]) {\n            ++i; ++j;\n            next[i] = j;\n        } else {\n            j = next[j];\n        }\n    }\n}"
  },
  {
    "id": "code-ds-2-5-3",
    "topic": "ds-2-5",
    "chapter": "ds-2",
    "title": "nextval 数组的求法",
    "lang": "c",
    "explanation": "求 nextval",
    "code": "void get_nextval(SString T, int nextval[]) {\n    int i = 1, j = 0;\n    nextval[1] = 0;\n    while (i < T.length) {\n        if (j == 0 || T.ch[i] == T.ch[j]) {\n            ++i; ++j;\n            if (T.ch[i] != T.ch[j])\n                nextval[i] = j;              // 滑过去字符不同，没有冗余\n            else\n                nextval[i] = nextval[j];     // 滑过去还是同一个字符，继续往下退\n        } else {\n            j = nextval[j];\n        }\n    }\n}"
  },
  {
    "id": "code-ds-3-1-4",
    "topic": "ds-3-1",
    "chapter": "ds-3",
    "title": "二叉树的四种遍历",
    "lang": "c",
    "explanation": "二叉树的结点（链式存储）",
    "code": "typedef struct BiTNode {\n    ElemType data;\n    struct BiTNode *lchild, *rchild;\n} BiTNode, *BiTree;"
  },
  {
    "id": "code-ds-3-1-5",
    "topic": "ds-3-1",
    "chapter": "ds-3",
    "title": "二叉树的四种遍历",
    "lang": "c",
    "explanation": "先序遍历",
    "code": "void PreOrder(BiTree T) {\n    if (T != NULL) {\n        visit(T);                        // 访问根结点\n        PreOrder(T->lchild);             // 递归遍历左子树\n        PreOrder(T->rchild);             // 递归遍历右子树\n    }\n}"
  },
  {
    "id": "code-ds-3-1-6",
    "topic": "ds-3-1",
    "chapter": "ds-3",
    "title": "二叉树的四种遍历",
    "lang": "c",
    "explanation": "中序遍历",
    "code": "void InOrder(BiTree T) {\n    if (T != NULL) {\n        InOrder(T->lchild);              // 递归遍历左子树\n        visit(T);                        // 访问根结点\n        InOrder(T->rchild);              // 递归遍历右子树\n    }\n}"
  },
  {
    "id": "code-ds-3-1-7",
    "topic": "ds-3-1",
    "chapter": "ds-3",
    "title": "二叉树的四种遍历",
    "lang": "c",
    "explanation": "后序遍历",
    "code": "void PostOrder(BiTree T) {\n    if (T != NULL) {\n        PostOrder(T->lchild);            // 递归遍历左子树\n        PostOrder(T->rchild);            // 递归遍历右子树\n        visit(T);                        // 访问根结点\n    }\n}"
  },
  {
    "id": "code-ds-3-1-8",
    "topic": "ds-3-1",
    "chapter": "ds-3",
    "title": "二叉树的四种遍历",
    "lang": "c",
    "explanation": "层次遍历（辅助队列）",
    "code": "// 链式队列结点\ntypedef struct LinkNode {\n    BiTNode *data;                       // 存指针而不是结点\n    struct LinkNode *next;\n} LinkNode;\n\ntypedef struct {\n    LinkNode *front, *rear;              // 队头、队尾\n} LinkQueue;\n\nvoid LevelOrder(BiTree T) {\n    LinkQueue Q;\n    InitQueue(Q);                        // 初始化辅助队列\n    BiTree p;\n    EnQueue(Q, T);                       // 根结点入队\n    while (!IsEmpty(Q)) {                // 队列不空则循环\n        DeQueue(Q, p);                   // 队头结点出队\n        visit(p);                        // 访问出队结点\n        if (p->lchild != NULL)\n            EnQueue(Q, p->lchild);       // 左孩子入队\n        if (p->rchild != NULL)\n            EnQueue(Q, p->rchild);       // 右孩子入队\n    }\n}"
  },
  {
    "id": "code-ds-3-1-9",
    "topic": "ds-3-1",
    "chapter": "ds-3",
    "title": "非递归遍历",
    "lang": "c",
    "explanation": "先序",
    "code": "void PreOrderTraverse(BiTree T) {\n    InitStack(S);\n    BiTree p = T;\n    BiTree q;\n    while (p || !StackEmpty(S)) {\n        if (p) {\n            cout << p->data;               // 先序：入栈之前就输出\n            Push(S, p);\n            p = p->lchild;\n        } else {\n            Pop(S, q);\n            p = q->rchild;\n        }\n    }\n}"
  },
  {
    "id": "code-ds-3-1-10",
    "topic": "ds-3-1",
    "chapter": "ds-3",
    "title": "非递归遍历",
    "lang": "c",
    "explanation": "中序",
    "code": "void InOrderTraverse(BiTree T) {\n    InitStack(S);\n    BiTree p = T;\n    BiTree q;\n    while (p || !StackEmpty(S)) {\n        if (p) {\n            Push(S, p);\n            p = p->lchild;\n        } else {\n            Pop(S, q);\n            cout << q->data;               // 中序：出栈的时候才输出\n            p = q->rchild;\n        }\n    }\n}"
  },
  {
    "id": "code-ds-3-1-11",
    "topic": "ds-3-1",
    "chapter": "ds-3",
    "title": "非递归遍历",
    "lang": "c",
    "explanation": "麻烦在于：出栈时栈顶 q 的右子树可能还没遍历过。办法是用 r 手动记录「刚刚输出的那个结点」，然后看栈顶：",
    "code": "void PostOrderTraverse(BiTree T) {\n    InitStack(S);\n    BiTree p = T, r = NULL;                // r 记录上一个访问输出的结点\n    BiTree q;\n    while (p || !StackEmpty(S)) {\n        if (p) {\n            Push(S, p);\n            p = p->lchild;\n        } else {\n            GetTop(S, q);\n            if (q->rchild && q->rchild != r)   // 右子树还没遍历过\n                p = q->rchild;\n            else {\n                Pop(S, q);\n                cout << q->data;\n                r = q;\n                p = NULL;\n            }\n        }\n    }\n}"
  },
  {
    "id": "code-ds-3-2-12",
    "topic": "ds-3-2",
    "chapter": "ds-3",
    "title": "线索化",
    "lang": "c",
    "explanation": "核心代码里 pre 始终指向上一个访问过的结点，也就是当前结点的前驱；pre 一开始置成 NULL。",
    "code": "pre = NULL;\n...\nif (!p->lchild) {                 // 左孩子为空 → 左指针改指前驱\n    p->lchild = pre;\n    p->ltag = 1;\n}\nif (pre && !pre->rchild) {        // 前驱的右孩子为空 → 它的右指针改指后继 p\n    pre->rchild = p;\n    pre->rtag = 1;\n}\npre = p;                          // 这个结点走完了，它就是下一个结点的前驱"
  },
  {
    "id": "code-ds-3-2-13",
    "topic": "ds-3-2",
    "chapter": "ds-3",
    "title": "线索化",
    "lang": "c",
    "explanation": "填进前面的先序遍历，原本写 cout << p->data; 的位置就换成这段：",
    "code": "void PreOrderTraverse(BiTree T) {\n    InitStack(S);\n    BiTree p = T;\n    BiTree q;\n    BiTree pre = NULL;\n    while (p || !StackEmpty(S)) {\n        if (p) {\n            if (!p->lchild) {\n                p->lchild = pre;\n                p->ltag = 1;\n            }\n            if (pre && !pre->rchild) {\n                pre->rchild = p;\n                pre->rtag = 1;\n            }\n            pre = p;\n            Push(S, p);\n            p = p->lchild;\n        } else {\n            Pop(S, q);\n            p = q->rchild;\n        }\n    }\n}"
  },
  {
    "id": "code-ds-3-4-14",
    "topic": "ds-3-4",
    "chapter": "ds-3",
    "title": "初始化",
    "lang": "c",
    "explanation": "存储是双亲表示法的数组：下标就是元素本身，S[i] 里存的是 i 的父结点下标，顺着它一路往上走。初始时每个元素各自成一个集合，即每个元素都当根，双亲一律置成 -1：",
    "code": "#define MAXSIZE 10\nvoid Initial(int S[])\n{\n    for (int i = 0; i < MAXSIZE; i++)\n        S[i] = -1;\n}"
  },
  {
    "id": "code-ds-3-4-15",
    "topic": "ds-3-4",
    "chapter": "ds-3",
    "title": "查找",
    "lang": "c",
    "explanation": "从 x 出发，顺着双亲一路往上走，走到双亲为负数的那个结点，它就是根：",
    "code": "int Find(int S[], int x)\n{\n    while (S[x] >= 0)\n        x = S[x];\n    return x;\n}"
  },
  {
    "id": "code-ds-3-4-16",
    "topic": "ds-3-4",
    "chapter": "ds-3",
    "title": "查找",
    "lang": "c",
    "explanation": "不做优化时，一次查找的代价就是 x 到根的路径长度；合并时总是把新根挂到旧根下面，树会退化成一条长链，这时单次查找是 $O(n)$。路径压缩改的就是这一点：查完之后顺手把这条路径上的结点全部挂到根下面。",
    "code": "int FindWithPathCompression(int S[], int x)\n{\n    int root = x;\n    while (S[root] >= 0)             // 这个 while 是在找集合的根\n        root = S[root];\n    while (x != root) {\n        int t = S[x];                // t 是为了标记 x 的父结点\n        S[x] = root;                 // 把 x 挂在 root 下\n        x = t;                       // 接下来一直往上处理 x 的父结点，全部挂到 root 下\n    }\n    return root;\n}"
  },
  {
    "id": "code-ds-3-4-17",
    "topic": "ds-3-4",
    "chapter": "ds-3",
    "title": "合并",
    "lang": "c",
    "explanation": "传进来的直接是两个根（合并前先用 Find 各查一次）。把一个根挂到另一个根下面，同时把两个集合的规模累加到新根上：",
    "code": "void Union(int S[], int root1, int root2)\n{\n    if (root1 == root2) return;      // 已经在同一个集合里，不用并\n    S[root1] += S[root2];            // 两个根存的都是 -结点数，相加就是合并后的 -结点数\n    S[root2] = root1;                // root2 挂到 root1 下\n}"
  },
  {
    "id": "code-ds-3-4-18",
    "topic": "ds-3-4",
    "chapter": "ds-3",
    "title": "合并",
    "lang": "c",
    "explanation": "按秩合并：上面这种写法里谁当根全看参数顺序，树容易越长越高；改成让小集合挂到大集合下面，树高就能压住。",
    "code": "void Union(int S[], int root1, int root2)\n{\n    if (root1 == root2) return;\n    if (S[root1] > S[root2]) {       // root1 的结点更少 → 小的挂到大的下面\n        S[root2] += S[root1];\n        S[root1] = root2;\n    } else {\n        S[root1] += S[root2];\n        S[root2] = root1;\n    }\n}"
  },
  {
    "id": "code-ds-4-2-19",
    "topic": "ds-4-2",
    "chapter": "ds-4",
    "title": "DFS思想在不同存储结构上的实现",
    "lang": "c",
    "explanation": "DFS 的思想就三步：",
    "code": "bool visited[MVNum];\nvoid DFSTraverse(Graph G)\n{\n    for (v = 0; v < G.vexnum; ++v)\n        visited[v] = false;                 // 初始化：全部置成未访问\n    for (v = 0; v < G.vexnum; ++v)\n        if (!visited[v]) DFS(G, v);         // 非连通图会从这里多次出发\n}\n\nvoid DFS(Graph G, int v)\n{\n    cout << v;                              // 先访问、再输出\n    visited[v] = true;\n    for (w = FirstAdjVex(G, v); w >= 0; w = NextAdjVex(G, v, w))\n    {\n        if (!visited[w])\n            DFS(G, w);                      // 没访问过的邻接点，递归进去\n    }\n}"
  },
  {
    "id": "code-ds-4-2-20",
    "topic": "ds-4-2",
    "chapter": "ds-4",
    "title": "BFS思想在不同存储结构上的实现",
    "lang": "c",
    "explanation": "BFS 的流程是：从一个顶点出发，先标记访问并输出它，再把它入队；然后不断从队列里取出队头顶点，检查它的所有邻接点——没访问过的就标记访问、输出、入队；一直重复到队列为空。",
    "code": "bool visited[MVNum];\nvoid BFSTraverse(Graph G)\n{\n    for (v = 0; v < G.vexnum; ++v)\n        visited[v] = false;                 // 初始化：全部置成未访问\n    for (v = 0; v < G.vexnum; ++v)\n        if (!visited[v]) BFS(G, v);         // 非连通图会从这里多次出发\n}\n\nvoid BFS(Graph G, int v)\n{\n    cout << v;                              // 先访问、再输出\n    visited[v] = true;\n    InitQueue(Q);                           // 辅助队列\n    EnQueue(Q, v);\n    while (!QueueEmpty(Q))\n    {\n        DeQueue(Q, u);                      // 取出队头，接下来由它往下铺一层\n        for (w = FirstAdjVex(G, u); w >= 0; w = NextAdjVex(G, u, w))\n            if (!visited[w])\n            {\n                cout << w;                  // 第一次碰到就输出、标记、入队\n                visited[w] = true;\n                EnQueue(Q, w);\n            }\n    }\n}"
  },
  {
    "id": "code-ds-4-2-21",
    "topic": "ds-4-2",
    "chapter": "ds-4",
    "title": "DFS和BFS的应用",
    "lang": "c",
    "explanation": "DFS 判断有向图是否存在环路",
    "code": "void CheckGraphCycle(Graph G)\n{\n    for (v = 0; v < G.vexnum; v++)\n        if (status[v] == Unvisited)\n            DetectCycleDFS(G, v);\n\n    if (hasCycle)\n        cout << \"图中存在回路\";\n    else\n        cout << \"图中无回路\";\n}\n\nbool hasCycle = false;\nvoid DetectCycleDFS(Graph G, int v)\n{\n    status[v] = Visiting;                     // 正在访问\n    for (w = FirstAdjVex(G, v); w >= 0; w = NextAdjVex(G, v, w))\n    {\n        if (status[w] == Visiting)            // 又撞上正在访问的点 → 有环\n            hasCycle = true;\n        if (status[w] == Unvisited)\n            DetectCycleDFS(G, w);\n    }\n    status[v] = Visited;                      // 已访问\n}"
  },
  {
    "id": "code-ds-4-2-22",
    "topic": "ds-4-2",
    "chapter": "ds-4",
    "title": "DFS和BFS的应用",
    "lang": "c",
    "explanation": "口径和有向图只差一点：遇到处于「正在访问」状态的邻接点 $w$ 时，还要 $w$ 不是上一步访问的那个结点（也就是 $v$ 的父结点）才算有环——无向图里父子之间那条边来回都通，不排掉它就会被误判成环。所以递归时要把父结点一起传下去。",
    "code": "void CheckGraphCycle(Graph G)\n{\n    for (v = 0; v < G.vexnum; v++)\n        if (status[v] == Unvisited)\n            DetectCycleDFS(G, v, -1);         // 初始结点没有父结点\n\n    if (hasCycle)\n        cout << \"图中存在回路\";\n    else\n        cout << \"图中无回路\";\n}\n\nbool hasCycle = false;\nvoid DetectCycleDFS(Graph G, int v, int parent)\n{\n    status[v] = Visiting;                     // 正在访问\n    for (w = FirstAdjVex(G, v); w >= 0; w = NextAdjVex(G, v, w))\n    {\n        if (status[w] == Visiting && w != parent)\n            hasCycle = true;\n        if (status[w] == Unvisited)\n            DetectCycleDFS(G, w, v);          // 把 v 当作 w 的父结点传下去\n    }\n    status[v] = Visited;                      // 已访问\n}"
  },
  {
    "id": "code-ds-4-2-23",
    "topic": "ds-4-2",
    "chapter": "ds-4",
    "title": "DFS和BFS的应用",
    "lang": "c",
    "explanation": "DFS 实现拓扑排序",
    "code": "bool visited[MVNum];\nint finishTime[MVNum];\nint time;\nvoid TopoSortDFS(Graph G, int v)\n{\n    visited[v] = true;\n    for (w = FirstNeighbor(G, v); w >= 0; w = NextNeighbor(G, v, w))\n    {\n        if (!visited[w])\n            TopoSortDFS(G, w);\n    }\n    time = time + 1;\n    finishTime[v] = time;                     // 退出递归之前盖时间戳\n}"
  },
  {
    "id": "code-ds-4-2-24",
    "topic": "ds-4-2",
    "chapter": "ds-4",
    "title": "DFS和BFS的应用",
    "lang": "c",
    "explanation": "BFS 计算单源最短路径",
    "code": "void BFS_DISTANCE(Graph G, int u)\n{\n    for (i = 0; i < G.vexnum; i++)\n        d[i] = INF;\n    visited[u] = TRUE;\n    d[u] = 0;\n    EnQueue(Q, u);\n    while (!IsEmpty(Q))\n    {\n        DeQueue(Q, u);\n        for (w = FirstNeighbor(G, u); w >= 0; w = NextNeighbor(G, u, w))\n        {\n            if (!visited[w])\n            {\n                visited[w] = TRUE;\n                d[w] = d[u] + 1;\n                EnQueue(Q, w);\n            }\n        }\n    }\n}"
  },
  {
    "id": "code-ds-4-2-25",
    "topic": "ds-4-2",
    "chapter": "ds-4",
    "title": "DFS和BFS的应用",
    "lang": "c",
    "explanation": "图是连通的 $\\Leftrightarrow$ 从任意一个顶点出发都能访问到所有其他顶点。",
    "code": "bool visited[MVNum];\nvoid DFSTraverse(Graph G)\n{\n    for (v = 0; v < G.vexnum; ++v)\n        visited[v] = false;\n    DFS(G, 0);\n    for (v = 0; v < G.vexnum; ++v)\n        if (!visited[v])\n            return false;\n    return true;\n}"
  },
  {
    "id": "code-ds-4-2-26",
    "topic": "ds-4-2",
    "chapter": "ds-4",
    "title": "DFS和BFS的应用",
    "lang": "c",
    "explanation": "BFS 版只把 DFS(G, 0) 换成 BFS(G, 0)：",
    "code": "bool visited[MVNum];\nvoid BFSTraverse(Graph G)\n{\n    for (v = 0; v < G.vexnum; ++v)\n        visited[v] = false;\n    BFS(G, 0);\n    for (v = 0; v < G.vexnum; ++v)\n        if (!visited[v])\n            return false;\n    return true;\n}"
  },
  {
    "id": "code-ds-4-4-27",
    "topic": "ds-4-4",
    "chapter": "ds-4",
    "title": "考点12-拓扑排序",
    "lang": "c",
    "explanation": "一般实现（邻接表 + 栈）：",
    "code": "bool TopologicalSort(Graph G)\n{\n    InitStack(S);                        // 初始化栈，用来存放入度为 0 的顶点\n    int i;\n    for (i = 0; i < G.vexnum; i++)\n        if (indegree[i] == 0)\n            Push(S, i);                  // 把所有入度为 0 的顶点入栈\n    int count = 0;                       // 计数：当前已经输出了多少个顶点\n    while (!IsEmpty(S))                  // 栈不空，说明还有入度为 0 的顶点\n    {\n        Pop(S, i);                       // 栈顶元素出栈\n        print[count++] = i;              // 输出顶点 i\n        for (p = G.vertices[i].firstarc; p; p = p->nextarc)\n        {\n            v = p->adjvex;               // 把 i 的这条出边\"删掉\"：终点的入度减 1\n            if (!(--indegree[v]))\n                Push(S, v);              // 减到 0 就入栈\n        }\n    }\n    if (count < G.vexnum)\n        return false;                    // 输出的顶点不够：有向图里有回路\n    else\n        return true;                     // 拓扑排序成功\n}"
  },
  {
    "id": "code-ds-6-1-28",
    "topic": "ds-6-1",
    "chapter": "ds-6",
    "title": "直接插入排序",
    "lang": "c",
    "explanation": "对应的代码（下标从 1 开始，A[0] 空出来做哨兵）：",
    "code": "void InsertSort(ElemType A[], int n) {\n    int i, j;\n    for (i = 2; i <= n; i++) {\n        if (A[i] < A[i - 1]) {       // 比有序区末尾还大，本来就在位\n            A[0] = A[i];             // 哨兵暂存待插入元素\n            for (j = i - 1; A[0] < A[j]; --j)\n                A[j + 1] = A[j];     // 比哨兵大的元素依次后移\n            A[j + 1] = A[0];         // 回填到腾出来的空位\n        }\n    }\n}"
  },
  {
    "id": "code-ds-6-1-29",
    "topic": "ds-6-1",
    "chapter": "ds-6",
    "title": "直接插入排序",
    "lang": "c",
    "explanation": "对应的代码（下标从 1 开始，A[0] 空出来做哨兵）：",
    "code": "// 直接插入排序（0-based，用 temp 暂存）\nvoid InsertSort(ElemType A[], int n) {\n    int i, j;\n    ElemType temp;\n    for (i = 1; i < n; i++) {                // 把 A[i] 插入前面已排好序的序列\n        if (A[i] < A[i - 1]) {               // 只有小于前驱才需要移动\n            temp = A[i];                     // 暂存待插入元素\n            for (j = i - 1; j >= 0 && A[j] > temp; --j)\n                A[j + 1] = A[j];             // 大于 temp 的元素后移\n            A[j + 1] = temp;                 // 回填\n        }\n    }\n}"
  },
  {
    "id": "code-ds-6-1-30",
    "topic": "ds-6-1",
    "chapter": "ds-6",
    "title": "折半插入排序",
    "lang": "c",
    "explanation": "对应的代码：",
    "code": "void BinaryInsertSort(ElemType A[], int n) {\n    int i, j, low, high, mid;\n    for (i = 2; i <= n; i++) {\n        A[0] = A[i];                 // 每趟必做：哨兵保存待插入元素\n        low = 1;\n        high = i - 1;\n        while (low <= high) {\n            mid = (low + high) / 2;\n            if (A[mid] > A[0])\n                high = mid - 1;      // 插入点在左半区\n            else\n                low = mid + 1;       // 插入点在右半区\n        }\n        for (j = i - 1; j >= high + 1; --j)\n            A[j + 1] = A[j];         // 把插入点之后的元素统一后移\n        A[high + 1] = A[0];          // 回填到空位\n    }\n}"
  },
  {
    "id": "code-ds-6-1-31",
    "topic": "ds-6-1",
    "chapter": "ds-6",
    "title": "折半插入排序",
    "lang": "c",
    "explanation": "对应的代码：",
    "code": "// 折半插入排序（1-based，A[0] 当哨兵）\nvoid BinaryInsertSort(ElemType A[], int n) {\n    int i, j, low, high, mid;\n    for (i = 2; i <= n; i++) {                // 依次把 A[2]～A[n] 插入前面的有序区\n        A[0] = A[i];                          // 暂存待插入元素\n        low = 1;\n        high = i - 1;\n        while (low <= high) {                 // 在 A[1..i-1] 中折半查找插入位置\n            mid = (low + high) / 2;\n            if (A[mid] > A[0]) high = mid - 1;\n            else low = mid + 1;\n        }\n        for (j = i - 1; j >= high + 1; --j)\n            A[j + 1] = A[j];                  // 统一后移，空出插入位置\n        A[high + 1] = A[0];                   // 回填\n    }\n}"
  },
  {
    "id": "code-ds-6-1-32",
    "topic": "ds-6-1",
    "chapter": "ds-6",
    "title": "希尔排序",
    "lang": "c",
    "explanation": "代码（增量按 $n/2, n/4, \\dots, 1$ 取）：",
    "code": "void ShellSort(ElemType A[], int n) {\n    int dk, i, j;\n    for (dk = n / 2; dk >= 1; dk = dk / 2) {\n        for (i = dk + 1; i <= n; i++) {\n            if (A[i] < A[i - dk]) {       // 在本组内需要前插\n                A[0] = A[i];             // 暂存待插入元素\n                for (j = i - dk; j > 0 && A[0] < A[j]; j -= dk)\n                    A[j + dk] = A[j];    // 组内元素后移 dk 位\n                A[j + dk] = A[0];        // 回填\n            }\n        }\n    }\n}"
  },
  {
    "id": "code-ds-6-1-33",
    "topic": "ds-6-1",
    "chapter": "ds-6",
    "title": "希尔排序",
    "lang": "c",
    "explanation": "代码（增量按 $n/2, n/4, \\dots, 1$ 取）：",
    "code": "// 希尔排序（1-based，A[0] 是暂存单元）\nvoid ShellSort(ElemType A[], int n) {\n    int d, i, j;\n    // A[0] 只是暂存单元，不是哨兵；j <= 0 时插入位置已到\n    for (d = n / 2; d >= 1; d = d / 2) {       // 步长变化\n        for (i = d + 1; i <= n; ++i) {\n            if (A[i] < A[i - d]) {             // 需将 A[i] 插入本组有序表\n                A[0] = A[i];                   // 暂存在 A[0]\n                for (j = i - d; j > 0 && A[0] < A[j]; j -= d)\n                    A[j + d] = A[j];           // 记录后移，查找插入位置\n                A[j + d] = A[0];               // 插入\n            }\n        }\n    }\n}"
  },
  {
    "id": "code-ds-6-1-34",
    "topic": "ds-6-1",
    "chapter": "ds-6",
    "title": "冒泡排序",
    "lang": "c",
    "explanation": "代码（从左往右，把大的送到末尾）：",
    "code": "void BubbleSort(ElemType A[], int n) {\n    for (int i = 1; i < n; i++) {\n        bool flag = false;                 // 本趟是否发生交换\n        for (int j = 1; j <= n - i; j++) {\n            if (A[j] > A[j + 1]) {         // 严格大于才交换，保证稳定\n                swap(A[j], A[j + 1]);\n                flag = true;\n            }\n        }\n        if (!flag) break;                  // 本趟无交换，已经有序\n    }\n}"
  },
  {
    "id": "code-ds-6-1-35",
    "topic": "ds-6-1",
    "chapter": "ds-6",
    "title": "冒泡排序",
    "lang": "c",
    "explanation": "swap 的定义见下面的完整代码。",
    "code": "// 交换\nvoid swap(ElemType &a, ElemType &b) {\n    ElemType temp = a;\n    a = b;\n    b = temp;\n}\n\n// 冒泡排序（0-based，从右往左把小的换到前面）\nvoid BubbleSort(ElemType A[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        bool flag = false;                 // 表示本趟冒泡是否发生交换\n        for (int j = n - 1; j > i; j--) {  // 一趟冒泡过程\n            if (A[j - 1] > A[j]) {         // 若为逆序\n                swap(A[j - 1], A[j]);      // 交换\n                flag = true;\n            }\n        }\n        if (flag == false) return;         // 本趟无交换，说明表已经有序\n    }\n}"
  },
  {
    "id": "code-ds-6-1-36",
    "topic": "ds-6-1",
    "chapter": "ds-6",
    "title": "快速排序",
    "lang": "c",
    "explanation": "划分的核心代码：",
    "code": "int Partition(ElemType A[], int low, int high) {\n    ElemType pivot = A[low];              // 第一个元素作枢轴\n    while (low < high) {\n        while (low < high && A[high] >= pivot) --high;\n        A[low] = A[high];                 // 右边比枢轴小的填到左坑\n        while (low < high && A[low] <= pivot) ++low;\n        A[high] = A[low];                 // 左边比枢轴大的填到右坑\n    }\n    A[low] = pivot;                       // 枢轴回填到最终位置\n    return low;\n}"
  },
  {
    "id": "code-ds-6-1-37",
    "topic": "ds-6-1",
    "chapter": "ds-6",
    "title": "快速排序",
    "lang": "c",
    "explanation": "内层的 >= / <= 不能随便改成 > / <：等于枢轴的元素要跳过，否则 low、high 可能停在相等元素上，划分无法正常收缩。也正因为相等元素会被跨位置搬运，快速排序不稳定。",
    "code": "// 用第一个元素把 A[low..high] 划分成左右两部分\nint Partition(ElemType A[], int low, int high) {\n    ElemType pivot = A[low];              // 第一个元素作为枢轴\n    while (low < high) {                  // low、high 相向而行\n        while (low < high && A[high] >= pivot) --high;\n        A[low] = A[high];                 // 比枢轴小的移到左端\n        while (low < high && A[low] <= pivot) ++low;\n        A[high] = A[low];                 // 比枢轴大的移到右端\n    }\n    A[low] = pivot;                       // 枢轴放到最终位置\n    return low;\n}\n\nvoid QuickSort(ElemType A[], int low, int high) {\n    if (low < high) {                     // 子表长度大于 1 才需要划分\n        int pivotpos = Partition(A, low, high);\n        QuickSort(A, low, pivotpos - 1);  // 递归左子表\n        QuickSort(A, pivotpos + 1, high); // 递归右子表\n    }\n}"
  },
  {
    "id": "code-ds-6-1-38",
    "topic": "ds-6-1",
    "chapter": "ds-6",
    "title": "简单选择排序",
    "lang": "c",
    "explanation": "代码：",
    "code": "void SelectSort(ElemType A[], int n) {\n    for (int i = 1; i < n; i++) {        // 一共 n-1 趟\n        int min = i;                     // 最小值指针，先指向无序区第一个\n        for (int j = i + 1; j <= n; j++)\n            if (A[j] < A[min]) min = j;  // 更新最小值位置\n        if (min != i) swap(A[i], A[min]);\n    }\n}"
  },
  {
    "id": "code-ds-6-1-39",
    "topic": "ds-6-1",
    "chapter": "ds-6",
    "title": "简单选择排序",
    "lang": "c",
    "explanation": "swap 的定义见下面的完整代码。",
    "code": "void swap(ElemType &a, ElemType &b) {\n    ElemType temp = a;\n    a = b;\n    b = temp;\n}\n\n// 简单选择排序（0-based）\nvoid SelectSort(ElemType A[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        int min = i;\n        for (int j = i + 1; j < n; j++)\n            if (A[j] < A[min]) min = j;\n        if (min != i) swap(A[i], A[min]);\n    }\n}"
  },
  {
    "id": "code-ds-6-1-40",
    "topic": "ds-6-1",
    "chapter": "ds-6",
    "title": "堆排序",
    "lang": "c",
    "explanation": "核心代码：",
    "code": "void HeadAdjust(ElemType A[], int k, int len) {\n    A[0] = A[k];                         // 暂存子树的根\n    for (int i = 2 * k; i <= len; i *= 2) {\n        if (i < len && A[i] < A[i + 1]) i++; // 取较大的孩子\n        if (A[0] >= A[i]) break;         // 根已经不小于孩子，停止\n        A[k] = A[i];                     // 孩子上移\n        k = i;                           // 继续沿这个孩子往下检查\n    }\n    A[k] = A[0];                         // 放回最终位置\n}\n\nvoid BuildMaxHeap(ElemType A[], int len) {\n    for (int i = len / 2; i > 0; i--)    // 从最后一个分支结点往前\n        HeadAdjust(A, i, len);\n}"
  },
  {
    "id": "code-ds-6-1-41",
    "topic": "ds-6-1",
    "chapter": "ds-6",
    "title": "堆排序",
    "lang": "c",
    "explanation": "排序过程：建好大根堆后，堆顶 A[1] 是当前最大值。把 A[1] 和当前堆底 A[i] 交换，最大值就放到了最终位置；堆的有效长度减 1，再对新的堆顶做一次下坠，恢复大根堆。重复 $n-1$ 次，得到递增序列。",
    "code": "void swap(ElemType &a, ElemType &b) {\n    ElemType temp = a;\n    a = b;\n    b = temp;\n}\n\n// 将以 k 为根的子树调整为大根堆\nvoid HeadAdjust(ElemType A[], int k, int len) {\n    A[0] = A[k];                          // A[0] 暂存子树的根\n    for (int i = 2 * k; i <= len; i *= 2) {\n        if (i < len && A[i] < A[i + 1]) i++; // 取较大的孩子\n        if (A[0] >= A[i]) break;\n        A[k] = A[i];\n        k = i;\n    }\n    A[k] = A[0];\n}\n\nvoid BuildMaxHeap(ElemType A[], int len) {\n    for (int i = len / 2; i > 0; i--)\n        HeadAdjust(A, i, len);\n}\n\nvoid HeapSort(ElemType A[], int len) {\n    BuildMaxHeap(A, len);                 // 初始建堆\n    for (int i = len; i > 1; i--) {       // n-1 趟\n        swap(A[i], A[1]);                 // 堆顶最大值放到堆底\n        HeadAdjust(A, 1, i - 1);          // 恢复剩余部分的大根堆\n    }\n}"
  },
  {
    "id": "code-ds-6-1-42",
    "topic": "ds-6-1",
    "chapter": "ds-6",
    "title": "归并排序",
    "lang": "c",
    "explanation": "合并的核心代码：",
    "code": "ElemType *B;  // 辅助数组，大小至少 n+1\n\nvoid Merge(ElemType A[], int low, int mid, int high) {\n    int i, j, k;\n    for (k = low; k <= high; k++)\n        B[k] = A[k];                       // 先把 A[low..high] 复制到 B\n    for (i = low, j = mid + 1, k = i;\n         i <= mid && j <= high; k++) {\n        if (B[i] <= B[j]) A[k] = B[i++];   // 相等时取左边，保证稳定\n        else A[k] = B[j++];\n    }\n    while (i <= mid) A[k++] = B[i++];      // 左边剩下的直接接上\n    while (j <= high) A[k++] = B[j++];     // 右边剩下的直接接上\n}"
  },
  {
    "id": "code-ds-6-1-43",
    "topic": "ds-6-1",
    "chapter": "ds-6",
    "title": "归并排序",
    "lang": "c",
    "explanation": "if 里必须写 <= 而不是 <：两个元素相等时先取左边的，相等记录的相对次序才不会变；写成 < 就可能先取右边的，稳定性被破坏。",
    "code": "#include <stdlib.h>\n\nElemType *B;  // 辅助数组，调用前分配，大小至少 n+1\n\n// A[low..mid] 和 A[mid+1..high] 各自有序，把它们归并成一个有序表\nvoid Merge(ElemType A[], int low, int mid, int high) {\n    int i, j, k;\n    for (k = low; k <= high; k++)\n        B[k] = A[k];                       // 复制到辅助数组\n    for (i = low, j = mid + 1, k = i;\n         i <= mid && j <= high; k++) {\n        if (B[i] <= B[j])\n            A[k] = B[i++];                 // 取较小的，相等取左边\n        else\n            A[k] = B[j++];\n    }\n    while (i <= mid) A[k++] = B[i++];\n    while (j <= high) A[k++] = B[j++];\n}\n\nvoid MergeSort(ElemType A[], int low, int high) {\n    if (low < high) {\n        int mid = (low + high) / 2;        // 从中间划分\n        MergeSort(A, low, mid);            // 递归左半部分\n        MergeSort(A, mid + 1, high);       // 递归右半部分\n        Merge(A, low, mid, high);          // 合并两个有序子表\n    }\n}\n\nvoid MergeSortAll(ElemType A[], int n) {\n    B = (ElemType *)malloc((n + 1) * sizeof(ElemType));\n    MergeSort(A, 1, n);\n    free(B);\n}"
  },
  {
    "id": "code-ds-6-1-44",
    "topic": "ds-6-1",
    "chapter": "ds-6",
    "title": "基数排序",
    "lang": "c",
    "explanation": "入队 / 出队的细节：每个桶是一个 FIFO 队列。分配时只能挂到队尾（空队列时 front = rear = p，否则 rear->next = p; rear = p）；收集时只能从队头出队（front = front->next）。如果插到队头或从队尾取，同一 digit 内的相对次序就反了，LSD 的稳定性会被破坏。",
    "code": "#include <stdlib.h>\n\n// 对非负整数排序：d 是位数，r 是基数（十进制 r=10）\nvoid RadixSort(int A[], int n, int d, int r) {\n    int *bucket = (int *)malloc(n * sizeof(int));\n    int *count = (int *)malloc(r * sizeof(int));\n    int exp = 1;\n\n    for (int pass = 0; pass < d; pass++) {\n        for (int i = 0; i < r; i++) count[i] = 0;\n        for (int i = 0; i < n; i++)\n            count[(A[i] / exp) % r]++;       // 统计当前位各数字的个数\n\n        for (int i = 1; i < r; i++)\n            count[i] += count[i - 1];        // 前缀和：每个桶的结束位置\n\n        for (int i = n - 1; i >= 0; i--) {   // 从后往前扫，保证稳定\n            int digit = (A[i] / exp) % r;\n            bucket[--count[digit]] = A[i];\n        }\n        for (int i = 0; i < n; i++)\n            A[i] = bucket[i];                // 收集回 A\n\n        exp *= r;                            // 处理下一位\n    }\n\n    free(bucket);\n    free(count);\n}"
  }
];
