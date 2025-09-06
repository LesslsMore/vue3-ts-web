import { createRouter, createWebHistory } from 'vue-router'
import Indexed from '@/components/bili/Indexed.vue'
import Mongo from '@/components/bili/Mongo.vue'
import Storage from '@/components/bili/Storage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/indexed'
    },
    {
      path: '/indexed',
      name: 'indexed',
      component: Indexed
    },
    {
      path: '/mongo',
      name: 'mongo',
      component: Mongo
    },
    {
      path: '/storage',
      name: 'storage',
      component: Storage
    }
  ]
})