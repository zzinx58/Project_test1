<script setup lang='ts'>
import type { VideoTypeOmitAttributes } from './videos.vue'

definePageMeta({
  layout: 'video',
})
interface UserInfoType {
  id: string
  username: string
  email: string
  user_avatarSrc: string
  user_gender: string
  user_university: string
  user_Id: string
  user_collections: {
    id: string
    collection_name: string
    collection_description: string
    collection_videos: VideoTypeOmitAttributes[]
  }[]
}
const userId = 8
const { data: userInfo } = await useFetch<UserInfoType>(() => `http://localhost:1337/api/users/${userId}?populate[user_collections][populate][0]=collection_videos`)
</script>

<template>
  <div
    h="screen"
  >
    <a-page-header
      title="My Courses"
      @back="$router.back()"
    />
    <a-button
      type="primary" long @click="() => {}"
    >
      添加新的收藏集
    </a-button>
    <a-collapse
      :bordered="false"
      :default-active-key="['1']"
    >
      <a-collapse-item v-for="item in userInfo?.user_collections" :key="item.id" :header="item.collection_name">
        <template #extra>
          <a-popconfirm type="warning" content="This is inreversable, are you sure you want to delete this collection?" ok-text="Delete" :on-ok="() => {}" @click.stop="">
            <a-button
              status="danger"
            >
              <template #icon>
                <div i-mdi-delete-circle-outline />
              </template>
            </a-button>
          </a-popconfirm>
        </template>
        <a-grid :cols="2" :col-gap="5" :row-gap="5">
          <a-grid-item
            v-for="subItem in item.collection_videos"
            :key="subItem.id"
          >
            <a-card
              :bordered="false"
              @click="navigateTo(`/videos/${subItem.id}`)"
            >
              <a-card-meta
                :description="subItem.video_description"
              />
              <template #cover>
                <NuxtImg :src="subItem.video_coverSrc" />
              </template>
            </a-card>
          </a-grid-item>
        </a-grid>
      </a-collapse-item>
    </a-collapse>
  </div>
</template>

<style scoped lang='scss'>
</style>
