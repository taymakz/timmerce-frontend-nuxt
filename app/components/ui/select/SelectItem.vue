<script setup lang="ts">
import { cn } from '@/utils/cn'
import {
  SelectItem,
  SelectItemIndicator,
  type SelectItemProps,
  SelectItemText,
  useForwardProps,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<
  SelectItemProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectItem
    v-bind="forwardedProps"
    :class="
      cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pe-2 ps-4 text-start text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class,
      )
    "
  >
    <SelectItemText>
      <slot />
    </SelectItemText>
    <span class="absolute end-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectItemIndicator>
        <Icon name="lucide-check" class="size-4" />
      </SelectItemIndicator>
    </span>
  </SelectItem>
</template>
