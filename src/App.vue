<script setup>
import { ref, provide } from 'vue'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const drawerOpen = ref(false)

const openDrawer = () => {
  drawerOpen.value = true
  document.body.classList.add('overflow-hidden')
}

const closeDrawer = () => {
  drawerOpen.value = false
  document.body.classList.remove('overflow-hidden')
}

function isTouchDevice() {
  try {
    document.createEvent('TouchEvent')
    return true
  } catch (e) {
    return false
  }
}

sessionStorage.setItem('isMobile', isTouchDevice())

provide('cart', { closeDrawer, openDrawer })
</script>

<template>
  <!--? bg-teal-600-->
  <div class="bg-zinc-900 w-full rounded-xl shadow-xl">
    <Drawer v-show="drawerOpen" :drawer-open="drawerOpen" />
    <!-- <ProductModal /> -->
    <Header @open-drawer="openDrawer" />
    <div class="p-10">
      <router-view> </router-view>
    </div>
  </div>
</template>
