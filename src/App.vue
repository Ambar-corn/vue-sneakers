<script setup>
import { ref, provide, watch, computed } from 'vue'
import axios from 'axios'
import { stringify } from 'postcss'

import Home from './pages/Home.vue'
import Header from './components/Header.vue'
// import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'

const cart = ref([])

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))

const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const isCreatingOrder = ref(false)

const drawerOpen = ref(false)

const openDrawer = () => {
  drawerOpen.value = true
}

const closeDrawer = () => {
  drawerOpen.value = false
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

const createOrder = async () => {
  try {
    isCreatingOrder.value = true

    const { data } = await axios.post('https://b561fe78d0163fe1.mokky.dev/orders', {
      items: cart.value,
      totalPrice: totalPrice.value,
    })
    cart.value = []

    return data
  } catch (err) {
    console.log(err)
  } finally {
    isCreatingOrder.value = false
  }
}

// provide('addToFavorite', addToFavorite)

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
  <div class="bg-teal-600 w-4/5 m-auto rounded-xl shadow-xl mt-20">
    <Drawer
      :total-price="totalPrice"
      :vat-price="vatPrice"
      v-if="drawerOpen"
      @create-order="createOrder"
      :is-creating-order="isCreatingOrder"
    />

    <Header :total-price="totalPrice" @open-drawer="openDrawer" />
    <div class="p-10">
      <router-view> </router-view>
    </div>
  </div>
</template>

<style scoped></style>
