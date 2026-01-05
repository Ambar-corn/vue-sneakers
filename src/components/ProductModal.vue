<script setup>
import BaseModal from './BaseModal.vue'
import { useUiStore } from '../stores/uiStores'
const uiStore = useUiStore()
</script>
<template>
  <BaseModal :is-open-modal="uiStore.isProductModalOpen" @close-modal="uiStore.closeModal">
    <div class="bg-black p-4 rounded">sdfjl fsf</div>
  </BaseModal>
</template>
