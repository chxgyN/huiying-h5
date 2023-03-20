// 个人中心
export default [
  {
    path: '/profile/favorites',
    name: "ProfileFavorites",
    component: () => import('@/views/profile/favorite/index'),
    children: [
      {
        path: '/profile/favorites/create',
        props: true,
        name: "ProfileFavoriteCreate",
        component: () => import('@/views/profile/favorite/create/index')
      },
    ]
  },
  // {
  //   path: '/profile/favorites/create',
  //   props: true,
  //   name: "ProfileFavoriteCreate",
  //   component: () => import('@/views/profile/favorite/create/index')
  // },
  {
    path: '/profile/favorites/:id',
    props: true,
    name: "ProfileFavorite",
    component: () => import('@/views/profile/favorite/detail'),
    children: [
      {
        path: '/profile/favorites/:id/edit',
        props: true,
        name: "profileFavoriteEdit",
        component: () => import('@/views/profile/favorite/edit/index')
      },
    ]
  },
  {
    path: '/profile/actors',
    name: "ProfileActors",
    component: () => import('@/views/profile/collection/actor')
  },
  {
    path: '/profile/reviews',
    name: "ProfileReviews",
    component: () => import('@/views/profile/collection/review')
  },
]