<script setup lang="ts">
import { ApartmentOutlinedIconType } from "@ant-design/icons-vue/lib/icons/ApartmentOutlined";
import { ApartmentOutlined, ContactsOutlined, MessageOutlined, SendOutlined, ThunderboltOutlined } from "@ant-design/icons-vue";

interface subMenuObject {
  title: string;
  pagePermission: string; // 菜单是否展示
  permission?: string[];
  icon?: {
    type: number;
    value: string;
  };
  path?: string;
  menuKey: string;
  children?: any;
}
interface prop {
  subMenuData: subMenuObject[];
}
const props = defineProps<prop>();
function setAntdIcon(key: string): string | ApartmentOutlinedIconType {
  switch (key) {
    case "apartment-outlined":
      return ApartmentOutlined;
    case "message-outlined":
      return MessageOutlined;
    case "thunderbolt-outlined":
      return ThunderboltOutlined;
    case "contacts-outlined":
      return ContactsOutlined;
    case "send-outlined":
      return SendOutlined;
    default:
      return "";
  }
}
</script>

<template>
  <template v-for="item in subMenuData">
    <a-sub-menu v-if="item.children" :key="item.menuKey">
      <template #icon v-if="item.icon">
        <component v-if="item.icon && item.icon.type === 1" :is="setAntdIcon(item.icon.value)" class="mr10" />
        <span v-else-if="item.icon && item.icon.type === 2" class="iconfont menu-icon" v-html="item.icon.value"></span>
      </template>
      <template #title>
        {{ item.title }}
      </template>
      <SubMenu :subMenuData="item.children" />
    </a-sub-menu>
    <a-menu-item v-else :key="item.menuKey">
      <router-link v-if="item.path" :to="item.path">
        <template v-if="item.icon">
          <component v-if="item.icon.type === 1" :is="setAntdIcon(item.icon.value)" class="mr10" />
          <span v-else-if="item.icon.type === 2" class="iconfont menu-icon" v-html="item.icon.value"></span>
        </template>
        <span class="ml10">{{ item.title }}</span>
      </router-link>
    </a-menu-item>
  </template>
</template>

<style scoped lang="less"></style>
