# resume-interface

个人简历网页项目，包含首页、简历、项目经验和联系方式模块。

## 使用

```bash
npm install
npm run serve
```

默认本地访问地址：

```text
http://127.0.0.1:5180
```

## 测试

```bash
npm test
```

## 部署

```bash
npm run build
```

静态文件会生成到 `docs/`，GitHub Pages 可选择 `main` 分支的 `/docs` 目录作为发布来源。

如需发布到 Mintlify 绑定的 `gh-pages` 分支：

```bash
npm run publish:mintlify
```

该命令会先生成 `mintlify-site/`，再把 `docs.json`、MDX 页面和图片同步到 `gh-pages` 分支根目录并推送。
