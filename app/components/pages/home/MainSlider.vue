<script lang="ts" setup>
import Skeleton from '~/components/ui/skeleton/Skeleton.vue'
import type { BannerDetailType } from '~/types/banner'

const { banners } = defineProps<{
  banners: BannerDetailType[]
}>()
const isMounted = useMounted()

const containerRef = ref(null)
const swiper = useSwiper(containerRef, {
  loop: true,
})
</script>

<template>
  <div>
    <!-- Skeleton -->
    <Skeleton   v-if="!isMounted" class="aspect-[2/1] object-cover sm:block md:aspect-[3/1] lg:aspect-[4/1] xl:aspect-[5/1] max-h-[400px] w-full  animate-pulse shadow " />
    <!-- Original Content -->
    <div :class="{ 'sr-only': !isMounted }">
      <div class="relative group" >
        <swiper-container
          ref="containerRef"
          dir="rtl"
          :pagination="{
            clickable: true,
          }"
          class="main-slider"
        >
          <swiper-slide v-for="(banner, index) in banners" :key="index">
            <NuxtLink :to="banner.url" :external="banner.external_url" :target="banner.external_url ? '_blank' : '_self'">
              <NuxtImg placeholder loading="lazy" :alt="banner.title" :src="getMediaUrl(banner.normal_banner)" class="hidden sm:block aspect-[2/1] object-cover md:aspect-[4/1] lg:aspect-auto max-h-[400px] mx-auto w-full max-w-[1920px]" />
              <NuxtImg placeholder loading="lazy" :alt="banner.title" :src="getMediaUrl(banner.small_banner || banner.normal_banner)" class="aspect-[2/1] object-cover sm:hidden" />
            </NuxtLink>
          </swiper-slide>
        </swiper-container>
        <div class="lg:opacity-0 group-hover:opacity-100 duration-200 absolute bottom-10 right-6 flex gap-1.5 z-10 pointer-events-none">
          <button class="pointer-events-auto flex items-center justify-center size-9 bg-sc-background rounded-full border" @click="swiper.prev()">
            <span class="sr-only">
              Preview
            </span>
            <Icon name="i-lucide-chevron-right" class="size-5" />
          </button>
          <button class="pointer-events-auto flex items-center justify-center size-9 bg-sc-background rounded-full border" @click="swiper.next()">
            <span class="sr-only">
              Next
            </span>
            <Icon name="i-lucide-chevron-left" class="size-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style  lang="postcss">
swiper-container::part(bullet-active),
swiper-container::part(bullet) {
    @apply size-1.5 duration-300 bg-black
}

swiper-container::part(bullet-active) {
    @apply bg-white rounded-lg w-5
}
</style>
