import { PublicLayout } from '@/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Starter',
      price: '$16.99',
      description: 'Perfect for individuals getting started',
      features: [
        '100 AI chat requests/month',
        '50 image generations/month',
        'GPT-4o Mini access',
        'DALL·E 3 access',
        'Email support',
        'Chat history',
      ],
      gradient: 'from-purple-500 to-pink-500',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$24.99',
      description: 'For professionals who need more power',
      features: [
        'Unlimited AI chat requests',
        '200 image generations/month',
        'GPT-4o access',
        'Claude Sonnet access',
        'DALL·E 3 access',
        'Priority support',
        'Advanced features',
        'API access',
      ],
      gradient: 'from-cyan-500 to-blue-500',
      popular: true,
    },
  ];

  return (
    <PublicLayout>
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your needs. Upgrade or downgrade anytime.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-4 py-1 rounded-full bg-gradient-primary text-white text-sm font-semibold glow-primary">
                      Most Popular
                    </span>
                  </div>
                )}

                <Card
                  className={`glass border-border/50 h-full ${
                    plan.popular ? 'border-accent glow-accent' : ''
                  }`}
                >
                  <CardHeader className="text-center pb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center glow-primary`}>
                      <span className="text-2xl font-bold text-white">{plan.name[0]}</span>
                    </div>
                    <CardTitle className="text-3xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-base">{plan.description}</CardDescription>
                    <div className="mt-6">
                      <span className="text-5xl font-bold gradient-text">{plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-5 h-5 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => navigate('/signup')}
                      className={`w-full ${
                        plan.popular
                          ? 'gradient-primary glow-primary'
                          : 'border-border hover:border-accent'
                      } hover:scale-105 transition-transform`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground mb-4">
              All plans include 7-day free trial. No credit card required.
            </p>
            <p className="text-sm text-muted-foreground">
              Need a custom plan? <a href="#" className="text-accent hover:underline">Contact us</a>
            </p>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Pricing;
