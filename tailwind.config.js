/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'black': ['0 20px 13px rgba(0, 0 ,0,0.13)', '0 8px 5px rgba(0, 0, 0, 0.18)']
      }
    },
    screens: {
      'xs': '0px',
      'sm': '600px',
      'md': '900px',
      'lg': '1200px',
      'xl': '1536px',
    }
  },
  plugins: [],
}

