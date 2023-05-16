<script setup lang='ts'>
definePageMeta({
  layout: 'video',
})
interface UpdatedUserInfoType {
  user_avatarSrc: string
  username: string
  user_gender: 'boy' | 'girl'
  user_university: string
  user_Id: string
  email: string
}
const updatedUserInfoForm = ref<UpdatedUserInfoType>({
  user_avatarSrc: '',
  username: '朱宗旭',
  user_gender: 'boy',
  user_university: '南京邮电大学通达学院',
  user_Id: '19240134',
  email: '1095568627@qq.com',
})
</script>

<template>
  <div h="screen">
    <a-page-header
      title="My Profile"
      @back="$router.back()"
    />
    <div p="r-3">
      <a-form
        :model="updatedUserInfoForm"
      >
        <a-form-item
          field="user_avatarSrc"
          label="头像"
        >
          <a-upload>
            <template #upload-button>
              <NuxtImg
                src="https://p3-passport.byteimg.com/img/user-avatar/59296777f828ae4101819744e0ef154c~250x250.awebp"
                width="50"
                height="50"
              />
            </template>
          </a-upload>
        </a-form-item>
        <a-form-item
          field="username"
          label="昵称"
        >
          <a-input v-model="updatedUserInfoForm.username" />
        </a-form-item>
        <a-form-item
          field="user_Id"
          label="学号"
        >
          <a-input v-model="updatedUserInfoForm.user_Id" />
        </a-form-item>
        <a-form-item
          field="email"
          label="邮箱"
        >
          <a-input v-model="updatedUserInfoForm.email" />
        </a-form-item>
        <a-form-item
          field="user_gender"
          label="性别"
        >
          <a-radio-group
            v-model="updatedUserInfoForm.user_gender"
            :options="[
              { label: '男', value: 'boy' },
              { label: '女', value: 'girl' }]"
          />
        </a-form-item>
        <a-form-item
          field="user_college"
          label="大学"
        >
          <a-input
            v-model="updatedUserInfoForm.user_university"
          />
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            @click="() => {}"
          >
            保存修改
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped lang='scss'>
</style>
