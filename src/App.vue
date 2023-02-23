<template>
  <a-config-provider :locale="locale">
    <router-view></router-view>
  </a-config-provider>
  <a-back-top />
</template>

<script setup lang="ts">
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import { provide } from "vue";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

const locale = zhCN

provide('paginationConfig',{
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total:string|number) => `共 ${total} 条`,
  pageSizeOptions: ["10", "20", "50", "100", "200"],
})
</script>
