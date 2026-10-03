/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Master 4-Color Luxury Brand Palette
        brand: {
          DEFAULT: '#38BDF8',
          bg: '#06080E',
          dark: '#030509',
          card: '#0D1424',
          surface: '#0F172A',
          'surface-accent': '#131F37',
          border: '#1E2C4A',
          'border-light': 'rgba(56, 189, 248, 0.18)',
          green: '#38BDF8',
          'green-hover': '#0284C7',
          'green-neon': '#38BDF8',
          text: '#FFFFFF',
          muted: '#CBD5E1',
          subtle: '#94A3B8',
          400: '#38BDF8',
          500: '#0284C7',
          600: '#0369A1',
        },

        // Dark surfaces mapped for compatibility
        canvas: {
          50:  '#06080E',
          100: '#0D1424',
          200: '#1E2C4A',
          300: '#2A3F66',
        },

        // Graphite / Slate scale
        graphite: {
          950: '#06080E',
          900: '#0D1424',
          800: '#0F172A',
          700: '#1E2C4A',
          600: '#334155',
          500: '#64748B',
          400: '#94A3B8',
          300: '#CBD5E1',
          200: '#E2E8F0',
          100: '#FFFFFF',
        },

        // Sapphire / Cyan accent scale (mapped to lime & ink for 100% component compatibility)
        lime: {
          DEFAULT: '#38BDF8',
          50:  '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },

        ink: {
          DEFAULT: '#38BDF8',
          50:  '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },

        // Admin panel compat aliases
        base: {
          950: '#06080E',
          900: '#0D1424',
          850: '#0F172A',
          800: '#1E2C4A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
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
          '0%, 100%': { borderColor: 'rgba(56, 189, 248, 0.25)', boxShadow: '0 0 15px rgba(56, 189, 248, 0.15)' },
          '50%': { borderColor: 'rgba(56, 189, 248, 0.55)', boxShadow: '0 0 25px rgba(56, 189, 248, 0.3)' },
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
