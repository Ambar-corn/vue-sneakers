<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import type { CartItem } from '@/types/cart'
import type { DeepReadonly } from 'vue'
import IconTrash from './icons/IconTrash.vue'
import IconMinus from './icons/IconMinus.vue'
import IconPlus from './icons/IconPlus.vue'

const cartStore = useCartStore()

defineProps<{
  cartItem: DeepReadonly<CartItem>
}>()
</script>

<template>
  <div class="flex items-center border border-slate-100 p-4 rounded-xl gap-4 relative">
    <img class="w-24 h-30" :src="cartItem.imageUrl[0]" alt="Sneaker" />
    <div class="flex flex-col">
      <p class="text-white">{{ cartItem.title }}</p>

      <div class="flex flex-col">
        <span class="text-white font-semibold">Цена : {{ cartItem.price }} ₽</span>
        <span class="text-white font-semibold">Размер : {{ cartItem.size }}</span>
      </div>
    </div>
    <button @click.stop="cartStore.removeToLocalCart(cartItem.productId, cartItem.size)">
      <IconTrash
        class="w-6 h-6 opacity-40 hover:opacity-100 hover:text-red-600 duration-500 cursor-pointer absolute right-7 top-4"
      />
    </button>
    <div class="flex items-center duration-500 absolute right-2 bottom-4 select-none">
      <button @click="cartStore.decreaseQuantity(cartItem.productId, cartItem.size)">
        <IconMinus class="size-7 text-white hover:text-black" />
      </button>

      <div class="">{{ cartItem.quantity }}</div>
      <button @click="cartStore.increaseQuantity(cartItem.productId, cartItem.size)">
        <IconPlus class="size-7 text-white hover:text-black" />
      </button>
    </div>
  </div>
</template>
