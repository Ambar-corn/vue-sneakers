import { onMounted, onBeforeUnmount, type Ref } from 'vue'

export function useClickOutside(
  refElement: Ref<HTMLElement | null>,
  callback: (arg: Event) => void,
) {
  const handleClickOutside = (event: Event) => {
    // Проверяем, находится ли клик вне элемента, на который ссылается refElement
    if (
      refElement.value &&
      event.target instanceof Node &&
      !refElement.value.contains(event.target)
    ) {
      callback(event)
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })
}
