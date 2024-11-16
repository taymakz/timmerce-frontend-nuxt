<script lang="ts" setup>
import { CatalogSearchHeaderPopulars } from '~/services/catalog/search-header'

const { data } = await useAsyncData(
  'header-popular-searchs',
  () => CatalogSearchHeaderPopulars(),
  {
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    },
  },
)
</script>

<template>
  <div v-if="(data?.data.length || 0) !== 0">
    <div class="flex items-center gap-4 mb-4">
      <Icon name="ph-fire" class="size-6 text-muted-foreground" />
      جستجوهای پرتکرار
    </div>

    <!-- searchs -->
    <div class="flex flex-wrap gap-2">
      <NuxtLink v-for="(search, index) in data?.data" :key="index" :to="`/search?q=${search}`" class="rounded-lg border py-1 px-3 text-sm text-muted-foreground hover:border-foreground duration-200 hover:text-foreground">
        {{ search }}
      </NuxtLink>
    </div>
  </div>
</template>

<style>

</style>
