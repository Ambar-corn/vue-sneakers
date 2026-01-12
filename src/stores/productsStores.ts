import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

type Product = {
  id: number
  title: string
  price: number
  imageUrl: string
  description: string
}

export const useProductStore = defineStore('products', () => {
  const items = ref<Product[]>([])
  const activeProduct = ref(null as Product | null)
  const loading = ref(false)

  function setActiveProduct(product: Product) {
    activeProduct.value = product
  }

  async function fetchProductById(id: number) {
    loading.value = true
    try {
      const { data } = await axios.get(`https://b561fe78d0163fe1.mokky.dev/sneakers/${id}`)
      activeProduct.value = data
    } catch (error) {
      console.log(`Какая-то заварушка ${error}`)
    } finally {
      loading.value = false
    }
  }
  function clearActiveProduct() {
    activeProduct.value = null
  }

  return {
    items,
    activeProduct,
    loading,
    setActiveProduct,
    fetchProductById,
    clearActiveProduct,
  }
})
