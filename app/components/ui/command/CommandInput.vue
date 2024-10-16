<script setup lang="ts">
import { cn } from '@/utils/cn'
import {
  ComboboxInput,
  type ComboboxInputProps,
  useForwardProps,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<
  ComboboxInputProps & {
    class?: HTMLAttributes['class']
  }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <div class="flex items-center border-b px-3" cmdk-input-wrapper>
    <ComboboxInput
      v-bind="{ ...forwardedProps, ...$attrs }"
      auto-focus
      :class="
        cn(
          'flex h-11 w-full rounded-md bg-transparent py-3 text-right text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          props.class,
        )
      "
    />
    <Icon name="lucide-search" class="ms-2 size-4 shrink-0 opacity-50" />
  </div>
</template>
