<script setup lang='ts'>
const testObj = {
  title: '基于 Vue 的在线视频教育平台设计与实现',
  subTitle: '本视频课程讲述如何基于 Vue 前端框架实现一个在线上视频教育平台',
  video_views: '19240134',
  video_coverSrc:
    'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c2a69371dee452e8dad6399390de021~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?',
  video_id: '19240134',
  video_url: 'https://www.baidu.com',
}

testObj.video_views = new Intl.NumberFormat('en-US', { notation: 'compact' }).format(+testObj.video_views)

type SelectIdFields<T> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends infer U
      ? U extends string
        ? string & K extends `${infer _}${'id'}`
          ? K
          : never
        : never
      : never;
  }[keyof T]
>

const queryUrlBase = '/videos/'
function eventHandler(eventType: string, item: SelectIdFields<typeof testObj>) {
  switch (eventType) {
    case 'navTo':
      (() => {
        navigateTo(queryUrlBase + item.video_id)
      })()
  }
}
</script>

<template>
  <div>
    <var-card
      :title="testObj.title"
      :subtitle="testObj.subTitle"
      src="/zzinx58.png"
      ripple
      @click="eventHandler('navTo', testObj)"
    >
      <template #extra>
        <var-space>
          <var-cell>
            <template #icon>
              <div class="i-mdi-eye-outline text-lg" />
            </template>
            <div pl-2>
              {{ testObj.video_views }}
            </div>
          </var-cell>
        </var-space>
      </template>
    </var-card>
  </div>
</template>

<style scoped lang='scss'>
</style>
