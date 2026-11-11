/**
 * 第三章「信号量与 PV」真题：2009-2021。
 * 题干按原题整理，代码/解析为教学用简化写法；题号以 408 原卷为准。
 */

export const PV_QUESTIONS = [
  {
    id: 'q-2009-os-45',
    year: 2009,
    no: '45',
    label: '真题',
    subject: 'os',
    chapter: 'os-3',
    topics: ['os-3-1', 'os-3-2'],
    type: '综合',
    difficulty: 4,
    score: '7 分',
    tags: ['生产者-消费者', '奇偶分类', '信号量'],
    stem: `三个进程 P1、P2、P3 互斥使用一个包含 N（N&gt;0）个单元的缓冲区。P1 每次用 produce() 生成一个正整数并用 put() 送入缓冲区某一空单元中；P2 每次用 getodd() 从该缓冲区中取出一个奇数并用 countodd() 统计奇数个数；P3 每次用 geteven() 从该缓冲区中取出一个偶数并用 counteven() 统计偶数个数。请用信号量机制实现这三个进程的同步与互斥活动，并说明所定义信号量的含义。要求用伪代码描述。`,
    answer: '',
    analysis: `<p><strong>信号量：</strong><code>empty=N</code>（空单元数）、<code>odd=0</code>（可取的奇数个数）、<code>even=0</code>（可取的偶数个数）、<code>mutex=1</code>（保护缓冲区）。</p>
      <pre><code class="language-c">P1() {
    while (1) {
        x = produce();          // 正整数
        P(empty);
        P(mutex);
        put(x);
        V(mutex);
        if (x % 2 == 1) V(odd);
        else            V(even);
    }
}

P2() {
    while (1) {
        P(odd);
        P(mutex);
        getodd();
        countodd();
        V(mutex);
        V(empty);
    }
}

P3() {
    while (1) {
        P(even);
        P(mutex);
        geteven();
        counteven();
        V(mutex);
        V(empty);
    }
}</code></pre>
      <p>P1 放入后按奇偶分别 V(odd)/V(even)，P2/P3 只在自己需要的奇数/偶数存在时才进入缓冲区；<code>empty</code> 记录空位，<code>mutex</code> 保证 put/get 不并发。不需要额外的 full 信号量，因为 odd+even 就是产品总数。</p>`,
  },
  {
    id: 'q-2011-os-45',
    year: 2011,
    no: '45',
    label: '真题',
    subject: 'os',
    chapter: 'os-3',
    topics: ['os-3-1', 'os-3-2'],
    type: '综合',
    difficulty: 4,
    score: '8 分',
    tags: ['服务窗口', '座位', '取号机', '同步'],
    stem: `某银行提供 1 个服务窗口和 10 个顾客等待座位。顾客到达银行时，若有空座位，则到取号机领取一个号，等待叫号；取号机每次仅允许一位顾客使用。当营业员空闲时，通过叫号选取一位顾客，并为其服务。顾客和营业员的活动过程描述如下：<pre><code class="language-c">cobegin
process 顾客i {
    从取号机获得一个号码;
    等待叫号;
    获得服务;
}
process 营业员 {
    while (TRUE) {
        叫号;
        为顾客服务;
    }
}
coend</code></pre>请添加必要的信号量和 P/V（或 wait/signal）操作，实现上述过程中的互斥与同步。要求写出完整过程，说明信号量的含义并赋初值。`,
    answer: '',
    analysis: `<p><strong>信号量：</strong><code>empty=10</code>（空座位）、<code>full=0</code>（等待顾客数）、<code>mutex=1</code>（取号机）、<code>service=0</code>（叫号/服务握手）。</p>
      <pre><code class="language-c">customer() {
    P(empty);              // 占一个座位
    P(mutex);
    取号;
    V(mutex);
    V(full);               // 告诉营业员：有顾客等待
    P(service);            // 等叫号
    接受服务;
    V(empty);              // 离座
}

clerk() {
    while (1) {
        P(full);           // 等一位顾客
        V(service);        // 叫号，放行一位
        为顾客服务;
    }
}</code></pre>
      <p><code>empty</code> 限制同时等待的顾客不超过 10；<code>mutex</code> 保证取号机一次一人；<code>full/service</code> 完成“顾客到了—营业员叫号—顾客接受服务”的同步。若没有空座位，顾客在 P(empty) 等待；营业员每服务完一位再取下一个。</p>`,
  },
  {
    id: 'q-2013-os-45',
    year: 2013,
    no: '45',
    label: '真题',
    subject: 'os',
    chapter: 'os-3',
    topics: ['os-3-1'],
    type: '综合',
    difficulty: 3,
    score: '7 分',
    tags: ['资源数量限制', '互斥', '博物馆'],
    stem: `某博物馆最多可以容纳 500 人同时参观，有一个出入口，该出入口一次仅允许一个人通过。参观者的活动描述如下：<pre><code class="language-c">cobegin
参观者进程 i:
{
    ...
    进门;
    ...
    参观;
    ...
    出门;
    ...
}
coend</code></pre>请添加必要的信号量和 P/V（或 wait()、signal()）操作，实现上述过程中的互斥与同步。要求写出完整的过程，说明信号量的含义并赋初值。`,
    answer: '',
    analysis: `<p><strong>信号量：</strong><code>capacity=500</code>（馆内剩余容量）、<code>door=1</code>（出入口互斥）。</p>
      <pre><code class="language-c">visitor() {
    P(capacity);       // 申请一个入馆名额
    P(door);           // 门一次只能过一人
    进门;
    V(door);
    参观;
    P(door);
    出门;
    V(door);
    V(capacity);       // 释放名额
}</code></pre>
      <p><code>capacity</code> 限制馆内不超过 500 人；<code>door</code> 保证进门/出门每次只有一人通过。进门和出门都要过同一扇门，所以两段都用 P(door)/V(door)。</p>`,
  },
  {
    id: 'q-2014-os-47',
    year: 2014,
    no: '47',
    label: '真题',
    subject: 'os',
    chapter: 'os-3',
    topics: ['os-3-2'],
    type: '综合',
    difficulty: 5,
    score: '8 分',
    tags: ['生产者-消费者', '环形缓冲区', '连续取 10 件'],
    stem: `系统中有多个生产者进程和多个消费者进程，共享一个能存放 1000 件产品的环形缓冲区（初始为空）。当缓冲区未满时，生产者进程可以放入其生产的一件产品，否则等待；当缓冲区未空时，消费者进程可以从缓冲区取走一件产品，否则等待。要求一个消费者进程从缓冲区连续取出 10 件产品后，其他消费者进程才可以取产品。请使用信号量 P、V（wait()、signal()）操作实现进程间的互斥与同步，要求写出完整过程，并说明所用信号量的含义和初值。`,
    answer: '',
    analysis: `<p><strong>信号量：</strong><code>empty=1000</code>、<code>full=0</code>、<code>mutex=1</code>（保护环形缓冲区）、<code>consumer_mutex=1</code>（保证一个消费者连续取 10 件）。</p>
      <pre><code class="language-c">producer() {
    while (1) {
        item = produce();
        P(empty);
        P(mutex);
        放入环形缓冲区;
        V(mutex);
        V(full);
    }
}

consumer() {
    while (1) {
        P(consumer_mutex);       // 一次只允许一个消费者取一批
        for (int i = 0; i < 10; i++) {
            P(full);
            P(mutex);
            从环形缓冲区取一件;
            V(mutex);
            V(empty);
        }
        V(consumer_mutex);
        消费这 10 件;
    }
}</code></pre>
      <p><code>empty/full/mutex</code> 是标准生产者-消费者；额外的 <code>consumer_mutex</code> 把“连续取 10 件”作为一个整体，其他消费者必须等这一批取完。生产者不受 consumer_mutex 限制，仍可并发放入；如果产品不足 10 件，消费者持有 consumer_mutex 等 full，生产者可以继续生产。</p>`,
  },
  {
    id: 'q-2015-os-45',
    year: 2015,
    no: '45',
    label: '真题',
    subject: 'os',
    chapter: 'os-3',
    topics: ['os-3-1', 'os-3-2'],
    type: '综合',
    difficulty: 5,
    score: '9 分',
    tags: ['信箱', '生产者-消费者', '初始数量', '双向同步'],
    stem: `有 A、B 两人通过信箱进行辩论，每个人都从自己的信箱中取得对方的问题，将答案和向对方提出的新问题组成一个邮件放入对方的信箱中。假设 A 的信箱最多放 M 个邮件，B 的信箱最多放 N 个邮件。初始时 A 的信箱中有 x 个邮件（0&lt;x&lt;M），B 的信箱中有 y 个邮件（0&lt;y&lt;N）。辩论者每取出一个邮件，邮件数减 1。A 和 B 两人的操作过程描述如下：当信箱不为空时，辩论者才能从信箱中取邮件，否则需要等待；当信箱不满时，辩论者才能将新邮件放入信箱，否则需要等待。请添加必要的信号量和 P、V（或 wait、signal）操作，实现上述过程中的同步。要求写出完整过程，并说明信号量的含义和初值。`,
    answer: '',
    analysis: `<p><strong>信号量：</strong>A 箱：<code>emptyA=M-x</code>、<code>fullA=x</code>、<code>mutexA=1</code>；B 箱：<code>emptyB=N-y</code>、<code>fullB=y</code>、<code>mutexB=1</code>。</p>
      <pre><code class="language-c">A() {
    while (1) {
        P(fullA);            // A 箱有邮件
        P(mutexA);
        从 A 箱取一个邮件;
        V(mutexA);
        V(emptyA);           // A 箱多一个空位

        答题并写新问题;

        P(emptyB);           // B 箱有空位
        P(mutexB);
        把新邮件放入 B 箱;
        V(mutexB);
        V(fullB);            // B 箱多一个邮件
    }
}

B() {
    while (1) {
        P(fullB);
        P(mutexB);
        从 B 箱取一个邮件;
        V(mutexB);
        V(emptyB);

        答题并写新问题;

        P(emptyA);
        P(mutexA);
        把新邮件放入 A 箱;
        V(mutexA);
        V(fullA);
    }
}</code></pre>
      <p>两个信箱各自是“有界缓冲区”，所以各有 empty/full/mutex；初值必须用 x、y 算：<code>emptyA=M-x, fullA=x, emptyB=N-y, fullB=y</code>，不能把 empty 直接设成 M/N，否则初始邮件数会被算错。</p>`,
  },
  {
    id: 'q-2017-os-46',
    year: 2017,
    no: '46',
    label: '真题',
    subject: 'os',
    chapter: 'os-3',
    topics: ['os-3-1'],
    type: '综合',
    difficulty: 5,
    score: '8 分',
    tags: ['线程互斥', '读写冲突', '最大并发'],
    stem: `某进程中有 3 个并发执行的线程 thread1、thread2、thread3，其伪代码如下：<pre><code class="language-c">typedef struct { float a; float b; } cnum;
cnum x, y, z;                 // 全局变量
cnum add(cnum p, cnum q) {
    cnum s;
    s.a = p.a + q.a;
    s.b = p.b + q.b;
    return s;
}
thread1 { cnum w; w = add(x, y); ... }
thread2 { cnum w; w = add(y, z); ... }
thread3 {
    cnum w;
    w.a = 1; w.b = 2;
    z = add(z, w);
    y = add(y, w);
    ...
}</code></pre>请添加必要的信号量和 P、V（或 wait、signal）操作，确保线程互斥访问临界资源，并且最大程度地并发执行。`,
    answer: '',
    analysis: `<p><strong>先找读写冲突：</strong>thread1 只读 x,y；thread2 只读 y,z；thread3 写 z、写 y。x 只被 thread1 读，不需要锁；y 有 thread1/thread3、thread2/thread3 两组读写冲突；z 有 thread2/thread3 一组读写冲突。因此用三个互斥量：<code>mutex_y1</code>（thread1 的 y）、<code>mutex_y2</code>（thread2 的 y）、<code>mutex_z</code>（z），初值均为 1。</p>
      <pre><code class="language-c">semaphore mutex_y1 = 1, mutex_y2 = 1, mutex_z = 1;

thread1() {
    P(mutex_y1);
    w = add(x, y);       // 只读 y，只需挡住 thread3 的写 y
    V(mutex_y1);
}

thread2() {
    P(mutex_z);
    P(mutex_y2);
    w = add(y, z);       // 一次读 y,z，必须同时持有两把锁
    V(mutex_y2);
    V(mutex_z);
}

thread3() {
    w.a = 1; w.b = 2;
    P(mutex_z);
    z = add(z, w);       // 写 z，与 thread2 的 z 读互斥
    V(mutex_z);
    P(mutex_y1);
    P(mutex_y2);
    y = add(y, w);       // 写 y，同时与 thread1、thread2 的 y 读互斥
    V(mutex_y2);
    V(mutex_y1);
}</code></pre>
      <p>不能只用一个 mutex：那样 thread1 和 thread2 两个纯读者也会互斥，降低并发。也不能只保护 y 或只保护 z：thread3 同时写 y、z，两个读线程各自读到一半可能得到不一致的快照。thread2 先锁 z 再锁 y2，thread3 先锁 z、释放后再锁 y1/y2，按这个顺序不会形成循环等待。</p>`,
  },
  {
    id: 'q-2019-os-43',
    year: 2019,
    no: '43',
    label: '真题',
    subject: 'os',
    chapter: 'os-3',
    topics: ['os-3-4'],
    type: '综合',
    difficulty: 5,
    score: '8 分',
    tags: ['哲学家进餐', '碗', '资源数量', '死锁'],
    stem: `有 n（n≥3）位哲学家围坐在一张圆桌边，每位哲学家交替地就餐和思考。在圆桌中心有 m（m≥1）个碗，每两位哲学家之间有一根筷子。每位哲学家必须取到一个碗和两侧的筷子后，才能就餐；进餐完毕，将碗和筷子放回原位，并继续思考。为使尽可能多的哲学家同时就餐，且防止出现死锁现象，请使用信号量的 P、V 操作（wait()、signal() 操作）描述上述过程中的互斥与同步，并说明所用信号量及初值的含义。`,
    answer: '',
    analysis: `<p><strong>信号量：</strong><code>bowls=min(n-1,m)</code>（可同时进餐的名额/碗数）、<code>chopsticks[n]</code> 全部初值 1（每根筷子一个资源）。</p>
      <pre><code class="language-c">semaphore bowls = min(n - 1, m);
semaphore chopsticks[n] = {1, 1, ..., 1};

philosopher(int i) {
    while (1) {
        think();
        P(bowls);                       // 先拿进餐名额/碗
        P(chopsticks[i]);               // 左筷子
        P(chopsticks[(i + 1) % n]);     // 右筷子
        eat();
        V(chopsticks[i]);
        V(chopsticks[(i + 1) % n]);
        V(bowls);
    }
}</code></pre>
      <p>只把碗设成 m 不够：若 m≥n，n 个人可以同时拿到碗，再各自拿左筷子，仍然形成“每人一根、等右筷子”的环。把名额限制为 <code>min(n-1,m)</code> 后，最多 n-1 人参与筷子竞争，不可能出现 n 人各持一根的闭环；同时碗数不超过 m，满足实际资源限制。最大同时进餐人数仍由筷子数决定（约 ⌊n/2⌋）。</p>`,
  },
  {
    id: 'q-2020-os-45',
    year: 2020,
    no: '45',
    label: '真题',
    subject: 'os',
    chapter: 'os-3',
    topics: ['os-3-1'],
    type: '综合',
    difficulty: 3,
    score: '7 分',
    tags: ['前驱关系', '同步信号量', 'A/B/C/D/E'],
    stem: `现有 5 个操作 A、B、C、D 和 E，操作 C 必须在 A 和 B 完成后执行，操作 E 必须在 C 和 D 完成后执行。请使用信号量的 wait()、signal() 操作（P、V 操作）描述上述操作之间的同步关系，并说明所用信号量及其初值。`,
    answer: '',
    analysis: `<p>为每条“前驱→后继”边设一个同步信号量，初值 0；前驱末尾 V，后继开头 P。</p>
      <pre><code class="language-c">semaphore sAC = 0, sBC = 0, sCE = 0, sDE = 0;

A() { A操作; V(sAC); }
B() { B操作; V(sBC); }
C() { P(sAC); P(sBC); C操作; V(sCE); }
D() { D操作; V(sDE); }
E() { P(sCE); P(sDE); E操作; }</code></pre>
      <p>C 同时等待 A、B：两个 P 都通过才执行；E 同时等待 C、D：两个 P 都通过才执行。四个信号量分别表示四条依赖边，A/B/D 之间没有依赖，可以并发。</p>`,
  },
  {
    id: 'q-2021-os-45',
    year: 2021,
    no: '45',
    label: '真题',
    subject: 'os',
    chapter: 'os-3',
    topics: ['os-3-1'],
    type: '综合',
    difficulty: 4,
    score: '7 分',
    tags: ['信号量实现', '关中断', '原子性', '用户态'],
    stem: `下表给出了整型信号量 S 的 wait() 和 signal() 操作的功能描述，以及采用开/关中断指令实现信号量操作互斥的两种方法。<br>功能描述：<pre><code class="language-c">Semaphore S;
wait(S) { while (S &lt;= 0); S = S - 1; }
signal(S) { S = S + 1; }</code></pre>方法 1：<pre><code class="language-c">wait(S) { 关中断; while (S &lt;= 0); S = S - 1; 开中断; }
signal(S) { 关中断; S = S + 1; 开中断; }</code></pre>方法 2：<pre><code class="language-c">wait(S) { 关中断; while (S &lt;= 0) { 开中断; 关中断; } S = S - 1; 开中断; }
signal(S) { 关中断; S = S + 1; 开中断; }</code></pre>请回答下列问题：<br>（1）为什么在 wait() 和 signal() 操作中对信号量 S 的访问必须互斥执行？<br>（2）分别说明方法 1 和方法 2 是否正确。若不正确，请说明理由。<br>（3）用户程序能否使用开/关中断指令实现临界区互斥？为什么？`,
    answer: '',
    analysis: `<p><strong>（1）必须互斥：</strong>wait 要“检查 S 是否大于 0，再减 1”，signal 要对 S 加 1，二者都是“读—改—写”。若并发执行，两个进程可能同时看到 S=1 而都减 1，或丢失加 1，导致信号量计数错误、互斥失效或唤醒丢失。</p>
      <p><strong>（2）方法 1 不正确，方法 2 正确。</strong>方法 1 在 S≤0 时<strong>关着中断自旋</strong>：单处理机上，持有 S 的进程无法被调度去执行 signal，等待者永远出不来；多处理机上也会造成长时间关中断/不可抢占。方法 2 在自旋等待时<strong>开中断</strong>，让其他进程可以执行 signal 修改 S；当发现 S&gt;0 后重新关中断，再完成“检查 + 减 1”，因此检查与减 1 仍是原子的。</p>
      <p><strong>（3）用户程序不能。</strong>开/关中断是特权指令，用户态执行会陷入；即使允许，关中断会影响整个系统（多处理机上只关本 CPU 也挡不住其他 CPU），不能作为用户级临界区的通用互斥手段。用户程序应使用系统调用/信号量/互斥锁，让内核在受控范围内完成原子操作。</p>`,
  },
];
