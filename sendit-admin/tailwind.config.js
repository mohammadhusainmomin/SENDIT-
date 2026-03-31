/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#01aedf",
        "primary-dark": "#0096bb",
      },
    },
  },
  plugins: [],
};
