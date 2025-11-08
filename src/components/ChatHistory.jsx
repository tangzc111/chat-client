import { useEffect, useRef } from 'react';
import './ChatHistory.css';

function ChatHistory({ messages, loading, error }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-history">
      <div className="messages-container">
        {messages.length === 0 && !loading && (
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
  );
}

export default ChatHistory;
