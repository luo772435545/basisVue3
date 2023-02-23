<script setup lang="ts">
import Header from "@/components/layout/Header.vue";
import Left from "@/components/layout/Left.vue";
</script>
<template>
  <a-layout class="main-box">
    <Header />
    <a-layout>
      <Left />
      <a-layout>
        <a-layout-content class="content-h overflow-y-auto content-main">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<style>
body {
  height: 100% !important;
  background-color: #f0f2f5 !important;
}
</style>

<style scoped lang="less">
.content-main {
  padding: 20px 25px 0 25px;
}
.content-h {
  height: calc(100vh - 64px);
}
</style>
