<script setup lang="ts">
import SharedFooter from '@/components/shared/footer/index.vue'
import SharedHeader from '@/components/shared/header/index.vue'
</script>

<template>
  <div>
    <div class="flex min-h-screen flex-col">
      <SharedHeader />
      <main class="flex-grow">
        <slot />
      </main>
      <SharedFooter />
    </div>
  </div>
</template>
