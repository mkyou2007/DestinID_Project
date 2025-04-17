/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./**/*.html",  // All HTML files in any subdirectory
    "./src/**/*.js",  // All JS files in src or subdirectories
    "./src/**/*.{jsx,tsx}",  // React files if any
    "./public/**/*.js",  // JS in public folder
    "./pages/**/*.js"  // In case of pages directory
  ],
  safelist: [
    {
      pattern: /.*/,  // Include ALL possible Tailwind classes
      variants: ['sm', 'md', 'lg', 'xl', '2xl', 'hover', 'focus', 'active'],
    },
  ],
  theme: {
    extend: {
      colors: {
        "forest-green": "#1D3C34",
        "leaf-green": "#2E5D4B",
        "sunset-orange": "#FF7A45",
        "sand-yellow": "#F5DEB3",
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};