import { topicById, chapterById, subjectById } from './data/index.js';
import { icon, escapeHtml, showOverlay, closeOverlay, toast } from './ui.js';

const RATINGS = [
  { key: 'forgot', label: '忘记', hint: '明天再来', cls: 'r-forgot' },
  { key: 'fuzzy', label: '模糊', hint: '1 天后', cls: 'r-fuzzy' },
  { key: 'known', label: '记得', hint: '3~7 天后', cls: 'r-known' },
  { key: 'easy', label: '熟练', hint: '7~15 天后', cls: 'r-easy' },
];

export function startRunner(store, queue, { title = '今日复习', onClose = null } = {}) {
  const items = queue
    .map((item) => {
      const id = typeof item === 'string' ? item : item.id;
      const topic = topicById.get(id);
      return topic ? { topic, kind: typeof item === 'string' ? 'due' : item.kind } : null;
    })
    .filter(Boolean);

  if (!items.length) {
    toast('今天没有待复习的专题，先去地图挑一个吧。');
    return;
  }

  let cursor = 0;
  let revealed = false;
  const results = [];
  const startedAt = Date.now();
  let onCloseCallback = onClose;

  const el = showOverlay(`<div class="runner" data-keys="custom">
    <header class="runner-top">
      <button type="button" class="icon-btn runner-close" data-runner-close aria-label="结束复习">${icon('close', 20)}</button>
      <div class="runner-progress" aria-hidden="true"><i></i></div>
      <span class="runner-counter" aria-live="polite"></span>
    </header>
    <main class="runner-stage" id="runner-stage"></main>
  </div>`, {
    className: 'overlay-runner is-open',
    onClose: () => { if (onCloseCallback) onCloseCallback(); },
  });

  el.dataset.keys = 'custom';

  function progress() {
    el.querySelector('.runner-progress i').style.width = `${(cursor / items.length) * 100}%`;
    el.querySelector('.runner-counter').textContent = `${Math.min(cursor + 1, items.length)} / ${items.length}`;
  }

  function renderCard() {
    const stage = el.querySelector('#runner-stage');
    if (cursor >= items.length) {
      renderDone();
      return;
    }
    revealed = false;
    const item = items[cursor];
    const topic = item.topic;
    const chapter = chapterById.get(topic.chapter);
    const subject = subjectById.get(chapter?.subject);
    const kindLabel = item.kind === 'new' ? '新专题' : item.kind === 'chapter' ? '本章滚动' : item.kind === 'extra' ? '抽查' : '到期复习';
    progress();
    stage.innerHTML = `<article class="runner-card is-my">
      <div class="runner-card-top">
        <span class="eyebrow">${subject?.name || ''} · ${chapter?.no || ''} ${escapeHtml(chapter?.short || '')}</span>
        <span class="runner-kind ${item.kind === 'new' ? 'is-new' : ''}">${kindLabel}</span>
      </div>
      <h2 id="runner-title">${escapeHtml(topic.title)}</h2>
      <p class="runner-kicker">${escapeHtml(topic.kicker)}</p>
      <div class="runner-prompt">
        <span class="rp-label">${icon('target', 14)} 先回忆</span>
        <p>${escapeHtml(topic.recall || '不看笔记，说出这个专题的 2~3 个关键词，再给出一条结论。')}</p>
      </div>
      <div class="runner-reveal" hidden>
        <div class="runner-takeaway">
          <span class="rt-label">一句话抓手</span>
          <p>${topic.takeaway}</p>
        </div>
        <ul class="runner-points">
          ${topic.points.slice(0, 3).map((p) => `<li><span>${escapeHtml(p.t)}</span><small>${escapeHtml(p.lead)}</small></li>`).join('')}
        </ul>
        <a class="runner-link" href="#/topic/${topic.id}">打开完整专题 ${icon('arrowRight', 14)}</a>
      </div>
      <div class="runner-actions">
        <button type="button" class="btn btn-primary runner-show" data-runner-show>显示要点 <kbd>Space</kbd></button>
        <span class="runner-hint">想不起来也没关系，先给它一个评分。</span>
        <button type="button" class="text-btn runner-skip" data-runner-skip>跳过这道</button>
      </div>
      <div class="runner-rate" hidden>
        <p class="rate-label">这次回忆得怎么样？</p>
        <div class="rate-grid">
          ${RATINGS.map((r, i) => `<button type="button" class="rate-btn ${r.cls}" data-rating="${r.key}">
            <span class="rate-key"><kbd>${i + 1}</kbd></span>
            <strong>${r.label}</strong>
            <small>${r.hint}</small>
          </button>`).join('')}
        </div>
      </div>
    </article>`;
    stage.querySelector('[data-runner-show]')?.focus({ preventScroll: true });
  }

  function reveal() {
    if (revealed) return;
    revealed = true;
    const card = el.querySelector('.runner-card');
    if (!card) return;
    card.querySelector('.runner-reveal').hidden = false;
    card.querySelector('.runner-actions').hidden = true;
    card.querySelector('.runner-rate').hidden = false;
    card.querySelector('.rate-btn')?.focus({ preventScroll: true });
  }

  function rate(key) {
    if (!revealed) return;
    const item = items[cursor];
    const res = store.rate(item.topic.id, key);
    results.push({ id: item.topic.id, rating: key });
    toast(`已标记「${RATINGS.find((r) => r.key === key)?.label}」· ${res.gap} 天后再见`, 'success');
    const card = el.querySelector('.runner-card');
    if (card) card.classList.add('is-leaving');
    setTimeout(() => {
      cursor += 1;
      renderCard();
    }, 170);
  }

  function skip() {
    cursor += 1;
    renderCard();
  }

  function renderDone() {
    el.querySelector('.runner-progress i').style.width = '100%';
    el.querySelector('.runner-counter').textContent = `${items.length} / ${items.length}`;
    const minutes = Math.max(1, Math.round((Date.now() - startedAt) / 60000));
    const counts = RATINGS.map((r) => ({ ...r, n: results.filter((x) => x.rating === r.key).length }));
    const stage = el.querySelector('#runner-stage');
    stage.innerHTML = `<div class="runner-done">
      <div class="done-mark">${icon('check', 30)}</div>
      <p class="eyebrow">ROUND COMPLETE</p>
      <h2>这一轮完成</h2>
      <p class="done-sub">${items.length} 个专题 · 约 ${minutes} 分钟。到期安排已经写回本地。</p>
      <div class="done-stats">
        ${counts.map((c) => `<div class="${c.cls}"><strong>${c.n}</strong><span>${c.label}</span></div>`).join('')}
      </div>
      <div class="done-actions">
        <button type="button" class="btn" data-runner-restart>${icon('rotate', 15)} 再过一轮</button>
        <button type="button" class="btn btn-primary" data-runner-close>回到复习台 ${icon('arrowRight', 15)}</button>
      </div>
    </div>`;
    stage.querySelector('[data-runner-close]')?.focus({ preventScroll: true });
  }

  function restart() {
    cursor = 0;
    results.length = 0;
    renderCard();
  }

  function close() {
    closeOverlay();
  }

  el.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#/"]');
    if (link) {
      closeOverlay(false);
      return;
    }
    if (e.target.closest('[data-runner-close]')) {
      close();
      return;
    }
    if (e.target.closest('[data-runner-show]')) {
      reveal();
      return;
    }
    if (e.target.closest('[data-runner-skip]')) {
      skip();
      return;
    }
    if (e.target.closest('[data-runner-restart]')) {
      restart();
      return;
    }
    const rating = e.target.closest('[data-rating]');
    if (rating) rate(rating.dataset.rating);
  });

  function onKey(e) {
    if (!document.body.contains(el)) {
      document.removeEventListener('keydown', onKey, true);
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }
    if (e.code === 'Space' && !revealed) {
      e.preventDefault();
      reveal();
      return;
    }
    if (revealed && ['1', '2', '3', '4'].includes(e.key)) {
      e.preventDefault();
      rate(RATINGS[Number(e.key) - 1].key);
    }
  }
  document.addEventListener('keydown', onKey, true);

  // 点击外部不关闭；结束按钮或 Esc 关闭
  renderCard();
}
