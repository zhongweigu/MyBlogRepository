"""从套写实操每年第一页裁出题目原图，写入 assets/img/exam-<年份>.png。"""
import os

import pymupdf

BASE = r"C:\Users\65640\Downloads"
PDF = os.path.join(BASE, "大作文一页纸（套写实操-英一）.pdf")
HERE = os.path.dirname(__file__)
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT = os.path.join(ROOT, "source", "english-review", "assets", "img")
PAGES = {9: "2026", 22: "2025", 35: "2024", 48: "2023", 61: "2022", 74: "2021", 87: "2020"}


def main():
    os.makedirs(OUT, exist_ok=True)
    doc = pymupdf.open(PDF)
    for pno, year in PAGES.items():
        page = doc[pno - 1]
        best = None
        for im in page.get_images(full=True):
            xref = im[0]
            info = doc.extract_image(xref)
            area = info["width"] * info["height"]
            if not best or area > best[0]:
                best = (area, xref)
        rect = page.get_image_rects(best[1])[0]
        pix = page.get_pixmap(clip=rect, dpi=200)
        dst = os.path.join(OUT, f"exam-{year}.png")
        pix.save(dst)
        print(year, pix.width, pix.height, os.path.getsize(dst))


if __name__ == "__main__":
    main()
