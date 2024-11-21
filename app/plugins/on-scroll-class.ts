export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('onscrollclass', {
    mounted(el, binding) {
      // Retrieve classes to toggle from the directive value
      const classesToToggle = binding.value || []
      if (!Array.isArray(classesToToggle)) {
        console.warn('v-onscrollclass: Expected an array of class names.')
        return
      }

      // Track scroll direction
      let previousScroll = window.scrollY

      const handleScroll = () => {
        const currentScroll = window.scrollY

        if (currentScroll > previousScroll && currentScroll > 60) {
          // Scrolling down - Add classes
          classesToToggle.forEach(className => el.classList.add(className))
        }
        else {
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
