<script setup lang='ts'>
const { message } = await $fetch('/api/hello')
</script>

<template>
  <div>{{ message }}</div>
</template>

<style scoped lang='scss'>
</style>
