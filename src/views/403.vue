<template>
  <a-result status="403" title="403" sub-title="抱歉，您无权访问此页面。">
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
