import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Header from 'components/ui/Header';

const Work = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects', icon: 'Grid3X3' },
    { id: 'automation', label: 'Automation', icon: 'Zap' },
    { id: 'ai', label: 'AI Solutions', icon: 'Brain' },
    { id: 'web', label: 'Web Development', icon: 'Globe' },
    { id: 'mobile', label: 'Mobile Apps', icon: 'Smartphone' },
    { id: 'data', label: 'Data Analytics', icon: 'BarChart' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Manufacturing Automation System',
      category: 'automation',
      description: 'Complete automation solution for a leading manufacturing company, reducing manual processes by 80% and increasing productivity by 150%.',
      image: '/api/placeholder/600/400',
      technologies: ['Python', 'React', 'PostgreSQL', 'Docker'],
      results: ['80% reduction in manual work', '150% productivity increase', '$2M annual savings'],
      client: 'Global Manufacturing Corp',
      duration: '6 months'
    },
    {
      id: 2,
      title: 'AI-Powered Customer Service',
      category: 'ai',
      description: 'Intelligent chatbot system with natural language processing that handles 90% of customer inquiries automatically.',
      image: '/api/placeholder/600/400',
      technologies: ['TensorFlow', 'Node.js', 'MongoDB', 'AWS'],
      results: ['90% automated responses', '60% faster resolution', '95% customer satisfaction'],
      client: 'Tech Solutions Inc',
      duration: '4 months'
    },
    {
      id: 3,
      title: 'E-commerce Platform',
      category: 'web',
      description: 'Modern, scalable e-commerce platform with advanced analytics and personalized shopping experiences.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'Redis'],
      results: ['300% increase in conversions', '50% faster page loads', '99.9% uptime'],
      client: 'Retail Innovations',
      duration: '8 months'
    },
    {
      id: 4,
      title: 'Healthcare Mobile App',
      category: 'mobile',
      description: 'Comprehensive healthcare management app with telemedicine features and patient data analytics.',
      image: '/api/placeholder/600/400',
      technologies: ['React Native', 'Firebase', 'Node.js', 'HIPAA Compliance'],
      results: ['40% reduction in appointment no-shows', '85% patient satisfaction', '50% faster diagnosis'],
      client: 'MedTech Solutions',
      duration: '10 months'
    },
    {
      id: 5,
      title: 'Financial Data Analytics Dashboard',
      category: 'data',
      description: 'Real-time financial analytics platform with predictive modeling and risk assessment capabilities.',
      image: '/api/placeholder/600/400',
      technologies: ['Python', 'D3.js', 'Apache Kafka', 'Machine Learning'],
      results: ['Real-time insights', '30% better risk prediction', '25% cost reduction'],
      client: 'Finance First Bank',
      duration: '5 months'
    },
    {
      id: 6,
      title: 'Supply Chain Optimization',
      category: 'automation',
      description: 'AI-driven supply chain management system that optimizes inventory and reduces operational costs.',
      image: '/api/placeholder/600/400',
      technologies: ['Python', 'React', 'PostgreSQL', 'Machine Learning'],
      results: ['35% inventory reduction', '45% cost savings', '99% on-time delivery'],
      client: 'Logistics Pro',
      duration: '7 months'
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

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
      {/* Header Section */}
      <div className="pt-20 pb-16 bg-gradient-to-b from-background to-background/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Work</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Explore our portfolio of successful projects and see how we've helped businesses transform their operations.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={category.icon} size={18} className="mr-2" />
              {category.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="glass-card rounded-xl overflow-hidden hover:shadow-hover transition-all duration-300 group"
              >
                <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon name="FolderOpen" size={32} color="white" strokeWidth={2} />
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                    <span className="text-sm text-muted-foreground">{project.duration}</span>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground mb-3">Key Results:</h4>
                    <ul className="space-y-2">
                      {project.results.map((result, index) => (
                        <li key={index} className="flex items-center text-sm text-muted-foreground">
                          <Icon name="Check" size={16} className="text-success mr-2" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-border/20 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Client:</p>
                      <p className="text-sm font-medium text-foreground">{project.client}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how we can help bring your vision to life.
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
                Start Your Project
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-muted-foreground hover:text-foreground"
                iconName="Download"
                iconPosition="left"
                iconSize={20}
              >
                Download Portfolio
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Work;
