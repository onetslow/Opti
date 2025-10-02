<template>
    <DataTable
        :value="products"
        :lazy="true"
        :loading="dataStore.loading"
        :paginator="true"
        :rows="perpage"
        :rowsPerPageOptions="[2, 5, 10]"
        :totalRecords="products_total"
        @page="onPageChange"
        responsive-Layout="scroll"
        :laading="true"
        :first="offset"
    >

        <Column field="id" header="№"/>
        <Column field="name" header="Наименование товара"/>
        <Column field="category_id" header="ID категории"/>
        <Column field="price" header="Цена"/>
        <Column field="description" header="Описание"/>

    </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useDataStore } from '@/stores/dataStore'

export default {
    name: "Products",
    components: {DataTable, Column},
    data() {
        return {
            dataStore: useDataStore(),
            perpage: 5,
            offset: 0,
        }
    },
    computed: {
        products() {
            return this.dataStore.products;
        },
        products_total() {
            return this.dataStore.products_total;
        }
    },
    mounted() {
        console.log('Products component MOUNTED!');
        this.dataStore.get_products();
        this.dataStore.get_products_total();
        console.log('Products=', this.products);
    },
    methods: {
        onPageChange(event) {
            this.offset = event.first;
            this.perpage = event.rows;
            this.dataStore.get_products( this.offset / this.perpage, this.perpage );
        }
    }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>