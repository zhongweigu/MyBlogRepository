#!/usr/bin/env python3
"""
从数据结构长文里抽取代码块，生成 data/code.js。
说明性文字取代码前最近的一段；标题取最近的 h2/h3/h4。
用法：python scripts/extract-code.py
"""

from __future__ import annotations

import json
import re
from pathlib import Path

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "source" / "408-review" / "assets" / "content"
OUT = ROOT / "source" / "408-review" / "assets" / "js-v25" / "data" / "code.js"

# 只收知识点里的代码；复杂度例题、例题/练习/习题里的代码不收。
SKIP_TOPICS = {"ds-1-1", "ds-1-2"}
SKIP_HEADING = re.compile(r"例题|练习|习题|真题|题目")


def clean(text: str) -> str:
    return re.sub(r"\s+", " ", text or "").strip()


def main() -> None:
    snippets = []
    for path in sorted(CONTENT.glob("ds-*.html")):
        topic = path.stem
        if topic in SKIP_TOPICS:
            continue
        chapter = "-".join(topic.split("-")[:2])
        soup = BeautifulSoup(path.read_text(encoding="utf-8"), "html.parser")
        content = soup.select_one(".article-content") or soup
        heading = ""
        last_para = ""
        seen = set()
        for node in content.descendants:
            if getattr(node, "name", None) in {"h2", "h3", "h4"}:
                heading = clean(node.get_text())
                last_para = ""
            elif getattr(node, "name", None) == "p":
                text = clean(node.get_text())
                if text:
                    last_para = text
            elif getattr(node, "name", None) == "code":
                pre = node.find_parent("pre")
                if not pre:
                    continue
                if node.find_parent("details") is not None:
                    summary = node.find_parent("details").find("summary")
                    if summary and re.search(r"例题|练习|习题|真题|题目|答案|解析|查看", summary.get_text()):
                        continue
                if SKIP_HEADING.search(heading):
                    continue
                code = node.get_text("\n").strip()
                if len(code) < 35 or code in seen:
                    continue
                # 跳过“选项代码块”：多行以 A./B. 开头
                lines = [x.strip() for x in code.splitlines() if x.strip()]
                if len(lines) >= 2 and all(re.match(r"^[A-F][.、．]", x) for x in lines[:4]):
                    continue
                seen.add(code)
                class_attr = " ".join(node.get("class") or [])
                lang = "c" if "language-c" in class_attr else "text"
                snippets.append({
                    "id": f"code-{topic}-{len(snippets) + 1}",
                    "topic": topic,
                    "chapter": chapter,
                    "title": heading or topic,
                    "lang": lang,
                    "explanation": last_para[:260],
                    "code": code,
                })

    OUT.write_text(
        "/**\n * 由 scripts/extract-code.py 从数据结构长文自动抽取。\n"
        " * 不要手改；要调整标题/说明，先改 content 或脚本后重跑。\n */\n\n"
        "export const CODE_SNIPPETS = "
        + json.dumps(snippets, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )
    print(f"code snippets: {len(snippets)}")
    print(f"output: {OUT}")


if __name__ == "__main__":
    main()
