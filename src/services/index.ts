import { GET, POST } from "@/utils/httpEntry";

// 登录
export const post_employee_login = (params: loginParams) => {
  return POST("/employee/login", params);
};
// 登出
export const post_employee_logout = (token: string) => {
  return POST("/employee/logout/" + token);
};
// 获取用户信息
export const get_loadConfig = (token: string) => {
  return GET("/employee/loadConfig/" + token);
};
// 刷新token
export const get_employee_refresh = (token: string) => {
  return GET("/employee/refresh/" + token + "?fresh=KEEPNEW");
};

// 组织
// 查询组织明细列表
export const get_organize = () => {
  return GET("/organize");
};
