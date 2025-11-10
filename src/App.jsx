import { useState, useEffect, useRef } from 'react';
import { chatAPI } from './api/chat';
import ChatInput from './components/ChatInput';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

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
      setError(err.message || '发送消息失败');
      console.error('发送消息失败:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="app">
      <div className="main-content">
        <div className="header">
          <h1>
            <span className="header-text">创意描述，</span>
            <span className="header-highlight">智能生成 让创作更简单</span>
          </h1>
        </div>

        <div className="chat-content">
          <div className="messages-container">
            {messages.length === 0 && !loading && !error && (
              <div className="empty-state">
                <div className="empty-icon">💬</div>
                <h3>开始对话</h3>
                <p>在下方输入框中输入你的问题，开始与 AI 对话</p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.type === 'user' ? 'user-message' : 'ai-message'}`}
              >
                <div className="message-avatar">
                  {message.type === 'user' ? '👤' : '🤖'}
                </div>
                <div className="message-content">
                  <div className="message-text">{message.content}</div>
                  {message.usage && (
                    <div className="message-meta">
                      <span className="meta-item">模型: {message.model}</span>
                      <span className="meta-item">Tokens: {message.usage.totalTokens}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="message ai-message">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
      </div>
    </div>
  );
}

export default App;
