/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'bawejas-colour':{
          500:'#24353E',
        }
      },
      backgroundImage: {
        'background-pattern': "url('architect.svg')"
      }
    },
  },
  plugins: [],
}

