const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: 'signup',
        component: () => import('pages/Signup.vue'),
        meta: {
          guest: true
        }
      },
      {
        path: 'login',
        component: () => import('pages/Login.vue'),
        meta: {
          guest: true
        }
      },
      {
        path: 'users',
        component: () => import('pages/Users.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: 'users/add',
        component: () => import('pages/AddUsers.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: 'users/edit/:id',
        component: () => import('pages/EditUser.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: 'profile',
        component: () => import('pages/Profile.vue'),
        meta: {
          auth: true
        }
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
