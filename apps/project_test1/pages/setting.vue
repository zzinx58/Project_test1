<script setup lang='ts'>
definePageMeta({
  layout: 'with-bottom',
})
</script>

<template>
  <div class="relative" h="screen">
    <div class="">
      <div class=" flex flex-col items-center justify-center">
        <NuxtImg
          src="https://p3-passport.byteimg.com/img/user-avatar/59296777f828ae4101819744e0ef154c~250x250.awebp"
          width="200"
          height="200"
          border="~ rounded-full r-light-blue-200"
        />
        <div class="p-5 pt-1 text-center">
          <div text="xl">
            南京邮电大学通达学院
          </div>
          <div>
            19240134 - 朱宗旭
          </div>
        </div>
      </div>
    </div>
    <a-list>
      <template #header>
        <div text="xl">
          SETTINGS
        </div>
      </template>
      <div text="center">
        There is nothing yet
      </div>
      <a-list
        :bordered="false"
      >
        <template #header>
          <div text="xl">
            Account
          </div>
        </template>
        <a-list-item @click="navigateTo('/check-email')">
          Change Password
          <template #actions>
            <div flex="~">
              <div i-mdi-key-variant text="2xl" />
            </div>
          </template>
        </a-list-item>
        <a-list-item @click="navigateTo('/my-profile')">
          Change UserInfo
          <template #actions>
            <div i-mdi-account-cog-outline text="2xl" />
          </template>
        </a-list-item>
      </a-list>
    </a-list>
    <div bg="white" border="1px black" w="100vw" flex="~" p="b-3" class="absolute bottom-0">
      <div flex="1 ~ col" class="items-center" @click="navigateTo('')">
        <div i-mdi-home text="2xl" bg="gray-400" />
        <span>首页</span>
      </div>
      <div flex="1 ~ col" class="items-center" @click="navigateTo('/my-course')">
        <div i-mdi-book-open-blank-variant text="2xl" bg="gray-400" />
        <span>课程中心</span>
      </div>
      <div flex="1 ~ col" class="items-center" @click="navigateTo('/my-profile')">
        <div i-mdi-account text="2xl" bg="gray-400" />
        <span>我的</span>
      </div>
    </div>
  </div>

  <!-- <a-affix :offset-bottom="0"> -->
  <!-- </a-affix> -->
</template>

<style scoped lang='scss'>
</style>
