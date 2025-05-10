import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useResponsive } from '@/hooks/use-mobile';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMobile } = useResponsive();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen ? 'bg-darkBlue-800/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="text-xl md:text-2xl font-bold text-green-400 flex items-center">
            <img 
              src="/activity.png" 
              alt="SubTrackr Logo" 
              className="w-6 h-6 md:w-8 md:h-8 mr-2"
              style={{ display: 'inline-block', verticalAlign: 'middle' }}
            />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500 font-inter">
              SubTrackr
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/#features" className="text-gray-300 hover:text-green-400 transition-colors text-sm font-medium">Features</Link>
          <Link to="/#pricing" className="text-gray-300 hover:text-green-400 transition-colors text-sm font-medium">Pricing</Link>
          <Link to="/#faq" className="text-gray-300 hover:text-green-400 transition-colors text-sm font-medium">FAQ</Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild className="text-gray-300 hover:text-green-400 hover:bg-darkBlue-700/50">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="bg-green-400 hover:bg-green-500 text-gray-900 font-medium">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-green-400"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-darkBlue-800/95 backdrop-blur-md border-t border-purple-900/20">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <Link 
              to="/#features"
              className="text-gray-300 hover:text-green-400 py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/#pricing"
              className="text-gray-300 hover:text-green-400 py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/#faq"
              className="text-gray-300 hover:text-green-400 py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <div className="flex flex-col space-y-3 pt-2">
              <Button 
                variant="ghost" 
                asChild 
                className="text-gray-300 hover:text-green-400 hover:bg-darkBlue-700/50 w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button 
                asChild 
                className="bg-green-400 hover:bg-green-500 text-gray-900 w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
