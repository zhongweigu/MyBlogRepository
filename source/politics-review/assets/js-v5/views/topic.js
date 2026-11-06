import {
  topicById, chapterById, subjectOf, topicsOfChapter, chainsOfTopic, adjacentTopics,
} from '../data/index.js';
import { chapterStats } from '../stats.js';
import { today } from '../store.js';
import {
  icon, escapeHtml, importanceBars, tag, footer, sectionHead, segmentedLevel, dueLabel, markTerms,
} from '../ui.js';
import { afterArticle } from '../article.js';

export function topicView(store, topicId) {
  const topic = topicById.get(topicId);
  if (!topic) return null;
  const chapter = chapterById.get(topic.chapter);
  const subject = subjectOf(topic.chapter);
  const entry = store.entry(topic.id);
  const level = entry?.level || 0;
  const links = (topic.links || []).map((l) => ({ ...l, topic: topicById.get(l.to) })).filter((l) => l.topic);
  const chains = chainsOfTopic(topic.id);
  const { prev, next } = adjacentTopics(topic.id);
  const siblings = topicsOfChapter(topic.chapter);
  const cstats = chapterStats(store, topic.chapter);
  const t = today();
  const pending = !!topic.pending;

  return `<section class="view view-topic is-${subject?.id || 'my'}">
    <nav class="breadcrumb" aria-label="面包屑">
      <a href="#/map">知识地图</a>
      <span class="bc-sep">/</span>
      <a href="#/chapter/${chapter.id}">${chapter.no} ${escapeHtml(chapter.short)}</a>
      <span class="bc-sep">/</span>
      <span class="bc-current">专题 ${String(topic.order).padStart(2, '0')}</span>
    </nav>

    <div class="topic-layout">
      <aside class="topic-rail">
        <div class="rail-sticky">
          <p class="eyebrow">IN THIS CHAPTER</p>
          <a class="rail-chapter" href="#/chapter/${chapter.id}">
            <span class="rc-no">${chapter.no}</span>
            <span class="rc-title">${escapeHtml(chapter.short)}<small>${siblings.length} 个专题</small></span>
          </a>
          <nav class="rail-topics" aria-label="本章专题">
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
          <p class="eyebrow">${subject?.name || ''} · CHAPTER ${chapter.no} · 专题 ${String(topic.order).padStart(2, '0')}</p>
          <h1>${escapeHtml(topic.title)}</h1>
          <p class="topic-subtitle">${escapeHtml(topic.kicker)}</p>
          <div class="topic-meta">
            <span class="meta-block"><span class="meta-label">考频</span>${importanceBars(topic.importance)}</span>
            <span class="meta-block"><span class="meta-label">题型</span>${(topic.exam?.types || []).map((x) => tag(x, 'plain')).join('')}</span>
            <span class="meta-block"><span class="meta-label">知识点</span><span>${topic.points.length} 条</span></span>
            <span class="meta-block"><span class="meta-label">状态</span><span>${pending ? '待补' : level ? ['', '初识', '熟悉', '掌握', '熟练'][level] : '未学'}</span></span>
          </div>
        </header>

        <section class="takeaway">
          <div class="takeaway-label">${icon('spark', 14)} 一句话抓手</div>
          <p>${markTerms(topic.takeaway)}</p>
        </section>

        <div class="topic-level-row">
          <span class="eyebrow">掌握度</span>
          ${segmentedLevel(level, topic.id)}
          <span class="tl-hint">${entry?.last ? `上次 ${shortDate(entry.last)} · ` : ''}${entry?.due ? `下次 ${dueLabel(entry.due, t)}` : '标记后自动排期'}</span>
        </div>

        ${links.length ? `<div class="quick-links">
          <span class="ql-label">${icon('link', 12)} 串联</span>
          ${links.slice(0, 4).map((l) => `<a href="#/topic/${l.topic.id}">${escapeHtml(l.topic.title)}</a>`).join('')}
          <a class="ql-more" href="#/map">知识地图 ${icon('arrowRight', 12)}</a>
        </div>` : ''}

        ${pending ? `<section class="pending-card">
          ${icon('info', 18)}
          <div>
            <h3>这一专题还在整理</h3>
            <p>骨架已经放进地图，正文和速记点等这一轮笔记补齐后再填。可以先看同板块已经写好的专题，或者回到术语库过一遍核心定义。</p>
            <a class="text-link" href="#/chapter/${chapter.id}">回到本板块 ${icon('arrowRight', 13)}</a>
          </div>
        </section>` : `
        <nav class="study-jump" aria-label="本页学习顺序">
          <a href="#recite">01 背诵</a>
          <a href="#understand">02 理解</a>
          ${topic.pitfalls?.length ? '<a href="#traps">03 题眼</a>' : ''}
          <a href="#links">${topic.pitfalls?.length ? '04' : '03'} 串联</a>
        </nav>

        <section class="study-aids" id="recite">
          <article class="study-card recite-card">
            <div class="sc-head"><span class="sc-icon">${icon('book', 16)}</span><div><p class="eyebrow">MEMORIZE</p><h2>背诵清单</h2></div><span class="sc-count">${topic.points.length} 条</span></div>
            <p class="sc-take">${topic.takeaway}</p>
            ${topic.recall ? `<p class="sc-self"><b>先自问：</b>${escapeHtml(topic.recall)}</p>` : ''}
            <ol class="recite-list">
              ${topic.points.slice(0, 6).map((p) => `<li><b>${markTerms(p.t)}</b><span>${markTerms(p.lead)}</span></li>`).join('')}
            </ol>
            ${topic.points.length > 6 ? `<p class="sc-more">其余 ${topic.points.length - 6} 条在下方正文里展开。</p>` : ''}
          </article>

          <article class="study-card answer-card">
            <div class="sc-head"><span class="sc-icon">${icon('target', 16)}</span><div><p class="eyebrow">ANSWER</p><h2>考场答法</h2></div><span class="sc-count">${(topic.exam?.types || ['选择']).join(' / ')}</span></div>
            <div class="answer-steps">
              ${answerSteps(topic).map((s, i) => `<div class="answer-step"><span class="as-no">${i + 1}</span><div><b>${s.label}</b><p>${markTerms(s.text)}</p></div></div>`).join('')}
            </div>
            <p class="answer-hint">${(topic.exam?.types || []).includes('分析') ? '分析题先写原理（原话），再扣材料里的关键词，最后回扣方法论；每段都要有「因为……所以……」。' : '选择题先排绝对化表述（唯一、完全、决定一切），再回到定义核对主语和限定条件。'}</p>
          </article>
        </section>

        ${topic.pitfalls?.length ? `<section class="trap-card" id="traps">
          <div class="trap-head">
            <span class="trap-icon">${icon('alert', 16)}</span>
            <div><p class="eyebrow">TRAPS</p><h2>题眼：选择题常改这几个字</h2></div>
            <span class="sc-count">${topic.pitfalls.length} 条</span>
          </div>
          <ul class="trap-list">
            ${topic.pitfalls.map((p) => `<li><b>${markTerms(p.t)}</b><p>${markTerms(p.b)}</p></li>`).join('')}
          </ul>
        </section>` : ''}

        <section class="study-section" id="understand">
          <header class="study-section-head">
            <div><p class="eyebrow">02 · UNDERSTAND</p><h2>理解：把结论展开一遍</h2><p>按教材的层次整理：定义、条件、关系、易错点。先读正文，再回到上面的背诵清单复盘。</p></div>
            <button type="button" class="text-btn" data-action="print">${icon('print', 14)} 打印</button>
          </header>
          <div class="article-body" id="topic-article">
            <div class="article-loading"><span class="al-dot"></span> 正在展开全文…</div>
          </div>
        </section>`}

        ${links.length ? `<section class="links-section" id="links">
          ${sectionHead({ eyebrow: 'CONNECT', title: '把点连起来', desc: '这些专题和它共享同一套底层逻辑。' })}
          <div class="link-cards">
            ${links.map((l) => `<a class="link-card" href="#/topic/${l.topic.id}">
              <span class="lc-top"><span class="lc-ch">${chapterById.get(l.topic.chapter)?.no || ''} ${escapeHtml(chapterById.get(l.topic.chapter)?.short || '')}</span>${icon('arrowUpRight', 15)}</span>
              <strong>${escapeHtml(l.topic.title)}</strong>
              <p>${l.why}</p>
            </a>`).join('')}
          </div>
        </section>` : ''}

        ${chains.length ? `<section class="topic-chains">
          ${sectionHead({ eyebrow: 'THREADS', title: '在这条脉络里', desc: '同一个思路，在别的板块还会再出现一次。' })}
          <div class="topic-chain-list">
            ${chains.map((c) => `<div class="topic-chain">
              <div class="tc-head"><span class="eyebrow">本学科</span><h4>${escapeHtml(c.title)}</h4><p>${escapeHtml(c.note)}</p></div>
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

        <nav class="topic-pager" aria-label="上下专题">
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
            ${next ? `<a class="btn btn-primary btn-sm" href="#/topic/${next.id}">下一专题 ${icon('arrowRight', 14)}</a>` : `<a class="btn btn-primary btn-sm" href="#/chapter/${chapter.id}">回到本章 ${icon('arrowRight', 14)}</a>`}
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

function stripText(value = '') {
  return String(value).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function answerSteps(topic) {
  const points = topic.points || [];
  const pitfall = topic.pitfalls?.[0];
  return [
    { label: '先交代定义', text: stripText(topic.takeaway) },
    { label: '再列要点', text: points.slice(0, 4).map((p) => p.t).join('；') || '按「是什么－为什么－怎么办」的顺序列。' },
    { label: '最后收口', text: pitfall ? stripText(pitfall.b) : '回到一句话抓手，检查有没有漏掉前提条件。' },
  ];
}

/**
 * 长文按需加载：首次进入专题时 fetch 静态 HTML，不把所有文章塞进主 JS。
 * 失败时退回 points 的速记版，保证页面仍然可读。
 */
export async function hydrateTopicArticle(topicId) {
  const host = document.getElementById('topic-article');
  if (!host) return;
  host.dataset.topicId = topicId;
  const topic = topicById.get(topicId);
  if (!topic) return;

  // 手册类专题：正文直接来自数据里的 points[].body，不需要 fetch。
  if (topic.handbook) {
    host.innerHTML = handbookArticle(topic);
    host.classList.add('is-loaded');
    await afterArticle(host);
    return;
  }

  try {
    const res = await fetch(`/politics-review/assets/content/${topicId}.html`, { cache: 'no-cache' });
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

  await afterArticle(host);
}

function fallbackArticle(topic) {
  const points = (topic.points || []).map((p) => `<section class="article-fallback-point">
    <h2>${escapeHtml(p.t)}</h2>
    ${p.lead ? `<p class="article-fallback-lead">${escapeHtml(p.lead)}</p>` : ''}
  </section>`).join('');
  return `<div class="article-content">
    <p class="article-fallback-note">这个专题的长文还在整理，先保留速记版。</p>
    ${points}
  </div>`;
}

/** 一页纸手册的专题：每个 point 就是原文的一小节。 */
function handbookArticle(topic) {
  const sections = (topic.points || []).map((p) => `<section class="hb-section">
    <h2>${escapeHtml(p.t)}</h2>
    ${p.lead ? `<p class="hb-lead">${markTerms(p.lead)}</p>` : ''}
    ${p.body || ''}
  </section>`).join('');
  return `<div class="article-content hb-article">${sections}</div>
    <p class="article-source">内容整理自《27 考研政治一页纸·知识点手册》${escapeHtml(topic.kicker || '')}，按原书顺序保留。</p>`;
}
