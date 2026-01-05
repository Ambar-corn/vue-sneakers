<script setup>
import Card from './Card.vue'

defineProps({
  items: Array,
  isFavorites: Boolean,
})

const emit = defineEmits(['addToFavorite', 'addToCart', 'openModal'])
</script>
<template>
  <div class="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-lg:gap-10" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
      @open="() => emit('openModal', item)"
      @add="() => emit('addToCart', item)"
      @favorite="() => emit('addToFavorite', item)"
    />
  </div>
</template>
