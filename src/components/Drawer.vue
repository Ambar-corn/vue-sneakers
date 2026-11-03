<script setup lang="ts">
import { ref, computed } from 'vue'
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlockk.vue'
import { useClickOutside } from '@/composables/useClickOutside'
import { useCartStore } from '@/stores/cartStore'
import { useOrderStore } from '@/stores/orderStore'
import { useEscapePressed } from '@/composables/useEscapePressed'

const cartStore = useCartStore()

const orderStore = useOrderStore()

const drawerRef = ref<HTMLElement | null>(null)

useClickOutside(drawerRef, () => {
  if (cartStore.isDrawerOpen) {
    closeAndReset()
  }
})

useEscapePressed(() => {
  if (cartStore.isDrawerOpen) {
    closeAndReset()
  }
})
const buttonDisabled = computed(() => {
  return orderStore.isCreatingOrder || cartStore.getLocalItems().length === 0
})

const isCartEmpty = computed(() => cartStore.getLocalItems().length === 0)

const isOrderCreated = computed(() => orderStore.orderId !== null)

async function handleCreateOrder() {
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
  drawerRef.value?.scrollTo({ top: 0 })
}
</script>

<template>
  <div>
    <Transition name="overflow">
      <div
        v-show="cartStore.isDrawerOpen"
        class="fixed top-0 left-0 h-full w-full bg-black/20 backdrop-blur-sm z-10 opacity-80 transition duration-1000"
      ></div>
    </Transition>

    <Transition name="drawer">
      <div
        v-show="cartStore.isDrawerOpen"
        ref="drawerRef"
        class="bg-teal-600 w-2/5 h-full fixed right-0 top-0 z-50 p-10 overflow-y-auto"
      >
        <DrawerHead :close-drawer="closeAndReset" />

        <div v-if="isCartEmpty || isOrderCreated" class="flex h-full items-center">
          <InfoBlock
            v-if="isOrderCreated"
            image-url="/order-success-icon.png"
            title="Заказ оформлен !"
            :description="`Ваш заказ №${orderStore.orderId} скоро будет передан курьерской доставке`"
          />

          <InfoBlock
            v-else
            image-url="/package-icon.png"
            title="Корзина пустая"
            description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
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
              @click="handleCreateOrder()"
              class="transition bg-green-500 w-full rounded-xl py-3 disabled:bg-slate-300 hover:bg-green-600 active:bg-green-700 cursor-pointer"
            >
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition:
    transform 0.5s ease-out,
    opacity 0.5s;
}

.overflow-enter-active,
.overflow-leave-active {
  transition:
    transform 0.5s ease-out,
    opacity 0.5s;
}

.overflow-enter-from,
.overflow-leave-to,
.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
