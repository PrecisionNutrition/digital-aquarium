/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aqua: {
          50: '#e6f7ff',
          100: '#bae7ff',
          200: '#91d5ff',
          300: '#69c0ff',
          400: '#40a9ff',
          500: '#1890ff',
          600: '#096dd9',
          700: '#0050b3',
          800: '#003a8c',
          900: '#002766',
        }
      },
      animation: {
        'swim': 'swim 10s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'bubble': 'bubble 8s ease-in-out infinite',
      },
      keyframes: {
        swim: {
          '0%, 100%': { transform: 'translateX(0px) translateY(0px)' },
          '25%': { transform: 'translateX(50px) translateY(-10px)' },
          '50%': { transform: 'translateX(100px) translateY(0px)' },
          '75%': { transform: 'translateX(50px) translateY(10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        bubble: {
          '0%': { transform: 'translateY(100vh) scale(0)' },
          '10%': { transform: 'scale(1)' },
          '100%': { transform: 'translateY(-100vh) scale(0)' },
        }
      }
    },
  },
  plugins: [],
  // Important for Material UI compatibility
  corePlugins: {
    preflight: false,
  },
  important: '#root',
}
