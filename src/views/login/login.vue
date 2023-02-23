<template>
  <div class="login-box">
    <div class="login-content">
      <div class="logo">
        <!--        <img src="@/assets/logo.png" />-->
      </div>
      <a-form :model="formState" name="basic" :label-col="{ span: 0 }" :wrapper-col="{ span: 24 }" autocomplete="off" @finish="onFinish">
        <a-form-item name="emailOrMobile" :rules="[{ required: true, message: '请输入邮箱' }]">
          <a-input v-model:value.trim="formState.emailOrMobile" size="large" placeholder="邮箱" :maxlength="100">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
          <a-input-password v-model:value.trim="formState.password" size="large" placeholder="密码" :maxlength="100">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button block type="primary" size="large" :loading="btnLoading" html-type="submit">
            {{ btnLoading ? "登录中" : "登录" }}
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { useTokenStore } from "@/store/token";

const formState: loginParams = reactive({
  emailOrMobile: "aa",
  password: "123",
});

let btnLoading = ref(false);
const tokenStore = useTokenStore();

const onFinish = async () => {
  btnLoading.value = true;
  await tokenStore.login(formState);
  btnLoading.value = false;
};
</script>

<style>
body {
}
</style>
<style scoped>
.login-box {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #eaedf1 !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-content {
  margin-top: -100px;
  width: 500px;
  padding: 20px 70px;
  background-color: #ffffff;
  border-radius: 20px;
}

.logo {
  text-align: center;
  padding: 30px 0 20px 0;
}
</style>
