<script lang="ts" setup>
import { FreeMode } from 'swiper/modules'
import type { CatalogSearchHeaderProductType } from '~/types/catalog/search-header'

defineProps<{
  items: CatalogSearchHeaderProductType[]
}>()

const containerRef = ref(null)
useSwiper(containerRef, {
  freeMode: true,
  slidesPerView: 3,
  breakpoints: {
    1024: {
      slidesPerView: 2.8,
      spaceBetween: 10,
    },
    1380: {
      slidesPerView: 3.8,
      spaceBetween: 10,
    },
  },
  modules: [FreeMode],

})
</script>

<template>
  <ClientOnly>
    <SwiperContainer
      ref="containerRef" :init="false"

      dir="rtl"
      class="rounded-lg"
    >
      <SwiperSlide v-for="product in items" :key="product.url">
        <NuxtLink :to="product.url" class="flex items-center gap-x-2 rounded-xl border p-2 hover:border-foreground">
          <NuxtImg :src="getMediaUrl(product.image)" :quality="50" :alt="product.title_ir" class="w-20 h-20 object-cover rounded-lg" />
          <p class="line-clamp-2 ">
            {{ product.title_ir }}
          </p>
        </NuxtLink>
      </SwiperSlide>
    </SwiperContainer>
  </ClientOnly>
</template>
