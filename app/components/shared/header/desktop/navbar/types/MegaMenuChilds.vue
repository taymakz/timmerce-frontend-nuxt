<script lang="ts" setup>
import type { LinksHeaderDetailType } from '~/types/links'

defineProps<{
  parentChilds: LinksHeaderDetailType[]
  parentId: number
}>()

const activeMenu = ref(0)
</script>

<template>
  <div class="flex">
    <!-- right Menu -->
    <div class="overflow-hidden  ">
      <div
        dir="ltr"
        class="max-h-[400px] min-h-[400px] min-w-[200px] overflow-y-auto bg-background"
      >
        <ul dir="rtl" class="flex flex-col">
          <li
            v-for="(parentChild, index) in parentChilds"
            :key="parentChild.id"
            :class="{
              'bg-popover text-primary': activeMenu === index,
            }"
            @mouseenter="activeMenu = index"
          >
            <NuxtLink
              :to="parentChild.link"
              class="flex items-center gap-2 px-4 py-4 text-sm"
            >
              <span
                v-if="parentChild.icon"
                class="size-5"
                v-html="parentChild.icon"
              />
              {{ parentChild.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <!-- left Menu -->
    <div dir="ltr" class="max-h-[400px] min-h-[400px] overflow-y-auto p-6">
      <div dir="rtl">
        <!-- man menu -->
        <div
          v-for="(parentChild, index) in parentChilds || []"
          v-show="activeMenu === index"
          :key="parentChild.id"
        >
          <div class="mb-6">
            <NuxtLink :to="parentChild.link"
              class="flex items-center gap-x-1 text-sm text-primary duration-200 hover:text-primary/80"
            >
              <span>مشاهده همه</span>

              <Icon name="i-lucide-chevron-left" :size="20" />
            </NuxtLink>
          </div>

          <div class="flex flex-wrap gap-x-14 gap-y-8">
            <ul
              v-for="secondChild in parentChild.childrens || []"
              :key="secondChild.id"
              class="flex flex-col space-y-4"
            >
              <li>
                <NuxtLink :to="secondChild.link"
                  class="flex items-center gap-x-2 duration-200 hover:text-primary"
                >
                  <span class="h-5 w-0.5 rounded-full bg-primary" />
                  <span>
                    {{ secondChild.title }}
                  </span>

                  <Icon name="i-lucide-chevron-left" :size="16" />
                </NuxtLink>
              </li>
              <li
                v-for="thirdChild in secondChild.childrens"
                :key="thirdChild.id"
              >
                <NuxtLink :to="thirdChild.link"
                  class="text-sm duration-200 hover:text-primary"
                  :class="{ 'text-text/40': !thirdChild.public }"
                >
                  {{ thirdChild.title }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
