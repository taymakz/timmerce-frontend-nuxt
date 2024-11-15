<script lang="ts" setup>
import type { LinksHeaderDetailType } from '~/types/links'

defineProps<{
  items: LinksHeaderDetailType[]
}>()
</script>

<template>
  <template v-for="item in items" :key="item.id">
    <UiHoverCard :open-delay="0" :close-delay="0">
      <UiHoverCardTrigger>
        <div
          class="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 pb-3 text-sm text-sc-foreground/85"
        >
          <span
            v-if="item.icon"
            class="size-6 text-muted-foreground"
            v-html="item.icon"
          />
          {{ item.title }}
        </div>
      </UiHoverCardTrigger>
      <UiHoverCardContent class="w-50 p-1 mt-1" align="start" >
        <ul>
          <li
            v-for="child in (item.childrens || []).sort((a, b) => {
              return a.order - b.order;
            })"
            :key="child.id"
          >
            <NuxtLink
            :to="child.link"
              class="block py-3 px-2 hover:bg-secondary duration-300 text-muted-foreground hover:text-popover-foreground rounded-lg"
            >
              {{ child.title }}
            </NuxtLink>
          </li>
        </ul>
      </UiHoverCardContent>
    </UiHoverCard>
  </template>
</template>

<style></style>
