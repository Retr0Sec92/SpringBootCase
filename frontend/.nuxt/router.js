import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4c99b26e = () => interopDefault(import('../pages/bus.vue' /* webpackChunkName: "pages/bus" */))
const _3c6bdeae = () => interopDefault(import('../pages/dest.vue' /* webpackChunkName: "pages/dest" */))
const _7e3c52f2 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _b8929780 = () => interopDefault(import('../pages/main.vue' /* webpackChunkName: "pages/main" */))
const _39ba39c4 = () => interopDefault(import('../pages/mytickets.vue' /* webpackChunkName: "pages/mytickets" */))
const _276ceeac = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _ec7fb622 = () => interopDefault(import('../pages/search.vue' /* webpackChunkName: "pages/search" */))
const _30bc59a0 = () => interopDefault(import('../pages/tickets.vue' /* webpackChunkName: "pages/tickets" */))
const _0c02ebde = () => interopDefault(import('../pages/users.vue' /* webpackChunkName: "pages/users" */))
const _96d6a04a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    path: "/bus",
    component: _4c99b26e,
    name: "bus"
  }, {
    path: "/dest",
    component: _3c6bdeae,
    name: "dest"
  }, {
    path: "/login",
    component: _7e3c52f2,
    name: "login"
  }, {
    path: "/main",
    component: _b8929780,
    name: "main"
  }, {
    path: "/mytickets",
    component: _39ba39c4,
    name: "mytickets"
  }, {
    path: "/register",
    component: _276ceeac,
    name: "register"
  }, {
    path: "/search",
    component: _ec7fb622,
    name: "search"
  }, {
    path: "/tickets",
    component: _30bc59a0,
    name: "tickets"
  }, {
    path: "/users",
    component: _0c02ebde,
    name: "users"
  }, {
    path: "/",
    component: _96d6a04a,
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
