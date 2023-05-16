<script setup lang='ts'>
definePageMeta({
  layout: 'blank',
})
useHead({
  title: '密码重置 - 检查邮箱',
})
const userEmail = ref('1095568627@qq.com')
async function handleSendEmail() {
// eslint-disable-next-line @typescript-eslint/quotes, no-console
  console.log("123")
}
</script>

<template>
  <div flex="~ col" class="items-center">
    <div i-mdi-email text="green-600 4xl" />
    <h1 id="auth-check_email-title" font="">
      Check your email
    </h1>
    <span
      font="serif"
      text="center gray-500"
      w="300px"
    >
      We sent a password reset link to
      <div>{{ userEmail }}</div>
    </span>
    <div m="t-10" text="gray-600">
      Didn't receive the email?
      <span
        underline
        hover="cursor-pointer"
        text="green-700"
        @click="handleSendEmail"
      >
        Click to resend
      </span>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
