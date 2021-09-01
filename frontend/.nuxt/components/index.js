export { default as NavBar } from '../../components/NavBar.vue'
export { default as NavDraver } from '../../components/NavDraver.vue'

export const LazyNavBar = import('../../components/NavBar.vue' /* webpackChunkName: "components/nav-bar" */).then(c => c.default || c)
export const LazyNavDraver = import('../../components/NavDraver.vue' /* webpackChunkName: "components/nav-draver" */).then(c => c.default || c)
