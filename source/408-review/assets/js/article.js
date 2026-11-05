/**
 * 长文渲染后的增强：MathJax 公式 + Mermaid 图。
 * 外部库按需等待，加载失败时保留原始文本 / 代码，不影响正文阅读。
 */

async function waitFor(getter, timeout = 7000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const value = getter();
    if (value) return value;
    await new Promise((resolve) => setTimeout(resolve, 80));
  }
  return null;
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

async function typesetMath(host) {
  if (!/\$[^$]/.test(host.textContent || '')) return;
  const mathJax = await waitFor(() => (window.MathJax?.typesetPromise ? window.MathJax : null));
  if (!mathJax) return;
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
  const mermaid = await waitFor(() => (window.mermaid?.run ? window.mermaid : null));
  if (!mermaid) return;
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
