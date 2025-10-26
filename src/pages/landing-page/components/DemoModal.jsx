import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from 'components/AppIcon';

const DemoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
    phone: '',
    companySize: '',
    industry: '',
    useCase: '',
    timeline: '',
    preferredDate: '',
    preferredTime: '',
    additionalInfo: ''
  });

  const companySizeOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-1000', label: '201-1000 employees' },
    { value: '1000+', label: '1000+ employees' }
  ];

  const industryOptions = [
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Financial Services' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'logistics', label: 'Logistics & Supply Chain' },
    { value: 'technology', label: 'Technology' },
    { value: 'education', label: 'Education' },
    { value: 'government', label: 'Government' },
    { value: 'other', label: 'Other' }
  ];

  const useCaseOptions = [
    { value: 'invoice-processing', label: 'Invoice Processing' },
    { value: 'quality-control', label: 'Quality Control' },
    { value: 'customer-onboarding', label: 'Customer Onboarding' },
    { value: 'inventory-management', label: 'Inventory Management' },
    { value: 'hr-processes', label: 'HR Processes' },
    { value: 'sales-automation', label: 'Sales Automation' },
    { value: 'compliance-reporting', label: 'Compliance Reporting' },
    { value: 'data-migration', label: 'Data Migration' },
    { value: 'other', label: 'Other' }
  ];

  const timelineOptions = [
    { value: 'immediate', label: 'Immediate (within 1 month)' },
    { value: '1-3-months', label: '1-3 months' },
    { value: '3-6-months', label: '3-6 months' },
    { value: '6-12-months', label: '6-12 months' },
    { value: 'exploring', label: 'Just exploring options' }
  ];

  const timeSlotOptions = [
    { value: '9:00 AM', label: '9:00 AM' },
    { value: '10:00 AM', label: '10:00 AM' },
    { value: '11:00 AM', label: '11:00 AM' },
    { value: '1:00 PM', label: '1:00 PM' },
    { value: '2:00 PM', label: '2:00 PM' },
    { value: '3:00 PM', label: '3:00 PM' },
    { value: '4:00 PM', label: '4:00 PM' }
  ];

  useEffect(() => {
    const handleOpenModal = () => {
      setIsOpen(true);
      setCurrentStep(1);
    };

    window.addEventListener('openDemoModal', handleOpenModal);
    return () => window.removeEventListener('openDemoModal', handleOpenModal);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setCurrentStep(1);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      jobTitle: '',
      phone: '',
      companySize: '',
      industry: '',
      useCase: '',
      timeline: '',
      preferredDate: '',
      preferredTime: '',
      additionalInfo: ''
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In a real implementation, this would submit to your CRM/booking system
    console.log('Demo booking submitted:', formData);

    setIsSubmitting(false);
    closeModal();
    
    // Show success message
    alert('Thank you! Your demo has been scheduled. You\'ll receive a confirmation email shortly.');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData?.firstName && formData?.lastName && formData?.email && formData?.company;
      case 2:
        return formData?.companySize && formData?.industry && formData?.useCase && formData?.timeline;
      case 3:
        return formData?.preferredDate && formData?.preferredTime;
      default:
        return false;
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow?.setDate(tomorrow?.getDate() + 1);
    return tomorrow?.toISOString()?.split('T')?.[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate?.setDate(maxDate?.getDate() + 30);
    return maxDate?.toISOString()?.split('T')?.[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={closeModal}
      />
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl glass-card rounded-lg max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/20">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Schedule Your Demo
            </h2>
            <p className="text-muted-foreground">
              Step {currentStep} of 3 • Get a personalized automation demo
            </p>
          </div>
          <button
            onClick={closeModal}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            {[1, 2, 3]?.map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step <= currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step < currentStep ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    step
                  )}
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-1 mx-2 rounded ${
                    step < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Contact Info</span>
            <span>Company Details</span>
            <span>Schedule</span>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Contact Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Let's get to know you
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      type="text"
                      placeholder="John"
                      value={formData?.firstName}
                      onChange={(e) => handleInputChange('firstName', e?.target?.value)}
                      required
                    />
                    <Input
                      label="Last Name"
                      type="text"
                      placeholder="Smith"
                      value={formData?.lastName}
                      onChange={(e) => handleInputChange('lastName', e?.target?.value)}
                      required
                    />
                  </div>
                </div>

                <Input
                  label="Business Email"
                  type="email"
                  placeholder="john.smith@company.com"
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Company Name"
                    type="text"
                    placeholder="Acme Corporation"
                    value={formData?.company}
                    onChange={(e) => handleInputChange('company', e?.target?.value)}
                    required
                  />
                  <Input
                    label="Job Title"
                    type="text"
                    placeholder="Operations Manager"
                    value={formData?.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e?.target?.value)}
                  />
                </div>

                <Input
                  label="Phone Number (Optional)"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                />
              </motion.div>
            )}

            {/* Step 2: Company Details */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Tell us about your business
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Company Size"
                      options={companySizeOptions}
                      value={formData?.companySize}
                      onChange={(value) => handleInputChange('companySize', value)}
                      placeholder="Select company size"
                      required
                    />
                    <Select
                      label="Industry"
                      options={industryOptions}
                      value={formData?.industry}
                      onChange={(value) => handleInputChange('industry', value)}
                      placeholder="Select your industry"
                      required
                    />
                  </div>
                </div>

                <Select
                  label="Primary Use Case"
                  description="What process would you like to automate first?"
                  options={useCaseOptions}
                  value={formData?.useCase}
                  onChange={(value) => handleInputChange('useCase', value)}
                  placeholder="Select primary use case"
                  required
                />

                <Select
                  label="Implementation Timeline"
                  description="When are you looking to implement automation?"
                  options={timelineOptions}
                  value={formData?.timeline}
                  onChange={(value) => handleInputChange('timeline', value)}
                  placeholder="Select timeline"
                  required
                />
              </motion.div>
            )}

            {/* Step 3: Schedule */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Choose your preferred time
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Preferred Date"
                      type="date"
                      value={formData?.preferredDate}
                      onChange={(e) => handleInputChange('preferredDate', e?.target?.value)}
                      min={getMinDate()}
                      max={getMaxDate()}
                      required
                    />
                    <Select
                      label="Preferred Time (EST)"
                      options={timeSlotOptions}
                      value={formData?.preferredTime}
                      onChange={(value) => handleInputChange('preferredTime', value)}
                      placeholder="Select time slot"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    placeholder="Tell us more about your specific automation needs or any questions you have..."
                    value={formData?.additionalInfo}
                    onChange={(e) => handleInputChange('additionalInfo', e?.target?.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>

                {/* Demo Preview */}
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="Calendar" size={16} className="mr-2 text-primary" />
                    What to Expect in Your Demo
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <Icon name="Check" size={14} className="mr-2 text-success mt-0.5" />
                      Personalized workflow demonstration for {formData?.industry || 'your industry'}
                    </li>
                    <li className="flex items-start">
                      <Icon name="Check" size={14} className="mr-2 text-success mt-0.5" />
                      ROI calculation specific to your company size
                    </li>
                    <li className="flex items-start">
                      <Icon name="Check" size={14} className="mr-2 text-success mt-0.5" />
                      Implementation roadmap and timeline discussion
                    </li>
                    <li className="flex items-start">
                      <Icon name="Check" size={14} className="mr-2 text-success mt-0.5" />
                      Q&A session with automation experts
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-border/20">
            <div>
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  iconName="ChevronLeft"
                  iconPosition="left"
                  iconSize={16}
                >
                  Previous
                </Button>
              )}
            </div>

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="ghost"
                onClick={closeModal}
              >
                Cancel
              </Button>
              
              {currentStep < 3 ? (
                <Button
                  type="button"
                  variant="default"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  iconName="ChevronRight"
                  iconPosition="right"
                  iconSize={16}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="default"
                  loading={isSubmitting}
                  disabled={!isStepValid()}
                  className="cta-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  iconName="Calendar"
                  iconPosition="left"
                  iconSize={16}
                >
                  {isSubmitting ? 'Scheduling...' : 'Schedule Demo'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default DemoModal;