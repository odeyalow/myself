/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: "#FFFFFF",
        lightGray: "#F6F6F6",
        gray: "#747474",
        darkGray: "#1F1F1F",
        dark: "#141414"
      },
      fontFamily: {
        montserrat: ['Montserrat']
      }
    },
  },
  darkMode: "class",
  plugins: [],
};
