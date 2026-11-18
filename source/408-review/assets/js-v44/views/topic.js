import {
  topicById, chapterById, subjectOf, topicsOfChapter, questionById, chainsOfTopic, adjacentTopics,
} from '../data/index.js';
import { chapterStats } from '../stats.js';
import { today } from '../store.js';
import {
  icon, escapeHtml, importanceBars, tag, footer, sectionHead, segmentedLevel, dueLabel, subjectClass,
} from '../ui.js';
import { questionCard } from '../components/question-card.js';
import { afterArticle } from '../article.js';
import { recallPrompts } from '../study.js';

export function topicView(store, topicId) {
  const topic = topicById.get(topicId);
  if (!topic) return null;
  const chapter = chapterById.get(topic.chapter);
  const subject = subjectOf(topic.chapter);
  const entry = store.entry(topic.id);
  const level = entry?.level || 0;
  const questions = (topic.questions || []).map((id) => questionById.get(id)).filter(Boolean);
  const links = (topic.links || []).map((l) => ({ ...l, topic: topicById.get(l.to) })).filter((l) => l.topic);
  const chains = chainsOfTopic(topic.id);
  const { prev, next, index } = adjacentTopics(topic.id);
  const siblings = topicsOfChapter(topic.chapter);
  const cstats = chapterStats(store, topic.chapter);
  const t = today();

  return `<section class="view view-topic ${subjectClass(subject?.id)}">
    <nav class="breadcrumb" aria-label="面包屑">
      <a href="#/map?subject=${subject?.id || 'ds'}">知识地图</a>
      <span class="bc-sep">/</span>
      <a href="#/map?subject=${subject?.id || 'ds'}">${escapeHtml(subject?.name || '')}</a>
      <span class="bc-sep">/</span>
      <a href="#/chapter/${chapter.id}">${chapter.no} ${escapeHtml(chapter.short)}</a>
      <span class="bc-sep">/</span>
      <span class="bc-current">考点 ${String(topic.order).padStart(2, '0')}</span>
    </nav>

    <div class="topic-layout">
      <aside class="topic-rail">
        <div class="rail-sticky">
          <p class="eyebrow">IN THIS CHAPTER</p>
          <a class="rail-chapter" href="#/chapter/${chapter.id}">
            <span class="rc-no">${chapter.no}</span>
            <span class="rc-title">${escapeHtml(chapter.short)}<small>${siblings.length} 个考点</small></span>
          </a>
          <nav class="rail-topics" aria-label="本章考点">
            ${siblings.map((s) => `<a class="rail-topic ${s.id === topic.id ? 'is-active' : ''}" href="#/topic/${s.id}">
              <span class="rt-dot level-${store.levelOf(s.id)}"></span>
              <span class="rt-title">${String(s.order).padStart(2, '0')} ${escapeHtml(s.title)}</span>
            </a>`).join('')}
          </nav>
          <div class="rail-progress">
            <div class="rp-head"><span>本章进度</span><b>${cstats.pct}%</b></div>
            <div class="rp-track"><i style="width:${cstats.pct}%"></i></div>
          </div>
          <button type="button" class="btn btn-sm btn-block" data-action="start-chapter-runner" data-chapter="${chapter.id}">${icon('play', 14)} 滚动本章</button>
        </div>
      </aside>

      <article class="topic-article">
        <header class="topic-head">
          <p class="eyebrow">${subject?.name || ''} · CHAPTER ${chapter.no} · 考点 ${String(topic.order).padStart(2, '0')}</p>
          <h1>${escapeHtml(topic.title)}</h1>
          <p class="topic-subtitle">${escapeHtml(topic.kicker)}</p>
          <div class="topic-meta">
            <span class="meta-block"><span class="meta-label">考频</span>${importanceBars(topic.importance)}</span>
            <span class="meta-block"><span class="meta-label">题型</span>${(topic.exam?.types || []).map((x) => tag(x, 'plain')).join('')}</span>
            <span class="meta-block"><span class="meta-label">年份</span><span class="meta-years">${(topic.exam?.years || []).join(' · ') || '—'}</span></span>
            <span class="meta-block"><span class="meta-label">真题</span><span>${questions.length} 道</span></span>
          </div>
        </header>

        <section class="takeaway">
          <div class="takeaway-label">${icon('spark', 14)} 一句话抓手</div>
          <p>${topic.takeaway}</p>
        </section>

        <div class="topic-level-row">
          <span class="eyebrow">掌握度</span>
          ${segmentedLevel(level, topic.id)}
          <span class="tl-hint">${entry?.last ? `上次 ${shortDate(entry.last)} · ` : ''}${entry?.due ? `下次 ${dueLabel(entry.due, t)}` : '标记后自动排期'}</span>
        </div>

        ${links.length ? `<div class="quick-links">
          <span class="ql-label">${icon('link', 12)} 串联</span>
          ${links.slice(0, 4).map((l) => `<a href="#/topic/${l.topic.id}">${escapeHtml(l.topic.title)}</a>`).join('')}
          <a class="ql-more" href="#/map?subject=${subject?.id || 'ds'}">知识地图 ${icon('arrowRight', 12)}</a>
        </div>` : ''}

        <nav class="study-jump" aria-label="本页学习顺序">
          <a href="#recite">01 背诵</a>
          <a href="#understand">02 理解</a>
          <a href="#diagrams">03 图解</a>
          <a href="#questions">04 真题</a>
        </nav>

        <section class="study-aids" id="recite">
          <article class="study-card recite-card">
            <div class="sc-head"><span class="sc-icon">${icon('book', 16)}</span><div><p class="eyebrow">MEMORIZE</p><h2>背诵清单</h2></div><span class="sc-count">${topic.points.length} 条</span></div>
            <p class="sc-take">${topic.takeaway}</p>
            <div class="sc-prompts">
              <b>先回忆</b>
              <ol>${recallPrompts(topic).map((q) => `<li>${escapeHtml(q)}</li>`).join('')}</ol>
            </div>
            <ol class="recite-list">
              ${topic.points.map((p) => `<li><b>${escapeHtml(p.t)}</b><span>${escapeHtml(p.lead)}</span></li>`).join('')}
            </ol>
            ${topic.pitfalls?.length ? `<div class="sc-pitfalls">
              <b>易错提醒</b>
              <ul>${topic.pitfalls.slice(0, 3).map((p) => `<li><strong>${escapeHtml(p.t)}</strong>${escapeHtml(p.b)}</li>`).join('')}</ul>
            </div>` : ''}
          </article>

          <article class="study-card answer-card">
            <div class="sc-head"><span class="sc-icon">${icon('target', 16)}</span><div><p class="eyebrow">ANSWER</p><h2>考场答法</h2></div><span class="sc-count">${(topic.exam?.types || ['选择']).join(' / ')}</span></div>
            <div class="answer-steps">
              ${answerSteps(topic).map((s, i) => `<div class="answer-step"><span class="as-no">${i + 1}</span><div><b>${s.label}</b><p>${escapeHtml(s.text)}</p></div></div>`).join('')}
            </div>
            <p class="answer-hint">${topic.exam?.types?.includes('综合') ? '综合题先画图 / 列表，再分步写结论；每一步都写“为什么”。' : '选择题先排除绝对化、无中生有的选项，再代边界值验证。'}</p>
          </article>
        </section>

        ${topic.bitfields ? `<section class="topic-visual">
          <p class="eyebrow">STRUCTURE</p>
          ${topic.bitfields.map(renderBitfield).join('')}
        </section>` : ''}

        <section class="study-section" id="understand">
          <header class="study-section-head">
            <div><p class="eyebrow">02 · UNDERSTAND</p><h2>理解：把结论推一遍</h2><p>正文按原帖整理；公式、表格、代码和例题解析都在里面。先读推导，再回头背清单。</p></div>
            <button type="button" class="text-btn" data-action="print">${icon('print', 14)} 打印</button>
          </header>
          <div class="article-body" id="topic-article">
            <div class="article-loading"><span class="al-dot"></span> 正在展开全文…</div>
          </div>
        </section>

        <section class="study-section" id="diagrams">
          <header class="study-section-head">
            <div><p class="eyebrow">03 · DIAGRAMS</p><h2>图解：把一类题的图抽出来</h2><p>正文里的关键插图集中在这里；先看图回忆流程，再回正文读细节。</p></div>
            <a class="text-link" href="#/diagrams">全部图解 ${icon('arrowRight', 14)}</a>
          </header>
          <div id="topic-figure-strip" class="figure-strip"></div>
          ${customFigures(topic).length ? `<div class="topic-figures">${customFigures(topic).map(renderFigure).join('')}</div>` : ''}
        </section>

        <section class="topic-questions" id="questions">
          ${sectionHead({
            eyebrow: 'VERIFY',
            title: '关联真题',
            desc: questions.length ? '先自己写答案，再展开解析；做完回到上面的背诵清单复盘。' : '这个考点暂时没有配套真题。',
            actions: questions.length ? `<a class="text-link" href="#/questions?subject=${subject?.id || 'ds'}">全部真题 ${icon('arrowRight', 14)}</a>` : '',
          })}
          ${questions.length
            ? questions.map((q) => questionCard(q, { compact: true })).join('')
            : `<div class="no-questions">${icon('file', 18)}<span>可以先跳过，去真题库按章节筛选。</span><a class="text-link" href="#/questions?chapter=${chapter.id}">本章真题 ${icon('arrowRight', 14)}</a></div>`}
        </section>

        ${links.length ? `<section class="links-section">
          ${sectionHead({ eyebrow: 'CONNECT', title: '把点连起来', desc: '这些考点和它共享同一套底层逻辑。' })}
          <div class="link-cards">
            ${links.map((l) => `<a class="link-card" href="#/topic/${l.topic.id}">
              <span class="lc-top"><span class="lc-ch">${chapterById.get(l.topic.chapter)?.no || ''} ${escapeHtml(chapterById.get(l.topic.chapter)?.short || '')}</span>${icon('arrowUpRight', 15)}</span>
              <strong>${escapeHtml(l.topic.title)}</strong>
              <p>${l.why}</p>
            </a>`).join('')}
          </div>
        </section>` : ''}

        ${chains.length ? `<section class="topic-chains">
          ${sectionHead({ eyebrow: 'THREADS', title: '在这条脉络里', desc: '同一个思路，在别的章节还会再出现一次。' })}
          <div class="topic-chain-list">
            ${chains.map((c) => `<div class="topic-chain">
              <div class="tc-head"><span class="eyebrow">${c.subject === 'cross' ? '跨学科' : '本学科'}</span><h4>${escapeHtml(c.title)}</h4><p>${escapeHtml(c.note)}</p></div>
              <div class="tc-steps">
                ${c.steps.map((s, i) => {
                  const tp = topicById.get(s.topic);
                  if (!tp) return '';
                  return `${i ? `<span class="tc-arrow">${icon('arrowRight', 12)}</span>` : ''}<a class="tc-step ${s.topic === topic.id ? 'is-current' : ''}" href="#/topic/${s.topic}">${escapeHtml(s.label)}</a>`;
                }).join('')}
              </div>
            </div>`).join('')}
          </div>
        </section>` : ''}

        <nav class="topic-pager" aria-label="上下考点">
          ${prev ? `<a class="pager-link is-prev" href="#/topic/${prev.id}"><span class="pl-label">${icon('arrowLeft', 14)} 上一个</span><strong>${escapeHtml(prev.title)}</strong></a>` : '<span></span>'}
          ${next ? `<a class="pager-link is-next" href="#/topic/${next.id}"><span class="pl-label">下一个 ${icon('arrowRight', 14)}</span><strong>${escapeHtml(next.title)}</strong></a>` : '<span></span>'}
        </nav>

        <div class="study-bar">
          <div class="study-level">
            <span class="eyebrow">掌握度</span>
            ${segmentedLevel(level, topic.id)}
          </div>
          <div class="study-next">
            <span class="study-due">${entry?.due ? `下次复习：${dueLabel(entry.due, t)}` : '标记后自动排期'}</span>
            ${next ? `<a class="btn btn-primary btn-sm" href="#/topic/${next.id}">下一考点 ${icon('arrowRight', 14)}</a>` : `<a class="btn btn-primary btn-sm" href="#/chapter/${chapter.id}">回到本章 ${icon('arrowRight', 14)}</a>`}
          </div>
        </div>
      </article>
    </div>

    ${footer()}
  </section>`;
}

function shortDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return `${d.getMonth() + 1} 月 ${d.getDate()} 日`;
}

function renderBitfield(bf) {
  return `<section class="bitfield-card">
    <div class="bf-head">
      <div><p class="eyebrow">BIT FIELD</p><h3>${escapeHtml(bf.title)}</h3></div>
      <span class="bf-total">${bf.total} 位</span>
    </div>
    <div class="bf-scroll">
      <div class="bf-bar" style="--total:${bf.total}">
        ${bf.fields.map((f) => `<div class="bf-seg bf-${f.cls}" style="flex:${f.bits}" title="${escapeHtml(f.k)} · ${f.bits} 位">
          <b>${escapeHtml(f.k)}</b>${f.bits >= 4 ? `<small>${f.bits}</small>` : ''}
        </div>`).join('')}
      </div>
    </div>
    ${bf.note ? `<p class="bf-note">${bf.note}</p>` : ''}
  </section>`;
}

function renderTable(table) {
  return `<section class="table-card">
    <div class="table-head">
      <div><p class="eyebrow">COMPARE</p><h3>${escapeHtml(table.title)}</h3></div>
      <span class="table-badge">对比表</span>
    </div>
    <div class="table-scroll">
      <table>
        <thead><tr>${table.head.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
        <tbody>${table.rows.map((row) => `<tr>${row.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>
    </div>
    ${table.note ? `<p class="table-note">${table.note}</p>` : ''}
  </section>`;
}

function renderFigure(fig) {
  const src = fig.src || '';
  const caption = fig.caption || '';
  return `<figure class="topic-figure">
    <a class="figure-link" href="${escapeHtml(src)}" data-action="zoom-image" data-src="${escapeHtml(src)}" data-caption="${escapeHtml(stripTags(caption))}">
      <img src="${escapeHtml(src)}" alt="${escapeHtml(fig.alt || stripTags(caption) || '')}" loading="lazy" decoding="async">
    </a>
    ${caption ? `<figcaption>${caption}</figcaption>` : ''}
  </figure>`;
}

function stripTags(html = '') {
  return String(html).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function customFigures(topic) {
  return (topic.figures || []).filter((f) => String(f.src || '').endsWith('.svg'));
}

function stripText(value = '') {
  return String(value).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function answerSteps(topic) {
  const points = topic.points || [];
  const type = (topic.exam?.types || []).join(' ');
  const pitfall = topic.pitfalls?.[0];
  const keySteps = points.slice(0, 4).map((p) => p.t).join('；');
  return [
    { label: '先交代对象 / 定义', text: stripText(topic.takeaway) },
    { label: type.includes('综合') ? '再写步骤 / 公式' : '再写判定 / 对比', text: keySteps || '把题干条件转成符号或图，再列关键性质。' },
    { label: '最后收口', text: pitfall ? stripText(pitfall.b) : '写出结论，再检查边界条件、反例和单位。' },
  ];
}

async function fillFigureStrip(host) {
  const strip = document.getElementById('topic-figure-strip');
  if (!strip) return;
  const figures = [...host.querySelectorAll('.article-figure')].slice(0, 4);
  strip.innerHTML = figures.map((fig) => {
    const link = fig.querySelector('.figure-link');
    const img = fig.querySelector('img');
    const caption = fig.querySelector('figcaption')?.textContent?.trim() || img?.alt || '';
    if (!link || !img) return '';
    return `<button type="button" class="figure-chip" data-action="zoom-image" data-src="${escapeHtml(link.dataset.src || img.src)}" data-caption="${escapeHtml(link.dataset.caption || caption)}">
      <img src="${escapeHtml(img.getAttribute('src') || img.src)}" alt="${escapeHtml(caption)}" loading="lazy" decoding="async">
      <span>${escapeHtml(caption)}</span>
    </button>`;
  }).join('');
  if (!strip.children.length && !document.querySelector('#diagrams .topic-figures')) {
    document.getElementById('diagrams')?.setAttribute('hidden', '');
    document.querySelector('.study-jump a[href="#diagrams"]')?.setAttribute('hidden', '');
  }
}

/**
 * 长文按需加载：首次进入考点时 fetch 静态 HTML，不把 50 篇文章塞进主 JS。
 * 失败时退回 topic.points 的速记版，保证页面仍然可读。
 */
export async function hydrateTopicArticle(topicId) {
  const host = document.getElementById('topic-article');
  if (!host) return;
  host.dataset.topicId = topicId;
  const topic = topicById.get(topicId);
  if (!topic) return;

  try {
    const res = await fetch(`/408-review/assets/content/${topicId}.html`, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`article ${res.status}`);
    const html = await res.text();
    if (host.dataset.topicId !== topicId) return;
    host.innerHTML = html;
    host.classList.add('is-loaded');
  } catch (err) {
    if (host.dataset.topicId !== topicId) return;
    host.innerHTML = fallbackArticle(topic);
    host.classList.add('is-loaded', 'is-fallback');
  }

  await fillFigureStrip(host);
  await afterArticle(host);
}

function fallbackArticle(topic) {
  const points = (topic.points || []).map((p) => `<section class="article-fallback-point">
    <h2>${escapeHtml(p.t)}</h2>
    ${p.lead ? `<p class="article-fallback-lead">${escapeHtml(p.lead)}</p>` : ''}
    ${p.body || ''}
  </section>`).join('');
  return `<div class="article-content">
    <p class="article-fallback-note">这个考点的长文还在整理，先保留速记版；下方真题与串联仍然可用。</p>
    ${points}
  </div>`;
}
