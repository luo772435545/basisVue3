import { createRouter, createWebHashHistory } from "vue-router";
import { useTokenStore } from "@/store/token";
import { useUserStore } from "@/store/userInfo";

// @ts-ignore
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/components/layout/Main.vue"),
      redirect: "/test",
      children: [
        {
          path: "/test",
          component: () => import("@/views/test/test.vue"),
          meta: {
            classification: "test",
            menuPath: "/test",
          },
        },
        {
          path: "/test1",
          component: () => import("@/views/test/test1.vue"),
          meta: {
            classification: "test1",
            menuPath: "/test1",
          },
        },
        {
          path: "/test2",
          component: () => import("@/views/test/test2.vue"),
          meta: {
            classification: "test2",
            menuPath: "/test2",
          },
        },
      ],
    },
    {
      path: "/login",
      component: () => import("@/views/login/login.vue"),
    },
    {
      path: "/404",
      component: () => import("@/views/404.vue"),
    },
    {
      path: "/403",
      component: () => import("@/views/403.vue"),
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/404",
    },
  ],
});

router.beforeEach((to, form, next) => {
  const tokenStore = useTokenStore();
  const userInfo = useUserStore();
  if (["/login", "/404", "/403"].includes(to.path)) {
    next();
  } else {
    tokenStore.refreshToken().then(() => {
      Promise.all([userInfo.getLoadConfig()]).then(async (result) => {
        if (result) {
          next();
        }
      });
    });
  }
});

export default router;
