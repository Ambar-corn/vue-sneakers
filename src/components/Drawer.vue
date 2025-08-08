<script setup>
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
</script>

<template>
  <div>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
    <div class="bg-teal-600 w-96 h-full fixed right-0 top-0 z-20 p-8">
      <DrawerHead />
      <CartItemList />

      <div class="flex flex-col gap-4 my-7">
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <span>12990 ₽ </span>
        </div>
        <div class="flex gap-2">
          <span>Налог 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <span>900 ₽ </span>
        </div>
      </div>
      <button
        disabled=""
        class="transition bg-green-500 w-full rounded-xl py-3 disabled:bg-slate-300 hover:bg-green-600 active:bg-green-700"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>
