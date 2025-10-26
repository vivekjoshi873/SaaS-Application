import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';
import Icon from 'components/AppIcon';

const ROICalculatorSection = () => {
  const [formData, setFormData] = useState({
    employees: '',
    avgHourlyRate: '',
    manualHoursPerWeek: '',
    processVolume: '',
    industry: '',
    errorRate: '15'
  });
  
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

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

  const industryMultipliers = {
    manufacturing: { efficiency: 0.85, errorReduction: 0.95, implementation: 3 },
    healthcare: { efficiency: 0.78, errorReduction: 0.89, implementation: 2 },
    finance: { efficiency: 0.92, errorReduction: 0.99, implementation: 4 },
    retail: { efficiency: 0.88, errorReduction: 0.85, implementation: 3 },
    logistics: { efficiency: 0.91, errorReduction: 0.94, implementation: 4 },
    technology: { efficiency: 0.89, errorReduction: 0.98, implementation: 2 },
    education: { efficiency: 0.75, errorReduction: 0.82, implementation: 2 },
    government: { efficiency: 0.70, errorReduction: 0.88, implementation: 6 },
    other: { efficiency: 0.80, errorReduction: 0.85, implementation: 3 }
  };

  const calculateROI = () => {
    if (!formData?.employees || !formData?.avgHourlyRate || !formData?.manualHoursPerWeek || !formData?.industry) {
      return;
    }

    setIsCalculating(true);

    setTimeout(() => {
      const employees = parseInt(formData?.employees);
      const hourlyRate = parseFloat(formData?.avgHourlyRate);
      const manualHours = parseFloat(formData?.manualHoursPerWeek);
      const errorRate = parseFloat(formData?.errorRate) / 100;
      const processVolume = parseInt(formData?.processVolume) || 100;

      const multipliers = industryMultipliers?.[formData?.industry];

      // Current costs
      const weeklyLaborCost = employees * hourlyRate * manualHours;
      const annualLaborCost = weeklyLaborCost * 52;
      
      // Error costs (estimated at 20% of labor cost for rework)
      const annualErrorCost = annualLaborCost * errorRate * 0.2;
      
      // Opportunity cost (estimated productivity loss)
      const opportunityCost = annualLaborCost * 0.3;
      
      const totalCurrentCost = annualLaborCost + annualErrorCost + opportunityCost;

      // Savings with automation
      const timeSavings = multipliers?.efficiency;
      const errorReduction = multipliers?.errorReduction;
      
      const laborSavings = annualLaborCost * timeSavings;
      const errorSavings = annualErrorCost * errorReduction;
      const productivityGains = opportunityCost * 0.8;
      
      const totalSavings = laborSavings + errorSavings + productivityGains;

      // Implementation costs
      const implementationCost = employees * 150; // $150 per employee
      const monthlyCost = employees * 25; // $25 per employee per month
      const annualSubscription = monthlyCost * 12;

      // ROI calculations
      const netSavings = totalSavings - annualSubscription;
      const roiPercentage = ((netSavings - implementationCost) / implementationCost) * 100;
      const paybackMonths = implementationCost / (netSavings / 12);

      setResults({
        currentCosts: {
          laborCost: annualLaborCost,
          errorCost: annualErrorCost,
          opportunityCost: opportunityCost,
          total: totalCurrentCost
        },
        savings: {
          laborSavings: laborSavings,
          errorSavings: errorSavings,
          productivityGains: productivityGains,
          total: totalSavings
        },
        investment: {
          implementation: implementationCost,
          annualSubscription: annualSubscription,
          total: implementationCost + annualSubscription
        },
        roi: {
          netSavings: netSavings,
          percentage: roiPercentage,
          paybackMonths: paybackMonths,
          threeYearValue: (netSavings * 3) - implementationCost
        },
        metrics: {
          timeSaved: timeSavings * 100,
          errorReduction: errorReduction * 100,
          implementationWeeks: multipliers?.implementation,
          hoursPerWeek: manualHours * employees * timeSavings
        }
      });

      setIsCalculating(false);
    }, 2000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US')?.format(Math.round(number));
  };

  const handleDemoWithData = () => {
    const event = new CustomEvent('openDemoModal');
    window.dispatchEvent(event);
    
    // In a real implementation, you would pass the calculator data
    // to pre-fill the demo booking form
  };

  return (
    <section className="py-20 bg-gradient-to-br from-muted/5 via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Calculate Your <span className="gradient-text">ROI</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get a personalized ROI projection based on your current processes. 
            See exactly how much time and money you could save with AI automation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <div className="glass-card p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <Icon name="Calculator" size={24} className="mr-3 text-primary" />
              ROI Calculator
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Number of Employees"
                  type="number"
                  placeholder="e.g., 50"
                  value={formData?.employees}
                  onChange={(e) => handleInputChange('employees', e?.target?.value)}
                />
                <Input
                  label="Average Hourly Rate ($)"
                  type="number"
                  placeholder="e.g., 35"
                  value={formData?.avgHourlyRate}
                  onChange={(e) => handleInputChange('avgHourlyRate', e?.target?.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Manual Hours per Employee/Week"
                  type="number"
                  placeholder="e.g., 10"
                  value={formData?.manualHoursPerWeek}
                  onChange={(e) => handleInputChange('manualHoursPerWeek', e?.target?.value)}
                />
                <Input
                  label="Processes per Month"
                  type="number"
                  placeholder="e.g., 500"
                  value={formData?.processVolume}
                  onChange={(e) => handleInputChange('processVolume', e?.target?.value)}
                />
              </div>

              <Select
                label="Industry"
                options={industryOptions}
                value={formData?.industry}
                onChange={(value) => handleInputChange('industry', value)}
                placeholder="Select your industry"
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Current Error Rate: {formData?.errorRate}%
                </label>
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={formData?.errorRate}
                  onChange={(e) => handleInputChange('errorRate', e?.target?.value)}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>5% (Excellent)</span>
                  <span>15% (Average)</span>
                  <span>30% (High)</span>
                </div>
              </div>

              <Button
                variant="default"
                size="lg"
                fullWidth
                onClick={calculateROI}
                loading={isCalculating}
                disabled={!formData?.employees || !formData?.avgHourlyRate || !formData?.manualHoursPerWeek || !formData?.industry}
                className="cta-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                iconName="Zap"
                iconPosition="left"
                iconSize={20}
              >
                {isCalculating ? 'Calculating ROI...' : 'Calculate My ROI'}
              </Button>
            </div>
          </div>

          {/* Results Display */}
          <div className="space-y-6">
            {results ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Key Metrics */}
                <div className="glass-card p-6 rounded-lg">
                  <h4 className="text-xl font-bold text-foreground mb-4 flex items-center">
                    <Icon name="TrendingUp" size={20} className="mr-2 text-success" />
                    Your ROI Summary
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
                      <div className="text-2xl font-bold text-success mb-1">
                        {formatNumber(results?.roi?.percentage)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Annual ROI</div>
                    </div>
                    <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {Math.round(results?.roi?.paybackMonths)}
                      </div>
                      <div className="text-sm text-muted-foreground">Months to Payback</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Annual Savings:</span>
                      <span className="font-bold text-success text-lg">
                        {formatCurrency(results?.savings?.total)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Investment Cost:</span>
                      <span className="font-bold text-foreground">
                        {formatCurrency(results?.investment?.total)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-border/20">
                      <span className="text-foreground font-medium">Net Annual Benefit:</span>
                      <span className="font-bold text-primary text-xl">
                        {formatCurrency(results?.roi?.netSavings)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="glass-card p-6 rounded-lg">
                  <h4 className="text-lg font-bold text-foreground mb-4 flex items-center">
                    <Icon name="BarChart" size={18} className="mr-2 text-primary" />
                    Savings Breakdown
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Icon name="Clock" size={16} className="mr-2 text-success" />
                        <span className="text-sm text-muted-foreground">Labor Cost Savings</span>
                      </div>
                      <span className="font-semibold text-success">
                        {formatCurrency(results?.savings?.laborSavings)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Icon name="Shield" size={16} className="mr-2 text-success" />
                        <span className="text-sm text-muted-foreground">Error Reduction Savings</span>
                      </div>
                      <span className="font-semibold text-success">
                        {formatCurrency(results?.savings?.errorSavings)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Icon name="Zap" size={16} className="mr-2 text-success" />
                        <span className="text-sm text-muted-foreground">Productivity Gains</span>
                      </div>
                      <span className="font-semibold text-success">
                        {formatCurrency(results?.savings?.productivityGains)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Implementation Metrics */}
                <div className="glass-card p-6 rounded-lg">
                  <h4 className="text-lg font-bold text-foreground mb-4 flex items-center">
                    <Icon name="Target" size={18} className="mr-2 text-accent" />
                    Implementation Impact
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-accent mb-1">
                        {formatNumber(results?.metrics?.timeSaved)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Time Reduction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-accent mb-1">
                        {formatNumber(results?.metrics?.hoursPerWeek)}
                      </div>
                      <div className="text-xs text-muted-foreground">Hours Saved/Week</div>
                    </div>
                  </div>
                </div>

                {/* 3-Year Projection */}
                <div className="glass-card p-6 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                  <h4 className="text-lg font-bold text-foreground mb-2 flex items-center">
                    <Icon name="Calendar" size={18} className="mr-2 text-primary" />
                    3-Year Value Projection
                  </h4>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {formatCurrency(results?.roi?.threeYearValue)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total value over 3 years after initial investment
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Button
                    variant="default"
                    size="lg"
                    fullWidth
                    onClick={handleDemoWithData}
                    className="cta-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    iconName="Calendar"
                    iconPosition="left"
                    iconSize={20}
                  >
                    Book Demo with These Projections
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    fullWidth
                    onClick={() => {
                      const element = document.getElementById('pricing');
                      if (element) {
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="border-primary text-primary hover:bg-primary/10"
                    iconName="DollarSign"
                    iconPosition="left"
                    iconSize={16}
                  >
                    View Pricing Plans
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="glass-card p-12 rounded-lg text-center">
                <Icon name="Calculator" size={64} className="text-muted-foreground/30 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-foreground mb-2">
                  Ready to Calculate?
                </h4>
                <p className="text-muted-foreground">
                  Fill in your company details on the left to see your personalized ROI projection. 
                  Get instant insights into potential savings and implementation timeline.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Industry Benchmarks */}
        <div className="mt-16 glass-card p-8 rounded-lg">
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">
            Industry Benchmarks
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">Manufacturing</div>
              <div className="text-sm text-muted-foreground mb-1">Avg. Time Savings</div>
              <div className="text-lg font-semibold text-success">85%</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">Healthcare</div>
              <div className="text-sm text-muted-foreground mb-1">Avg. Time Savings</div>
              <div className="text-lg font-semibold text-success">78%</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">Finance</div>
              <div className="text-sm text-muted-foreground mb-1">Avg. Time Savings</div>
              <div className="text-lg font-semibold text-success">92%</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">Retail</div>
              <div className="text-sm text-muted-foreground mb-1">Avg. Time Savings</div>
              <div className="text-lg font-semibold text-success">88%</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">Logistics</div>
              <div className="text-sm text-muted-foreground mb-1">Avg. Time Savings</div>
              <div className="text-lg font-semibold text-success">91%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculatorSection;