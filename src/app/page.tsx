import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TippingFeed from '@/components/TippingFeed';
import AprilFoolsReveal from '@/components/AprilFoolsReveal';
import WhyTipSdr from '@/components/WhyTipSdr';
import { TipProvider } from '@/context/TipContext';

const HomePage = () => {
  return (
    <TipProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <Hero />
          
          {/* Windows XP-style divider */}
          <div className="w-full h-6 bg-alt-bg flex items-center justify-center">
            <div className="w-32 border-t border-border"></div>
          </div>
          
          <WhyTipSdr />
          
          {/* Windows XP-style divider */}
          <div className="w-full h-6 bg-alt-bg flex items-center justify-center">
            <div className="w-32 border-t border-border"></div>
          </div>
          
          <TippingFeed />
          
          {/* Windows XP-style divider */}
          <div className="w-full h-6 bg-alt-bg flex items-center justify-center">
            <div className="w-32 border-t border-border"></div>
          </div>
          
          <AprilFoolsReveal />
        </main>
        
        {/* Windows XP-style Footer Bar */}
        <footer className="py-6 bg-accent-panel border-t border-border">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                {/* XP-style Start Button */}
                <div className="flex items-center mr-4 bg-gradient-to-t from-alt-bg to-accent-panel rounded shadow-bevel px-3 py-1 border border-border">
                  <div className="w-5 h-5 mr-2 flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="9" height="9" fill="#3B82F6" />
                      <rect x="13" y="2" width="9" height="9" fill="#EF4444" />
                      <rect x="2" y="13" width="9" height="9" fill="#10B981" />
                      <rect x="13" y="13" width="9" height="9" fill="#F59E0B" />
                    </svg>
                  </div>
                  <span className="font-bold">tips4SDRs</span>
                </div>
                
                <p className="text-sm text-text-muted">
                  {new Date().getFullYear()} | Tips4SDRs.org
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TipProvider>
  );
};

export default HomePage;
