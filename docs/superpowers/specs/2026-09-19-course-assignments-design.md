# 自动作业页面设计

## 目标

课程页保留“课程介绍 → Schedule → Assignments → Materials”的现有顺序。作业题面与答案分别由 Markdown 文件编写，并自动生成网页及课程页链接。

## 内容约定

- 课程文件从 `src/content/courses/*.md` 迁移为同名 `.mdx`，现有 frontmatter 不变。
- 每门课程在原有 `## Assignments` 位置写入 `<Assignments />`。
- 作业内容保存在 `src/content/assignments/<course-slug>/`：`hw1.md` 为作业题面，`hw1-solution.md` 为对应答案；编号继续使用 `hw2`、`hw3` 等。
- 文件正文是普通 Markdown；不重复填写课程信息、作业编号或类型。

## 页面行为

- 课程页读取当前课程目录中的作业文件，按编号生成 `作业 N | 答案` 链接。
- 作业与答案各生成独立网页，复用现有 `Default` 布局和窄内容列。
- 没有作业文件时显示“暂未发布作业”；只有题面时不生成失效的答案链接，显示“答案待发布”。
- 课程目录与已有课程 slug 不匹配的作业不会出现在任何课程页。

## 实现与验证

- 启用 Astro MDX，并提供仅供课程 MDX 使用的 `Assignments` 组件。
- 新增 assignments 内容集合、作业列表组件和静态作业详情路由；不增加客户端脚本。
- 迁移现有课程文件并替换原本手写的 Assignments 内容。
- 使用 `npm run build` 验证所有课程、作业和答案路由可静态生成。
