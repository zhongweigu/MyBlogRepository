#!/usr/bin/env python3
"""
408 复习台 · 长文内容生成器
================================
把站内两篇《408 考点强化》和《COA-Review》的正文，按「考点」切段，
转成复习台可直接 fetch 的 HTML（含目录、折叠解析、公式、表格和插图）。

用法：
    python scripts/build-review-content.py

输出：
    source/408-review/assets/content/<topic-id>.html
    source/408-review/assets/textbook/<prefix>-<name>.webp

说明：
- 源帖子只读，不修改；复习台的文章是生成的静态文件。
- 图片统一压缩为 WebP（长边 <= 1400），路径改成 /408-review/assets/textbook/...
- 数学公式保留 $...$ / $$...$$，由页面里的 MathJax 渲染。
- mermaid 代码保留为 <pre class="mermaid">，由页面里的 mermaid 渲染。
"""

from __future__ import annotations

import html
import os
import re
from pathlib import Path

import markdown
from bs4 import BeautifulSoup
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "source" / "_posts"
OUT_CONTENT = ROOT / "source" / "408-review" / "assets" / "content"
OUT_IMAGES = ROOT / "source" / "408-review" / "assets" / "textbook"

SOURCES = {
    "ds": SOURCE_DIR / "408考点强化-数据结构.md",
    "coa": SOURCE_DIR / "408考点强化-计算机组成原理.md",
    "review": SOURCE_DIR / "COA-Review.md",
}

IMAGE_PREFIX = {"ds": "ds", "coa": "coa", "review": "review"}

# topic id -> [(source key, heading needle, options?)]
# needle 用标题里的唯一片段，避免把长标题里的引号写死。
MAPPING: dict[str, list[tuple[str, str, dict | None]]] = {
    "ds-1-1": [
        ("ds", "题型1-单层循环", None),
        ("ds", "题型3-for循环嵌套", None),
        ("ds", "习题训练", None),
    ],
    "ds-1-2": [("ds", "题型2-递归", None)],
    "ds-2-1": [("ds", "考点1-线性表的基本操作", None)],
    "ds-2-2": [
        ("ds", "考点2-栈和队列的基本操作", None),
        ("ds", "考点4-假溢出和循环队列", None),
    ],
    "ds-2-6": [("ds", "考点3-卡特兰数", None)],
    "ds-2-3": [("ds", "考点5-栈的应用", None)],
    "ds-2-7": [("ds", "考点6-队列的应用", None)],
    "ds-2-4": [("ds", "考点7-稀疏矩阵", None)],
    "ds-2-5": [("ds", "考点8-KMP", None)],
    "ds-3-1": [
        ("ds", "考点1-树形推断", None),
        ("ds", "考点4-遍历和线索二叉树", {"exclude": ["线索化"]}),
    ],
    "ds-3-2": [("ds", "线索化", None)],
    "ds-3-3": [("ds", "考点5-树、森林与二叉树", None)],
    "ds-3-4": [
        ("ds", "考点6-哈夫曼树", None),
        ("ds", "考点7-并查集", None),
    ],
    "ds-3-5": [
        ("ds", "考点2-树的存储", None),
        ("ds", "考点3-唯一确定", None),
    ],
    "ds-4-1": [
        ("ds", "考点8-图的概念", None),
        ("ds", "考点9-邻接矩阵", None),
    ],
    "ds-4-5": [("ds", "考点10-十字链表", None)],
    "ds-4-2": [("ds", "考点11-DFS", None)],
    "ds-4-3": [
        ("ds", "考点13-最小生成树", None),
        ("ds", "考点14-最短路径", None),
    ],
    "ds-4-4": [
        ("ds", "考点12-拓扑排序", None),
        ("ds", "考点15-关键路径", None),
    ],
    "ds-5-1": [("ds", "考点1-线性表的查找", None)],
    "ds-5-2": [
        ("ds", "考点2-BST", None),
        ("ds", "考点3-AVL", None),
    ],
    "ds-5-3": [
        ("ds", "考点4-B树", None),
        ("ds", "考点5-散列表", None),
    ],
    "ds-5-4": [("ds", "考点6-红黑树", None)],
    "ds-6-1": [("ds", "考点1-内部排序思想", None)],
    "ds-6-2": [("ds", "考点2-内部排序总结", None)],
    "ds-6-3": [("ds", "考点3-外部排序", None)],
    "coa-1-1": [("coa", "考点1-冯·诺依曼机", None)],
    "coa-1-2": [("coa", "考点4-主频、CPI", None)],
    "coa-1-3": [("coa", "考点2-CPU、主存", None)],
    "coa-1-4": [("coa", "考点3-按字节编址", None)],
    "coa-2-1": [("coa", "考点2-补码加减", None)],
    "coa-2-2": [("coa", "考点4-IEEE 754", None)],
    "coa-2-3": [("coa", "考点5-浮点数加减", None)],
    "coa-2-4": [
        ("coa", "考点6-数据存放", None),
        ("coa", "强制类型转换", None),
    ],
    "coa-2-5": [("review", "九、数据校验码", None)],
    "coa-2-6": [
        ("coa", "考点1-进位计数制", None),
        ("coa", "总览：真值与机器数", None),
        ("coa", "无符号数与带符号数", None),
    ],
    "coa-2-7": [("coa", "考点3-定点数的乘除法", None)],
    "coa-3-1": [("coa", "考点1-存储器概述", None)],
    "coa-3-2": [
        ("coa", "考点3-主存容量的扩展", None),
        ("coa", "考点4-多模块存储器", None),
    ],
    "coa-3-3": [
        ("coa", "考点7-Cache", None),
        ("coa", "题型1-地址映射与字段划分", None),
    ],
    "coa-3-4": [
        ("coa", "题型2-Cache 命中率", None),
        ("coa", "题型3-Cache 访问过程", None),
        ("coa", "题型6-Cache 性能分析", None),
    ],
    "coa-3-5": [
        ("coa", "考点8-虚拟存储器", None),
        ("coa", "题型4-虚拟地址", None),
        ("coa", "题型5-缺页异常", None),
    ],
    "coa-3-6": [("coa", "考点2-RAM与DRAM", None)],
    "coa-3-7": [
        ("coa", "考点5-ROM与Flash", None),
        ("coa", "考点6-外部存储器与磁盘阵列", None),
    ],
    "coa-4-1": [
        ("coa", "4.1 指令系统", None),
        ("coa", "4.2 寻址方式", None),
    ],
    "coa-4-2": [
        ("coa", "4.3 程序的机器级代码表示", None),
        ("coa", "4.4 考点提纲", None),
        ("coa", "四*、指令专题", None),
    ],
    "coa-4-4": [
        ("coa", "5.1 CPU 的基本结构", None),
        ("coa", "5.2 数据通路", None),
    ],
    "coa-4-5": [("coa", "5.3 控制器", None)],
    "coa-4-3": [("coa", "5.4 指令流水线", None)],
    "coa-4-6": [
        ("coa", "5.5 多处理器", None),
        ("coa", "5.6 高频易错点", None),
    ],
    "coa-5-1": [("review", "十二、总线", None)],
    # coa-5-2 没有对应的长文源，保留 topic.points 的前端回退。
}


class Section:
    def __init__(self, source: str, level: int, title: str, start: int, end: int):
        self.source = source
        self.level = level
        self.title = title
        self.start = start
        self.end = end


def read_lines(path: Path) -> list[str]:
    return path.read_text(encoding="utf-8").splitlines()


def parse_sections(source: str, lines: list[str]) -> list[Section]:
    headings: list[tuple[int, int, str]] = []
    in_front = False
    for i, line in enumerate(lines):
        if i == 0 and line.strip() == "---":
            in_front = True
            continue
        if in_front:
            if line.strip() == "---":
                in_front = False
            continue
        m = re.match(r"^(#{1,6})\s+(.+?)\s*$", line)
        if m:
            headings.append((i, len(m.group(1)), m.group(2).strip()))
    sections = []
    for idx, (start, level, title) in enumerate(headings):
        end = len(lines)
        for nstart, nlevel, _ in headings[idx + 1:]:
            if nlevel <= level:
                end = nstart
                break
        sections.append(Section(source, level, title, start, end))
    return sections


def find_section(sections: list[Section], needle: str) -> Section:
    matches = [s for s in sections if needle in s.title]
    if not matches:
        raise SystemExit(f"找不到标题片段：{needle}")
    if len(matches) > 1:
        raise SystemExit(
            "标题片段不唯一：" + needle + " -> " + " | ".join(s.title for s in matches)
        )
    return matches[0]


def extract_block(section: Section, lines: list[str], exclude: list[str] | None = None) -> str:
    excluded_ranges: list[tuple[int, int]] = []
    if exclude:
        for ex in exclude:
            for s in SECTIONS_BY_SOURCE[section.source]:
                if s.level > section.level and ex in s.title and section.start < s.start < section.end:
                    excluded_ranges.append((s.start, s.end))
                    break
            else:
                raise SystemExit(f"找不到要排除的小节：{ex}（在 {section.title} 内）")

    def skipped(i: int) -> bool:
        return any(a <= i < b for a, b in excluded_ranges)

    out: list[str] = []
    shift = 2 - section.level
    for i in range(section.start, section.end):
        if skipped(i):
            continue
        line = lines[i]
        m = re.match(r"^(#{1,6})(\s+.*)$", line)
        if m:
            new_level = max(2, min(6, len(m.group(1)) + shift))
            line = "#" * new_level + m.group(2)
        out.append(line)
    return "\n".join(out).strip()


def compress_image(src: Path, dst: Path, max_width: int = 1400) -> None:
    im = Image.open(src)
    if im.mode in ("RGBA", "LA", "P"):
        bg = Image.new("RGB", im.size, (255, 253, 248))
        if im.mode == "P":
            im = im.convert("RGBA")
        bg.paste(im, mask=im.split()[-1] if im.mode in ("RGBA", "LA") else None)
        im = bg
    elif im.mode != "RGB":
        im = im.convert("RGB")
    w, h = im.size
    if w > max_width:
        im = im.resize((max_width, round(h * max_width / w)), Image.LANCZOS)
    dst.parent.mkdir(parents=True, exist_ok=True)
    im.save(dst, "WEBP", quality=90, method=6)


MATH_BLOCK = re.compile(r"\$\$(.+?)\$\$", re.S)
MATH_INLINE = re.compile(r"(?<!\$)\$(?!\$)(.+?)(?<!\$)\$(?!\$)", re.S)


def protect_math(text: str) -> tuple[str, list[str]]:
    slots: list[str] = []

    def repl(m: re.Match) -> str:
        slots.append(m.group(0))
        return f"@@MATH{len(slots) - 1}@@"

    text = MATH_BLOCK.sub(repl, text)
    text = MATH_INLINE.sub(repl, text)
    return text, slots


def restore_math(text: str, slots: list[str]) -> str:
    for i, value in enumerate(slots):
        text = text.replace(f"@@MATH{i}@@", html.escape(value, quote=False))
    return text


def rewrite_images(md: str, source_key: str) -> tuple[str, list[tuple[Path, Path]]]:
    copies: list[tuple[Path, Path]] = []
    seen: dict[str, str] = {}

    def repl(m: re.Match) -> str:
        alt, rel = m.group(1), m.group(2).strip()
        if rel.startswith(("http://", "https://", "/")):
            return m.group(0)
        src = SOURCE_DIR / rel
        if not src.exists():
            raise SystemExit(f"图片不存在：{src}")
        stem = re.sub(r"[^A-Za-z0-9._-]+", "-", src.stem).strip("-") or "image"
        dest_name = f"{IMAGE_PREFIX[source_key]}-{stem}.webp"
        if rel not in seen:
            dest = OUT_IMAGES / dest_name
            copies.append((src, dest))
            seen[rel] = f"/408-review/assets/textbook/{dest_name}"
        return f"![{alt}]({seen[rel]})"

    return re.sub(r"!\[(.*?)\]\(([^)]+)\)", repl, md, flags=re.S), copies


def strip_example_blocks(md_text: str) -> str:
    """把 <u>例题 / <u>练习 整块移出长文；题目已由 extract-questions.py 收进真题。"""
    lines = md_text.splitlines()
    out: list[str] = []
    i = 0
    example = re.compile(r"^<u>(例题|练习)[：:]")
    heading = re.compile(r"^#{1,6}\s+")
    while i < len(lines):
        if example.match(lines[i].strip()):
            j = i + 1
            while j < len(lines):
                s = lines[j].strip()
                if example.match(s) or heading.match(s) or s == "---":
                    break
                j += 1
            i = j
            continue
        out.append(lines[i])
        i += 1
    return "\n".join(out)


def strip_loose_examples(md_text: str) -> str:
    """清掉没被 <u> 包起来的裸题、习题训练和“小例题”折叠块。"""
    md_text = re.sub(
        r"\{%\s*hideToggle\s+小例题.*?%\}.*?\{%\s*endhideToggle\s*%\}",
        "",
        md_text,
        flags=re.S,
    )
    md_text = re.sub(r"(?ms)^练习：.*?(?=^#{1,2}\s+|---\s*$)", "", md_text)
    md_text = re.sub(r"(?ms)^##\s+习题训练\s*$.*?(?=^#{1,2}\s+|\Z)", "", md_text)
    md_text = re.sub(r"(?ms)^【20\d{2}】.*?\{%\s*endhideToggle\s*%\}", "", md_text)
    # 没有折叠答案、直接接解法的裸例题（复杂度题型里各有一道）。
    md_text = re.sub(r"(?ms)^【2014】下列程序段.*?(?=^### )", "", md_text)
    md_text = re.sub(r"(?ms)^【2022】下列程序段.*?(?=^## |\Z)", "", md_text)
    md_text = re.sub(
        r"\{%\s*hideToggle\s+查看答案解析\s*%\}.*?\{%\s*endhideToggle\s*%\}",
        "",
        md_text,
        flags=re.S,
    )
    return md_text


def convert_article(md_text: str, slots: list[str], mermaid_slots: list[str], source_key: str, keep_examples: bool = False) -> tuple[str, list[tuple[Path, Path]]]:
    if not keep_examples:
        md_text = strip_example_blocks(md_text)
        md_text = strip_loose_examples(md_text)
    md_text, image_copies = rewrite_images(md_text, source_key)

    # 原帖用 <u>...</u> 单独成行表示小节标题，转成真正的标题，长文才有层级。
    md_text = re.sub(
        r"^<u>(.+?)</u>\s*$",
        lambda m: ("#### " if m.group(1).startswith("例题") else "### ") + m.group(1),
        md_text,
        flags=re.M,
    )

    md_text = re.sub(
        r"\{%\s*hideToggle\s+(.+?)\s*%\}",
        lambda m: (
            '<details class="article-details" markdown="1">\n'
            f"<summary>{html.escape(m.group(1))}</summary>\n\n"
        ),
        md_text,
    )
    md_text = re.sub(r"\{%\s*endhideToggle\s*%\}", "\n\n</details>\n\n", md_text)

    def mermaid_repl(m: re.Match) -> str:
        mermaid_slots.append(m.group(1).strip())
        return f"\n\n@@MERMAID{len(mermaid_slots) - 1}@@\n\n"

    md_text = re.sub(
        r"\{%\s*mermaid\s*%\}(.*?)\{%\s*endmermaid\s*%\}",
        mermaid_repl,
        md_text,
        flags=re.S,
    )
    md_text, math_slots = protect_math(md_text)

    md = markdown.Markdown(
        extensions=["extra", "toc", "sane_lists", "md_in_html"],
        extension_configs={"toc": {"toc_depth": "2-3", "permalink": False}},
    )
    body = md.convert(md_text)
    toc = md.toc

    soup = BeautifulSoup(body, "html.parser")

    for details in soup.find_all("details"):
        details["class"] = "article-details"
    for summary in soup.find_all("summary"):
        summary["class"] = "article-summary"

    for table in soup.find_all("table"):
        if table.parent and table.parent.name == "div" and "article-table" in (table.parent.get("class") or []):
            continue
        wrap = soup.new_tag("div", **{"class": "article-table"})
        table.wrap(wrap)

    for img in soup.find_all("img"):
        src = img.get("src", "")
        alt = img.get("alt", "").strip()
        img["loading"] = "lazy"
        img["decoding"] = "async"
        img["class"] = "article-img"
        link = soup.new_tag(
            "a",
            href=src,
            **{
                "class": "figure-link",
                "data-action": "zoom-image",
                "data-src": src,
                "data-caption": alt,
            },
        )
        img.wrap(link)
        figure = soup.new_tag("figure", **{"class": "article-figure"})
        link.wrap(figure)
        if alt:
            cap = soup.new_tag("figcaption")
            cap.string = alt
            figure.append(cap)
        parent = figure.parent
        if parent and parent.name == "p":
            parent.insert_after(figure)
            if parent.get_text(strip=True):
                parent.unwrap()
            else:
                parent.decompose()

    body_html = str(soup)

    # 公式和 mermaid 在 BeautifulSoup 之后还原，避免 < > 被当成 HTML。
    body_html = restore_math(body_html, math_slots)
    for i, code in enumerate(mermaid_slots):
        block = f'<pre class="mermaid">{html.escape(code)}</pre>'
        body_html = re.sub(
            rf"<p>\s*@@MERMAID{i}@@\s*</p>",
            lambda _m, b=block: b,
            body_html,
        )
        body_html = body_html.replace(f"@@MERMAID{i}@@", block)

    toc_count = len(re.findall(r"<li>", toc))
    toc_html = ""
    if toc_count >= 3:
        toc_html = (
            f'<details class="article-toc">\n'
            f"<summary>本页目录 <span>{toc_count} 节</span></summary>\n"
            f"{toc}\n</details>"
        )

    return (
        toc_html
        + '<div class="article-content">\n'
        + body_html
        + "\n</div>\n"
        + (
            '<p class="article-source">内容整理自站内 408 笔记；这一节的例题保留在正文中，用于“边做边讲”，题库里另有同一道题的归档。</p>'
            if keep_examples
            else '<p class="article-source">内容整理自站内 408 笔记；例题、真题与解析已归入「真题」板块，正文只保留概念、推导、表格和图解。</p>'
        )
    ), image_copies


# 全局：解析后的章节，供 exclude 使用
SECTIONS_BY_SOURCE: dict[str, list[Section]] = {}
LINES_BY_SOURCE: dict[str, list[str]] = {}


def main() -> None:
    OUT_CONTENT.mkdir(parents=True, exist_ok=True)
    OUT_IMAGES.mkdir(parents=True, exist_ok=True)

    for key, path in SOURCES.items():
        lines = read_lines(path)
        LINES_BY_SOURCE[key] = lines
        SECTIONS_BY_SOURCE[key] = parse_sections(key, lines)

    all_copies: dict[Path, Path] = {}
    articles = 0
    missing = []

    # coa-4-4 的数据通路正文已手写补充（含 2015/2022 真题图），生成器不要覆盖。
    # 其余 topic 仍按 MAPPING 生成。
    MANUAL_TOPICS = {"coa-4-3", "coa-4-4", "coa-4-5", "coa-4-6", "coa-5-1", "os-1-1", "os-1-2", "os-1-3", "os-1-4", "os-1-5", "os-2-1", "os-2-2", "os-2-3", "os-2-4", "os-2-5", "os-2-6", "os-3-1", "os-3-2", "os-3-3", "os-3-4", "os-3-5"}
    # 这两节是“边做边讲”的复杂度课，例题要留在正文里，不能只放题库。
    KEEP_EXAMPLES = {"ds-1-1", "ds-1-2"}

    for topic_id, parts in MAPPING.items():
        if topic_id in MANUAL_TOPICS:
            continue
        chunks: list[str] = []
        for source_key, needle, options in parts:
            section = find_section(SECTIONS_BY_SOURCE[source_key], needle)
            chunks.append(
                extract_block(section, LINES_BY_SOURCE[source_key], (options or {}).get("exclude"))
            )
        md_text = "\n\n".join(chunks)
        slots: list[str] = []
        mermaid_slots: list[str] = []
        article, copies = convert_article(
            md_text, slots, mermaid_slots, parts[0][0], keep_examples=topic_id in KEEP_EXAMPLES
        )
        (OUT_CONTENT / f"{topic_id}.html").write_text(article, encoding="utf-8")
        articles += 1
        for src, dst in copies:
            all_copies[dst] = src

    for dst, src in sorted(all_copies.items()):
        compress_image(src, dst)
    print(f"articles {articles} / mapping {len(MAPPING)} / images {len(all_copies)}")
    print(f"content dir: {OUT_CONTENT}")
    print(f"image dir:   {OUT_IMAGES}")
    missing = [t for t in MAPPING if not (OUT_CONTENT / f"{t}.html").exists()]
    if missing:
        print("MISSING:", missing)


if __name__ == "__main__":
    main()
