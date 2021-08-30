export const state = () => ({
    overlay: false,
    menus: [],
    user_info: undefined
})

export const mutations = {
    setOverlay(state, payload) {
        state.overlay = payload
    },
    setUserInfo(state, payload) {
        state.user_info = payload
    },
    setMenus(state, payload) {
        state.menus = payload
    },
}

export const getters = {
    getOverlayStatus: (state) => {
        return state.overlay
    },
}

export const actions = {
    async login({ commit }, payload) {
        commit('setOverlay', true)
        await this.$axios({ method: 'post', url: '/api/login', headers: {}, data: payload })
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem('access_token', res.data.access_token)
                    localStorage.setItem('refresh_token', res.data.refresh_token)
                    this.$router.push('/main')
                }
            })
            .catch(error => {
                localStorage.removeItem('refresh_token')
                localStorage.removeItem('access_token')
                this.$toast.show(error.response.data, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
            })
        commit('setOverlay', false)
    },

    async main({ commit }) {
        commit('setOverlay', true)
        await this.$axios({ method: 'post', url: '/api/main', headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token'), "X-Auth-Token": 'Basic ' + localStorage.getItem('refresh_token') } })
            .then(res => {
                if (res.status === 200) {
                    commit('setUserInfo', res.data.user_info)
                    commit('setMenus', res.data.menus)
                }
            })
            .catch(error => {
                this.$router.push('/login');
                localStorage.removeItem('refresh_token')
                localStorage.removeItem('access_token')
                this.$toast.show(error.response.data, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
            })
        commit('setOverlay', false)
    },
}