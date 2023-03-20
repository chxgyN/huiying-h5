// 影视路由表
export default [
  // 影视详情
  {
    path: '/movies/:id',
    props: true,
    component: () => import('@/views/movie/detail/index/index'),
    children: [
      {
        path: '/movies/:id/detail',
        name: "MovieDetail",
        props: true,
        component: () => import('@/views/movie/detail/index/detail'),
      },
      {
        path: '/movies/:id/awards',
        props: true,
        name: "MovieAwards",
        component: () => import('@/views/movie/detail/award/index')
      },
      {
        path: '/movies/:id/comments',
        name: "MovieComment",
        props: true,
        component: () => import('@/views/comment/index')
      },
      {
        // 看过评分
        path: '/movies/:id/rating/create',
        name: "MovieRatingCreate",
        props: true,
        component: () => import('@/views/movie/detail/rating/create'),
      },
      // {
      //   path: '/movies/:id/rating',
      //   name: "MovieRating",
      //   props: true,
      //   component: () => import('@/views/movie/detail/rating/index'),
      // },
      {
        // 收藏
        path: '/movies/:id/favorite',
        name: "MovieFavorite",
        props: true,
        component: () => import('@/views/movie/detail/index/favorite'),
        children: [
          {
            path: '/movies/:id/favorite/create',
            name: "MovieFavoriteCreate",
            props: true,
            component: () => import('@/views/profile/favorite/create/index'),
          },
        ]
      },
      {
        path: '/movies/:id/pubdates',
        props: true,
        name: "MoviePubdates",
        component: () => import('@/views/movie/detail/pubdate/index')
      },
      {
        path: '/movies/:id/levels',
        props: true,
        name: "MovieLevels",
        component: () => import('@/views/movie/detail/level/index')
      },
      {
        path: '/movies/:id/knowledges',
        props: true,
        name: "MovieKnowledges",
        component: () => import('@/views/movie/detail/knowledge/index')
      },
      {
        path: '/movies/:id/dialogues',
        props: true,
        name: "MovieDialogues",
        component: () => import('@/views/movie/detail/dialogue/index')
      },
      {
        path: '/movies/:id/companies',
        props: true,
        name: "MovieCompanies",
        component: () => import('@/views/movie/detail/company/index')
      },
    ]
  },
  {
    path: '/movies/:id/cast',
    props: true,
    name: "MovieCast",
    component: () => import('@/views/movie/detail/cast')
  },
  // {
  //   path: '/movies/:id/serials',
  //   props: true,
  //   name: "MovieSerials",
  //   component: () => import('@/views/movie/detail/serial')
  // },

]