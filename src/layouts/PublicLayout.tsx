import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      
      {/* FLOATING NAVBAR */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-4 z-50 w-full flex justify-center px-4`}
      >
        {/* Navbar Container */}
        <div className={`flex items-center justify-between w-full max-w-7xl
          rounded-full px-6 transition-all duration-300 shadow-lg
          ${isScrolled
            ? "glass backdrop-blur-xl border border-white/10 py-2 shadow-xl bg-white/20"
            : "bg-white/10 backdrop-blur-lg py-4"
          }
        `}>
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gradient-primary glow-primary group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Vinony AI</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
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

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-accent/10 transition"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU DROPDOWN UNDER NAVBAR */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-24 w-full flex justify-center px-4 z-40 fixed top-0"
          >
            <div className="flex flex-col gap-3 w-full max-w-7xl bg-background/90 backdrop-blur-lg rounded-xl p-4 shadow-lg">
              <Button 
                variant="ghost" 
                onClick={() => { setOpen(false); navigate('/pricing'); }}
                className="w-full"
              >
                Pricing
              </Button>

              <Button 
                variant="outline" 
                onClick={() => { setOpen(false); navigate('/login'); }}
                className="w-full"
              >
                Login
              </Button>

              <Button 
                onClick={() => { setOpen(false); navigate('/dashboard'); }}
                className="w-full gradient-primary glow-primary"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <main className="pt-28">
        {children}
      </main>

      <footer className="border-t border-border/50 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Vinony AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
