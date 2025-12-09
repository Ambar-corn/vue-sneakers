<script setup>
import { ref, watch } from 'vue'
import { onMounted, onUnmounted } from 'vue'

defineProps({
  totalPrice: Number,
})

const emit = defineEmits(['openDrawer'])

const isMobile = sessionStorage.getItem('isMobile') === 'true'

const isProfileOpen = ref(false)

const isBurgerOpen = ref(false)

const profileRef = ref(null)

const burgerRef = ref(null)

function toggleProfile() {
  if (isMobile) {
    isProfileOpen.value = !isProfileOpen.value
  }
}

watch([isProfileOpen, isBurgerOpen], ([menu, burger]) => {
  if (menu) {
    window.addEventListener('click', handleClickOutside)
  } else {
    window.removeEventListener('click', handleClickOutside)
  }

  if (burger && !menu) {
    window.addEventListener('click', otdel)
  } else {
    window.removeEventListener('click', otdel)
  }
})

function handleClickOutside(e) {
  // если клик не по элементу меню — закрываем
  const target = e.target

  const profile = profileRef.value

  if (profile && !profile.contains(target)) {
    isProfileOpen.value = false
  }
}

function otdel(e) {
  const target = e.target

  const burger = burgerRef.value

  const profile = profileRef.value
  if (burger && !burger.contains(target) && profile && !profile.contains(target)) {
    isBurgerOpen.value = false

    document.body.classList.remove('overflow-hidden')
  }
}

//! Изменить название

function toggleBurger() {
  isBurgerOpen.value = !isBurgerOpen.value
  if (isBurgerOpen.value) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
}

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8 max-lg:items-center">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-white text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-white">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>
    <nav
      class="flex items-center gap-10 max-lg:fixed max-lg:top-0 max-lg:-left-full max-lg:w-full max-lg:h-full max-lg:bg-black/20 max-lg:backdrop-blur-sm max-lg:transition-[left] max-lg:duration-300 max-lg:ease-linear max-lg:overflow-auto max-lg:opacity-80 z-10 max-lg:items-start max-lg:fixed max-lg:mt-[115px] max-lg:flex-col max-lg:px-10 max-lg:py-5"
      :class="{ 'max-lg:left-0 ': isBurgerOpen }"
    >
      <ul>
        <li @click="emit('openDrawer')" class="flex items-center cursor-pointer gap-3">
          <img src="/cart.svg" alt="Cart" class="" />
          <span class="text-white hover:text-black">{{ totalPrice }} руб.</span>
        </li>
      </ul>
      <ul>
        <router-link to="/favorites">
          <li class="flex items-center cursor-pointer gap-3">
            <img src="/heart.svg" alt="Heart" class="" />
            <span class="text-white hover:text-black">Закладки</span>
          </li>
        </router-link>
      </ul>
      <ul ref="profileRef" @click="toggleProfile()" class="group relative gap-x-6 flex">
        <li class="flex items-center cursor-pointer gap-3">
          <img src="/profile.svg" alt="Profile" class="" />
          <span class="text-white hover:text-black">Профиль</span>
          <ul
            class="flex flex-col gap-y-4 absolute cursor-auto bg-black p-3 top-full -left-2.5 opacity-0 pointer-events-none translate-y-2 invisible group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto rounded-xl duration-150 z-10"
            :class="{ hidden: !isProfileOpen && isMobile ? true : false }"
          >
            <li class="hover:underline text-nowrap">
              <a href="">Раздел страницы №1</a>
            </li>
            <li class="hover:underline text-nowrap">
              <a href="">Раздел страницы №2</a>
            </li>
            <li class="hover:underline text-nowrap">
              <a href="">Раздел страницы №3</a>
            </li>
          </ul>
        </li>

        <svg
          class="flex items-center transition-transform duration-300"
          :class="{
            'rotate-180': isMobile ? isProfileOpen : false,
            'group-hover:rotate-180 ': !isMobile ? true : false,
          }"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
        >
          <path
            fill="white"
            d="M12,16c-0.3,0-0.5-0.1-0.7-0.3l-6-6c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l5.3,5.3l5.3-5.3c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-6,6C12.5,15.9,12.3,16,12,16z"
          ></path>
        </svg>
        <!-- </div> -->
      </ul>
    </nav>
    <!--Типа menu__icon-->
    <div
      ref="burgerRef"
      @click="toggleBurger()"
      class="hidden max-lg:block max-lg:z-50 max-lg:relative max-lg:w-8 max-lg:h-[18px] max-lg:cursor-pointer after:content-[''] after:left-0 after:absolute after:h-[2px] after:w-full after:bg-white afer:top-0 after:transition-all after:ease-in-out after:duration-300 before:content-[''] before:left-0 before:absolute before:h-[2px] before:w-full before:bg-white before:bottom-0 before:transition-all before:ease-in-out before:duration-300"
      :class="{
        'before:-rotate-45 before:top-1/2  after:rotate-45 after:top-1/2': isBurgerOpen
          ? true
          : false,
      }"
    >
      <span
        class="left-0 absolute h-[2px] w-full bg-white top-[45%] transition-all ease-in-out duration-300"
        :class="isBurgerOpen ? 'scale-0' : 'scale-100'"
      >
      </span>
    </div>
  </header>
</template>
