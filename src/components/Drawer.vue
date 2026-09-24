<script setup>
import { ref, computed } from 'vue'
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlockk.vue'
import { useClickOutside } from '@/composables/useClickOutside'
import { useCartStore } from '@/stores/cartStore'
import { useOrderStore } from '@/stores/orderStore.js'

const cartStore = useCartStore()

const orderStore = useOrderStore()

const drawerRef = ref(null)

useClickOutside(drawerRef, () => {
  if (cartStore.isDrawerOpen) {
    closeAndReset()
  }
})

const buttonDisabled = computed(() => {
  if (orderStore.isCreatingOrder) {
    return true
  } else if (cartStore.getLocalItems().length > 0) {
    return false
  } else {
    return true
  }
})

async function orderPlacement() {
  try {
    await orderStore.createOrder()
    cartStore.clearCart()
  } catch (e) {
    throw Error(`Ошибка ${e}`)
  }
}

function closeAndReset() {
  cartStore.closeDrawer()
  orderStore.resetOrderId()
}
</script>

<template>
  <div v-show="cartStore.isDrawerOpen">
    <div
      class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70 transition duration-1000"
    ></div>
    <div
      ref="drawerRef"
      class="bg-teal-600 w-2/5 h-full fixed right-0 top-0 z-50 p-10 transition duration-1000"
    >
      <DrawerHead :close-drawer="closeAndReset" />

      <div v-if="!cartStore.totalPrice || orderStore.orderId" class="flex h-full items-center">
        <InfoBlock
          v-if="!cartStore.totalPrice && !orderStore.orderId"
          image-url="/package-icon.png"
          title="Корзина пустая"
          description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
        />
        <InfoBlock
          v-if="orderStore.orderId"
          image-url="/order-success-icon.png"
          title="Заказ оформлен !"
          :description="`Ваш заказ №${orderStore.orderId} скоро будет передан курьерской доставке`"
        />
      </div>

      <div v-else>
        <CartItemList />

        <div class="flex flex-col gap-4 my-7">
          <div class="flex gap-2">
            <span>Итого:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <span>{{ cartStore.totalPrice }} ₽ </span>
          </div>
          <div class="flex gap-2">
            <span>Налог 5%:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <span>{{ cartStore.vatPrice }} ₽ </span>
          </div>
          <button
            :disabled="buttonDisabled"
            @click="orderPlacement()"
            class="transition bg-green-500 w-full rounded-xl py-3 disabled:bg-slate-300 hover:bg-green-600 active:bg-green-700 cursor-crosshair"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
