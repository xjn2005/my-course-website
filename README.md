# 课程主页

一个使用 Astro 构建的课程网站，部署至 GitHub Pages。

## 本地开发

```bash
npm install
npm run dev
npm run build
```

## 内容维护

- 课程页面：`src/content/courses/`
- 通用准则：`src/content/guidelines/`
- PDF、DOCX 等附件：`public/static_files/`

课程与通用准则均使用 Markdown 编写，修改后先运行 `npm run build` 检查。

## 部署

推送到 `main` 分支后，GitHub Actions 会自动构建并发布网站。
