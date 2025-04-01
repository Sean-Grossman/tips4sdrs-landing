"use client";

import React, { useState, useEffect } from 'react';
import { useTips } from '../context/TipContext';

// Base statistics for the start of the day
const BASE_TIP_STATS = {
  count: 473,
  totalValue: 3845
};

// Maximum values for end of day (11:59 PM)
const MAX_TIP_STATS = {
  count: 10213,  // Max tip count by end of day
  totalValue: 86033  // Max dollar value by end of day
};

const Hero = () => {
  const [email, setEmail] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [showTipForm, setShowTipForm] = useState(false);
  const { addTip } = useTips();
  
  // Dynamic tip statistics that increase over time
  const [tipStats, setTipStats] = useState(BASE_TIP_STATS);
  
  // Effect to calculate tip statistics based on time of day
  useEffect(() => {
    // Function to calculate values based on time of day
    const calculateTimeBasedStats = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      // Calculate how far through the day we are (0.0 to 1.0)
      // 0.0 = midnight (start of day), 1.0 = 11:59 PM (end of day)
      const minutesSinceMidnight = currentHour * 60 + currentMinute;
      const totalMinutesInDay = 24 * 60;
      const dayProgress = minutesSinceMidnight / totalMinutesInDay;
      
      // Apply a slight curve to make growth accelerate toward end of day
      // Using a power function to create a curve (n^1.5 grows faster later in the day)
      const growthFactor = Math.pow(dayProgress, 1.5);
      
      // Calculate current values based on progress through the day
      const tipCount = Math.floor(BASE_TIP_STATS.count + 
                        (MAX_TIP_STATS.count - BASE_TIP_STATS.count) * growthFactor);
      
      const tipValue = Math.floor(BASE_TIP_STATS.totalValue + 
                        (MAX_TIP_STATS.totalValue - BASE_TIP_STATS.totalValue) * growthFactor);
      
      setTipStats({
        count: tipCount,
        totalValue: tipValue
      });
    };
    
    // Calculate initial values
    calculateTimeBasedStats();
    
    // Update values every minute
    const interval = setInterval(calculateTimeBasedStats, 60000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);
  
  // Tip form states
  const [tipFormData, setTipFormData] = useState({
    name: '',
    email: '',
    recipientName: '',
    recipientEmail: '',
    message: '',
    tipAmount: ''
  });
  const [tipFormSubmitted, setTipFormSubmitted] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) return;
    
    try {
      // With Netlify Forms, the form will be submitted directly to Netlify
      // We're just handling the client-side UX here
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      setEmail('');
      
      // Still store in localStorage for immediate feedback
      localStorage.setItem('subscribedEmail', email);
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  
  const handleTipFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTipFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleTipFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!tipFormData.name || !tipFormData.email || !tipFormData.recipientName || !tipFormData.tipAmount) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tipFormData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Convert tipAmount to a number
    const amount = parseFloat(tipFormData.tipAmount.replace(/[^0-9.]/g, ''));
    
    try {
      // Add the tip to our context for immediate UI and reaction system update
      addTip({
        sender: tipFormData.name,
        recipient: tipFormData.recipientName,
        amount: isNaN(amount) ? 10 : amount, // Default to 10 if parsing fails
        note: tipFormData.message || 'Thanks for your help!'
      });
      
      // With Netlify Forms, the form data will be automatically collected
      // No need for custom API calls
      
      // Show success state
      setTipFormSubmitted(true);
      
      // Close form after delay
      setTimeout(() => {
        setTipFormSubmitted(false);
        setShowTipForm(false);
        // Reset form
        setTipFormData({
          name: '',
          email: '',
          recipientName: '',
          recipientEmail: '',
          message: '',
          tipAmount: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting tip:', error);
      // Still show success since the tip was added to context
      setTipFormSubmitted(true);
      
      setTimeout(() => {
        setTipFormSubmitted(false);
        setShowTipForm(false);
        setTipFormData({
          name: '',
          email: '',
          recipientName: '',
          recipientEmail: '',
          message: '',
          tipAmount: ''
        });
      }, 3000);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-primary-bg relative">
      {/* Windows XP-style notification popup */}
      {showNotification && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-in-top">
          <div className="bg-[#F5F1E4] border border-[#75736D] rounded-md w-80 shadow-bevel">
            <div className="bg-gradient-to-r from-[#0057A7] to-[#097DD5] py-1.5 px-2 flex justify-between items-center rounded-t-md">
              <div className="flex items-center">
                <span className="text-white text-sm font-semibold">Information</span>
              </div>
              <button 
                onClick={() => setShowNotification(false)}
                className="text-white font-bold text-xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm">
                Thx for doing that — you saved me from sending one of those 'we noticed you lurking' emails.
              </p>
              <div className="mt-3 flex justify-end">
                <button 
                  onClick={() => setShowNotification(false)}
                  className="px-4 py-1 bg-[#ECE9D8] border border-[#7F9DB9] rounded text-sm shadow-bevel"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Tip Form Popup */}
      {showTipForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-[#F5F1E4] border border-[#75736D] rounded-md w-full max-w-md max-h-[90vh] overflow-y-auto shadow-bevel">
            <div className="bg-gradient-to-r from-[#0057A7] to-[#097DD5] py-1.5 px-2 flex justify-between items-center rounded-t-md">
              <div className="flex items-center">
                <span className="text-white text-sm font-semibold">Tip a Rep</span>
              </div>
              <button 
                onClick={() => setShowTipForm(false)}
                className="text-white font-bold text-xl leading-none"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              {tipFormSubmitted ? (
                <div className="flex flex-col items-center justify-center py-6">
                  <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <h3 className="text-xl font-bold text-text mb-2">Tip Submitted!</h3>
                  <p className="text-text-muted text-center">
                    Your tip has been submitted successfully.
                  </p>
                </div>
              ) : (
                <form 
                  name="tip-submission" 
                  method="POST" 
                  data-netlify="true"
                  data-netlify-recaptcha="true"
                  onSubmit={handleTipFormSubmit} 
                  className="space-y-4"
                >
                  <input type="hidden" name="form-name" value="tip-submission" />
                  <input type="hidden" name="bot-field" />
                  <h3 className="text-lg font-bold text-text mb-2" data-component-name="Hero">Send a tip to your sales rep</h3>
                  <p className="text-sm text-text-muted mb-2 bg-info-bg border border-info-border p-2 rounded" data-component-name="Hero">
                    By tipping a rep, we'll email you and whoever you tip a 1-month free access to the Slack Unibox.
                  </p>
                  
                  
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-1">Your Name*</label>
                    <input 
                      type="text" 
                      name="name"
                      value={tipFormData.name}
                      onChange={handleTipFormChange}
                      className="px-3 py-2 w-full border border-border shadow-inner bg-white rounded text-sm focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-1">Your Email*</label>
                    <input 
                      type="email" 
                      name="email"
                      value={tipFormData.email}
                      onChange={handleTipFormChange}
                      className="px-3 py-2 w-full border border-border shadow-inner bg-white rounded text-sm focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-1">Rep Name*</label>
                    <input 
                      type="text" 
                      name="recipientName"
                      value={tipFormData.recipientName}
                      onChange={handleTipFormChange}
                      className="px-3 py-2 w-full border border-border shadow-inner bg-white rounded text-sm focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-1">Rep Email</label>
                    <input 
                      type="email" 
                      name="recipientEmail"
                      value={tipFormData.recipientEmail}
                      onChange={handleTipFormChange}
                      className="px-3 py-2 w-full border border-border shadow-inner bg-white rounded text-sm focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-1">Tip Amount*</label>
                    <input 
                      type="text" 
                      name="tipAmount"
                      value={tipFormData.tipAmount}
                      onChange={handleTipFormChange}
                      className="px-3 py-2 w-full border border-border shadow-inner bg-white rounded text-sm focus:outline-none"
                      placeholder="20%"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-1">Message</label>
                    <textarea 
                      name="message"
                      value={tipFormData.message}
                      onChange={handleTipFormChange}
                      className="px-3 py-2 w-full border border-border shadow-inner bg-white rounded text-sm focus:outline-none"
                      rows={3}
                      placeholder="Thanks for all your help!"
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-2">
                    <button 
                      type="button"
                      onClick={() => setShowTipForm(false)}
                      className="px-4 py-1 bg-[#ECE9D8] border border-[#7F9DB9] rounded text-sm shadow-bevel"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-4 py-1 bg-gradient-to-b from-[#0057A7] to-[#097DD5] text-white border border-[#0057A7] rounded text-sm shadow-sm"
                    >
                      Submit Tip
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-8">
          {/* Left Column (Text Block) - XP-style panel */}
          <div className="md:w-1/2 space-y-5 flex flex-col justify-center h-full px-5 py-4 border border-border shadow-bevel bg-window rounded-md">
            <div>
              <span className="font-medium text-white px-3 py-1.5 rounded bg-gradient-to-b from-blue-500 to-blue-700 border border-blue-800 shadow-sm inline-block">
                Introducing Tips4SDRs
              </span>
            </div>
            
            <h1 className="font-montserrat font-bold text-3xl md:text-4xl text-text uppercase tracking-tight leading-tight">
              A tipping platform for sales teams.
            </h1>
            <hr className="xp-divider" />
            
            <div className="space-y-3">
              <p className="text-lg text-text-muted font-medium">
                Join the tipping platform designed exclusively for sales professionals.
              </p>
            </div>
            
            {/* Statistics in two columns with footnotes */}
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="bg-white border border-border shadow-bevel flex flex-col justify-center items-center h-24 py-2 hover:bg-blue-50 transition-colors w-4/5 mx-auto">
                <span className="block font-semibold text-link-blue text-xl text-center">
                  {tipStats.count}*
                </span>
                <span className="block text-sm text-center mt-1">
                  tips
                </span>
              </div>
              <div className="bg-white border border-border shadow-bevel flex flex-col justify-center items-center h-24 py-2 hover:bg-blue-50 transition-colors w-4/5 mx-auto">
                <span className="block font-semibold text-link-blue text-xl text-center">
                  ${tipStats.totalValue.toLocaleString()}**
                </span>
                <span className="block text-sm text-center mt-1">
                  Tipped on Platform
                </span>
              </div>
            </div>
            
            <div className="pt-3 text-center space-y-3">
              {/* Email subscription form */}
              <form 
                name="subscribe" 
                method="POST" 
                data-netlify="true"
                onSubmit={handleEmailSubmit}
                className="flex flex-col mb-4 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2"
              >
                <input type="hidden" name="form-name" value="subscribe" />
                <input type="hidden" name="bot-field" />
                <input 
                  type="email"
                  name="email" 
                  placeholder="Enter your email"
                  className="px-3 py-2 w-full border border-border shadow-inner bg-white rounded text-sm focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button 
                  type="submit"
                  className="ml-2 px-3 py-2 bg-gradient-to-b from-blue-500 to-blue-700 text-white border border-blue-800 rounded text-sm shadow-sm"
                >
                  Subscribe
                </button>
              </form>
              
              {/* Divider with -or- text */}
              <div className="flex items-center justify-center">
                <hr className="w-12 border-t border-border" />
                <span className="px-3 text-xs text-text-muted">-or-</span>
                <hr className="w-12 border-t border-border" />
              </div>
              
              <button 
                onClick={() => setShowTipForm(true)}
                className="cta-button inline-block"
              >
                Tip a Rep
              </button>
            </div>
            
            {/* Footnotes moved below button */}
            <div className="mt-1 text-[10px] text-gray-400">
              <div style={{ transform: 'scale(0.7)', transformOrigin: 'left top' }} className="mb-0 pb-0">
                <small className="block leading-[10px]">*These numbers are definitely real.</small>
                <small className="block leading-[10px]">**As long as you add Orbit to your sales team's tech stack.</small>
                <small className="block leading-[10px]">***Tips4SDRs is a satire platform. We do not facilitate actual cash transactions or payments. April Fool's 2025.</small>
              </div>
            </div>
          </div>

          {/* Right Column (Image) - XP-style frame */}
          <div className="md:w-1/2 flex justify-center items-center h-full py-4">
            <div className="relative w-full max-w-[400px] border border-border shadow-bevel bg-window rounded-md p-2">
              {/* Using the provided hero image */}
              <img 
                src="/images/Hero2Updated.png" 
                alt="Young SDR in an oversized suit holding a WeWork mug" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
