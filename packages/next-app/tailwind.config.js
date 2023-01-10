/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transform: {
        "-flip-h": "scaleX(-1)",
      },
    },
  },
  variants: {
    transform: ["responsive", "hover", "focus"],
  },
  plugins: [],
};
