<script setup>
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

function isTouchDevice() {
  try {
    document.createEvent('TouchEvent')
    return true
  } catch (e) {
    return false
  }
}

sessionStorage.setItem('isMobile', isTouchDevice())
</script>

<template>
  <!--? bg-teal-600-->
  <div class="bg-zinc-900 w-full rounded-xl shadow-xl">
    <Drawer />
    <!-- <ProductModal /> -->
    <Header />
    <div class="p-10">
      <router-view> </router-view>
    </div>
  </div>
</template>
