export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'playwrite': [ "Playwrite GB S", "cursive"],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'bawejas-colour':{
          500:'#24353E',
        }
      },
      backgroundImage: {
        'background-pattern': "url('architect.svg')"
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-zoom': 'pulseZoom 3s ease-in-out infinite',
        'blink-scale': 'blinkScale 2s ease-in-out infinite',
        'wave': 'wave 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'rotate-flicker': 'rotateFlicker 4s ease-in-out infinite',
      },
      keyframes: {
        blinkScale: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.7' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        rotateFlicker: {
          '0%, 100%': { transform: 'rotate(0deg)', opacity: '1' },
          '50%': { transform: 'rotate(10deg)', opacity: '0.8' },
        },
        pulseZoom: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
        },
      },
      dropShadow: {
        glow: '0 0 15px rgba(59, 130, 246, 0.7), 0 0 30px rgba(59, 130, 246, 0.6)',  // Universal glow effect
        fastapi: '0 0 15px rgba(34, 197, 94, 0.7), 0 0 30px rgba(34, 197, 94, 0.6)',
        python: '0 0 10px rgba(255, 193, 7, 0.7)',
        openweathermap: '0 0 15px rgba(255, 165, 0, 0.6)',
        d3: '0 0 10px rgba(255, 87, 34, 0.6)',
        vite: '0 0 15px rgba(138, 43, 226, 0.6)',
      },
    },
  },
  plugins: [],
}
