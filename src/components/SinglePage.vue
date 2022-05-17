<template>
  <div class="flex items-start justify-center px-4 lg:px-0 flex-col lg:flex-row mt-4 lg:mt-0">
    <div class="w-full lg:w-2/5 m-auto flex   items-center justify-center py-3 h-vw-9 lg:h-550">
     
        <transition name="fade"  mode="out-in">
          <img v-if="pizzaSize === 0" class="w-3/4" :src="pizzas[curID].images[0]" alt="">
        <img v-if="pizzaSize === 1" class="w-5/6 " :src="pizzas[curID].images[1]" alt="">
        <img v-if="pizzaSize === 2" class="w-full" :src="pizzas[curID].images[2]" alt="">
        </transition>

    </div>
    <div class="lg:px-5 lg:w-2/5 lg:mr-auto mb-9 lg:mb-0">
      <h1 class="text-2xl font-medium mb-5">{{ pizzas[curID].title }}</h1>
      <p>{{ pizzas[curID].desc }}</p>
      <div class="flex mt-5 justify-around w-full lg:w-3/4 bg-bgRadio p-2 rounded-full mx-auto">
        <p @click="pizzaSize = 0" :class="{ 'bg-white rounded-2xl' : pizzaSize === 0 }" class="hover:cursor-pointer p-2 text-sm">Маленькая</p>
        <p @click="pizzaSize = 1" :class="{ 'bg-white rounded-2xl' : pizzaSize === 1 }" class="hover:cursor-pointer text-sm p-2">Средняя</p>
        <p @click="pizzaSize = 2" :class="{ 'bg-white rounded-2xl' : pizzaSize === 2 }" class="hover:cursor-pointer text-sm p-2">Большая</p>
      </div>
      <div class="flex justify-between flex-wrap ">
        <div :class="{ 'border border-main' : ingList.includes(ing) }" class="w-th mt-5 p-3 shadow-xl rounded-xl" 
          v-for="ing of pizzas[curID].ingredients" :key="ing.id">
          <input hidden type="checkbox" :id="ing.title" :value="ing" v-model="ingList">
          <label :for="ing.title"><img class="w-full" :src="ing.img" alt="">
          <p class="text-center text-sm mb-4">{{ ing.title }}</p>
          <p class="text-center text-lg font-semibold">{{ ing.price }}</p></label>
        </div>
      </div>
      <button @click="sendOrder()" class="bg-main text-white rounded-xl p-2 w-1/2 block mx-auto mt-5">Добавить в корзину {{ totalPrice }}</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: "SinglePage",
  data() {
    return {
      pizzaSize: 1,
      curID: this.$route.params.id - 1,
      ingList: [],
      currentUser: localStorage.getItem('loggedUser')
    }
  },
 async mounted() {
    await this.$store.dispatch('getPizzasAsync')
    await this.$store.dispatch('getOrdersAsync')

  },
  computed: {
    totalIngPrice() {
      if(this.ingList.length) {
        return this.ingList.reduce((a, e) =>  a + e.price, 0)
      } else {
        return 0
      }
    },
    totalSizePrice() {
      switch(this.pizzaSize){
        case 0: 
          return Number(this.pizzas[this.curID].price) 
        case 2: 
          return Number(this.pizzas[this.curID].price) + 2000
        default:
          return Number(this.pizzas[this.curID].price) + 1000
      }
    },
    totalPrice() {
      return this.totalIngPrice + this.totalSizePrice
    },
    ...mapGetters(['pizzas']),
  },
  
  methods: {
    addIng(item) {
      this.ingList.push(item)
      this.totalIngPrice = this.totalIngPrice + parseInt(item.price)
      this.totalPrice = this.totalIngPrice + this.totalSizePrice
    },
    async sendOrder() {
      let currentOrder = this.$store.getters.order(this.currentUser)
      
      if(currentOrder) {
        let newOrder = {
          title: this.pizzas[this.curID].title,
          price: this.totalPrice,
          ingredients: this.ingList,
          image: this.pizzas[this.curID].images[1],
          size: this.pizzaSize,
          id: currentOrder.products.length + 1
        }
        currentOrder.products.push(newOrder)
        currentOrder.totalOfProducts = 0
        currentOrder.products.forEach(element => {
          currentOrder.totalOfProducts = currentOrder.totalOfProducts + element.price
        });

        await axios.put('http://localhost:3001/orders/' + currentOrder.id, currentOrder)
      } else {
        let obj = {
          products: [
            {
              title: this.pizzas[this.curID].title,
              price: this.totalPrice,
              ingredients: this.ingList,
              image: this.pizzas[this.curID].images[1],
              size: this.pizzaSize,
              id: 1
            }
          ],
          totalOfProducts: this.totalPrice,
          user_login: localStorage.getItem('loggedUser'),
          status: false
        }
        await axios.post('http://localhost:3001/orders', obj)
      }
        this.$router.go()
      } 
      
    }
  }
</script>