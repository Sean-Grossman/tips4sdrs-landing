/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'background': '#EDE3DC',   // Main site background
        'primary-bg': '#EDE3DC',   // Main site background — warm and slightly desaturated
        'alt-bg': '#D8C3A5',       // Use for feed / callouts
        'accent-panel': '#F3EBE4',  // Subtle boxed areas — like XP interface panes
        'border': '#CBBEB5',       // Horizontal rules
        'cta': '#FFA500',          // CTA Buttons
        'link-blue': '#1E90FF',    // Still used for hover/active links
        text: '#2E2E2E',           // Main text color
        'text-muted': '#5A5A5A',   // Secondary text color
        'info-bg': '#E6F7FF',      // Info message background
        'info-border': '#91D5FF',  // Info message border
      },
      fontFamily: {
        sans: ['var(--font-open-sans)', 'Open Sans', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        'open-sans': ['var(--font-open-sans)', 'Open Sans', 'sans-serif'],
      },
      fontSize: {
        'h1': '56px',
        'h2': '36px',
        'h3': '28px',
        'body': '18px',
        'caption': '14px',
        'nav': '16px',
        'logo': '24px',
      },
      boxShadow: {
        'bevel': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 0 rgba(0, 0, 0, 0.2)',
        'panel': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'xp': '2px 2px 3px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
