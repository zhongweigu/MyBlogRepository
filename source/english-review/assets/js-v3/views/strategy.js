import { STRATEGY } from "../data/meta.js";
import { escapeHtml, footer, pageHead } from "../ui.js";

export function strategyView(parts, query) {
  if (!parts[1]) {
    return `<section class="view view-strategy">
      ${pageHead({
        eyebrow: "STRATEGY · 策略",
        title: "只讲“这句什么时候用”",
        desc: "四种题型各一篇：先看图/材料，再按步骤套模板。没有“X 步法”“N 种方法”，只有可执行的顺序。",
      })}
      <div style="margin-top:6px">
        ${STRATEGY.map((s) => `<a href="#/strategy/${s.id}" style="display:block;padding:14px 2px;border-bottom:1px solid var(--line-soft)">
          <span class="small muted" style="font-family:var(--mono);margin-right:10px">${s.no}</span>
          <span style="font-family:var(--serif);font-size:17px;color:var(--ink)">${escapeHtml(s.title)}</span>
          <span class="small muted" style="display:block;margin:4px 0 0 34px">${escapeHtml(s.desc)}</span>
        </a>`).join("")}
      </div>
      ${footer()}
    </section>`;
  }

  const id = parts[1];
  const idx = STRATEGY.findIndex((s) => s.id === id);
  if (idx < 0) return null;
  const s = STRATEGY[idx];
  const prev = STRATEGY[idx - 1];
  const next = STRATEGY[idx + 1];

  return `<section class="view view-strategy">
    <p class="small muted" style="margin:0 0 10px"><a href="#/strategy">← 策略目录</a>　${s.no}　${s.minutes} 分钟</p>
    ${pageHead({ eyebrow: `STRATEGY ${s.no}`, title: s.title, desc: s.desc })}
    <article class="article-body" id="strategy-article" data-article="${s.id}">
      <p class="muted">正在读取正文…</p>
    </article>
    <div style="display:flex;justify-content:space-between;gap:12px;margin-top:30px;padding-top:12px;border-top:1px solid var(--line)">
      <span>${prev ? `<a class="small" href="#/strategy/${prev.id}">← ${escapeHtml(prev.title)}</a>` : ""}</span>
      <span>${next ? `<a class="small" href="#/strategy/${next.id}">${escapeHtml(next.title)} →</a>` : ""}</span>
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
    host.innerHTML = await res.text();
    host.dataset.loaded = "1";
  } catch (err) {
    host.innerHTML = `<p class="muted">正文读取失败（${escapeHtml(err.message)}）。</p>`;
  }
}
