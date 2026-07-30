/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0A1930",
        navy2: "#101f3d",
        navy3: "#16294c",
        gold: "#FFCE00",
        crimson: "#E4032E",
        paper: "#EEF0F4",
        whats: "#25D366",
      },
      fontFamily: {
        display: ["Anton", "sans-serif"],
        condensed: ['"Barlow Condensed"', "sans-serif"],
        sans: ["Barlow", "sans-serif"],
      },
    },
  },
  plugins: [],
};
