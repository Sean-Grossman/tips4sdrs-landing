"use client";

import React from 'react';

export default function AprilFoolsReveal() {
  return (
    <div className="w-full bg-primary-bg py-12 md:py-16">
      <div className="max-w-screen-md mx-auto px-4">
        {/* Combined Header and Narrative - Windows XP Style */}
        <div className="border border-border shadow-bevel bg-window rounded-md overflow-hidden mb-8">
          {/* Panel title bar */}
          <div className="bg-accent-panel px-4 py-2 flex items-center border-b border-border">
            <div className="w-3 h-3 rounded-full bg-window-close mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-window-minimize mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-window-maximize mr-2"></div>
            <h2 className="text-lg md:text-xl font-bold text-text"></h2>
          </div>
          <div className="p-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-text">The Ultimate Tip</h2>
            
            <p className="mb-4 text-text">
              If you haven't picked up on this yet--sure Tips4SDRs.org is satire. 
            </p>
            
            <p className="mb-4 text-text">
              However, Being an SDR in 2025 is harder than ever. AI is everywhere, but using it meaningfully is still a mystery. Sending emails with high deliverability is technical, and "personalized outbound" 
              now means knowing how to automate, analyze, and write—all at once. 
            </p>
            
            <p className="font-bold mb-4 text-text">
              Good Outbound is complex, technical, and time-consuming.
            </p>
            
            <p className="text-text">
              That's why we built two products to actually help.
            </p>
          </div>
        </div>

        {/* Products Section - XP Style */}
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Left Column – Orbit Labs */}
          <div className="md:w-1/2 border border-border shadow-bevel bg-window rounded-md overflow-hidden flex flex-col">
            <div className="bg-accent-panel px-4 py-2 flex items-center border-b border-border">
              <div className="w-3 h-3 rounded-full bg-window-close mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-window-minimize mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-window-maximize mr-2"></div>
              <div className="w-5 h-5 mr-2">
                <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="2" fill="#D4D0C8" stroke="#404040" />
                  <circle cx="12" cy="12" r="6" fill="#404040" />
                  <path d="M12 6V18M6 12H18" stroke="#D4D0C8" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-text">Orbit Labs</h3>
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <div>
                <p className="font-bold mb-3 text-text">Fractional SDRs for modern outbound</p>
                
                <p className="mb-4 text-text">We run your outbound motion end-to-end:</p>
                
                <ol className="list-decimal pl-6 mb-4 space-y-1 text-text">
                  <li>Set up the infrastructure</li>
                  <li>Build boutique, curated lead lists</li>
                  <li>Write tested, conversion-optimized copy</li>
                  <li>Book the meetings</li>
                </ol>
                
                <p className="font-medium text-text border-t border-border pt-3 mb-4">It's outbound on autopilot—no junior hires, no duct-taped tools, no guesswork.</p>
              </div>
            </div>
            <div className="p-4 pt-0">
              <a href="https://calendly.com/sean-reachorbit/demo" className="block w-auto border border-border rounded bg-accent-panel shadow-bevel text-text hover:bg-alt-bg text-left h-14 flex items-center">
                <div className="p-3 w-full" data-component-name="AprilFoolsReveal">
                  <span>Schedule Consultation <span className="ml-2">→</span></span>
                </div>
              </a>
            </div>
          </div>
          
          {/* Right Column – Orbit Unibox */}
          <div className="md:w-1/2 border border-border shadow-bevel bg-window rounded-md overflow-hidden flex flex-col">
            <div className="bg-accent-panel px-4 py-2 flex items-center border-b border-border">
              <div className="w-3 h-3 rounded-full bg-window-close mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-window-minimize mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-window-maximize mr-2"></div>
              <div className="w-5 h-5 mr-2">
                <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5L12 3L21 5V19L12 21L3 19V5Z" fill="#D4D0C8" stroke="#404040" />
                  <path d="M7 7.5H17V15.5H7V7.5Z" fill="#404040" />
                  <path d="M12 3V8M12 16V21" stroke="#404040" strokeWidth="1" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-text">Orbit Unibox</h3>
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <div>
                <p className="font-bold mb-3 text-text">The GTM inbox, reimagined</p>
                
                <p className="mb-3 text-text">We bring all your outbound replies into Slack—so SDRs, AEs, and GTM leads can collaborate in real time.</p>
                
                <p className="mb-2 text-text">On top of that inbox, our AI agent can:</p>
                <ul className="list-disc pl-6 space-y-1 mb-3 text-text">
                  <li>Auto-draft replies in your brand voice</li>
                  <li>Send emails directly from Slack</li>
                  <li>Classify sentiment + route replies</li>
                  <li>Enrich contacts + source new leads</li>
                  <li>Summarize meetings + auto-follow up</li>
                </ul>
              </div>
            </div>
            <div className="p-4 pt-0">
              <a href="https://orbitunibox.com" className="block w-auto border border-border rounded bg-accent-panel shadow-bevel text-text hover:bg-alt-bg text-left h-14 flex items-center">
                <div className="p-3 w-full" data-component-name="AprilFoolsReveal">
                  <span>See Unibox in Action <span className="ml-2">→</span></span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
