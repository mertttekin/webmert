// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ["@nuxtjs/google-fonts","nuxt-icon"],
  googleFonts: {
    families: {
      "Quicksand": [200, 300, 400, 500, 600, 700, 800],
      "DM Sans": [200, 300, 400, 500, 600, 700, 800],
    },
    display: "swap",
    prefetch: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
