<script setup>
import { inject } from 'vue'

defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
})
</script>
<template>
  <div
    class="relative bg-teal-600 border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 transition hover:shadow-xl"
  >
    <img
      @click="onClickFavorite"
      :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
      alt="Like-2"
      class="absolute top-8 left-8"
    />
    <img :src="imageUrl" alt="Sneaker" class="bg-gradient-to-r from-violet-500 to-fuchsia-500" />
    <p class="mt-2">{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span text-slate-400>Цена</span>
        <span class="font-semibold text-black">{{ price }} руб.</span>
      </div>
      <img @click="onClickAdd" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="Plus" />
    </div>
  </div>
</template>
