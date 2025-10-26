import React, { useState, useEffect } from 'react';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';
import Icon from 'components/AppIcon';

const DemoBookingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
    companySize: '',
    industry: '',
    phone: '',
    timeSlot: '',
    challenges: ''
  });
  const [errors, setErrors] = useState({});

  const companySizeOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-1000', label: '201-1000 employees' },
    { value: '1000+', label: '1000+ employees' }
  ];

  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Financial Services' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'logistics', label: 'Logistics & Supply Chain' },
    { value: 'other', label: 'Other' }
  ];

  const timeSlotOptions = [
    { value: 'morning', label: 'Morning (9 AM - 12 PM)' },
    { value: 'afternoon', label: 'Afternoon (12 PM - 5 PM)' },
    { value: 'evening', label: 'Evening (5 PM - 7 PM)' }
  ];

  useEffect(() => {
    const handleOpenModal = () => {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };

    const handleCloseModal = () => {
      setIsOpen(false);
      document.body.style.overflow = 'unset';
    };

    window.addEventListener('openDemoModal', handleOpenModal);
    window.addEventListener('closeDemoModal', handleCloseModal);

    return () => {
      window.removeEventListener('openDemoModal', handleOpenModal);
      window.removeEventListener('closeDemoModal', handleCloseModal);
      document.body.style.overflow = 'unset';
    };
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
      companySize: '',
      industry: '',
      phone: '',
      timeSlot: '',
      challenges: ''
    });
    setErrors({});
    document.body.style.overflow = 'unset';
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
      if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
      if (!formData?.email?.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = 'Invalid email format';
      if (!formData?.company?.trim()) newErrors.company = 'Company name is required';
    }

    if (step === 2) {
      if (!formData?.jobTitle?.trim()) newErrors.jobTitle = 'Job title is required';
      if (!formData?.companySize) newErrors.companySize = 'Company size is required';
      if (!formData?.industry) newErrors.industry = 'Industry is required';
    }

    if (step === 3) {
      if (!formData?.timeSlot) newErrors.timeSlot = 'Preferred time slot is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateStep(3)) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - show confirmation
      setCurrentStep(4);
    } catch (error) {
      console.error('Demo booking failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
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
      <div className="relative w-full max-w-md glass-card rounded-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/20">
          <div>
            <h2 className="text-xl font-bold text-foreground">Book Your Demo</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Step {currentStep} of 3
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
        <div className="px-6 pt-4">
          <div className="flex space-x-2">
            {[1, 2, 3]?.map((step) => (
              <div
                key={step}
                className={`flex-1 h-2 rounded-full transition-colors duration-300 ${
                  step <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Contact Information
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  type="text"
                  value={formData?.firstName}
                  onChange={(e) => handleInputChange('firstName', e?.target?.value)}
                  error={errors?.firstName}
                  required
                />
                <Input
                  label="Last Name"
                  type="text"
                  value={formData?.lastName}
                  onChange={(e) => handleInputChange('lastName', e?.target?.value)}
                  error={errors?.lastName}
                  required
                />
              </div>
              
              <Input
                label="Email Address"
                type="email"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                error={errors?.email}
                required
              />
              
              <Input
                label="Company Name"
                type="text"
                value={formData?.company}
                onChange={(e) => handleInputChange('company', e?.target?.value)}
                error={errors?.company}
                required
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Company Details
              </h3>
              
              <Input
                label="Job Title"
                type="text"
                value={formData?.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e?.target?.value)}
                error={errors?.jobTitle}
                required
              />
              
              <Select
                label="Company Size"
                options={companySizeOptions}
                value={formData?.companySize}
                onChange={(value) => handleInputChange('companySize', value)}
                error={errors?.companySize}
                required
              />
              
              <Select
                label="Industry"
                options={industryOptions}
                value={formData?.industry}
                onChange={(value) => handleInputChange('industry', value)}
                error={errors?.industry}
                required
              />
              
              <Input
                label="Phone Number (Optional)"
                type="tel"
                value={formData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Schedule Your Demo
              </h3>
              
              <Select
                label="Preferred Time Slot"
                options={timeSlotOptions}
                value={formData?.timeSlot}
                onChange={(value) => handleInputChange('timeSlot', value)}
                error={errors?.timeSlot}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Current Challenges (Optional)
                </label>
                <textarea
                  value={formData?.challenges}
                  onChange={(e) => handleInputChange('challenges', e?.target?.value)}
                  placeholder="Tell us about your current automation challenges..."
                  rows={4}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Check" size={32} color="var(--color-success)" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Demo Booked Successfully!
              </h3>
              <p className="text-muted-foreground">
                We'll send you a calendar invite within the next few minutes. 
                Our team will reach out to confirm the details.
              </p>
              <div className="bg-muted/20 rounded-lg p-4 text-left">
                <h4 className="font-semibold text-foreground mb-2">What's Next?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Calendar invite sent to {formData?.email}</li>
                  <li>• Pre-demo questionnaire (5 minutes)</li>
                  <li>• Personalized demo session (30 minutes)</li>
                  <li>• Custom ROI analysis for your business</li>
                </ul>
              </div>
            </div>
          )}

          {/* Form Actions */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-6 pt-4 border-t border-border/20">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  iconName="ArrowLeft"
                  iconPosition="left"
                  iconSize={16}
                >
                  Back
                </Button>
              ) : (
                <div />
              )}
              
              {currentStep < 3 ? (
                <Button
                  type="button"
                  variant="default"
                  onClick={handleNext}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={16}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="default"
                  loading={isLoading}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground cta-glow"
                  iconName="Calendar"
                  iconPosition="left"
                  iconSize={16}
                >
                  Book Demo
                </Button>
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className="mt-6 pt-4 border-t border-border/20">
              <Button
                type="button"
                variant="default"
                fullWidth
                onClick={closeModal}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Close
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DemoBookingModal;