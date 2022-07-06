/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: { max: "475px"},
        md: { max: "768px"},
        lg: { max: "1024px"},
        xl: { max: "1279px"},
      }
    },
  },
  plugins: [],
}
