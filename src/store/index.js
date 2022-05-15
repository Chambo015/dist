import Vue from "vue";
import VueX from "vuex";
import pizzas from "./modules/pizzas"
import orders from "./modules/orders"

Vue.use(VueX);

export default new VueX.Store({
    modules: {
       pizzas,
       orders
    }
})