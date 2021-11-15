import { getToken } from 'src/utils/auth'
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  Router.beforeEach((to, from, next) => {
    const authToken = getToken()
    // If auth token is present and store says user is not logged in,
    // then it implies page was hard refreshed
    if (authToken !== null && !store.state.user.isLoggedIn) {
      store.dispatch('user/setLoggedIn', true)
    }
    if (to.matched.some(record => record.meta.auth) && authToken === null) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else if (
      to.matched.some(record => record.meta.guest) &&
      authToken !== null
    ) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  })
  return Router
}
