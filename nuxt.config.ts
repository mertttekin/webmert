// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head:{
      meta:[
        {charset:"utf-8"},
        {name:"description", content:"Mert Tekin portfolyo"},
        {name:"author", content:"Mert Tekin"},
      ]
    }
  },
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
