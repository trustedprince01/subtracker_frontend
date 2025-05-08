
import React, { useState } from 'react';
import { Calendar, CreditCard, BarChart, Bell } from 'lucide-react';
import { useResponsive } from '@/hooks/use-mobile';

interface FeatureTabProps {
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const FeatureTab = ({ icon, title, isActive, onClick }: FeatureTabProps) => (
  <button
    className={`flex flex-col items-center justify-center p-4 relative ${
      isActive ? 'text-green-400' : 'text-gray-400 hover:text-gray-200'
    } transition-colors`}
    onClick={onClick}
  >
    <div className="mb-2">{icon}</div>
    <span className="text-sm font-medium font-inter">{title}</span>
    {isActive && (
      <div className="absolute bottom-0 left-1/2 w-16 h-0.5 bg-green-400 transform -translate-x-1/2"></div>
    )}
  </button>
);

const features = [
  {
    icon: <Calendar size={24} />,
    title: 'Payment Tracking',
    content: (
      <div className="p-6 md:p-12 bg-darkBlue-700/50 rounded-xl shadow-lg border border-purple-900/20">
        <h3 className="text-2xl font-semibold text-white mb-4 font-inter">Never Miss A Payment</h3>
        <p className="text-gray-300 mb-6">Track all your subscription renewal dates and get notified before you're charged. Stay on top of every payment cycle with our intuitive calendar view.</p>
        <div className="bg-darkBlue-800/70 p-6 rounded-lg border border-purple-900/30">
          <div className="flex flex-col space-y-4">
            {[
              { name: 'Netflix', date: 'May 15', status: 'Upcoming', amount: '$19.99' },
              { name: 'Spotify', date: 'May 22', status: 'Upcoming', amount: '$9.99' },
              { name: 'Adobe CC', date: 'June 1', status: 'Upcoming', amount: '$59.99' }
            ].map((payment, i) => (
              <div key={i} className="flex justify-between items-center p-3 border-b border-purple-900/10 last:border-0">
                <div>
                  <p className="font-medium text-white font-inter">{payment.name}</p>
                  <p className="text-sm text-gray-400">{payment.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-400">{payment.amount}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-900/40 text-purple-300">
                    {payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    icon: <CreditCard size={24} />,
    title: 'Budget Control',
    content: (
      <div className="p-6 md:p-12 bg-darkBlue-700/50 rounded-xl shadow-lg border border-purple-900/20">
        <h3 className="text-2xl font-semibold text-white mb-4">Optimize Your Spending</h3>
        <p className="text-gray-300 mb-6">Get a clear overview of your subscription expenses and identify opportunities to save. Set budget limits and receive alerts when you're approaching them.</p>
        <div className="bg-darkBlue-800/70 p-6 rounded-lg border border-purple-900/30">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-gray-400">Monthly Budget</p>
              <p className="text-2xl font-semibold text-white">$150.00</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Current Spending</p>
              <p className="text-2xl font-semibold text-green-400">$89.97</p>
            </div>
          </div>
          <div className="w-full h-2 bg-darkBlue-900 rounded-full overflow-hidden">
            <div className="h-full bg-green-400" style={{ width: '60%' }}></div>
          </div>
          <p className="text-sm text-gray-400 mt-2">60% of budget used</p>
        </div>
      </div>
    )
  },
  {
    icon: <BarChart size={24} />,
    title: 'Analytics',
    content: (
      <div className="p-6 md:p-12 bg-darkBlue-700/50 rounded-xl shadow-lg border border-purple-900/20">
        <h3 className="text-2xl font-semibold text-white mb-4">Data-Driven Insights</h3>
        <p className="text-gray-300 mb-6">Visualize your spending patterns and track changes over time. Understand where your money goes with detailed analytics and reports.</p>
        <div className="bg-darkBlue-800/70 p-6 rounded-lg border border-purple-900/30">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 rounded-lg bg-darkBlue-900/50">
              <p className="text-sm text-gray-400">Entertainment</p>
              <p className="text-xl font-medium text-white">$29.98</p>
              <p className="text-xs text-gray-400">+5% from last month</p>
            </div>
            <div className="p-3 rounded-lg bg-darkBlue-900/50">
              <p className="text-sm text-gray-400">Productivity</p>
              <p className="text-xl font-medium text-white">$59.99</p>
              <p className="text-xs text-gray-400">No change</p>
            </div>
          </div>
          <div className="flex h-24 items-end justify-between px-2">
            <div className="w-8 bg-purple-500/70 rounded-t" style={{height: '60%'}}></div>
            <div className="w-8 bg-purple-500/70 rounded-t" style={{height: '40%'}}></div>
            <div className="w-8 bg-purple-500/70 rounded-t" style={{height: '75%'}}></div>
            <div className="w-8 bg-purple-500/70 rounded-t" style={{height: '55%'}}></div>
            <div className="w-8 bg-green-400/70 rounded-t" style={{height: '90%'}}></div>
            <div className="w-8 bg-purple-500/70 rounded-t" style={{height: '45%'}}></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>
      </div>
    )
  },
  {
    icon: <Bell size={24} />,
    title: 'Notifications',
    content: (
      <div className="p-6 md:p-12 bg-darkBlue-700/50 rounded-xl shadow-lg border border-purple-900/20">
        <h3 className="text-2xl font-semibold text-white mb-4">Stay Informed</h3>
        <p className="text-gray-300 mb-6">Receive timely notifications about upcoming charges, price changes, and renewal dates. Never be surprised by an unexpected subscription charge again.</p>
        <div className="bg-darkBlue-800/70 p-6 rounded-lg border border-purple-900/30">
          <div className="flex flex-col space-y-4">
            {[
              { type: 'payment', message: 'Netflix payment due in 3 days', time: '2h ago' },
              { type: 'alert', message: 'Spotify increased their price by $1', time: '1d ago' },
              { type: 'info', message: 'Your monthly summary is ready to view', time: '2d ago' }
            ].map((notification, i) => (
              <div key={i} className="flex items-start p-3 rounded-lg bg-darkBlue-900/30">
                <div className={`p-2 rounded-full mr-3 ${
                  notification.type === 'payment' ? 'bg-purple-900/50 text-purple-300' :
                  notification.type === 'alert' ? 'bg-amber-900/50 text-amber-300' :
                  'bg-blue-900/50 text-blue-300'
                }`}>
                  {notification.type === 'payment' ? <Calendar size={16} /> :
                   notification.type === 'alert' ? <CreditCard size={16} /> :
                   <Bell size={16} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-200">{notification.message}</p>
                  <p className="text-xs text-gray-400">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
];

const FeaturesTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { isMobile } = useResponsive();
  
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-green-400 text-sm md:text-base font-medium mb-2 block">KEY FEATURES</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-inter">Everything You Need to Manage Subscriptions</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore the powerful tools and features that make SubTrackr the ultimate subscription management platform.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-8 overflow-x-auto pb-2 no-scrollbar">
            <div className={`flex ${isMobile ? 'space-x-4' : 'space-x-8'}`}>
              {features.map((feature, index) => (
                <FeatureTab
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  isActive={activeTab === index}
                  onClick={() => setActiveTab(index)}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 animate-fade-in transition-all duration-300">
            {features[activeTab].content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesTabs;
