export function useOnScrollClass(scrollThreshold: number = 60) {
  const isScrollingDown = ref(false)
  let previousScroll = 0

  const handleScroll = () => {
    const currentScroll = window.scrollY
    isScrollingDown.value = currentScroll > previousScroll && currentScroll > scrollThreshold
    previousScroll = currentScroll
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return { isScrollingDown }
}
