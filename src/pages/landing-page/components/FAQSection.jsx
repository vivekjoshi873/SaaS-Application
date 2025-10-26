import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqCategories = [
  {
    title: "Implementation & Setup",
    faqs: [
    {
      question: "How long does implementation typically take?",
      answer: "Implementation time varies by company size and complexity. Small businesses (1-50 employees) typically see full deployment in 1-2 weeks, while enterprise implementations (1000+ employees) take 4-8 weeks. Our dedicated implementation team works with you to ensure minimal disruption to your current operations.",
      videoUrl: "https://images.unsplash.com/photo-1659353672237-91826f496791",
      videoAlt: "Screen recording showing step-by-step AI AutoFlow implementation process with timeline visualization"
    },
    {
      question: "Do I need technical expertise to set up workflows?",
      answer: "No technical expertise required. Our drag-and-drop workflow builder is designed for business users. We also provide pre-built templates for common processes, and our success team offers hands-on setup assistance. Most workflows can be created in under 30 minutes.",
      videoUrl: "https://images.unsplash.com/photo-1584365418730-c0fae60086f9",
      videoAlt: "User interface demonstration of drag-and-drop workflow builder with business user creating automation"
    },
    {
      question: "Can you integrate with our existing systems?",
      answer: "Yes, we integrate with 200+ business applications including Salesforce, SAP, QuickBooks, Microsoft 365, and more. Our API-first approach allows custom integrations for proprietary systems. We also offer professional services for complex integration requirements.",
      videoUrl: "https://images.unsplash.com/photo-1584931423312-5d53d862446a",
      videoAlt: "Integration dashboard showing connections to multiple business systems and real-time data synchronization"
    }]

  },
  {
    title: "Security & Compliance",
    faqs: [
    {
      question: "How secure is my data with AI AutoFlow?",
      answer: "We maintain enterprise-grade security with SOC 2 Type II certification, end-to-end encryption, and zero-trust architecture. Your data is encrypted at rest and in transit using AES-256 encryption. We undergo regular third-party security audits and maintain compliance with GDPR, HIPAA, and other regulations.",
      videoUrl: "https://images.unsplash.com/photo-1683200899447-d398198ed197",
      videoAlt: "Security dashboard showing encryption status, compliance certifications, and data protection measures"
    },
    {
      question: "Are you GDPR and HIPAA compliant?",
      answer: "Yes, we are fully compliant with GDPR, HIPAA, SOX, and other major regulations. We provide data processing agreements (DPAs), business associate agreements (BAAs), and detailed compliance documentation. Our platform includes built-in privacy controls and audit trails.",
      videoUrl: "https://images.unsplash.com/photo-1724833256463-26b199dc1b69",
      videoAlt: "Compliance dashboard displaying GDPR, HIPAA, and other regulatory compliance status and documentation"
    },
    {
      question: "Where is my data stored and who has access?",
      answer: "Data is stored in SOC 2 certified data centers with geographic redundancy. You control data residency and can choose specific regions. Access is strictly controlled with role-based permissions, multi-factor authentication, and detailed audit logs. Our staff follows strict data access protocols.",
      videoUrl: "https://images.unsplash.com/photo-1708794758085-b733c022008c",
      videoAlt: "Data center visualization showing geographic distribution, access controls, and security monitoring systems"
    }]

  },
  {
    title: "Pricing & Plans",
    faqs: [
    {
      question: "What\'s included in the free trial?",
      answer: "The 14-day free trial includes full access to Professional plan features: up to 25 workflows, 50 integrations, advanced analytics, and priority support. No credit card required, and you can cancel anytime. Trial data can be retained when you upgrade to a paid plan.",
      videoUrl: "https://images.unsplash.com/photo-1676573409967-986dcf64d35a",
      videoAlt: "Free trial dashboard showing available features, usage limits, and upgrade options with countdown timer"
    },
    {
      question: "Can I change or cancel my plan anytime?",
      answer: "Yes, you have complete flexibility. Upgrade or downgrade plans instantly with prorated billing. Cancel anytime with 30 days notice for annual plans, or immediately for monthly plans. We provide data export tools and migration assistance if needed.",
      videoUrl: "https://images.unsplash.com/photo-1676573409990-6abd66edab71",
      videoAlt: "Account management interface showing plan change options, billing details, and cancellation process"
    },
    {
      question: "Do you offer custom enterprise pricing?",
      answer: "Yes, we offer flexible enterprise pricing based on your specific needs, including volume discounts, custom SLAs, and dedicated resources. Enterprise plans include dedicated success managers, custom integrations, and priority development queue access.",
      videoUrl: "https://images.unsplash.com/photo-1642345999308-a9226c78b9ce",
      videoAlt: "Enterprise consultation meeting with pricing calculator and custom solution planning interface"
    }]

  },
  {
    title: "Support & Training",
    faqs: [
    {
      question: "What kind of support do you provide?",
      answer: "We offer 24/7 support via chat, email, and phone for all paid plans. Enterprise customers get dedicated success managers and priority support queues. Our support team includes automation experts who can help optimize your workflows and troubleshoot issues.",
      videoUrl: "https://images.unsplash.com/photo-1653763346066-80520cada604",
      videoAlt: "Support center interface showing multiple contact options, ticket tracking, and live chat with support agent"
    },
    {
      question: "Do you provide training for my team?",
      answer: "Yes, we provide comprehensive training including live onboarding sessions, video tutorials, documentation, and certification programs. Enterprise customers receive custom training sessions and ongoing education. We also offer train-the-trainer programs for larger organizations.",
      videoUrl: "https://images.unsplash.com/photo-1637829333986-84b0e498bd13",
      videoAlt: "Virtual training session showing instructor demonstrating AI AutoFlow features to multiple participants"
    },
    {
      question: "How do I get help if something goes wrong?",
      answer: "Multiple support channels are available: in-app chat, email support, phone support, and our knowledge base. Critical issues get immediate attention with our escalation process. We also provide proactive monitoring and will alert you to potential issues before they impact your workflows.",
      videoUrl: "https://images.unsplash.com/photo-1557053198-a8c0fa8b6c12",
      videoAlt: "Support ticket system showing issue tracking, escalation process, and real-time status updates"
    }]

  }];


  const allFAQs = faqCategories?.flatMap((category) =>
  category?.faqs?.map((faq, index) => ({
    ...faq,
    category: category?.title,
    id: `${category?.title}-${index}`
  }))
  );

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Get answers to common questions about implementation, security, pricing, and support. 
            Can't find what you're looking for? Our team is here to help.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {allFAQs?.map((faq, index) =>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="glass-card rounded-lg overflow-hidden">

              {/* Question Header */}
              <button
              onClick={() => toggleFAQ(index)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/10 transition-colors duration-200">

                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full font-medium">
                      {faq?.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {faq?.question}
                  </h3>
                </div>
                <div className={`ml-4 transition-transform duration-200 ${
              openFAQ === index ? 'rotate-180' : ''}`
              }>
                  <Icon name="ChevronDown" size={20} className="text-muted-foreground" />
                </div>
              </button>

              {/* Answer Content */}
              <AnimatePresence>
                {openFAQ === index &&
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden">

                    <div className="px-6 pb-6">
                      <div className="border-t border-border/20 pt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Text Answer */}
                          <div>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                              {faq?.answer}
                            </p>
                            
                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3">
                              <button
                            onClick={() => {
                              const event = new CustomEvent('openDemoModal');
                              window.dispatchEvent(event);
                            }}
                            className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors duration-200">

                                <Icon name="Calendar" size={16} />
                                <span>Book a Demo</span>
                              </button>
                              
                              <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                                <Icon name="ExternalLink" size={16} />
                                <span>View Documentation</span>
                              </button>
                            </div>
                          </div>

                          {/* Video/Visual */}
                          <div className="relative">
                            <div className="relative rounded-lg overflow-hidden bg-muted/20">
                              <img
                            src={faq?.videoUrl}
                            alt={faq?.videoAlt}
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              e.target.src = '/assets/images/no_image.png';
                            }} />

                              
                              {/* Play Button Overlay */}
                              <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm">
                                <button className="w-12 h-12 bg-primary/90 hover:bg-primary rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
                                  <Icon name="Play" size={20} className="text-primary-foreground ml-0.5" />
                                </button>
                              </div>

                              {/* Video Label */}
                              <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-foreground">
                                <Icon name="Video" size={12} className="inline mr-1" />
                                Video Explanation
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
              }
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Contact Support CTA */}
        <div className="mt-16 text-center glass-card p-8 rounded-lg">
          <Icon name="MessageCircle" size={48} className="text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            Our team of automation experts is here to help you find the perfect solution for your business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const event = new CustomEvent('openDemoModal');
                window.dispatchEvent(event);
              }}
              className="flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-colors duration-200">

              <Icon name="Calendar" size={16} />
              <span>Schedule a Call</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 py-3 px-6 rounded-lg transition-colors duration-200">
              <Icon name="MessageSquare" size={16} />
              <span>Start Live Chat</span>
            </button>
          </div>
        </div>
      </div>
    </section>);

};

export default FAQSection;