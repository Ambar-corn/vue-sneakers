import { watch, ref, onBeforeUnmount } from 'vue'

export function useDelayedLoading(sourceRef, delay: number, minVisible: number = 300) {
  const visible = ref(false)
  let showTimer: ReturnType<typeof setTimeout> | null = null
  let hideTimer: ReturnType<typeof setTimeout> | null = null
  let shownAt = 0

  watch(
    sourceRef,
    (isLoading, wasLoading) => {
      if (showTimer) {
        clearTimeout(showTimer)
        showTimer = null
      }

      if (hideTimer) {
        clearTimeout(hideTimer)
        hideTimer = null
      }

      if (isLoading && !wasLoading) {
        showTimer = setTimeout(() => {
          visible.value = true
          shownAt = performance.now()
        }, delay)
      }
      if (!isLoading && wasLoading) {
        if (!visible.value) return

        const visibleTime = performance.now() - shownAt

        const remaining = Math.max(0, minVisible - visibleTime)

        hideTimer = setTimeout(() => {
          visible.value = false
        }, remaining)
      }
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    if (showTimer) clearTimeout(showTimer)
    if (hideTimer) clearTimeout(hideTimer)
  })
  return visible
}
