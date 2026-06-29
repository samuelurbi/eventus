/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B334C',
          dark: '#0A2A3D',
          light: '#1A4A63',
        },
        mint: {
          DEFAULT: '#BCEE95',
          50: '#F0FAE6',
          light: '#DEF3E0',
        },
        offwhite: '#F4F7F9',
        gray: {
          100: '#EEF2F5',
          200: '#E2E8EE',
          300: '#C9D4DC',
          400: '#9AAAB8',
          500: '#6B7D8E',
          700: '#3D5168',
        },
        // semánticos de texto (oscurecidos para mejor legibilidad)
        ink: {
          strong: '#0B334C',
          body: '#34465B',
          muted: '#546675',
          subtle: '#7A8B99',
        },
        herolight: '#C9D6DD',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
      },
      boxShadow: {
        // Sin sombras por preferencia de marca — la jerarquía se logra con bordes y color
        card: 'none',
        pop: '0 8px 30px rgba(11,51,76,0.12)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(163.27deg, #0E3C56 0%, #061723 71.43%)',
      },
    },
  },
  plugins: [],
}
