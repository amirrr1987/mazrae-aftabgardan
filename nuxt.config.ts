// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/image', '@nuxt/ui', '@pinia/nuxt', '@nuxt/icon'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'fa',
        dir: 'rtl',
      },
      title: 'مزرعه آفتابگردان',
      titleTemplate: '%s | مزرعه آفتابگردان',
    },
  },
  ui: {
    fonts: false,
  },
  icon: {
    fetchTimeout: 4000,
    provider: 'iconify',
    fallbackToApi: false,  // Changed from 'client-only'
    clientBundle: {
      scan: true,
      // Nuxt UI header / color-mode use these names dynamically; scan misses them when fallbackToApi is off.
      icons: ['lucide:moon', 'lucide:sun', 'lucide:menu', 'lucide:shopping-cart', 'lucide:trash', 'lucide:house', 'lucide:filter', 'lucide:x', 'lucide:search'],
    },
    serverBundle: {
      collections: ['lucide', 'ph', 'tabler']
    }
  },
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    }
  }
})