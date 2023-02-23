<script setup lang="ts">
import { ref, Ref, watch } from "vue";
import menu from "@/utils/menu";
import { useRoute } from "vue-router";
import { ApartmentOutlinedIconType } from "@ant-design/icons-vue/lib/icons/ApartmentOutlined";
import { ApartmentOutlined, ContactsOutlined, MessageOutlined, SendOutlined, ThunderboltOutlined } from "@ant-design/icons-vue";
import SubMenu from "@/components/common/SubMenu.vue";

const route = useRoute();
const selectedKeys: Ref<string[]> = ref([]);
const openKeys: Ref<string[]> = ref([]);

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

watch(
  route,
  () => {
    openKeys.value = setMenuKey(menu, []);
  },
  {
    immediate: true,
  }
);
function setMenuKey(menuData: any[], useOpenKeys: string[]): string[] {
  menuData.forEach((i) => {
    if (i.children) {
      useOpenKeys.push(i.menuKey);
      setMenuKey(i.children, useOpenKeys);
    } else {
      if (i.path === route.meta.menuPath) {
        selectedKeys.value = [(route.meta.menuPath as string).slice(1)];
      }
    }
  });
  return useOpenKeys;
}
</script>

<template>
  <a-layout-sider width="200" class="content-h">
    <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" class="left-menu" mode="inline">
      <SubMenu :subMenuData="menu"></SubMenu>
    </a-menu>
  </a-layout-sider>
</template>

<style scoped lang="less">
.menu-icon {
  width: 16px;
  display: inline-block;
  text-align: center;
  color: #000;
  font-weight: bold;
  font-size: 12px;
  margin-right: 8px;
}
.left-menu {
  height: 100%;
  border-right: 0;
  border-top: 1px solid #f0f2f5;
  background-color: #ffffff;
  min-height: 800px;
}
</style>
