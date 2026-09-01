<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import type { CartItem } from '@/types/cart'
import type { DeepReadonly } from 'vue'

const cartStore = useCartStore()

defineProps<{
  cartItem: DeepReadonly<CartItem>
}>()
</script>

<template>
  <div class="flex items-center border border-slate-100 p-4 rounded-xl gap-4">
    <img class="w-24 h-24" :src="cartItem.imageUrl[0]" alt="Sneaker" />
    <div class="flex flex-col justify-between gap-y-2 flex-1">
      <p class="text-white">{{ cartItem.title }}</p>
      <div class="flex justify-between items-end">
        <div class="flex flex-col">
          <span class="text-white font-semibold">Цена : {{ cartItem.price }} ₽</span>
          <span class="text-white font-semibold">Размер : {{ cartItem.size }}</span>
          <span class="text-white font-semibold">Количество : {{ cartItem.quantity }}</span>
        </div>
        <img
          @click.stop="cartStore.removeToLocalCart(cartItem.productId, cartItem.size)"
          class="w-10 opacity-40 hover:opacity-100 duration-500 cursor-pointer"
          src="/close.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
