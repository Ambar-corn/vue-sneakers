import { defineStore } from 'pinia'
import { computed, readonly, ref, watch } from 'vue'
import type { CartItem } from '@/types/cart'

export const useCartStore = defineStore('cart', () => {
  const localItems = ref<CartItem[]>([])

  const totalPrice = computed(() =>
    localItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0),
  )

  const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

  const isCreating = ref(false)

  const isDrawerOpen = ref(false)

  function initLocalCart() {
    const localCart = localStorage.getItem('cart')
    if (localCart) {
      localItems.value = localCart ? JSON.parse(localCart) : []
    }
  }

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
  }

  function removeToLocalCart(id: number, size: number) {
    const index = findElementIndex(id, size)
    if (index !== -1) {
      localItems.value.splice(index, 1)
    } else throw Error(`Такого элемента не найдено index = ${index}`)
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
    return readonly(localItems.value)
  }

  function findElementIndex(id: number, size: number): number {
    const index = localItems.value.findIndex((el) => el.productId === id && el.size === size)
    return index
  }

  function increaseQuantity(id: number, size: number) {
    const index = findElementIndex(id, size)
    if (index !== -1) {
      localItems.value[index].quantity++
    } else throw Error(`Такого элемента не найдено index = ${index}`)
  }

  function decreaseQuantity(id: number, size: number) {
    const index = findElementIndex(id, size)
    if (index !== -1) {
      if (localItems.value[index].quantity > 1) {
        localItems.value[index].quantity--
      } else removeToLocalCart(id, size)
    } else throw Error(`Такого элемента не найдено index = ${index}`)
  }

  function saveLocalCart(): void {
    localStorage.setItem('cart', JSON.stringify(localItems.value))
  }

  function clearCart() {
    localItems.value = []
  }

  watch(localItems, () => saveLocalCart(), { deep: true })

  function openDrawer(): void {
    isDrawerOpen.value = true
    document.body.classList.add('overflow-hidden')
  }
  function closeDrawer(): void {
    isDrawerOpen.value = false
    document.body.classList.remove('overflow-hidden')
  }

  return {
    initLocalCart,
    isAdded,
    addToLocalCart,
    removeToLocalCart,
    cartLocalToggle,
    getLocalItems,
    totalPrice,
    vatPrice,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
  }
})
