<script lang="ts" setup>
import { Separator } from '@/components/ui/separator'

import Input from '~/components/ui/input/Input.vue'
import { appName } from '~/constants'
import { CatalogSearchHeader } from '~/services/catalog/search-header'
import type { CatalogSearchHeaderResultType } from '~/types/catalog/search-header'

const router = useRouter()
const route = useRoute()
const isMounted = useMounted()
const isLocked = useWebScrollLock()

const searchInput = ref(null)
const searchWrapper = ref<HTMLDivElement | null>(null)
const resultWrapper = ref<HTMLDivElement | null>(null)
const { height: resultWrapperHeight } = useElementSize(resultWrapper)

const isFocused = ref<boolean>(false)
function changeFocusState(state: boolean) {
  isFocused.value = state
  isLocked.value = state
}
onClickOutside(searchWrapper, () => changeFocusState(false))

const search = ref<string>('')
const searchLoading = ref(false)
const searchResult = ref<CatalogSearchHeaderResultType | null>(null)

watchDebounced(search, async () => {
  if (search.value.length < 3)
    return
  searchLoading.value = true
  const result = await CatalogSearchHeader(search.value)
  if (result.success)
    searchResult.value = result.data

  searchLoading.value = false
}, { debounce: 1000, maxWait: 4000 })

async function submit() {
  if (!search.value)
    return
  changeFocusState(false)
  
  if (searchInput.value) {
    (searchInput.value as any).blur()
  }
  await router.push({
    path: '/search',
    query: { q: search.value },
  })
  search.value = ''
  searchResult.value = null
}
</script>

<template>
  <div class="flex-grow  max-w-xl">
    <!-- Search Wrapper -->
    <div ref="searchWrapper" class="relative z-20">
      <!-- Input -->
      <form @submit.prevent="submit()">
        <Input
          ref="searchInput"
          v-model="search"
          :disabled="!isMounted"
          :label="`جستجو در ${appName}`"
          with-icon
          icon-placement="right"
          :class="cn('',
                     { 'bg-sc-background border-primary': isFocused },
          )"

          :auto-complete="false"
          @focus="changeFocusState(true)"
        >
          <template #icon>
            <Icon name="lucide-search" class="size-5" />
          </template>
        </Input>
      </form>
      <!-- Search Popover -->
      <ClientOnly>
        <div v-if="isFocused" class="z-20 absolute left-0 top-16 w-full bg-sc-background rounded-lg border overflow-hidden">
          <div :style="{ height: `${resultWrapperHeight}px` }" class="duration-200">
            <div ref="resultWrapper" class="max-h-[80dvh] overflow-y-auto">
              <div
                v-motion
                :initial="{ opacity: 0 }"
                :enter="{ opacity: 1 }"
                :delay="200"
                class="p-4"
              >
                <!-- Minimum 3 Char Message -->
                <div v-if="search.length < 3" class="text-sm text-muted-foreground text-center">
                  حداقل 3 کاراکتر بنویسید
                </div>
                <!-- Category & Brand -->
                <div class="py-3">
                  <!-- Categories -->
                  <div class="py-3 space-y-2">
                    <Separator label="دسته بندی ها" label-class="bg-sc-background text-sm text-muted-foreground" />

                    <ul>
                      <li>
                        <NuxtLink to="/" class="flex items-center gap-1 py-2 text-sc-foreground hover:text-primary duration-200">
                          دسته موبایل
                          <Icon name="lucide-arrow-up-right" class="size-5" />
                        </NuxtLink>
                      </li>
                      <li>
                        <NuxtLink to="/" class="flex items-center gap-1 py-2 text-sc-foreground hover:text-primary duration-200">
                          دسته سشوار
                          <Icon name="lucide-arrow-up-right" class="size-5" />
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                  <!-- Brands -->
                  <div class="py-3 space-y-2">
                    <Separator label="برند ها" label-class="bg-sc-background text-sm text-muted-foreground" />

                    <ul>
                      <li>
                        <NuxtLink to="/" class="flex items-center gap-1 py-2 text-sc-foreground hover:text-primary duration-200">
                          برند اپل
                          <Icon name="lucide-arrow-up-right" class="size-5" />
                        </NuxtLink>
                      </li>
                      <li>
                        <NuxtLink to="/" class="flex items-center gap-1 py-2 text-sc-foreground hover:text-primary duration-200">
                          برند سامسونگ

                          <Icon name="lucide-arrow-up-right" class="size-5" />
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- History (Popular & User Recent Searchs) -->
                <div class="py-3 space-y-6">
                  <!-- User recenet searchs -->
                  <div>
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center gap-4">
                        <Icon name="lucide-clock" class="size-6 text-muted-foreground" />
                        جستجو‌های اخیر شما
                      </div>
                      <!-- Clear All Recents -->
                      <button type="button" class="text-muted-foreground hover:text-warning duration-200 size-6">
                        <Icon name="ph-trash-simple" class="size-full" />
                      </button>
                    </div>
                    <!-- searchs -->
                    <div v-auto-animate class="flex flex-wrap gap-2">
                      <NuxtLink v-for="i in 6" :key="i" to="/" class="rounded-lg border py-1 px-3 text-sm">
                        نایک
                      </NuxtLink>
                    </div>
                  </div>
                  <!-- Popular searchs -->
                  <div>
                    <div class="flex items-center gap-4 mb-4">
                      <Icon name="ph-fire" class="size-6 text-muted-foreground" />
                      جستجوهای پرتکرار
                    </div>

                    <!-- searchs -->
                    <div class="flex flex-wrap gap-2">
                      <NuxtLink v-for="i in 6" :key="i" to="/" type="button" class="rounded-lg border py-1 px-3 text-sm">
                        نایک
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>
    </div>
    <!-- Overlay -->
    <ClientOnly>
      <Transition name="fade">
        <div v-show="isFocused" class="z-10 relative">
          <div
            class="fixed inset-0 bg-black/60"
          />
        </div>
      </Transition>
    </ClientOnly>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
