<script setup lang='ts'>
const posts = await $fetch('/api/posts')
</script>

<template>
  <div class="flex items-center flex-col gap-2 py-4">
    <div v-for="post in posts" :key="post.id">
      <NuxtLink class="text-lg" :to="`/supervisors/${post.id}`">
        {{ post.title }}
      </NuxtLink>
      <p class="text-slate-500">
        发布于: {{ post.date }}
      </p>
    </div>
  </div>
</template>

<style scoped lang='scss'>
</style>
