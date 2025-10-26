import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';
import Icon from 'components/AppIcon';

function InteractiveGlobe({ hotspots, onHotspotClick }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[2, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#00D4FF"
          attach="material"
          distort={0.1}
          speed={2}
          roughness={0.4}
          transparent
          opacity={0.8}
        />
      </Sphere>
      {hotspots?.map((hotspot, index) => (
        <Html
          key={index}
          position={hotspot?.position}
          distanceFactor={10}
        >
          <button
            onClick={() => onHotspotClick(hotspot)}
            className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg animate-pulse hover:scale-125 transition-transform duration-200"
            title={hotspot?.location}
          />
        </Html>
      ))}
    </group>
  );
}

const SolutionSection = () => {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [demoInput, setDemoInput] = useState('');
  const [demoIndustry, setDemoIndustry] = useState('');
  const [generatedWorkflow, setGeneratedWorkflow] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const globeHotspots = [
    {
      id: 1,
      location: "San Francisco, USA",
      position: [-1.5, 0.8, 1.2],
      company: "TechFlow Inc.",
      industry: "Technology",
      automation: "DevOps Pipeline",
      timeSaved: "85%",
      cost: "$2.3M saved annually",
      employees: "1,200",
      description: "Automated their entire software deployment process, reducing release cycles from weeks to hours."
    },
    {
      id: 2,
      location: "London, UK",
      position: [0.2, 1.2, 1.8],
      company: "FinanceFlow Ltd",
      industry: "Financial Services",
      automation: "Invoice Processing",
      timeSaved: "92%",
      cost: "$1.8M saved annually",
      employees: "850",
      description: "Transformed manual invoice processing, eliminating 95% of data entry errors."
    },
    {
      id: 3,
      location: "Tokyo, Japan",
      position: [1.8, 0.5, 0.8],
      company: "ManufacturePro",
      industry: "Manufacturing",
      automation: "Quality Control",
      timeSaved: "78%",
      cost: "$3.1M saved annually",
      employees: "2,400",
      description: "AI-powered quality inspection reduced defect rates by 96% while speeding up production."
    },
    {
      id: 4,
      location: "Sydney, Australia",
      position: [1.2, -1.0, 1.5],
      company: "HealthStream",
      industry: "Healthcare",
      automation: "Patient Management",
      timeSaved: "89%",
      cost: "$1.2M saved annually",
      employees: "650",
      description: "Streamlined patient intake and documentation, improving care quality and reducing wait times."
    },
    {
      id: 5,
      location: "São Paulo, Brazil",
      position: [-1.0, -0.8, 1.8],
      company: "LogiFlow",
      industry: "Logistics",
      automation: "Supply Chain",
      timeSaved: "94%",
      cost: "$2.7M saved annually",
      employees: "1,800",
      description: "Optimized entire supply chain operations with predictive analytics and automated routing."
    }
  ];

  const industryOptions = [
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Financial Services' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'logistics', label: 'Logistics & Supply Chain' },
    { value: 'technology', label: 'Technology' },
    { value: 'education', label: 'Education' },
    { value: 'government', label: 'Government' }
  ];

  const workflowTemplates = {
    manufacturing: {
      title: "Quality Control Automation",
      steps: [
        { icon: "Camera", title: "AI Visual Inspection", description: "Computer vision detects defects automatically" },
        { icon: "Database", title: "Data Collection", description: "Metrics stored in real-time dashboard" },
        { icon: "AlertTriangle", title: "Issue Detection", description: "Instant alerts for quality deviations" },
        { icon: "CheckCircle", title: "Approval Workflow", description: "Automated routing to quality managers" },
        { icon: "BarChart", title: "Reporting", description: "Automated quality reports and analytics" }
      ],
      roi: { time: "85%", cost: "$280K annually", implementation: "2-3 weeks" }
    },
    healthcare: {
      title: "Patient Intake Automation",
      steps: [
        { icon: "Smartphone", title: "Digital Forms", description: "Patients complete intake on mobile devices" },
        { icon: "Shield", title: "Insurance Verification", description: "Automated eligibility and benefits check" },
        { icon: "Calendar", title: "Smart Scheduling", description: "AI optimizes appointment slots" },
        { icon: "FileText", title: "EHR Integration", description: "Seamless data transfer to medical records" },
        { icon: "Bell", title: "Notifications", description: "Automated reminders and follow-ups" }
      ],
      roi: { time: "78%", cost: "$195K annually", implementation: "1-2 weeks" }
    },
    finance: {
      title: "Invoice Processing Automation",
      steps: [
        { icon: "Scan", title: "Document Capture", description: "OCR extracts data from invoices automatically" },
        { icon: "Brain", title: "AI Validation", description: "Machine learning verifies accuracy" },
        { icon: "Workflow", title: "Approval Routing", description: "Smart routing based on amount and vendor" },
        { icon: "CreditCard", title: "Payment Processing", description: "Automated payment execution" },
        { icon: "Archive", title: "Record Keeping", description: "Digital archival with audit trails" }
      ],
      roi: { time: "92%", cost: "$340K annually", implementation: "2-4 weeks" }
    },
    retail: {
      title: "Inventory Management Automation",
      steps: [
        { icon: "Scan", title: "Real-time Tracking", description: "RFID/barcode scanning for live inventory" },
        { icon: "TrendingUp", title: "Demand Forecasting", description: "AI predicts inventory needs" },
        { icon: "Truck", title: "Auto Reordering", description: "Automated purchase orders to suppliers" },
        { icon: "MapPin", title: "Warehouse Optimization", description: "Smart placement and picking routes" },
        { icon: "BarChart", title: "Analytics Dashboard", description: "Real-time inventory insights" }
      ],
      roi: { time: "88%", cost: "$225K annually", implementation: "3-4 weeks" }
    },
    logistics: {
      title: "Supply Chain Automation",
      steps: [
        { icon: "Navigation", title: "Route Optimization", description: "AI calculates most efficient delivery routes" },
        { icon: "Truck", title: "Fleet Management", description: "Real-time vehicle tracking and maintenance" },
        { icon: "Package", title: "Shipment Tracking", description: "Automated status updates to customers" },
        { icon: "DollarSign", title: "Cost Optimization", description: "Dynamic pricing and carrier selection" },
        { icon: "Users", title: "Customer Communication", description: "Automated delivery notifications" }
      ],
      roi: { time: "91%", cost: "$410K annually", implementation: "4-6 weeks" }
    },
    technology: {
      title: "DevOps Pipeline Automation",
      steps: [
        { icon: "GitBranch", title: "Code Integration", description: "Automated testing and code quality checks" },
        { icon: "Server", title: "Environment Setup", description: "Auto-provisioning of development environments" },
        { icon: "Zap", title: "Deployment Pipeline", description: "One-click deployments with rollback capability" },
        { icon: "Monitor", title: "Performance Monitoring", description: "Real-time application health monitoring" },
        { icon: "Shield", title: "Security Scanning", description: "Automated vulnerability assessments" }
      ],
      roi: { time: "89%", cost: "$520K annually", implementation: "3-5 weeks" }
    }
  };

  const handleHotspotClick = (hotspot) => {
    setSelectedHotspot(hotspot);
  };

  const generateWorkflow = async () => {
    if (!demoInput?.trim() || !demoIndustry) return;

    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const template = workflowTemplates?.[demoIndustry];
    if (template) {
      setGeneratedWorkflow({
        ...template,
        customTitle: `${demoInput} Automation`,
        processName: demoInput
      });
    }
    
    setIsGenerating(false);
  };

  return (
    <section id="platform" className="py-20 bg-gradient-to-br from-background via-background to-muted/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            The <span className="gradient-text">AI AutoFlow</span> Solution
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how businesses worldwide are transforming their operations with our intelligent automation platform. 
            Explore real deployments and try our AI workflow generator.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <div className="h-96 w-full">
              <Canvas camera={{ position: [0, 0, 6] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <InteractiveGlobe 
                  hotspots={globeHotspots}
                  onHotspotClick={handleHotspotClick}
                />
              </Canvas>
            </div>
            <div className="absolute bottom-4 left-4 glass-card p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <Icon name="MousePointer" size={16} className="inline mr-2" />
                Click hotspots to explore deployments
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {selectedHotspot ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 rounded-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {selectedHotspot?.company}
                    </h3>
                    <p className="text-muted-foreground">
                      <Icon name="MapPin" size={16} className="inline mr-1" />
                      {selectedHotspot?.location}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                    {selectedHotspot?.industry}
                  </span>
                </div>

                <p className="text-muted-foreground mb-6">
                  {selectedHotspot?.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-success/10 rounded-lg">
                    <div className="text-2xl font-bold text-success mb-1">
                      {selectedHotspot?.timeSaved}
                    </div>
                    <div className="text-sm text-muted-foreground">Time Saved</div>
                  </div>
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <div className="text-lg font-bold text-primary mb-1">
                      {selectedHotspot?.cost}
                    </div>
                    <div className="text-sm text-muted-foreground">Annual Savings</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    <Icon name="Users" size={16} className="inline mr-1" />
                    {selectedHotspot?.employees} employees
                  </span>
                  <span>
                    <Icon name="Zap" size={16} className="inline mr-1" />
                    {selectedHotspot?.automation}
                  </span>
                </div>
              </motion.div>
            ) : (
              <div className="glass-card p-8 text-center rounded-lg">
                <Icon name="Globe" size={48} className="text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Global Automation Network
                </h3>
                <p className="text-muted-foreground mb-4">
                  Discover how companies worldwide are transforming their operations with AI AutoFlow.
                </p>
                <p className="text-sm text-muted-foreground">
                  Click on the glowing hotspots to explore real customer deployments and success stories.
                </p>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 glass-card rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">10,000+</div>
                <div className="text-sm text-muted-foreground">Companies</div>
              </div>
              <div className="text-center p-4 glass-card rounded-lg">
                <div className="text-2xl font-bold text-success mb-1">150+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div className="text-center p-4 glass-card rounded-lg">
                <div className="text-2xl font-bold text-accent mb-1">2.3M+</div>
                <div className="text-sm text-muted-foreground">Processes</div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              AI Workflow Generator
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Describe any business process and watch our AI generate a complete automation workflow 
              with ROI projections and implementation timeline.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Describe Your Process"
                type="text"
                placeholder="e.g., Invoice approval workflow"
                value={demoInput}
                onChange={(e) => setDemoInput(e?.target?.value)}
              />
              <Select
                label="Industry"
                options={industryOptions}
                value={demoIndustry}
                onChange={setDemoIndustry}
                placeholder="Select your industry"
              />
            </div>

            <div className="text-center">
              <Button
                variant="default"
                size="lg"
                onClick={generateWorkflow}
                loading={isGenerating}
                disabled={!demoInput?.trim() || !demoIndustry}
                className="cta-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                iconName="Zap"
                iconPosition="left"
                iconSize={20}
              >
                {isGenerating ? 'Generating Workflow...' : 'Generate AI Workflow'}
              </Button>
            </div>
          </div>
                
          {generatedWorkflow && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20"
            >
              <h4 className="text-xl font-bold text-foreground mb-6 text-center">
                {generatedWorkflow?.customTitle}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                {generatedWorkflow?.steps?.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="p-4 bg-card/50 rounded-lg border border-border/20 hover:border-primary/40 transition-colors duration-300">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Icon name={step?.icon} size={20} className="text-primary" />
                      </div>
                      <h5 className="font-semibold text-foreground text-center mb-2 text-sm">
                        {step?.title}
                      </h5>
                      <p className="text-xs text-muted-foreground text-center">
                        {step?.description}
                      </p>
                    </div>
                    {index < generatedWorkflow?.steps?.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                        <Icon name="ArrowRight" size={16} className="text-primary" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-success/10 rounded-lg">
                  <div className="text-2xl font-bold text-success mb-1">
                    {generatedWorkflow?.roi?.time}
                  </div>
                  <div className="text-sm text-muted-foreground">Time Reduction</div>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="text-lg font-bold text-primary mb-1">
                    {generatedWorkflow?.roi?.cost}
                  </div>
                  <div className="text-sm text-muted-foreground">Projected Savings</div>
                </div>
                <div className="p-4 bg-accent/10 rounded-lg">
                  <div className="text-lg font-bold text-accent mb-1">
                    {generatedWorkflow?.roi?.implementation}
                  </div>
                  <div className="text-sm text-muted-foreground">Implementation</div>
                </div>
              </div>

              <div className="text-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    const event = new CustomEvent('openDemoModal');
                    window.dispatchEvent(event);
                  }}
                  className="border-primary text-primary hover:bg-primary/10"
                  iconName="Calendar"
                  iconPosition="left"
                  iconSize={16}
                >
                  Book Demo for This Workflow
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;