import axios from 'axios'
export default {
    actions: {
        async getOrdersAsync({commit}) {
            let orders = await axios.get('https://628512d6a48bd3c40b7a955d.mockapi.io/orders')
            commit('setOrdersData', orders.data)
        }
    },
    mutations: {
        setOrdersData(state, data) {
            state.orders = data
        }
    },
    state: {
        orders: []
    },
    getters: {
        order: state => (currentUser, i) => {
            let order = state.orders.find(order => order.status === false && order.user_login == currentUser)
            if (i) return order.id
            return order
        }
        
    }
}