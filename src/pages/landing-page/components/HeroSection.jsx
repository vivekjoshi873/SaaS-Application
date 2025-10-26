import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

function ParticleField(props) {
  const ref = useRef();
  const [sphere] = useState(() => {
    try {
      return random?.inSphere ? random?.inSphere(new Float32Array(5000), { radius: 1.5 }) : new Float32Array(5000);
    } catch (error) {
      console.warn('Failed to generate particle sphere:', error);
      return new Float32Array(5000);
    }
  });

  useFrame((state, delta) => {
    try {
      if (ref?.current && delta && typeof delta === 'number') {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
      }
    } catch (error) {
      console.warn('ParticleField animation error:', error);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#00D4FF"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function AIGeometry() {
  const meshRef = useRef();

  useFrame((state) => {
    try {
      if (meshRef?.current && state?.clock) {
        const time = state?.clock?.getElapsedTime();
        if (typeof time === 'number') {
          meshRef.current.rotation.x = time * 0.2;
          meshRef.current.rotation.y = time * 0.3;
          if (meshRef?.current?.scale && meshRef?.current?.scale?.setScalar) {
            meshRef?.current?.scale?.setScalar(1 + Math.sin(time) * 0.1);
          }
        }
      }
    } catch (error) {
      console.warn('AIGeometry animation error:', error);
    }
  });

  return (
    <mesh ref={meshRef} position={[2, 0, 0]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#8B5CF6"
        transparent
        opacity={0.8}
        wireframe
      />
    </mesh>
  );
}

function ThreeJSFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" 
           style={{ animation: 'pulse 3s ease-in-out infinite' }} />
    </div>
  );
}

class ThreeJSErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.warn('Three.js Error Boundary caught error:', error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('Three.js Error Boundary details:', error, errorInfo);
  }

  render() {
    if (this.state?.hasError) {
      return <ThreeJSFallback />;
    }

    return this.props?.children;
  }
}

function SafeThreeCanvas() {
  const [hasError, setHasError] = useState(false);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  const canvasRef = useRef();

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas?.getContext('webgl') || canvas?.getContext('experimental-webgl');
      if (!gl) {
        console.warn('WebGL not supported, using fallback');
        setIsWebGLSupported(false);
        setHasError(true);
        return;
      }
    } catch (error) {
      console.warn('WebGL detection failed:', error);
      setIsWebGLSupported(false);
      setHasError(true);
      return;
    }

    const handleError = (event) => {
      if (event?.error) {
        const errorMessage = event?.error?.message || '';
        if (errorMessage?.includes('WebGL') || 
            errorMessage?.includes('addEventListener') ||
            errorMessage?.includes('null')) {
          console.warn('Three.js/WebGL error detected, falling back to CSS animation:', errorMessage);
          setHasError(true);
        }
      }
    };

    const handleUnhandledRejection = (event) => {
      if (event?.reason && typeof event?.reason === 'object') {
        const reason = event?.reason?.message || event?.reason?.toString() || '';
        if (reason?.includes('WebGL') || reason?.includes('Three')) {
          console.warn('Three.js promise rejection, falling back:', reason);
          setHasError(true);
        }
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    const canvas = canvasRef?.current;
    if (canvas) {
      const handleContextLost = (event) => {
        console.warn('WebGL context lost, falling back to CSS animation');
        event?.preventDefault();
        setHasError(true);
      };

      const handleContextRestored = () => {
        console.log('WebGL context restored');
      };

      canvas?.addEventListener('webglcontextlost', handleContextLost);
      canvas?.addEventListener('webglcontextrestored', handleContextRestored);

      return () => {
        canvas?.removeEventListener('webglcontextlost', handleContextLost);
        canvas?.removeEventListener('webglcontextrestored', handleContextRestored);
        window.removeEventListener('error', handleError);
        window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      };
    } else {
      return () => {
        window.removeEventListener('error', handleError);
        window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      };
    }
  }, []);

  if (hasError || !isWebGLSupported) {
    return <ThreeJSFallback />;
  }

  try {
    return (
      <ThreeJSErrorBoundary>
        <Canvas 
          ref={canvasRef}
          camera={{ position: [0, 0, 1] }}
          onError={(error) => {
            console.warn('Three.js Canvas error:', error);
            setHasError(true);
          }}
          onCreated={({ gl }) => {
            try {
              if (!gl || typeof gl?.getParameter !== 'function') {
                throw new Error('Invalid WebGL context');
              }
              console.log('Three.js Canvas created successfully');
            } catch (error) {
              console.warn('Three.js Canvas creation validation failed:', error);
              setHasError(true);
            }
          }}
          style={{ pointerEvents: 'none' }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <ParticleField />
            <AIGeometry />
          </Suspense>
        </Canvas>
      </ThreeJSErrorBoundary>
    );
  } catch (error) {
    console.warn('Failed to render Three.js Canvas:', error);
    return <ThreeJSFallback />;
  }
}

const HeroSection = () => {
  const [trafficSource, setTrafficSource] = useState('organic');
  const [businessesAutomated, setBusinessesAutomated] = useState(10247);
  const [timeSavings, setTimeSavings] = useState(73);

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window?.location?.search || '');
      const source = urlParams?.get('utm_source') || 'organic';
      setTrafficSource(source);

      const interval = setInterval(() => {
        setBusinessesAutomated((prev) => prev + Math.floor(Math.random() * 3));
      }, 5000);

      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    } catch (error) {
      console.warn('HeroSection useEffect error:', error);
    }
  }, []);

  const getHeadline = () => {
    try {
      return trafficSource === 'ppc' ? 'Eliminate Manual Work Forever' : 'Transform Your Business Workflows in 30 Days';
    } catch (error) {
      console.warn('getHeadline error:', error);
      return 'Transform Your Business Workflows in 30 Days';
    }
  };

  const handleDemoClick = () => {
    try {
      const event = new CustomEvent('openDemoModal');
      if (window && window.dispatchEvent) {
        window.dispatchEvent(event);
      }
    } catch (error) {
      console.warn('Failed to dispatch demo modal event:', error);
    }
  };

  const handleTrialClick = () => {
    try {
      const element = document?.getElementById && document.getElementById('pricing');
      if (element && element?.scrollIntoView && typeof element?.scrollIntoView === 'function') {
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.warn('Failed to scroll to pricing:', error);
    }
  };

  const companyLogos = [
    { name: "Microsoft", logo: "https://images.unsplash.com/photo-1508878230531-f0fb65ca3007", alt: "Microsoft logo in blue and white corporate branding" },
    { name: "Salesforce", logo: "https://images.unsplash.com/photo-1728410539013-ad662a093c68", alt: "Salesforce cloud logo with blue gradient design" },
    { name: "Adobe", logo: "https://images.unsplash.com/photo-1697752864356-e07d9fc8767d", alt: "Adobe Creative Cloud logo with red accent branding" },
    { name: "IBM", logo: "https://images.unsplash.com/photo-1712833090470-4745c193663d", alt: "IBM corporate logo with classic blue lettering" },
    { name: "Oracle", logo: "https://images.unsplash.com/photo-1662947774754-e428073c89da", alt: "Oracle database company logo with red branding" }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <SafeThreeCanvas />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80 z-10" />
      
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            <span className="gradient-text">{getHeadline()}</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Join <span className="text-primary font-semibold">{businessesAutomated?.toLocaleString()}+</span> companies saving{' '}
            <span className="text-primary font-semibold">{timeSavings}+ hours weekly</span> with AI automation that requires{' '}
            <span className="text-accent font-semibold">zero technical expertise</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              variant="default"
              size="lg"
              onClick={handleDemoClick}
              className="cta-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 text-lg"
              iconName="Calendar"
              iconPosition="left"
              iconSize={20}
            >
              Book Live Demo
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleTrialClick}
              className="border-secondary text-secondary hover:bg-secondary/10 px-8 py-4 text-lg font-semibold"
              iconName="Rocket"
              iconPosition="left"
              iconSize={20}
            >
              Start Free Trial
            </Button>
          </div>

          <div className="glass-card p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">Live Today</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {businessesAutomated?.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Businesses Automated</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-1">
                  {timeSavings}%
                </div>
                <div className="text-sm text-muted-foreground">Average Time Savings</div>
              </div>

              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-3">Trusted by Fortune 500</div>
                <div className="flex justify-center items-center space-x-4 opacity-60">
                  {companyLogos?.slice(0, 3)?.map((company, index) => (
                    <img
                      key={index}
                      src={company?.logo}
                      alt={company?.alt}
                      className="h-6 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                      onError={(e) => {
                        if (e?.target) {
                          e.target.src = '/assets/images/no_image.png';
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <Icon name="ChevronDown" size={24} className="text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;