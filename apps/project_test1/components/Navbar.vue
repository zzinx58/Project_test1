<script setup lang='ts'>
useHead({
  title: '首页',
})
</script>

<template>
  <!-- items-center is for vertical align. -->
  <!-- gray! Not grey! -->
  <nav id="navbar" class="flex items-center justify-between" p="x-2">
    <div id="navbar-left" text="2xl">
      IT Source | BTF
    </div>
    <div id="navbar-center">
      <!-- <SearchBar /> -->
      <!-- {{ $route.path }} -->
    </div>
    <div id="navbar-right" class="contents">
      <Avatar
        w="50px"
        avatar-src="/zzinx58.png"
        border="rounded-full"
      />
    </div>
  </nav>
</template>

<style scoped lang="scss">
#navbar {
  // height: $header-height;
  // height: var(--header-height);
  height: theme("heights.header");
  // --uno: bg-green-400;
  // --uno: bg-green-800;
  // background-color: #5ACFA9;
}
</style>
