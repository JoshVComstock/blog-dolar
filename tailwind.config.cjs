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
        ink: {
          '0%': { opacity: '0.3' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        ink: 'ink 0.22s ease-out'
      }
    }
  },
  plugins: []
};
