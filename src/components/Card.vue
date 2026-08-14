<script setup>
import { computed, ref } from 'vue'

import { useFavoriteStore } from '@/stores/favoritesStore'
import { useCartStore } from '@/stores/cartStore'
import CartButton from './ui/CartButton.vue'
import FavoriteButton from './ui/FavoriteButton.vue'

const cartStore = useCartStore()

const favoriteStore = useFavoriteStore()

const props = defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
})

const emit = defineEmits(['open'])

const likeRef = ref(null)

const addRef = ref(null)

const isFavorite = computed(() => favoriteStore.isFavorite(props.id))

const isAdded = computed(() => cartStore.isAdded(props.id))

function onCardClick(event) {
  if (likeRef.value?.contains(event.target) || addRef.value?.contains(event.target)) {
    return
  }
  emit('open')
}
</script>
<template>
  <div
    @click.stop="onCardClick"
    class="relative bg-zinc-900 border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 transition hover:shadow-xl select-none"
  >
    <!-- <img
      class="absolute top-8 left-8"
      @click="favoriteStore.favoritesToggle(props.id)"
      ref="likeRef"
      :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
      alt="Like-2"
    /> -->

    <FavoriteButton
      class="w-[32px] absolute top-8 left-8"
      @click.stop="favoriteStore.favoritesToggle(props.id)"
      :is-favorite="isFavorite"
    />
    <img
      :src="imageUrl[0]"
      alt="Sneaker"
      class="bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-3xl w-[266px] h-[224px] object-cover"
    />
    <p class="mt-2">{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span text-slate-400>Цена</span>
        <span class="font-semibold text-black">{{ price }} руб.</span>
      </div>
      <!-- <img
        ref="addRef"
        @click.stop="cartStore.cartLocalToggle(props)"
        :src="!isAdded ? '/plus.svg' : '/checked.svg'"
        alt="Plus"
      /> -->

      <CartButton
        class="w-[40px]"
        @click.stop="cartStore.cartLocalToggle(props)"
        :is-added="isAdded"
      />
      <!--Новая версия-->
    </div>
  </div>
</template>
