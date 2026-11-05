#!/usr/bin/env python3
"""
从两篇《408 考点强化》里抽取“完整题目”，生成 data/questions-extra.js。

- 只抽 <u>例题 / <u>练习 块；知识点正文里的例题由 build-review-content.py 删除。
- 有选项的题：stem + options + answer；无选项的多问题/综合题：stem + analysis。
- 题目所在小节按 build-review-content.py 的 MAPPING 映射到考点；COA 数据专题里
  MAPPING 没覆盖的小节，用下面的 FALLBACK 行区间补。
- 解析里的图片会复制到 assets/textbook，路径改成绝对路径。
- 不修改源帖子；只写 questions-extra.js（和必要的图片副本）。

用法：
    python scripts/extract-questions.py
"""

from __future__ import annotations

import importlib.util
import json
import re
from pathlib import Path

import markdown

SCRIPT_DIR = Path(__file__).resolve().parent
ROOT = SCRIPT_DIR.parent
spec = importlib.util.spec_from_file_location("build_review_content", SCRIPT_DIR / "build-review-content.py")
brc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(brc)

OUT = ROOT / "source" / "408-review" / "assets" / "js-v3" / "data" / "questions-extra.js"

EXAMPLE_RE = re.compile(r"^<u>(例题|练习)[：:](.*?)</u>\s*$")
HEADING_RE = re.compile(r"^#{1,6}\s+")
YEAR_RE = re.compile(r"【(20\d{2})】")
NO_RE = re.compile(r"第\s*(\d+)\s*题")
OPTION_RE = re.compile(r"^\s*[-*]?\s*([A-F])[.、．]\s+(.+?)\s*$")
ANSWER_RE = re.compile(r"\*\*选\s*([A-F])")
ANSWER_RE2 = re.compile(r"(?:答案|故选|应选)[：:\s]*([A-F])")
TOGGLE_OPEN_RE = re.compile(r"\{%\s*hideToggle[^%]*%\}")
TOGGLE_CLOSE_RE = re.compile(r"\{%\s*endhideToggle\s*%\}")


def strip_markdown(text: str) -> str:
    text = re.sub(r"!\[(.*?)\]\([^)]*\)", r"\1", text)
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"[*_`>#]", "", text)
    return re.sub(r"\s+", " ", text).strip()


def md_to_html(text: str, source_key: str) -> str:
    text = brc.rewrite_images(text, source_key)[0]
    text, slots = brc.protect_math(text)
    md = markdown.Markdown(extensions=["extra", "sane_lists", "md_in_html"])
    html = md.convert(text)
    return brc.restore_math(html, slots)


def inline_html(text: str) -> str:
    text, slots = brc.protect_math(text)
    md = markdown.Markdown(extensions=["extra"])
    html = md.convert(text).strip()
    if html.startswith("<p>") and html.endswith("</p>") and html.count("<p>") == 1:
        html = html[3:-4]
    return brc.restore_math(html, slots)


def parse_block(lines: list[str], start: int) -> tuple[int, str, str, list[str], str]:
    """返回 end, stem_md, analysis_md, options, header."""
    header = lines[start].strip()
    end = len(lines)
    for j in range(start + 1, len(lines)):
        line = lines[j].strip()
        if EXAMPLE_RE.match(line) or HEADING_RE.match(line) or line == "---":
            end = j
            break
    block = lines[start + 1:end]
    text = "\n".join(block)

    open_match = TOGGLE_OPEN_RE.search(text)
    if open_match:
        close_match = TOGGLE_CLOSE_RE.search(text, open_match.end())
        if close_match:
            stem = text[: open_match.start()]
            analysis = text[open_match.end(): close_match.start()]
        else:
            stem, analysis = text, ""
    else:
        stem, analysis = text, ""
    stem = stem.strip()
    analysis = analysis.strip()

    options: list[str] = []
    stem_lines: list[str] = []
    for line in stem.splitlines():
        m = OPTION_RE.match(line)
        if m:
            options.append(m.group(2).strip())
        else:
            stem_lines.append(line)
    stem = "\n".join(stem_lines).strip()

    return end, stem, analysis, options, header


def main() -> None:
    lines_by_source = {k: brc.read_lines(v) for k, v in brc.SOURCES.items()}
    sections_by_source = {k: brc.parse_sections(k, v) for k, v in lines_by_source.items()}

    mapped: list[tuple[str, int, int, str]] = []
    for topic_id, parts in brc.MAPPING.items():
        for source_key, needle, _options in parts:
            try:
                section = brc.find_section(sections_by_source[source_key], needle)
            except SystemExit:
                continue
            mapped.append((source_key, section.start, section.end, topic_id))

    # COA “数据专题”里 MAPPING 未覆盖的几节，按行区间补映射。
    fallback = {
        "coa": [
            (1469 - 1, 1505 - 1, "coa-2-6"),
            (1505 - 1, 1530 - 1, "coa-2-1"),
            (1530 - 1, 1590 - 1, "coa-2-2"),
            (1590 - 1, 1643 - 1, "coa-2-3"),
            (1643 - 1, 1740 - 1, "coa-2-4"),
            (1740 - 1, 1793 - 1, "coa-2-1"),
            (1793 - 1, 1850 - 1, "coa-2-4"),
            (1861 - 1, 1907 - 1, "coa-2-4"),
        ]
    }

    for source_key, ranges in fallback.items():
        for start, end, topic_id in ranges:
            mapped.append((source_key, start, end, topic_id))

    def topic_for(source_key: str, line: int) -> str | None:
        candidates = [
            (end - start, topic_id)
            for sk, start, end, topic_id in mapped
            if sk == source_key and start <= line < end
        ]
        if not candidates:
            return None
        candidates.sort(key=lambda x: x[0])
        return candidates[0][1]

    questions: list[dict] = []
    skipped: list[tuple[str, int, str, str]] = []

    for source_key, lines in lines_by_source.items():
        for i, line in enumerate(lines):
            header_match = EXAMPLE_RE.match(line.strip())
            if not header_match:
                continue
            kind, header_tail = header_match.group(1), header_match.group(2)
            end, stem_md, analysis_md, options, header = parse_block(lines, i)
            if not stem_md:
                skipped.append((source_key, i + 1, header, "empty stem"))
                continue

            topic_id = topic_for(source_key, i)
            if not topic_id:
                skipped.append((source_key, i + 1, header, "no topic mapping"))
                continue

            year_match = YEAR_RE.search(header_tail)
            year = int(year_match.group(1)) if year_match else None
            no_match = NO_RE.search(header_tail)
            no = no_match.group(1) if no_match else ""
            # 源帖有些题在题干里又写了一遍【年份】，进题库时去掉。
            stem_md = re.sub(r"^\s*【20\d{2}】\s*", "", stem_md)
            stem_plain = strip_markdown(stem_md)
            numbered_parts = bool(re.search(r"(?m)^\s*\d+[.、．]\s*", stem_md))
            has_toggle = bool(analysis_md)

            # 存储专题 / 数据专题里那些没有选项、没有分问、篇幅很短的小例子，
            # 不是完整题目，不进题库。
            if not year and not options and not numbered_parts and len(stem_plain) < 120:
                skipped.append((source_key, i + 1, header, "small example"))
                continue
            if not has_toggle and not options:
                skipped.append((source_key, i + 1, header, "no analysis"))
                continue

            stem_html = md_to_html(stem_md, source_key)
            # 选项写在代码块里的题，抽走选项后会留下空代码块。
            stem_html = re.sub(r"<pre><code[^>]*>\s*</code></pre>", "", stem_html)
            stem_html = re.sub(r"<p>\s*</p>", "", stem_html).strip()
            analysis_html = md_to_html(analysis_md, source_key) if analysis_md else ""
            answer = ""
            if options:
                answer_match = ANSWER_RE.search(analysis_md) or ANSWER_RE2.search(analysis_md)
                if answer_match:
                    answer = answer_match.group(1)

            chapter = "-".join(topic_id.split("-")[:2])
            question = {
                "id": f"q-auto-{source_key}-{i + 1}",
                "year": year,
                "no": no,
                "label": "例题" if not no else "",
                "subject": "ds" if source_key == "ds" else "coa",
                "chapter": chapter,
                "topics": [topic_id],
                "type": "选择" if options else "综合",
                "difficulty": 3,
                "tags": [kind],
                "stem": stem_html,
                "options": [inline_html(opt) for opt in options] if options else None,
                "answer": answer,
                "analysis": analysis_html,
            }
            questions.append(question)

    OUT.write_text(
        "/**\n * 由 scripts/extract-questions.py 从两篇《408 考点强化》自动抽取。\n"
        " * 不要手改本文件；要改题目请改源帖子或抽取脚本，然后重新运行。\n */\n\n"
        "export const EXTRA_QUESTIONS = "
        + json.dumps(questions, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )

    print(f"questions: {len(questions)}")
    print(f"skipped:   {len(skipped)}")
    for item in skipped[:40]:
        print("  skip", item)
    print(f"output:    {OUT}")


if __name__ == "__main__":
    main()
