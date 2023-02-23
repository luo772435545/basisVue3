import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { get_employee_refresh, post_employee_login, post_employee_logout } from "@/services";
const tokenTime = 1800000;
const refreshTime = 300000;
const TOKEN_KEY = "token";

export const useTokenStore = defineStore("token", {
  state: () => {
    return {
      loginUrl: "./index.html#/login",
      token: "",
    };
  },
  getters: {},
  actions: {
    getToken(): string {
      let key: string = TOKEN_KEY;
      const token = Cookies.get(key) ? Cookies.get(key) : sessionStorage.getItem(TOKEN_KEY); // hack 方案
      if (token) {
        return token;
      } else {
        return "noToken";
      }
    },
    setToken(token: string) {
      let inFifteenMinutes = new Date(new Date().getTime() + tokenTime);
      sessionStorage.setItem(TOKEN_KEY, token);
      Cookies.set(TOKEN_KEY, token, { expires: inFifteenMinutes });
    },
    removeToken(): void {
      sessionStorage.removeItem("token"); // hack 方案
      localStorage.removeItem("token");
      localStorage.clear();
      sessionStorage.clear();
      Cookies.remove(TOKEN_KEY);
    },
    async refreshToken(): Promise<boolean> {
      const { code } = await get_employee_refresh(this.getToken());
      if (code === 0) {
        setTimeout(() => {
          this.refreshToken();
        }, refreshTime);
      }
      return true;
    },
    async login(formState: loginParams): Promise<boolean> {
      const { code, datas } = await post_employee_login(formState);
      if (code === 0) {
        this.token = datas;
        this.setToken(datas);
        this.$router.push("/test");
        return true;
      }
      return false;
    },
    async logout(): Promise<void> {
      const { code } = await post_employee_logout(this.getToken());
      if (code === 0) {
        this.removeToken();
        this.$router.push("/login");
      }
    },
  },
});
