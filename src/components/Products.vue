<template>
  <div>
    <h1>Список товаров</h1>

    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{ product.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

export default {
  name: 'Products',
  data() {
    return {
      products: [],
      loading: true,
      error: null,
    }
  },
  mounted() {
    this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      try {
        this.loading = true
        this.error = null

        const authStore = useAuthStore()
        const token = authStore.token

        const response = await axios.get('http://127.0.0.1:8001/api/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        this.products = response.data
      } catch (err) {
        this.error = 'Ошибка при загрузке товаров'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
