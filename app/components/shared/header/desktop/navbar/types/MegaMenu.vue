<script lang="ts" setup>
import type { LinksHeaderDetailType } from '~/types/links'
import MegaMenuChilds from './MegaMenuChilds.vue'

defineProps<{
  items: LinksHeaderDetailType[]
}>()
</script>

<template>
  <template v-for="item in items" :key="item.id">
    <UiHoverCard :open-delay="0" :close-delay="0">
      <UiHoverCardTrigger>
        <div
          class="flex cursor-pointer items-center gap-2 rounded-lg px-2 pb-3 text-sm t first:pr-0 "
        >
          <span
            v-if="item.icon"
            class="size-5 "
            v-html="item.icon"
          />
          {{ item.title }}
        </div>
      </UiHoverCardTrigger>
      <UiHoverCardContent
        class="h-[400px] w-[900px] overflow-hidden p-0"
        align="start"
      >
        <MegaMenuChilds
          :parent-childs="item.childrens"
          :parent-id="item.id"
        />
      </UiHoverCardContent>
    </UiHoverCard>
  </template>
</template>

<style></style>
