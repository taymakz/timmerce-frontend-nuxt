export default defineNuxtPlugin(() => {
  // Select elements with the data attribute
  const elementsWithScrollClass = document.querySelectorAll<HTMLElement>(
    '[data-onscrollclass]',
  )

  let prevScrollPos = document.documentElement.scrollTop

  const handleScroll = () => {
    const currentScrollPos = document.documentElement.scrollTop

    elementsWithScrollClass.forEach((element) => {
      // Split the classes defined in data-onscrollclass into an array
      const onScrollClasses = element.dataset.onscrollclass?.split(' ') || []

      if (currentScrollPos > prevScrollPos && currentScrollPos > 60) {
        // Scrolling Down - Add each class
        onScrollClasses.forEach((scrollClass) => {
          if (scrollClass) {
            element.classList.add(scrollClass.trim())
          }
        })
      }
      else {
        // Scrolling Up - Remove each class
        onScrollClasses.forEach((scrollClass) => {
          if (scrollClass) {
            element.classList.remove(scrollClass.trim())
          }
        })
      }
    })

    prevScrollPos = currentScrollPos
  }

  // Listen to scroll events
  window.addEventListener('scroll', handleScroll)
})
