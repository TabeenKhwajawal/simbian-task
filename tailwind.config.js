/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          simbian: {
            primary: '#1E40AF',
            secondary: '#2563EB',
            dark: '#1E3A8A',
          },
          security: {
            critical: '#DC2626',
            high: '#F97316',
            medium: '#FBBF24',
            low: '#10B981',
          }
        },
        animation: {
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }
      },
    },
    plugins: [],
  }