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
  app: {
    baseURL: '/demo_qlxx', // Cập nhật đúng tên repository của bạn trên GitHub
  },
  target: 'static',  //Tạo một website tĩnh để có thể deploy lên GitHub Pages
})