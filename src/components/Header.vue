<script setup>
defineProps({
  totalPrice: Number,
})

const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-white text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-white">Магазин лучших кросовок</p>
        </div>
      </div></router-link
    >
    <nav class="flex items-center gap-10">
      <ul>
        <li @click="emit('openDrawer')" class="flex items-center cursor-pointer gap-3">
          <img src="/cart.svg" alt="Cart" class="" />
          <span class="text-white hover:text-black">{{ totalPrice }} руб.</span>
        </li>
      </ul>
      <ul>
        <li class="flex items-center cursor-pointer gap-3">
          <img src="/heart.svg" alt="Heart" class="" />
          <span class="text-white hover:text-black">Закладки</span>
        </li>
      </ul>
      <ul>
        <li class="flex items-center cursor-pointer gap-3">
          <img src="/profile.svg" alt="Profile" class="" />
          <span class="text-white hover:text-black">Профиль</span>
        </li>
      </ul>
    </nav>
  </header>
</template>
