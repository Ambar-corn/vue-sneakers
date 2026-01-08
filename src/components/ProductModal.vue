<script setup>
import BaseModal from './BaseModal.vue'
import { useProductStore } from '../stores/productsStores'
import { useUiStore } from '../stores/uiStores'

const uiStore = useUiStore()

const productStore = useProductStore()

function ali() {
  uiStore.closeModal()
  productStore.clearActiveProduct()
}
</script>
<template>
  <BaseModal
    :is-open-modal="uiStore.isProductModalOpen"
    @close-modal="
      () => {
        uiStore.closeModal()
        productStore.clearActiveProduct()
      }
    "
  >
    <div v-if="productStore.activeProduct">
      <div class="text-black p-4 rounded">
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
      </div>
      <img :src="productStore.activeProduct.imageUrl" alt="" />
    </div>
  </BaseModal>
</template>
