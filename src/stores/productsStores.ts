import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

// type AccordionItem = {
//   title: string
//   content: string[]
// }

type Product = {
  id: number
  title: string
  price: number
  imageUrl: string[]
  accordionData: {
    title: string
    type: 'text' | 'size'
    content: string[]
  }[]
}

type Filters = {
  sortBy: string
  searchQuery: string
}

type Params = {
  sortBy: string
  [title: string]: string
}

type ActiveProduct = Product | null

export const useProductStore = defineStore('products', () => {
  const items = ref<Product[]>([])
  const activeProduct = ref<ActiveProduct>(null)
  const listLoading = ref(false)
  const productLoading = ref(false)
  const imagesReady = ref(false)
  const currentController = ref<AbortController | null>(null)
  const currentRequestId = ref(0)

  async function fetchItems(filters: Filters) {
    listLoading.value = true

    try {
      const params: Params = {
        sortBy: filters.sortBy,
      }

      if (filters.searchQuery) {
        params.title = `*${filters.searchQuery}*`
      }

      const { data } = await axios.get('https://b561fe78d0163fe1.mokky.dev/sneakers', {
        params,
      })

      items.value = data
    } catch (error) {
      console.log(` ${error}`)
    } finally {
      listLoading.value = false
    }
  }

  async function fetchProductById(id: number) {
    currentController.value?.abort()
    const controller = new AbortController()
    currentController.value = controller

    currentRequestId.value += 1
    const requestId = currentRequestId.value

    activeProduct.value = null
    imagesReady.value = false
    productLoading.value = true

    try {
      const { data } = await axios.get(`https://b561fe78d0163fe1.mokky.dev/sneakers/${id}`, {
        signal: controller.signal,
      })

      if (requestId !== currentRequestId.value) return

      activeProduct.value = data
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log(`Аборт ${error}`)
      } else {
        console.log(` ${error}`)
        throw error
      }
    } finally {
      if (requestId !== currentRequestId.value) return
      productLoading.value = false
      currentController.value = null
    }
  }

  function clearActiveProduct() {
    currentRequestId.value += 1
    currentController.value?.abort()
    currentController.value = null
    activeProduct.value = null
    imagesReady.value = false
    productLoading.value = false
  }

  function onImageLoad(index: number) {
    if (index === 0) {
      imagesReady.value = true
    }
  }

  return {
    items,
    activeProduct,
    listLoading,
    productLoading,
    imagesReady,
    fetchProductById,
    clearActiveProduct,
    fetchItems,
    onImageLoad,
  }
})
