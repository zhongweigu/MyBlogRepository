/**
 * 内存管理真题：选择题按 408 原题整理，综合题保留分问。
 */
export const MEMORY_QUESTIONS = [
  {
    id: 'q-2010-os-bestfit',
    year: 2010,
    no: '',
    label: '真题',
    subject: 'os',
    chapter: 'os-4',
    topics: ['os-4-1'],
    type: '选择',
    difficulty: 3,
    score: '2 分',
    tags: ['动态分区', '最佳适应', '外部碎片'],
    stem: `<p>某基于动态分区存储管理的计算机，其主存容量为 55MB（初始为空闲），采用最佳适配（Best Fit）算法。分配和释放的顺序如下：</p>
<div class="q-table-wrap"><table>
<thead><tr><th>步骤</th><th>操作</th><th>大小</th></tr></thead>
<tbody>
<tr><td>1</td><td>分配</td><td>15MB</td></tr>
<tr><td>2</td><td>分配</td><td>30MB</td></tr>
<tr><td>3</td><td>释放</td><td>15MB</td></tr>
<tr><td>4</td><td>分配</td><td>8MB</td></tr>
<tr><td>5</td><td>分配</td><td>6MB</td></tr>
</tbody>
</table></div>
<p>此时主存中最大空闲分区的大小是（ ）。</p>`,
    options: ['7MB', '9MB', '10MB', '15MB'],
    answer: 'B',
    analysis: `<p>初始 [0,55]。分配 15 → 空闲 [15,40]；分配 30 → 空闲 [45,10]；释放 15 → 空闲 [0,15] 与 [45,10]。</p><p>分配 8：最佳适应选最小够用的 10，切出 [45,8]，剩余 [53,2]；分配 6：选 15，切出 [0,6]，剩余 [6,9]。最大空闲区为 9MB。</p>`,
  },
  {
    id: 'q-2017-os-bestfit',
    year: 2017,
    no: '',
    label: '真题',
    subject: 'os',
    chapter: 'os-4',
    topics: ['os-4-1'],
    type: '选择',
    difficulty: 4,
    score: '2 分',
    tags: ['最佳适应', '空闲分区链', '回收合并'],
    stem: `<p>某计算机按字节编址，其动态分区内存管理采用最佳适应算法，每次分配和回收内存后都对空闲分区链重新排序。当前空闲分区信息如下表所示：</p>
<div class="q-table-wrap"><table>
<thead><tr><th>空闲区起始地址</th><th>20K</th><th>500K</th><th>1000K</th><th>200K</th></tr></thead>
<tbody><tr><td>分区大小</td><td>40KB</td><td>80KB</td><td>100KB</td><td>200KB</td></tr></tbody>
</table></div>
<p>回收起始地址为 60K、大小为 140KB 的分区后，系统中空闲分区的数量、空闲分区链第一个分区的起始地址和大小分别是（ ）。</p>`,
    options: ['3、20K、380KB', '3、500K、80KB', '4、20K、180KB', '4、500K、80KB'],
    answer: 'B',
    analysis: `<p>回收区 [60K,200K) 与前面的 [20K,60K) 相邻，又与后面的 [200K,400K) 首尾相接，三块合并为 [20K,400K)，大小 380KB。空闲区只剩 380KB、80KB、100KB，共 3 个。</p><p>最佳适应按容量递增排序，最小的是 500K 处的 80KB，所以链首为 500K、80KB。</p>`,
  },
  {
    id: 'q-2019-os-fragment',
    year: 2019,
    no: '',
    label: '真题',
    subject: 'os',
    chapter: 'os-4',
    topics: ['os-4-1'],
    type: '选择',
    difficulty: 2,
    score: '2 分',
    tags: ['动态分区', '碎片', '最佳适应'],
    stem: `<p>在下列动态分区分配算法中，最容易产生内存碎片的是（ ）。</p>`,
    options: ['首次适应算法', '最坏适应算法', '最佳适应算法', '循环首次适应算法'],
    answer: 'C',
    analysis: `<p>最佳适应总选“最小够用”的空闲区，切分后剩下的空闲区最小，最容易形成大量难以再利用的小碎片。</p>`,
  },
  {
    id: 'q-2010-os-pagedir',
    year: 2010,
    no: '',
    label: '真题',
    subject: 'os',
    chapter: 'os-4',
    topics: ['os-4-2'],
    type: '选择',
    difficulty: 4,
    score: '2 分',
    tags: ['二级页表', '页目录', '页表项'],
    stem: `<p>某计算机采用二级页表的分页存储管理方式，按字节编址，页大小为 2<sup>10</sup> 字节，页表项大小为 2 字节。逻辑地址结构为：</p>
<pre><code class="language-text">页目录号 | 页号 | 页内偏移量</code></pre>
<p>逻辑地址空间大小为 2<sup>16</sup> 页，则表示逻辑地址空间的页目录表中表项的个数至少是（ ）。</p>`,
    options: ['64', '128', '256', '512'],
    answer: 'B',
    analysis: `<p>一个页表能容纳的页表项数 = 页大小 / 页表项大小 = 2¹⁰ / 2 = 2⁹ = 512。逻辑空间共 2¹⁶ 页，需要 2¹⁶ / 2⁹ = 2⁷ = 128 个二级页表，所以页目录至少有 128 个表项。</p>`,
  },
  {
    id: 'q-2019-os-sharedseg',
    year: 2019,
    no: '',
    label: '真题',
    subject: 'os',
    chapter: 'os-4',
    topics: ['os-4-3'],
    type: '选择',
    difficulty: 3,
    score: '2 分',
    tags: ['分段', '共享段表', '段号'],
    stem: `<p>在分段存储管理系统中，用共享段表描述所有被共享的段。若进程 P1 和 P2 共享段 S，下列叙述中错误的是（ ）。</p>`,
    options: ['在物理内存中仅保存一份段 S 的内容', '段 S 在 P1 和 P2 中应该具有相同的段号', 'P1 和 P2 共享段 S 在共享段表中的段表项', 'P1 和 P2 都不再使用段 S 时才回收段 S 所占的内存空间'],
    answer: 'B',
    analysis: `<p>共享段在物理内存只存一份，共享段表项记录共享计数/权限，两个进程的段表项可指向同一物理段；但段号是进程内编号，P1、P2 可以使用不同段号指向同一个共享段，不要求相同。</p>`,
  },
  {
    id: 'q-2020-os-eat',
    year: 2020,
    no: '',
    label: '真题',
    subject: 'os',
    chapter: 'os-4',
    topics: ['os-4-4'],
    type: '选择',
    difficulty: 3,
    score: '2 分',
    tags: ['有效访问时间', '缺页率', '请求分页'],
    stem: `<p>下列因素中，影响请求分页系统有效（平均）访存时间的是（ ）。</p>
<div class="q-table-wrap"><table>
<thead><tr><th>编号</th><th>因素</th></tr></thead>
<tbody>
<tr><td>I</td><td>缺页率</td></tr>
<tr><td>II</td><td>磁盘读写时间</td></tr>
<tr><td>III</td><td>内存访问时间</td></tr>
<tr><td>IV</td><td>执行缺页处理程序的 CPU 时间</td></tr>
</tbody>
</table></div>`,
    options: ['仅 II、III', '仅 I、IV', '仅 I、III、IV', 'I、II、III 和 IV'],
    answer: 'D',
    analysis: `<p>有效访存时间 = 命中/缺页概率加权：缺页率决定进入缺页处理的频率；缺页时要读写磁盘、执行缺页处理程序（CPU 时间）；正常访存要访问内存。四项都影响。</p>`,
  },
  {
    id: 'q-2011-os-thrash',
    year: 2011,
    no: '',
    label: '真题',
    subject: 'os',
    chapter: 'os-4',
    topics: ['os-4-4'],
    type: '选择',
    difficulty: 3,
    score: '2 分',
    tags: ['抖动', '多道程度', '工作集'],
    stem: `<p>当系统发生抖动（thrashing）时，可采取的有效措施是（ ）。</p>
<ul>
<li>I. 撤销部分进程</li>
<li>II. 增加磁盘交换区的容量</li>
<li>III. 提高用户进程的优先级</li>
</ul>`,
    options: ['仅 I', '仅 II', '仅 III', '仅 I、II'],
    answer: 'A',
    analysis: `<p>抖动的根因是并发进程太多、每个进程驻留集太小。撤销部分进程可降低多道程度、把页框还给剩余进程；扩大交换区、提高优先级都不能增加驻留集或减少缺页。</p>`,
  },
  {
    id: 'q-2014-os-tlb',
    year: 2014,
    no: '',
    label: '真题',
    subject: 'os',
    chapter: 'os-4',
    topics: ['os-4-2'],
    type: '选择',
    difficulty: 3,
    score: '2 分',
    tags: ['TLB', '页表', '地址转换'],
    stem: `<p>下列措施中，能加快虚实地址转换的是（ ）。</p>
<ul>
<li>I. 增大快表（TLB）容量</li>
<li>II. 让页表常驻内存</li>
<li>III. 增大交换区（swap）</li>
</ul>`,
    options: ['仅 I', '仅 II', '仅 I、II', '仅 II、III'],
    answer: 'C',
    analysis: `<p>增大 TLB 提高命中率；页表常驻内存避免“查页表时页表本身缺页”；交换区大小影响缺页调入，不直接加快地址转换。</p>`,
  },
  {
    id: 'q-2016-os-workset',
    year: 2016,
    no: '',
    label: '真题',
    subject: 'os',
    chapter: 'os-4',
    topics: ['os-4-4'],
    type: '选择',
    difficulty: 3,
    score: '2 分',
    tags: ['工作集', '局部性'],
    stem: `<p>某进程访问页面的序列如下图所示（省略号表示前后还有访问）：</p>
<pre><code class="language-text">…，1，3，4，5，6，0，3，2，3，2，0，4，0，3，2，9，2，1，…</code></pre>
<p>若工作集的窗口大小为 6，则在 t 时刻（第二个 2 之后）的工作集为（ ）。</p>`,
    options: ['{6,0,3,2}', '{2,3,0,4}', '{0,4,3,2,9}', '{4,5,6,0,3,2}'],
    answer: 'A',
    analysis: `<p>窗口取 t 时刻之前最近的 6 次访问：6、0、3、2、3、2；按页面集合去重得到 {6,0,3,2}。工作集是“窗口内访问过的不同页面”，不是 6 个页面编号。</p>`,
  },
  {
    id: 'q-2022-os-faultrate',
    year: 2022,
    no: '',
    label: '真题',
    subject: 'os',
    chapter: 'os-4',
    topics: ['os-4-4'],
    type: '选择',
    difficulty: 2,
    score: '2 分',
    tags: ['缺页率', '页缓冲'],
    stem: `<p>下列选项中，不会影响系统缺页率的是（ ）。</p>`,
    options: ['页置换算法', '工作集的大小', '进程的数量', '页缓冲队列的长度'],
    answer: 'D',
    analysis: `<p>置换算法决定换出哪页，工作集/进程数决定每个进程分到多少页框，都会影响缺页率；页缓冲队列长度影响换出/换入的延迟和写回，但不改变“访问是否命中”的判定。</p>`,
  },
  {
    id: 'q-2015-os-46',
    year: 2015,
    no: '46',
    label: '真题',
    subject: 'os',
    chapter: 'os-4',
    topics: ['os-4-2'],
    type: '综合',
    difficulty: 4,
    score: '8 分',
    tags: ['二级页表', '页目录', '页表大小'],
    stem: `<p>某计算机系统按字节编址，采用二级页表的分页存储管理方式，虚拟地址格式为：</p>
<pre><code class="language-text">31          22 21          12 11           0
+-------------+--------------+--------------+
| 页目录号(10) | 页号(10)     | 页内偏移(12) |
+-------------+--------------+--------------+</code></pre>
<p>请回答下列问题：</p>
<ol>
<li>页和页框的大小各为多少字节？进程的虚拟地址空间大小为多少页？</li>
<li>假定页目录项和页表项均占 4 个字节，则进程的页目录和页表共占多少页？要求写出计算过程。</li>
<li>若某指令周期内访问的虚拟地址为 <code>0100 0000H</code> 和 <code>0111 2048H</code>，则进行地址转换时共访问多少个二级页表？要求说明理由。</li>
</ol>`,
    answer: '',
    analysis: `<p>（1）页内偏移 12 位 → 页/页框 2¹² = 4KB；页目录号 10 位 + 页号 10 位 = 20 位页号，虚拟地址空间 2²⁰ 页。</p><p>（2）页目录：2¹⁰ 项 × 4B = 4KB = 1 页；二级页表共 2¹⁰ 张，每张 2¹⁰ 项 × 4B = 4KB = 1 页；合计 1 + 2¹⁰ = 1025 页。</p><p>（3）两个地址的页目录号都是 4（都落在 0100 0000H～013F FFFFH 这 4MB 范围），使用同一个页目录项指向的同一张二级页表；页号分别是 0 和 0x112，但都在同一张表内。因此共访问 1 个二级页表。</p>`,
  },
  {
    id: 'q-2013-os-46',
    year: 2013,
    no: '46',
    label: '真题',
    subject: 'os',
    chapter: 'os-4',
    topics: ['os-4-2'],
    type: '综合',
    difficulty: 5,
    score: '8 分',
    tags: ['一级页表', '二级页表', '页表项物理地址'],
    stem: `<p>某计算机主存按字节编址，逻辑地址和物理地址都是 32 位，页表项大小为 4 字节。请回答下列问题：</p>
<ol>
<li>若使用一级页表，逻辑地址结构为：<pre><code class="language-text">页号(20 位) | 页内偏移量(12 位)</code></pre>页的大小是多少字节？页表最大占用多少字节？</li>
<li>若使用二级页表，逻辑地址结构为：<pre><code class="language-text">页目录号(10 位) | 页号(10 位) | 页内偏移量(12 位)</code></pre>设逻辑地址为 LA，分别给出页目录号和页号的表达式。</li>
<li>采用第一问的一级页表，一个代码段起始逻辑地址为 <code>0000 8000H</code>，长度 8KB，被装载到从物理地址 <code>0090 0000H</code> 开始的连续主存空间；页表从物理地址 <code>0020 0000H</code> 开始连续存放。计算该代码段对应的两个页表项的物理地址、这两个页表项中的页框号，以及代码页 2 的起始物理地址。</li>
</ol>`,
    answer: '',
    analysis: `<p>（1）偏移 12 位 → 页大小 4KB；页号 20 位 → 2²⁰ 个页表项，页表最大 2²⁰ × 4B = 4MB。</p><p>（2）页目录号 = LA &gt;&gt; 22；页号 = (LA &gt;&gt; 12) &amp; 0x3FF。</p><p>（3）代码段从 0000 8000H 起 8KB，跨页号 8、9：PTE 地址分别为 0020 0000H + 8×4 = <strong>0020 0020H</strong>、+9×4 = <strong>0020 0024H</strong>；物理页框为 00900H、00901H；代码页 2 起始物理地址 = <strong>0090 1000H</strong>。</p>`,
  },
  {
    id: 'q-2020-os-46',
    year: 2020,
    no: '46',
    label: '真题',
    subject: 'os',
    chapter: 'os-4',
    topics: ['os-4-2'],
    type: '综合',
    difficulty: 5,
    score: '8 分',
    tags: ['二级页表', '数组', '局部性'],
    stem: `<p>某 32 位系统采用基于二级页表的请求分页存储管理方式，按字节编址，页目录项和页表项长度均为 4 字节，虚拟地址结构为：</p>
<pre><code class="language-text">31          22 21          12 11           0
+-------------+--------------+--------------+
| 页目录号(10) | 页号(10)     | 页内偏移(12) |
+-------------+--------------+--------------+</code></pre>
<p>某 C 程序中数组 <code>a[1024][1024]</code> 的起始虚拟地址为 <code>1080 0000H</code>，数组元素占 4 字节。该程序运行时，其进程的页目录起始物理地址为 <code>0020 1000H</code>。请回答：</p>
<ol>
<li>数组元素 <code>a[1][2]</code> 的虚拟地址是什么？对应的页目录号和页号分别是什么？对应的页目录项的物理地址是什么？若该目录项中存放的页框号为 <code>00301H</code>，则 <code>a[1][2]</code> 所在页对应的页表项的物理地址是什么？</li>
<li>数组 a 在虚拟地址空间中所占区域是否必须连续？在物理地址空间中所占区域是否必须连续？</li>
<li>已知数组 a 按行优先方式存放，若对数组 a 分别按行遍历和按列遍历，哪一种遍历方式的局部性更好？</li>
</ol>`,
    answer: '',
    analysis: `<p>（1）a[1][2] 偏移 = (1×1024+2)×4 = 0x1008，VA = 1080 0000H + 1008H = <strong>1080 1008H</strong>。页目录号 = 1080 1008H &gt;&gt; 22 = 66；页号 = (VA &gt;&gt; 12) &amp; 0x3FF = 1。页目录项物理地址 = 0020 1000H + 66×4 = <strong>0020 1108H</strong>；该目录项页框号 00301H → 页表基址 0030 1000H，页表项地址 = +1×4 = <strong>0030 1004H</strong>。</p><p>（2）数组在虚拟地址空间按行优先连续定义，所以虚拟地址连续；每个虚拟页可映射到任意物理页框，物理地址不一定连续。</p><p>（3）按行遍历：同一行元素在同一页/相邻页，空间局部性好；按列遍历每次跨 4KB，局部性差。</p>`,
  },
  {
    id: 'q-2009-os-46',
    year: 2009,
    no: '46',
    label: '真题',
    subject: 'os',
    chapter: 'os-4',
    topics: ['os-4-2', 'os-4-4'],
    type: '综合',
    difficulty: 5,
    score: '8 分',
    tags: ['TLB', '缺页', 'LRU', '物理地址'],
    stem: `<p>请求分页管理系统中，某进程的页表内容如下：</p>
<div class="q-table-wrap"><table>
<thead><tr><th>页号</th><th>页框号</th><th>有效位</th></tr></thead>
<tbody>
<tr><td>0</td><td>101H</td><td>1</td></tr>
<tr><td>1</td><td>—</td><td>0</td></tr>
<tr><td>2</td><td>254H</td><td>1</td></tr>
</tbody>
</table></div>
<p>页面大小 4KB，一次内存访问 100ns，一次 TLB 访问 10ns，处理一次缺页平均 10<sup>8</sup>ns（已含更新 TLB/页表时间），进程驻留集固定为 2，采用 LRU 和局部淘汰。TLB 初始为空；地址转换先查 TLB，未命中再查页表（忽略查表后更新 TLB 的时间）；有效位 0 表示不在内存，缺页处理后返回原指令重新执行。访问序列：</p>
<pre><code class="language-text">2362H, 1565H, 25A5H</code></pre>
<p>求：（1）依次访问三个地址各需多少时间？给出计算过程。（2）1565H 的物理地址是多少？说明理由。</p>`,
    answer: '',
    analysis: `<p>（1）2362H：页号 2，TLB 未命中，10 + 100 + 100 = <strong>210ns</strong>。1565H：页号 1，有效位 0，10 + 100 + 10⁸ + 10 + 100 = <strong>100 000 220ns</strong>。25A5H：页号 2，TLB 已有页 2，10 + 100 = <strong>110ns</strong>。</p><p>（2）驻留集 2 页，缺页时 LRU 淘汰页 0（页 2 刚访问过），页 1 装入页框 101H；1565H 偏移 565H → 物理地址 <strong>101565H</strong>。</p>`,
  },
  {
    id: 'q-2012-os-45',
    year: 2012,
    no: '45',
    label: '真题',
    subject: 'os',
    chapter: 'os-4',
    topics: ['os-4-4'],
    type: '综合',
    difficulty: 5,
    score: '8 分',
    tags: ['局部置换', '空闲页框链', '时间局部性'],
    stem: `<p>某请求分页系统的局部页面置换策略如下：从 0 时刻开始，每隔 5 个时间单位扫描一轮驻留集；本轮没有被访问过的页框被系统回收，放入空闲页框链尾，内容在下一次分配前不清空；缺页时，如果该页曾被使用过且还在空闲页框链表中，则重新放回进程驻留集；否则从空闲页框链表头取一个。</p>
<p>初始驻留集为空，空闲页框链依次为：</p>
<pre><code class="language-text">32, 15, 21, 41</code></pre>
<p>进程 P 的访问序列为：</p>
<div class="q-table-wrap"><table>
<thead><tr><th>虚拟页号</th><th>访问时刻</th></tr></thead>
<tbody>
<tr><td>1</td><td>1</td></tr>
<tr><td>3</td><td>2</td></tr>
<tr><td>0</td><td>4</td></tr>
<tr><td>0</td><td>6</td></tr>
<tr><td>1</td><td>11</td></tr>
<tr><td>0</td><td>13</td></tr>
<tr><td>2</td><td>14</td></tr>
</tbody>
</table></div>
<p>求：（1）访问 ⟨0,4⟩ 的页框号；（2）访问 ⟨1,11⟩ 的页框号及理由；（3）访问 ⟨2,14⟩ 的页框号及理由；（4）该策略是否适合时间局部性好的程序？说明理由。</p>`,
    answer: '',
    analysis: `<p>（1）初始取空闲链头 32 给页 1，15 给页 3，21 给页 0；⟨0,4⟩ 对应页框 <strong>21</strong>。</p><p>（2）第 10 时刻扫描时，页 1、页 3 本轮未被访问，页框 32、15 被回收到空闲链尾；⟨1,11⟩ 缺页，页 1 仍在空闲链中且内容未清，重新放回，页框 <strong>32</strong>。</p><p>（3）页 2 从未使用过，不在空闲链中；此时空闲链头为 41，取 <strong>41</strong>。</p><p>（4）<strong>适合。</strong>时间局部性越好，被回收的页越可能很快再次被访问；由于内容仍在空闲页框中，可重新放回而无需从磁盘调入，正好利用这一特性。</p>`,
  },
  {
    id: 'q-2017-os-45',
    year: 2017,
    no: '45',
    label: '真题',
    subject: 'os',
    chapter: 'os-4',
    topics: ['os-4-2', 'os-4-4'],
    type: '综合',
    difficulty: 4,
    score: '7 分',
    tags: ['页目录', '页表索引', 'scanf', '进程状态'],
    stem: `<p>按字节编址的计算机 M 采用二级分页虚拟存储管理方式，虚拟地址格式为：</p>
<pre><code class="language-text">31          22 21          12 11           0
+-------------+--------------+--------------+
| 页目录号(10) | 页表索引(10) | 页内偏移(12) |
+-------------+--------------+--------------+</code></pre>
<p>函数 f1 的代码段起始虚拟地址为 <code>0040 1000H</code>，其部分 C 代码与机器指令如下：</p>
<pre><code class="language-c">int f1(unsigned n) {
    int sum = 1, power = 1;
    for (unsigned i = 0; i &lt; n - 1; i++) {
        power *= 2;
        sum += power;
    }
    return sum;
}</code></pre>
<div class="q-table-wrap"><table>
<thead><tr><th>指令地址</th><th>机器码</th><th>汇编指令</th></tr></thead>
<tbody>
<tr><td>0040 1020H</td><td>55</td><td>push ebp</td></tr>
<tr><td>0040 105EH</td><td>39 4D F4</td><td>cmp dword ptr[ebp-0Ch], ecx</td></tr>
<tr><td>0040 1066H</td><td>D1 E2</td><td>shl edx, 1</td></tr>
<tr><td>0040 107FH</td><td>C3</td><td>ret</td></tr>
</tbody>
</table></div>
<p>请回答：（1）函数 f1 的机器指令代码占多少页？（2）取第 1 条指令（push ebp）时，若地址变换需要访问内存中的页目录和页表，分别访问它们各自的第几个表项（编号从 0 开始）？（3）M 的 I/O 采用中断控制方式。若进程 P 在调用 f1 之前通过 <code>scanf()</code> 获取 n 的值，则在执行 <code>scanf()</code> 的过程中，进程 P 的状态会如何变化？CPU 是否会进入内核态？</p>`,
    answer: '',
    analysis: `<p>（1）代码从 0040 1020H 到 0040 107FH，共 0x60 字节，位于同一个 4KB 页（0040 1000H～0040 1FFFH），占 <strong>1 页</strong>。</p><p>（2）VA 0040 1020H 的页目录号 = 1，页表索引 = 1，所以分别访问第 <strong>1</strong> 个页目录项、第 <strong>1</strong> 个页表项。</p><p>（3）scanf 要等待用户输入：P 从运行态变为阻塞/等待态；执行系统调用和设备中断处理时 CPU 进入内核态；输入完成后中断处理唤醒 P，P 变为就绪态，之后可能被调度为运行态。</p>`,
  },
];
