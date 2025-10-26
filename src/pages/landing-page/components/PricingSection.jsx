import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState('annual');
  const [companySize, setCompanySize] = useState('medium');

  const companySizes = [
    { id: 'small', label: 'Small (1-50)', employees: '1-50 employees' },
    { id: 'medium', label: 'Medium (51-200)', employees: '51-200 employees' },
    { id: 'large', label: 'Large (201-1000)', employees: '201-1000 employees' },
    { id: 'enterprise', label: 'Enterprise (1000+)', employees: '1000+ employees' }
  ];

  const pricingPlans = {
    small: {
      starter: {
        name: 'Starter',
        description: 'Perfect for small teams getting started with automation',
        monthlyPrice: 49,
        annualPrice: 39,
        features: [
          'Up to 5 automated workflows',
          '10 integrations included',
          'Basic analytics dashboard',
          'Email support',
          'Standard templates library',
          'Mobile app access',
          'Basic user management'
        ],
        limits: {
          workflows: 5,
          integrations: 10,
          users: 5,
          storage: '10 GB'
        },
        popular: false
      },
      professional: {
        name: 'Professional',
        description: 'Advanced automation for growing businesses',
        monthlyPrice: 149,
        annualPrice: 119,
        features: [
          'Up to 25 automated workflows',
          '50 integrations included',
          'Advanced analytics & reporting',
          'Priority support (24/7)',
          'Custom workflow builder',
          'API access',
          'Advanced user permissions',
          'Workflow scheduling',
          'Error monitoring & alerts'
        ],
        limits: {
          workflows: 25,
          integrations: 50,
          users: 25,
          storage: '100 GB'
        },
        popular: true
      },
      enterprise: {
        name: 'Enterprise',
        description: 'Complete automation solution with dedicated support',
        monthlyPrice: 399,
        annualPrice: 319,
        features: [
          'Unlimited automated workflows',
          'Unlimited integrations',
          'Enterprise analytics suite',
          'Dedicated success manager',
          'Custom integrations',
          'White-label options',
          'Advanced security features',
          'SLA guarantees',
          'On-premise deployment option'
        ],
        limits: {
          workflows: 'Unlimited',
          integrations: 'Unlimited',
          users: 'Unlimited',
          storage: '1 TB'
        },
        popular: false
      }
    },
    medium: {
      starter: {
        name: 'Starter',
        description: 'Essential automation for mid-size teams',
        monthlyPrice: 149,
        annualPrice: 119,
        features: [
          'Up to 15 automated workflows',
          '25 integrations included',
          'Advanced analytics dashboard',
          'Priority email support',
          'Custom templates library',
          'Mobile app access',
          'Team collaboration tools'
        ],
        limits: {
          workflows: 15,
          integrations: 25,
          users: 15,
          storage: '50 GB'
        },
        popular: false
      },
      professional: {
        name: 'Professional',
        description: 'Comprehensive automation for scaling operations',
        monthlyPrice: 399,
        annualPrice: 319,
        features: [
          'Up to 75 automated workflows',
          '100 integrations included',
          'Enterprise analytics & BI',
          'Priority support (24/7)',
          'Advanced workflow builder',
          'Full API access',
          'Department-level permissions',
          'Advanced scheduling',
          'Real-time monitoring'
        ],
        limits: {
          workflows: 75,
          integrations: 100,
          users: 75,
          storage: '500 GB'
        },
        popular: true
      },
      enterprise: {
        name: 'Enterprise',
        description: 'Enterprise-grade automation with full customization',
        monthlyPrice: 899,
        annualPrice: 719,
        features: [
          'Unlimited automated workflows',
          'Unlimited integrations',
          'Custom analytics platform',
          'Dedicated success team',
          'Custom development',
          'White-label solutions',
          'Enterprise security suite',
          'SLA guarantees (99.9%)',
          'Multi-region deployment'
        ],
        limits: {
          workflows: 'Unlimited',
          integrations: 'Unlimited',
          users: 'Unlimited',
          storage: '5 TB'
        },
        popular: false
      }
    },
    large: {
      starter: {
        name: 'Professional',
        description: 'Advanced automation for large organizations',
        monthlyPrice: 599,
        annualPrice: 479,
        features: [
          'Up to 150 automated workflows',
          '200 integrations included',
          'Enterprise analytics suite',
          'Priority support (24/7)',
          'Advanced workflow engine',
          'Full API & SDK access',
          'Enterprise user management',
          'Advanced compliance tools',
          'Multi-department dashboards'
        ],
        limits: {
          workflows: 150,
          integrations: 200,
          users: 150,
          storage: '1 TB'
        },
        popular: false
      },
      professional: {
        name: 'Enterprise',
        description: 'Complete enterprise automation platform',
        monthlyPrice: 1299,
        annualPrice: 1039,
        features: [
          'Unlimited automated workflows',
          'Unlimited integrations',
          'Custom analytics platform',
          'Dedicated success team',
          'Custom development included',
          'White-label capabilities',
          'Advanced security & compliance',
          'SLA guarantees (99.95%)',
          'Global deployment options'
        ],
        limits: {
          workflows: 'Unlimited',
          integrations: 'Unlimited',
          users: 'Unlimited',
          storage: '10 TB'
        },
        popular: true
      },
      enterprise: {
        name: 'Custom',
        description: 'Tailored solution for complex enterprise needs',
        monthlyPrice: null,
        annualPrice: null,
        features: [
          'Fully customized platform',
          'Unlimited everything',
          'Dedicated infrastructure',
          'Executive success team',
          'Custom development team',
          'Complete white-labeling',
          'Highest security clearance',
          'Custom SLA terms',
          'On-premise or hybrid cloud'
        ],
        limits: {
          workflows: 'Custom',
          integrations: 'Custom',
          users: 'Custom',
          storage: 'Custom'
        },
        popular: false
      }
    },
    enterprise: {
      starter: {
        name: 'Enterprise',
        description: 'Enterprise-grade automation platform',
        monthlyPrice: 1999,
        annualPrice: 1599,
        features: [
          'Unlimited automated workflows',
          'Unlimited integrations',
          'Enterprise analytics suite',
          'Dedicated success team',
          'Priority development queue',
          'Enterprise security suite',
          'Advanced compliance tools',
          'SLA guarantees (99.9%)',
          'Multi-region deployment'
        ],
        limits: {
          workflows: 'Unlimited',
          integrations: 'Unlimited',
          users: 'Unlimited',
          storage: '25 TB'
        },
        popular: false
      },
      professional: {
        name: 'Enterprise Plus',
        description: 'Premium enterprise solution with dedicated resources',
        monthlyPrice: 3999,
        annualPrice: 3199,
        features: [
          'Fully managed platform',
          'Dedicated infrastructure',
          'Custom analytics platform',
          'Executive success team',
          'Dedicated development team',
          'Complete customization',
          'Highest security clearance',
          'Custom SLA (up to 99.99%)',
          'Global deployment & support'
        ],
        limits: {
          workflows: 'Unlimited',
          integrations: 'Unlimited',
          users: 'Unlimited',
          storage: '100 TB'
        },
        popular: true
      },
      enterprise: {
        name: 'Custom Enterprise',
        description: 'Fully tailored enterprise automation ecosystem',
        monthlyPrice: null,
        annualPrice: null,
        features: [
          'Bespoke platform development',
          'Unlimited everything',
          'Private cloud infrastructure',
          'C-level success team',
          'Full development team',
          'Complete IP ownership',
          'Government-grade security',
          'Custom terms & SLA',
          'White-glove implementation'
        ],
        limits: {
          workflows: 'Bespoke',
          integrations: 'Bespoke',
          users: 'Bespoke',
          storage: 'Bespoke'
        },
        popular: false
      }
    }
  };

  const currentPlans = pricingPlans?.[companySize];

  const getPrice = (plan) => {
    if (!plan?.monthlyPrice) return 'Custom';
    const price = billingCycle === 'annual' ? plan?.annualPrice : plan?.monthlyPrice;
    return `$${price}`;
  };

  const getSavings = (plan) => {
    if (!plan?.monthlyPrice) return null;
    const monthlyCost = plan?.monthlyPrice * 12;
    const annualCost = plan?.annualPrice * 12;
    const savings = Math.round(((monthlyCost - annualCost) / monthlyCost) * 100);
    return savings;
  };

  const handleGetStarted = (planName) => {
    if (planName === 'Custom' || planName === 'Custom Enterprise') {
      const event = new CustomEvent('openDemoModal');
      window.dispatchEvent(event);
    } else {
      const element = document.getElementById('hero');
      if (element) {
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-background via-muted/5 to-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your business size. All plans include our core automation features
            with transparent, per-automation pricing.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {companySizes?.map((size) => (
              <button
                key={size?.id}
                onClick={() => setCompanySize(size?.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${companySize === size?.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted/20 text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                  }`}
              >
                <div className="text-sm font-semibold">{size?.label}</div>
                <div className="text-xs opacity-80">{size?.employees}</div>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${billingCycle === 'annual' ? 'bg-primary' : 'bg-muted'
                }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${billingCycle === 'annual' ? 'translate-x-8' : 'translate-x-1'
                  }`}
              />
            </button>
            <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {billingCycle === 'annual' && (
              <span className="text-sm bg-success/20 text-success px-2 py-1 rounded-full font-medium">
                Save up to 20%
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {Object.entries(currentPlans)?.map(([key, plan], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative glass-card p-8 rounded-lg transition-all duration-300 hover:scale-105 ${plan?.popular
                ? 'border-primary/40 bg-primary/5 shadow-glow'
                : 'hover:border-primary/20'
                }`}
            >
              {plan?.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan?.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {plan?.description}
                </p>

                <div className="mb-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-foreground">
                      {getPrice(plan)}
                    </span>
                    {plan?.monthlyPrice && (
                      <span className="text-muted-foreground ml-2">
                        /{billingCycle === 'annual' ? 'month' : 'month'}
                      </span>
                    )}
                  </div>

                  {billingCycle === 'annual' && plan?.monthlyPrice && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Billed annually • Save {getSavings(plan)}%
                    </div>
                  )}

                  {!plan?.monthlyPrice && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Contact for pricing
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {plan?.features?.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <Icon name="Check" size={16} className="text-success mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mb-8 p-4 bg-muted/10 rounded-lg">
                <h4 className="font-semibold text-foreground mb-3 text-sm">Plan Limits</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-muted-foreground">Workflows</div>
                    <div className="font-semibold text-foreground">{plan?.limits?.workflows}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Integrations</div>
                    <div className="font-semibold text-foreground">{plan?.limits?.integrations}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Users</div>
                    <div className="font-semibold text-foreground">{plan?.limits?.users}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Storage</div>
                    <div className="font-semibold text-foreground">{plan?.limits?.storage}</div>
                  </div>
                </div>
              </div>

              <Button
                variant={plan?.popular ? 'default' : 'outline'}
                size="lg"
                fullWidth
                onClick={() => handleGetStarted(plan?.name)}
                className={plan?.popular
                  ? 'cta-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold'
                  : 'border-primary text-primary hover:bg-primary/10'
                }
                iconName={plan?.monthlyPrice ? 'Rocket' : 'Calendar'}
                iconPosition="left" iconSize={16}
              >
                {plan?.monthlyPrice ? 'Start Free Trial' : 'Schedule Consultation'}
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="glass-card p-8 rounded-lg mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            All Plans Include
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Shield" size={24} className="text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Enterprise Security</h4>
              <p className="text-sm text-muted-foreground">SOC 2, GDPR, HIPAA compliance</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Zap" size={24} className="text-success" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">99.9% Uptime</h4>
              <p className="text-sm text-muted-foreground">Guaranteed availability SLA</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Headphones" size={24} className="text-accent" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">24/7 Support</h4>
              <p className="text-sm text-muted-foreground">Expert help when you need it</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Smartphone" size={24} className="text-secondary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Mobile Access</h4>
              <p className="text-sm text-muted-foreground">iOS & Android apps included</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-8">
            Frequently Asked Questions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="glass-card p-6 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Can I change plans anytime?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately,
                and we'll prorate any billing differences.
              </p>
            </div>

            <div className="glass-card p-6 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">What's included in the free trial?</h4>
              <p className="text-sm text-muted-foreground">
                14-day free trial with full access to Professional plan features. No credit card required.
                Cancel anytime during the trial period.
              </p>
            </div>

            <div className="glass-card p-6 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Do you offer custom pricing?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, we offer custom pricing for enterprises with unique requirements.
                Contact our sales team for a personalized quote.
              </p>
            </div>

            <div className="glass-card p-6 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">What payment methods do you accept?</h4>
              <p className="text-sm text-muted-foreground">
                We accept all major credit cards, ACH transfers, and wire transfers for enterprise accounts.
                Annual plans can be paid via invoice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;