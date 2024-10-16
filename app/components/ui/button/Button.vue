<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/cn'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { type ButtonVariants, buttonVariants } from '.'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  loading?: boolean
  disabled?: boolean
  hideContentOnLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="props.disabled || loading"
  >
    <slot v-if="!loading || (loading && !hideContentOnLoading)" />
    <Icon
      v-if="loading"
      name="lucide-loader-2"
      class="animate-spin"
      :size="18"
    />
  </Primitive>
</template>
