<script setup lang="ts">
import { cn } from '@/utils/cn'
import {
  SelectIcon,
  SelectTrigger,
  type SelectTriggerProps,
  useForwardProps,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<
  SelectTriggerProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-start text-sm ring-offset-background placeholder:text-muted-foreground focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate',
        props.class,
      )
    "
  >
    <slot />
    <SelectIcon as-child>
      <Icon name="lucide-chevron-down" class="size-4 shrink-0 opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
