import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
  ],
  primevue: {
      options: {
          theme: {
              preset: Aura
          }
      }
  },
  nitro: {
    routes: {
      '/': { redirect: '/login' }, // Thay thế bằng trang bạn muốn chuyển hướng
    },
  },
})