import { defineConfig } from "vite";
import path from "path";
import proxy from "./proxy/index";
import vue from "@vitejs/plugin-vue";
const IS_PROD: boolean = ["production", "prod"].includes(process.env.NODE_ENV);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 路径别名
      "#": path.resolve(__dirname, "public"), // 静态资源路径别名
    },
    extensions: [".js", ".json", ".jsx", ".vue", ".ts"], // 使用路径别名时想要省略的后缀名
  },
  plugins: [vue()],
  base: !IS_PROD ? "/" : "./",
  server: {
    open: "/index.html",
    host: "0.0.0.0",
    port: 8500,
    https: false,
    proxy: proxy,
    hmr: {
      overlay: false,
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        // antdv 主题色设置
        /*modifyVars: {
          "@primary-color": "#204D6B",
          "@link-color": "#1E4C6C",
        },*/
        javascriptEnabled: true,
      },
    },
  },
});
