# Milvelas's Blog

> Life is immersive.

## 框架与工具

本站基于 **Hexo** 静态博客框架构建，使用 **butterfly** 作为主题。

### 核心技术栈

- **框架**: Hexo 7.3.0
- **主题**: butterfly
- **渲染器**: hexo-renderer-markdown-it（支持 Markdown 标准语法及扩展）
- **数学支持**: KaTeX（通过 markdown-it-katex 集成）
- **本地搜索**: hexo-generator-search
- **部署**: 支持 Netlify Pages 自动部署

### 目录结构

```
├── source/               # 博客内容源文件
│   ├── _posts/           # 已发布的文章（Markdown 格式）
│   ├── _data/            # 扩展数据（如链接页）
│   └── _drafts/          # 草稿文章
├── scaffolds/            # 文章模板（post、draft、page）
├── patches/              # patch-package 补丁（针对 hexo-toc 的修复）
├── themes/butterfly/     # 博客主题
├── _config.yml           # Hexo 全局配置
└── package.json          # 项目依赖
```

## 设计思路

### 内容即资产

每篇文章配备独立的资源文件夹，图片与正文同目录管理，便于维护和迁移。hexo-renderer-marked 能正确解析相对路径引用，保证静态生成后图片路径一致。

### 数学与代码并重

通过 KaTeX 实现行内与块级数学公式渲染，支持计算机科学类内容的严谨表达。代码高亮使用 Prismjs，支持多语言语法着色。

### 结构化信息组织

- 分类（Categories）：按学科或主题聚合文章
- 标签（Tags）：细粒度主题标记
- 归档（Archives）：按时间线回顾全部内容
- 本地搜索：基于全文索引，无需第三方服务

## 内容板块

本站内容主要涵盖以下几个方向：

- **课程留档** — 课堂学习记录与知识点梳理
- **自学笔记** — 自主学习过程中的总结与思考
- **项目记录** — 实践项目的技术实现与复盘

