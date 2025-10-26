import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const IntegrationsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  const categories = [
  { id: 'all', label: 'All Integrations', icon: 'Grid3X3' },
  { id: 'crm', label: 'CRM & Sales', icon: 'Users' },
  { id: 'erp', label: 'ERP & Finance', icon: 'DollarSign' },
  { id: 'communication', label: 'Communication', icon: 'MessageSquare' },
  { id: 'productivity', label: 'Productivity', icon: 'Briefcase' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart' },
  { id: 'cloud', label: 'Cloud Platforms', icon: 'Cloud' }];


  const integrations = [
  {
    id: 1,
    name: 'Salesforce',
    category: 'crm',
    logo: "https://images.unsplash.com/photo-1728410539013-ad662a093c68",
    logoAlt: 'Salesforce CRM platform logo with blue cloud design',
    description: 'Automate lead scoring, opportunity management, and sales pipeline workflows',
    features: ['Lead Automation', 'Pipeline Management', 'Custom Workflows', 'Real-time Sync'],
    setupTime: '2 hours',
    popularity: 95,
    screenshot: "https://images.unsplash.com/photo-1578496479939-722d9dd1cc5b",
    screenshotAlt: 'Salesforce dashboard showing automated sales pipeline and lead scoring interface'
  },
  {
    id: 2,
    name: 'HubSpot',
    category: 'crm',
    logo: "https://images.unsplash.com/photo-1649734926695-1b1664e98842",
    logoAlt: 'HubSpot inbound marketing platform logo with orange branding',
    description: 'Streamline marketing automation and customer journey orchestration',
    features: ['Marketing Automation', 'Contact Management', 'Email Sequences', 'Analytics'],
    setupTime: '1.5 hours',
    popularity: 88,
    screenshot: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3",
    screenshotAlt: 'HubSpot marketing automation dashboard with campaign performance metrics'
  },
  {
    id: 3,
    name: 'Pipedrive',
    category: 'crm',
    logo: "https://images.unsplash.com/photo-1649180559928-91d16a63bd39",
    logoAlt: 'Pipedrive sales CRM logo with green pipeline visualization',
    description: 'Automate sales activities and deal progression tracking',
    features: ['Deal Automation', 'Activity Tracking', 'Sales Reports', 'Mobile Sync'],
    setupTime: '1 hour',
    popularity: 82,
    screenshot: "https://images.unsplash.com/photo-1531030874896-fdef6826f2f7",
    screenshotAlt: 'Pipedrive sales pipeline interface showing automated deal progression'
  },

  {
    id: 4,
    name: 'SAP',
    category: 'erp',
    logo: "https://images.unsplash.com/photo-1633410189542-36d96e3762b8",
    logoAlt: 'SAP enterprise software logo with blue corporate branding',
    description: 'Integrate with SAP modules for end-to-end business process automation',
    features: ['ERP Integration', 'Financial Workflows', 'Supply Chain', 'Reporting'],
    setupTime: '4 hours',
    popularity: 91,
    screenshot: "https://images.unsplash.com/photo-1724833256463-26b199dc1b69",
    screenshotAlt: 'SAP ERP dashboard showing automated financial and supply chain processes'
  },
  {
    id: 5,
    name: 'QuickBooks',
    category: 'erp',
    logo: "https://images.unsplash.com/photo-1693801873650-b1091c25abbf",
    logoAlt: 'QuickBooks accounting software logo with blue and green design',
    description: 'Automate invoicing, expense tracking, and financial reporting',
    features: ['Invoice Automation', 'Expense Management', 'Tax Preparation', 'Bank Sync'],
    setupTime: '45 minutes',
    popularity: 85,
    screenshot: "https://images.unsplash.com/photo-1507362569319-ce3cce2b6e32",
    screenshotAlt: 'QuickBooks accounting interface with automated invoice processing and expense tracking'
  },
  {
    id: 6,
    name: 'NetSuite',
    category: 'erp',
    logo: "https://images.unsplash.com/photo-1651355682685-3197dfa9ce4b",
    logoAlt: 'Oracle NetSuite ERP platform logo with red and black branding',
    description: 'Complete ERP automation for manufacturing and distribution',
    features: ['Order Management', 'Inventory Control', 'Financial Planning', 'CRM Integration'],
    setupTime: '6 hours',
    popularity: 89,
    screenshot: "https://images.unsplash.com/photo-1669643470668-19d6fb1d3f21",
    screenshotAlt: 'NetSuite ERP dashboard displaying automated order management and inventory control'
  },

  {
    id: 7,
    name: 'Slack',
    category: 'communication',
    logo: "https://images.unsplash.com/photo-1496200186974-4293800e2c20",
    logoAlt: 'Slack team communication platform logo with colorful hashtag design',
    description: 'Automate team notifications and workflow approvals via Slack',
    features: ['Workflow Notifications', 'Approval Bots', 'Status Updates', 'Integration Hub'],
    setupTime: '30 minutes',
    popularity: 93,
    screenshot: "https://images.unsplash.com/photo-1497565998880-bd009060dcd7",
    screenshotAlt: 'Slack workspace showing automated workflow notifications and approval processes'
  },
  {
    id: 8,
    name: 'Microsoft Teams',
    category: 'communication',
    logo: "https://images.unsplash.com/photo-1633410189542-36d96e3762b8",
    logoAlt: 'Microsoft Teams collaboration platform logo with purple branding',
    description: 'Integrate automation workflows with Teams channels and meetings',
    features: ['Meeting Automation', 'Channel Notifications', 'File Workflows', 'Bot Integration'],
    setupTime: '45 minutes',
    popularity: 87,
    screenshot: "https://images.unsplash.com/photo-1730818875094-7a66bc7b6bd1",
    screenshotAlt: 'Microsoft Teams interface with automated meeting scheduling and workflow notifications'
  },

  {
    id: 9,
    name: 'Google Workspace',
    category: 'productivity',
    logo: "https://images.unsplash.com/photo-1730817403196-80d494660640",
    logoAlt: 'Google Workspace productivity suite logo with colorful G design',
    description: 'Automate document workflows, calendar management, and email processing',
    features: ['Document Automation', 'Calendar Sync', 'Email Processing', 'Drive Integration'],
    setupTime: '1 hour',
    popularity: 94,
    screenshot: "https://images.unsplash.com/photo-1669643470668-19d6fb1d3f21",
    screenshotAlt: 'Google Workspace dashboard showing automated document workflows and calendar management'
  },
  {
    id: 10,
    name: 'Microsoft 365',
    category: 'productivity',
    logo: "https://images.unsplash.com/photo-1578192850282-02971afeedd8",
    logoAlt: 'Microsoft 365 office suite logo with blue and orange branding',
    description: 'Streamline Office workflows and SharePoint document management',
    features: ['Office Automation', 'SharePoint Workflows', 'Power Automate', 'OneDrive Sync'],
    setupTime: '2 hours',
    popularity: 90,
    screenshot: "https://images.unsplash.com/photo-1669702895978-2e6013a00180",
    screenshotAlt: 'Microsoft 365 interface displaying automated Office workflows and SharePoint integration'
  },

  {
    id: 11,
    name: 'Tableau',
    category: 'analytics',
    logo: "https://images.unsplash.com/photo-1585069034379-8e4362790d60",
    logoAlt: 'Tableau data visualization platform logo with blue and orange design',
    description: 'Automate data visualization and reporting workflows',
    features: ['Automated Reports', 'Data Refresh', 'Alert Systems', 'Dashboard Updates'],
    setupTime: '2 hours',
    popularity: 86,
    screenshot: "https://images.unsplash.com/photo-1733232679107-9c9957c1affa",
    screenshotAlt: 'Tableau dashboard showing automated data visualization and reporting workflows'
  },
  {
    id: 12,
    name: 'Power BI',
    category: 'analytics',
    logo: "https://images.unsplash.com/photo-1662052955282-da15376f3919",
    logoAlt: 'Microsoft Power BI business intelligence logo with yellow and black design',
    description: 'Create automated business intelligence and analytics workflows',
    features: ['BI Automation', 'Data Modeling', 'Scheduled Refresh', 'Alert Notifications'],
    setupTime: '1.5 hours',
    popularity: 84,
    screenshot: "https://images.unsplash.com/photo-1733877687392-7aa39d980a7f",
    screenshotAlt: 'Power BI dashboard interface with automated business intelligence and data analytics'
  },

  {
    id: 13,
    name: 'AWS',
    category: 'cloud',
    logo: "https://images.unsplash.com/photo-1662947774804-917520490b35",
    logoAlt: 'Amazon Web Services cloud platform logo with orange and black branding',
    description: 'Integrate with AWS services for scalable cloud automation',
    features: ['Lambda Functions', 'S3 Automation', 'EC2 Management', 'CloudWatch Integration'],
    setupTime: '3 hours',
    popularity: 92,
    screenshot: "https://images.unsplash.com/photo-1517660524834-cc8af226319e",
    screenshotAlt: 'AWS console showing automated cloud infrastructure and serverless function management'
  },
  {
    id: 14,
    name: 'Azure',
    category: 'cloud',
    logo: "https://images.unsplash.com/photo-1565174967408-1ada6cf19bd5",
    logoAlt: 'Microsoft Azure cloud platform logo with blue gradient design',
    description: 'Leverage Azure services for enterprise-grade automation',
    features: ['Logic Apps', 'Function Apps', 'Storage Automation', 'Monitor Integration'],
    setupTime: '2.5 hours',
    popularity: 88,
    screenshot: "https://images.unsplash.com/photo-1554854335-12d69f8ab450",
    screenshotAlt: 'Microsoft Azure portal displaying automated cloud services and logic app workflows'
  }];


  const filteredIntegrations = selectedCategory === 'all' ?
  integrations :
  integrations?.filter((integration) => integration?.category === selectedCategory);

  const handleIntegrationClick = (integration) => {
    setSelectedIntegration(integration);
  };

  const closeModal = () => {
    setSelectedIntegration(null);
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Seamless <span className="gradient-text">Integration Ecosystem</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with 200+ business tools and platforms. One-click integrations that work 
            out of the box, with live previews of your connected workflows.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories?.map((category) =>
          <button
            key={category?.id}
            onClick={() => setSelectedCategory(category?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            selectedCategory === category?.id ?
            'bg-primary text-primary-foreground shadow-md' :
            'bg-muted/20 text-muted-foreground hover:bg-muted/40 hover:text-foreground'}`
            }>

              <Icon name={category?.icon} size={16} />
              <span>{category?.label}</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filteredIntegrations?.map((integration, index) =>
          <motion.div
            key={integration?.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onClick={() => handleIntegrationClick(integration)}
            className="glass-card p-6 cursor-pointer hover:scale-105 transition-all duration-300 hover:border-primary/40 group">

              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted/20 flex items-center justify-center">
                  <Image
                  src={integration?.logo}
                  alt={integration?.logoAlt}
                  className="w-10 h-10 object-contain" />

                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                    {integration?.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)]?.map((_, i) =>
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={`${
                      i < Math.floor(integration?.popularity / 20) ?
                      'text-warning fill-current' : 'text-muted-foreground/30'}`
                      } />

                    )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {integration?.popularity}%
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {integration?.description}
              </p>

              <div className="space-y-2 mb-4">
                {integration?.features?.slice(0, 2)?.map((feature, idx) =>
              <div key={idx} className="flex items-center text-xs text-muted-foreground">
                    <Icon name="Check" size={12} className="mr-2 text-success" />
                    {feature}
                  </div>
              )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} className="mr-1" />
                  {integration?.setupTime} setup
                </div>
                <Icon name="ArrowRight" size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-6 glass-card rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">200+</div>
            <div className="text-sm text-muted-foreground">Available Integrations</div>
          </div>
          <div className="text-center p-6 glass-card rounded-lg">
            <div className="text-3xl font-bold text-success mb-2">&lt;2 min</div>
            <div className="text-sm text-muted-foreground">Average Setup Time</div>
          </div>
          <div className="text-center p-6 glass-card rounded-lg">
            <div className="text-3xl font-bold text-accent mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime Guarantee</div>
          </div>
          <div className="text-center p-6 glass-card rounded-lg">
            <div className="text-3xl font-bold text-secondary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Sync Monitoring</div>
          </div>
        </div>

        {selectedIntegration &&
        <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
            <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={closeModal} />

            <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl glass-card rounded-lg max-h-[90vh] overflow-y-auto">

              <div className="flex items-center justify-between p-6 border-b border-border/20">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted/20 flex items-center justify-center">
                    <Image
                    src={selectedIntegration?.logo}
                    alt={selectedIntegration?.logoAlt}
                    className="w-14 h-14 object-contain" />

                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {selectedIntegration?.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {categories?.find((cat) => cat?.id === selectedIntegration?.category)?.label}
                    </p>
                  </div>
                </div>
                <button
                onClick={closeModal}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200">

                  <Icon name="X" size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Overview</h4>
                  <p className="text-muted-foreground">
                    {selectedIntegration?.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Integration Preview</h4>
                  <div className="rounded-lg overflow-hidden border border-border/20">
                    <Image
                    src={selectedIntegration?.screenshot}
                    alt={selectedIntegration?.screenshotAlt}
                    className="w-full h-48 object-cover" />

                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Key Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedIntegration?.features?.map((feature, index) =>
                  <div key={index} className="flex items-center text-sm text-muted-foreground">
                        <Icon name="Check" size={16} className="mr-2 text-success" />
                        {feature}
                      </div>
                  )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/10 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Icon name="Clock" size={16} className="mr-2 text-primary" />
                      <span className="font-medium text-foreground">Setup Time</span>
                    </div>
                    <div className="text-lg font-bold text-primary">
                      {selectedIntegration?.setupTime}
                    </div>
                  </div>
                  <div className="p-4 bg-muted/10 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Icon name="Star" size={16} className="mr-2 text-warning" />
                      <span className="font-medium text-foreground">Popularity</span>
                    </div>
                    <div className="text-lg font-bold text-warning">
                      {selectedIntegration?.popularity}%
                    </div>
                  </div>
                </div>
                    
                <div className="flex space-x-3 pt-4 border-t border-border/20">
                  <button
                  onClick={() => {
                    const event = new CustomEvent('openDemoModal');
                    window.dispatchEvent(event);
                    closeModal();
                  }}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">

                    <Icon name="Calendar" size={16} />
                    <span>Book Integration Demo</span>
                  </button>
                  <button
                  onClick={closeModal}
                  className="px-6 py-3 border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 rounded-lg transition-colors duration-200">

                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        }
      </div>
    </section>);

};

export default IntegrationsSection;