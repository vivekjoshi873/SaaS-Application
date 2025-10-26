import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const BenefitsSection = () => {
  const [selectedBenefit, setSelectedBenefit] = useState(0);

  const benefits = [
    {
      icon: "Clock",
      title: "Time Savings",
      stat: "73%",
      subtitle: "Average Time Reduction",
      description: "Eliminate repetitive manual tasks and focus on strategic work that drives growth.",
      caseStudy: {
        company: "TechFlow Manufacturing",
        industry: "Manufacturing",
        challenge: "Quality control processes taking 4+ hours per batch with high error rates",
        solution: "AI-powered visual inspection and automated reporting system",
        results: [
          "Reduced inspection time from 4 hours to 15 minutes",
          "Eliminated 95% of manual data entry",
          "Increased throughput by 300%",
          "Saved $2.3M annually in labor costs"
        ],
        testimonial: "AI AutoFlow transformed our quality control process. We now catch defects faster and more accurately than ever before.",
        person: "Sarah Chen, Operations Director"
      },
      metrics: [
        { label: "Hours Saved Weekly", value: "40+", icon: "Clock" },
        { label: "Process Speed Increase", value: "300%", icon: "Zap" },
        { label: "Employee Satisfaction", value: "+85%", icon: "Heart" }
      ]
    },
    {
      icon: "Shield",
      title: "Error Elimination",
      stat: "89%",
      subtitle: "Error Reduction Rate",
      description: "AI-powered validation and automated checks eliminate costly human errors.",
      caseStudy: {
        company: "FinanceFlow Corp",
        industry: "Financial Services",
        challenge: "Invoice processing errors costing $500K annually in corrections and delays",
        solution: "OCR data extraction with AI validation and automated approval workflows",
        results: [
          "Reduced data entry errors by 99.2%",
          "Eliminated duplicate payments completely",
          "Decreased processing time by 85%",
          "Saved $1.8M in error correction costs"
        ],
        testimonial: "The accuracy improvement has been phenomenal. We\'ve virtually eliminated processing errors.",
        person: "Michael Rodriguez, CFO"
      },
      metrics: [
        { label: "Error Reduction", value: "99.2%", icon: "Shield" },
        { label: "Compliance Score", value: "100%", icon: "CheckCircle" },
        { label: "Audit Findings", value: "-92%", icon: "FileCheck" }
      ]
    },
    {
      icon: "TrendingUp",
      title: "Productivity Gains",
      stat: "300%",
      subtitle: "Output Increase",
      description: "Scale operations without proportional increases in headcount or resources.",
      caseStudy: {
        company: "HealthStream Clinics",
        industry: "Healthcare",
        challenge: "Patient intake bottlenecks causing 45-minute wait times and staff burnout",
        solution: "Digital intake forms with automated insurance verification and EHR integration",
        results: [
          "Reduced patient wait times to under 10 minutes",
          "Increased patient throughput by 250%",
          "Improved staff satisfaction by 78%",
          "Generated $1.2M additional revenue annually"
        ],
        testimonial: "Our staff can now focus on patient care instead of paperwork. It\'s been transformational.",
        person: "Dr. Amanda Foster, Medical Director"
      },
      metrics: [
        { label: "Output Increase", value: "250%", icon: "TrendingUp" },
        { label: "Resource Efficiency", value: "+180%", icon: "Target" },
        { label: "Capacity Utilization", value: "95%", icon: "BarChart" }
      ]
    },
    {
      icon: "DollarSign",
      title: "Cost Reduction",
      stat: "$2.3M",
      subtitle: "Average Annual Savings",
      description: "Reduce operational costs through intelligent automation and resource optimization.",
      caseStudy: {
        company: "LogiFlow Distribution",
        industry: "Logistics",
        challenge: "Manual route planning and coordination costing $3M annually in inefficiencies",
        solution: "AI route optimization with real-time tracking and automated customer communications",
        results: [
          "Reduced fuel costs by 35%",
          "Decreased delivery times by 40%",
          "Eliminated overtime costs by 60%",
          "Saved $2.7M in operational expenses"
        ],
        testimonial: "The ROI was immediate. We\'re now operating at peak efficiency with half the manual effort.",
        person: "James Wilson, Logistics Manager"
      },
      metrics: [
        { label: "Cost Reduction", value: "65%", icon: "DollarSign" },
        { label: "ROI Timeline", value: "3 months", icon: "Calendar" },
        { label: "Operational Savings", value: "$2.7M", icon: "PiggyBank" }
      ]
    },
    {
      icon: "Rocket",
      title: "Scalability",
      stat: "10x",
      subtitle: "Growth Capacity",
      description: "Handle exponential growth without linear increases in operational complexity.",
      caseStudy: {
        company: "RetailMax E-commerce",
        industry: "Retail",
        challenge: "Manual inventory management limiting growth to 1000 orders/day maximum",
        solution: "Automated inventory tracking with AI demand forecasting and supplier integration",
        results: [
          "Scaled to 15,000+ orders daily",
          "Reduced stockouts by 85%",
          "Decreased inventory costs by 40%",
          "Enabled 500% revenue growth"
        ],
        testimonial: "We couldn\'t have scaled this fast without automation. It\'s been our growth enabler.",
        person: "Lisa Park, CEO"
      },
      metrics: [
        { label: "Scale Capacity", value: "15x", icon: "Rocket" },
        { label: "Growth Rate", value: "500%", icon: "TrendingUp" },
        { label: "Efficiency Gain", value: "850%", icon: "Zap" }
      ]
    },
    {
      icon: "Users",
      title: "Employee Satisfaction",
      stat: "+85%",
      subtitle: "Satisfaction Increase",
      description: "Free your team from mundane tasks to focus on meaningful, strategic work.",
      caseStudy: {
        company: "EduTech Solutions",
        industry: "Education",
        challenge: "Teachers spending 60% of time on administrative tasks instead of teaching",
        solution: "Automated grading, attendance tracking, and parent communication systems",
        results: [
          "Reduced admin time by 80%",
          "Increased teaching time by 45%",
          "Improved student engagement by 65%",
          "Boosted teacher satisfaction by 90%"
        ],
        testimonial: "I can finally focus on what I love - teaching. The automation handles all the tedious paperwork.",
        person: "Maria Garcia, High School Teacher"
      },
      metrics: [
        { label: "Job Satisfaction", value: "+90%", icon: "Heart" },
        { label: "Retention Rate", value: "+75%", icon: "Users" },
        { label: "Engagement Score", value: "9.2/10", icon: "Star" }
      ]
    }
  ];

  const currentBenefit = benefits?.[selectedBenefit];

  return (
    <section id="benefits" className="py-20 bg-gradient-to-br from-muted/5 via-background to-muted/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Measurable <span className="gradient-text">Business Impact</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See the quantified results our customers achieve. Real metrics from real businesses 
            that transformed their operations with AI automation.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits?.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedBenefit(index)}
              className={`glass-card p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedBenefit === index 
                  ? 'border-primary/40 bg-primary/5 shadow-glow' 
                  : 'hover:border-primary/20'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                selectedBenefit === index 
                  ? 'bg-primary/20 text-primary' :'bg-muted/20 text-muted-foreground'
              }`}>
                <Icon name={benefit?.icon} size={24} />
              </div>
              
              <div className={`text-3xl font-bold mb-2 ${
                selectedBenefit === index ? 'text-primary' : 'text-foreground'
              }`}>
                {benefit?.stat}
              </div>
              
              <h3 className="font-semibold text-foreground mb-2">
                {benefit?.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-3">
                {benefit?.subtitle}
              </p>
              
              <p className="text-sm text-muted-foreground">
                {benefit?.description}
              </p>

              {selectedBenefit === index && (
                <div className="mt-4 pt-4 border-t border-border/20">
                  <div className="flex items-center text-primary text-sm font-medium">
                    <Icon name="ArrowRight" size={16} className="mr-2" />
                    View Case Study
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Detailed Case Study */}
        <motion.div
          key={selectedBenefit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8 rounded-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Case Study Details */}
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mr-3">
                  <Icon name={currentBenefit?.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {currentBenefit?.caseStudy?.company}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {currentBenefit?.caseStudy?.industry}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="AlertCircle" size={16} className="mr-2 text-warning" />
                    Challenge
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {currentBenefit?.caseStudy?.challenge}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="Lightbulb" size={16} className="mr-2 text-primary" />
                    Solution
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {currentBenefit?.caseStudy?.solution}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center">
                    <Icon name="Target" size={16} className="mr-2 text-success" />
                    Results
                  </h4>
                  <ul className="space-y-2">
                    {currentBenefit?.caseStudy?.results?.map((result, index) => (
                      <li key={index} className="flex items-start text-sm text-muted-foreground">
                        <Icon name="Check" size={16} className="mr-2 text-success mt-0.5 flex-shrink-0" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Testimonial */}
              <div className="mt-6 p-4 bg-muted/10 rounded-lg border-l-4 border-primary">
                <p className="text-muted-foreground italic mb-2">
                  "{currentBenefit?.caseStudy?.testimonial}"
                </p>
                <p className="text-sm font-medium text-foreground">
                  — {currentBenefit?.caseStudy?.person}
                </p>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center">
                <Icon name="BarChart" size={20} className="mr-2 text-primary" />
                Key Metrics
              </h4>
              
              <div className="space-y-4">
                {currentBenefit?.metrics?.map((metric, index) => (
                  <div key={index} className="p-4 bg-card/50 rounded-lg border border-border/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Icon name={metric?.icon} size={16} className="mr-2 text-primary" />
                        <span className="text-sm text-muted-foreground">{metric?.label}</span>
                      </div>
                      <span className="text-lg font-bold text-primary">{metric?.value}</span>
                    </div>
                    <div className="w-full bg-muted/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                        style={{ width: '85%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* ROI Calculator Preview */}
              <div className="mt-6 p-4 bg-gradient-to-r from-success/10 to-primary/10 rounded-lg border border-success/20">
                <h5 className="font-semibold text-foreground mb-2 flex items-center">
                  <Icon name="Calculator" size={16} className="mr-2 text-success" />
                  ROI Projection
                </h5>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-success">
                      {currentBenefit?.stat}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {currentBenefit?.subtitle}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      3-6 months
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Payback Period
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Overall Impact Summary */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-6 glass-card rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-sm text-muted-foreground">Companies Transformed</div>
          </div>
          <div className="text-center p-6 glass-card rounded-lg">
            <div className="text-3xl font-bold text-success mb-2">$2.3B+</div>
            <div className="text-sm text-muted-foreground">Total Savings Generated</div>
          </div>
          <div className="text-center p-6 glass-card rounded-lg">
            <div className="text-3xl font-bold text-accent mb-2">50M+</div>
            <div className="text-sm text-muted-foreground">Hours Saved Monthly</div>
          </div>
          <div className="text-center p-6 glass-card rounded-lg">
            <div className="text-3xl font-bold text-secondary mb-2">99.2%</div>
            <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;