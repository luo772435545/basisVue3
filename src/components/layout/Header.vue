<script setup lang="ts">
import { UserOutlined, LogoutOutlined } from "@ant-design/icons-vue";
import { useUserStore } from "@/store/userInfo";
import { useTokenStore } from "@/store/token";
const userStore = useUserStore();
const tokenStore = useTokenStore();
</script>

<template>
  <a-layout-header class="header">
    <div class="logo">
      <!--      <img height="20" src="@/assets/logo-crm.png" />-->
    </div>
    <div class="right-header">
      <span class="username">{{ userStore.userName }}</span>
      <a-dropdown>
        <a-avatar>
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
        <template #overlay>
          <a-menu class="w-100">
            <a-menu-divider />
            <a-menu-item key="3" @click="tokenStore.logout">
              <logout-outlined class="mr10" />
              退出
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<style>
.main-box .ant-layout-header {
  padding: 0 25px;
}
</style>

<style scoped lang="less">
.header {
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  .logo {
    margin-left: -6px;
  }
  .w-100 {
    width: 100px;
  }
  .username {
    margin-right: 10px;
    font-size: 14px;
    color: #666666;
  }
}
</style>
