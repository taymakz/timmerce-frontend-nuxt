<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/cn'
import { SelectLabel, type SelectLabelProps } from 'radix-vue'

const props = defineProps<
  SelectLabelProps & { class?: HTMLAttributes['class'] }
>()
</script>

<template>
  <SelectLabel
    :class="cn('py-1.5 pe-8 ps-2 text-sm font-semibold', props.class)"
  >
    <slot />
  </SelectLabel>
</template>
