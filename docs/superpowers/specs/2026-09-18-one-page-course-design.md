# Markdown 课程页面设计

## 目标

- 每门课程只保留一个可阅读页面，不显示顶部课程导航。
- 课程介绍、Schedule、Materials 和 Assignments 全部由课程 Markdown 正文编写并渲染。
- 不再使用 `description`、结构化 `schedule` 或 assignments collection 自动生成课程内容。

## 页面与内容

课程根路径 `courses/[slug]/` 显示返回课程列表链接、课程名称、学期和任课教师，然后直接渲染该课程 Markdown 正文。正文作者可按需要写入标题、无序或有序列表、链接、表格和代码块；例如将课程信息写成截图中的列表，再用二级标题组织 Schedule、Materials 与 Assignments。

附件放在 `public/static_files/` 的课程子目录中，并在 Markdown 中使用站点根路径链接，例如 `[课程大纲（PDF）](/static_files/os/syllabus.pdf)`。PDF 在浏览器中打开；DOCX 作为普通文件链接，由浏览器或下载程序处理。

## 数据与路由

课程 frontmatter 只保留页面元信息：`title`、`semester` 和 `instructor`。课程正文是唯一的课程内容来源。`Schedule.astro`、自动作业列表组件和 assignments collection 从课程页面流中移除；原有 `/schedule`、`/materials`、`/assignments` 页面不再生成。

现有作业详情页面和内容文件如无其他页面引用则一并移除，避免留下第二个编辑入口。

## 样式与验证

Markdown 正文使用现有 `article-content` 样式，保留链接、列表和块引用的可读性。构建后，每门课程根页面应不含课程导航、结构化日程表或自动作业列表，且课程 Markdown 的标题、列表与附件链接正确输出。
