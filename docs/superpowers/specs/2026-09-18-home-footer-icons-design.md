# 首页页脚图标设计

## 目标

- 仅在课程首页显示 GitHub 与 CC BY-NC 4.0 入口。
- 解决版权文字、图标和许可证徽章尺寸不一致的问题。

## 布局

首页页脚固定为两行：第一行是「Copyright © 2026 徐嘉宁」；第二行是无文字的图标链接组。GitHub 使用单个图标，链接到 `https://github.com/xjn2005/my-course-website`。许可证使用横向排列的 CC、署名、非商业 3 枚圆形图标，整组链接到 CC BY-NC 4.0 许可证说明页。

图标使用已加载的 Font Awesome，不加载外部位图或新增依赖。每个链接提供 `aria-label` 和 `title`，外部链接使用 `target="_blank" rel="noreferrer"`。CSS 负责图标大小、间距和 hover 状态；窄屏仍可换行。

## 验证

运行 `npm run build`，检查首页包含 GitHub URL、CC BY-NC 4.0 URL、GitHub 图标和 3 个许可证图标的可访问标签。
