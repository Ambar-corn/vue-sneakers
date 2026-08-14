<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import type { CartItem } from '@/types/cart'

const cartStore = useCartStore()

const emit = defineEmits(['onclickRemove'])

defineProps<{
  cartItem: CartItem
}>()
</script>

<template>
  <div class="flex items-center border border-slate-100 p-4 rounded-xl gap-4">
    <img class="w-16 h-16" :src="cartItem.imageUrl[0]" alt="Sneaker" />
    <div class="flex flex-col justify-between gap-y-2 flex-1">
      <p class="text-white">{{ cartItem.title }}</p>
      <div class="flex justify-between">
        <span class="text-white text-semibold flex-1">{{ cartItem.price }}.</span>
        <img
          @click.stop="cartStore.removeToLocalCart(cartItem.productId)"
          class="opacity-40 hover:opacity-100 duration-500 cursor-pointer"
          src="/close.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
