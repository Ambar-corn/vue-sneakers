<script setup>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'

const items = ref([])
onMounted(async () => {
  try {
    const { data } = await axios.get('https://b561fe78d0163fe1.mokky.dev/sneakers')
    items.value = data
  } catch (err) {
    console.log(err)
  }
})

const sortBy = ref('')
const searchQuery = ref('')

watch(sortBy, async () => {
  try {
    const { data } = await axios.get(
      'https://b561fe78d0163fe1.mokky.dev/sneakers?sortBy=' + sortBy.value,
    )
    items.value = data
  } catch (err) {
    console.log(err)
  }
})

const onChangeSelect = (event) => {
  sortBy.value = event.target.value
}
</script>

<template>
  <div class="bg-teal-600 w-4/5 m-auto rounded-xl shadow-xl mt-20">
    <!-- <Drawer /> -->

    <Header />
    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

        <div class="flex items-center gap-4">
          <select
            @change="onChangeSelect"
            class="bg-teal-600 py-1.5 px-3 border rounded-md outline-none"
          >
            <option value="name" class="border rounded-md">По названию</option>
            <option value="price" class="border rounded-md">По цене (дешевые)</option>
            <option value="-price" class="border rounded-md">По цене (дорогие)</option>
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
      <div class="mt-10">
        <CardList :items="items" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
