<script setup>
import { reactive, watch, ref, onMounted, watchEffect, computed } from 'vue'
import axios from 'axios'
import CardList from '../components/CardList.vue'
import { inject } from 'vue'
import debounce from 'lodash.debounce'
import { useProductStore } from '../stores/productsStores'
import ProductModal from '@/components/ProductModal.vue'
import { useUiStore } from '../stores/uiStores'
import { useFavoriteStore } from '@/stores/favoritesStore'
import { useDelayedLoading } from '@/composables/useDelayedLoading'
import { useCartStore } from '@/stores/cartStore'
import { useOrderStore } from '@/stores/orderStore.js'

const cartStore = useCartStore()

const orderStore = useOrderStore()

const favoriteStore = useFavoriteStore()

const productStore = useProductStore()

const uiStore = useUiStore()

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

const showLoading = useDelayedLoading(() => productStore.listLoading, 200)

const deleteAll = async () => {
  try {
    const { data: favorites } = await axios.get('https://b561fe78d0163fe1.mokky.dev/favorites')

    for (const f of favorites) {
      await axios.delete(`https://b561fe78d0163fe1.mokky.dev/favorites/${f.id}`)
    }
  } catch (err) {
    console.log(err)
  }
}

function openModal(item) {
  productStore.fetchProductById(item.id)
  uiStore.openProductModal()
  document.body.classList.add('overflow-hidden')
}

onMounted(async () => {
  cartStore.initLocalCart()
  await Promise.all([productStore.fetchItems(filters), favoriteStore.requestFavorites()])
})

watch(
  filters,
  () => {
    productStore.fetchItems(filters)
  },
  { deep: true },
)
</script>

<template>
  <div class="flex justify-between items-center max-[1000px]:flex-col">
    <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
    <div class="border-8 border-red-700 bg-orange-700 rounded-md">
      <button @click="deleteAll()">Сненси меня!!!</button>
    </div>
    <div class="border-8 border-red-700 bg-orange-700 rounded-md">
      <button @click="orderStore.deleteOrders">Сненси и меня пожалуйста</button>
    </div>
    <div
      class="flex items-center gap-4"
      :class="{
        'pointer-events-none': showLoading,
        'opacity-10': showLoading,
      }"
    >
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
  <div class="mt-10 relative">
    <div
      v-show="showLoading"
      class="absolute inline-flex flex-col items-center justify-center gap-3 z-10 size-56 left-1/2 top-1/4 translate-y-[-7%] translate-x-[-50%]"
    >
      <!-- <div class="size-56 z-10"> -->
      <div class="absolute rounded-full border-blue-100 size-56 border-[16px]"></div>
      <svg
        width="100%"
        height="100%"
        fill="none"
        class="absolute animate-spin stroke-blue-700"
        xmlns="http://www.w3.org/2000/svg"
        stroke-width="1.75"
        viewBox="1 0.125 23 23.75"
      >
        <path
          d="M12.5 23c6.075 0 11-4.925 11-11s-4.925-11-11-11-11 4.925-11 11"
          stroke-linecap="round"
        ></path>
      </svg>
      <!-- </div> -->
      <span class="text-lg font-semibold text-blue-700">Loading...</span>
    </div>
    <CardList
      :class="{
        'pointer-events-none': showLoading,
        'opacity-10': showLoading,
      }"
      :items="productStore.items"
      @open-modal="openModal"
    />
  </div>
  <ProductModal />
</template>
