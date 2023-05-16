<script setup lang='ts'>
import { Player } from 'nplayer'

definePageMeta({
  layout: 'video',
})
export interface VideoType {
  data: {
    id: string
    attributes: {
      video_title: string
      video_description: string
      video_url: string
      video_likes: number
      video_collections: number
      video_played: number
      video_coverSrc: string
      createdAt: string
      video_fromUser: {
        data: {
          id: number
          attributes: {
            username: string
            user_avatarSrc: string
          }
        }
      }
      video_categories: {
        data: {
          id: string
          attributes: {
            category_name: string
          }
        }[]
      }
    }
  }
}
export type DataWithoutDataProp<T> = T extends { data: infer U } ? U : T
export type VideoTypeOmitAttributes = Omit<DataWithoutDataProp<VideoType['data']['attributes']>, 'video_fromUser' | 'video_catefories'> & {
  id: string
}
export interface CategoryType {
  data: {
    id: string
    attributes: {
      // Notice!!: [videoType] represents a tuple Type as an array composed of individual 'VideoType' Type element.
      // 'VideoType []' represents an array containing multiple elements of type 'VideoType'.
      // category_videos: [VideoType]
      category_videos: {
        data: DataWithoutDataProp<VideoType>[]
      }
    }
  }
}
interface VideoListSourceType {
  id: string
  title: string
  description: string
  coverSrc: string
}

const route = useRoute()
// Don't forgot await.
// Don't forgot modify to factory function mode.
const { data: video } = await useFetch<VideoType>(() => `http://localhost:1337/api/videos/${route.params.id}?populate=*`, {
  // watch: [computed(() => route.params.id)],
  watch: [() => route.params.id],
})
const videoCategoryChosen = 1
// Get Category list.
const { data: categoryList } = await useFetch<CategoryType>(() => `http://localhost:1337/api/categories/${videoCategoryChosen}?populate=*`, {
  // export declare type WatchSource<T = any> = Ref<T> | ComputedRef<T> | (() => T);
  watch: [video],
})
// const videoUrl = ref(`http://localhost:1337${video.value!.data.attributes.video_url}`)
// const videoCreateAt = ref(video.value!.data.attributes.createdAt.slice(0, 10))
const videoCreateAt = computed(() => video.value!.data.attributes.createdAt)
// const videoCreateAt = computed(() => video.value!.data.attributes.createdAt.slice(0, 10))
const videoUrl = computed(() => `http://localhost:1337${video.value!.data.attributes.video_url}`)
// except video needed to set deep: true, other's further don't.
watch(() => video, () => {
  // console.log(videoUrl.value)
}, {
  deep: true,
})
// const { value: videoAttributes } = toRefs(videoAttributesTemp)

// const { data: categoryList, refresh: categoriesRefresh } = await useFetch<CategoryType>(`http://localhost:1337/api/categories/${videoAttributes.value.video_categories.data[0].id}?populate=*`)
// const videoUrl = computed(() => `http://localhost:1337${videoAttributesTemp.value.video_url}`)
// const videoCreateAt = computed(() => videoAttributesTemp.value.createdAt.slice(0, 10))
// const test = await useFetch<VideoType>(() => `http://localhost:1337/api/videos/${route.params.id}?populate=*`)
// // eslint-disable-next-line no-console
// console.log(test.data.value?.data.attributes.video_url)
// watch(() => route.params.id,
//   async () => {
//     await videoRefresh()
//     await categoriesRefresh()
//     // await test.refresh()
//     // await nextTick()
//     // eslint-disable-next-line no-console
//     console.log('cur_id:', route.params.id)

//     videoCreateAt.value = videoAttributesTemp.value.createdAt
//     // videoCreateAt.value = videoAttributesTemp.value.createdAt.slice(0, 10)
//     videoUrl.value = `http://localhost:1337${videoAttributesTemp.value.video_url}`
//     // eslint-disable-next-line no-console
//     console.log(videoCreateAt.value, videoUrl.value)
//     // await nextTick()
//     // // eslint-disable-next-line no-console
//     // console.log(test.data.value?.data.attributes.video_url)
//   }, {
//     // flush: 'post',
//     // deep: true,
//   })
// Seems like Vue3 don't recommand using unwrap object.
// const { video_collections, video_likes, video_played, video_fromUser, video_categories, createdAt, video_url } = toRefs(videoAttributes).value
// videoCreateAt = computed(() => videoAttributes createdAt.value.slice(0, 10))
// videoUrl = computed(() => `http://localhost:1337${video_url.value}`)
// watch(() => video.value, () => {
//   videoUrl.value = `http://localhost:1337${video.value?.data.attributes.video_url}`
//   router.go(0)
// })
// watch(() => route.params.id, () => videoRefresh({ dedupe: true }))
// onBeforeRouteUpdate(() => {
//   // eslint-disable-next-line no-console
//   console.log(video.value?.data.attributes.video_url)
//   videoRefresh().then(() => {
//     // eslint-disable-next-line no-console
//     console.log(video.value?.data.attributes.video_url)
//     nextTick()
//   })
// })

const videosList = categoryList.value?.data.attributes.category_videos.data

// Logic judgement will cause type judgement confusion, so you might need to manually make type assertion.
const videoListSource = (videosList && (videosList.length !== 0)
  && ref(new Array(videosList.length).fill(null).map((_, index) => {
    return {
      id: videosList[index].id,
      title: videosList[index].attributes.video_title,
      description: videosList[index].attributes.video_description,
      coverSrc: videosList[index].attributes.video_coverSrc,
    }
  }))) as Ref<VideoListSourceType[]> | undefined

// Get video thumbnail
const thumbnailSrc = ref('')
const videoRef: Ref<HTMLVideoElement | null> = ref(null)
onMounted(() => {
  const canvas = document.createElement('canvas')
  // const canvasCtx = canvas.getContext('webgl', { preserveDrawingBuffer: true })
  const canvasCtx = canvas.getContext('2d')
  if (videoRef.value) {
    // 动态挂载 NPlayer
    const player = new Player({
      video: videoRef.value,
    })
    player.mount('#videoContainer')
    videoRef.value.src = videoUrl.value
    // videoRef.value.currentTime = 30000
    // videoRef.value.onloadedmetadata = () => {
    videoRef.value.onloadeddata = () => {
      canvas.width = videoRef.value!.videoWidth
      canvas.height = videoRef.value!.videoHeight
      videoRef.value && canvasCtx?.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height)
      // videoRef.value && canvasCtx?.drawImage(videoRef.value, 0, 0, videoRef.value.width, videoRef.value.height)
      thumbnailSrc.value = canvas.toDataURL('image/png')
      // // eslint-disable-next-line no-console
      // console.log(thumbnailSrc.value)
      // getCanvasPNG(canvas)
    }
  }
})

function _getCanvasPNG(canvas: HTMLCanvasElement) {
  canvas.toBlob((b) => {
    b && handleBlob(b)
  })
  function downloadPNG(dataURL: string, fileName: string) {
    const link = document.createElement('a')
    link.href = dataURL
    link.download = fileName
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(dataURL)
  }
  function handleBlob(blob: Blob) {
    const dataURL = URL.createObjectURL(blob)
    downloadPNG(dataURL, 'NPlayer.png')
  }
}
const colors = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
]
</script>

<template>
  <div>
    <!-- {{ $route.params.id }}
  {{ videoUrl }} -->
    <!-- <pre>{{ videoListSource }}</pre> -->
    <!-- <pre>{{ videosList }}</pre> -->
    <!-- <video ref="videoRef" crossorigin="anonymous" controls preload="auto" /> -->
    <!-- Uncaught DOMException: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported. -->
    <!-- To solve the video-canvas thumbnail blank problem, crossorigin and preload is required. And you need to capture it in 'loadeddata' video event -->
    <!-- <video ref="videoRef" :style="{ display: 'none' }" crossorigin="anonymous" preload="auto" /> -->
    <!-- <button @click=" videoRef?.play() ">
    play
  </button>
  <button @click=" videoRef?.pause() ">
    pause
  </button> -->
    <!-- <img :src="thumbnailSrc" w="200px" h="200px"> -->
    <!-- Why is that NuxtImg src must be string? if dataurl? -->
    <!-- <NuxtImg :src="thumbnailSrc" w="200px" h="200px" /> -->
    <div id="videoContainer" w="100vw">
      <video ref="videoRef" crossorigin="anonymous" preload="auto" :src="videoUrl" />
      <!-- <NuxtPage :video_url="videoUrl" /> -->
      <!-- <NPlayer
        :options="{ src: videoUrl }"
      /> -->
    </div>
    <a-tabs>
      <a-tab-pane key="1" title="Introduction">
        <div flex="~" class="justify-between" p="x-2" w="full" bg="blue">
          <div flex="~" class="items-center">
            <Avatar avatar-src="/zzinx58.png" w="50px" border="rounded-full" />
            <div
              text="lg center"
              p="5"
            >
              {{ video?.data.attributes.video_fromUser.data.attributes.username }}
            <!-- {{ videoAttributes.video_fromUser.data.attributes.username }} -->
            </div>
          </div>
          <div p="5">
            <a-tag>Publisher</a-tag>
          </div>
        </div>

        <a-collapse
          expand-icon-position="right"
        >
          <a-collapse-item>
            <template #header>
              <div text="lg">
                {{ video?.data.attributes.video_title }}
              </div>
              <div>
                {{ videoCreateAt }}
              </div>
            </template>
            <div>
              <a-space>
                <a-Tag
                  v-for="item in video?.data.attributes.video_categories.data" :key="item.id"
                  bordered
                  :color="colors[+item.id]"
                >
                  {{ item.attributes.category_name }}
                </a-Tag>
              </a-space>
            </div>
            <div>
              视频简介: {{ video?.data.attributes.video_description }}
            </div>
          </a-collapse-item>
        </a-collapse>

        <div flex="~" class="justify-around" w="full" p="y-5">
          <div flex="1 ~ col" class="items-center">
            <div i-mdi-thumb-up text="2xl" bg="gray-400" />
            <span>{{ video?.data.attributes.video_likes }}</span>
          <!-- <span>{{ videoAttributes.video_likes }}</span> -->
          <!-- <span>{{ video_likes }}</span> -->
          </div>
          <div flex="1 ~ col" class="items-center">
            <div i-mdi-folder-star text="2xl" bg="gray-400" />
            <span>{{ video?.data.attributes.video_collections }}</span>
          <!-- <span>{{ videoAttributes.video_collections }}</span> -->
          <!-- <span>{{ video_collections }}</span> -->
          </div>
          <div flex="1 ~ col" class="items-center">
            <div i-mdi-eye text="2xl" bg="gray-400" />
            <span>{{ video?.data.attributes.video_played }}</span>
          <!-- <span>{{ videoAttributes.video_played }}</span> -->
          <!-- <span>{{ video_played }}</span> -->
          </div>
        </div>
        <div>
          <a-list :scrollbar="true">
            <template #header>
              <div flex="~">
                更多相关视频
                <div i-mdi-arrow-down class="flex items-center justify-center text-xl" />
              </div>
            </template>
            <!-- Notice!!!: '/videos/' not 'videos/' -->
            <a-list-item v-for="item in videoListSource" :key="item.id" @click="navigateTo({ path: `/videos/${item.id}` })">
              <a-list-item-meta
                :title="item.title"
                :description="item.description"
              />
              <template #extra>
                <div flex="~" class="items-center justify-center m-auto">
                  <!-- <img :src="item.coverSrc"> -->
                  <NuxtImg :src="item.coverSrc" width="120" height="80" />
                <!-- <NuxtImg /> -->
                </div>
              </template>
            </a-list-item>
          </a-list>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" title="Comments">
        <a-space>
          <div p="15px">
            <a-comment
              align="right"
              author="Balzac"
              avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
              content="A design is a plan or specification for the construction of an object
          or system or for the implementation of an activity or process, or the
          result of that plan or specification in the form of a prototype,
          product or process."
              datetime="1 hour"
            >
              <template #actions>
                <span class="action">  Reply </span>
              </template>
              <a-comment
                align="right"
                avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
              >
                <template #actions>
                  <a-button key="0" type="secondary">
                    Cancel
                  </a-button>
                  <a-button key="1" type="primary">
                    Reply
                  </a-button>
                </template>
                <template #content>
                  <a-input placeholder="Here is you content." />
                </template>
              </a-comment>
            </a-comment>
          </div>
        </a-space>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped lang='scss'>
</style>
