<script setup>
import { defineEmits, ref } from 'vue'

defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
})

const emit = defineEmits(['open', 'add', 'favorite'])

const likeRef = ref(null)

const addRef = ref(null)

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
    class="relative bg-teal-600 border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 transition hover:shadow-xl"
  >
    <img
      ref="likeRef"
      @click.stop="emit('favorite')"
      :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
      alt="Like-2"
      class="absolute top-8 left-8"
    />
    <img
      :src="imageUrl"
      alt="Sneaker"
      class="bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-3xl w-[266px] h-[224px]"
    />
    <p class="mt-2">{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span text-slate-400>Цена</span>
        <span class="font-semibold text-black">{{ price }} руб.</span>
      </div>
      <img
        ref="addRef"
        @click.stop="emit('add')"
        :src="!isAdded ? '/plus.svg' : '/checked.svg'"
        alt="Plus"
      />
    </div>
  </div>
</template>
