import axios, { AxiosResponse, Canceler, InternalAxiosRequestConfig } from "axios";
import { message, Modal } from "ant-design-vue";
import exceptionCode from "@/locale/exceptionCode";
import { debounce } from "@/utils/index";
import { useTokenStore } from "@/store/token";
// axios 配置
axios.defaults.timeout = 180000;
axios.defaults.baseURL = "";
axios.defaults.responseType = "json";
axios.defaults.headers.post["Accept"] = "application/json;";
axios.defaults.headers.post["Content-Type"] = "application/json;";
axios.defaults.headers.delete["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.delete["Accept"] = "application/json;";
axios.defaults.headers.delete["Content-Type"] = "application/json;";
axios.defaults.headers.put["Content-Type"] = "application/json;";
axios.defaults.headers.put["Accept"] = "application/json; ";
axios.defaults.headers.get["Content-Type"] = "application/json;";
axios.defaults.headers.get["Accept"] = "application/json; ";

interface PendingObj {
  u: string;
  cancel: any;
}
let pending: PendingObj[] = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let CancelToken = axios.CancelToken;
// http request 拦截器
axios.interceptors.request.use(
  function (config) {
    config.cancelToken = requestCancel(config);
    const tokenStore = useTokenStore();
    let token = tokenStore.getToken();
    if (token) {
      config.headers.Authorization = token;
    } else {
      console.log("token值已过期");
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  function (response) {
    const tokenStore = useTokenStore();
    let { config, data } = response;
    let { code } = data;
    removePending(config);
    switch (code) {
      case 999998:
        window.location.href = tokenStore.loginUrl;
        window.location.reload();
        break;
      case 999993:
        message.error(data.message);
        break;
      case 10555555:
        // 取消
        console.log("cancel");
        break;
      case 0:
        return data;
      default:
        showHttpErrorMessage(data.code);
        return data;
    }
  },
  (error) => {
    let { config } = error;
    removePending(config);
    if (error.message.includes("timeout")) {
      message.error("请求超时");
    } else {
      message.error("系统内部错误");
    }
  }
);

// 异常编码提示的方法
let showHttpErrorMessage = function (code: number) {
  let keys = Object.keys(exceptionCode),
    text: string = "操作失败";
  if (keys.indexOf(String(code)) > -1) {
    // @ts-ignore
    text = exceptionCode[code];
    setTimeout(() => {
      message.error(text);
    });
  }
};
// 防止多次请求相同接口的处理方法
let removePending = (config: InternalAxiosRequestConfig, cancel?: Canceler) => {
  let params = "";
  if (config && config.data) {
    try {
      let obj = JSON.parse(config.data);
      params = JSON.stringify(obj);
    } catch (e) {
      params = JSON.stringify(config.data);
    }
  }
  if (config && config.url) {
    if (config.url.includes("fresh=KEEPNEW")) {
      for (let p in pending) {
        if (pending[p].u === config.url + "&" + config.method) {
          // 当当前请求在数组中存在时执行函数体
          let c = pending[p].cancel;
          c("cancelHttp");
          pending.splice(Number(p), 1); // 把这条记录从数组中移除
          return;
        }
      }
    } else {
      for (let p in pending) {
        if (pending[p].u === config.url + "&" + config.method + "&" + params) {
          // 当当前请求在数组中存在时执行函数体
          cancel && cancel("cancelHttp");
          pending.splice(Number(p), 1); // 把这条记录从数组中移除
          return;
        }
      }
    }
  }
  debounce(
    () => {
      pending = [];
    },
    5000,
    true
  );
};
// 取消处理
let requestCancel = function (config: InternalAxiosRequestConfig<any>) {
  return new CancelToken((c) => {
    removePending(config, c);
    let params = "";
    if (config.data) {
      try {
        if (Object.prototype.toString.call(config.data) === "[object Array]") {
          if (config.data.length === 1) {
            params = JSON.stringify(config.data);
          }
        } else {
          let obj = JSON.parse(config.data);
          params = JSON.stringify(obj);
        }
      } catch (e) {
        params = JSON.stringify(config.data);
      }
    }
    if (config.url) {
      if (config.url.includes("fresh=KEEPNEW")) {
        pending.push({ u: config.url + "&" + config.method, cancel: c });
      } else {
        pending.push({
          u: config.url + "&" + config.method + "&" + params,
          cancel: c,
        });
      }
    }
  });
};

export default axios;
