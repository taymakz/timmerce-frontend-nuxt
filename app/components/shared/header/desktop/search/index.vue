<script lang="ts" setup>
import Input from '~/components/ui/input/Input.vue'
import { appName } from '~/constants'
import Wrapper from '../../search/wrapper.vue'
import Overlay from './Overlay.vue'

// Utility for checking if component is mounted
const isMounted = useMounted()
// Locks scrolling when necessary
const isLocked = useWebScrollLock()

// Refs for DOM elements and states
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

const {
  search,
  searchLoading,
  searchResult,
  searchPerformed,
  searchInput,
  submit,
} = useSearchHandler(changeFocusState)
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
        <AnimatePresence>
          <Motion
            v-if="isFocused"
            layout
            :variants="{
              open: {
                height: `${resultWrapperHeight}px`,
                opacity:1
              },
              closed: {
                height: 0,
                opacity:0
              },
            }"
            initial="closed"
            exit="closed"
            animate="open" class="z-20 absolute left-0 top-16 w-full bg-sc-background rounded-lg border overflow-hidden"
          >
            <div ref="resultWrapper" class="max-h-[80dvh] overflow-y-auto">
              <Motion
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1,
                            transition: {
                              delay: 0.2,
                            } }"
                class="p-4 "
              >
                <Wrapper
                  :search
                  :search-performed
                  :search-loading
                  :search-result
                />
              </Motion>
            </div>
          </Motion>
        </AnimatePresence>
      </ClientOnly>
    </div>
    <!-- Overlay -->
    <Overlay :is-focused />
  </div>
</template>
