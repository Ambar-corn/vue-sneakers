<script setup>
// defineProps({
//   imageUrl: String,
// })
</script>

<template>
  <div class="flex items-center border border-slate-100 p-4 rounded-xl gap-4">
    <img class="w-16 h-16" src="/sneakers/sneakers-1-removebg-preview.png" alt="Sneaker" />
    <div class="flex flex-col justify-between gap-y-2">
      <p class="text-white">Кроссовки Nike Air Max 270</p>
      <div class="flex justify-between">
        <span class="text-white text-semibold">12990 руб.</span>
        <img
          class="opacity-40 hover:opacity-100 duration-500 cursor-pointer"
          src="/close.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
