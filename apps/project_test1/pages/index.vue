<script setup lang="ts">
import type { DataWithoutDataProp, VideoType } from './videos.vue'

interface CategoryListType {
  data: {
    id: string
    attributes: {
      category_name: string
      updatedAt: string
      category_videos: {
        data: DataWithoutDataProp<VideoType>[]
      }
    }
  }[]
}
definePageMeta({
  layout: 'default',
})
const { data: categoryList } = await useFetch<CategoryListType>(() => 'http://localhost:1337/api/categories?populate=*')
</script>

<template>
  <!-- Here is page index -->
  <!-- .w-100px.h-100px{$}*5 -->
  <div w="100vw">
    <a-tabs p="5px">
      <template #extra>
        <a-button type="text" @click="navigateTo('/')">
          <template #icon>
            <div i-mdi-dots-vertical text="green" />
          </template>
        </a-button>
      </template>
      <a-tab-pane
        v-for="item in categoryList!.data" :key="item.id" :title="item.attributes.category_name"
      >
        <div>
          <a-carousel
            w="full" h="240px"
            :auto-play="true"
            show-arrow="always"
            indicator-position="bottom"
            indicator-type="never"
            animation-name="card"
            :move-speed="800"
          >
            <a-carousel-item
              v-for="picItem in categoryList?.data[(+item.id - 1)].attributes.category_videos.data" :key="picItem.id"
              @click="navigateTo(`/videos/${picItem.id}`)"
            >
              <!-- <img :src="picItem.attributes.video_coverSrc" :style="{ width: '100%', height: '100%' }" fit="cover"> -->
              <NuxtImg :src="picItem.attributes.video_coverSrc" :style="{ width: '100%', height: '100%' }" />
            </a-carousel-item>
          </a-carousel>
        </div>
        <!-- <a-card :style="{ width: '100%', height: '100%' } " :border="false">
          <a-card-grid
            v-for="subItem in item.attributes.category_videos.data"
            :key="subItem.id"
          >
            <a-card
              :bordered="false"
              @click="navigateTo(`/videos/${subItem.id}`)"
            >
              <a-card-meta
                :title="subItem.attributes.video_title"
              />
              <template #cover>
                <NuxtImg :src="subItem.attributes.video_coverSrc" />
              </template>
            </a-card>
          </a-card-grid>
        </a-card> -->
        <a-grid :cols="2" :col-gap="5" :row-gap="5">
          <a-grid-item
            v-for="subItem in item.attributes.category_videos.data"
            :key="subItem.id"
          >
            <a-card
              :bordered="false"
              @click="navigateTo(`/videos/${subItem.id}`)"
            >
              <a-card-meta

                :description="subItem.attributes.video_title"
              />
              <template #cover>
                <NuxtImg :src="subItem.attributes.video_coverSrc" />
              </template>
            </a-card>
          </a-grid-item>
        </a-grid>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped lang="scss">

</style>
