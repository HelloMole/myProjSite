// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt'
  ],
  ui: {
    global: true
  },
  alias: {
    '~': '.',
    '@': '.'
  },
  colorMode: {
    preference: 'dark'
  },
  app: {
    baseURL: '/myProjSite/',
    buildAssetsDir: '/_nuxt/'
  },
  experimental: {
    payloadExtraction: false
  },
  vite: {
    build: {
      cssCodeSplit: false
    }
  },
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true
    }
  }
})
