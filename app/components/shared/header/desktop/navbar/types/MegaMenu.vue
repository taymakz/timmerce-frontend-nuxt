<script lang="ts" setup>
import HoverCard from '~/components/ui/hover-card/HoverCard.vue'
import HoverCardContent from '~/components/ui/hover-card/HoverCardContent.vue'
import HoverCardTrigger from '~/components/ui/hover-card/HoverCardTrigger.vue'
import type { LinksHeaderDetailType } from '~/types/links'
import MegaMenuChilds from './MegaMenuChilds.vue'

defineProps<{
  items: LinksHeaderDetailType[]
}>()
const state = ref(false)
</script>

<template>
  <div v-if="items">
    <template v-for="item in items" :key="item.id">
      <HoverCard v-model:open="state" :open-delay="0" :close-delay="0" >
        <HoverCardTrigger>
          <div
            class="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 pb-3 text-sm t first:pr-0 "
          >
            <span
              v-if="item.icon"
              class="size-5 "
              v-html="item.icon"
            />
            {{ item.title }}
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          class="h-[400px] w-[900px] overflow-hidden p-0 mt-1"
          align="start"
        >
          <MegaMenuChilds
            :parent-childs="item.childrens"
            :parent-id="item.id"
          />
        </HoverCardContent>
      </HoverCard>
    </template>
    <Teleport to="body">
      <div v-if="state" class="fixed inset-0 z-20 bg-black/60 backdrop-blur" />
    </Teleport>
  </div>
</template>

<style></style>
