import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _cf0e4ee6 = () => interopDefault(import('..\\pages\\bus.vue' /* webpackChunkName: "pages/bus" */))
const _088ad136 = () => interopDefault(import('..\\pages\\dest.vue' /* webpackChunkName: "pages/dest" */))
const _bb46b894 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _84b18a08 = () => interopDefault(import('..\\pages\\main.vue' /* webpackChunkName: "pages/main" */))
const _8006eef0 = () => interopDefault(import('..\\pages\\mytickets.vue' /* webpackChunkName: "pages/mytickets" */))
const _0e3f5d34 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _2cac26aa = () => interopDefault(import('..\\pages\\search.vue' /* webpackChunkName: "pages/search" */))
const _f61dfa18 = () => interopDefault(import('..\\pages\\tickets.vue' /* webpackChunkName: "pages/tickets" */))
const _1e1edad5 = () => interopDefault(import('..\\pages\\users.vue' /* webpackChunkName: "pages/users" */))
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
    path: "/bus",
    component: _cf0e4ee6,
    name: "bus"
  }, {
    path: "/dest",
    component: _088ad136,
    name: "dest"
  }, {
    path: "/login",
    component: _bb46b894,
    name: "login"
  }, {
    path: "/main",
    component: _84b18a08,
    name: "main"
  }, {
    path: "/mytickets",
    component: _8006eef0,
    name: "mytickets"
  }, {
    path: "/register",
    component: _0e3f5d34,
    name: "register"
  }, {
    path: "/search",
    component: _2cac26aa,
    name: "search"
  }, {
    path: "/tickets",
    component: _f61dfa18,
    name: "tickets"
  }, {
    path: "/users",
    component: _1e1edad5,
    name: "users"
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
