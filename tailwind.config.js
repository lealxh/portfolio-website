/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#111111',
          100: '#1a1a1a',
          200: '#2a2a2a',
        },
        light: {
          DEFAULT: '#ffffff',
          100: '#f5f5f5',
          200: '#e5e5e5',
        },
        accent: {
          DEFAULT: '#60a5fa',
          hover: '#3b82f6',
        },
        text: {
          primary: '#ffffff',
          secondary: '#9ca3af',
          muted: '#6b7280',
        }
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'container': '1200px',
      }
    },
  },
  plugins: [],
}
