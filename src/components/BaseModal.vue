<script setup>
import { useClickOutside } from '@/composables/useClickOutside'
import { ref } from 'vue'

const props = defineProps({
  isOpenModal: Boolean,
})

// const closeButtonRef = ref(null)

const modalRef = ref(null)

const emit = defineEmits(['closeModal'])

function onClickCloseButton() {
  emit('closeModal')
}

function handleModalOutside() {
  emit('closeModal')
}

useClickOutside(modalRef, (event) => {
  handleModalOutside(event)
})

// function pressEsc() {
//   emit('closeModal')
//   console.log(`sdfh`)
// }
</script>

<template>
  <div v-if="isOpenModal">
    <div class="fixed top-0 left-0 h-full w-full bg-black opacity-50 z-10"></div>
    <div class="fixed top-0 left-0 flex items-center justify-center w-full h-full z-10">
      <div
        ref="modalRef"
        class="relative bg-white opacity-100 w-[600px] h-[900px] rounded-xl z-50 border border-slate-100"
      >
        <div
          @click="onClickCloseButton"
          class="rounded-full w-10 h-10 cursor-pointer absolute right-3 top-3 flex items-center justify-center"
        >
          <div
            class="relative w-5 h-5 after:absolute after:inset-0 after:m-auto after:w-5 after:h-0.5 after:bg-black after:rotate-45 before:absolute before:inset-0 before:m-auto before:w-5 before:h-0.5 before:bg-black before:-rotate-45"
          ></div>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
