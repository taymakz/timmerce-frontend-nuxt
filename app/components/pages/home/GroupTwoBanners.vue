<script lang="ts" setup>
import Skeleton from '~/components/ui/skeleton/Skeleton.vue'
import type { BannerDetailType } from '~/types/banner'

const { banners } = defineProps<{
  banners: BannerDetailType[]
}>()
const isMounted = useMounted()
</script>

<template>
  <section class="container py-10">
    <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
      <template v-if="!isMounted">
        <Skeleton v-for="_ in 2" :key="_" class="w-full h-[245px] animate-pulse shadow rounded-xl" />
      </template>

      <NuxtLink  v-for="(banner, index) in banners" :key="index" :to="banner.url" :class="{ 'sr-only': !isMounted }">
        <NuxtImg placeholder loading="lazy" :quality="80" :src="getMediaUrl(banner.normal_banner)" :alt="banner.title" class="rounded-xl size-full" />
      </NuxtLink>
    </div>
  </section>
</template>

<style>

</style>
