<script setup lang='ts'>
definePageMeta({
  layout: 'blank',
})
useHead({
  title: '密码重置',
})
</script>

<template>
  <a-result status="success" title="Password Change Success!">
    <template #subtitle>
      Now you can use new password to log in
    </template>
    <template #extra>
      <a-space>
        <a-button type="primary" @click="navigateTo('login')">
          Back to login page
        </a-button>
      </a-space>
    </template>
  </a-result>
</template>

<style scoped lang='scss'>
</style>
