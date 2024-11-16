<script lang="ts" setup>
import Input from '~/components/ui/input/Input.vue'
import { appName } from '~/constants'
import { CatalogSearchHeader } from '~/services/catalog/search-header'
import type { CatalogSearchHeaderResultType } from '~/types/catalog/search-header'
import Brands from './Brands.vue'
import Categories from './Categories.vue'
import Overlay from './Overlay.vue'
import PopularSearchs from './PopularSearchs.vue'
import RecentSearchs from './RecentSearchs.vue'

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
const searchPerformed = ref(false) // New flag to track if search was performed

watchDebounced(search, async () => {
  if (search.value.length < 3) {
    searchPerformed.value = false // Reset the flag when input length is insufficient
    return
  }

  searchLoading.value = true
  const result = await CatalogSearchHeader(search.value)
  searchPerformed.value = true // Mark the search as performed

  if (result.success)
    searchResult.value = result.data

  searchLoading.value = false
}, { debounce: 500, maxWait: 3000 })

const authStore = useAuthenticateStore()
async function submit() {
  if (!search.value)
    return
  changeFocusState(false)

  if (searchInput.value) {
    (searchInput.value as any).blur()
  }
  authStore.SetUserSearchHistory(search.value)
  await router.push({
    path: '/search',
    query: { q: search.value },
  })
  search.value = ''
  searchResult.value = null
}
// Watch for Route if changes Toggle off every thing
watch(() => route.fullPath, () => {
  search.value = ''
  searchResult.value = null
  changeFocusState(false)
})
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
          :class="cn({ 'bg-sc-background border-primary': isFocused },
          )"

          autocomplete="off"
          @focus="changeFocusState(true)"
        >
          <template #icon>
            <Icon v-show="!searchLoading" name="i-lucide-search" class="size-5" />
            <Icon v-show="searchLoading" name="i-lucide-loader-2" class="size-5 animate-spin text-primary" />
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
                <div v-if="search.length < 3" class="text-sm text-muted-foreground text-center">
                  حداقل 3 کاراکتر بنویسید
                </div>

                <!-- Category & Brand -->
                <div class="py-3">
                  <Categories :items="searchResult?.categories || []" />
                  <Brands :items="searchResult?.brands || []" />
                </div>
                <!-- History (Popular & User Recent Searchs) -->
                <div class="py-3 space-y-6">
                  <!-- User recenet searchs -->
                  <RecentSearchs />
                  <PopularSearchs />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>
    </div>
    <!-- Overlay -->
    <Overlay :is-focused />
  </div>
</template>
