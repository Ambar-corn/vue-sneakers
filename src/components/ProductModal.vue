<script setup>
import BaseModal from './BaseModal.vue'
import { useProductStore } from '../stores/productsStores'
import { useUiStore } from '../stores/uiStores'

const emit = defineEmits(['addToFavorite', 'addToCart'])

const uiStore = useUiStore()

const productStore = useProductStore()

function closeModal() {
  uiStore.closeModal()
  document.body.classList.remove('overflow-hidden')
}
</script>
<template>
  <BaseModal :is-open-modal="uiStore.isProductModalOpen" @close-modal="closeModal">
    <div class="w-full h-full flex items-center flex-col gap gap-y-4 p-8 animate-pulse">
      <div class="w-4/5 h-1/3 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
      <div class="w-4/5 h-1/3 flex gap gap-x-4 justify-between">
        <div
          @click="() => emit('addToFavorite', productStore.activeProduct)"
          class="w-2/5 h-1/5 bg-red-300 rounded-3xl"
        ></div>
        <div class="w-2/5 h-1/5 bg-green-300 rounded-3xl"></div>
      </div>
    </div>

    <div
      class="w-full h-full flex justify-center"
      v-if="productStore.activeProduct && productStore.activeProduct != null"
    >
      <!-- <img class="w-3/5 h-1/3" :src="productStore.activeProduct.imageUrl" alt="" /> -->
      <!-- <div class="text-black p-4 rounded">
        {{ productStore.activeProduct.id }}
      </div>
      <div class="text-black p-4 rounded">
        {{ productStore.activeProduct.title }}
      </div>
      <div class="text-black p-4 rounded">
        {{ productStore.activeProduct.price }}
      </div>
      <div class="text-black p-4 rounded">
        {{ productStore.activeProduct.imageUrl }}
      </div>
      <div class="text-black p-4 rounded">
        {{ productStore.activeProduct.description }}
      </div> -->
    </div>
  </BaseModal>
</template>
