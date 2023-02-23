<template>
  <a-result status="404" title="404" sub-title="很抱歉，您访问的页面不存在。">
    <template #extra>
      <a-button type="primary" @click="goBack">返回首页</a-button>
    </template>
  </a-result>
</template>
<script setup lang="ts">
const goBack = () => {
  window.location.href = "./index.html#/test";
  window.location.reload();
};
</script>
