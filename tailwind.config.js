/** @type {import('tailwindcss').Config} */

// import defaultTheme to spread after custom xs breakpoint
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "xs": "366px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        epilogue: ["Epilogue", "sans-serif"],
      },
      boxShadow: {
        secondary: "10px 10px 20px rgba(2,2,0.25)",
      },
    },
  },
  plugins: [],
};
