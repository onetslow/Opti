import { createRouter, createWebHistory } from 'vue-router'
import Orders from '@/components/Orders.vue'
import Products from '@/components/Products.vue'
import Categories from '@/components/Categories.vue'
import CreateCategory from "@/components/CreateCategory.vue";

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
    {
        path: '/createCategory',
        component: CreateCategory,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
