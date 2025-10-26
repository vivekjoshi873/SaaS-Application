import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [isPlaying, setIsPlaying] = useState(false);

  const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Operations Director",
    company: "TechFlow Manufacturing",
    industry: "manufacturing",
    avatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10",
    avatarAlt: "Professional headshot of Asian woman with short black hair in navy blazer smiling at camera",
    linkedinVerified: true,
    testimonial: "AI AutoFlow transformed our quality control process completely. We went from 4-hour manual inspections to 15-minute automated checks. The ROI was immediate and the accuracy improvement has been phenomenal.",
    videoThumbnail: "https://images.unsplash.com/photo-1679454690793-83340db232db",
    videoThumbnailAlt: "Manufacturing facility showing automated quality control systems and digital inspection processes",
    metrics: {
      timeSaved: "96%",
      costReduction: "$2.3M annually",
      errorReduction: "95%",
      implementation: "3 weeks"
    },
    quote: "The accuracy improvement has been phenomenal. We now catch defects faster than ever before.",
    rating: 5,
    companySize: "1,200 employees",
    useCase: "Quality Control Automation"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "CFO",
    company: "FinanceFlow Corp",
    industry: "finance",
    avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f",
    avatarAlt: "Professional headshot of Hispanic man with short black hair in navy suit and tie",
    linkedinVerified: true,
    testimonial: "The invoice processing automation eliminated 99% of our data entry errors and reduced processing time by 85%. Our team can now focus on strategic financial analysis instead of manual data entry.",
    videoThumbnail: "https://images.unsplash.com/photo-1735469157670-1212e570eadc",
    videoThumbnailAlt: "Modern finance office with multiple monitors showing automated invoice processing and financial dashboards",
    metrics: {
      timeSaved: "85%",
      costReduction: "$1.8M annually",
      errorReduction: "99%",
      implementation: "2 weeks"
    },
    quote: "We\'ve virtually eliminated processing errors. The ROI was immediate and substantial.",
    rating: 5,
    companySize: "850 employees",
    useCase: "Invoice Processing Automation"
  },
  {
    id: 3,
    name: "Dr. Amanda Foster",
    title: "Medical Director",
    company: "HealthStream Clinics",
    industry: "healthcare",
    avatar: "https://images.unsplash.com/photo-1456553231995-8a30d04bfae5",
    avatarAlt: "Professional headshot of Caucasian woman doctor with blonde hair in white medical coat",
    linkedinVerified: true,
    testimonial: "Patient wait times dropped from 45 minutes to under 10 minutes. Our staff satisfaction increased by 78% because they can focus on patient care instead of paperwork. It\'s been transformational for our practice.",
    videoThumbnail: "https://images.unsplash.com/photo-1734787277873-b9b25ec2196d",
    videoThumbnailAlt: "Modern medical clinic reception area with digital check-in kiosks and automated patient management systems",
    metrics: {
      timeSaved: "78%",
      costReduction: "$1.2M annually",
      errorReduction: "89%",
      implementation: "1 week"
    },
    quote: "Our staff can now focus on what they love - patient care instead of paperwork.",
    rating: 5,
    companySize: "650 employees",
    useCase: "Patient Management Automation"
  },
  {
    id: 4,
    name: "James Wilson",
    title: "Logistics Manager",
    company: "LogiFlow Distribution",
    industry: "logistics",
    avatar: "https://images.unsplash.com/photo-1623184663110-89ba5b565eb6",
    avatarAlt: "Professional headshot of Caucasian man with brown hair in blue business shirt smiling",
    linkedinVerified: true,
    testimonial: "Route optimization and automated coordination saved us $2.7M in operational expenses. Delivery times improved by 40% and our customers love the real-time tracking. The ROI was immediate.",
    videoThumbnail: "https://images.unsplash.com/photo-1733809614889-9816936ea520",
    videoThumbnailAlt: "Large logistics warehouse with automated sorting systems and real-time tracking displays",
    metrics: {
      timeSaved: "91%",
      costReduction: "$2.7M annually",
      errorReduction: "94%",
      implementation: "4 weeks"
    },
    quote: "We\'re now operating at peak efficiency with half the manual effort.",
    rating: 5,
    companySize: "1,800 employees",
    useCase: "Supply Chain Automation"
  },
  {
    id: 5,
    name: "Lisa Park",
    title: "CEO",
    company: "RetailMax E-commerce",
    industry: "retail",
    avatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10",
    avatarAlt: "Professional headshot of Asian woman with long black hair in gray business blazer",
    linkedinVerified: true,
    testimonial: "We scaled from 1,000 to 15,000 daily orders without adding proportional staff. Inventory automation reduced stockouts by 85% and enabled 500% revenue growth. We couldn't have scaled this fast without automation.",
    videoThumbnail: "https://images.unsplash.com/photo-1701313056413-0915e1adf204",
    videoThumbnailAlt: "Modern e-commerce fulfillment center with automated inventory systems and robotic order processing",
    metrics: {
      timeSaved: "88%",
      costReduction: "$1.5M annually",
      errorReduction: "85%",
      implementation: "3 weeks"
    },
    quote: "Automation has been our growth enabler. We couldn\'t have scaled this fast without it.",
    rating: 5,
    companySize: "450 employees",
    useCase: "Inventory Management Automation"
  },
  {
    id: 6,
    name: "David Kumar",
    title: "CTO",
    company: "DevOps Pro",
    industry: "technology",
    avatar: "https://images.unsplash.com/photo-1667575949231-fbf430640797",
    avatarAlt: "Professional headshot of Indian man with black hair and beard in dark blue shirt",
    linkedinVerified: true,
    testimonial: "Our deployment pipeline went from 8 hours to 25 minutes. Zero-downtime deployments and automated testing eliminated 98% of production issues. The development team productivity increased by 300%.",
    videoThumbnail: "https://images.unsplash.com/photo-1662638600507-0846616ec508",
    videoThumbnailAlt: "Modern software development office with multiple screens showing automated DevOps pipelines and code deployment",
    metrics: {
      timeSaved: "89%",
      costReduction: "$520K annually",
      errorReduction: "98%",
      implementation: "2 weeks"
    },
    quote: "Development team productivity increased by 300%. It\'s been a game-changer.",
    rating: 5,
    companySize: "320 employees",
    useCase: "DevOps Pipeline Automation"
  }];


  const industries = [
  { id: 'all', label: 'All Industries', count: testimonials?.length },
  { id: 'manufacturing', label: 'Manufacturing', count: testimonials?.filter((t) => t?.industry === 'manufacturing')?.length },
  { id: 'finance', label: 'Financial Services', count: testimonials?.filter((t) => t?.industry === 'finance')?.length },
  { id: 'healthcare', label: 'Healthcare', count: testimonials?.filter((t) => t?.industry === 'healthcare')?.length },
  { id: 'logistics', label: 'Logistics', count: testimonials?.filter((t) => t?.industry === 'logistics')?.length },
  { id: 'retail', label: 'Retail', count: testimonials?.filter((t) => t?.industry === 'retail')?.length },
  { id: 'technology', label: 'Technology', count: testimonials?.filter((t) => t?.industry === 'technology')?.length }];


  const filteredTestimonials = selectedIndustry === 'all' ?
  testimonials :
  testimonials?.filter((t) => t?.industry === selectedIndustry);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) =>
      (prev + 1) % filteredTestimonials?.length
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [filteredTestimonials?.length]);

  const currentData = filteredTestimonials?.[currentTestimonial];

  const handleVideoPlay = () => {
    setIsPlaying(true);   
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % filteredTestimonials?.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
    prev === 0 ? filteredTestimonials?.length - 1 : prev - 1
    );
  };

  return (
    <section id="customers" className="py-20 bg-gradient-to-br from-background via-muted/5 to-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how companies across industries are achieving measurable results with AI AutoFlow. 
            Real stories, verified metrics, and quantified business impact.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {industries?.map((industry) =>
          <button
            key={industry?.id}
            onClick={() => {
              setSelectedIndustry(industry?.id);
              setCurrentTestimonial(0);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
            selectedIndustry === industry?.id ?
            'bg-primary text-primary-foreground shadow-md' :
            'bg-muted/20 text-muted-foreground hover:bg-muted/40 hover:text-foreground'}`
            }>

              <span>{industry?.label}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
            selectedIndustry === industry?.id ?
            'bg-primary-foreground/20 text-primary-foreground' :
            'bg-muted text-muted-foreground'}`
            }>
                {industry?.count}
              </span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden glass-card">
              <Image
                src={currentData?.videoThumbnail}
                alt={currentData?.videoThumbnailAlt}
                className="w-full h-64 md:h-80 object-cover" />

              {!isPlaying &&
              <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm">
                  <button
                  onClick={handleVideoPlay}
                  className="w-20 h-20 bg-primary/90 hover:bg-primary rounded-full flex items-center justify-center shadow-glow transition-all duration-300 hover:scale-110">

                    <Icon name="Play" size={32} className="text-primary-foreground ml-1" />
                  </button>
                </div>
              }

              <div className="absolute top-4 left-4 glass-card px-3 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-foreground">
                    {currentData?.company}
                  </span>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 glass-card p-3 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-success">
                    {currentData?.metrics?.timeSaved}
                  </div>
                  <div className="text-xs text-muted-foreground">Time Saved</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 bg-muted/20 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors duration-200">

                <Icon name="ChevronLeft" size={20} className="text-muted-foreground hover:text-primary" />
              </button>
              
              <div className="flex space-x-2 items-center">
                {filteredTestimonials?.map((_, index) =>
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentTestimonial ? 'bg-primary w-6' : 'bg-muted-foreground/30'}`
                  } />

                )}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 bg-muted/20 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors duration-200">

                <Icon name="ChevronRight" size={20} className="text-muted-foreground hover:text-primary" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6">

              <div className="relative">
                <Icon name="Quote" size={48} className="text-primary/20 absolute -top-4 -left-2" />
                <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed pl-8">
                  {currentData?.testimonial}
                </blockquote>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Image
                    src={currentData?.avatar}
                    alt={currentData?.avatarAlt}
                    className="w-16 h-16 rounded-full object-cover" />

                  {currentData?.linkedinVerified &&
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} className="text-white" />
                    </div>
                  }
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {currentData?.name}
                  </div>
                  <div className="text-muted-foreground">
                    {currentData?.title}
                  </div>
                  <div className="text-sm text-primary">
                    {currentData?.company}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)]?.map((_, i) =>
                  <Icon
                    key={i}
                    name="Star"
                    size={20}
                    className="text-warning fill-current" />

                  )}
                </div>
                <span className="text-muted-foreground">5.0 / 5.0</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                  <div className="text-2xl font-bold text-success mb-1">
                    {currentData?.metrics?.timeSaved}
                  </div>
                  <div className="text-sm text-muted-foreground">Time Reduction</div>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="text-lg font-bold text-primary mb-1">
                    {currentData?.metrics?.costReduction}
                  </div>
                  <div className="text-sm text-muted-foreground">Annual Savings</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  <Icon name="Users" size={16} className="inline mr-1" />
                  {currentData?.companySize}
                </span>
                <span>
                  <Icon name="Zap" size={16} className="inline mr-1" />
                  {currentData?.useCase}
                </span>
              </div>

              <div className="pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    const event = new CustomEvent('openDemoModal');
                    window.dispatchEvent(event);
                  }}
                  className="border-primary text-primary hover:bg-primary/10"
                  iconName="Calendar"
                  iconPosition="left"
                  iconSize={16}>

                  See Similar Results for Your Business
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 glass-card rounded-lg">
            <div className="text-3xl font-bold text-success mb-2">99.2%</div>
            <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
          </div>
          <div className="text-center p-6 glass-card rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">$2.3B+</div>
            <div className="text-sm text-muted-foreground">Total Savings Generated</div>
          </div>
          <div className="text-center p-6 glass-card rounded-lg">
            <div className="text-3xl font-bold text-accent mb-2">85%</div>
            <div className="text-sm text-muted-foreground">Average Time Reduction</div>
          </div>
          <div className="text-center p-6 glass-card rounded-lg">
            <div className="text-3xl font-bold text-secondary mb-2">3 weeks</div>
            <div className="text-sm text-muted-foreground">Average Implementation</div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-bold text-foreground mb-6">
            Trusted & Compliant
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={24} className="text-success" />
              <span className="text-sm font-medium text-muted-foreground">SOC 2 Type II</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={24} className="text-success" />
              <span className="text-sm font-medium text-muted-foreground">GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={24} className="text-success" />
              <span className="text-sm font-medium text-muted-foreground">ISO 27001</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={24} className="text-success" />
              <span className="text-sm font-medium text-muted-foreground">HIPAA Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;