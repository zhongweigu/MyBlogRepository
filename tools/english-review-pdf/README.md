# 英语复习台 · PDF 提取脚本

一次性工具，记录 `source/english-review` 的内容是怎么从 4 份 PDF 里抽出来的。不是构建步骤，Hexo 不会调用它们。

## 源文件

默认在 `C:\Users\65640\Downloads\`：

- `大作文一页纸（模版部分）.pdf`（7 页）
- `大作文一页纸（模版使用说明部分）.pdf`（31 页）
- `大作文一页纸（语料库部分）.pdf`（14 页）
- `大作文一页纸（套写实操-英一）.pdf`（99 页）

改 `BASE` 即可换目录。依赖：Python 3 + PyMuPDF（`pip install pymupdf`）。

## 三步

1. `python extract_pdf_text.py`：把 4 份 PDF 的文字层导出为 `out/<文件名>.txt`。
2. `python split_sections.py`：把套写实操按年份切成 `out/sec-<年份>.txt`，并生成 `out/digest.txt`（每年四版范文 + 审题）。
3. `python gen_exam_texts.py`：生成 `source/english-review/assets/js-v1/data/exam-texts.js`（28 篇范文 + 中文对照）。
4. `python crop_exam_images.py`：从每年第一页裁出题目原图，写入 `source/english-review/assets/img/exam-<年份>.png`。

## 注意

- `exam-texts.js` 是自动生成的，不要手改；要修文句请回到 PDF 或改生成脚本。
- 使用说明第 16–29 页是官方文件截图，文字层几乎为空；这部分由模型逐页阅读后人工摘录进 `assets/content/str-01/02` 与 `exams.js`，脚本不处理 OCR。
- 语料库 PDF 是双栏排版，文字层顺序会错位（第 10–13 页尤其明显）；`corpus.js` 已按语义复原，核对时以原 PDF 为准。
