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

  //! вместо emit в Header function openDrawer

  return {
    isProductModalOpen,
    closeModal,
    openProductModal,
  }
})
