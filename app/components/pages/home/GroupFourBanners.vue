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
    <div class="grid grid-cols-2 gap-5 lg:grid-cols-4">
      <template v-if="!isMounted">
        <Skeleton v-for="_ in 4" :key="_" class="w-full h-[222px] animate-pulse shadow rounded-xl" />
      </template>

      <NuxtLink v-for="(banner, index) in banners" :key="index" :to="banner.url" :class="{ 'sr-only': !isMounted }">
        <NuxtImg placeholder loading="lazy" :quality="80" :src="getMediaUrl(banner.normal_banner)" :alt="banner.title" class="rounded-xl size-full object-cover object-center" />
      </NuxtLink>
    </div>
  </section>
</template>

<style>

</style>
