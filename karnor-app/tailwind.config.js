/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', //Ensure this covers your .tsx files
  ],
  theme: {
    extend: {
      colors: {
        peach: {
          100: '#F9E8C9', //Changes: Custom peach color defined here
        },
      },
    },
  },
  plugins: [],
};
