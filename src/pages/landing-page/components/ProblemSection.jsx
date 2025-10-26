import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from 'components/ui/Button';
import Select from 'components/ui/Select';
import Icon from 'components/AppIcon';

const ProblemSection = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('manufacturing');
  const [activeView, setActiveView] = useState('before');

  const industryOptions = [
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Financial Services' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'logistics', label: 'Logistics & Supply Chain' },
    { value: 'technology', label: 'Technology' }
  ];

  const industryData = {
    manufacturing: {
      manualProcess: {
        title: "Manual Quality Control Process",
        steps: [
          { icon: "FileText", text: "Paper-based inspection forms", time: "45 min", errors: "High" },
          { icon: "Eye", text: "Manual visual inspection", time: "2 hours", errors: "Medium" },
          { icon: "Calculator", text: "Manual data entry & calculations", time: "30 min", errors: "High" },
          { icon: "Mail", text: "Email reports to stakeholders", time: "15 min", errors: "Low" },
          { icon: "Archive", text: "Physical file storage", time: "10 min", errors: "Medium" }
        ],
        totalTime: "3.5 hours",
        errorRate: "23%",
        cost: "$280 per batch"
      },
      automatedProcess: {
        title: "AI-Powered Quality Control",
        steps: [
          { icon: "Smartphone", text: "Digital inspection via mobile app", time: "5 min", errors: "None" },
          { icon: "Camera", text: "AI visual defect detection", time: "2 min", errors: "None" },
          { icon: "Zap", text: "Automated calculations & analysis", time: "1 min", errors: "None" },
          { icon: "Send", text: "Instant stakeholder notifications", time: "Auto", errors: "None" },
          { icon: "Cloud", text: "Cloud-based data storage", time: "Auto", errors: "None" }
        ],
        totalTime: "8 minutes",
        errorRate: "0.1%",
        cost: "$12 per batch"
      },
      savings: {
        time: "96%",
        errors: "99.6%",
        cost: "95.7%"
      }
    },
    healthcare: {
      manualProcess: {
        title: "Patient Intake & Documentation",
        steps: [
          { icon: "Clipboard", text: "Paper form completion", time: "20 min", errors: "High" },
          { icon: "Phone", text: "Insurance verification calls", time: "15 min", errors: "Medium" },
          { icon: "FileText", text: "Manual chart updates", time: "10 min", errors: "High" },
          { icon: "Calendar", text: "Manual appointment scheduling", time: "8 min", errors: "Medium" },
          { icon: "Printer", text: "Document printing & filing", time: "5 min", errors: "Low" }
        ],
        totalTime: "58 minutes",
        errorRate: "18%",
        cost: "$95 per patient"
      },
      automatedProcess: {
        title: "AI-Streamlined Patient Flow",
        steps: [
          { icon: "Tablet", text: "Digital intake forms", time: "8 min", errors: "None" },
          { icon: "Zap", text: "Automated insurance verification", time: "30 sec", errors: "None" },
          { icon: "Database", text: "Auto-populated EHR updates", time: "Auto", errors: "None" },
          { icon: "Calendar", text: "Smart scheduling optimization", time: "1 min", errors: "None" },
          { icon: "Cloud", text: "Digital document management", time: "Auto", errors: "None" }
        ],
        totalTime: "9.5 minutes",
        errorRate: "0.2%",
        cost: "$8 per patient"
      },
      savings: {
        time: "83.6%",
        errors: "98.9%",
        cost: "91.6%"
      }
    },
    finance: {
      manualProcess: {
        title: "Invoice Processing & Approval",
        steps: [
          { icon: "Mail", text: "Email/paper invoice receipt", time: "5 min", errors: "Low" },
          { icon: "Search", text: "Manual data extraction", time: "15 min", errors: "High" },
          { icon: "CheckCircle", text: "Manual approval routing", time: "2 days", errors: "Medium" },
          { icon: "Calculator", text: "Manual payment calculations", time: "10 min", errors: "High" },
          { icon: "CreditCard", text: "Manual payment processing", time: "20 min", errors: "Medium" }
        ],
        totalTime: "2.8 days",
        errorRate: "15%",
        cost: "$45 per invoice"
      },
      automatedProcess: {
        title: "AI Invoice Automation",
        steps: [
          { icon: "Scan", text: "OCR invoice capture", time: "10 sec", errors: "None" },
          { icon: "Brain", text: "AI data extraction", time: "5 sec", errors: "None" },
          { icon: "Workflow", text: "Automated approval workflow", time: "2 hours", errors: "None" },
          { icon: "Zap", text: "Auto payment calculations", time: "1 sec", errors: "None" },
          { icon: "Send", text: "Automated payment execution", time: "30 sec", errors: "None" }
        ],
        totalTime: "2.1 hours",
        errorRate: "0.05%",
        cost: "$2.50 per invoice"
      },
      savings: {
        time: "96.9%",
        errors: "99.7%",
        cost: "94.4%"
      }
    },
    retail: {
      manualProcess: {
        title: "Inventory Management Process",
        steps: [
          { icon: "Clipboard", text: "Manual stock counting", time: "4 hours", errors: "High" },
          { icon: "FileText", text: "Spreadsheet data entry", time: "1 hour", errors: "High" },
          { icon: "Calculator", text: "Manual reorder calculations", time: "30 min", errors: "Medium" },
          { icon: "Phone", text: "Supplier communication", time: "45 min", errors: "Low" },
          { icon: "Truck", text: "Manual order tracking", time: "20 min", errors: "Medium" }
        ],
        totalTime: "6.6 hours",
        errorRate: "22%",
        cost: "$165 per cycle"
      },
      automatedProcess: {
        title: "AI Inventory Optimization",
        steps: [
          { icon: "Scan", text: "Barcode/RFID scanning", time: "15 min", errors: "None" },
          { icon: "Database", text: "Real-time system updates", time: "Auto", errors: "None" },
          { icon: "Brain", text: "AI demand forecasting", time: "1 min", errors: "None" },
          { icon: "Zap", text: "Automated supplier orders", time: "Auto", errors: "None" },
          { icon: "Bell", text: "Real-time delivery tracking", time: "Auto", errors: "None" }
        ],
        totalTime: "16 minutes",
        errorRate: "0.3%",
        cost: "$8 per cycle"
      },
      savings: {
        time: "95.9%",
        errors: "98.6%",
        cost: "95.2%"
      }
    },
    logistics: {
      manualProcess: {
        title: "Shipment Tracking & Coordination",
        steps: [
          { icon: "Phone", text: "Manual carrier coordination", time: "30 min", errors: "Medium" },
          { icon: "FileText", text: "Paper-based documentation", time: "20 min", errors: "High" },
          { icon: "MapPin", text: "Manual route planning", time: "45 min", errors: "Medium" },
          { icon: "Clock", text: "Manual delivery scheduling", time: "25 min", errors: "High" },
          { icon: "Mail", text: "Customer update calls/emails", time: "15 min", errors: "Low" }
        ],
        totalTime: "2.25 hours",
        errorRate: "19%",
        cost: "$85 per shipment"
      },
      automatedProcess: {
        title: "AI Logistics Orchestration",
        steps: [
          { icon: "Zap", text: "Automated carrier selection", time: "30 sec", errors: "None" },
          { icon: "Scan", text: "Digital documentation", time: "1 min", errors: "None" },
          { icon: "Navigation", text: "AI route optimization", time: "10 sec", errors: "None" },
          { icon: "Calendar", text: "Smart delivery scheduling", time: "5 sec", errors: "None" },
          { icon: "Bell", text: "Automated customer updates", time: "Auto", errors: "None" }
        ],
        totalTime: "1.6 minutes",
        errorRate: "0.1%",
        cost: "$3.50 per shipment"
      },
      savings: {
        time: "98.8%",
        errors: "99.5%",
        cost: "95.9%"
      }
    },
    technology: {
      manualProcess: {
        title: "Software Deployment Process",
        steps: [
          { icon: "Code", text: "Manual code review", time: "2 hours", errors: "Medium" },
          { icon: "TestTube", text: "Manual testing procedures", time: "4 hours", errors: "High" },
          { icon: "Settings", text: "Manual environment setup", time: "1 hour", errors: "High" },
          { icon: "Upload", text: "Manual deployment steps", time: "45 min", errors: "Medium" },
          { icon: "Monitor", text: "Manual monitoring setup", time: "30 min", errors: "Low" }
        ],
        totalTime: "8.25 hours",
        errorRate: "16%",
        cost: "$495 per deployment"
      },
      automatedProcess: {
        title: "AI-Powered DevOps Pipeline",
        steps: [
          { icon: "GitBranch", text: "Automated code analysis", time: "5 min", errors: "None" },
          { icon: "Zap", text: "Automated testing suite", time: "15 min", errors: "None" },
          { icon: "Server", text: "Auto environment provisioning", time: "3 min", errors: "None" },
          { icon: "Rocket", text: "One-click deployment", time: "2 min", errors: "None" },
          { icon: "Activity", text: "Automated monitoring", time: "Auto", errors: "None" }
        ],
        totalTime: "25 minutes",
        errorRate: "0.2%",
        cost: "$15 per deployment"
      },
      savings: {
        time: "95.0%",
        errors: "98.8%",
        cost: "97.0%"
      }
    }
  };

  const currentData = industryData?.[selectedIndustry];
  const currentProcess = activeView === 'before' ? currentData?.manualProcess : currentData?.automatedProcess;

  const painPoints = [
    {
      icon: "Clock",
      title: "Time Drain",
      stat: "40+ hours weekly",
      description: "Lost to repetitive manual tasks that could be automated"
    },
    {
      icon: "AlertTriangle",
      title: "Human Errors",
      stat: "23% error rate",
      description: "Costly mistakes in data entry and process execution"
    },
    {
      icon: "TrendingDown",
      title: "Scaling Limits",
      stat: "300% slower growth",
      description: "Manual processes become bottlenecks as you expand"
    },
    {
      icon: "DollarSign",
      title: "Hidden Costs",
      stat: "$2.3M annually",
      description: "Average cost of manual process inefficiencies per company"
    }
  ];

  return (
    <section id="problem" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            The Hidden Cost of <span className="gradient-text">Manual Work</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every manual process in your business is costing you time, money, and competitive advantage. 
            See the real impact on your industry.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {painPoints?.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-error/20 to-warning/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name={point?.icon} size={24} className="text-error" />
              </div>
              <div className="text-2xl font-bold text-error mb-2">{point?.stat}</div>
              <h3 className="font-semibold text-foreground mb-2">{point?.title}</h3>
              <p className="text-sm text-muted-foreground">{point?.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Before/After Comparison */}
        <div className="glass-card p-8 rounded-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              See Your Industry Transformation
            </h3>
            <div className="max-w-md mx-auto">
              <Select
                label="Select Your Industry"
                options={industryOptions}
                value={selectedIndustry}
                onChange={setSelectedIndustry}
              />
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-muted/20 p-1 rounded-lg flex">
              <button
                onClick={() => setActiveView('before')}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeView === 'before'
                    ? 'bg-error text-error-foreground shadow-md' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Before: Manual Process
              </button>
              <button
                onClick={() => setActiveView('after')}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeView === 'after' ?'bg-success text-success-foreground shadow-md' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                After: AI Automation
              </button>
            </div>
          </div>

          {/* Process Visualization */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, x: activeView === 'before' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeView === 'before' ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h4 className="text-xl font-bold text-foreground text-center mb-6">
                {currentProcess?.title}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {currentProcess?.steps?.map((step, index) => (
                  <div key={index} className="relative">
                    <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      activeView === 'before'
                        ? 'border-error/20 bg-error/5 hover:border-error/40' :'border-success/20 bg-success/5 hover:border-success/40'
                    }`}>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 ${
                        activeView === 'before'
                          ? 'bg-error/20 text-error' :'bg-success/20 text-success'
                      }`}>
                        <Icon name={step?.icon} size={20} />
                      </div>
                      <p className="text-sm font-medium text-foreground text-center mb-2">
                        {step?.text}
                      </p>
                      <div className="text-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          activeView === 'before'
                            ? 'bg-error/20 text-error' :'bg-success/20 text-success'
                        }`}>
                          {step?.time}
                        </span>
                      </div>
                      {activeView === 'before' && step?.errors !== 'None' && (
                        <div className="text-center mt-1">
                          <span className="text-xs text-warning">
                            {step?.errors} Error Risk
                          </span>
                        </div>
                      )}
                    </div>
                    {index < currentProcess?.steps?.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                        <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Results Summary */}
              <div className={`p-6 rounded-lg ${
                activeView === 'before'
                  ? 'bg-error/10 border border-error/20' :'bg-success/10 border border-success/20'
              }`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className={`text-2xl font-bold mb-1 ${
                      activeView === 'before' ? 'text-error' : 'text-success'
                    }`}>
                      {currentProcess?.totalTime}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Time</div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold mb-1 ${
                      activeView === 'before' ? 'text-error' : 'text-success'
                    }`}>
                      {currentProcess?.errorRate}
                    </div>
                    <div className="text-sm text-muted-foreground">Error Rate</div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold mb-1 ${
                      activeView === 'before' ? 'text-error' : 'text-success'
                    }`}>
                      {currentProcess?.cost}
                    </div>
                    <div className="text-sm text-muted-foreground">Cost Per Process</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Savings Summary */}
          {activeView === 'after' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 p-6 bg-gradient-to-r from-success/10 to-primary/10 rounded-lg border border-success/20"
            >
              <h4 className="text-lg font-bold text-foreground text-center mb-4">
                Your Potential Savings
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-success mb-1">
                    {currentData?.savings?.time}
                  </div>
                  <div className="text-sm text-muted-foreground">Time Reduction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-success mb-1">
                    {currentData?.savings?.errors}
                  </div>
                  <div className="text-sm text-muted-foreground">Error Reduction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-success mb-1">
                    {currentData?.savings?.cost}
                  </div>
                  <div className="text-sm text-muted-foreground">Cost Savings</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CTA */}
          <div className="text-center mt-8">
            <Button
              variant="default"
              size="lg"
              onClick={() => {
                const event = new CustomEvent('openDemoModal');
                window.dispatchEvent(event);
              }}
              className="cta-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              iconName="Zap"
              iconPosition="left"
              iconSize={20}
            >
              Transform My {industryOptions?.find(opt => opt?.value === selectedIndustry)?.label} Business
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;