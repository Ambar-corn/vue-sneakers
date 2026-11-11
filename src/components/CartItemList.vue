<script setup lang="ts">
import CartItem from './CartItem.vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
</script>

<template>
  <TransitionGroup name="list" tag="div" class="flex flex-col flex-1 gap-4">
    <CartItem
      v-for="item in cartStore.getLocalItems()"
      :key="`${item.productId}-${item.size}`"
      :cart-item="item"
    />
  </TransitionGroup>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 1.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
