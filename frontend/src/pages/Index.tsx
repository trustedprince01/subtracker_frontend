
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import FeaturesTabs from '@/components/FeaturesTabs';
import MockupShowcase from '@/components/MockupShowcase';
import Footer from '@/components/Footer';

const Index = () => {
  // Handle anchor link smooth scrolling
  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    };

    // Handle initial hash if present
    handleHashChange();

    // Add listener for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-darkBlue-800 font-inter">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <MockupShowcase />
        <FeaturesTabs />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
