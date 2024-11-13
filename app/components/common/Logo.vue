<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

const { class: classes, width = 200, height = 32 } = defineProps<{
  width?: number
  height?: number
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <NuxtImg src="/images/logo.svg" :width :height :class="cn(classes)" alt="لوگوی تیمرس | Timmerce Logo" />
</template>
