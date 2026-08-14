<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'

const shift = ref(0)

function step(timestamp: DOMHighResTimeStamp) {
  shift.value = Math.min(timestamp, 2000) // например, 1px за 10ms → 200px за 2000ms

  if (shift.value < 2000) {
    requestAnimationFrame(step)
  }
}
requestAnimationFrame(step)

async function ddfs() {
  await nextTick()
  console.log(`DOM< ZDEC`)
}

nextTick(() => console.log(`DOM< ZDEC`))

console.log(`Dom не обновлен ${performance.now()}`)

onMounted(() => ddfs())
</script>

<template>
  <div>
    <div
      class="w-10 h-10 bg-red-900"
      :style="{
        transform: `translateX(${shift}px)`,
      }"
    ></div>
  </div>
</template>
