# 网站维护指南

## 本地检查

```bash
npm install
npm run dev
npm run build
```

## 课程页面

在 `src/content/courses/` 中新增或编辑 `.mdx` 文件。文件名即课程链接的一部分，文件顶部只需填写以下字段：

```yaml
---
title: 课程名称
semester: 2026 Fall
instructor: 任课教师
---
```

其后的内容会直接渲染为课程页面。可使用 `## Schedule`、`## Materials` 和 `## Assignments` 等二级标题组织内容；在 Assignments 标题下保留 `<Assignments />`，系统会自动显示该课程的作业链接。

## 作业与答案

每门课程的作业放在 `src/content/assignments/<课程文件名>/`。`hw1.md` 是作业网页，`hw1-solution.md` 是答案网页；两者会在课程页显示为“作业 1 | 答案”。文件正文使用普通 Markdown：

```text
src/content/assignments/real-analysis-2026-fall/
├── hw1.md
└── hw1-solution.md
```

答案尚未准备好时，只创建 `hw1.md`；课程页会显示“答案待发布”。

每份作业建议在标题下写明发布日期、截止日期和提交要求：

```markdown
- 发布：2026 年 9 月 7 日 9:45
- 截止：2026 年 9 月 10 日 15:05
- 提交要求：纸质卷面提交；请在卷面清楚写明姓名和学号。
```

数学公式使用 TeX：行内公式写作 `$x^2$`，独立公式写作 `$$x^2$$`。

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
