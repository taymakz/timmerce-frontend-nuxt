<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    width?: number
    height?: number
    class?: HTMLAttributes['class']
  }>(),
  {
    width: 200,
    height: 32,
  },
)
</script>

<template>
  <!-- <NuxtImg src="/images/logo.svg" :width :height :class="cn(classes)" /> -->
  <div :class="cn('text-3xl text-primary', props.class)">
    Timmerce
  </div>
</template>
