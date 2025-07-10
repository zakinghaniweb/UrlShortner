/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // In case you're using next/font or dynamic templates:
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors:{
        brandColor: "#7364DB"
      }
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"]
    },
    container: {
      center: true
    }
  },
  plugins: [],
}


