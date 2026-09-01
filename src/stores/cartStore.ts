import { defineStore } from 'pinia'
import { computed, readonly, ref, watch } from 'vue'
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

  // function isAdded(id: number): boolean {
  //   //!старая структура

  //   console.log(`id = ${id}`)
  //   return localItems.value.some((el) => el.id === id)
  // }

  function isAdded(id: number, size: number): boolean {
    return localItems.value.some((el) => el.productId === id && el.size === size)
  }

  function addToLocalCart(item: CartItem, size: number) {
    const cartElement = {
      productId: item.productId,
      title: item.title,
      price: item.price,
      imageUrl: item.imageUrl,
      size: size,
      quantity: 1,
    }
    localItems.value.push(cartElement)

    // localStorage.setItem('cart', JSON.stringify(localItems.value))
  }

  function removeToLocalCart(id: number, size: number) {
    const index = localItems.value.findIndex((el) => el.productId === id && el.size === size)
    if (index !== -1) {
      localItems.value.splice(index, 1)
    } else throw Error(`Такого элемента не найдено index = ${index}`)

    // localStorage.setItem('cart', JSON.stringify(localItems.value))
    // console.log(`Total = ${totalPrice.value}   Vat = ${vatPrice.value}`)
  }

  function cartLocalToggle(item: CartItem, size: number) {
    if (!size) {
      alert(`Выберите размер `)
      return
    }

    const stateIsAdd = isAdded(item.productId, size)

    if (stateIsAdd) {
      removeToLocalCart(item.productId, size)
    } else addToLocalCart(item, size)
  }

  function getLocalItems(): ReadonlyArray<{
    readonly productId: number
    readonly title: string
    readonly price: number
    readonly imageUrl: readonly string[]
    readonly size: number
    readonly quantity: number
  }> {
    // const readonlyState =
    return readonly(localItems.value)
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

  function saveLocalCart(): void {
    localStorage.setItem('cart', JSON.stringify(localItems.value))

    console.log(`Уотч сработал`)
  }

  watch(localItems, () => saveLocalCart(), { deep: true })

  return {
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
