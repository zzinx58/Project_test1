<script setup lang='ts'>
definePageMeta({
  layout: 'blank',
})
useHead({
  title: '登录',
})
const loginForm = ref({})
const remember_me = ref(false)
</script>

<template>
  <div id="auth-signin-page">
    <NuxtImg src="/logo_transparent.png" width="150px" fit="cover" height="100px" quality="100" />
    <div id="auth-login-description" m="b-10" flex="~ col">
      <div id="auth-form-welcome-title" font="bold" text="3xl center" m="b-8">
        Welcome To IT-Resource!
      </div>
      <div id="auth-form-welcom-subtitle" font="serif" text="center">
        Let's login to start your learning.
      </div>
    </div>
    <div id="auth-form-container" m="b-20">
      <FormKit
        v-model="loginForm" type="form"
        submit-label="Login"
      >
        <FormKit
          type="email"
          name="email"
          validation="required|email"
          label="Email"
          placeholder="Enter your email"
          :classes="{
            label: 'block mb-0 font-thin text-sm',
          }"
        />
        <FormKit
          type="password"
          name="password"
          validation="required|password|length:8"
          label="Password"
          placeholder="Enter your password"
          :classes="{
            outer: 'mb-2',
            label: 'block mb-0 font-thin text-sm',
          }"
        />
        <div flex="~" class="justify-between mb-3">
          <var-checkbox v-model="remember_me" class="inline-block">
            Remember me
          </var-checkbox>
          <NuxtLink to="https://www.baidu.com" class="text-gray-400 flex items-center">
            Forgot Password
          </NuxtLink>
        </div>
      </FormKit>
    </div>
    <!-- <pre wrap>{{ loginForm }}</pre> -->
    <div id="auth-form-footer" text="gray-400 center">
      Don't have an account ?
      <NuxtLink to="/signup" class="text-gray-500">
        Sign up
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang='scss'>
#auth-form-welcome-title {
  font-family: Darumadrop One;
}

:deep([data-invalid] .formkit-inner) {
  border-color: red;
  box-shadow: 0 0 0 2px red;
}
:deep([data-complete] .formkit-inner) {
  border-color: red;
  box-shadow: 0 0 0 2px green;
}

:deep([data-complete] .formkit-inner::after) {
  content: '✅';
  display: block;
  padding: 0.5em;
}

:deep([data-type="submit"] .formkit-input) {
  background-color: green;
  --at-apply: w-full;
}
</style>
