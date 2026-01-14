// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  app: {
    baseURL: '/myProjSite/',
    buildAssetsDir: '/other/',
  },
  alias: {
    "~": "/<srcDir>",
    "@": "/<srcDir>",
    "~~": "/<rootDir>",
    "@@": "/<rootDir>",
  },
  ssr: false, //开启客户端渲染
  // nitro: {
  //   prerender: {
  //     routes: [
  //       '/project/music-tree',
  //       '/project/book-edit',
  //       '/project/tata-read',
  //       '/project/stock-backtest',
  //       '/project/wx-game',
  //     ]
  //   },
  // },
  hooks: {
    'prerender:routes' ({ routes }) {
      routes.clear() // 不生成任何路由（除了默认路由）
    }
  },
})
