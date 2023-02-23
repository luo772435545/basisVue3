export default [
  {
    menuKey: "test", // 对应权限列表的operGroupCode 唯一
    title: "测试菜单",
    path: "/test",
    pagePermission: "test_query", // 菜单是否展示
    permission: [],
    icon: {
      type: 1,
      value: "apartment-outlined",
    },
  },
  {
    title: "测试菜单1",
    pagePermission: "test_query", // 菜单是否展示
    permission: [],
    icon: {
      type: 1,
      value: "message-outlined",
    },
    menuKey: "a1",
    children: [
      {
        menuKey: "test1", // 对应权限列表的operGroupCode
        title: "测试菜单1-1",
        path: "/test1",
        pagePermission: "test2_query", // 菜单是否展示
        permission: [],
        icon: {
          type: 1,
          value: "thunderbolt-outlined",
        },
      },
      {
        menuKey: "test2", // 对应权限列表的operGroupCode
        title: "测试菜单1-2",
        path: "/test2",
        pagePermission: "test_query", // 菜单是否展示
        permission: [],
        icon: {
          type: 1,
          value: "contacts-outlined",
        },
      },
    ],
  },
];
