"use client";

import React, { useState, useEffect, useRef } from 'react';

export default function WhyWeBuilt() {
  // State for controlling typing animation and interactions
  const [typingIndex, setTypingIndex] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [scrollAttempt, setScrollAttempt] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(1); // Track scrolling speed
  const [sectionInView, setSectionInView] = useState(false);
  const [scrollLocked, setScrollLocked] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position
  const [initialScrollY, setInitialScrollY] = useState(0); // Store initial scroll position when locking
  
  // Tip input state
  const [tipValue, setTipValue] = useState('');
  const [tipSubmitted, setTipSubmitted] = useState(false);
  
  // Email input state
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
  
  // Refs for DOM elements
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tipInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Text content for each section
  const sections = [
    "When was the last time you canceled a demo two hours before the meeting?",
    "When was the last time you acted like you didn't see the SDR's email?",
    "When was the last time you reached out to a sales rep for help?",
    "SYSTEM_BREAK",
    "Your sales rep is always there for you.",
    "They smile through the reschedules.",
    "They remember to follow up every week.",
    "They're always happy to help.",
    "SYSTEM_BREAK",
    "Now, you can tip them.",
    "After the meeting.",
    "After the email.",
    "After the save.",
    "SYSTEM_BREAK",
    "Sign up yourself, or nominate your favorite rep.",
    "SYSTEM_BREAK",
    "Enter tip amount (type a percentage):",
    "SYSTEM_BREAK",
    "Enter your email or who you want to tip:",
    "SYSTEM_BREAK",
    "Thank you for using Tips4SDRs! Your nomination has been submitted.",
    "We'll let your sales rep know about your appreciation."
  ];
  
  // Current section being typed
  const currentSection = typingIndex < sections.length ? sections[typingIndex] : '';
  
  // Check if we're at the tip input section
  const atTipInputSection = currentSection === "Enter tip amount (type a percentage):";
  
  // Store initial scroll position when locking
  useEffect(() => {
    if (scrollLocked) {
      setInitialScrollY(window.scrollY);
    }
  }, [scrollLocked]);
  
  // Enhanced scroll lock: this prevents scrolling by forcing the window to stay at a fixed position
  useEffect(() => {
    if (!scrollLocked) return;
    
    // Store body styles to restore later
    const originalStyle = window.getComputedStyle(document.body);
    const originalOverflow = originalStyle.overflow;
    const originalHeight = originalStyle.height;
    const originalPosition = originalStyle.position;
    
    // Apply fixed positioning to body
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${initialScrollY}px`;
    document.body.style.width = '100%';
    
    // The wheel event listener still needed for some browsers
    const preventScroll = (e: Event) => {
      e.preventDefault();
      window.scrollTo(0, initialScrollY);
    };
    
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    
    // Force window back to initial position if it somehow scrolls
    const checkPosition = () => {
      if (window.scrollY !== initialScrollY && scrollLocked) {
        window.scrollTo(0, initialScrollY);
      }
    };
    
    // Set up interval to check scroll position
    const scrollInterval = setInterval(checkPosition, 50);
    
    return () => {
      // Clean up all listeners and restore original body styling
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      clearInterval(scrollInterval);
      
      // Restore original body styling
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
      document.body.style.position = originalPosition;
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Restore scroll position
      window.scrollTo(0, initialScrollY);
    };
  }, [scrollLocked, initialScrollY]);
  
  // Scroll event handling with enhanced speed detection
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !contentRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();
      
      // Calculate scroll speed based on change in scroll position
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      setLastScrollY(currentScrollY);
      
      // Adjust scroll speed (1-5 scale) based on how fast user is scrolling
      const newScrollSpeed = Math.min(Math.max(Math.floor(scrollDelta / 10), 1), 5);
      setScrollSpeed(newScrollSpeed);
      
      // Check if the current section is in view
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setSectionInView(true);
        
        // Lock scrolling when reaching tip input section
        if (atTipInputSection && !tipSubmitted) {
          setScrollLocked(true);
        }
        
        // If we're at the top of the content and not locked, start/continue animation
        if (rect.top <= contentRect.top + 100 && !scrollLocked) {
          setScrollAttempt(prev => prev + 1);
        }
      } else {
        setSectionInView(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollLocked, tipSubmitted, atTipInputSection, lastScrollY]);
  
  // Typing animation with speed adjustment based on scroll speed
  useEffect(() => {
    if (typingIndex >= sections.length || !currentSection || !sectionInView) return;
    
    // Skip system break markers
    if (currentSection === 'SYSTEM_BREAK') {
      setTypingIndex(typingIndex + 1);
      return;
    }
    
    let timeout: NodeJS.Timeout;
    
    if (typingText.length < currentSection.length) {
      // Adjust typing speed based on scroll speed (faster scrolling = faster typing)
      // Base typing speed is 30ms, reduce by scrollSpeed factor
      const typingDelay = Math.max(5, 30 - (scrollSpeed * 5));
      
      timeout = setTimeout(() => {
        // Type multiple characters at once if scroll speed is high
        const charsToType = Math.min(scrollSpeed, currentSection.length - typingText.length);
        const newText = currentSection.slice(0, typingText.length + charsToType);
        setTypingText(newText);
      }, typingDelay);
    } else {
      // Move to the next section after a brief pause
      timeout = setTimeout(() => {
        // Check if we're at a section where we need to stop for user input
        if (atTipInputSection) {
          setScrollLocked(true);
          
          // Auto-focus the tip input
          setTimeout(() => {
            if (tipInputRef.current) {
              tipInputRef.current.focus();
            }
          }, 100);
        } 
        else if (currentSection === "Enter your email or who you want to tip:" && tipSubmitted) {
          setScrollLocked(true);
          
          // Auto-focus the email input
          setTimeout(() => {
            if (emailInputRef.current) {
              emailInputRef.current.focus();
            }
          }, 100);
        }
        else if (!tipSubmitted || !emailSubmitted) {
          // Only advance if not waiting for user input
          setTypingIndex(typingIndex + 1);
          setTypingText('');
        }
        
        // If both inputs submitted, go to thank you message
        if (tipSubmitted && emailSubmitted) {
          const thankYouIndex = sections.findIndex(s => s === "Thank you for using Tips4SDRs! Your nomination has been submitted.");
          if (thankYouIndex > 0) {
            setTypingIndex(thankYouIndex);
            setTypingText('');
            setShowThankYouMessage(true);
            setScrollLocked(false);
          }
        }
      }, 800 / scrollSpeed); // Reduce transition delay with higher scroll speed
    }
    
    return () => clearTimeout(timeout);
  }, [typingText, typingIndex, currentSection, sectionInView, tipSubmitted, emailSubmitted, scrollSpeed, atTipInputSection]);
  
  // Process typing based on scroll attempts
  useEffect(() => {
    if (scrollAttempt === 0 || !sectionInView) return;
    
    // Skip system breaks
    if (typingIndex < sections.length && sections[typingIndex] === "SYSTEM_BREAK") {
      setTypingIndex(typingIndex + 1);
      return;
    }
    
    // Start typing animation for current section
    if (typingText.length === 0 && typingIndex < sections.length) {
      // Start with more characters based on scroll speed
      const initialChars = Math.min(scrollSpeed, currentSection.length);
      setTypingText(currentSection.slice(0, initialChars));
    }
    
    // Reset scroll attempt after starting animation
    setScrollAttempt(0);
    
    // Check if we're at the "Enter tip amount" prompt
    if (atTipInputSection) {
      // Keep scroll locked until a tip is submitted
      setScrollLocked(true);
    }
    
    // Check if we're at the email prompt - only show if tip has been submitted
    if (currentSection === "Enter your email or who you want to tip:" && tipSubmitted) {
      // Keep scroll locked until email is submitted
      setScrollLocked(true);
    }
    
  }, [scrollAttempt, currentSection, sections, typingIndex, typingText, sectionInView, tipSubmitted, scrollSpeed, atTipInputSection]);
  
  // Handle tip input change
  const handleTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and % symbol
    const value = e.target.value.replace(/[^0-9%]/g, '');
    setTipValue(value);
  };
  
  // Handle tip form submission
  const handleTipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitTip();
  };
  
  // Submit tip function
  const submitTip = () => {
    // Extract numeric value from input
    let numberValue = tipValue;
    if (numberValue.endsWith('%')) {
      numberValue = numberValue.slice(0, -1);
    }
    
    // If empty, use default 20%
    if (!numberValue) {
      numberValue = '20';
    }
    
    const numericValue = parseInt(numberValue, 10);
    
    // Validate tip is a reasonable percentage (1-100)
    if (numericValue >= 1 && numericValue <= 100) {
      // Set as submitted
      setTipSubmitted(true);
      // Unlock scrolling temporarily before moving to email input
      setScrollLocked(false);
      
      console.log('Tip submitted:', numericValue + '%');
      
      // Move to email input after a short delay
      setTimeout(() => {
        const emailPromptIndex = sections.findIndex(s => s === "Enter your email or who you want to tip:");
        if (emailPromptIndex > 0) {
          setTypingIndex(emailPromptIndex);
          setTypingText('');
          
          // Focus email input and lock scrolling again
          setTimeout(() => {
            setScrollLocked(true);
            if (emailInputRef.current) {
              emailInputRef.current.focus();
            }
          }, 100);
        }
      }, 1000);
    } else {
      // Invalid tip - show error
      alert('Please enter a valid tip percentage between 1-100%');
      setTipValue('20');
    }
  };
  
  // Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  
  // Handle email form submission
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email.includes('@') && email.length > 5) {
      submitEmail();
    } else {
      alert('Please enter a valid email address');
    }
  };
  
  // Submit email function
  const submitEmail = () => {
    if (emailSubmitted || !tipSubmitted) return;
    
    setEmailSubmitted(true);
    console.log('Email submitted:', email, 'Selected tip:', tipValue);
    
    // Show thank you message
    setTimeout(() => {
      const thankYouIndex = sections.findIndex(s => s === "Thank you for using Tips4SDRs! Your nomination has been submitted.");
      if (thankYouIndex > 0) {
        setTypingIndex(thankYouIndex);
        setTypingText('');
        setShowThankYouMessage(true);
        setScrollLocked(false);
      }
    }, 500);
  };
  
  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  // Get typed text up to current section
  const typedSections = sections.slice(0, typingIndex);
  
  // Render helpers
  const renderScrollLockIndicator = () => {
    if (scrollLocked) {
      return (
        <div className="fixed top-0 left-0 w-full z-50 bg-red-500 text-white text-center p-1 text-xs">
          Scroll locked - Press ESC to continue
        </div>
      );
    }
    return null;
  };
  
  // Rendering for typed sections
  const renderTypedSections = () => {
    return sections.slice(0, typingIndex).map((section, index) => {
      if (section === "SYSTEM_BREAK") return null;
      
      // Show active form for tip input or email input based on current section
      if (section === "Enter tip amount (type a percentage):" && !tipSubmitted) {
        return (
          <div key={index} className="mb-2">
            <div className="inline-block">
              <span className="text-base md:text-lg text-text flex items-center">
                <span className="text-text-muted mr-1">&gt;</span>
                {section}
              </span>
              
              <div className="mt-2">
                <input
                  ref={tipInputRef}
                  type="text"
                  value={tipValue}
                  onChange={(e) => setTipValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && tipValue) {
                      setTipSubmitted(true);
                      setTypingIndex(typingIndex + 1);
                    }
                  }}
                  className="px-3 py-2 border border-border shadow-inner bg-white rounded text-sm focus:outline-none w-32"
                  placeholder="%"
                />
                <button
                  onClick={() => {
                    if (tipValue) {
                      setTipSubmitted(true);
                      setTypingIndex(typingIndex + 1);
                    }
                  }}
                  className="ml-2 px-3 py-2 bg-accent-panel border border-border rounded text-xs shadow-bevel"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        );
      }
      
      if (section === "Enter your email or who you want to tip:" && !emailSubmitted) {
        return (
          <div key={index} className="mb-2">
            <div className="inline-block">
              <span className="text-base md:text-lg text-text flex items-center">
                <span className="text-text-muted mr-1">&gt;</span>
                {section}
              </span>
              
              <div className="mt-2">
                <input
                  ref={emailInputRef}
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && email) {
                      setEmailSubmitted(true);
                      setShowThankYouMessage(true);
                      setTypingIndex(typingIndex + 1);
                      setTimeout(() => setScrollLocked(false), 500);
                    }
                  }}
                  className="px-3 py-2 border border-border shadow-inner bg-white rounded text-sm focus:outline-none w-64"
                  placeholder="email@example.com"
                />
                <button
                  onClick={() => {
                    if (email) {
                      setEmailSubmitted(true);
                      setShowThankYouMessage(true);
                      setTypingIndex(typingIndex + 1);
                      setTimeout(() => setScrollLocked(false), 500);
                    }
                  }}
                  className="ml-2 px-3 py-2 bg-accent-panel border border-border rounded text-xs shadow-bevel"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        );
      }
      
      return (
        <div key={index} className="mb-2">
          <div className="inline-block">
            <span className="text-base md:text-lg text-text flex items-center">
              <span className="text-text-muted mr-1">&gt;</span>
              {index === 5 ? (
                <span>{section.slice(0, -2)}<span className="text-blue-600 bg-blue-600 animate-pulse">█</span></span>
              ) : (
                section
              )}
            </span>
          </div>
        </div>
      );
    });
  };
  
  // Render for current typing section
  const renderTypingSection = () => {
    const currentSection = typingIndex < sections.length ? sections[typingIndex] : '';
    if (currentSection === "SYSTEM_BREAK") return null;
    
    if (typingIndex >= sections.length) return null;
    
    return (
      <div className="mb-2">
        <div className="inline-block">
          <span className="text-base md:text-lg text-text flex items-center">
            <span className="text-text-muted mr-1">&gt;</span>
            {typingText}
            {cursorVisible && <span className="animate-blink">_</span>}
          </span>
        </div>
      </div>
    );
  };
  
  // Render help text
  const renderHelpText = () => {
    if (typingIndex < sections.length && !emailSubmitted) {
      return (
        <div className="mt-1 mb-4 text-center text-text-muted text-sm">Scroll to continue the story</div>
      );
    }
    return null;
  };
  
  return (
    <div className="w-full" ref={containerRef}>
      {renderScrollLockIndicator()}
      <div className="max-w-screen-md mx-auto px-4">
        <div className="py-6 md:py-12">
          <div
            className="border border-border shadow-bevel bg-window rounded-md p-4 h-[500px] md:h-[600px] overflow-hidden flex flex-col"
            onClick={() => {
              // Focus the appropriate input when clicking
              if (atTipInputSection && !tipSubmitted && tipInputRef.current) {
                tipInputRef.current.focus();
              } else if (currentSection === "Enter your email or who you want to tip:" && !emailSubmitted && emailInputRef.current) {
                emailInputRef.current.focus();
              }
            }}
          >
            <div className="flex-grow overflow-visible mb-4" ref={contentRef}>
              <div ref={sectionRef}>
                {renderTypedSections()}
                {renderTypingSection()}
              </div>
            </div>
            {renderHelpText()}
          </div>
        </div>
      </div>
    </div>
  );
}
