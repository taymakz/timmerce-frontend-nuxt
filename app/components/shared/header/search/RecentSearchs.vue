<script lang="ts" setup>
const authStore = useAuthenticateStore()

</script>

<template>
  <div v-if="(authStore.getUserDetail?.search_histories.length || 0) !== 0">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-4">
        <Icon name="lucide-clock" class="size-6 text-muted-foreground" />
        جستجو‌های اخیر شما
      </div>
      <!-- Clear All Recents -->
      <button type="button" class="text-muted-foreground hover:text-warning duration-200 size-6" @click="authStore.ClearUserSearchHistory()">
        <Icon name="ph-trash-simple" class="size-full" />
      </button>
    </div>
    <!-- searchs -->
    <div v-auto-animate class="flex flex-wrap gap-2">
      <NuxtLink v-for="search in authStore.getUserDetail?.search_histories" :key="search.search" :to="`/search?q=${search.search}`" class="rounded-lg border py-1 px-3 text-sm text-muted-foreground hover:border-foreground duration-200 hover:text-foreground">
        {{ search.search }}
      </NuxtLink>
    </div>
  </div>
</template>

<style>

</style>
