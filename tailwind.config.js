/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Storefront (mobile/web shop) tokens
        ink: '#111111',
        ink2: '#3A3A3A',
        muted: '#6B6B6B',
        line: '#E7E5E1',
        surface: '#F6F5F2',
        pm: '#D2001E',
        ondark: '#BDBDBD',
        darkline: '#2E2E2E',
        dark2: '#1F1F1F',
        brand: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        }
      },
      boxShadow: {
        bar: '0 -2px 16px rgba(0,0,0,0.08)',
      },
      fontFamily: {
        store: ['Montserrat', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
