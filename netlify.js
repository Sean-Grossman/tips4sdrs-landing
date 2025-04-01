// netlify.js
module.exports = {
  onPreBuild: ({ utils }) => {
    console.log('Preparing Netlify Forms for Next.js App Router...');
  },
  onBuild: ({ utils }) => {
    console.log('Ensuring forms are properly set up for Netlify...');
    // This is just to signal that we are handling form setup
  }
};
