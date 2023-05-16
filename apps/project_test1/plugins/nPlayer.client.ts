import NPlayer from '@nplayer/vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(NPlayer)
})
