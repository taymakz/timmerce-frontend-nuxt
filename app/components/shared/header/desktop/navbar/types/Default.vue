<script lang="ts" setup>
import type { LinksHeaderDetailType } from '~/types/links'

defineProps<{
  items: LinksHeaderDetailType[]
}>()

</script>

<template>
  <template v-for="item in items" :key="item.id">
    <div
      class="flex cursor-pointer items-center gap-2 rounded-lg px-2 pb-3 text-sm text-sc-foreground/85"
    >
      <span v-if="item.icon" class="size-6 text-muted-foreground" v-html="item.icon" />
      {{ item.title }}
    </div>
  </template>
</template>

<style></style>
