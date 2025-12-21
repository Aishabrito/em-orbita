/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ✅ Adicionando as Fontes aqui
      fontFamily: {
        'orbita': ['Rajdhani', 'sans-serif'], // Fonte para textos gerais
        'titulo': ['Orbitron', 'sans-serif'], // Fonte para o logo "Em Órbita"
      },
      colors: {
        space: {
          900: '#0B0D17', // O fundo escuro
          800: '#151932',
        },
        star: {
          DEFAULT: '#FACC15',
          glow: '#EAB308',
        }
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-glow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}