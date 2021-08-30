import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _bb46b894 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _84b18a08 = () => interopDefault(import('..\\pages\\main.vue' /* webpackChunkName: "pages/main" */))
const _0e3f5d34 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _152f970e = () => interopDefault(import('..\\pages\\suppliers\\index.vue' /* webpackChunkName: "pages/suppliers/index" */))
const _d69a2268 = () => interopDefault(import('..\\pages\\suppliers\\_id\\index.vue' /* webpackChunkName: "pages/suppliers/_id/index" */))
const _4e95fec2 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _bb46b894,
    name: "login"
  }, {
    path: "/main",
    component: _84b18a08,
    name: "main"
  }, {
    path: "/register",
    component: _0e3f5d34,
    name: "register"
  }, {
    path: "/suppliers",
    component: _152f970e,
    name: "suppliers"
  }, {
    path: "/suppliers/:id",
    component: _d69a2268,
    name: "suppliers-id"
  }, {
    path: "/",
    component: _4e95fec2,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
