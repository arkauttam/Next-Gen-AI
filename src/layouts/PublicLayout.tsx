import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-50 glass"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gradient-primary glow-primary group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Vinony AI</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/pricing')}
              className="hover:text-accent transition-colors"
            >
              Pricing
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="border-border hover:border-accent transition-colors"
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate('/dashboard')}
              className="gradient-primary glow-primary hover:scale-105 transition-transform"
            >
              Get Started
            </Button>
          </div>
        </div>
      </motion.nav>

      <main>{children}</main>

      <footer className="border-t border-border/50 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Vinony AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
