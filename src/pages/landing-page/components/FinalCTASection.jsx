import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Icon from 'components/AppIcon';

const FinalCTASection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [urgencyData, setUrgencyData] = useState({
    spotsRemaining: 47,
    companiesAutomated: 10247,
    savingsToday: 2847000
  });
  const [isReturningVisitor, setIsReturningVisitor] = useState(false);

  useEffect(() => {
    // Simulate urgency counters
    const interval = setInterval(() => {
      setUrgencyData(prev => ({
        spotsRemaining: Math.max(25, prev?.spotsRemaining - Math.floor(Math.random() * 2)),
        companiesAutomated: prev?.companiesAutomated + Math.floor(Math.random() * 3),
        savingsToday: prev?.savingsToday + Math.floor(Math.random() * 50000)
      }));
    }, 30000);

    // Check if returning visitor
    const hasVisited = localStorage.getItem('ai-autoflow-visited');
    if (hasVisited) {
      setIsReturningVisitor(true);
    } else {
      localStorage.setItem('ai-autoflow-visited', 'true');
    }

    return () => clearInterval(interval);
  }, []);

  const handleEmailSubmit = async (e) => {
    e?.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real implementation, this would submit to your email service
    console.log('Email submitted:', email);
    
    setIsSubmitting(false);
    setEmail('');
    
    // Show success message or redirect
    alert('Thank you! We\'ll be in touch soon with your exclusive access.');
  };

  const handleDemoClick = () => {
    const event = new CustomEvent('openDemoModal');
    window.dispatchEvent(event);
  };

  const handleTrialClick = () => {
    // In a real implementation, this would redirect to signup
    window.open('/signup', '_blank');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Urgency Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-warning/20 to-error/20 border border-warning/30 rounded-full px-6 py-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
              <span className="text-sm font-medium text-foreground">
                {isReturningVisitor ? 'Limited Time: 25% Implementation Discount' : 'Exclusive Beta Access'}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Only <span className="font-bold text-warning">{urgencyData?.spotsRemaining}</span> spots remaining
            </div>
          </div>
        </motion.div>

        {/* Main CTA Content */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
          >
            Ready to <span className="gradient-text">Transform</span><br />
            Your Business?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            Join thousands of companies already saving millions with AI automation. 
            Start your transformation today with our risk-free trial.
          </motion.p>

          {/* Live Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="glass-card p-6 rounded-lg">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">Live Today</span>
              </div>
              <div className="text-2xl font-bold text-success mb-1">
                {urgencyData?.companiesAutomated?.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Companies Automated</div>
            </div>
            
            <div className="glass-card p-6 rounded-lg">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Icon name="DollarSign" size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">Saved Today</span>
              </div>
              <div className="text-2xl font-bold text-primary mb-1">
                {formatCurrency(urgencyData?.savingsToday)}
              </div>
              <div className="text-sm text-muted-foreground">In Operational Costs</div>
            </div>
            
            <div className="glass-card p-6 rounded-lg">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Icon name="Clock" size={16} className="text-accent" />
                <span className="text-sm text-muted-foreground">Average</span>
              </div>
              <div className="text-2xl font-bold text-accent mb-1">
                3 weeks
              </div>
              <div className="text-sm text-muted-foreground">To Full ROI</div>
            </div>
          </motion.div>
        </div>

        {/* CTA Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Primary CTA - Demo */}
          <div className="glass-card p-8 rounded-lg border-2 border-primary/20 hover:border-primary/40 transition-colors duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Calendar" size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Book Your Demo
              </h3>
              <p className="text-muted-foreground">
                See AI AutoFlow in action with a personalized demo tailored to your industry and use cases.
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon name="Check" size={16} className="mr-3 text-success" />
                Personalized workflow demonstration
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon name="Check" size={16} className="mr-3 text-success" />
                ROI calculation for your business
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon name="Check" size={16} className="mr-3 text-success" />
                Implementation roadmap planning
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon name="Check" size={16} className="mr-3 text-success" />
                Q&A with automation experts
              </div>
            </div>

            <Button
              variant="default"
              size="lg"
              fullWidth
              onClick={handleDemoClick}
              className="cta-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mb-4"
              iconName="Calendar"
              iconPosition="left"
              iconSize={20}
            >
              Schedule Free Demo
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              <Icon name="Clock" size={14} className="inline mr-1" />
              30-minute session • No commitment required
            </div>
          </div>

          {/* Secondary CTA - Trial */}
          <div className="glass-card p-8 rounded-lg">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Rocket" size={32} className="text-success" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Start Free Trial
              </h3>
              <p className="text-muted-foreground">
                Get immediate access to AI AutoFlow and start automating your processes today.
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon name="Check" size={16} className="mr-3 text-success" />
                14-day free trial • No credit card
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon name="Check" size={16} className="mr-3 text-success" />
                Full Professional plan access
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon name="Check" size={16} className="mr-3 text-success" />
                Pre-built workflow templates
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon name="Check" size={16} className="mr-3 text-success" />
                Onboarding support included
              </div>
            </div>

            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={handleTrialClick}
              className="border-success text-success hover:bg-success/10 font-semibold mb-4"
              iconName="Rocket"
              iconPosition="left"
              iconSize={20}
            >
              Start Free Trial
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              <Icon name="Shield" size={14} className="inline mr-1" />
              Cancel anytime • Keep your data
            </div>
          </div>
        </motion.div>

        {/* Email Capture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card p-8 rounded-lg text-center"
        >
          <h3 className="text-xl font-bold text-foreground mb-2">
            Not Ready Yet? Stay Updated
          </h3>
          <p className="text-muted-foreground mb-6">
            Get exclusive automation insights, case studies, and early access to new features.
          </p>
          
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
            <div className="flex space-x-3">
              <Input
                type="email"
                placeholder="Enter your business email"
                value={email}
                onChange={(e) => setEmail(e?.target?.value)}
                className="flex-1"
                required
              />
              <Button
                type="submit"
                variant="outline"
                loading={isSubmitting}
                disabled={!email}
                className="border-primary text-primary hover:bg-primary/10"
                iconName="Send"
                iconPosition="left"
                iconSize={16}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
          </form>
          
          <div className="text-xs text-muted-foreground mt-3">
            <Icon name="Lock" size={12} className="inline mr-1" />
            We respect your privacy. Unsubscribe at any time.
          </div>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-success" />
              <span className="text-sm font-medium text-muted-foreground">SOC 2 Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={20} className="text-success" />
              <span className="text-sm font-medium text-muted-foreground">ISO 27001</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={20} className="text-success" />
              <span className="text-sm font-medium text-muted-foreground">GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <span className="text-sm font-medium text-muted-foreground">99.9% Uptime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;