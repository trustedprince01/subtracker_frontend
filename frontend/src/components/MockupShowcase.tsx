
import React from 'react';

const MockupShowcase = () => {
  return (
    <section className="py-16 md:py-24 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-darkBlue-800 via-purple-900/10 to-darkBlue-800 pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-inter text-white mb-4">SubTrackr in Action</h2>
          <p className="text-gray-300 max-w-2xl mx-auto font-inter">
            See how SubTrackr helps you take control of your subscription expenses and save money.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          {/* Mockup image from user's upload */}
          <div className="rounded-xl overflow-hidden shadow-2xl border border-purple-900/30">
            <img 
              src="/backgroundimage/mockup.jpeg" 
              alt="SubTrackr Dashboard Mockup" 
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-green-500/5 rounded-full blur-xl"></div>
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-purple-500/5 rounded-full blur-xl"></div>
        </div>
        
        {/* Feature bullets */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: "Simple & Intuitive",
              description: "Easy-to-use dashboard that gives you a complete view of all your subscriptions"
            },
            {
              title: "Smart Notifications",
              description: "Get alerted before payments so you're never surprised by unexpected charges"
            },
            {
              title: "Detailed Analytics",
              description: "Visualize your spending patterns and identify savings opportunities"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-darkBlue-700/30 border border-purple-900/20 rounded-lg p-6">
              <div className="w-8 h-8 rounded-full bg-green-400/20 flex items-center justify-center mb-4">
                <span className="text-green-400 font-bold">{index + 1}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 font-inter">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MockupShowcase;
