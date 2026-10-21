<script setup lang="ts">
import { ref } from 'vue'

type AccordionItemData = {
  title: string
  type: string
  content: string[]
}

const props = defineProps<{
  index: number
  isOpen: boolean
  accordionItemData: AccordionItemData
}>()

const emit = defineEmits<{
  (e: 'toggle', index: number): void
  (e: 'select-size', size: number | null): void
}>()

const selectItem = ref<null | number>(null)

function selectSize(index: number, item: string) {
  if (selectItem.value === index) {
    selectItem.value = null
    emit('select-size', null)
  } else {
    selectItem.value = index
    emit('select-size', +item)
  }
}
</script>

<template>
  <div class="w-full pr-6 pl-6 flex-wrap gap-y-6 select-none">
    <div class="border-b-2">
      <button class="flex justify-between w-full" @click="emit('toggle', props.index)">
        <div class="flex text-gray-500 hover:text-black font-medium w-full h-full">
          {{ props.accordionItemData.title }}
        </div>

        <svg
          :class="{
            'rotate-180': isOpen,
          }"
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>
        </svg>
      </button>
      <div
        class="text-gray-500 flex gap-x-20 transition-all duration-700 ease-in-out"
        :class="{
          'max-h-0 overflow-hidden opacity-0': !isOpen,
          'max-h-64 opacity-100  ': isOpen,
        }"
      >
        <div
          :class="[accordionItemData.type === 'size' ? 'w-8 h-8' : 'select-text']"
          v-for="(item, index) in accordionItemData.content"
          :key="index"
        >
          <div
            @click="accordionItemData.type === 'size' && selectSize(index, item)"
            :class="{
              'flex rounded-full w-full h-full justify-center items-center cursor-pointer hover:bg-black text-white ':
                accordionItemData.type === 'size',
              'bg-lime-500 ': selectItem !== index && accordionItemData.type === 'size',
              'bg-black': selectItem === index,
            }"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
