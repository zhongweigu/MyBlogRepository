import { STRATEGY, SITE } from "../data/meta.js";
import { escapeHtml, icon, footer, srcMark } from "../ui.js";

function hub() {
  return `<section class="view view-strategy">
    <div class="en-hero">
      <div>
        <p class="eyebrow">STRATEGY · 策略</p>
        <h1>先决定<em>怎么写</em>，再决定写什么词</h1>
        <p class="lede">这一部分不重复模板，而是解决审题、立意、结构、选模板、检查这五个决策。依据是考试大纲、教育部《试题分析 / 试题评价》原文与 2020–2026 真题，个人经验与扩充内容单独标注。</p>
      </div>
      <div class="en-hero-side">
        <div class="en-hero-stat"><span>篇目</span><b>${STRATEGY.length}</b></div>
        <div class="en-hero-stat"><span>官方原文</span><b>3 年</b></div>
        <div class="en-hero-stat"><span>真题</span><b>7 年</b></div>
        <div class="en-hero-stat"><span>更新</span><b>${SITE.updated}</b></div>
      </div>
    </div>

    <div class="en-note" style="margin-top:16px">${srcMark("A")} 官方文件与大钢原文；${srcMark("B")} 对多份材料的归纳；${srcMark("C")} Agent 依据真题规律补充的方法与例子。三类标记在正文中逐段出现，不混写。</div>

    <div class="en-grid cols-2" style="margin-top:18px">
      ${STRATEGY.map((s) => `<a class="en-card" href="#/strategy/${s.id}">
        <span class="en-card-no">${s.no} · ${s.minutes} MIN</span>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
        <span class="en-card-foot">${s.tags.join(" / ")}</span>
      </a>`).join("")}
    </div>

    ${footer()}
  </section>`;
}

export function strategyView(parts, query) {
  if (!parts[1]) return hub();
  const id = parts[1];
  const idx = STRATEGY.findIndex((s) => s.id === id);
  if (idx < 0) return null;
  const s = STRATEGY[idx];
  const prev = STRATEGY[idx - 1];
  const next = STRATEGY[idx + 1];
  return `<section class="view view-strategy">
    <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:12px">
      <a class="text-link" href="#/strategy">${icon("arrowRight", 14)} 返回策略目录</a>
      <span class="en-tag">${s.no}</span>
      <span class="en-tag">${s.minutes} 分钟</span>
      ${s.tags.map((t) => `<span class="en-tag">${t}</span>`).join("")}
    </div>
    <div class="en-hero" style="grid-template-columns:1fr">
      <div>
        <p class="eyebrow">STRATEGY ${s.no}</p>
        <h1 style="font-size:clamp(24px,3vw,34px)">${s.title}</h1>
        <p class="lede">${s.desc}</p>
      </div>
    </div>
    <article class="article-body" id="strategy-article" data-article="${s.id}" style="margin-top:22px">
      <p class="article-loading">正在读取正文…</p>
    </article>
    <div class="en-grid cols-2" style="margin-top:26px">
      ${prev ? `<a class="en-card" href="#/strategy/${prev.id}"><span class="en-card-no">← 上一篇</span><h3>${prev.title}</h3></a>` : "<div></div>"}
      ${next ? `<a class="en-card" href="#/strategy/${next.id}"><span class="en-card-no">下一篇 →</span><h3>${next.title}</h3></a>` : "<div></div>"}
    </div>
    ${footer()}
  </section>`;
}

export async function hydrateStrategy(id) {
  const host = document.getElementById("strategy-article");
  if (!host || host.dataset.loaded === "1") return;
  try {
    const res = await fetch(`/english-review/assets/content/${id}.html`, { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    host.innerHTML = html;
    host.dataset.loaded = "1";
    // 生成文内目录
    const heads = Array.from(host.querySelectorAll("h2"));
    if (heads.length >= 3) {
      const toc = document.createElement("details");
      toc.className = "article-toc";
      toc.open = true;
      toc.innerHTML = `<summary><span>本文目录</span></summary><div class="toc"><ul>${heads
        .map((h, i) => {
          const hid = `sec-${i}`;
          h.id = hid;
          return `<li><a href="#${hid}" data-local-anchor>${h.textContent}</a></li>`;
        })
        .join("")}</ul></div>`;
      const lead = host.querySelector(".article-lead");
      if (lead) lead.after(toc);
      else host.insertBefore(toc, host.firstChild);
    }
  } catch (err) {
    host.innerHTML = `<p class="muted">正文读取失败（${escapeHtml(err.message)}）。如果是本地打开文件，请用本地服务器访问；线上环境请检查 assets/content/${id}.html 是否存在。</p>`;
  }
}
