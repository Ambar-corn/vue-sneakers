import { defineStore } from 'pinia'
import { computed, ref, unref } from 'vue'
import type { CartItem } from '@/types/cart'

// type Item = {
//   id: number
//   title: string
//   price: number
//   imageUrl: string
//   description: string
// }

export const useCartStore = defineStore('cart', () => {
  // const localCart = ref<string | null>(null)

  const localItems = ref<CartItem[]>([])

  const totalPrice = computed(() => localItems.value.reduce((acc, item) => acc + item.price, 0))

  const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

  const isCreating = ref(false)

  function initLocalCart() {
    const localCart = localStorage.getItem('cart')
    if (localCart) {
      localItems.value = localCart ? JSON.parse(localCart) : []
    }
  }

  function isAdded(id: number): boolean {
    return localItems.value.some((el) => el.productId === id)
  }

  function addToLocalCart(item: CartItem) {
    localItems.value.push(item)
    const obj = unref(localItems)

    localStorage.setItem('cart', JSON.stringify(obj))

    // console.log(`Total = ${totalPrice.value}   Vat = ${vatPrice.value}`)
  }

  function removeToLocalCart(id: number) {
    const index = localItems.value.findIndex((el) => el.productId === id)
    if (index !== -1) {
      localItems.value.splice(index, 1)
    } else throw Error(`Такого элемента не найдено index = ${index}`)

    localStorage.setItem('cart', JSON.stringify(localItems.value))
    // console.log(`Total = ${totalPrice.value}   Vat = ${vatPrice.value}`)
  }

  function cartLocalToggle(item: CartItem) {
    const stateIsAdd = isAdded(item.productId)

    if (stateIsAdd) {
      removeToLocalCart(item.productId)
    } else addToLocalCart(item)
  }

  function getLocalItems(): CartItem[] {
    const obj = unref(localItems)

    return obj
  }

  //! async function createOrder() {  Возможно функция должна быть реализована в ordersStore или чем-то таком
  //   const obj = {
  //     items: localItems.value,
  //     totalPrice:totalPrice.value
  //   }
  //   const objTemp = {
  //     sneaker_id: obj.sneaker_id,
  //     temp_id: crypto.randomUUID(),
  //   }
  //   try {
  //     isCreating.value = true

  //     const { data } = await axios.post('https://b561fe78d0163fe1.mokky.dev/orders', {
  //       items: cart.value,
  //       totalPrice: props.totalPrice.value,
  //     })
  //     cart.value = []

  //     orderId.value = data.id
  //     return data
  //   } catch (err) {
  //     console.log(err)
  //   } finally {
  //     isCreating.value = false
  //   }
  // }

  return {
    localItems,
    initLocalCart,
    isAdded,
    addToLocalCart,
    removeToLocalCart,
    cartLocalToggle,
    getLocalItems,
    totalPrice,
    vatPrice,
  }
})
