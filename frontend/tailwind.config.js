/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/index.html",
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
    "./src/**/*.html",
    "./src/**/*.css",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/utils/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "forest-green": "#1D3C34",
        "leaf-green": "#2E5D4B",
        "sunset-orange": "#FF7A45",
        "sand-yellow": "#F5DEB3",
        "primary": "#1D3C34",
        "second": "#2E5D4B",
        "paragraf": "#4B5563",
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};