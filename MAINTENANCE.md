# 网站维护指南

## 本地开发

```bash
npm run dev
npm run build
npm run preview
```

## 主要目录

- `src/pages/`：页面与路由
- `src/components/`：课程页的共享组件
- `src/content/courses/`：课程 Markdown
- `src/content/assignments/<course-slug>/`：作业 Markdown
- `src/content/config.ts`：课程与作业字段定义
- `src/styles/main.css`：全站样式
- `public/`：图片、PDF 和下载文件

## 新增或修改课程

在 `src/content/courses/` 新建或修改 Markdown 文件；文件名即课程 slug：

```yaml
---
title: Course Title
semester: 2026 Fall
instructor: Instructor Name
description: Optional short description
materials:
  - title: Lecture notes
    url: /static_files/presentations/notes.pdf
schedule:
  - kind: lesson
    date: 2026-09-01
    number: 1
    topic: Introduction
---
```

课程会自动出现在首页，并生成 Course Home、Schedule、Materials 与 Assignments 页面。

## 管理作业

在 `src/content/assignments/<course-slug>/` 创建 Markdown 文件：

```yaml
---
course: <course-slug>
title: Assignment 1
date: 2026-09-15
pdf: /static_files/assignments/assignment-1.pdf
---
```

`attachment`（附加文件）与 `solutions`（答案）为可选下载文件字段。

## 其它页面与资源

- 首页归档：`src/pages/index.astro`
- 通用课程信息：`src/pages/general-information.astro`
- 课程页导航：`src/components/CourseHeader.astro`
- 日程表：课程文件中的 `schedule`；`kind: break` 可添加停课行
- 静态资源：放入 `public/`，在内容中使用以 `/` 开头的路径
- 页面样式与页脚：`src/styles/main.css` 和 `src/layouts/Default.astro`

## 部署

修改 `astro.config.mjs` 的 `site` 与 `base` 后运行 `npm run build`。发布 GitHub Pages 时部署 `dist/` 目录。
