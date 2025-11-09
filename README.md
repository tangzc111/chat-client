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
- 💬 消息历史记录
- ⌨️ 支持快捷键操作
- 🚀 部署在 Cloudflare Pages，全球 CDN 加速

## 🚀 快速开始

### 前置要求

- **开发环境**: Node.js 16+
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

详细部署说明请查看 [DEPLOYMENT.md](DEPLOYMENT.md)

## 🏗️ 项目结构

```
chat-client/
├── src/
│   ├── api/
│   │   └── chat.js           # GraphQL API 调用
│   ├── components/
│   │   ├── ChatHistory.jsx   # 聊天历史组件
│   │   ├── ChatHistory.css
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
└── DEPLOYMENT.md             # 部署指南
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
https://koa-graphql-deepseek.zichengtang349.workers.dev/graphql
```

#### 自定义 API 端点

创建 `.env` 文件（本地开发）:

```bash
VITE_GRAPHQL_ENDPOINT=https://your-api-server.com/graphql
```

或在 Cloudflare Pages 中设置环境变量:

1. 进入项目设置 > Environment variables
2. 添加 `VITE_GRAPHQL_ENDPOINT` 变量

详见 [DEPLOYMENT.md](DEPLOYMENT.md#环境变量配置)

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

## 🎨 界面预览

### 主界面
- 左侧边栏：历史对话列表
- 顶部：渐变色标题栏
- 中间：聊天消息区域
- 底部：输入框和发送按钮

### 设计特点
- 渐变色主题（紫色到粉色）
- 流畅的动画效果
- 清晰的消息气泡设计
- 加载状态动画

## 🔗 相关项目

- [后端服务器](https://github.com/tangzc111/koa-graphql-deepseek) - Koa + GraphQL + DeepSeek API
- [后端部署](https://koa-graphql-deepseek.zichengtang349.workers.dev/graphql) - Cloudflare Workers 部署

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

## 🐛 故障排除

### 无法连接到服务器

确保后端 GraphQL 服务器正在运行并可访问。

### 生产环境 405 错误

**原因**: Vite 的 proxy 只在开发环境生效，生产环境需直接请求后端 API。

**解决方案**: 已在 `src/api/chat.js` 中配置使用环境变量或默认后端 URL。

### CORS 跨域问题

确保后端 API 配置了正确的 CORS 响应头:

```javascript
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

更多问题请查看 [DEPLOYMENT.md](DEPLOYMENT.md#常见问题)

## 📄 许可证

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

如有问题，请提交 Issue 或联系维护者。
