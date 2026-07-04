// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head:{
      htmlAttrs: { lang: "en" },
      title: "Mert Tekin — Software Engineer",
      meta:[
        {charset:"utf-8"},
        {name:"viewport", content:"width=device-width, initial-scale=1"},
        {name:"description", content:"Mert Tekin is a software engineer at Huawei, working on the Gallery app for the HarmonyOS ecosystem with ArkTS and crafting fast, modern web experiences with Vue, Nuxt and TypeScript."},
        {name:"author", content:"Mert Tekin"},
        {name:"theme-color", content:"#050505"},
        {name:"robots", content:"index, follow"},
        {property:"og:type", content:"website"},
        {property:"og:site_name", content:"Mert Tekin"},
        {property:"og:title", content:"Mert Tekin — Software Engineer"},
        {property:"og:description", content:"Software engineer at Huawei — HarmonyOS Gallery app with ArkTS, and fast, modern web experiences with Vue, Nuxt and TypeScript."},
        {property:"og:url", content:"https://merttekin.com"},
        {property:"og:image", content:"https://merttekin.com/og-image.png"},
        {property:"og:image:width", content:"1200"},
        {property:"og:image:height", content:"630"},
        {property:"og:locale", content:"en_US"},
        {name:"twitter:card", content:"summary_large_image"},
        {name:"twitter:title", content:"Mert Tekin — Software Engineer"},
        {name:"twitter:description", content:"Software engineer at Huawei — HarmonyOS Gallery app with ArkTS, and fast, modern web experiences with Vue, Nuxt and TypeScript."},
        {name:"twitter:image", content:"https://merttekin.com/og-image.png"},
      ],
      link:[
        {rel:"icon", type:"image/x-icon", href:"/favicon.ico"},
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
