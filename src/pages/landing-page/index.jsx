import React from 'react';
import Header from 'components/ui/Header';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import BenefitsSection from './components/BenefitsSection';
import IntegrationsSection from './components/IntegrationsSection';
import TestimonialsSection from './components/TestimonialsSection';
import ROICalculatorSection from './components/ROICalculatorSection';
import PricingSection from './components/PricingSection';
import FAQSection from './components/FAQSection';
import FinalCTASection from './components/FinalCTASection';
import DemoModal from './components/DemoModal';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      
      <ProblemSection />
      
      <SolutionSection />
      
      <BenefitsSection />
      
      <IntegrationsSection />
      
      <TestimonialsSection />
      
      <ROICalculatorSection />
      
      <PricingSection />
      
      <FAQSection />
      
      <FinalCTASection />
          
      <DemoModal />
    </div>
  );
};

export default LandingPage;