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
        {rel:"preload", as:"font", type:"font/woff2", href:"/fonts/anybody-latin.woff2", crossorigin:""},
        {rel:"preload", as:"font", type:"font/woff2", href:"/fonts/geist-latin.woff2", crossorigin:""},
      ],
      script:[
        // Applies the saved/system theme and the js flag before first paint (no FOUC)
        {
          tagPriority: "critical",
          innerHTML: "(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.setAttribute('data-theme',t)}catch(e){}})()",
        },
      ]
    }
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ["@nuxtjs/fontaine", "@nuxt/icon", "@nuxt/image"],
  fontMetrics: {
    fonts: [
      { family: "Anybody", src: "fonts/anybody-latin.woff2", fallbacks: ["Arial"] },
      { family: "Geist", src: "fonts/geist-latin.woff2", fallbacks: ["Arial"] },
      { family: "Geist Mono", src: "fonts/geist-mono-latin.woff2", fallbacks: ["Courier New"] },
    ],
  },
  icon: {
    mode: "svg",
    clientBundle: {
      scan: true,
    },
  },
  image: {
    format: ["webp"],
    quality: 80,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  routeRules: {
    "/**": { prerender: true },
  },
  hooks: {
    // Perf: no <link rel="prefetch"> for lazy chunks (gsap/lenis load on idle anyway);
    // on mobile they competed with the LCP image for bandwidth.
    "build:manifest": (manifest) => {
      for (const key in manifest) manifest[key].prefetch = false
    },
  },
})
