# GitHub Pages 自动部署设计

## 目标

- 每次推送到 `main` 时，自动构建并部署 Astro 静态站点到 GitHub Pages。
- 支持手动触发工作流。
- 让项目站点路径由 GitHub Pages 输出传给 Astro，确保仓库页的资源和链接正确。

## 工作流

新增 `.github/workflows/deploy.yml`，使用 GitHub 官方 Actions：`actions/checkout@v4`、`actions/setup-node@v4`、`actions/configure-pages@v5`、`actions/upload-pages-artifact@v4` 与 `actions/deploy-pages@v4`。

构建 job 使用 Node 20、`npm ci`，并运行：

```yaml
npm run build -- --base "${{ steps.pages.outputs.base_path }}"
```

它上传 `dist/`。部署 job 依赖构建 job，配置 `pages: write` 与 `id-token: write` 权限，并部署上传的 Pages artifact。

## 运行要求与验证

仓库 Settings → Pages 的 Build and deployment source 必须选择「GitHub Actions」。推送到 `main` 后，Actions 页面应显示成功的 build 与 deploy job，并提供部署 URL。
