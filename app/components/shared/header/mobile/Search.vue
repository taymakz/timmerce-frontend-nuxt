<script lang="ts" setup>
import Input from '~/components/ui/input/Input.vue'
import { appDesktopStartMinWidth, appName } from '~/constants'
import Wrapper from '../search/wrapper.vue'

const isSearchFocused = defineModel<boolean>()

// Utility for checking if component is mounted
const isMounted = useMounted()
// Locks scrolling when necessary
const isLocked = useWebScrollLock()
function changeFocusState(state: boolean) {
  isSearchFocused.value = state
  isLocked.value = state
}

const {
  search,
  searchLoading,
  searchResult,
  searchPerformed,
  searchInput,
  submit,
} = useSearchHandler(changeFocusState)
const isDesktop = useMediaQuery(appDesktopStartMinWidth)
</script>

<template>
  <div class="container">
    <!-- Input -->
    <div class="relative flex items-center">
      <Icon
        name="lucide-arrow-right"
        :class="cn('w-0 h-0 me-0 transition-all duration-300  min-w-fit cursor-pointer',
                   { 'size-6 me-4': isSearchFocused })" @click="changeFocusState(false)"
      />
      <form class="w-full" @submit.prevent="submit()">
        <Input
          ref="searchInput"
          v-model="search"
          :disabled="!isMounted"
          :label="`جستجو در ${appName}`"
          with-icon
          icon-placement="right"
          :class="cn({ 'bg-sc-background border-primary ': isSearchFocused },
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
    </div>
    <!-- Popover -->
    <Teleport to="body">
      <ClientOnly>
        <Motion 
        :initial="{ opacity: 0 }"
         :animate="{ opacity: 1}"
        
        v-if="isSearchFocused && !isDesktop"  class="z-40 [--distance:65px] fixed lg:hidden inset-0 h-[calc(100dvh-var(--distance))] bg-sc-background mt-[var(--distance)] border-t  ">
          <div class=" overflow-y-auto h-full py-4">
            <Motion 
            :initial="{ opacity: 0 }"
                :animate="{ opacity: 1,
                            transition: {
                              delay: 0.2,
                            } }"
            class="container">
              <Wrapper
             
                :search
                :search-performed
                :search-loading
                :search-result
              />
            </Motion>
          </div>
        </Motion>
      </ClientOnly>
    </Teleport>
  </div>
</template>

<style>

</style>
