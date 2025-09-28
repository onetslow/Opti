import { createRouter, createWebHistory } from 'vue-router'
import Orders from '@/components/Orders.vue'
import Products from '@/components/Products.vue'
import Categories from '@/components/Categories.vue'

const routes = [
    {
        path: '/orders',
        component: Orders,
    },
    {
        path: '/categories',
        component: Categories,
    },
    {
        path: '/products', 
        component: Products,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
