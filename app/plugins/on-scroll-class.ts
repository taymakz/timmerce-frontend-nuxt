export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('onscrollclass', {
    mounted(el, binding) {
    // Retrieve dynamic argument (if any) from binding.arg, default to 60 unless explicitly 0
      const threshold = binding.arg !== undefined ? Number(binding.arg) : 60
      // Retrieve classes to toggle from the directive value
      const classesToToggle = binding.value || []
      if (!Array.isArray(classesToToggle)) {
        console.warn('v-onscrollclass: Expected an array of class names.')
        return
      }

      let previousScroll = window.scrollY // Track scroll direction
      let isScrollLocked = false // Variable to track scroll lock state

      const handleScroll = () => {
        // Check if scroll lock is active and update previousScroll accordingly
        if (document.documentElement.classList.contains('scroll-lock')) {
          if (!isScrollLocked) {
            // Update scroll state when lock is applied
            previousScroll = window.scrollY
            isScrollLocked = true
          }
          return // Do nothing if scroll is locked
        }
        else {
          if (isScrollLocked) {
            // Reset isScrollLocked state when lock is removed
            isScrollLocked = false
          }
        }

        const currentScroll = window.scrollY
        if (currentScroll > previousScroll && currentScroll > threshold) {
          if (previousScroll !== 0)
          // Scrolling down - Add classes
          classesToToggle.forEach(className => el.classList.add(className))
        }
        else {
          if (previousScroll !== 0)
          // Scrolling up - Remove classes
          classesToToggle.forEach(className => el.classList.remove(className))
        }

        previousScroll = currentScroll
      }

      // Attach the handler to the window scroll event
      el.__scrollHandler__ = handleScroll // Store reference for cleanup
      window.addEventListener('scroll', handleScroll)
    },
    unmounted(el) {
      // Remove the scroll event listener during cleanup
      if (el.__scrollHandler__) {
        window.removeEventListener('scroll', el.__scrollHandler__)
        delete el.__scrollHandler__
      }
    },
    getSSRProps() {
      return {}
    },
  })
})
