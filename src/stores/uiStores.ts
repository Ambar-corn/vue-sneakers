import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const isProductModalOpen = ref(false)

  function closeModal() {
    isProductModalOpen.value = false
  }

  function openProductModal() {
    isProductModalOpen.value = true
  }

  return {
    isProductModalOpen,
    closeModal,
    openProductModal,
  }
})
