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
  {
    id: 'q-2015-os-index-offset', year: 2015, no: '—', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-3'], type: '选择', difficulty: 4, score: '2 分', tags: ['索引分配', '逻辑块号', '间接地址'],
    stem: `<p>在文件的索引结点中存放直接索引指针 10 个，一级和二级索引指针各 1 个。磁盘块大小 1KB，每个索引指针占 4B。若某文件的索引结点已在内存中，则把该文件偏移量（按字节编址）为 1234 和 307400 处所在的磁盘块读入内存，需访问的磁盘块个数分别是（ ）。</p>`,
    options: ['1、2', '1、3', '2、3', '2、4'], answer: 'B',
    analysis: `<p>每块可存 1KB/4B=256 个指针。偏移 1234 的逻辑块号=1234/1024=1，落在 10 个直接块内，读 1 个数据块。偏移 307400 的逻辑块号=307400/1024=300；直接块 0–9，一级间接覆盖 10–265，300 落在二级间接；需读二级索引块、一级索引块、数据块，共 3 个块。</p>`,
  },
  {
    id: 'q-2017-os-permission-bits', year: 2017, no: '—', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-9'], type: '选择', difficulty: 3, score: '2 分', tags: ['文件保护', '权限位', 'ACL'],
    stem: `<p>某文件系统中，针对每个文件，用户类别分为 4 类：安全管理员、文件主、文件主的伙伴、其他用户；访问权限分为 5 种：完全控制、执行、修改、读取、写入。若文件控制块中用二进制位串表示文件权限，为表示不同类别用户对一个文件的访问权限，则描述文件权限的位数至少应为（ ）。</p>`,
    options: ['5', '9', '12', '20'], answer: 'D',
    analysis: `<p>每个用户类别都要独立表示 5 种权限，4×5=20 位。不能把“完全控制”简单等同于其他四种权限的或，因为题目要求分别表示 5 种权限。</p>`,
  },
  {
    id: 'q-2020-os-alloc-random', year: 2020, no: '—', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-3'], type: '选择', difficulty: 2, score: '2 分', tags: ['索引分配', '随机访问', '文件长度'],
    stem: `<p>下列选项中，支持文件长度可变、随机访问的磁盘存储空间分配方式是（ ）。</p>`,
    options: ['索引分配', '链接分配', '连续分配', '动态分区分配'], answer: 'A',
    analysis: `<p>索引分配用索引块记录文件的所有盘块号，支持随机访问，也能动态增加盘块；连续分配要求连续空间、不利扩展；隐式链接只能顺序访问；动态分区是内存管理，不是文件物理结构。</p>`,
  },
  {
    id: 'q-2014-os-bitmap-clusters', year: 2014, no: '—', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-5'], type: '选择', difficulty: 3, score: '2 分', tags: ['位示图', '簇', '空闲空间'],
    stem: `<p>现有一个容量为 10GB 的磁盘分区，磁盘空间以簇（Cluster）为单位进行分配，簇的大小为 4KB。若采用位示图法管理该分区的空闲空间，即用一位（bit）标识一个簇是否被分配，则存放该位图所需簇的个数为（ ）。</p>`,
    options: ['80', '320', '80K', '320K'], answer: 'A',
    analysis: `<p>簇数=10GB/4KB=(10×2³⁰)/2¹²=2,621,440 簇。位图需要 2,621,440 bit=327,680B=320KB；每个簇 4KB，需 80 个簇。</p>`,
  },
  {
    id: 'q-2015-os-bitmap-release', year: 2015, no: '—', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-5'], type: '选择', difficulty: 4, score: '2 分', tags: ['位示图', '盘块号', '字号位号'],
    stem: `<p>文件系统用位示图表示磁盘空间的分配情况，位图存于磁盘的 32–127 号块中，每个盘块占 1024 字节，盘块和块内字节均从 0 开始编号。假设要释放的盘块号为 409612，则位图中要修改的位所在的盘块号和块内字节序号分别是（ ）。</p>`,
    options: ['81，1', '81，2', '82，1', '82，2'], answer: 'C',
    analysis: `<p>每个位图块有 1024×8=8192 位。409612/8192=50 余 12，所以是位图第 50 块（从 0 计），实际盘块号 32+50=82；块内第 12 位，12/8=1 余 4，字节序号为 1（从 0 计）。</p>`,
  },
  {
    id: 'q-2017-os-cluster-sector', year: 2017, no: '—', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-3', 'os-5-5'], type: '选择', difficulty: 2, score: '2 分', tags: ['簇', '扇区', '内部碎片'],
    stem: `<p>某文件系统的簇和磁盘扇区大小分别为 1KB 和 512B。若一个文件的大小为 1026B，则系统分配给该文件的磁盘空间大小是（ ）。</p>`,
    options: ['1026B', '1536B', '1538B', '2048B'], answer: 'D',
    analysis: `<p>分配单位是簇，1 簇=1KB=1024B；1026B 需要 2 簇，共 2048B。扇区大小只是磁盘物理单位，不改变文件系统的簇分配。</p>`,
  },
  {
    id: 'q-2012-os-46', year: 2012, no: '46', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-3', 'os-5-1'], type: '综合', difficulty: 5, score: '10 分', tags: ['FCB', '索引表', '最大文件', '直接索引'],
    stem: `<p>某文件系统空间最大容量 4TB（1TB=2⁴⁰B），以磁盘块为基本分配单位，磁盘块大小 1KB。文件控制块 FCB 包含一个 512B 的索引表区。</p><ol>
<li>假设索引表区仅采用直接索引结构，索引表区存放文件占用的磁盘块号，索引表项中块号最少占多少字节？可支持的单个文件最大长度是多少字节？</li>
<li>假设索引表区采用如下结构：第 0～7 字节采用 &lt;起始块号，块数&gt; 格式表示文件创建时预分配的连续存储空间，其中起始块号占 6B、块数占 2B；剩余 504 字节采用直接索引结构，一个索引项占 6B。则可支持的单个文件最大长度是多少字节？为了使单个文件的长度达到最大，请指出起始块号和块数分别所占字节数的合理值并说明理由。</li></ol>`,
    answer: '',
    analysis: `<p>（1）磁盘块数=4TB/1KB=2³²，块号需 32 位=4B。512B/4B=128 个索引项，最大文件=128×1KB=<strong>128KB</strong>。</p><p>（2）块数 2B 可表示 2¹⁶ 块=64MB；直接索引区 504B/6B=84 项=84KB；最大=64MB+84KB=<strong>65,620KB</strong>。要达文件系统上限，块数字段至少 4B（可表示 2³² 块=4TB）；8B 头部可分配为起始块号 4B、块数 4B（或 1+7、2+6、3+5），起始块号够表示 2³² 个块即可，剩余给块数。</p>`,
  },
  {
    id: 'q-2014-os-46', year: 2014, no: '46', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-3', 'os-5-1'], type: '综合', difficulty: 5, score: '10 分', tags: ['连续分配', '链接分配', '插入记录', '最大文件'],
    stem: `<p>文件 F 由 200 条记录组成，记录从 1 开始编号。用户打开文件后，欲将内存中的一条记录插入文件 F，作为其第 30 条记录。</p><ol>
<li>若文件系统采用连续分配方式，每个磁盘块存放一条记录，文件 F 存储区域前后均有足够空闲磁盘空间，则完成插入最少需要访问多少次磁盘块？F 的文件控制块内容会发生哪些改变？</li>
<li>若文件系统采用链接分配方式，每个磁盘块存放一条记录和一个链接指针，则完成插入需要访问多少次磁盘块？若每个存储块大小 1KB，其中 4B 存放链接指针，则该文件系统支持的文件最大长度是多少？</li></ol>`,
    answer: '',
    analysis: `<p>（1）连续分配要腾出第 30 个位置：把前 29 条记录整体前移。每条记录读出+写回各一次=58 次，再写入新记录 1 次，共 <strong>59 次</strong>。FCB 的起始块号和文件长度会改变（起始块号前移、长度加 1）。</p><p>（2）链接分配先沿链找到第 29 块（29 次访盘），写入新块（1 次），修改第 29 块的链接指针并写回（1 次），共 <strong>31 次</strong>。每块 1KB，链接指针 4B，数据 1020B；4B 可寻址 2³² 块，最大长度=2³²×1020B=<strong>4080GB</strong>。</p>`,
  },
  {
    id: 'q-2018-os-46', year: 2018, no: '46', label: '真题', subject: 'os', chapter: 'os-5',
    topics: ['os-5-3', 'os-5-1'], type: '综合', difficulty: 5, score: '7 分', tags: ['inode', '最大文件', '间接地址', '文件个数'],
    stem: `<p>某文件系统采用索引结点存放文件的属性和地址信息，簇大小 4KB。每个文件索引结点占 64B，有 11 个地址项，其中直接地址项 8 个，一级、二级和三级间接地址项各 1 个，每个地址项长 4B。</p><ol>
<li>该文件系统能支持的最大文件长度是多少？（给出计算表达式即可）</li>
<li>文件系统用 1M（1M=2²⁰）个簇存放文件索引结点，用 512M 个簇存放文件数据。若一个图像文件大小为 5600B，则该文件系统最多能存放多少个这样的图像文件？</li>
<li>若文件 F1 大小为 6KB，文件 F2 大小为 40KB，则该文件系统获取 F1 和 F2 最后一个簇的簇号需要的时间是否相同？为什么？</li></ol>`,
    answer: '',
    analysis: `<p>（1）每簇可存 4KB/4B=1024 个地址。最大文件=(8 + 1024 + 1024² + 1024³)×4KB。</p><p>（2）5600B 需要 2 个簇；数据区可支持 512M/2=256M 个，但 inode 只有 1M 个，所以最多 <strong>1M 个</strong>。</p><p>（3）不相同。F1 的 2 个簇都在 8 个直接地址项内，取最后簇只需读 1 次数据块；F2 的 40KB=10 簇，前 8 簇在直接项，最后簇要通过一级间接地址项，需先读一级索引块再读数据块，至少 2 次。</p>`,
  },
];
