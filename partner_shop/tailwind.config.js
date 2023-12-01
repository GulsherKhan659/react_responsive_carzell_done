/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,svg}"],
  theme: {
    extend: {
      colors: {
        'purchase-color': "#F1CA51",
        'fast-delivery': "#3C82F6",
        reservable: "#6B7280"
      }
    },
  },
  plugins: [],
}

