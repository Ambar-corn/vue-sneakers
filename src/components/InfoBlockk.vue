<script setup>
defineProps({
  imageUrl: String,
  title: String,
  description: String,
})
</script>

<template>
  <div class="flex flex-col items-center text-center gap-y-2 w-72 mx-auto">
    <img height="120" width="120" :src="imageUrl" alt="Box" />
    <h2 class="text-black">{{ title }}</h2>
    <p class="">{{ description }}</p>
  </div>
</template>
