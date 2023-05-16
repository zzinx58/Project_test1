<script setup lang='ts'>
definePageMeta({
  layout: 'blank',
})
useHead({
  title: '密码重置',
})
interface ResetPasswordFormType {
  password: string
  passwordConfirmation: string
  code: string
}
const resetCode = ref(useRoute().query.code as string || '')
const resetPasswordForm = ref<ResetPasswordFormType>({
  password: '',
  passwordConfirmation: '',
  code: resetCode.value,
})
function handleSubmit() {

}
const formCheckRules = {
  required: {
    required: true,
    message: 'password is required',
  },
  minLength: {
    minLength: 8,
    message: 'must be greater than 8 characters',
  },
}
</script>

<template>
  <div>
    <a-steps
      :current="2"
      label-placement="vertical"
    >
      <a-step description="Enter the email you want to reset the password">
        First
      </a-step>
      <a-step description="Enter your new password">
        Second
      </a-step>
    </a-steps>
  </div>
  <div
    id="auth-forgot_password-page"
    m="t-10"
  >
    <div
      i-mdi-key-outline
      text="4xl green-600"
      w="full"
    />
    <div
      id="auth-forgot_password-title"
      font="bold"
      text="3xl center"
      m="b-8"
    >
      Set new password
    </div>
    <div
      id="auth-forgot_password-subtitle"
      font="serif"
      text="center gray-500"
      w="300px"
    >
      Your new password must be different to previously used passwords
    </div>
    <div
      id="auth-forgot_password-form-container"
      m="t-10"
    >
      <a-space flex="~ col">
        <a-form
          :model="resetPasswordForm"
          layout="vertical"
          :style="{ width: '330px' }"
          @submit="handleSubmit"
        >
          <a-form-item
            field="code"
            label="Code"
            feedback
            :required="true"
          >
            <a-input
              v-model="resetPasswordForm.code"
              :disabled="true"
            />
          </a-form-item>
          <a-form-item
            field="password"
            label="Password"
            feedback
            hide-asterisk
            :rules="[
              formCheckRules.minLength,
              formCheckRules.required,
            ]"
          >
            <a-input
              v-model="resetPasswordForm.password"
              placeholder="please enter your password"
            />
          </a-form-item>
          <a-form-item
            field="passwordConfirmation"
            label="Confirm password"
            feedback
            :rules="[
              formCheckRules.minLength,
              formCheckRules.required,
            ]"
            :validate-trigger="['change', 'input']"
          >
            <a-input
              v-model="resetPasswordForm.passwordConfirmation"
              placeholder="please confirm your password"
            />
          </a-form-item>
        </a-form>
        <a-button
          status="success"
          w="330px"
          m="t-2"
        >
          Reset Password
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<style scoped lang='scss'>
#auth-forgot_password-title {
  font-family: Darumadrop One;
}
</style>
