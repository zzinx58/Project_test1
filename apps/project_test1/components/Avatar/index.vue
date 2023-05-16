<script setup lang='ts'>
interface AvatarProps { avatarSrc: string; avatarAlt?: string }
// Why the below one didn't work well?
// const { avatarSrc, avatarAlt = 'avatar-test' } = defineProps<AvatarProps>()
// 当使用基于类型的声明时，我们失去了为 props 声明默认值的能力。这可以通过 withDefaults 编译器宏解决，但使用起来仍然很笨拙。
const { avatarAlt, avatarSrc } = withDefaults(defineProps<AvatarProps>(), {
  avatarAlt: 'avatar',
})
</script>

<template>
  <!-- https://www.w3school.com.cn/tags/att_img_height-width.asp -->
  <!-- 浏览器通过下载并解析出图像的宽度和高度来决定图像的大小，然后就会在显示窗口中留出一个相应的矩形空间。 -->
  <!-- 使用 contents 创建一个 “phantom” 容器，它的子代就像父代的直接子代一样。 -->
  <!-- assets：打包工具会处理，访问时以~开头 -->
  <!-- public：会被作为应用程序根目录提供给用户，打包工具不会处理，访问时添加/即可 -->
  <!-- https://www.jianshu.com/p/ddfb5a8b458b -->
  <!-- 如果你正在以服务端渲染模式使用 Vite 则此模式不支持，因为 import.meta.url 在浏览器和 Node.js 中有不同的语义。服务端的产物也无法预先确定客户端主机 URL。 -->
  <!-- “＜img>”用于显示单个图像，而“＜pictures＞”用于提供针对不同屏幕大小或分辨率优化的图像的多个版本。 -->
  <!-- Presets are predefined sets of image modifiers that can be used create unified form of images in your projects. -->
  <NuxtImg
    :alt="avatarAlt"
    :src="avatarSrc"
  />
</template>

<style scoped lang='scss'>
</style>
