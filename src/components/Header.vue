<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <div class="flex items-center gap-4">
      <img src="/logo.png" alt="Logo" class="w-10" />
      <div>
        <h2 class="text-white text-xl font-bold uppercase">Vue Sneakers</h2>
        <p class="text-white">Магазин лучших кросовок</p>
      </div>
    </div>
    <nav class="flex items-center gap-10">
      <ul>
        <li class="flex items-center cursor-pointer gap-3">
          <img src="/cart.svg" alt="Cart" class="" />
          <span class="text-white hover:text-black">1200 руб.</span>
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
