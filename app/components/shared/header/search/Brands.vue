<script lang="ts" setup>
import { Separator } from '@/components/ui/separator'
import type { CatalogSearchHeaderBrandType } from '~/types/catalog/search-header'

defineProps<{
  items: CatalogSearchHeaderBrandType[]
}>()
</script>

<template>
  <div v-show="(items.length || 0) !== 0" class="py-3 space-y-2">
    <Separator label="برند ها" label-class="bg-sc-background text-sm xl:text-base text-muted-foreground" />
    <ul>
      <li v-for="brand in items" :key="brand.url">
        <NuxtLink :to="brand.url" class="flex items-center gap-1 py-2 text-sc-foreground hover:text-primary duration-200">
          برند {{ brand.title_ir }}
          <Icon name="lucide-arrow-up-right" class="size-5" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/" class="flex items-center gap-1 py-2 text-sc-foreground hover:text-primary duration-200">
          برند سامسونگ

          <Icon name="lucide-arrow-up-right" class="size-5" />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style>

</style>
