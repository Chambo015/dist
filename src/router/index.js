import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/components/MainPage'
import SinglePage from '@/components/SinglePage'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'hash',
  base: 'dodopizza',
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: MainPage
    },
    {
      path: '/:id',
      name: 'single',
      component: SinglePage
    }
  ]
})