<script setup>
import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'
</script>

<template>
  <div class="bg-teal-600 w-4/5 m-auto rounded-xl shadow-xl mt-20">
    <!-- <Drawer /> -->

    <Header />
    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

        <div class="flex items-center gap-4">
          <select class="bg-teal-600 py-1.5 px-3 border rounded-md outline-none">
            <option class="border rounded-md">По названию</option>
            <option class="border rounded-md">По цене (дешевые)</option>
            <option class="border rounded-md">По цене (дорогие)</option>
          </select>

          <div class="relative">
            <img class="absolute left-3 top-2.5" src="/search.svg" alt="" />
            <input
              class="border rounded-md py-1.5 pl-10 pr-4 outline-none bg-teal-600 focus:border-gray-400"
              type="text"
              placeholder="Поиск..."
            />
          </div>
        </div>
      </div>
    </div>
    <CardList />
  </div>
</template>

<style scoped></style>
