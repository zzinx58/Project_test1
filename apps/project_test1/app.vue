<script setup lang="ts">
const layoutMode = ref('blank')
// const layoutMode = ref('default')
const picSrc = 'https://i0.hdslb.com/bfs/bangumi/image/612de4bca2e3db2863d5dd479aaa6352c5eedbb4.png@466w_622h.webp'
</script>

<template>
  <!-- https://nuxt.com/docs/api/components/nuxt-layout#nuxtlayout -->
  <!-- Please note the layout name is normalized to kebab-case, so if your layout file is named errorLayout.vue, it will become error-layout when passed as a name property to <NuxtLayout />. -->
  <!-- <NuxtLayout /> renders incoming content via <slot />, which is then wrapped around Vue’s <Transition />component to activate layout transition. For this to work as expected, it is recommended that <NuxtLayout /> is not the root element of the page component. -->
  <!-- When you want to use the specific layout for the specific page, use definePageMeta,passing the weakMap object with layout field -->
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <!-- <div>
    <NuxtLayout :name="layoutMode">
      <NuxtPage />
    </NuxtLayout>
  </div> -->
</template>

<style lang="scss">
@import "@varlet/ui/es/style";
@import url('https://fonts.googleapis.com/css2?family=Darumadrop+One&display=swap');
</style>
