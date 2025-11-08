import { useState } from 'react';
import { chatAPI } from './api/chat';
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendMessage = async (inputMessage) => {
    if (!inputMessage.trim()) return;

    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    try {
      // 调用 GraphQL API
      const response = await chatAPI.sendMessage(inputMessage);

      // 添加 AI 回复
      const aiMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: response.content,
        model: response.model,
        usage: response.usage,
        timestamp: response.timestamp,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError(err.message);
      console.error('发送消息失败:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>历史对话</h2>
          <button className="btn-all" onClick={handleNewChat}>
            + 新对话
          </button>
        </div>
        <div className="history-list">
          {messages.length === 0 ? (
            <div className="empty-history">暂无对话历史</div>
          ) : (
            <div className="history-item active">
              当前对话 ({messages.filter(m => m.type === 'user').length})
            </div>
          )}
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>
            <span className="header-text">创意描述，</span>
            <span className="header-highlight">智能生成 让创作更简单</span>
          </h1>
        </div>

        <ChatHistory messages={messages} loading={loading} error={error} />
        <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
      </div>
    </div>
  );
}

export default App;
