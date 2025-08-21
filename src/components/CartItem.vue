<script setup>
const emit = defineEmits(['onclickRemove'])

defineProps({
  id: Number,
  imageUrl: String,
  price: Number,
  title: String,
  onclickRemove: Function,
})
</script>

<template>
  <div class="flex items-center border border-slate-100 p-4 rounded-xl gap-4">
    <img class="w-16 h-16" :src="imageUrl" alt="Sneaker" />
    <div class="flex flex-col justify-between gap-y-2 flex-1">
      <p class="text-white">{{ title }}</p>
      <div class="flex justify-between">
        <span class="text-white text-semibold flex-1">{{ price }}.</span>
        <img
          @click="emit('onclickRemove')"
          class="opacity-40 hover:opacity-100 duration-500 cursor-pointer"
          src="/close.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
