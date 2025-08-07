<script setup>
import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'
</script>

<template>
  <div class="bg-teal-600 w-4/5 m-auto rounded-xl shadow-xl mt-20">
    <Drawer />

    <Header />

    <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
    <CardList />
  </div>
</template>

<style scoped></style>
