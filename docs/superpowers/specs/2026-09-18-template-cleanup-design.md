# 模板遗留清理设计

## 目标

将网站整理为独立的 Astro 课程站点，去除 `jekyll-course-website-template` 及其原作者的可交付残留。

## 变更范围

- 删除未使用的 TypeScript 路径别名及 `baseUrl`，不使用弃用警告静音配置。
- 将站点地址改为当前 GitHub 账户；保留现有 GitHub Pages 工作流。
- 删除模板示例图片、示例课件、浏览器生成痕迹和 `docs/superpowers/` 过程文档。
- 删除未使用的 RSS 与字体依赖，并更新锁文件。
- 用简短中文 README 说明开发、构建、内容维护与部署。
- 保留并重写 `MAINTENANCE.md`，仅说明现有 Astro、Markdown、通用准则和静态附件工作流。
- 用 CC BY-NC 4.0 替换源模板附带的 MIT 许可证。

## 保留项

- `src/` 中现有页面、课程与准则内容。
- `public/_images/favicon.ico`，因为网站正在引用它。
- `public/static_files/`，作为 PDF、DOCX 等课程附件的存放位置。
- `.github/workflows/deploy.yml`，用于 GitHub Pages 自动部署。

## 验证

完成后搜索模板名、Jekyll 和原作者标识，确认没有可交付残留；再运行 `npm run build`。
