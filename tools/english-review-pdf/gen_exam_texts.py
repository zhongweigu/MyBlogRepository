"""从 sec-<年份>.txt 生成 exam-texts.js（四版范文 + 中文对照）。"""
import json
import os
import re

HERE = os.path.dirname(__file__)
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT = os.path.join(HERE, "out")
TARGET = os.path.join(ROOT, "source", "english-review", "assets", "js-v2", "data", "exam-texts.js")
YEARS = ["2026", "2025", "2024", "2023", "2022", "2021", "2020"]
VERSIONS = ["满分版", "简化版", "速通版 · 标准套写", "速通版 · 无脑套写"]


def parse_year(year):
    text = open(os.path.join(OUT, f"sec-{year}.txt"), encoding="utf-8").read()
    text = re.sub(r"作文大观 · 英语一\n.*?\n南萧极简考研\n\d+\n", "\n", text)
    text = re.sub(r"===== PAGE \d+ =====", "\n", text)
    lines = [l.rstrip() for l in text.splitlines()]
    starts = [(i, l.strip()) for i, l in enumerate(lines) if l.strip() in VERSIONS]
    versions = []
    for k, (i, name) in enumerate(starts):
        end = starts[k + 1][0] if k + 1 < len(starts) else len(lines)
        clean = [x.strip() for x in lines[i:end]
                 if x.strip() and "南萧极简考研" not in x and "作文大观" not in x]
        theme = next((x for x in clean if x.startswith("核心主题")), "")
        theme = re.sub(r"^核心主题：\s*", "", theme)
        wc = re.search(r"(\d+)\s*词", theme)
        words = int(wc.group(1)) if wc else None
        theme = re.sub(r"\s*\d+\s*词\s*$", "", theme).strip()
        try:
            a = clean.index("范文")
            b = clean.index("中文对照")
        except ValueError:
            a = b = -1
        essay_lines = clean[a + 1:b] if a >= 0 else []
        zh_lines = []
        if b >= 0:
            for x in clean[b + 1:]:
                if x.startswith("写作解析"):
                    break
                zh_lines.append(x)
        essay = " ".join(essay_lines)
        essay = re.sub(r"(\w)- (\w)", r"\1-\2", essay)
        essay = re.sub(r"\s+([,.;:])", r"\1", essay)
        essay = re.sub(r"\s{2,}", " ", essay).strip()
        zh = "".join(zh_lines).replace(" ", "")
        versions.append({"name": name, "theme": theme, "words": words, "essay": essay, "zh": zh})
    return versions


def main():
    data = {y: parse_year(y) for y in YEARS}
    js = ("// 由 PDF 自动抽取的范文与中文对照（2020–2026 × 4 版）\n"
          "// 来源 A：大作文一页纸（套写实操-英一）.pdf；仅做断行修复，未改动词句。\n\n"
          "export const EXAM_TEXTS = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n")
    with open(TARGET, "w", encoding="utf-8") as fh:
        fh.write(js)
    print("wrote", TARGET, os.path.getsize(TARGET), "bytes")


if __name__ == "__main__":
    main()
