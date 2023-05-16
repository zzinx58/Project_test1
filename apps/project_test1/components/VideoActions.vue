<script setup lang='ts'>
import type { VideoType } from '~/pages/videos.vue'

const { video_likes, video_played, video_collections } = withDefaults(defineProps<VideoType>(), {}).data.attributes
</script>

<template>
  <div>
    <a-space>
      <div>
        <div i-mdi-thumb-up-outline text="2xl" />
        <span>{{ video_likes }}</span>
      </div>
      <div>
        <div i-mdi-folder-star-outline text="2xl" />
        <span>{{ video_collections }}</span>
      </div>
      <div>
        <div i-mdi-eye-outline text="2xl" />
        <span>{{ video_played }}</span>
      </div>
    </a-space>
  </div>
</template>

<style scoped lang='scss'>
</style>
