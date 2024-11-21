<script lang="ts" setup>
import type { CatalogSearchHeaderResultType } from '~/types/catalog/search-header'
import Brands from './Brands.vue'
import Categories from './Categories.vue'
import PopularSearchs from './PopularSearchs.vue'
import Products from './Products.vue'
import RecentSearchs from './RecentSearchs.vue'

defineProps<{
  search: string
  searchPerformed: boolean
  searchLoading: boolean
  searchResult: CatalogSearchHeaderResultType | null
}>()
</script>

<template>
  <div>
    <!-- No Result Message -->
    <div
      v-if="
        searchPerformed
          && !searchLoading
          && search.length > 3
          && (searchResult?.brands.length === 0 && searchResult?.categories.length === 0 && searchResult?.products.length === 0)
      "
      class="text-muted-foreground text-center"
    >
      نتیجه ایی یافت نشد
    </div>
    <!-- Minimum 3 Char Message -->
    <div v-if="search.length < 3" class="text-sm text-muted-foreground text-center   flex justify-center ">
      <p class="pb-3 border-b border-dashed w-fit mb-3">
        حداقل 3 کاراکتر بنویسید
      </p>
    </div>
    <div>
      <Products :items="searchResult?.products || []" />
      <Categories :items="searchResult?.categories || []" />
      <Brands :items="searchResult?.brands || []" />
    </div>
    <!-- History (Popular & User Recent Searchs) -->
    <div class="space-y-6">
      <!-- User recenet searchs -->
      <RecentSearchs />
      <PopularSearchs />
    </div>
  </div>
</template>

<style>

</style>
