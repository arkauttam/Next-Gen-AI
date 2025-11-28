import { Button } from '@/components/ui/button';
import { PublicLayout } from '@/layouts/PublicLayout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MessageSquare, Image, Zap, Star, Users, Brain, Cpu, Rocket, Shield, TrendingUp, Globe } from 'lucide-react';
import { useRef } from 'react';
import Hero from './Hero';

const Landing = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y1 = useTransform(smoothProgress, [0, 1], [0, -500]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, -300]);
  const opacity1 = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 0.8]);

  const features = [
    {
      icon: Brain,
      title: 'Neural Intelligence',
      description: 'Advanced AI models trained on billions of parameters for human-like understanding',
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: Image,
      title: 'Visual Creation',
      description: 'Generate photorealistic images and art with state-of-the-art diffusion models',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Zap,
      title: 'Quantum Speed',
      description: 'Lightning-fast inference powered by optimized cloud infrastructure',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and compliance with global data protection standards',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Cpu,
      title: 'Multi-Model Support',
      description: 'Access GPT-4, Claude, DALL·E 3, and more through a unified interface',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Globe,
      title: 'Global Scale',
      description: 'Deploy across 190+ regions with 99.99% uptime guarantee',
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Active Users', gradient: 'from-violet-500 to-purple-500' },
    { icon: Sparkles, value: '10M+', label: 'AI Generations', gradient: 'from-cyan-500 to-blue-500' },
    { icon: TrendingUp, value: '99.9%', label: 'Uptime SLA', gradient: 'from-pink-500 to-rose-500' },
    { icon: Rocket, value: '<100ms', label: 'Response Time', gradient: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <PublicLayout>
      <div ref={containerRef}>
        {/* Dynamic Animated Background with Glow Effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Animated Gradient Mesh Background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 30%, hsl(263 70% 20% / 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, hsl(193 100% 30% / 0.3) 0%, transparent 50%), linear-gradient(135deg, hsl(240 10% 3.9%) 0%, hsl(250 20% 8%) 50%, hsl(240 10% 3.9%) 100%)',
                'radial-gradient(circle at 80% 20%, hsl(280 70% 25% / 0.4) 0%, transparent 50%), radial-gradient(circle at 20% 80%, hsl(193 100% 35% / 0.3) 0%, transparent 50%), linear-gradient(135deg, hsl(240 10% 3.9%) 0%, hsl(260 25% 10%) 50%, hsl(240 10% 3.9%) 100%)',
                'radial-gradient(circle at 50% 50%, hsl(263 70% 22% / 0.4) 0%, transparent 50%), radial-gradient(circle at 50% 50%, hsl(193 100% 32% / 0.3) 0%, transparent 50%), linear-gradient(135deg, hsl(240 10% 3.9%) 0%, hsl(245 22% 9%) 50%, hsl(240 10% 3.9%) 100%)',
                'radial-gradient(circle at 20% 30%, hsl(263 70% 20% / 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, hsl(193 100% 30% / 0.3) 0%, transparent 50%), linear-gradient(135deg, hsl(240 10% 3.9%) 0%, hsl(250 20% 8%) 50%, hsl(240 10% 3.9%) 100%)',
              ]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Animated Grid with Gradient */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="url(#gridGradient)" strokeWidth="0.5" />
              </pattern>
              <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(263 70% 50%)" stopOpacity="0.3">
                  <animate attributeName="stopOpacity" values="0.3;0.6;0.3" dur="5s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="hsl(193 100% 50%)" stopOpacity="0.5">
                  <animate attributeName="stopOpacity" values="0.5;0.8;0.5" dur="5s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="hsl(280 70% 50%)" stopOpacity="0.3">
                  <animate attributeName="stopOpacity" values="0.3;0.6;0.3" dur="5s" repeatCount="indefinite" />
                </stop>
                <animate attributeName="x1" values="0%;100%;0%" dur="10s" repeatCount="indefinite" />
                <animate attributeName="y1" values="0%;100%;0%" dur="10s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Large Glowing Orbs with Complex Animation */}
          <motion.div
            className="absolute -top-40 -left-40 w-[800px] h-[800px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(263 70% 50% / 0.4) 0%, hsl(263 70% 50% / 0.2) 40%, transparent 70%)",
              filter: "blur(80px)",
            }}
            animate={{
              x: [0, 150, -50, 0],
              y: [0, 100, 50, 0],
              scale: [1, 1.3, 1.1, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-40 -right-40 w-[800px] h-[800px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(193 100% 50% / 0.4) 0%, hsl(193 100% 50% / 0.2) 40%, transparent 70%)",
              filter: "blur(80px)",
            }}
            animate={{
              x: [0, -150, 50, 0],
              y: [0, -100, -50, 0],
              scale: [1, 1.4, 1.2, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(280 100% 60% / 0.4) 0%, hsl(280 100% 60% / 0.2) 40%, transparent 70%)",
              filter: "blur(100px)",
            }}
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Floating Particles with Glow */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                background: i % 3 === 0 ? "hsl(263 70% 50%)" : i % 3 === 1 ? "hsl(193 100% 50%)" : "hsl(280 100% 60%)",
                boxShadow: i % 3 === 0
                  ? "0 0 20px hsl(263 70% 50% / 0.6), 0 0 40px hsl(263 70% 50% / 0.3)"
                  : i % 3 === 1
                    ? "0 0 20px hsl(193 100% 50% / 0.6), 0 0 40px hsl(193 100% 50% / 0.3)"
                    : "0 0 20px hsl(280 100% 60% / 0.6), 0 0 40px hsl(280 100% 60% / 0.3)",
              }}
              animate={{
                y: [0, -50 - Math.random() * 50, 0],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Scanning Lines Effect */}
          <motion.div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, transparent 0%, hsl(193 100% 50% / 0.4) 50%, transparent 100%)",
              height: "200px",
            }}
            animate={{
              y: ["-100%", "100vh"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Corner Glows */}
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[150px] opacity-40"
            style={{ background: "hsl(263 70% 50% / 0.5)" }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-[150px] opacity-40"
            style={{ background: "hsl(193 100% 50% / 0.5)" }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

          {/* Hexagon Pattern Overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                <path d="M25 0 L50 14.43 L50 28.87 L25 43.3 L0 28.87 L0 14.43 Z"
                  fill="none"
                  stroke="hsl(193 100% 50%)"
                  strokeWidth="0.5"
                  opacity="0.5">
                  <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" />
                </path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>

        {/* Hero Section */}

        <Hero />

        {/* Stats Section */}
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity blur-xl"
                      style={{ background: `linear-gradient(135deg, var(--primary), var(--accent))` }} />

                    <div className="relative p-8 rounded-3xl glass border border-border/50 backdrop-blur-xl text-center h-full flex flex-col items-center justify-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} mb-6 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className={`text-5xl font-black mb-3 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>
                      <div className="text-muted-foreground font-medium">{stat.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="inline-block mb-6"
              >
                <div className="px-6 py-2 rounded-full glass border border-primary/50 text-primary text-sm font-bold backdrop-blur-xl">
                  <Cpu className="w-4 h-4 inline mr-2" />
                  ENTERPRISE FEATURES
                </div>
              </motion.div>

              <h2 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">
                Built for Scale
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Production-grade AI infrastructure designed for developers and enterprises
              </p>
              <motion.div
                className="absolute top-40 left-80 opacity-40"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" className="text-primary" />
                  <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" className="text-accent" />
                  <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" className="text-primary" />
                </svg>
              </motion.div>

              <motion.div
                className="absolute bottom-20 right-10 opacity-20"
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60 10 L110 110 L10 110 Z" stroke="currentColor" strokeWidth="2" className="text-accent" />
                  <path d="M60 30 L90 90 L30 90 Z" stroke="currentColor" strokeWidth="2" className="text-primary" />
                </svg>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -10 }}
                    className="group relative"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity blur-2xl`} />

                    <div className="relative p-8 rounded-3xl glass border border-border/50 backdrop-blur-xl h-full hover:border-accent/50 transition-all">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="mb-12">
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="w-24 h-24 mx-auto mb-8 relative"
                >
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="40" stroke="url(#gradient1)" strokeWidth="2" />
                    <circle cx="50" cy="50" r="30" stroke="url(#gradient2)" strokeWidth="2" />
                    <circle cx="50" cy="50" r="20" stroke="url(#gradient3)" strokeWidth="2" />
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(263 70% 50%)" />
                        <stop offset="100%" stopColor="hsl(193 100% 50%)" />
                      </linearGradient>
                      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(193 100% 50%)" />
                        <stop offset="100%" stopColor="hsl(263 70% 50%)" />
                      </linearGradient>
                      <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(263 70% 50%)" />
                        <stop offset="100%" stopColor="hsl(193 100% 50%)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>

                <h2 className="text-6xl md:text-7xl font-black mb-6">
                  Next-Gen AI Stack
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
                  Built on the world's most advanced AI models with enterprise-grade reliability
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {['GPT-4o', 'Claude 3', 'DALL·E 3', 'Stable Diffusion'].map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="p-6 rounded-2xl glass border border-border/50 backdrop-blur-xl font-bold text-lg hover:border-accent/50 transition-all"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, hsl(263 70% 50% / 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, hsl(193 100% 50% / 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, hsl(263 70% 50% / 0.15) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="p-12 md:p-16 rounded-3xl glass border border-border/50 backdrop-blur-xl">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center"
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-5xl md:text-6xl font-black mb-6">
                  Ready to Transform?
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
                  Join thousands of innovators building the future with Vinony AI
                </p>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    onClick={() => navigate('/dashboard')}
                    className="group relative gradient-primary text-primary-foreground text-xl px-12 py-8 rounded-full font-bold overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <Sparkles className="mr-2 w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                    <span>Start Free Trial</span>
                  </Button>
                </motion.div>

                <p className="mt-6 text-sm text-muted-foreground">
                  No credit card required • 14-day free trial • Cancel anytime
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default Landing;
