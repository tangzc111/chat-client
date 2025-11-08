# DeepSeek Chat Client

一个现代化的 React + Vite 客户端，通过 GraphQL 与 DeepSeek AI 进行对话。

![React](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-purple)
![GraphQL](https://img.shields.io/badge/GraphQL-16.9-pink)

## ✨ 特性

- 🎨 现代化的用户界面设计
- ⚡ 基于 Vite 的快速开发体验
- 🔄 实时 AI 对话功能
- 📱 响应式设计，支持移动端
- 🎯 使用 GraphQL 与后端通信
- 💬 消息历史记录
- ⌨️ 支持快捷键操作

## 🚀 快速开始

### 前置要求

- Node.js 16+
- 已启动的 GraphQL 服务器 (默认 http://localhost:4000)

### 安装

```bash
# 克隆项目
git clone https://github.com/tangzc111/deepseek-chat-client.git
cd deepseek-chat-client

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

## 🏗️ 项目结构

```
deepseek-chat-client/
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
├── index.html
├── vite.config.js            # Vite 配置
└── package.json
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

### 修改 API 地址

在 `vite.config.js` 中修改代理配置：

```javascript
export default defineConfig({
  server: {
    proxy: {
      '/graphql': {
        target: 'http://your-api-server:4000',
        changeOrigin: true,
      }
    }
  }
})
```

## 📦 技术栈

- **React 18** - UI 框架
- **Vite** - 构建工具
- **GraphQL** - API 查询语言
- **graphql-request** - GraphQL 客户端

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

确保后端 GraphQL 服务器正在运行：
```bash
# 在后端项目目录
npm run dev
```

### 跨域问题

Vite 已配置代理，确保 `vite.config.js` 中的代理设置正确。

## 📄 许可证

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

如有问题，请提交 Issue 或联系维护者。
