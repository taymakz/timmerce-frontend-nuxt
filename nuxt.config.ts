import { appDescription, appTitle } from './app/constants'

export default defineNuxtConfig({
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'shadcn-nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/seo',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@vee-validate/nuxt',
    '@vueuse/motion/nuxt',
    '@oku-ui/motion-nuxt',
  ],
  routeRules: {
    '/auth/**': { ssr: false, appMiddleware: 'should-be-logged-out' },
  },
  experimental: {
    watcher: 'parcel', // 'chokidar' or 'parcel'
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },
  motion: {
    prefix: 'Oku',
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },

    head: {
      viewport: 'width=device-width,initial-scale=1',
      titleTemplate: `%s %separator ${appTitle}`,
      templateParams: {
        separator: '|',
      },
      htmlAttrs: {
        dir: 'rtl',
        lang: 'fa-IR',
      },
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
        {
          name: 'theme-color',
          media: '(prefers-color-scheme: light)',
          content: '#F4F4F5',
        },
        {
          name: 'theme-color',
          media: '(prefers-color-scheme: dark)',
          content: '#09090B',
        },
      ],
    },
  },

  site: {
    url: 'https://example.com',
    name: appTitle,
    description: appDescription,
    defaultLocale: 'fa', // not needed if you have @nuxtjs/i18n installed
  },

  robots: {
    // provide simple disallow rules for all robots `user-agent: *`
    disallow: [],
    allow: '*',
  },

  ogImage: {
    defaults: {
      component: 'NuxtSeo',
      props: {
        colorMode: 'dark',
      },
    },
  },

  shadcn: {
    prefix: 'Ui',
    componentDir: './app/components/ui',
  },

  runtimeConfig: {
    public: {
      baseApi: '', // Base Api environment variable
      baseStorage: '', // Base Media environment variable
      domain: '', // Domain environment variable
    },
  },

  colorMode: {
    classSuffix: '',
  },
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }],
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: false,
  },
  eslint: {
    config: {
      standalone: false,
    },
  },

  compatibilityDate: '2024-10-10',
})
