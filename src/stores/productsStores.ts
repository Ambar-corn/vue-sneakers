import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductsStore = defineStore('products', {
  state: () => ({
    items: [],
    activeProduct: null,
    loading: false,
  }),
  actions: () => ({
    async fetchProductById(id: number) {
      this.loading = true
      try {
        this.activeProduct = await axios.get(`https://b561fe78d0163fe1.mokky.dev/sneakers/${id}`)
      } catch {
        console.log(`Какая-то заварушка ${this.activeProduct}`)
      } finally {
        this.loading = false
      }
    },
  }),
})
