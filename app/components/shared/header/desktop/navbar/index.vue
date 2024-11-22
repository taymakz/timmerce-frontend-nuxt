<script lang="ts" setup>
import { LinksHeaderGet } from '~/services/links'
import { LinksHeaderTypeEnum } from '~/types/links'
import Seo from './Seo.vue'
import DefaultLink from './types/Default.vue'
import DropdownLink from './types/Dropdown.vue'
import MegaMenuLink from './types/MegaMenu.vue'

const { data } = await useAsyncData(
  'links-header',
  () => LinksHeaderGet(),
  {
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    },
  },
)

function getSortedParentLinks(links: any[]) {
  return links
    .filter(link => link.tn_parent === null)
    .sort((a, b) => a.order - b.order)
}

function getLinksByType(type: LinksHeaderTypeEnum) {
  return computed(() => {
    if (data.value?.data) {
      return getSortedParentLinks(data.value?.data).filter(
        link => link.link_type === type,
      )
    }
    return []
  })
}

// Create computed properties for each link type
const defaultLinks = getLinksByType(LinksHeaderTypeEnum.DEFAULT)
const dropdownLinks = getLinksByType(LinksHeaderTypeEnum.DROPDOWN)
const megaMenuLinks = getLinksByType(LinksHeaderTypeEnum.MEGA_MENU)

// Indicator Section
const navWrapper = ref<HTMLElement | null>(null)
const indicator = ref<HTMLElement | null>(null)
onMounted(async () => {
  await nextTick() // Wait for DOM updates

  if (navWrapper.value && indicator.value) {
    // Select all direct (first-layer) children of navWrapper
    const firstLayerChildren = navWrapper.value.querySelectorAll(':scope > *')

    // Add mouseenter event listener to each first-layer child
    Array.from(firstLayerChildren).forEach((child) => {
      child.addEventListener('mouseenter', (e: Event) => {
        if (!indicator.value)
          return

        const target = e.currentTarget as HTMLElement
        const offsetLeft = target?.offsetLeft
        const offsetWidth = target?.offsetWidth

        indicator.value.style.transform = `translate3d(${offsetLeft}px, 0, 0)`
        indicator.value.style.width = `${offsetWidth}px`

        const color = target.dataset.color
        if (color) {
          indicator.value.style.backgroundColor = color
        }
      })

      child.addEventListener('mouseleave', () => {
        if (!indicator.value)
          return
        indicator.value.style.width = '0'
        indicator.value.style.backgroundColor = '' // Reset background color
      })
    })

    // Set initial position for the indicator
    const firstNavItem = firstLayerChildren[1] as HTMLElement
    if (firstNavItem && indicator.value) {
      const offsetLeft = firstNavItem.offsetLeft
      indicator.value.style.transform = `translate3d(${offsetLeft}px, 0, 0)`
    }
  }
})
</script>

<template>
  <nav ref="navWrapper" class="container flex items-center pb-1">
    <Seo :items="data?.data || []" />
    <ClientOnly>
      <div ref="indicator" class="pointer-events-none absolute bottom-1 end-0 z-0 h-[0.15625rem] w-0 touch-none rounded-full bg-primary transition-all duration-500 ease-[ease]" />
    </ClientOnly>

    <MegaMenuLink :items="megaMenuLinks" />
    <DefaultLink :items="defaultLinks" />
    <DropdownLink :items="dropdownLinks" />
  </nav>
</template>
