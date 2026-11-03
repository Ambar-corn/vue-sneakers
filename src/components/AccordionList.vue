<script setup lang="ts">
import { ref } from 'vue'
import AccordionItem from './AccordionItem.vue'

type AccordionItemData = {
  title: string
  type: string
  content: string[]
}

defineProps<{
  accordionData: AccordionItemData[]
}>()

const emit = defineEmits<{
  (e: 'size', size: number | null): void
}>()
// null — все закрыты
const activeIndex = ref<number | null>(null)

function toggleAccordion(index: number) {
  if (activeIndex.value === index) {
    // если нажали на уже открытый — закрываем
    activeIndex.value = null
  } else {
    // автоматически "закрываем" предыдущий,
    // потому что теперь открыт новый
    activeIndex.value = index
  }
}
</script>

<template>
  <AccordionItem
    v-for="(item, index) in accordionData"
    :key="index"
    :index="index"
    :accordion-item-data="item"
    :is-open="activeIndex === index"
    @toggle="toggleAccordion"
    @select-size="emit('size', $event)"
  />
</template>
