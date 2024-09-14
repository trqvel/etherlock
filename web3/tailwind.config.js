/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{html,js,jsx}',
    './components/**/*.{html,js,jsx}',
    './sections/**/*.{html,js,jsx}',
    './styles/**/*.{js,jsx}',
  ],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        'cool-blue': '#30e9f4',
        'cool-purple': '#9400D3',
        'cool-indigo': '#270656',
        'mega-purple': '#151326',
        'cool-dark': '#0F0E1D',
        'cool-orange': '#FF8C00',
        'deep-orange': '#C66E02',
      },
      transitionTimingFunction: {
        'out-flex': 'cubic-bezier(0.05, 0.6, 0.4, 0.9)',
      },
    },
  },
  plugins: [],
};
