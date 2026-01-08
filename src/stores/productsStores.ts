import { defineStore } from 'pinia'
import axios from 'axios'

type Product = {
  id: number
  title: string
  price: number
  imageUrl: string
  description: string
  sdf: number
}

export const useProductStore = defineStore('products', {
  state: () => ({
    items: [],
    activeProduct: null as Product | null,
    loading: false,
  }),
  actions: {
    // setActiveProduct(product: Product) {
    //   this.activeProduct = product
    // },
    async fetchProductById(id: number) {
      this.loading = true
      try {
        const { data } = await axios.get(`https://b561fe78d0163fe1.mokky.dev/sneakers/${id}`)
        this.activeProduct = data
      } catch (e) {
        console.log(`Какая-то заварушка ${e}`)
      } finally {
        this.loading = false
      }
    },
    clearActiveProduct() {
      this.activeProduct = null
    },
  },
})
