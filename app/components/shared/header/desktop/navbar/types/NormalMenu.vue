<script lang="ts" setup>
import NavigationMenu from '~/components/ui/navigation-menu/NavigationMenu.vue'
import NavigationMenuContent from '~/components/ui/navigation-menu/NavigationMenuContent.vue'
import NavigationMenuItem from '~/components/ui/navigation-menu/NavigationMenuItem.vue'
import NavigationMenuList from '~/components/ui/navigation-menu/NavigationMenuList.vue'
import NavigationMenuTrigger from '~/components/ui/navigation-menu/NavigationMenuTrigger.vue'
import type { LinksHeaderDetailType } from '~/types/links'

defineProps<{
  items: LinksHeaderDetailType[]
}>()
</script>

<template>
  <NavigationMenu  v-if="items.length > 0" :delay-duration="0" dir="rtl">
    <NavigationMenuList >
      <NavigationMenuItem v-for="item in items" :key="item.id">
        <NavigationMenuTrigger hide-icon class="px-2 pb-3 ">
          <div
            class="flex cursor-pointer items-center gap-2 rounded-lg  text-sm text-sc-foreground/85"
          >
            <span
              v-if="item.icon"
              class="size-6 text-muted-foreground"
              v-html="item.icon"
            />
            {{ item.title }}
          </div>
        </NavigationMenuTrigger>
        <NavigationMenuContent >
          <ul class="grid w-[700px] grid-cols-5 gap-4 p-4 ">
            <li
              v-for="child in (item.childrens || []).sort((a, b) => {
                return a.order - b.order;
              })"
              :key="child.id"
            >
              <NuxtLink
                :to="child.link"
                class="flex items-center gap-2 py-2 hover:text-primary transition-all duration-200"
              >
                {{ child.title }}

                <Icon name="i-lucide-chevron-left" :size="16" />
              </NuxtLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>

<style></style>
