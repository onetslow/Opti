<template>
  <div>
    <h1>Список категорий</h1>

    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <ul v-else>
      <li v-for="category in categories" :key="category.id">
        {{ category.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

export default {
  name: 'Categories',
  data() {
    return {
      categories: [],
      loading: true,
      error: null,
    }
  },
  mounted() {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      try {
        this.loading = true
        this.error = null

        const authStore = useAuthStore()
        const token = authStore.token

        const response = await axios.get('http://127.0.0.1:8001/api/categories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        this.categories = response.data
      } catch (err) {
        this.error = 'Ошибка при загрузке категорий'
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
