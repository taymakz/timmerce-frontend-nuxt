<script lang="ts" setup>
defineProps<{
  isFocused: boolean
}>()
</script>

<template>
  <ClientOnly>
    <Transition name="fade">
      <div v-show="isFocused" class="z-10 relative">
        <div
          class="fixed inset-0 bg-black/60"
        />
      </div>
    </Transition>
  </ClientOnly>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
