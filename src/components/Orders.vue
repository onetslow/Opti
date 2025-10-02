<template>
    <DataTable
        :value="orders"
        :lazy="true"
        :loading="dataStore.loading"
        :paginator="true"
        :rows="perpage"
        :rowsPerPageOptions="[2, 5, 10]"
        :totalRecords="orders_total"
        @page="onPageChange"
        responsive-Layout="scroll"
        :laading="true"
        :first="offset"
    >

        <Column field="id" header="№"/>
        <Column field="user_id" header="ID пользователя"/>
        <Column field="order_date" header="Дата заказа"/>
        <Column field="created_at" header="Дата создания"/>
    </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useDataStore } from '@/stores/dataStore'

export default {
    name: "Orders",
    components: {DataTable, Column},
    data() {
        return {
            dataStore: useDataStore(),
            perpage: 5,
            offset: 0,
        }
    },
    computed: {
        orders() {
            return this.dataStore.orders;
        },
        orders_total() {
            return this.dataStore.orders_total;
        }
    },
    mounted() {
        console.log('Orders component MOUNTED!');
        this.dataStore.get_orders();
        this.dataStore.get_orders_total();
        console.log('Orders=', this.orders);
    },
    methods: {
        onPageChange(event) {
            this.offset = event.first;
            this.perpage = event.rows;
            this.dataStore.get_orders( this.offset / this.perpage, this.perpage );
        }
    }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>