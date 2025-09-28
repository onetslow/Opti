<template>
  <div>
    <h2>Список заказов</h2>

    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">Ошибка загрузки: {{ error }}</div>
    <div v-else-if="orders.length === 0">Заказы не найдены</div>

    <table v-else>
      <thead>
        <tr>
          <th>ID заказа</th>
          <th>Пользователь</th>
          <th>Дата заказа</th>
          <th>Сумма</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.user_name }}</td>
          <td>{{ order.order_date }}</td>
          <td>{{ order.total_price }} </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

export default {
  name: "Orders",
  data() {
    return {
      orders: [],
      loading: true,
      error: null,
    };
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        this.loading = true;
        this.error = null;

        const authStore = useAuthStore();
        const token = authStore.token;

        const response = await axios.get("http://127.0.0.1:8001/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

  
        this.orders = response.data;
      } catch (err) {
        console.error("Ошибка загрузки заказов:", err);
        this.error = "Не удалось загрузить заказы";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>

</style>
