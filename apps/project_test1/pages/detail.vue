<script setup lang='ts'>
const router = useRoute()
const { title, content } = await $fetch(`/api/detail/${router.params.id}`)
</script>

<template>
  <div>This is detail page.</div>
  <div class="p-5">
    <h1 class="text-2xl">
      {{ title }}
    </h1>
    <div v-html="content" />
  </div>
</template>

<style scoped>
</style>
