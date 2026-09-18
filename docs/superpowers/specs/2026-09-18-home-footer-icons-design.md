# 首页页脚链接设计

## 目标

- 仅在课程首页显示 GitHub 与 CC BY-NC 4.0 入口。
- GitHub 图标链接到 `https://github.com/xjn2005/my-course-website`。
- CC BY-NC 4.0 徽章链接到许可证说明页。

## 实现

保留 `src/pages/index.astro` 中现有的 footer slot。在版权文字后加入 GitHub 图标链接和 Creative Commons 官方 BY-NC 4.0 徽章：

- GitHub 使用已加载的 Font Awesome `fab fa-github`，并提供 `aria-label` 和 `title`。
- 许可证使用 `https://i.creativecommons.org/l/by-nc/4.0/88x31.png` 徽章，图片替代文本为「知识共享署名-非商业性使用 4.0 国际许可协议」。
- 两个外部链接使用 `target="_blank" rel="noreferrer"`。

页脚样式只增加链接之间的间距和图标对齐，不改变课程页面或其他页面。

## 验证

运行 `npm run build`，并检查首页 HTML 含 GitHub 仓库 URL、CC BY-NC 4.0 URL、可读标签和许可证徽章图片。
