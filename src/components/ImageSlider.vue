<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{ images: string[]; onLoading: (index: number) => void }>()

const currentImage = ref(0)
const length = computed(() => props.images.length)

const track = ref<HTMLElement | null>(null)
const sliderViewport = ref<HTMLElement | null>(null)

const isDragging = ref(false)
const deltaX = ref(0)
const startDrag = ref(0)
const viewportWidth = ref(0)
const activePointerId = ref<number | null>(null)

const base = computed(() => -currentImage.value * viewportWidth.value)

const offsetX = computed(() => base.value + deltaX.value)

const isNonTouchDevice = ref(window.matchMedia('(hover: hover) and (pointer: fine)').matches)

let resizeObserver: ResizeObserver | null = null

function measureWidth() {
  const width = sliderViewport.value?.getBoundingClientRect().width ?? 0
  if (width > 0) {
    viewportWidth.value = width
  }
}

function increment() {
  if (currentImage.value === length.value - 1) {
    currentImage.value = 0
  } else {
    currentImage.value++
  }
}

function decrement() {
  if (currentImage.value === 0) {
    currentImage.value = length.value - 1
  } else {
    currentImage.value--
  }
}

function endDrag(event: PointerEvent) {
  if (activePointerId.value !== event.pointerId) return

  isDragging.value = false

  if (deltaX.value > 0 && deltaX.value >= viewportWidth.value * 0.2) {
    decrement()
  }
  if (deltaX.value < 0 && deltaX.value * -1 >= viewportWidth.value * 0.2) {
    increment()
  }
  deltaX.value = 0
  activePointerId.value = null

  if (track.value && event.pointerId) {
    track.value.releasePointerCapture(event.pointerId)
  }

  document.removeEventListener('pointermove', movingTrack)
  document.removeEventListener('pointerup', endDrag)
  document.removeEventListener('pointercancel', endDrag)
}

function movingTrack(event: PointerEvent) {
  if (activePointerId.value !== event.pointerId) return

  isDragging.value = true

  deltaX.value = event.clientX - startDrag.value
}

function onTrackDown(event: PointerEvent) {
  if (viewportWidth.value <= 0) return

  activePointerId.value = event.pointerId

  event.preventDefault()
  startDrag.value = event.clientX

  track.value?.setPointerCapture(event.pointerId)

  document.addEventListener('pointermove', movingTrack)
  document.addEventListener('pointerup', endDrag)
  document.addEventListener('pointercancel', endDrag)
}

onMounted(async () => {
  await nextTick()
  if (sliderViewport.value) {
    resizeObserver = new ResizeObserver(() => {
      // measureWidth()
    })
    resizeObserver.observe(sliderViewport.value)
    measureWidth()
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})
</script>

<template>
  <div class="w-full h-full flex justify-center items-center group relative">
    <button
      class="select-none opacity-0 absolute left-0 w-[50px] h-[50px]"
      :class="{
        'opacity-100': !isNonTouchDevice,
        'group-hover:opacity-100': isNonTouchDevice,
      }"
      @click="decrement"
    >
      <svg class="rotate-180" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m10.5 28c-.256 0-.512-.098-.707-.293-.391-.391-.391-1.023 0-1.414l10.293-10.293-10.293-10.293c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l11 11c.391.391.391 1.023 0 1.414l-11 11c-.195.195-.451.293-.707.293z"
          fill="rgb(0,0,0)"
        />
      </svg>
    </button>

    <div ref="sliderViewport" class="max-w-[400px] h-full overflow-hidden select-none">
      <div
        ref="track"
        @pointerdown="onTrackDown"
        class="flex touch-none"
        :class="{ 'transition-transform': !isDragging, 'duration-300': !isDragging }"
        :style="{
          transform: `translateX(${offsetX}px)`,
        }"
      >
        <div class="flex-none w-full" v-for="(item, index) in props.images" :key="item + index">
          <div class="flex w-full h-full justify-center items-center">
            <img
              @load="onLoading(index)"
              class="w-full h-full object-contain"
              x-class="{ //~ Интересная стилизация 
                'scale-95': !isDragging, 
              }"
              :src="item"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <button
      class="select-none opacity-0 group-hover:opacity-100 absolute right-0 w-[50px] h-[50px]"
      :class="{
        'opacity-100': !isNonTouchDevice,
        'group-hover:opacity-100': isNonTouchDevice,
      }"
      @click="increment"
    >
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m10.5 28c-.256 0-.512-.098-.707-.293-.391-.391-.391-1.023 0-1.414l10.293-10.293-10.293-10.293c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l11 11c.391.391.391 1.023 0 1.414l-11 11c-.195.195-.451.293-.707.293z"
          fill="rgb(0,0,0)"
        />
      </svg>
    </button>
  </div>
</template>
