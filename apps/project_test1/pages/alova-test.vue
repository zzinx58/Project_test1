<script setup lang='ts'>
import { createAlova, useRequest } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import VueHook from 'alova/vue'

const alovaInstance = createAlova({
  statesHook: VueHook,
  requestAdapter: GlobalFetch(),
  responded: response => response.json(),
})
const { loading, data, error } = useRequest(
  alovaInstance.Get('http://localhost:1337/api/collections'),
)
</script>

<template>
  <pre>{{ data }}</pre>
</template>

<style scoped lang='scss'>
</style>
