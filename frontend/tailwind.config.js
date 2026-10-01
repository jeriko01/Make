/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Primary brand dark color palette
        brand: {
          DEFAULT: '#39A751',
          bg: '#0e0e0e',
          dark: '#000000',
          card: '#141714',
          surface: '#161d15',
          'surface-accent': '#1e2b1a',
          border: '#1e261d',
          'border-light': 'rgba(255, 255, 255, 0.12)',
          green: '#39A751',
          'green-hover': '#2f9946',
          'green-neon': '#52fe7d',
          text: '#ffffff',
          muted: '#d2d7dc',
          subtle: '#8a949e',
          400: '#52fe7d',
          500: '#39A751',
          600: '#2f9946',
        },

        // Dark surfaces mapped for compatibility
        canvas: {
          50:  '#0e0e0e',
          100: '#141714',
          200: '#1e261d',
          300: '#2a3629',
        },

        // Graphite dark scale
        graphite: {
          950: '#0e0e0e',
          900: '#141714',
          800: '#161d15',
          700: '#1e2b1a',
          600: '#2b3b29',
          500: '#8a949e',
          400: '#a3acb5',
          300: '#d2d7dc',
          200: '#e4e7ea',
          100: '#ffffff',
        },

        // Vibrant neon green
        lime: {
          DEFAULT: '#39A751',
          50:  '#f0fbf2',
          100: '#dcf6e2',
          200: '#b7ecc7',
          300: '#7edda2',
          400: '#39A751',
          500: '#2f9946',
          600: '#237c37',
          700: '#1e622d',
          800: '#1c4e27',
          900: '#184122',
        },

        // Secondary blue accent
        ink: {
          DEFAULT: '#2563eb',
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },

        // Admin panel compat aliases
        base: {
          950: '#0e0e0e',
          900: '#141714',
          850: '#161d15',
          800: '#1e2b1a',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'grid-fine':
          'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'grid-faint':
          'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.6' },
          '50%': { transform: 'translateY(6px)', opacity: '1' },
        },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        'border-pulse': {
          '0%, 100%': { borderColor: 'rgba(82, 254, 125, 0.25)', boxShadow: '0 0 15px rgba(82, 254, 125, 0.15)' },
          '50%': { borderColor: 'rgba(82, 254, 125, 0.55)', boxShadow: '0 0 25px rgba(82, 254, 125, 0.3)' },
        },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 6s linear infinite',
        'border-pulse': 'border-pulse 4s ease-in-out infinite',
        'fade-in': 'fade-in 0.4s ease forwards',
        'scale-in': 'scale-in 0.3s ease forwards',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}
