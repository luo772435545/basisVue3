import { defineStore } from "pinia";
import { get_loadConfig } from "@/services";
import { useTokenStore } from "@/store/token";

export const useUserStore = defineStore("userInfo", {
  state: (): userInfoObject => {
    return {
      userInfo: null,
    };
  },
  getters: {
    userName(): string {
      if (this.userInfo) {
        return this.userInfo.name || "-";
      } else {
        return "-";
      }
    },
  },
  actions: {
    async getLoadConfig(): Promise<boolean> {
      const TokenStore = useTokenStore();
      const { code, datas } = await get_loadConfig(TokenStore.getToken());
      if (code === 0) {
        this.userInfo = datas;
      }
      return true;
    },
    getPermission(key: string): boolean {
      if (this.userInfo) {
        let isAdmin = this.userInfo.isAdmin === 1;
        let _employeeOperResults = this.userInfo.employeeOperResults || [];
        return isAdmin || _employeeOperResults.some((i: any) => i.operCode === key);
      } else {
        return false;
      }
    },
  },
});

interface userInfoInterface {
  createdBy: string | null;
  createdTime: string | null;
  email: string | null;
  employeeId: string | null;
  employeeOperResults: [] | null;
  entryTime: string | null;
  filenodeViewTargetUrl: string | null;
  isAdmin: number | null;
  name: string | null;
  organizeId: string | null;
  parentEmployeeId: string | null;
  parentEmployeeIdNavigation: string | null;
  password: string | null;
  phone: string | null;
  positionId: string | null;
  status: number | null;
  updatedBy: string | null;
  updatedTime: string | null;
}

interface userInfoObject {
  userInfo: userInfoInterface | null;
  [propName: string]: any;
}
