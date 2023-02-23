import { createApp, markRaw } from "vue";
import Antd from "ant-design-vue";
import { createPinia } from "pinia";
import router from "@/router/index";
import App from "./App.vue";
import "@/style/theme.less";
import "ant-design-vue/dist/antd.less";
import "@/style/common.css";

const app = createApp(App);
const pinia = createPinia();
pinia.use(({ store }) => {
  store.$router = markRaw(router);
});
app.use(Antd).use(pinia).use(router).mount("#app");
