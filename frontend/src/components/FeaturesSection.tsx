
import React from 'react';
import { CreditCard, Clock, BarChart, Bell, Shield, Zap } from 'lucide-react';
import { useResponsive } from '@/hooks/use-mobile';

const FeatureCard = ({ 
  icon, 
  title, 
  description,
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => {
  const { isMobile } = useResponsive();
  
  return (
    <div className="bg-darkBlue-700 rounded-xl shadow-lg p-6 border border-purple-900/20 hover:border-purple-500/30 transition-all duration-300 bg-opacity-60 backdrop-blur-sm animate-fade-in h-full flex flex-col">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-900/30 text-green-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white font-inter">{title}</h3>
      <p className="text-gray-300 text-sm md:text-base">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <CreditCard size={22} />,
      title: 'Track Everything',
      description: 'Monitor all your subscriptions in one comprehensive dashboard with detailed payment history.',
    },
    {
      icon: <Clock size={22} />,
      title: 'Smart Reminders',
      description: 'Get notified before payments so you\'re never caught by surprise. Customize your alert preferences.',
    },
    {
      icon: <BarChart size={22} />,
      title: 'Data Analytics',
      description: 'Visualize your spending patterns and identify opportunities to optimize your subscription costs.',
    },
    {
      icon: <Bell size={22} />,
      title: 'Price Alerts',
      description: 'Receive notifications when subscription prices change so you can reevaluate your services.',
    },
    {
      icon: <Shield size={22} />,
      title: 'Secure Storage',
      description: 'Your subscription data is encrypted and securely stored with bank-level security protocols.',
    },
    {
      icon: <Zap size={22} />,
      title: 'Easy Integration',
      description: 'Connect with your email accounts to automatically detect and import subscription information.',
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-green-400 text-sm md:text-base font-medium mb-2 block">WHY CHOOSE US</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-inter">
            All Your Subscriptions, <span className="gradient-text">One Platform</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            SubTrackr helps you keep track of all your recurring payments in one place
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
        
        <div className="mt-20 text-center bg-darkBlue-700/60 backdrop-blur-sm p-8 rounded-xl border border-purple-900/20">
          <h3 className="text-2xl font-bold text-green-400 mb-4 font-inter">Users saved an average of $240/year</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            By identifying forgotten and unused subscriptions, our users cut unnecessary expenses and put money back in their pockets.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
