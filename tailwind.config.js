/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Background colors (context-aware via CSS variables)
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',

        // Text colors (context-aware)
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',

        // Border colors (context-aware)
        'border-primary': 'var(--border-primary)',
        'border-secondary': 'var(--border-secondary)',

        // Accent colors (same in both modes)
        accent: {
          DEFAULT: '#60a5fa',
          hover: '#3b82f6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif']
      },
      maxWidth: {
        container: '1200px'
      },
      boxShadow: {
        premium: '0 8px 30px rgba(0,0,0,0.35)'
      }
    }
  },
  plugins: []
};
