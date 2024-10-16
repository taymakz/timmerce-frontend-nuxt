<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/cn'
import { type TextareaVariants, textareaVariants } from '.'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    variant?: TextareaVariants['variant']
    label?: string
    withErrorMessage?: boolean
  }>(),
  {
    variant: 'default',
  },
)
const emits = defineEmits([
  'input',
  'focus',
  'blur',
  'change',
  'focusin',
  'focusout',
  'keydown',
  'keyup',
  'click',
])
const modelValue = defineModel<string | number>({ required: false })
const randomId = useId()
const { errorMessage } = useField(randomId, undefined)
</script>

<template>
  <div class="w-full">
    <template v-if="variant === 'default'">
      <textarea
        v-model="modelValue"
        :class="cn(textareaVariants({ variant }), props.class)"
        :placeholder="label"
        @input="emits('input', $event)"
        @focus="emits('focus', $event)"
        @blur="emits('blur', $event)"
        @change="emits('change', $event)"
        @focusin="emits('focusin', $event)"
        @focusout="emits('focusout', $event)"
        @keydown="emits('keydown', $event)"
        @keyup="emits('keyup', $event)"
        @click="emits('click', $event)"
      />
    </template>
    <template v-if="variant === 'floating-label'">
      <label
        :for="randomId"
        :class="cn(textareaVariants({ variant }), props.class)"
      >
        <textarea
          :id="randomId"
          v-model="modelValue"
          class="peer"
          :placeholder="label"
          @input="emits('input', $event)"
          @focus="emits('focus', $event)"
          @blur="emits('blur', $event)"
          @change="emits('change', $event)"
          @focusin="emits('focusin', $event)"
          @focusout="emits('focusout', $event)"
          @keydown="emits('keydown', $event)"
          @keyup="emits('keyup', $event)"
          @click="emits('click', $event)"
        />

        <span
          class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 rounded-lg bg-background px-2 py-0.5 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary"
        >
          {{ label }}
        </span>
      </label>
    </template>
    <p v-if="withErrorMessage" class="mt-3 h-5 text-sm text-warning">
      <span v-show="errorMessage">
        {{ errorMessage }}
      </span>
    </p>
  </div>
</template>
