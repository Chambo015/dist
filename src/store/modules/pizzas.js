import axios from 'axios'
export default {
    actions: {
         async getPizzasAsync({commit}) {
             let res = await axios.get('http://localhost:3001/pizza')
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