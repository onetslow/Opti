<template>
    <DataTable
        :value="categories"
        :lazy="true"
        :loading="dataStore.loading"
        :paginator="true"
        :rows="perpage"
        :rowsPerPageOptions="[2, 5, 10]"
        :totalRecords="categories_total"
        @page="onPageChange"
        responsive-layout="scroll"
        :laading="true"
        :first="offset"
    >

        <Column field="id" header="№"/>

        <Column field="name" header="Наименование категории"/>
        <Column header="Изображение">
            <template #body="slotProps">
                <img v-if="slotProps.data.picture_url"
                    :src="slotProps.data.picture_url"
                    :alt="slotProps.data.name"
                    class="cover"
          />
          <span v-else class="no-image">Нет изображения</span>
        </template>
      </Column>

        <template #footer>
            <div class="text-end">
                <Button type="button" 
                    @click="this.$router.push('/createCategory')" 
                    icon="pi pi-plus" 
                    label="Добавить категорию" />
            </div>
        </template>

    </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useDataStore } from '@/stores/dataStore'
import Button from "primevue/button";

export default {
    name: "Categories",
    components: {DataTable, Column, Button},
    data() {
        return {
            dataStore: useDataStore(),
            perpage: 5,
            offset: 0,
        }
    },
    computed: {
        categories() {
            return this.dataStore.categories;
        },
        categories_total() {
            return this.dataStore.categories_total;
        }
    },
    mounted() {
        console.log('Categories component MOUNTED!');
        this.dataStore.get_categories();
        this.dataStore.get_categories_total();
        console.log('Categories=', this.categories);
    },
    methods: {
        onPageChange(event) {
            this.offset = event.first;
            this.perpage = event.rows;
            this.dataStore.get_categories( this.offset / this.perpage, this.perpage );
        },
    },
}
</script>

<style scoped>
.cover {
  width: 120px;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.no-image {
  color: #999;
  font-style: italic;
}
</style>