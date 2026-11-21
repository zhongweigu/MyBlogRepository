/**
 * 长文渲染后的增强：MathJax 公式 + Mermaid 图。
 *
 * 这两个库不放在页面头部，只有当前考点长文真的出现公式 / mermaid 时才加载。
 * 这样今日页、地图、真题页不会被 CDN 拖慢；文章页也保留失败降级（原始文本/代码）。
 */

const MATHJAX_SRC = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
const MERMAID_SRC = 'https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js';

let mathLoading = null;
let mermaidLoading = null;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`load failed: ${src}`));
    document.head.appendChild(script);
  });
}

async function ensureMathJax() {
  if (window.MathJax?.typesetPromise) return window.MathJax;
  if (!mathLoading) {
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true,
      },
      options: {
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
      },
      startup: { typeset: false },
    };
    mathLoading = loadScript(MATHJAX_SRC)
      .then(() => window.MathJax)
      .catch((err) => {
        mathLoading = null;
        throw err;
      });
  }
  return mathLoading;
}

async function ensureMermaid() {
  if (window.mermaid?.run) return window.mermaid;
  if (!mermaidLoading) {
    mermaidLoading = loadScript(MERMAID_SRC)
      .then(() => window.mermaid)
      .catch((err) => {
        mermaidLoading = null;
        throw err;
      });
  }
  return mermaidLoading;
}

export async function afterArticle(host) {
  if (!host) return;
  await Promise.all([typesetMath(host), renderMermaid(host)]);
  host.querySelectorAll('details').forEach((details) => {
    if (details.dataset.articleBound) return;
    details.dataset.articleBound = '1';
    details.addEventListener('toggle', () => {
      if (!details.open) return;
      typesetMath(details);
      renderMermaid(details);
    });
  });
}

/** 题库的题干 / 选项 / 解析也走同一套 MathJax。 */
export async function renderMath(host) {
  if (!host) return;
  await typesetMath(host);
}

async function typesetMath(host) {
  if (!/\$[^$]/.test(host.textContent || '')) return;
  let mathJax;
  try {
    mathJax = await ensureMathJax();
  } catch (err) {
    console.warn('[408] MathJax 加载失败，保留原始公式', err);
    return;
  }
  if (!mathJax?.typesetPromise) return;
  try {
    if (mathJax.startup?.promise) await mathJax.startup.promise;
    await mathJax.typesetPromise([host]);
  } catch (err) {
    console.warn('[408] 公式渲染失败，保留原始公式', err);
  }
}

async function renderMermaid(host) {
  const nodes = [...host.querySelectorAll('pre.mermaid')];
  if (!nodes.length) return;
  let mermaid;
  try {
    mermaid = await ensureMermaid();
  } catch (err) {
    console.warn('[408] mermaid 加载失败，保留代码', err);
    return;
  }
  if (!mermaid?.run) return;
  try {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      securityLevel: 'loose',
      fontFamily: '"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif',
      flowchart: { curve: 'basis', htmlLabels: true, useMaxWidth: true },
    });
    await mermaid.run({ nodes });
  } catch (err) {
    console.warn('[408] mermaid 渲染失败，保留代码', err);
  }
}
