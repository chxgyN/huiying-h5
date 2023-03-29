// 基础路由
// 组件懒加载（组件需要使用再加载） es6提供的import实现
const Layout  = () => import('@/views/Layout')
export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        // 斜杠表示绝对路径
        path: '/home',
        name: "Home",
        meta: { scrollY: 0 },
        component: () => import('@/views/home/index')
      },
      {
        path: '/movies',
        name: "Movies",
        meta: { scrollY: 0 },
        component: () => import('@/views/movie/index/index')
      },
      {
        path: '/profile',
        name: "Profile",
        meta: { scrollY: 0 },
        component: () => import('@/views/profile/index/index'),
        children: [
          {
            path: '/profile/information',
            name: "ProfileInformation",
            component: () => import('@/views/profile/information/index')
          },
          {
            path: '/profile/author',
            name: "AboutAuthor",
            component: () => import('@/views/profile/aboutus/author')
          },
          {
            path: '/profile/project',
            name: "AboutProject",
            component: () => import('@/views/profile/aboutus/project')
          },
          {
            path: '/profile/setting',
            name: "Setting",
            component: () => import('@/views/profile/setting/index')
          },
        ]
      },
    ]
  },
]