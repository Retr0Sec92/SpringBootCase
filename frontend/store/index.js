export const state = () => ({
    overlay: false,
    users: [],
    roles: [],
    destination_list: [],
    bus_list: [],
    search_list: [],
    user_detail: undefined,
    user_info: {
        isAdmin: false,
        isUser: false,
        isLoggedIn: false,
    },
    tickets: []
})

export const mutations = {
    setOverlay(state, payload) {
        state.overlay = payload
    },
    setUserInfo(state, payload) {
        state.user_detail = payload
        if(payload.roles.filter(e => e.name === 'ROLE_ADMIN').length > 0)
        {
           state.user_info.isAdmin = true;
        }
        else {
            state.user_info.isAdmin = false;
        }
        if(payload.roles.filter(e => e.name === 'ROLE_USER').length > 0)
        {
           state.user_info.isUser = true;
        }
        else {
            state.user_info.isUser = false;
        }
        state.user_info.isLoggedIn = true
    },
    setUsers(state, payload) {
        state.users = payload
    },
    setRoles(state, payload) {
        state.roles = payload
    },
    setBusses(state, payload) {
        state.bus_list = payload
    },
    setDestinations(state, payload) {
        state.destination_list = payload
    },
    setDestinationById(state, payload) {
        state.destination_list = []
        state.destination_list.push(payload)
    },
    setBusById(state, payload) {
        debugger
        state.bus_list = []
        state.bus_list.push(payload)
    },
    setSearchList(state, payload) {
        state.search_list = payload
    },
    setTickets(state, payload) {
        state.tickets = payload
    },
}

export const getters = {
    getOverlayStatus: (state) => {
        return state.overlay
    },
    getUserInfo: (state) => {
        return state.user_info
    },
    getUserDetails: (state) => {
        return state.user_detail
    },
    getUsersList: (state) => {
        return state.users
    },
    getAllRoles: (state) => {
        return state.roles
    },
    getDestinationList: (state) => {
        return state.destination_list
    },
    getBusList: (state) => {
        return state.bus_list
    },
    getSearchList: (state) => {
        return state.search_list
    },
    getTickets: (state) => {
        return state.tickets
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
                localStorage.setItem('access_token', res.data.access_token)
                localStorage.setItem('refresh_token', res.data.refresh_token)
                this.$router.push('/main')
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
        await this.$axios({ method: 'get', url: 'users/info', headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } })
            .then(res => {
                commit('setUserInfo',res.data)
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

    async register({ commit }, payload) {
        commit('setOverlay', true)
        await this.$axios({ method: 'post', url: 'users/register', headers: {}, data: payload })
            .then(res => {
                
                this.$router.push("/login");
                this.$toast.show("Yeni kullanıcınız ile giriş yapabilirsiniz !", {
                    theme: "bubble",
                    type: 'success',
                    position: "bottom-right",
                    duration: 5000,
                })
            })
            .catch(error => {
                
                if(error.response.data.status == 403 || error.response.status == 403) {
                    this.$router.push("/login");
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                }
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
                
                if(error.response.data.status == 403 || error.response.status == 403) {
                    this.$router.push("/login");
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                }
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
                if(error.response.data.status == 403 || error.response.status == 403) {
                    this.$router.push("/login");
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                }
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
                if(error.response.data.status == 403 || error.response.status == 403) {
                    this.$router.push("/login");
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                }
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
                if(error.response.data.status == 403 || error.response.status == 403) {
                    this.$router.push("/login");
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                }
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
                if(error.response.data.status == 403 || error.response.status == 403) {
                    this.$router.push("/login");
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                }
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
                if(error.response.data.status == 403 || error.response.status == 403) {
                    this.$router.push("/login");
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                }
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },

    async get_destination_by_id({ commit }, payload) {
        commit('setOverlay', true)
        await this.$axios({ method: 'get', url: 'destination/' + payload, headers: {} })
            .then(res => {
                commit('setDestinationById',res.data)
            })
            .catch(error => {
                if(error.response.data.status == 403 || error.response.status == 403) {
                    this.$router.push("/login");
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                }
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
                if(error.response.data.status == 403 || error.response.status == 403) {
                    this.$router.push("/login");
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                }
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
                if(error.response.data.status == 403 || error.response.status == 403) {
                    this.$router.push("/login");
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                }
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
                if(error.response.data.status == 403 || error.response.status == 403) {
                    this.$router.push("/login");
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                }
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
                if(error.response.data.status == 403 || error.response.status == 403) {
                    this.$router.push("/login");
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                }
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
                
                if(error.response.data.status == 403 || error.response.status == 403) {
                    this.$router.push("/login");
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                }
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },

    async get_bus_by_İd({ commit }, payload) {
        commit('setOverlay', true)
        await this.$axios({ method: 'get', url: 'bus/' + payload, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }, })
            .then(res => {
                commit('setBusById',res.data)
            })
            .catch(error => {
                if(error.response.data.status == 403 || error.response.status == 403) {
                    this.$router.push("/login");
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                }
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
        await this.$axios({ method: 'post', url: 'bus', headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }, data: payload })
            .then(res => {
                
                commit('setBusses',res.data)
            })
            .catch(error => {
                
                if(error.response.data.status == 403 || error.response.status == 403) {
                    this.$router.push("/login");
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                }
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
                
                if(error.response.data.status == 403 || error.response.status == 403) {
                    this.$router.push("/login");
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                }
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
                
                if(error.response.data.status == 403 || error.response.status == 403) {
                    this.$router.push("/login");
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                }
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
        debugger
        commit('setOverlay', true)
        await this.$axios({ method: 'post', url: 'bus/search', headers: {}, data: payload })
            .then(res => {
                debugger
                commit('setSearchList',res.data)
            })
            .catch(error => {
                debugger
                if(error.response.data.status == 403 || error.response.status == 403) {
                    this.$router.push("/login");
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                }
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },

    async buy_ticket({ commit }, payload) {
        commit('setOverlay', true)
        await this.$axios({ method: 'post', url: 'ticket', headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }, data: payload })
            .then(res => {
                commit('setTickets',res.data)
                this.$toast.show('Biletiniz başarıyla alınmıştır, biletlerim sayfasından görebilirsiniz !', {
                    theme: "bubble",
                    type: 'success',
                    position: "bottom-right",
                    duration: 5000,
                })
            })
            .catch(error => {
                if(error.response.data.status == 403 || error.response.status == 403) {
                    this.$router.push("/login");
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                }
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },

    async get_my_tickets({ commit }, payload) {
        
        commit('setOverlay', true)
        await this.$axios({ method: 'get', url: 'ticket/' + payload, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
            .then(res => {
                
                commit('setTickets',res.data)
            })
            .catch(error => {
                
                if(error.response.data.status == 403 || error.response.status == 403) {
                    this.$router.push("/login");
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                }
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },

    async get_all_tickets({ commit }) {
        commit('setOverlay', true)
        await this.$axios({ method: 'get', url: 'ticket', headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
            .then(res => {
                
                commit('setTickets',res.data)
            })
            .catch(error => {
                
                if(error.response.data.status == 403 || error.response.status == 403) {
                    this.$router.push("/login");
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                }
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },

    async postpone_ticket({ commit }, payload) {
        commit('setOverlay', true)
        await this.$axios({ method: 'get', url: 'ticket/postpone/' + payload, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
            .then(res => {
                commit('setTickets',res.data)
            })
            .catch(error => {
                if(error.response.data.status == 403 || error.response.status == 403) {
                    this.$router.push("/login");
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                }
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },

    async cancel_ticket({ commit }, payload) {
        commit('setOverlay', true)
        await this.$axios({ method: 'get', url: 'ticket/cancel/' + payload, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
            .then(res => {
                
                commit('setTickets',res.data)
            })
            .catch(error => {
                
                if(error.response.data.status == 403 || error.response.status == 403) {
                    this.$router.push("/login");
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                }
                this.$toast.show(error.response.data.error_message, {
                    theme: "bubble",
                    type: 'error',
                    position: "bottom-right",
                    duration: 5000,
                })
        })
        commit('setOverlay', false)
    },

    logout({ commit }) {
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('access_token')
    },
}