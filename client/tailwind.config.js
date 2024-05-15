/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'light': '#f1eed9',
        'golf-green': '#1d963f',
        'golf-green-second': '#d4d9bd',
        'golf-blue': '#05668d',
        'golf-blue-dark': '#1a535c',
        'golf-blue-light': '#61a5c2',
        'sand': '#FAF4D3',
        'dark': '#000000',
        'golf': '#55a630',
        'golf3': '#55a630',
        'newGolf': '#55a630',
      },
      fontFamily: {
        'noto-sans': ['Noto Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}

