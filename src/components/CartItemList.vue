<script setup lang="ts">
import CartItem from './CartItem.vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

// productId: number;
// title: string;
// price: number;
// imageUrl: string[];
// size: number;
// quantity: number;

// <CartItem
//   v-for="item in cartStore.localItems"
//   :key="item.productId"
//   :product-id="item.productId"
//   :title="item.title"
//   :image-url="item.imageUrl"
//   :price="item.price"
//   :size="item.size"
//   :quantity="item.quantity"
// />
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
