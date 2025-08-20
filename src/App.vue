<script setup>
import { onMounted, reactive, ref, provide, watch } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'

const items = ref([])

const drawerOpen = ref(false)

const openDrawer = () => {
  drawerOpen.value = true
}

const closeDrawer = () => {
  drawerOpen.value = false
}
const filters = reactive({
  sortBy: 'name',
  searchQuery: '',
})

const onChangeSelect = async (event) => {
  filters.sortBy = event.target.value
}
const onChangeSearchInput = async (event) => {
  filters.searchQuery = event.target.value
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://b561fe78d0163fe1.mokky.dev/favorites')
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id)
      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const deleteAll = async () => {
  try {
    const { data: favorites } = await axios.get('https://b561fe78d0163fe1.mokky.dev/favorites')

    for (const f of favorites) {
      await axios.delete(`https://b561fe78d0163fe1.mokky.dev/favorites/${f.id}`)
    }

    items.value = items.value.map((item) => ({
      ...item,
      isFavorite: false,
      favoriteId: undefined,
    }))
  } catch (err) {
    console.log(err)
  }
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id,
      }
      item.isFavorite = true
      // console.log(item)
      const { data } = await axios.post('https://b561fe78d0163fe1.mokky.dev/favorites', obj)
      item.favoriteId = data.id
      // axios.post(`https://b561fe78d0163fe1.mokky.dev/sneakers/${parentId}`)
    } else {
      item.isFavorite = false
      await axios.delete(`https://b561fe78d0163fe1.mokky.dev/favorites/${item.favoriteId}`)
      // item.favoriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}

// provide('addToFavorite', addToFavorite)
const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    }
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get('https://b561fe78d0163fe1.mokky.dev/sneakers', {
      params,
    })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false,
    }))
    await fetchFavorites()
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await fetchItems()
  await fetchFavorites()
})

watch(filters, fetchItems)

provide('cartActions', { closeDrawer, openDrawer })
</script>

<template>
  <div class="bg-teal-600 w-4/5 m-auto rounded-xl shadow-xl mt-20">
    <Drawer v-if="drawerOpen" />

    <Header @open-drawer="openDrawer" />
    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
        <div class="border-8 border-red-700 bg-orange-700 rounded-md">
          <button @click="deleteAll()">Сненси меня!!!</button>
        </div>
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
              @input="onChangeSearchInput"
              class="border rounded-md py-1.5 pl-10 pr-4 outline-none bg-teal-600 focus:border-gray-400"
              type="text"
              placeholder="Поиск..."
            />
          </div>
        </div>
      </div>
      <div class="mt-10">
        <CardList :items="items" @add-to-favorite="addToFavorite" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
