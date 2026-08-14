<script setup>
import { computed } from 'vue'
import { useProductStore } from '@/stores/productsStores'
import { useCartStore } from '@/stores/cartStore'
import IconSharingan from '../icons/IconSharingan.vue'
import IconCheked from '../icons/IconCheked.vue'

defineProps({
  isAdded: Boolean,
})

const productStore = useProductStore()

// const isAdded = computed(() =>
//   productStore.activeProduct ? cartStore.isAdded(productStore.activeProduct.id) : false,
// )
</script>

<template>
  <div
    class="cursor-pointer"
    :class="{
      'pointer-events-none': productStore.productLoading,
    }"
  >
    <div v-show="!isAdded">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
        <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#F2F2F2" />
        <path
          d="M20.6653 15.1312H17.2021V11.6682C17.2021 10.3328 15.1311 10.3328 15.1311 11.6682V15.1312H11.668C10.3329 15.1312 10.3329 17.2022 11.668 17.2022H15.1311V20.6652C15.1311 22.0005 17.2021 22.0005 17.2021 20.6652V17.2022H20.6653C22.0005 17.2022 22.0005 15.1312 20.6653 15.1312Z"
          fill="#D3D3D3"
        />
      </svg>
    </div>

    <div v-show="isAdded">
      <IconCheked />
    </div>
  </div>
</template>
