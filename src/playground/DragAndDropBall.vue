<script setup>
import { ref } from 'vue'
const down = ref(false)

const ball = ref(null)

const ballLeft = ref(0)
const ballTop = ref(0)

const shiftX = ref(0)
const shiftY = ref(0)

const elem = ref(0)

function moveAt(event) {
  ballLeft.value = event.pageX - shiftX.value
  ballTop.value = event.pageY - shiftY.value

  ball.value.hidden = true
  elem.value = document.elementFromPoint(event.clientX, event.clientY)
  console.log(`${elem.value}`)
  ball.value.hidden = false
  console.log(`${ball.value.hidden}`)
}

function naj(event) {
  event.preventDefault()

  shiftX.value = event.clientX - ball.value.getBoundingClientRect().left
  shiftY.value = event.clientY - ball.value.getBoundingClientRect().top

  down.value = true

  moveAt(event)

  document.addEventListener('pointermove', moveAt)
  document.addEventListener('pointerup', delet)
}

function delet() {
  document.removeEventListener('pointermove', moveAt)
  document.removeEventListener('pointerup', delet)

  down.value = false
}
</script>

<template>
  <div>
    <img
      ref="ball"
      class="absolute z-50"
      :class="{ absolute: down, 'z-50': down }"
      src="https://en.js.cx/clipart/ball.svg"
      @pointerdown="naj"
      :style="{
        top: `${ballTop}px`,
        left: `${ballLeft}px`,
      }"
    />
  </div>
</template>
