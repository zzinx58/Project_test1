<script setup lang='ts'>
// import { StyleProvider, Themes } from '@varlet/ui'

// The code below will cause the document not found error, cause you are using ssr render mode.
// Instead you should use onMounted Vue hook.
// (() => {
//   StyleProvider(Themes.dark)
// })()
onMounted(() => {
  // StyleProvider(Themes.dark)
})
</script>

<template>
  <Navbar
    class="dark:bg-#5ACFA9"
  />
  <slot overflow="hidden" />
  <a-affix :offset-bottom="0" absolute>
    <div bg="white" border="1px black" w="100vw" flex="~" p="b-3">
      <div flex="1 ~ col" class="items-center" @click="navigateTo('/')">
        <div i-mdi-home text="2xl" bg="gray-400" />
        <span>首页</span>
      </div>
      <div flex="1 ~ col" class="items-center" @click="navigateTo('/my-course')">
        <div i-mdi-book-open-blank-variant text="2xl" bg="gray-400" />
        <span>课程中心</span>
      </div>
      <div flex="1 ~ col" class="items-center" @click="navigateTo('/setting')">
        <div i-mdi-account text="2xl" bg="gray-400" />
        <span>我的</span>
      </div>
    </div>
  </a-affix>
  <!-- <Footer /> -->
</template>

<style scoped>
</style>
