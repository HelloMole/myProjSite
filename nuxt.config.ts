// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt'
  ],
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
  nitro: {
    preset: 'static',
    output: {
      dir: 'docs'
    },
    publicAssets: [
      {
        baseURL: '/myProjSite/',
        dir: 'public'
      }
    ]
  },
  router: {
    options: {
      strict: false
    }
  }
})
