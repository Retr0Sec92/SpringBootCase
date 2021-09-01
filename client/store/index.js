export const state = () => ({
    overlay: false,
    users: [],
    roles: [],
    destinations: [],
    busses: [],
    search_list: [],
    user_info: undefined
})

export const mutations = {
    setOverlay(state, payload) {
        state.overlay = payload
    },
    setUserInfo(state, payload) {
        state.user_info = payload
    },
    setUsers(state, payload) {
        state.users = payload
    },
    setRoles(state, payload) {
        state.roles = payload
    },
    setBusses(state, payload) {
        state.busses = payload
    },
    setDestinations(state, payload) {
        state.destinations = payload
    },
    setSearchList(state, payload) {
        state.search_list = payload
    },
}

export const getters = {
    getOverlayStatus: (state) => {
        return state.overlay
    },
    getUserInfo: (state) => {
        return state.user_info
    },
    getUsersList: (state) => {
        return state.users
    },
    getAllRoles: (state) => {
        return state.roles
    },
    getDestinationList: (state) => {
        return state.destinations
    },
    getBusList: (state) => {
        return state.busses
    },
    getSearchList: (state) => {
        return state.search_list
    }
}

export const actions = {
    async login({ commit }, payload) {
        commit('setOverlay', true)
        const params = new URLSearchParams();
        params.append("username", payload["username"]);
        params.append('password', payload["password"]);
        await this.$axios({ method: 'post', url: 'login', headers: {}, data: params })
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
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },

    async get_users({ commit }) {
        commit('setOverlay', true)
        await this.$axios({ method: 'get', url: 'users', headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } })
            .then(res => {
                commit('setUsers',res.data)
            })
            .catch(error => {
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },

    async save_user({ commit }, payload) {
        commit('setOverlay', true)
        await this.$axios({ method: 'post', url: 'users', headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }, data: payload })
            .then(res => {
                commit('setUsers',res.data)
            })
            .catch(error => {
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },

    async remove_user({ commit }, payload) {
        commit('setOverlay', true)
        await this.$axios({ method: 'delete', url: 'users/' + payload, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } })
            .then(res => {
                commit('setUsers',res.data)
            })
            .catch(error => {
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },

    async get_all_roles({ commit }) {
        commit('setOverlay', true)
        await this.$axios({ method: 'get', url: 'roles/', headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } })
            .then(res => {
                commit('setRoles',res.data)
            })
            .catch(error => {
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },

    async set_role_to_user({ commit }, payload) {
        commit('setOverlay', true)
        await this.$axios({ method: 'post', url: 'roles/add', headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }, data: payload })
            .then(res => {
                commit('setUsers',res.data)
            })
            .catch(error => {
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },

    async del_role_from_user({ commit }, payload) {
        commit('setOverlay', true)
        await this.$axios({ method: 'post', url: 'roles/remove', headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }, data: payload })
            .then(res => {
                commit('setUsers',res.data)
            })
            .catch(error => {
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },

    async get_destinations({ commit }) {
        commit('setOverlay', true)
        await this.$axios({ method: 'get', url: 'destination', headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } })
            .then(res => {
                commit('setDestinations',res.data)
            })
            .catch(error => {
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },

    async save_destinations({ commit }, payload) {
        commit('setOverlay', true)
        await this.$axios({ method: 'post', url: 'destination', headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }, data: payload })
            .then(res => {
                commit('setDestinations',res.data)
            })
            .catch(error => {
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },

    async update_destinations({ commit }, payload) {
        commit('setOverlay', true)
        await this.$axios({ method: 'put', url: 'destination/' + payload.id, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }, data: payload })
            .then(res => {
                commit('setDestinations',res.data)
            })
            .catch(error => {
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },

    async remove_destinations({ commit }, payload) {
        commit('setOverlay', true)
        await this.$axios({ method: 'delete', url: 'destination/' + payload, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } })
            .then(res => {
                commit('setDestinations',res.data)
            })
            .catch(error => {
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },

        async get_busses({ commit }) {
        commit('setOverlay', true)
        await this.$axios({ method: 'get', url: 'bus', headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } })
            .then(res => {
                commit('setBusses',res.data)
            })
            .catch(error => {
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },

    async save_busses({ commit }, payload) {
        commit('setOverlay', true)
        debugger
        await this.$axios({ method: 'post', url: 'bus', headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }, data: payload })
            .then(res => {
                commit('setBusses',res.data)
            })
            .catch(error => {
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },

    async update_busses({ commit }, payload) {
        commit('setOverlay', true)
        await this.$axios({ method: 'put', url: 'bus/' + payload.id, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }, data: payload })
            .then(res => {
                commit('setBusses',res.data)
            })
            .catch(error => {
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },

    async remove_busses({ commit }, payload) {
        commit('setOverlay', true)
        await this.$axios({ method: 'delete', url: 'bus/' + payload, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } })
            .then(res => {
                commit('setBusses',res.data)
            })
            .catch(error => {
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },

    async get_search({ commit }, payload) {
        commit('setOverlay', true)
        await this.$axios({ method: 'post', url: 'bus/search', headers: {}, data: payload })
            .then(res => {
                commit('setSearchList',res.data)
            })
            .catch(error => {
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },
}