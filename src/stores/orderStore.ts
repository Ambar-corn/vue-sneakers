import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import { useCartStore } from './cartStore'
import type { OrderItem } from '@/types/order'

export const useOrderStore = defineStore('order', () => {
  const isCreatingOrder = ref(false)
  const cartStore = useCartStore()

  const orderId = ref<number | null>(null)

  function getOrderItems(): OrderItem[] {
    const obj = cartStore.getLocalItems().map((el) => {
      return { productId: el.productId, price: el.price, quantity: el.quantity, size: el.size }
    })
    return obj
  }

  async function createOrder() {
    try {
      isCreatingOrder.value = true

      const { data } = await axios.post('https://b561fe78d0163fe1.mokky.dev/orders', {
        items: getOrderItems(),
      })
      orderId.value = data.id
      console.log(`Data = ${JSON.stringify(orderId.value)}`)
    } catch (e) {
      throw Error(`Заказ не был обработан ошибка = ${e}`)
    } finally {
      isCreatingOrder.value = false
    }
  }

  async function deleteOrders() {
    // Вспопомогательная кнопка
    try {
      const { data: orders } = await axios.get('https://b561fe78d0163fe1.mokky.dev/orders')

      for (const item of orders) {
        await axios.delete(`https://b561fe78d0163fe1.mokky.dev/orders/${item.id}`)
      }
      console.log('Удалил')
    } catch (err) {
      console.log(err)
    }
  }

  function resetOrderId(): void {
    orderId.value = null
  }
  return { deleteOrders, createOrder, isCreatingOrder, orderId, resetOrderId }
})
