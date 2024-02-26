/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      normaltext: ["Poppins", "sans-serif"],
      funtext: ["Kode Mono", "monospace"],
    },
    extend: {},
  },
  plugins: [],
}

