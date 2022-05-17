<template>
  <div class="flex flex-wrap ">
    <div @click="$router.push({ name: 'single', params: { id: obj.id } })" class="w-full lg:w-1/4 p-4 my-3 cursor-pointer group" v-for="obj of pizzas" :key="obj.id">
      <img class="group-hover:translate-y-1 " :src="obj.images[1]" alt="">
      <div>
        <p class="text-2xl font-medium">{{ obj.title }}</p>
        <p class="text-sm h-24 my-3">{{ obj.desc }}</p>
        <div class="flex items-center justify-between">
          <p class="text-2xl font-medium">от {{ obj.price }} тг.</p>
          <button class="text-main bg-orange-100 py-2 px-4 rounded-full" @click.stop="sendFastOrder(obj)">Выбрать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: "PizzaList",
  computed: {
    ...mapGetters(['pizzas'])
  },
  mounted() {
    this.$store.dispatch('getPizzasAsync')
  },
  methods: {
    async sendFastOrder(obj){
      let currentOrder = this.$store.getters.order(this.currentUser)
        console.log(obj);
      if(currentOrder) {
        let newOrder = {
          title: obj.title,
          price: obj.price,
          ingredients: null,
          image: obj.images[1],
          size: 0,
          id: currentOrder.products.length + 1
        }
        currentOrder.products.push(newOrder)
        currentOrder.totalOfProducts = 0
        currentOrder.products.forEach(element => {
          currentOrder.totalOfProducts = currentOrder.totalOfProducts + element.price
        });

        await axios.put('http://localhost:3001/orders/' + currentOrder.id, currentOrder)
      } else {
        let newOrder = {
          products: [
            {
              title: obj.title,
              price: obj.price,
              ingredients: null,
              image: obj.images[1],
              size: 0,
              id: 1
            }
          ],
          totalOfProducts: obj.price,
          user_login: localStorage.getItem('loggedUser'),
          status: false
        }
        await axios.post('http://localhost:3001/orders', newOrder)
      }
        this.$router.go()
      } 
    }
}

</script>
