/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './themes/scifi/layout/**/*.pug',
    './themes/scifi/source/**/*.{js,css}',
    './source/**/*.md'
  ],
  theme: {
    extend: {
      colors: {
        'scifi-bg': '#0a0e27',
        'scifi-bg-secondary': '#0d1117',
        'scifi-cyan': '#00d9ff',
        'scifi-blue': '#0099ff',
        'scifi-purple': '#9d4edd',
        'scifi-green': '#00ff88',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 217, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 217, 255, 0.5)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

