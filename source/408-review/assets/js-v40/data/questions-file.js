/**
 * 文件管理真题：2009–2025。选择题按原题整理，综合题保留分问。
 */
export const FILE_QUESTIONS = [
  {
    id: 'q-2016-os-47', year: 2016, no: '47', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-1', 'os-5-3'], type: '综合', difficulty: 5, score: '9 分',
    tags: ['FAT', '链接分配', '目录', '簇'],
    stem: `<p>某磁盘文件系统使用链接分配方式组织文件，簇大小为 4KB。目录文件的每个目录项包括“文件名 + 文件的第一个簇号”，其余簇号存放在文件分配表 FAT 中。目录树与各文件占用的簇号如下：</p>
<pre><code class="language-text">dir
├── dir1
│   ├── file1
│   └── file2</code></pre>
<div class="q-table-wrap"><table><thead><tr><th>文件名</th><th>簇号</th></tr></thead><tbody>
<tr><td>dir</td><td>1</td></tr><tr><td>dir1</td><td>48</td></tr><tr><td>file1</td><td>100、106、108</td></tr><tr><td>file2</td><td>200、201、202</td></tr>
</tbody></table></div>
<ol>
<li>请给出所有目录文件的内容。</li>
<li>若 FAT 的每个表项仅存放簇号、占 2 字节，则 FAT 的最大长度为多少字节？该文件系统支持的文件长度最大是多少？</li>
<li>file1 的 106、108 两个簇号分别存放在 FAT 的哪个表项中？</li>
<li>假设仅 FAT 和 dir 目录文件已读入内存，若需将文件 dir/dir1/file1 的第 5000 个字节读入内存，则要访问哪几个簇？</li>
</ol>`,
    answer: '',
    analysis: `<p>（1）dir 的内容：<code>dir1 → 48</code>；dir1 的内容：<code>file1 → 100</code>、<code>file2 → 200</code>。</p><p>（2）簇号占 2B → 最多 2¹⁶ 个簇号，FAT 最长 2¹⁶×2B = 128KB；最大文件 2¹⁶×4KB = 256MB。</p><p>（3）FAT 是“当前簇号 → 下一簇号”：106 存放在表项 100 中，108 存放在表项 106 中。</p><p>（4）第 5000 字节：簇大小 4KB，5000/4096=1 余 904，落在 file1 的第二个簇 106。目录 dir1 的数据簇 48 不在内存，要先读它找到 file1 的首簇 100；FAT 已在内存，可直接由 100 查到 106。因此访问簇 <strong>48、106</strong>（不需要再读 100 的数据）。</p>`,
  },
  {
    id: 'q-2022-os-45', year: 2022, no: '45', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-1', 'os-5-3', 'os-5-4'], type: '综合', difficulty: 5, score: '7 分',
    tags: ['索引结点', '目录项', '间接地址', '文件打开'],
    stem: `<p>某文件系统磁盘块大小 4KB，目录项由文件名和索引结点号构成，每个索引结点占 256 字节，包含直接地址项 10 个，一级、二级、三级间接地址项各 1 个，每个地址项 4 字节。子目录 stu 的结构与文件信息如下：</p>
<pre><code class="language-text">stu
├── course
│   ├── course1
│   └── course2
└── doc</code></pre>
<div class="q-table-wrap"><table><thead><tr><th>文件名</th><th>索引结点号</th><th>磁盘块号</th></tr></thead><tbody>
<tr><td>stu</td><td>1</td><td>10</td></tr><tr><td>course</td><td>2</td><td>20</td></tr><tr><td>course1</td><td>10</td><td>30</td></tr><tr><td>course2</td><td>100</td><td>40</td></tr><tr><td>doc</td><td>10</td><td>x</td></tr>
</tbody></table></div>
<ol>
<li>目录文件 stu 中每个目录项的内容是什么？</li>
<li>文件 doc 占用的磁盘块的块号 x 是多少？</li>
<li>若目录文件 course 的内容已在内存，则打开文件 course1 并将其读入内存，需要读几个磁盘块？说明理由。</li>
<li>若文件 course2 的大小增长到 6MB，为了存取 course2，需要使用该文件索引结点的哪几级间接地址项？说明理由。</li>
</ol>`,
    answer: '',
    analysis: `<p>（1）stu 的目录项：<code>course → 2</code>、<code>doc → 10</code>。</p><p>（2）doc 与 course1 的索引结点号都是 10，说明它们共享同一个 inode/数据块；course1 的磁盘块是 30，所以 x=<strong>30</strong>。</p><p>（3）course 目录内容已在内存，打开 course1 仍需读它的 inode（inode 10）所在磁盘块，再读数据块 30，共 <strong>2 个磁盘块</strong>。</p><p>（4）6MB=1536 个 4KB 块。直接地址 10 块 + 一级间接 4KB/4B=1024 块，共 1034 块；还差 502 块，需要二级间接项。故使用<strong>一级和二级间接地址项</strong>，不需要三级。</p>`,
  },
  {
    id: 'q-2009-os-28', year: 2009, no: '28', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-3'], type: '选择', difficulty: 2, score: '2 分', tags: ['物理结构', '随机访问', '扩展'],
    stem: `<p>下列文件物理结构中，适合随机访问且易于文件扩展的是（ ）。</p>`,
    options: ['连续结构', '索引结构', '链式结构且磁盘块定长', '链式结构且磁盘块变长'], answer: 'B',
    analysis: `<p>索引结构通过索引块直接定位第 i 个块，支持随机访问；新增块只需分配盘块并修改索引，易于扩展。连续结构扩展困难，链式结构通常只能顺序访问。</p>`,
  },
  {
    id: 'q-2009-os-30', year: 2009, no: '30', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-1'], type: '选择', difficulty: 2, score: '2 分', tags: ['FCB', '访问控制'],
    stem: `<p>文件系统中，文件访问控制信息存储的合理位置是（ ）。</p>`,
    options: ['文件控制块', '文件分配表', '用户口令表', '系统注册表'], answer: 'A',
    analysis: `<p>文件访问控制信息（文件主、用户权限等）属于文件属性，放在 FCB/索引结点中。FAT 管盘块链接，口令表/注册表不是文件属性存储位置。</p>`,
  },
  {
    id: 'q-2009-os-31', year: 2009, no: '31', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-4'], type: '选择', difficulty: 3, score: '2 分', tags: ['硬链接', '软链接', '引用计数'],
    stem: `<p>设文件 F1 的当前引用计数值为 1，先建立 F1 的符号链接（软链接）文件 F2，再建立 F1 的硬链接文件 F3，然后删除 F1。此时，F2 和 F3 的引用计数值分别是（ ）。</p>`,
    options: ['0、1', '1、1', '1、2', '2、1'], answer: 'B',
    analysis: `<p>软链接 F2 是独立文件，有自己的 inode，计数为 1；硬链接 F3 与 F1 共享 inode，建立后计数 2，删除 F1 后计数 1。F2 的计数不随 F1 删除而变。</p>`,
  },
  {
    id: 'q-2010-os-30', year: 2010, no: '30', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-3'], type: '选择', difficulty: 4, score: '2 分', tags: ['混合索引', '最大文件'],
    stem: `<p>设文件索引结点中有 7 个地址项，其中 4 个是直接地址索引，2 个是一级间接地址索引，1 个是二级间接地址索引，每个地址项 4B。若磁盘索引块和磁盘数据块大小均为 256B，则可表示的单个文件最大长度是（ ）。</p>`,
    options: ['33KB', '519KB', '1057KB', '16513KB'], answer: 'C',
    analysis: `<p>每个索引块可存 256/4=64 个地址。直接：4×256B=1KB；一级：2×64×256B=32KB；二级：1×64²×256B=1024KB。合计 1+32+1024=1057KB。</p>`,
  },
  {
    id: 'q-2010-os-31', year: 2010, no: '31', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-4'], type: '选择', difficulty: 2, score: '2 分', tags: ['当前目录', '路径查找'],
    stem: `<p>设置当前工作目录的主要目的是（ ）。</p>`,
    options: ['节省外存空间', '节省内存空间', '加快文件的检索速度', '加快文件的读写速度'], answer: 'C',
    analysis: `<p>当前目录让相对路径从它开始查找，减少逐级从根目录检索的目录项，从而加快文件检索；不改变外存/内存占用或磁盘读写速度。</p>`,
  },
  {
    id: 'q-2011-os-26', year: 2011, no: '26', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-4'], type: '选择', difficulty: 2, score: '2 分', tags: ['磁盘I/O', '系统调用', '驱动程序'],
    stem: `<p>用户程序发出磁盘 I/O 请求后，系统的正确处理流程是（ ）。</p>`,
    options: ['用户程序→系统调用处理程序→中断处理程序→设备驱动程序', '用户程序→系统调用处理程序→设备驱动程序→中断处理程序', '用户程序→设备驱动程序→系统调用处理程序→中断处理程序', '用户程序→设备驱动程序→中断处理程序→系统调用处理程序'], answer: 'B',
    analysis: `<p>用户先陷入内核，由系统调用处理程序统一入口；再调用设备驱动程序启动 I/O；I/O 完成后设备发中断，进入中断处理程序收尾。</p>`,
  },
  {
    id: 'q-2012-os-28', year: 2012, no: '28', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-4'], type: '选择', difficulty: 3, score: '2 分', tags: ['read', '阻塞', '参数'],
    stem: `<p>若一个用户进程通过 read 系统调用读取一个磁盘文件中的数据，则下列关于此过程的叙述中，正确的是（ ）。</p><ul><li>I. 若该文件的数据不在内存中，则该进程进入睡眠等待状态</li><li>II. 请求 read 系统调用会导致 CPU 从用户态切换到核心态</li><li>III. read 系统调用的参数应包含文件的名称</li></ul>`,
    options: ['仅 I、II', '仅 I、III', '仅 II、III', 'I、II 和 III'], answer: 'A',
    analysis: `<p>read 需要磁盘 I/O 时进程阻塞睡眠；系统调用必然用户态→内核态；read 的参数是 fd、buf、count，不是文件名（文件名在 open 时已解析）。</p>`,
  },
  {
    id: 'q-2013-os-23', year: 2013, no: '23', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-1', 'os-5-4'], type: '选择', difficulty: 2, score: '2 分', tags: ['删除文件', '目录项'],
    stem: `<p>用户在删除某文件的过程中，操作系统不可能执行的操作是（ ）。</p>`,
    options: ['删除此文件所在的目录', '删除与此文件关联的目录项', '删除与此文件对应的文件控制块', '释放与此文件关联的内存缓冲区'], answer: 'A',
    analysis: `<p>删除一个文件只删除该文件的目录项、释放 FCB/数据块和缓存，不会把包含它的目录整个删除。</p>`,
  },
  {
    id: 'q-2013-os-24', year: 2013, no: '24', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-3'], type: '选择', difficulty: 3, score: '2 分', tags: ['CD-ROM', '连续结构', '视频'],
    stem: `<p>为支持 CD-ROM 中视频文件的快速随机播放，播放性能最好的文件数据块组织方式是（ ）。</p>`,
    options: ['连续结构', '链式结构', '直接索引结构', '多级索引结构'], answer: 'A',
    analysis: `<p>CD-ROM 视频通常是大文件、按顺序播放；连续结构让数据块相邻，寻道/读取开销最小，播放性能最好。随机定位到某段也只需块号计算。</p>`,
  },
  {
    id: 'q-2013-os-26', year: 2013, no: '26', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-1', 'os-5-3'], type: '选择', difficulty: 2, score: '2 分', tags: ['inode', '文件长度'],
    stem: `<p>若某文件系统索引结点（inode）中有直接地址项和间接地址项，则下列选项中，与单个文件长度无关的因素是（ ）。</p>`,
    options: ['索引结点的总数', '间接地址索引的级数', '地址项的个数', '文件块大小'], answer: 'A',
    analysis: `<p>单个文件最大长度由直接/间接地址项个数、间接级数、块大小决定；索引结点总数决定文件个数上限，不决定某一个文件能有多长。</p>`,
  },
  {
    id: 'q-2014-os-29', year: 2014, no: '29', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-1', 'os-5-4'], type: '选择', difficulty: 2, score: '2 分', tags: ['open', 'FCB', '首次打开'],
    stem: `<p>在一个文件被用户进程首次打开的过程中，操作系统需要做的是（ ）。</p>`,
    options: ['将文件内容读到内存中', '将文件控制块读到内存中', '修改文件控制块中的读写权限', '将文件的数据缓冲区首指针返回给用户进程'], answer: 'B',
    analysis: `<p>open 只把文件的 FCB/索引结点调入内存、建立打开文件表项并返回 fd，不读文件正文；权限检查是读取，不是修改。</p>`,
  },
  {
    id: 'q-2017-os-31', year: 2017, no: '31', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-1', 'os-5-4'], type: '选择', difficulty: 4, score: '2 分', tags: ['硬链接', '打开文件表', '读写指针'],
    stem: `<p>若文件 f1 的硬链接为 f2，两个进程分别打开 f1 和 f2，获得对应的文件描述符为 fd1 和 fd2，则下列叙述中，正确的是（ ）。</p><ul><li>I. f1 和 f2 的读写指针位置保持相同</li><li>II. f1 和 f2 共享同一个内存索引结点</li><li>III. fd1 和 fd2 分别指向各自的用户打开文件表中的一项</li></ul>`,
    options: ['仅 III', '仅 II、III', '仅 I、II', 'I、II 和 III'], answer: 'B',
    analysis: `<p>硬链接共享同一个 inode，所以 II 对；两个进程各自 open，进程打开文件表各有表项，fd 不同，III 对；每次 open 建立自己的系统打开文件表项和读写偏移，I 错。</p>`,
  },
  {
    id: 'q-2018-os-31', year: 2018, no: '31', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-3', 'os-5-4'], type: '选择', difficulty: 3, score: '2 分', tags: ['文件访问速度', '预读', '缓存'],
    stem: `<p>下列优化方法中，可以提高文件访问速度的是（ ）。</p><ul><li>I. 提前读</li><li>II. 为文件分配连续的簇</li><li>III. 延迟写</li><li>IV. 采用磁盘高速缓存</li></ul>`,
    options: ['仅 I、II', '仅 I、III', '仅 I、III、IV', 'I、II、III、IV'], answer: 'D',
    analysis: `<p>提前读利用局部性；连续簇减少寻道；延迟写减少同步写等待；磁盘高速缓存减少实际磁盘访问。四项都能改善文件访问性能。</p>`,
  },
  {
    id: 'q-2020-os-23', year: 2020, no: '23', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-4'], type: '选择', difficulty: 3, score: '2 分', tags: ['文件共享', '系统打开文件表'],
    stem: `<p>若多个进程共享同一个文件 F，则下列叙述中，正确的是（ ）。</p>`,
    options: ['各进程只能用“读”方式打开文件 F', '在系统打开文件表中仅有一个表项包含 F 的属性', '各进程的用户打开文件表中关于 F 的表项内容相同', '进程关闭 F 时，系统删除 F 在系统打开文件表中的表项'], answer: 'B',
    analysis: `<p>共享同一文件时，文件的属性由同一个 inode 描述，系统打开文件表中对应表项包含这些属性；各进程可有不同 fd、不同打开方式和偏移；close 只在引用计数为 0 时删除系统表项。</p>`,
  },
  {
    id: 'q-2020-os-31', year: 2020, no: '31', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-1'], type: '选择', difficulty: 3, score: '2 分', tags: ['目录项', 'inode', '文件个数'],
    stem: `<p>某文件系统的目录项由文件名和索引结点号构成。若每个目录项长度为 64 字节，其中 4 字节存放索引结点号，60 字节存放文件名。文件名由小写英文字母构成，则该文件系统能创建的文件数量的上限为（ ）。</p>`,
    options: ['2²⁶', '2³²', '2⁶⁰', '2⁶⁴'], answer: 'B',
    analysis: `<p>文件个数上限由索引结点号位数决定：inode 号占 4B=32 位，最多 2³² 个不同 inode，因此文件数上限 2³²。文件名长度只是命名空间，不是 inode 数量。</p>`,
  },
  {
    id: 'q-2021-os-30', year: 2021, no: '30', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-1', 'os-5-4'], type: '选择', difficulty: 2, score: '2 分', tags: ['删除文件', '快捷方式'],
    stem: `<p>若目录 dir 下有文件 file1，则为删除该文件内核不必完成的工作是（ ）。</p>`,
    options: ['删除 file1 的快捷方式', '释放 file1 的文件控制块', '释放 file1 占用的磁盘空间', '删除目录 dir 中与 file1 对应的目录项'], answer: 'A',
    analysis: `<p>删除文件要删目录项、释放 FCB/数据块；快捷方式只是指向文件的另一个文件，删除目标文件不会自动删除快捷方式（只会使其悬空）。</p>`,
  },
  {
    id: 'q-2023-os-31', year: 2023, no: '31', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-4'], type: '选择', difficulty: 3, score: '2 分', tags: ['close', '内存inode', '引用计数'],
    stem: `<p>若文件 F 仅被进程 P 打开并访问，则当进程 P 关闭 F 时，下列操作中，文件系统需要完成的是（ ）。</p>`,
    options: ['删除目录中文件 F 的目录项', '释放 F 的索引结点所占的内存空间', '释放 F 的索引结点所占的外存空间', '将文件磁盘索引结点中的链接计数减 1'], answer: 'B',
    analysis: `<p>close 删除进程打开文件表项，系统表引用计数减到 0 后释放系统表项并减少内存 inode 引用；内存 inode 无引用时可释放。目录项、外存 inode 和数据块不会因 close 删除，链接计数由 unlink 改变。</p>`,
  },
  {
    id: 'q-2024-os-29', year: 2024, no: '29', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-4'], type: '选择', difficulty: 2, score: '2 分', tags: ['open', '按名查找'],
    stem: `<p>下列系统调用的实现中，包含文件按名查找功能的是（ ）。</p>`,
    options: ['open()', 'read()', 'write()', 'close()'], answer: 'A',
    analysis: `<p>open 接收路径名，逐级查目录得到 inode；read/write/close 只接收 fd，不再按文件名查找。</p>`,
  },
  {
    id: 'q-2025-os-28', year: 2025, no: '28', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-1'], type: '选择', difficulty: 2, score: '2 分', tags: ['VFS', '虚拟文件系统'],
    stem: `<p>关于虚拟文件系统（VFS），正确的是（ ）。</p>`,
    options: ['虚拟文件系统是运行在虚拟内存的文件系统', 'VFS 可以加快文件系统的访问速度', 'VFS 定义了可访问不同文件系统的统一接口', 'VFS 只能访问本地文件系统，不能访问网络文件系统'], answer: 'C',
    analysis: `<p>VFS 是内核中的抽象层，为 ext4、FAT、NFS 等不同文件系统提供统一接口；它不负责虚拟内存，不必然加速，也能接网络文件系统。</p>`,
  },
  {
    id: 'q-2025-os-29', year: 2025, no: '29', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-1', 'os-5-4'], type: '选择', difficulty: 3, score: '2 分', tags: ['创建文件', 'inode', '目录项'],
    stem: `<p>某文件系统采用索引结点方式。用户在目录中新建文件 F 时，文件系统不会做的是（ ）。</p>`,
    options: ['初始化文件 F 的索引结点', '在目录文件中写入 F 的索引结点号', '在目录文件中写入 F 的访问权限信息', '在目录文件中增加一条文件 F 对应的目录项'], answer: 'C',
    analysis: `<p>访问权限属于 inode 的属性，不在目录项中；目录项通常只有文件名和 inode 号。创建文件要初始化 inode、写 inode 号并增加目录项。</p>`,
  },
  {
    id: 'q-2025-os-31', year: 2025, no: '31', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-5'], type: '选择', difficulty: 2, score: '2 分', tags: ['空闲空间', 'FAT'],
    stem: `<p>下列选项中，文件系统能够知道外存空闲空间的使用情况的是（ ）。</p>`,
    options: ['目录', '系统打开文件表', '文件分配表（FAT）', '文件控制块（FCB）'], answer: 'C',
    analysis: `<p>FAT 的表项覆盖所有盘块，空表项/特殊值可标记空闲块，因此可管理空闲空间；目录管名字，打开文件表管打开实例，FCB 管单个文件属性。</p>`,
  },
];
