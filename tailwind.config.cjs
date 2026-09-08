module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: { xs: '400px' },
      fontFamily: {
        sans: ['"Familjen Grotesk Variable"', 'Familjen Grotesk', 'system-ui', 'sans-serif'],
        mono: ['"Azeret Mono Variable"', '"Azeret Mono"', 'ui-monospace', 'monospace']
      },
      maxWidth: { shell: '80rem', note: '40rem' },
      transitionTimingFunction: { settle: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      keyframes: {
        settle: {
          '0%': { opacity: '0', transform: 'translateY(0.5rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        ink: {
          '0%': { opacity: '0.25', transform: 'translateY(-0.18em) scale(0.985)' },
          '55%': { opacity: '1', transform: 'translateY(0.02em) scale(1.004)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
        }
      },
      animation: {
        settle: 'settle 0.42s cubic-bezier(0.16, 1, 0.3, 1) backwards',
        ink: 'ink 0.34s cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  },
  plugins: []
};
