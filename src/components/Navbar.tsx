import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="w-full py-4 border-b border-border bg-accent-panel">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="logo">
          <Link href="/" className="font-montserrat font-bold text-logo text-link-blue">
            Tips4SDRs.org
          </Link>
        </div>
        
        {/* Mobile menu button - XP-style */}
        <div className="md:hidden">
          <button 
            aria-label="Menu" 
            className="p-2 bg-primary-bg border border-border rounded shadow-bevel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
