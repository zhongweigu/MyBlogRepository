"""把 4 份 PDF 的文字层导出为 txt。用法：python extract_pdf_text.py"""
import os
import pymupdf

BASE = r"C:\Users\65640\Downloads"
OUT = os.path.join(os.path.dirname(__file__), "out")

FILES = [
    "大作文一页纸（套写实操-英一）.pdf",
    "大作文一页纸（模版使用说明部分）.pdf",
    "大作文一页纸（语料库部分）.pdf",
    "大作文一页纸（模版部分）.pdf",
]


def main():
    os.makedirs(OUT, exist_ok=True)
    for name in FILES:
        path = os.path.join(BASE, name)
        doc = pymupdf.open(path)
        chunks = []
        for i, page in enumerate(doc):
            chunks.append(f"\n===== PAGE {i + 1} =====\n")
            chunks.append(page.get_text("text"))
        dst = os.path.join(OUT, os.path.splitext(name)[0] + ".txt")
        with open(dst, "w", encoding="utf-8") as fh:
            fh.write("".join(chunks))
        chars = sum(len(p.get_text("text").strip()) for p in doc)
        print(f"{name}: {len(doc)} pages, {chars} chars -> {dst}")


if __name__ == "__main__":
    main()
