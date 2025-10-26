import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation items - different for landing page vs other pages
  const isLandingPage = location.pathname === '/' || location.pathname === '/landing-page';
  
  const navigationItems = isLandingPage ? [
    { id: 'platform', label: 'Platform', href: '#platform', type: 'scroll' },
    { id: 'benefits', label: 'Benefits', href: '#benefits', type: 'scroll' },
    { id: 'customers', label: 'Customers', href: '#customers', type: 'scroll' },
    { id: 'pricing', label: 'Pricing', href: '#pricing', type: 'scroll' }
  ] : [
    { id: 'home', label: 'Home', href: '/', type: 'route' },
    { id: 'services', label: 'Services', href: '/services', type: 'route' },
    { id: 'work', label: 'Work', href: '/work', type: 'route' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Only update active section for landing page with scroll navigation
      if (isLandingPage) {
        const sections = navigationItems?.map(item => item?.id);
        const currentSection = sections?.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element?.getBoundingClientRect();
            return rect?.top <= 100 && rect?.bottom >= 100;
          }
          return false;
        });
        
        if (currentSection) {
          setActiveSection(currentSection);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLandingPage, navigationItems]);

  const handleNavigation = (item) => {
    if (item.type === 'scroll') {
      // Handle scroll navigation for landing page
      const element = document.querySelector(item.href);
      if (element) {
        const headerHeight = 80;
        const elementPosition = element?.getBoundingClientRect()?.top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else if (item.type === 'route') {
      // Handle route navigation
      navigate(item.href);
    }
    setIsMobileMenuOpen(false);
  };

  const handleDemoClick = () => {
    // Trigger demo booking modal
    const event = new CustomEvent('openDemoModal');
    window.dispatchEvent(event);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-navigation transition-all duration-300 ${
          isScrolled 
            ? 'glass-card border-b border-border/20' :'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-20 pr-6">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <Icon name="Zap" size={24} color="white" strokeWidth={2.5} />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg blur animate-pulse"></div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-foreground">
                    AI AutoFlow
                  </h1>
                  <p className="text-xs text-muted-foreground -mt-1">
                    Enterprise Automation
                  </p>
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems?.map((item) => (
                <button
                  key={item?.id}
                  onClick={() => handleNavigation(item)}
                  className={`text-sm font-medium transition-all duration-200 hover:text-primary ${
                    (isLandingPage && activeSection === item?.id) || (!isLandingPage && location.pathname === item?.href)
                      ? 'nav-active text-primary' :'text-muted-foreground'
                  }`}
                >
                  {item?.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              {isLandingPage ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigation({ type: 'scroll', href: '#pricing' })}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    View Pricing
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleDemoClick}
                    className="cta-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    iconName="Calendar"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Book Demo
                  </Button>
                </>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => navigate('/')}
                  className="cta-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  iconName="Home"
                  iconPosition="left"
                  iconSize={16}
                >
                  Back to Home
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <Icon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                size={24} 
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-mobile-menu lg:hidden">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-20 left-0 right-0 glass-card border-b border-border/20 mx-4 rounded-lg">
            <nav className="p-6 space-y-4">
              {navigationItems?.map((item) => (
                <button
                  key={item?.id}
                  onClick={() => handleNavigation(item)}
                  className={`block w-full text-left py-3 px-4 rounded-lg text-base font-medium transition-all duration-200 ${
                    (isLandingPage && activeSection === item?.id) || (!isLandingPage && location.pathname === item?.href)
                      ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {item?.label}
                </button>
              ))}
              
              <div className="pt-4 border-t border-border/20 space-y-3">
                {isLandingPage ? (
                  <>
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => handleNavigation({ type: 'scroll', href: '#pricing' })}
                      className="justify-center"
                    >
                      View Pricing
                    </Button>
                    <Button
                      variant="default"
                      fullWidth
                      onClick={handleDemoClick}
                      className="justify-center cta-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                      iconName="Calendar"
                      iconPosition="left"
                      iconSize={16}
                    >
                      Book Demo
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="default"
                    fullWidth
                    onClick={() => navigate('/')}
                    className="justify-center cta-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    iconName="Home"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Back to Home
                  </Button>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;