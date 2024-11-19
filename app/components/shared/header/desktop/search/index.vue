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
import Products from './Products.vue'

const router = useRouter()
const route = useRoute()

// Utility for checking if component is mounted
const isMounted = useMounted()
// Locks scrolling when necessary
const isLocked = useWebScrollLock()

// Refs for DOM elements and states
const searchInput = ref<HTMLInputElement | null>(null)
const searchWrapper = ref<HTMLDivElement | null>(null)
const resultWrapper = ref<HTMLDivElement | null>(null)
const { height: resultWrapperHeight } = useElementSize(resultWrapper)

// Focus state management
const isFocused = ref<boolean>(false)
function changeFocusState(state: boolean) {
  isFocused.value = state
  isLocked.value = state
}

// Close the search wrapper when clicking outside
onClickOutside(searchWrapper, () => changeFocusState(false))

// Search-related states
const { search, searchLoading, searchResult, searchPerformed } = useHeaderSearch();

// Store reference for authentication
const authStore = useAuthenticateStore()

// Submit function for performing a search
async function submit() {
  if (!search.value)
    return

  // Close the search input and blur the field
  changeFocusState(false)
  searchInput.value?.blur()

  // Save search history and navigate to the search results page
  authStore.SetUserSearchHistory(search.value)
  await router.push({ path: '/search', query: { q: search.value } })

  // Reset search input and results
  search.value = ''
  searchResult.value = null
}

// Watch route changes to reset search state
watch(
  () => route.fullPath,
  () => {
    search.value = ''
    searchResult.value = null
    changeFocusState(false)
  },
)
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

  
                <div class="py-3">
                  <Products :items="searchResult?.products || []" />
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
