/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand"],
        dmSans: ["DM Sans"],
      },
      maxWidth: {
        "8xl": "1360px"
      },
      borderRadius :{
        "4xl": "3rem"
      },
      height: {
        'h-screen/2': '50vh',
      }
    },
  },
  plugins: [],
};
