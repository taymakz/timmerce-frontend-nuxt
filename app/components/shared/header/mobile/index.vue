<script lang="ts" setup>
import Logo from './Logo.vue'
import Search from './Search.vue'

const isSearchFocused = ref(false)
const { isScrollingDown } = useOnScrollClass(60);
</script>

<template>
  <div class="flex flex-col">
    <!-- Header Top -->
    <div class="bg-sc-background relative z-30 duration-300 transition-transform" :class="{ '-translate-y-[72px]': isSearchFocused }">
      <div class="container flex items-center justify-between gap-8 py-3 transition-transform">
        <Logo />
        <div class="flex gap-2">
          <CommonToggleTheme />
        </div>
      </div>
    </div>
    <!-- Header Bottom - Search -->
    <div
      :class="cn('relative z-20 bg-sc-background duration-300 py-3 border-b shadow-sm transition-transform',
                 { '-translate-y-full': isSearchFocused || isScrollingDown },
      )"
     
    >
      <Search v-model="isSearchFocused" />
    </div>
  </div>
</template>

<style>

</style>
