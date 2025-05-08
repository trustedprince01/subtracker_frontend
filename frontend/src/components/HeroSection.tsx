import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useResponsive } from '@/hooks/use-mobile';
import netflixIcon from '@/assets/netflix.png';
import spotifyIcon from '@/assets/spotify.png';
import adobeIcon from '@/assets/adobe.png';
import notionIcon from '@/assets/notion.png';

const ParticleBackground = () => {
  const [particles, setParticles] = React.useState<Array<{id: number, x: number, y: number, size: number, duration: number}>>([]);
  
  React.useEffect(() => {
    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 2,
          duration: Math.random() * 20 + 10
        });
      }
      setParticles(newParticles);
    };
    
    createParticles();
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <div 
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  const { isMobile } = useResponsive();
  
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 md:pt-32 lg:pt-20 pb-16 md:pb-24 overflow-hidden bg-gradient-to-br from-darkBlue-800 via-purple-900/20 to-darkBlue-800">
      <ParticleBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center gap-12">
          {/* Left Column - Text Content */}
          <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
            <div className="inline-block rounded-full bg-purple-900/30 px-4 py-2 mb-6 animate-fade-in">
              <p className="text-sm md:text-base text-green-300 font-medium">
                Track. Manage. Save. One Platform <span className="text-green-300">#</span>
              </p>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight animate-fade-in leading-tight font-inter">
              Infinite <span className="gradient-text">Subscription</span> <br className="hidden md:block" />Possibilities
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl animate-fade-in font-inter">
              Whether you're tracking personal expenses or managing business subscriptions,
              SubTrackr adapts to your unique needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in justify-center">
              <Button size="lg" className="bg-green-400 hover:bg-green-500 text-gray-900 text-lg font-medium button-glow h-14 px-8">
                <Link to="/signup">Get Started Free</Link>
              </Button>
              
              <Button variant="outline" size="lg" className="border-purple-300 text-purple-300 hover:bg-purple-900 hover:bg-opacity-20 text-lg h-14">
                <Link to="/#how-it-works" className="flex items-center justify-center">
                  <Play size={18} className="mr-2" />
                  Watch Demo
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Right Column - Subscription Preview */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 relative">
            <div className="absolute -top-10 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
            <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-green-500/10 rounded-full blur-xl"></div>
            
            <div className="relative z-10 bg-darkBlue-700 rounded-xl shadow-2xl p-6 md:p-8 border border-purple-900/20 bg-opacity-60 backdrop-blur-sm mx-auto animate-float">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white font-inter">Your Subscriptions</h3>
                <span className="text-green-400 font-medium text-lg">$89.97/mo</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Netflix', icon: netflixIcon, price: '$19.99', date: '15' }, 
                  { name: 'Spotify', icon: spotifyIcon, price: '$9.99', date: '22' },
                  { name: 'Adobe CC', icon: adobeIcon, price: '$59.99', date: '1' },
                  { name: 'Notion', icon: notionIcon, price: '$8.00', date: '12' },
                ].map((sub, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-darkBlue-800/60 rounded-lg border border-purple-900/20 hover:border-purple-500/30 transition-all duration-300">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <img 
                          src={sub.icon} 
                          alt={sub.name} 
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-200">{sub.name}</p>
                        <p className="text-sm text-gray-400">Renews on the {sub.date}th</p>
                      </div>
                    </div>
                    <span className="font-medium text-gray-200">{sub.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      
      {/* Animated gradient background */}
      <div className="absolute top-0 left-0 right-0 h-full overflow-hidden -z-10">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-purple-600/10 rounded-full animate-pulse blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-green-600/10 rounded-full animate-pulse blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
