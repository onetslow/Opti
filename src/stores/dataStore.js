import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './authStore'
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useDataStore = defineStore('data', {
    state: () => ({
        categories: [],
        categories_total: null,
        items: [],
        products: [],
        products_total: null,
        orders: [],
        orders_total: null,
        errorMessage: "",
    }),
    actions: {
        async get_categories(page = 0, perpage = 5) {
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl + '/categories', {
                    params: {
                        page: page,
                        perpage: perpage
                    }
                });
                this.categories = response.data;
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    console.log(error);
                }
            }
        },
    async get_categories_total() {
        this.errorMessage = "";
        try {
            const response = await axios.get(backendUrl + '/categories_total');
            this.categories_total = response.data;
        } catch (error) {
            if (error.response) {
                this.errorMessage = error.response.data.message;
                console.log(error);
            } else if (error.request) {
                this.errorMessage = error.message;
                console.log(error);
            } else {
                console.log(error);
            }
        }
        },

        async get_products(page = 0, perpage = 5) {
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl + '/products', {
                    params: {
                        page: page,
                        perpage: perpage
                    }
                });
                this.products = response.data;
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    console.log(error);
                }
            }
        },
        
        async get_products_total() {
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl + '/products_total');
                this.products_total = response.data;
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    console.log(error);
                }
            }
        },

        async get_orders(page = 0, perpage = 5) {
            this.errorMessage = "";
            try {
                const authStore = useAuthStore()
                const response = await axios.get(backendUrl + '/orders', {
                    params: {
                        page: page,
                        perpage: perpage
                    },
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });
                this.orders = response.data;
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    console.log(error);
                }
            }
        },
        
        async get_orders_total() {
            this.errorMessage = "";
            try {
                const authStore = useAuthStore()
                const response = await axios.get(backendUrl + '/orders_total', {
                    headers: {
                         Authorization: `Bearer ${authStore.token}`,
                },
                });
                this.orders_total = response.data;
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    console.log(error);
                }
            }
        },
    },
});