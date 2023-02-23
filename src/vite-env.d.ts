import { Router } from "vue-router";

declare module "pinia" {
  export interface PiniaCustomProperties {
    $router: Router;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "prod";
    }
  }
}
