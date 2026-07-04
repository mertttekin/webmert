// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head:{
      meta:[
        {charset:"utf-8"},
        {name:"viewport", content:"width=device-width, initial-scale=1"},
        {name:"description", content:"Mert Tekin — Software Engineer. I build fast, modern web experiences."},
        {name:"author", content:"Mert Tekin"},
        {name:"theme-color", content:"#050505"},
      ]
    }
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ["@nuxtjs/google-fonts","nuxt-icon"],
  googleFonts: {
    families: {
      "Inter": [400, 500, 600, 700],
      "Space Grotesk": [400, 500, 600, 700],
      "JetBrains Mono": [400, 500, 600],
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
