import React, { useState, useEffect } from 'react';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Icon from 'components/AppIcon';

const LiveChatWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: "Hi! I'm here to help you learn more about AI AutoFlow. What questions do you have?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [showUserForm, setShowUserForm] = useState(false);

  const quickQuestions = [
    "How does the automation work?",
    "What\'s the implementation time?",
    "Can I see a demo?",
    "What\'s the pricing?"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const scrollPercent = (window.pageYOffset / (document.documentElement?.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 20) {
        setIsVisible(true);
      }
    }, 60000); // Show after 60 seconds

    const handleOpenChat = () => {
      setIsVisible(true);
      setIsOpen(true);
    };

    window.addEventListener('openLiveChat', handleOpenChat);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('openLiveChat', handleOpenChat);
    };
  }, []);

  const handleSendMessage = (message = inputMessage) => {
    if (!message?.trim()) return;

    const newMessage = {
      id: messages?.length + 1,
      type: 'user',
      message: message?.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(message?.trim());
      setMessages(prev => [...prev, {
        id: prev?.length + 1,
        type: 'bot',
        message: botResponse,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage?.toLowerCase();
    
    if (message?.includes('demo') || message?.includes('see')) {
      return "I'd be happy to show you a demo! Let me connect you with our sales team. Would you like to book a personalized demo session?";
    } else if (message?.includes('pricing') || message?.includes('cost')) {
      return "Our pricing is based on your company size and automation needs. For a custom quote, I can connect you with our team. What's your company size?";
    } else if (message?.includes('implementation') || message?.includes('time')) {
      return "Most of our clients see their first automated workflows running within 2-4 weeks. The exact timeline depends on your current systems. Would you like to discuss your specific setup?";
    } else if (message?.includes('automation') || message?.includes('work')) {
      return "AI AutoFlow uses intelligent process mapping to identify repetitive tasks and creates custom automation workflows. We integrate with your existing tools seamlessly. What processes are you looking to automate?";
    } else if (message?.includes('security') || message?.includes('safe')) {
      return "Security is our top priority. We're SOC 2 Type II certified and offer enterprise-grade encryption. All data stays within your infrastructure. Would you like to speak with our security team?";
    } else {
      return "That's a great question! Let me connect you with one of our automation experts who can provide detailed information. Would you like to schedule a quick call?";
    }
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  const handleUserInfoSubmit = (e) => {
    e?.preventDefault();
    if (userInfo?.name && userInfo?.email) {
      setShowUserForm(false);
      setMessages(prev => [...prev, {
        id: prev?.length + 1,
        type: 'bot',
        message: `Thanks ${userInfo?.name}! I've noted your information. Our team will follow up with you shortly. In the meantime, how can I help you today?`,
        timestamp: new Date()
      }]);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-chat w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-glow flex items-center justify-center transition-all duration-300 hover:scale-110 animate-pulse"
        >
          <Icon name="MessageCircle" size={24} />
        </button>
      )}
      {/* Chat Widget */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-chat w-80 h-96 glass-card rounded-lg shadow-glass transition-all duration-300 ${
          isMinimized ? 'h-14' : 'h-96'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Icon name="Bot" size={16} color="white" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">AI Assistant</h4>
                <p className="text-xs text-success">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Icon name={isMinimized ? "Maximize2" : "Minimize2"} size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-64">
                {messages?.map((msg) => (
                  <div
                    key={msg?.id}
                    className={`flex ${msg?.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                        msg?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                      }`}
                    >
                      {msg?.message}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-muted-foreground px-3 py-2 rounded-lg text-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Questions */}
              {messages?.length === 1 && (
                <div className="px-4 pb-2">
                  <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-1">
                    {quickQuestions?.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickQuestion(question)}
                        className="text-xs px-2 py-1 bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground rounded transition-colors duration-200"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* User Info Form */}
              {showUserForm && (
                <div className="p-4 border-t border-border/20">
                  <form onSubmit={handleUserInfoSubmit} className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={userInfo?.name}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, name: e?.target?.value }))}
                      className="text-sm"
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={userInfo?.email}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, email: e?.target?.value }))}
                      className="text-sm"
                      required
                    />
                    <Button
                      type="submit"
                      variant="default"
                      size="sm"
                      fullWidth
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Continue
                    </Button>
                  </form>
                </div>
              )}

              {/* Input */}
              {!showUserForm && (
                <div className="p-4 border-t border-border/20">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e?.target?.value)}
                      onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={!inputMessage?.trim()}
                      className="p-2 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground rounded-md transition-colors duration-200"
                    >
                      <Icon name="Send" size={16} />
                    </button>
                  </div>
                  
                  {messages?.length > 2 && !userInfo?.name && (
                    <button
                      onClick={() => setShowUserForm(true)}
                      className="w-full mt-2 text-xs text-primary hover:text-primary/80 transition-colors duration-200"
                    >
                      Connect with our team →
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default LiveChatWidget;