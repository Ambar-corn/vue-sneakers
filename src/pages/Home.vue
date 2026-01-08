<script setup>
import { reactive, watch, ref, onMounted } from 'vue'
import axios from 'axios'
import CardList from '../components/CardList.vue'
import { inject } from 'vue'
import debounce from 'lodash.debounce'
import { useProductStore } from '../stores/productsStores'
import ProductModal from '@/components/ProductModal.vue'
import { reduceEachLeadingCommentRange } from 'typescript'
import { useUiStore } from '../stores/uiStores'

const productStore = useProductStore()

const uiStore = useUiStore()

const { cart, addToCart, removeFromCart } = inject('cart')

const items = ref([])

const filters = reactive({
  sortBy: 'name',
  searchQuery: '',
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}
const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 500)

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

const deleteOrders = async () => {
  try {
    const { data: orders } = await axios.get('https://b561fe78d0163fe1.mokky.dev/orders')

    for (const item of orders) {
      await axios.delete(`https://b561fe78d0163fe1.mokky.dev/orders/${item.id}`)
    }
  } catch (err) {
    console.log(err)
  }
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        sneaker_id: item.id,
      }
      item.isFavorite = true
      // console.log(item)
      const { data } = await axios.post('https://b561fe78d0163fe1.mokky.dev/favorites', obj)
      item.favoriteId = data.id
      // axios.post(`https://b561fe78d0163fe1.mokky.dev/sneakers/${sneaker_id}`)
    } else {
      item.isFavorite = false
      await axios.delete(`https://b561fe78d0163fe1.mokky.dev/favorites/${item.favoriteId}`)
      // item.favoriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
  // console.log(cart)
  // console.log(vatPrice.value)
  // console.log(totalPrice)
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://b561fe78d0163fe1.mokky.dev/favorites')
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.sneaker_id === item.id)
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
    console.log(items)
  } catch (err) {
    console.log(err)
  }
}

function openModal(item) {
  productStore.fetchProductById(item.id)
  uiStore.openProductModal()
}

onMounted(async () => {
  const loclaCart = localStorage.getItem('cart')
  cart.value = loclaCart ? JSON.parse(loclaCart) : []

  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id),
  }))
})

watch(filters, fetchItems)

watch(cart, () => {
  items.value = items.value.map((item) => ({ ...item, isAdded: false }))
})
</script>

<template>
  <div class="flex justify-between items-center max-[1000px]:flex-col">
    <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
    <div class="border-8 border-red-700 bg-orange-700 rounded-md hidden">
      <button @click="deleteAll()">Сненси меня!!!</button>
    </div>
    <div class="border-8 border-red-700 bg-orange-700 rounded-md hidden">
      <button @click="deleteOrders()">Сненси и меня пожалуйста</button>
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
    <CardList
      :items="items"
      @add-to-favorite="addToFavorite"
      @add-to-cart="onClickAddPlus"
      @open-modal="openModal"
    />
  </div>
  <ProductModal />
</template>
