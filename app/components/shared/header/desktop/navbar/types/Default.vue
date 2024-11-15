<script lang="ts" setup>
import type { LinksHeaderDetailType } from '~/types/links'

defineProps<{
  items: LinksHeaderDetailType[]
}>()

</script>

<template>
  <template v-for="item in items" :key="item.id">
    <NuxtLink :to="item.link"
      class="flex items-center gap-2 rounded-lg px-2.5 pb-3 text-sm text-sc-foreground/85"
    >
      <span v-if="item.icon" class="size-6 text-muted-foreground" v-html="item.icon" />
      {{ item.title }}
    </NuxtLink>
  </template>
</template>

<style></style>
