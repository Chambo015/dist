import axios from 'axios'
export default {
    actions: {
         async getPizzasAsync({commit}) {
             let res = await axios.get('https://628512d6a48bd3c40b7a955d.mockapi.io/pizza')
             commit('setPizzasData', res.data)
         }
    },
    mutations: {
        setPizzasData(state, data) {
            state.pizzas = data
        }
    },
    state: {
        pizzas: []
    },
    getters: {
        pizzas: state => {
            return state.pizzas
        }
    }
}