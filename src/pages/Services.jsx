import React from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Header from 'components/ui/Header';

const Services = () => {
  const services = [
    {
      id: 'automation',
      title: 'Process Automation',
      description: 'Streamline your business processes with intelligent automation solutions that reduce manual work and increase efficiency.',
      icon: 'Zap',
      features: ['Workflow Design', 'API Integration', 'Data Processing', 'Error Handling'],
      pricing: 'Starting at $2,999/month'
    },
    {
      id: 'ai-integration',
      title: 'AI Integration',
      description: 'Leverage artificial intelligence to enhance your business operations with smart decision-making and predictive analytics.',
      icon: 'Brain',
      features: ['Machine Learning', 'Predictive Analytics', 'Natural Language Processing', 'Computer Vision'],
      pricing: 'Starting at $4,999/month'
    },
    {
      id: 'data-analytics',
      title: 'Data Analytics',
      description: 'Transform your data into actionable insights with advanced analytics and real-time reporting dashboards.',
      icon: 'BarChart',
      features: ['Real-time Dashboards', 'Custom Reports', 'Data Visualization', 'Performance Metrics'],
      pricing: 'Starting at $1,999/month'
    },
    {
      id: 'cloud-migration',
      title: 'Cloud Migration',
      description: 'Seamlessly migrate your infrastructure to the cloud with minimal downtime and maximum security.',
      icon: 'Cloud',
      features: ['Infrastructure Setup', 'Data Migration', 'Security Implementation', 'Performance Optimization'],
      pricing: 'Starting at $3,999/month'
    },
    {
      id: 'custom-development',
      title: 'Custom Development',
      description: 'Build tailored solutions that perfectly fit your business needs with our expert development team.',
      icon: 'Code',
      features: ['Custom Applications', 'API Development', 'Database Design', 'UI/UX Design'],
      pricing: 'Starting at $5,999/month'
    },
    {
      id: 'consulting',
      title: 'Strategic Consulting',
      description: 'Get expert guidance on digital transformation and technology strategy to drive your business forward.',
      icon: 'Lightbulb',
      features: ['Technology Assessment', 'Digital Strategy', 'Implementation Planning', 'Training & Support'],
      pricing: 'Starting at $1,499/month'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-20 pb-16 bg-gradient-to-b from-background to-background/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Comprehensive technology solutions designed to transform your business operations and drive growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                className="cta-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                iconName="Calendar"
                iconPosition="left"
                iconSize={20}
              >
                Schedule Consultation
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                iconName="Download"
                iconPosition="left"
                iconSize={20}
              >
                Download Brochure
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="glass-card p-8 rounded-xl hover:shadow-hover transition-all duration-300 group"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon name={service.icon} size={24} color="white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-foreground mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-muted-foreground">
                      <Icon name="Check" size={16} className="text-success mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4 border-t border-border/20">
                <p className="text-sm font-medium text-primary mb-4">{service.pricing}</p>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
              
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how our services can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                className="cta-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                iconName="MessageSquare"
                iconPosition="left"
                iconSize={20}
              >
                Get Started Today
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-muted-foreground hover:text-foreground"
                iconName="Phone"
                iconPosition="left"
                iconSize={20}
              >
                Call Us Now
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Services;
