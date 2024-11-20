<script lang="ts" setup>
import { FreeMode } from 'swiper/modules'
import type { CatalogSearchHeaderProductType } from '~/types/catalog/search-header'

defineProps<{
  items: CatalogSearchHeaderProductType[]
}>()

const containerRef = ref(null)
useSwiper(containerRef, {
  freeMode: true,
  slidesPerView: 2.1,
  spaceBetween: 10,
  modules: [FreeMode],

})
</script>

<template>
  <div class="mb-4">
    <swiper-container
      ref="containerRef" :init="false"

      dir="rtl"
      class="rounded-lg"
    >
      <swiper-slide v-for="product in items" :key="product.url">
        <NuxtLink :to="product.url" class="flex items-center gap-x-2 rounded-xl border p-2 hover:border-foreground duration-200">
          <NuxtImg :src="getMediaUrl(product.image)" :quality="50" :alt="product.title_ir" class="size-20 object-cover rounded-lg" />
          <p class="line-clamp-2 ">
            {{ product.title_ir }}
          </p>
        </NuxtLink>
      </swiper-slide>
    </swiper-container>
  </div>
</template>
