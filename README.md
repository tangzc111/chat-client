# Chat Client

一个现代化的 React + Vite 客户端，通过 GraphQL 与 DeepSeek AI 进行对话。

![React](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-purple)
![GraphQL](https://img.shields.io/badge/GraphQL-16.9-pink)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-orange)

## 🌐 在线体验

**生产环境**: [https://laotangcode.shop/](https://laotangcode.shop/)

## ✨ 特性

- 🎨 现代化的用户界面设计
- ⚡ 基于 Vite 的快速开发体验
- 🔄 实时 AI 对话功能
- 📱 响应式设计，支持移动端
- 🎯 使用 GraphQL 与后端通信
- 🚀 部署在 Cloudflare Pages，全球 CDN 加速

## 🚀 快速开始

### 前置要求

- **开发环境**: Node.js 20+
- **部署环境**: Node.js 20+ (使用 Wrangler CLI)
- 后端 GraphQL 服务器

### 安装

```bash
# 克隆项目
git clone https://github.com/tangzc111/chat-client.git
cd chat-client

# 安装依赖
npm install
```

### 开发

```bash
# 启动开发服务器
npm run dev
```

应用将在 http://localhost:3000 启动

### 构建

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 部署

部署到 Cloudflare Pages:

```bash
# 一键构建并部署
npm run deploy
```

## 🏗️ 项目结构

```
chat-client/
├── src/
│   ├── api/
│   │   └── chat.js           # GraphQL API 调用
│   ├── components/
│   │   ├── ChatInput.jsx     # 输入框组件
│   │   └── ChatInput.css
│   ├── App.jsx               # 主应用组件
│   ├── App.css
│   ├── main.jsx              # 应用入口
│   └── index.css             # 全局样式
├── public/
│   └── _headers              # Cloudflare Pages HTTP 头配置
├── dist/                     # 构建输出目录
├── index.html
├── vite.config.js            # Vite 配置
├── wrangler.toml             # Cloudflare Pages 配置
├── package.json
├── README.md                 # 项目说明
```

## 🎯 功能说明

### GraphQL 查询

客户端使用以下 GraphQL 查询与服务器通信：

```graphql
query Chat($message: String!) {
  chat(message: $message) {
    content
    model
    timestamp
    usage {
      promptTokens
      completionTokens
      totalTokens
    }
  }
}
```

### 快捷键

- `Enter` - 发送消息
- `Shift + Enter` - 换行

## 🔧 配置

### API 端点配置

项目默认使用以下 API 端点:

```
https://chat-worker.zichengtang349.workers.dev/graphql
```

#### 自定义 API 端点

创建 `.env` 文件（本地开发）:

```bash
VITE_GRAPHQL_ENDPOINT=https://your-api-server.com/graphql
```

或在 Cloudflare Pages 中设置环境变量:

1. 进入项目设置 > Environment variables
2. 添加 `VITE_GRAPHQL_ENDPOINT` 变量

## 📦 技术栈

### 前端框架
- **React 18** - UI 框架
- **Vite 5** - 构建工具

### 通信层
- **GraphQL 16** - API 查询语言
- **graphql-request** - 轻量级 GraphQL 客户端

### 部署平台
- **Cloudflare Pages** - 全球 CDN 静态站点托管
- **Wrangler** - Cloudflare 官方 CLI 工具

## 🔗 相关项目

- [后端服务器](https://github.com/tangzc111/chat-worker) - Hono + GraphQL + DeepSeek API
- [后端部署](https://chat-worker.zichengtang349.workers.dev/graphql) - Cloudflare Workers 部署

## 🚀 性能特性

### Cloudflare Pages 优势

- ✅ **全球 CDN** - 边缘节点自动分发
- ✅ **自动 HTTPS** - 免费 SSL 证书
- ✅ **零配置缓存** - 静态资源自动缓存
- ✅ **即时回滚** - 一键回滚到任意版本
- ✅ **预览部署** - 每次部署生成唯一预览链接
- ✅ **HTTP/3** - 支持最新的 QUIC 协议
- ✅ **Brotli 压缩** - 自动压缩优化

## 📝 开发指南

### 添加新功能

1. 在 `src/api/chat.js` 中添加新的 GraphQL 查询
2. 在相应组件中调用 API
3. 更新 UI 组件展示结果

### 自定义样式

所有样式文件都在对应组件的 `.css` 文件中，可以根据需要修改：

- `src/index.css` - 全局样式
- `src/App.css` - 主应用样式
- `src/components/*.css` - 组件样式

## 📄 许可证

MIT
