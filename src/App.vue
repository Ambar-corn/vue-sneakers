<script setup>
import { ref, provide, watch, computed } from 'vue'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
import { useClickOutside } from './composables/useClickOutside'
import { useUiStore } from './stores/uiStores'
import ProductModal from './components/ProductModal.vue'

const uiStore = useUiStore()

const cart = ref([])

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))

const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const drawerOpen = ref(false)

const openDrawer = () => {
  drawerOpen.value = true
  document.body.classList.add('overflow-hidden')
}

const closeDrawer = () => {
  drawerOpen.value = false
  document.body.classList.remove('overflow-hidden')
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

// provide('addToFavorite', addToFavorite)

function isTouchDevice() {
  try {
    document.createEvent('TouchEvent')
    return true
  } catch (e) {
    return false
  }
}

sessionStorage.setItem('isMobile', isTouchDevice())

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true },
)

provide('cart', { cart, closeDrawer, openDrawer, addToCart, removeFromCart })
</script>

<template>
  <!--? -4/5  -->
  <div class="bg-teal-600 w-full rounded-xl shadow-xl">
    <Drawer
      :total-price="totalPrice"
      :vat-price="vatPrice"
      v-show="drawerOpen"
      :drawer-open="drawerOpen"
    />
    <!-- <ProductModal /> -->
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />
    <div class="p-10">
      <router-view> </router-view>
    </div>
  </div>
</template>

<style scoped></style>
