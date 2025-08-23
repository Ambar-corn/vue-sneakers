<script setup>
defineProps({
  imageUrl: String,
  title: String,
  description: String,
})
</script>

<template>
  <div class="flex flex-col items-center text-center gap-y-2 w-72 mx-auto">
    <img height="80" width="80" :src="imageUrl" alt="Box" />
    <h2>{{ title }}</h2>
    <p class="text-slate-400">{{ description }}</p>
  </div>
</template>
