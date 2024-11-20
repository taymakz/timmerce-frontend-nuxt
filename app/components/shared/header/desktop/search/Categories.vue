<script lang="ts" setup>
import { Separator } from '@/components/ui/separator'
import type { CatalogSearchHeaderCategoryType } from '~/types/catalog/search-header'

defineProps<{
  items: CatalogSearchHeaderCategoryType[]
}>()
</script>

<template>
  <div v-show="(items.length || 0) !== 0" class="py-3 space-y-2">
    <Separator label="دسته بندی ها" label-class="bg-sc-background text-sm text-muted-foreground" />

    <ul>
      <li v-for="category in items" :key="category.url">
        <NuxtLink :to="category.url" class="flex items-center gap-1 py-2 text-sc-foreground hover:text-primary duration-200">
          دسته {{ category.title_ir }}
          <Icon name="lucide-arrow-up-right" class="size-5" />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style>

</style>
