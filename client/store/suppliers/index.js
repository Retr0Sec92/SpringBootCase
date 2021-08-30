export const state = () => ({
    suppliers: []
})

export const mutations = {
    setSuppliers(state, payload) {
        state.suppliers = payload
    },
}

export const getters = {
    getSuppliers: (state) => {
        return state.suppliers
    }
}

export const actions = {
    async getAllSuppliers({ commit }) {
        commit('setOverlay', true, { root: true })
        await this.$axios({ method: 'post', url: '/api/get_all_suppliers', headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } })
            .then(res => {
                debugger
                if (res.status === 200) {
                    commit('setSuppliers', res.data.suppliers)
                }
            })
            .catch(error => {
                debugger
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
        commit('setOverlay', false, { root: true })
    },
}