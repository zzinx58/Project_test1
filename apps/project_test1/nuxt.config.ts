import transformerDirectives from '@unocss/transformer-directives'
import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@vite-pwa/nuxt', '@formkit/nuxt', '@nuxt/image-edge', '@nuxt/devtools'],
  devtools: {
    enabled: false,
  },
  typescript: {
  },
  routeRules: {
    '/videos/**': { ssr: false },
  },
  unocss: {
    uno: true,
    icons: true,
    attributify: true,
    typography: true,
    shortcuts: [],
    rules: [],
    safelist: [],
    theme: {
      breakpoints: {
        sm: '320px',
        md: '640px',
      },
      heights: {
        header: '64px',
      },
    },
    transformers: [
      transformerDirectives(),
    ],
  },
  pwa: {},
  imports: {
    autoImport: true,
  },
  image: {},
  css: [
    'normalize.css/normalize.css',
    '@formkit/themes/genesis',
    // '@varlet/ui/es/style',
  ],
  ssr: true,
  vite: {
    ssr: {
      noExternal: ['@varlet/ui'],
    },
    plugins: [
      components({
        resolvers: [
          // VarletUIResolver(),
          ArcoResolver({ sideEffect: true })],
      }),
      autoImport({
        resolvers: [
          // VarletUIResolver({ autoImport: true }),
          ArcoResolver()],
      }),
      // createStyleImportPlugin({
      //   libs: [{
      //     libraryName: '@arco-design/web-vue',
      //     esModule: true,
      //     resolveStyle: (name) => {
      //       // css
      //       return `@arco-design/web-vue/es/${name}/style/css.js`
      //       // less
      //       return `@arco-design/web-vue/es/${name}/style/index.js`
      //     },
      //   }],
      // }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/variables.scss";',
        },
      },
    },
  },
})
