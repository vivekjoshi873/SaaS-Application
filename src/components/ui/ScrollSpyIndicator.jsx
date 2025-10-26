import React, { useState, useEffect } from 'react';

const ScrollSpyIndicator = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const sections = [
    { id: 'hero', label: 'Hero' },
    { id: 'platform', label: 'Platform' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'customers', label: 'Customers' },
    { id: 'pricing', label: 'Pricing' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show indicator after scrolling past hero section
      setIsVisible(scrollPosition > windowHeight * 0.3);

      // Find active section
      const sectionElements = sections?.map(section => ({
        ...section,
        element: document.getElementById(section?.id)
      }))?.filter(section => section?.element);

      const currentSection = sectionElements?.findIndex(section => {
        const rect = section?.element?.getBoundingClientRect();
        return rect?.top <= windowHeight * 0.5 && rect?.bottom >= windowHeight * 0.5;
      });

      if (currentSection !== -1) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element?.getBoundingClientRect()?.top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-60 hidden xl:block">
      <div className="flex flex-col space-y-3">
        {sections?.map((section, index) => (
          <button
            key={section?.id}
            onClick={() => scrollToSection(section?.id)}
            className="group relative flex items-center"
            aria-label={`Go to ${section?.label} section`}
          >
            {/* Dot indicator */}
            <div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === index
                  ? 'bg-primary border-primary shadow-glow'
                  : 'bg-transparent border-muted-foreground/40 hover:border-primary/60'
              }`}
            />
            
            {/* Label tooltip */}
            <div
              className={`absolute right-5 px-3 py-1 bg-card border border-border/20 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeSection === index
                  ? 'opacity-100 translate-x-0 text-primary' :'opacity-0 translate-x-2 text-muted-foreground group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {section?.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScrollSpyIndicator;