import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', {
  state: () => ({
    isProductModalOpen: true,
  }),
  actions: {
    closeModal() {
      this.isProductModalOpen = false
    },
    actions: {
      openProductModal(id) {},
    },
  },
})
