import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    isProductModalOpen: false,
  }),
  actions: {
    closeModal() {
      this.isProductModalOpen = false
    },
    openProductModal() {
      this.isProductModalOpen = true
    },
  },
})
