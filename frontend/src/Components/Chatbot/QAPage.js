import React, { useState } from 'react';
import './QAPage.css'; 
import '@fortawesome/fontawesome-free/css/all.css';

const QAPage = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isListening, setIsListening] = useState(false);

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
    }

    try {
      setTyping(true);
      setIsInputDisabled(true);

      const response = await fetch('https://floral-mode-046e.dharshinilohi.workers.dev/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage }),
        mode: 'cors'
      });

      const data = await response.json();
      console.log(data);

      const rawReply = data.response || "Sorry, I couldn't understand your message.";
      
      const formattedReply = rawReply.split('.')
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 0)
        .join(".\n") + "."; // Ensure the last sentence ends with a period
      console.log(formattedReply);
      
      addMessage(formattedReply);
    } catch (error) {
      addMessage('Sorry, there was an error processing your message.');
      console.error('Error:', error);
    } finally {
      setTyping(false);
      setIsInputDisabled(false);
    }
  };

  const simulateBotResponse = async (userMessage) => {
    setTyping(true);
    setIsInputDisabled(true);

    try {
      const classificationResponse = await fetch('https://lifelink-1.onrender.com/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userMessage }),
        mode: 'cors'
      });

      const classificationData = await classificationResponse.json();
      const severity = classificationData.classification;
      console.log(classificationData);

      setTyping(false);
      suggestHelp(severity, userMessage);
    } catch (error) {
      setTyping(false);
      setIsInputDisabled(false);
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

  // Voice recognition function
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support voice recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
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
            <div className="message-bubble">
              {message.isUser ? (
                message.content
              ) : (
                <div style={{ textAlign: 'left' }}>
                  {message.content.split('.').map((sentence, index) => 
                    sentence.trim() && (
                      <p key={index} style={{ margin: '5px 0' }}>
                        <strong>{index + 1}.</strong> {sentence.trim()}.
                      </p>
                    )
                  )}
                </div>
              )}
            </div>
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
            placeholder="Type or speak your message..."
            value={inputMessage}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isInputDisabled} 
          />
          <div className="action-buttons">
            <button className="action-button" aria-label="Add attachment">
              <i className="fas fa-paperclip"></i>
            </button>
            <button
              className={`action-button ${isListening ? "listening" : ""}`}
              aria-label="Voice input"
              onClick={startListening}
            >
              <i className="fas fa-microphone"></i>
            </button>
            <button className="send-button" onClick={handleSendMessage} disabled={isInputDisabled}>
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
