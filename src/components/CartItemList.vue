<script setup lang="ts">
import { ref } from 'vue'
import CartItem from './CartItem.vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

const emit = defineEmits<{
  (e: 'leaves-finished'): void
}>()

let pendingLeaves = 0

function onBeforeLeave() {
  pendingLeaves++

  console.log(`pendBef = ${pendingLeaves}`)
}

function onAfterLeave() {
  pendingLeaves--

  console.log(`pendAf = ${pendingLeaves}`)

  if (pendingLeaves === 0) {
    emit('leaves-finished')
  }
}
</script>

<template>
  <TransitionGroup
    name="list"
    tag="div"
    class="relative flex flex-col flex-1 gap-4"
    @before-leave="onBeforeLeave"
    @after-leave="onAfterLeave"
  >
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
  transition: all 1.5s;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scaleY(0.01);
}

.list-leave-active {
  /* position: absolute; */
  width: 100%;
}
</style>
