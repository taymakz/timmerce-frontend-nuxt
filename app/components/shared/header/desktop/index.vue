<script lang="ts" setup>
import Account from './Account.vue'
import Logo from './Logo.vue'
import Search from './Search.vue'
</script>

<template>
  <div class="flex flex-col">
    <!-- Header Top -->
    <div class="relative z-30 bg-sc-background">
      <div class="container relative z-30 bg-sc-background flex items-center justify-between gap-8 py-4">
        <div class="flex items-center gap-8 flex-grow">
          <Logo />
          <Search />
        </div>
        <div class="flex gap-4">
          <Account />
          <CommonToggleTheme />
        </div>
      </div>
    </div>
    <!-- Header Bottom - Navbar -->
    <div class="relative z-20 bg-sc-background duration-300 border-b shadow-sm" data-onscrollclass="-translate-y-full">
      <SharedHeaderDesktopNavbar/>
    </div>
  </div>
</template>

<style>

</style>
