import { defineStore } from 'pinia'
import { ref } from 'vue'

// export function useUiStore() {
//   const isOpenModal = ref(true)

//   function closeModal() {
//     isOpenModal.value = false
//   }

//   return {
//     closeModal,
//   }
// }

export const useCloseModal = defineStore('isOpenModal', {
  state: () => {
    return { isOpen: true }
  },
  actions: {
    closeModal() {
      this.isOpen = false
    },
  },
})
