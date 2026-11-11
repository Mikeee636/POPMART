/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        ink2: '#3A3A3A',
        muted: '#6B6B6B',
        line: '#E7E5E1',
        surface: '#F6F5F2',
        pm: '#D2001E',
        ondark: '#BDBDBD',
        darkline: '#2E2E2E',
        dark2: '#1F1F1F',
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        bar: '0 -2px 16px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
