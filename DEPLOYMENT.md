# Cloudflare Pages 部署指南

## 项目信息

- **项目名称**: chat-client
- **生产地址**: https://chat-client.pages.dev/
- **后端 API**: https://koa-graphql-deepseek.zichengtang349.workers.dev/graphql

## 前置准备

### 1. Node.js 版本要求

使用 Wrangler CLI 部署需要 Node.js >= 20.0.0:

```bash
# 检查当前版本
node --version

# 使用 nvm 切换版本
nvm use 20
```

### 2. 安装 Wrangler CLI

```bash
npm install -g wrangler
```

### 3. 登录 Cloudflare

```bash
wrangler login
```

## 部署方式

### 方式一:通过 Wrangler CLI 部署(推荐)

一键构建并部署:

```bash
# 确保使用 Node.js 20+
source ~/.nvm/nvm.sh && nvm use 20

# 执行部署
npm run deploy
```

如果是首次部署,需要先创建项目:

```bash
wrangler pages project create chat-client --production-branch=main
```

### 方式二:通过 Git 集成自动部署

1. 将代码推送到 GitHub
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. 进入 Pages > Create a project
4. 连接你的 GitHub 仓库
5. 配置构建设置:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node version**: 20
6. 点击 "Save and Deploy"

## 配置文件说明

### wrangler.toml

Cloudflare Pages 项目配置:

```toml
name = "chat-client"
compatibility_date = "2024-01-01"
pages_build_output_dir = "dist"
```

### vite.config.js

Vite 构建配置,优化生产环境打包:

- `outDir`: 输出目录为 `dist`
- `sourcemap`: 禁用 sourcemap 减小体积
- `minify`: 使用 esbuild 压缩代码

### public/_headers

HTTP 安全头和 CORS 配置,确保前端可以正常请求后端 API。

### src/api/chat.js

API 端点配置:

```javascript
const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT ||
  'https://koa-graphql-deepseek.zichengtang349.workers.dev/graphql';
```

## 环境变量配置

### 本地开发

创建 `.env` 文件(可选):

```bash
VITE_GRAPHQL_ENDPOINT=https://koa-graphql-deepseek.zichengtang349.workers.dev/graphql
```

### Cloudflare Pages

如果需要配置不同的 API 端点:

1. 进入 Cloudflare Dashboard > Pages > 项目设置
2. 进入 Settings > Environment variables
3. 添加环境变量:
   - **Variable name**: `VITE_GRAPHQL_ENDPOINT`
   - **Value**: 你的 GraphQL API 地址

## 部署流程详解

1. **构建阶段**
   ```bash
   npm run build
   ```
   - Vite 编译 React 应用
   - 输出到 `dist` 目录
   - 生成优化的静态资源

2. **上传阶段**
   ```bash
   wrangler pages deploy dist
   ```
   - 上传 `dist` 目录到 Cloudflare
   - 上传 `_headers` 配置文件
   - 生成部署预览链接

3. **部署完成**
   - 获得唯一的部署 URL (如: `https://[hash].chat-client.pages.dev`)
   - 主域名自动更新到最新部署

## 常见问题

### 405 Method Not Allowed 错误

**原因**: Vite 的 proxy 配置只在开发环境生效,生产环境需要直接请求后端 API。

**解决方案**: 已在 `src/api/chat.js` 中配置直接使用后端 URL。

### CORS 跨域问题

**症状**: 浏览器控制台报 CORS 错误

**解决方案**:
1. 确保后端 API 配置了正确的 CORS 头
2. 允许来自 `*.pages.dev` 的请求
3. 检查后端响应头包含:
   ```
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Methods: GET, POST, OPTIONS
   Access-Control-Allow-Headers: Content-Type
   ```

### Node.js 版本错误

**症状**: `Wrangler requires at least Node.js v20.0.0`

**解决方案**:
```bash
nvm install 20
nvm use 20
npm install -g wrangler
```

## 自定义域名

1. 在 Cloudflare Pages 项目设置中
2. 进入 Custom domains
3. 添加你的自定义域名
4. 按照指示配置 DNS 记录
5. 等待 SSL 证书自动签发

## 监控和日志

- **部署历史**: Cloudflare Dashboard > Pages > 项目 > Deployments
- **访问日志**: Cloudflare Dashboard > Pages > 项目 > Analytics
- **构建日志**: 每次部署都会生成详细的构建日志

## 预览部署

- 每次使用 CLI 部署都会创建新的预览链接
- Git 集成模式下,每个分支/PR 都有独立的预览环境
- 预览链接格式: `https://[hash].chat-client.pages.dev`

## 回滚部署

如果新版本有问题,可以快速回滚:

1. 进入 Cloudflare Dashboard > Pages > 项目 > Deployments
2. 找到之前的稳定版本
3. 点击 "Rollback to this deployment"

## 性能优化建议

1. **启用 Cloudflare CDN**: 自动启用,全球分发
2. **缓存策略**: 静态资源自动缓存
3. **压缩**: Cloudflare 自动启用 Brotli/Gzip 压缩
4. **HTTP/3**: 自动支持 QUIC 协议
