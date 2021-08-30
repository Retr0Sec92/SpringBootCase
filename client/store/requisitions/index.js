export const state = () => ({
    overlay: false,
    requisitions: [
        {
            id: 1,
            category: 'Medikal',
            group: 'Enjektör Grubu',
            product: 'Enjektör 5cc',
            brand: 'Beybi',
            quantity: 1000,
            unit: 'Adet',
            location: 'İzmir',
            endDate: '30.01.2021',
            company: 'Acıbadem Hastanesi',
            favourite: false,
            req_type: 'Malzeme Talebi',
            show: false,
            desc:
                'Merhabalar bana 1000 adet enjektör lazım en geç pazartesi gününe kısa sürede teklif verirseniz seviniriz !',
        },
        {
            id: 2,
            category: 'Catering',
            group: 'Öğün',
            product: 'Yemek Hizmeti',
            brand: '',
            quantity: 1000,
            unit: 'Kişi',
            location: 'İstanbul',
            endDate: '27.01.2021',
            company: 'Florance Nightingale Hastanesi',
            req_type: 'Hizmet Talebi',
            favourite: false,
            show: false,
            desc:
                '1000 kişilik personelimiz için bir yemek hizmeti almak istiyoruz. Lütfen iletişime geçiniz !',
        },
    ]
})

export const mutations = {
    setOverlay(state, payload) {
        state.overlay = payload
    },
    setShowItemById(state, payload) {
        state.requisitions.find(requisition => requisition.id === payload.id).show = payload.show
    },
    setFavItemById(state, payload) {
        state.requisitions.find(requisition => requisition.id === payload.id).favourite = payload.favourite
    }
}

export const getters = {
    getRequisitions: (state) => {
        return state.requisitions
    },
    getRequisitionById: (state) => (id) => {
        return state.requisitions.find(requisition => requisition.id == id)
    },
    getOverlayStatus: (state) => {
        return state.overlay
    }
}

export const actions = {
    postQuotation({ commit }, data) {
        debugger
        commit('setOverlay', false)
    },

    postFavReq({ commit }, data) {
        commit('setOverlay', false)
    }
}