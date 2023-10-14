/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        '400': '400px',
      },
      maxWidth: {
        '420': '420px',
      },
      dropShadow: {
        '3xl': '0 35px 35px rgba(246, 264, 255, 0.5)',
      },
      zIndex: {
        '1': '1',
        '2': '2'
      }
    },
  },
  plugins: [],
}

