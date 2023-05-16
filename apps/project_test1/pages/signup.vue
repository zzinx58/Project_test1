<script setup lang='ts'>
definePageMeta({
  layout: 'blank',
})
useHead({
  title: '注册',
})
const signupForm = ref<{
  email: string
  password: string
  password_confirm: string
}>()
function eventHandler(eventType: string) {
  switch (eventType) {
    case 'signup': (async () => {
      if (signupForm.value?.password !== signupForm.value?.password_confirm)
      // eslint-disable-next-line no-console
        console.log('password confirm failed')
    })()
      break
  }
}
</script>

<template>
  <div id="auth-signup-page" w="330px">
    <div
      id="form-page-top"
      flex="~"
      class="items-center justify-between"
    >
      <NuxtImg
        src="/logo_transparent.png" width="150px" fit="cover" height="100px"
        quality="100"
      />
      <NuxtLink to="/login">
        <var-button color="rgba(0,128,0,90%)" text-color="#fff" class="!rounded-full">
          Log in
        </var-button>
      </NuxtLink>
    </div>
    <div id="auth-signup-description" m="b-10">
      <div
        id="auth-signup-welcome-title"
        text="3xl center"
        m="b-8"
      >
        Create your account
      </div>
      <div
        id="auth-signup-welcome-subtitle"
        text="center gray-500"
        font="serif"
      >
        Let's signup to start your learning.
      </div>
    </div>
    <div id="auth-signup-form-container" m="b-20">
      <FormKit
        v-model="signupForm" type="form"
        submit-label="Signup"
        @submit="eventHandler('signup')"
      >
        <FormKit
          type="email"
          name="email"
          validation="required|email"
          label="Email"
          placeholder="Enter your email"
        />
        <FormKit
          type="password"
          name="password"
          validation="required|password|length:8" label="Password"
          placeholder="Enter your password"
        />
        <FormKit
          type="password"
          name="password_confirm"
          validation="required|password|length:8"
          label="Confirm Password"
          placeholder="Confirm your password"
        />
      </FormKit>
    </div>
  </div>
</template>

<style scoped lang='scss'>
#auth-signup-welcome-title {
    font-family: Darumadrop One;
}
:deep([data-type="submit"] .formkit-input) {
  background-color: green;
  --at-apply: w-full;
}
</style>
