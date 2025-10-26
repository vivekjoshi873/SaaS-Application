import React, { useState, useEffect } from 'react';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const MobileConversionBar = () => {
  const [currentCTA, setCurrentCTA] = useState('demo');
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement?.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrollProgress(scrollPercent);
      setIsVisible(scrollTop > 200); // Show after scrolling 200px

      // Switch CTA based on scroll progress and engagement
      if (scrollPercent > 60) {
        setCurrentCTA('trial');
      } else if (scrollPercent > 30) {
        setCurrentCTA('demo');
      } else {
        setCurrentCTA('demo');
      }
    };

    // Show chat after 60 seconds of engagement
    const chatTimer = setTimeout(() => {
      if (scrollProgress > 20) {
        setCurrentCTA('chat');
      }
    }, 60000);

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(chatTimer);
    };
  }, [scrollProgress]);

  const handleDemoClick = () => {
    const event = new CustomEvent('openDemoModal');
    window.dispatchEvent(event);
  };

  const handleTrialClick = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChatClick = () => {
    const event = new CustomEvent('openLiveChat');
    window.dispatchEvent(event);
  };

  const getCTAConfig = () => {
    switch (currentCTA) {
      case 'trial':
        return {
          text: 'Start Free Trial',
          icon: 'Rocket',
          onClick: handleTrialClick,
          variant: 'default',
          className: 'bg-success hover:bg-success/90 text-success-foreground'
        };
      case 'chat':
        return {
          text: 'Chat with Expert',
          icon: 'MessageCircle',
          onClick: handleChatClick,
          variant: 'outline',
          className: 'border-primary text-primary hover:bg-primary/10'
        };
      default:
        return {
          text: 'Book Demo',
          icon: 'Calendar',
          onClick: handleDemoClick,
          variant: 'default',
          className: 'bg-primary hover:bg-primary/90 text-primary-foreground cta-glow'
        };
    }
  };

  if (!isVisible) return null;

  const ctaConfig = getCTAConfig();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-80 lg:hidden">
      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
          style={{ width: `${Math.min(scrollProgress, 100)}%` }}
        />
      </div>
      {/* CTA Bar */}
      <div className="glass-card border-t border-border/20 p-4">
        <div className="flex items-center justify-between space-x-4">
          {/* Secondary action */}
          <button
            onClick={() => {
              const element = document.getElementById('pricing');
              if (element) {
                element?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icon name="DollarSign" size={16} />
            <span className="text-sm font-medium">Pricing</span>
          </button>

          {/* Primary CTA */}
          <Button
            variant={ctaConfig?.variant}
            size="sm"
            onClick={ctaConfig?.onClick}
            className={`flex-1 max-w-48 font-semibold ${ctaConfig?.className}`}
            iconName={ctaConfig?.icon}
            iconPosition="left"
            iconSize={16}
          >
            {ctaConfig?.text}
          </Button>

          {/* Phone action */}
          <button
            onClick={() => window.open('tel:+1-800-AI-FLOW', '_self')}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icon name="Phone" size={16} />
            <span className="text-sm font-medium">Call</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileConversionBar;