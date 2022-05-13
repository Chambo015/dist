<template>
  <div class="flex flex-wrap justify-between">
    <div
      @click="$router.push({ name: 'single', params: { id: item.id } })"
      v-for="item of pizzas"
      :key="item.id"
      class="w-1/2 lg:w-1/4 p-4 my-3 flex flex-col"
      
    >
      <img :src="item.images[1]" alt="" />
      <div class="flex flex-col flex-grow">
        <p class="text-2xl font-medium">{{ item.title }}</p>
        <p class="text-sm h-24 my-3">{{ item.desc }}</p>
        <div class="flex justify-between items-center mt-auto">
          <p class="text-2xl font-medium">{{ item.price }}</p>
          <button class="text-main bg-orange-100 py-2 px-4 rounded-full">
            Выбрать
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PizzaList",
  data() {
    return {
      pizzas: [],
    };
  },
  async mounted() {
    let res = await axios.get("http://localhost:3001/pizza");
    this.pizzas = res.data;
  },
};
</script>