module.exports = {
  router: {
    extendRoutes(routes, resolve) {
      // 清除路由
      routes.splice(0)

      routes.push(
        ...[
          {
            path: '/',
            component: resolve(__dirname, 'pages/layout/'),
            children: [
              {
                path: '', // 默认子路由
                name: 'home',
                component: resolve(__dirname, 'pages/home/'),
              },
            ],
          },
          {
            path: '/login',
            name: 'login',
            component: resolve(__dirname, 'pages/login/'),
          },
          {
            path: '/register',
            name: 'register',
            component: resolve(__dirname, 'pages/login/'),
          },
        ],
      )
    },
  },
}
