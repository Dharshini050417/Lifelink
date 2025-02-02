import React, { useState } from 'react';
import './QAPage.css'; 
import '@fortawesome/fontawesome-free/css/all.css';

const QAPage = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [typing, setTyping] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  const addMessage = (content, isUser = false) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { content, isUser, id: prevMessages.length }
    ]);
  };

  const triggerHelpline = () => {
    alert("Severe distress detected! Contacting helpline...");
  };

  const suggestHelp = async (severity, userMessage) => {
    if (severity === "Severe Distress") {
      triggerHelpline();
    } else {
      try {
        const response = await fetch('https://floral-mode-046e.dharshinilohi.workers.dev/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt : userMessage }),
          mode: 'cors'
        });

        const data = await response.json();
        const botReply = data.response.response || 'Sorry, I couldn\'t understand your message.';
        addMessage(botReply);
      } catch (error) {
        addMessage('Sorry, there was an error processing your message.');
        console.error('Error:', error);
      }
    }
  };

  const simulateBotResponse = async (userMessage) => {
    setTyping(true);
    
    try {
      const classificationResponse = await fetch('https://lifelink-1.onrender.com//classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userMessage }),
        mode: 'cors'
      });
      
      const classificationData = await classificationResponse.json();
      const severity = classificationData.severity;
      
      setTyping(false);
      addMessage(`Detected severity: ${severity}`);
      suggestHelp(severity, userMessage);
      
    } catch (error) {
      setTyping(false);
      addMessage('Sorry, there was an error processing your message.');
      console.error('Error:', error);
    }
  };
  
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      addMessage(inputMessage, true);
      setInputMessage('');
      simulateBotResponse(inputMessage);
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  return (
    <div className={`app-container ${isDarkTheme ? 'dark' : 'light'}`}>
      <div className="header">
        <div className="header-title">
          <h1>AI Assistant</h1>
          <div className="bot-status">
            <div className="status-indicator"></div>
            <span>Online</span>
          </div>
        </div>
        <div className="controls">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <i className={`fas ${isDarkTheme ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
        </div>
      </div>

      <div className="chat-container">
        {messages.map(message => (
          <div className={`message ${message.isUser ? 'user-message' : 'bot-message'}`} key={message.id}>
            <div className="avatar">{message.isUser ? 'U' : 'AI'}</div>
            <div className="message-bubble">{message.content}</div>
          </div>
        ))}
        {typing && (
          <div className="typing-indicator">
            <div className="typing-dots">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        )}
      </div>

      <div className="input-container">
        <div className="input-wrapper">
          <input
            type="text"
            className="message-input"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <div className="action-buttons">
            <button className="action-button" aria-label="Add attachment">
              <i className="fas fa-paperclip"></i>
            </button>
            <button className="action-button" aria-label="Voice input">
              <i className="fas fa-microphone"></i>
            </button>
            <button className="send-button" onClick={handleSendMessage}>
              <span>Send</span>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QAPage;
