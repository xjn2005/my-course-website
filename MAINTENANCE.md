# 网站维护指南

## 本地检查

```bash
npm install
npm run dev
npm run build
```

## 课程页面

在 `src/content/courses/` 中新增或编辑 Markdown 文件。文件名即课程链接的一部分，文件顶部只需填写以下字段：

```yaml
---
title: 课程名称
semester: 2026 Fall
instructor: 任课教师
---
```

其后的内容会直接渲染为课程页面。可使用 `## Schedule`、`## Materials` 和 `## Assignments` 等二级标题组织内容；不需要单独维护页面或简介字段。

## 通用准则

在 `src/content/guidelines/` 中新增或编辑 Markdown 文件：

```yaml
---
title: 指导原则
order: 1
---
```

`order` 决定首页显示顺序，数字越小越靠前。

## 附件与链接

将 PDF、DOCX 和其他下载文件放入 `public/static_files/`。在 Markdown 中使用以 `/` 开头的路径，例如：

```markdown
[下载讲义](/static_files/lecture-01.pdf)
```

提交前运行 `npm run build`。推送到 `main` 分支后，GitHub Actions 会自动部署到 GitHub Pages。
