<template>
  <div class="block lg:flex items-start justify-center px-4 lg:px-0 my-4 gap-4">
    <div class="w-full lg:w-1/3 h-96 flex items-center justify-center">
      <img v-if="pizzaSize === 0" class="h-3/4" :src="pizzas[curID].images[0]" alt="">
      <img v-if="pizzaSize === 1" class="h-5/6" :src="pizzas[curID].images[1]" alt="">
      <img v-if="pizzaSize === 2" class="h-full" :src="pizzas[curID].images[2]" alt="">
    </div>
    <div>
      <h1 class="text-2xl font-medium mb-5">{{ pizzas[curID].title }}</h1>
      <p>{{ pizzas[curID].desc }}</p>
      <div class="flex mt-5 justify-between w-full lg:w-2/3 bg-slate-200 p-2 rounded-xl mx-auto">
        <p @click="pizzaSize = 0" :class="{ 'bg-white rounded-2xl' : pizzaSize === 0 }" class="hover:cursor-pointer p-2">Маленькая</p>
        <p @click="pizzaSize = 1" :class="{ 'bg-white rounded-2xl' : pizzaSize === 1 }" class="hover:cursor-pointer p-2">Средняя</p>
        <p @click="pizzaSize = 2" :class="{ 'bg-white rounded-2xl' : pizzaSize === 2 }" class="hover:cursor-pointer p-2">Большая</p>
      </div>

      
      <button @click="sendObj()" class="bg-main text-white rounded-xl p-2 w-1/2 block mx-auto mt-5">Добавить в корзину</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "SinglePage",
  data() {
    return {
      pizzas: [],
      pizzaSize: 1,
      curID: this.$route.params.id - 1,
      orders: [],
    }
  },
  async mounted() {
    await axios.get('http://localhost:3001/pizza')
    .then(res => this.pizzas = res.data)
    await axios.get('http://localhost:3001/orders')
    .then(res => this.orders = res.data)
  },
  methods: {
    async sendObj() {
       let changeID = this.pizzas[this.curID]
      changeID.id = ''
      await axios.post('http://localhost:3001/orders', changeID)
    }
  }
}
</script>