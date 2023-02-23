const PROXY_URL = {
  dev: "http://xxx.com/",
  test: "http://xxx.com/",
};

let target_api = PROXY_URL.test;
export default {
  "/tms-service": {
    target: target_api,
    changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
    rewrite: (path) => {
      return path;
    },
  },
};
