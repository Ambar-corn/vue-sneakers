<script setup>
import { ref, computed, inject } from 'vue'
import axios from 'axios'
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlockk.vue'
import { useClickOutside } from '@/composables/useClickOutside'

const isCreating = ref(false)

const orderId = ref(null)

const drawerRef = ref(null)

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number,
  isCreatingOrder: Boolean,
  drawerOpen: Boolean,
})

useClickOutside(drawerRef, () => {
  if (props.drawerOpen) {
    closeDrawer()
  }
})

const buttonDisabled = computed(() => {
  if (props.isCreatingOrder) {
    return true
  } else if (props.totalPrice) {
    return false
  } else {
    return true
  }
})

const { cart, closeDrawer } = inject('cart')
// const cartIsEmpty = computed(() => cart.value.lenght === 0)

const createOrder = async () => {
  try {
    isCreating.value = true

    const { data } = await axios.post('https://b561fe78d0163fe1.mokky.dev/orders', {
      items: cart.value,
      totalPrice: props.totalPrice.value,
    })
    cart.value = []

    orderId.value = data.id
    return data
  } catch (err) {
    console.log(err)
  } finally {
    isCreating.value = false
  }
}
</script>

<template>
  <div>
    <div
      class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70 transition duration-1000"
    ></div>
    <div
      ref="drawerRef"
      class="bg-teal-600 w-2/5 h-full fixed right-0 top-0 z-50 p-10 transition duration-1000"
    >
      <DrawerHead />

      <div v-if="!totalPrice || orderId" class="flex h-full items-center">
        <InfoBlock
          v-if="!totalPrice && !orderId"
          image-url="/package-icon.png"
          title="Корзина пустая"
          description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
        />
        <InfoBlock
          v-if="orderId"
          image-url="/order-success-icon.png"
          title="Заказ оформлен !"
          :description="`Ваш заказ №${orderId} скоро будет передан курьерской доставке`"
        />
      </div>

      <div v-else>
        <CartItemList />

        <div class="flex flex-col gap-4 my-7">
          <div class="flex gap-2">
            <span>Итого:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <span>{{ totalPrice }} ₽ </span>
          </div>
          <div class="flex gap-2">
            <span>Налог 5%:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <span>{{ vatPrice }} ₽ </span>
          </div>
          <button
            :disabled="buttonDisabled"
            @click="createOrder"
            class="transition bg-green-500 w-full rounded-xl py-3 disabled:bg-slate-300 hover:bg-green-600 active:bg-green-700 cursor-crosshair"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
