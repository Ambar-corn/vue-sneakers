import { onMounted, onBeforeUnmount } from 'vue'

export function useEscapePressed(callback: () => void) {
  function handleEscapePressed(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleEscapePressed)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleEscapePressed)
  })
}
