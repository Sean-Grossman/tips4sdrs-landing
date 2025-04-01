"use client";

import React from 'react';

const WhyTipSdr = () => {
  return (
    <section className="py-12 md:py-16 bg-primary-bg" data-component-name="WhyTipSdr">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-text">Why Tip Your SDR?</h2>
            <p className="text-xl md:text-2xl font-medium mb-8 text-text">Behind every closed deal is an SDR quietly doing the hard stuff. There are so many AI companies this year threatening to put them out of a job, and it's becoming harder and harder to run reliable outbound.</p>
            
            <div className="mb-8">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-5 h-5 mt-1 mr-3 flex-shrink-0">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="text-link-blue">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-text text-lg">They're the ones rescheduling your meetings when the buyer ghosts.</p>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 mt-1 mr-3 flex-shrink-0">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="text-link-blue">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-text text-lg">They're fielding product questions when support drops the ball.</p>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 mt-1 mr-3 flex-shrink-0">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="text-link-blue">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-text text-lg">They're working late nights so you can hit your number.</p>
                </li>
              </ul>
            </div>
            
            <p className="text-text text-xl mb-8">
              This year, we want to say thanks in the most literal way possible—
              <span className="font-bold">by letting you tip them.</span>
            </p>
            
            <div className="bg-alt-bg p-5 border border-border shadow-bevel rounded-md">
              <p className="text-text text-xl font-bold mb-2">Tip Your Rep is like Venmo for Sales Reps.</p>
              <p className="text-text-muted text-lg">Show your appreciation with more than just a thank you email.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTipSdr;
