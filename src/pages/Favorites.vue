<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

import CardList from '@/components/CardList.vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://b561fe78d0163fe1.mokky.dev/favorites?_relations=sneakers',
    )
    favorites.value = data.map((obj) => obj.sneaker)
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">Мои закладки</h2>

  <CardList :items="favorites" is-favorites />
</template>
