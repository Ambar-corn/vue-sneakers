<script setup lang="ts">
import CartItem from './CartItem.vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
</script>

<template>
  <div class="flex flex-col flex-1 gap-4" v-auto-animate>
    <CartItem
      v-for="item in cartStore.getLocalItems()"
      :key="`${item.productId}-${item.size}`"
      :cart-item="item"
    />
  </div>
</template>
