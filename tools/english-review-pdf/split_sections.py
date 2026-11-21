"""把套写实操按年份切段，并生成 compact digest（四版范文 + 审题）。"""
import os
import re

HERE = os.path.dirname(__file__)
OUT = os.path.join(HERE, "out")
YEARS = ["2026", "2025", "2024", "2023", "2022", "2021", "2020"]
VERSIONS = ["满分版", "简化版", "速通版 · 标准套写", "速通版 · 无脑套写"]


def clean(text):
    text = re.sub(r"作文大观 · 英语一\n.*?\n南萧极简考研\n\d+\n", "\n", text)
    return re.sub(r"===== PAGE \d+ =====", "\n", text)


def main():
    src = os.path.join(OUT, "大作文一页纸（套写实操-英一）.txt")
    txt = open(src, encoding="utf-8").read()
    pages = re.split(r"===== PAGE (\d+) =====", txt)
    page_map = {int(pages[i]): pages[i + 1] for i in range(1, len(pages), 2)}
    ranges = {"2026": (9, 21), "2025": (22, 34), "2024": (35, 47), "2023": (48, 60),
              "2022": (61, 73), "2021": (74, 86), "2020": (87, 99)}
    digest = []
    for year in YEARS:
        a, b = ranges[year]
        body = "".join(f"\n===== PAGE {i} =====\n" + page_map[i] for i in range(a, b + 1) if i in page_map)
        body = body.replace("南萧时刻自信冷静 南萧极简考研\n", "")
        with open(os.path.join(OUT, f"sec-{year}.txt"), "w", encoding="utf-8") as fh:
            fh.write(body)
        lines = clean(body).splitlines()
        starts = [(i, l.strip()) for i, l in enumerate(lines) if l.strip() in VERSIONS]
        digest.append(f"\n########## {year} ##########")
        for k, (i, name) in enumerate(starts):
            end = starts[k + 1][0] if k + 1 < len(starts) else len(lines)
            block = [x.strip() for x in lines[i:end]
                     if x.strip() and "南萧极简考研" not in x and not re.fullmatch(r"\d+", x.strip())]
            theme = next((x for x in block if x.startswith("核心主题")), "")
            try:
                a1, b1 = block.index("范文"), block.index("中文对照")
                essay = " ".join(block[a1 + 1:b1])
            except ValueError:
                essay = ""
            digest.append(f"-- {name} | {theme}")
            digest.append(essay)
        m = re.search(r"一、审题与主题分析(.*?)二、第一段怎样组织", clean(body), re.S)
        if m:
            note = [l.strip() for l in m.group(1).splitlines() if l.strip() and "南萧极简考研" not in l]
            digest.append("【审题】 " + " ".join(note))
    with open(os.path.join(OUT, "digest.txt"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(digest))
    print("done:", os.path.join(OUT, "digest.txt"))


if __name__ == "__main__":
    main()
