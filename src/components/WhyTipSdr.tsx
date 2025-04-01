"use client";

import React from 'react';

const WhyTipSdr = () => {
  return (
    <section className="py-12 md:py-16 bg-primary-bg" data-component-name="WhyTipSdr">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl border border-border shadow-bevel bg-window rounded-md overflow-hidden">
            {/* Panel title bar */}
            <div className="bg-accent-panel px-4 py-2 flex items-center border-b border-border">
              <div className="w-3 h-3 rounded-full bg-window-close mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-window-minimize mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-window-maximize mr-2"></div>
              <h2 className="text-lg md:text-xl font-bold text-text">Why Tip Your SDR?</h2>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-text">Behind every closed deal is an SDR quietly doing the hard stuff.</h2>
              
              <div className="mb-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-5 h-5 mt-1 mr-2 flex-shrink-0">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="text-link-blue">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-text text-lg">They're the ones rescheduling your meetings when the buyer ghosts.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 mt-1 mr-2 flex-shrink-0">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="text-link-blue">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-text text-lg">They're fielding product questions when support drops the ball.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 mt-1 mr-2 flex-shrink-0">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="text-link-blue">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-text text-lg">They're working late nights so you can hit your number.</p>
                  </li>
                </ul>
              </div>
              
              <p className="text-text text-lg mb-6">
                This year, we want to say thanks in the most literal way possible—
                <span className="font-bold">by letting you tip them.</span>
              </p>
              
              <div className="bg-alt-bg p-4 border border-border shadow-bevel rounded-md">
                <p className="text-text text-xl font-bold mb-2">Tip Your Rep is like Venmo for Sales Reps.</p>
                <p className="text-text-muted">Show your appreciation with more than just a thank you email.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTipSdr;
