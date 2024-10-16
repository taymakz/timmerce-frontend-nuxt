<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/cn'
import { useField } from 'vee-validate'
import { type InputVariants, inputVariants } from '.'

type RegexType = 'ONLY_DIGIT' | 'ONLY_ALPHABET' | 'ONLY_DIGIT_ALPHABET'

const props = withDefaults(
  defineProps<{
    defaultValue?: string | number
    class?: HTMLAttributes['class']
    labelClass?: HTMLAttributes['class']
    variant?: InputVariants['variant']
    type?: HTMLInputElement['type']
    mode?: RegexType
    label?: string
    name?: string
    dir?: string
    disabled?: boolean
    readonly?: boolean
    autofocus?: boolean
    withErrorMessage?: boolean
    withIcon?: boolean
    autoComplete?: boolean
  }>(),
  {
    type: 'text',
    variant: 'default',
    autoComplete: true,
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

const regexPatterns: Record<RegexType, RegExp> = {
  ONLY_DIGIT: /^\d*$/,
  ONLY_ALPHABET: /^[a-z]*$/i,
  ONLY_DIGIT_ALPHABET: /^[a-z0-9]*$/i,
}
const modelValue = defineModel<string | number>({ required: false })
const randomId = useId()

// Event handler to validate input based on mode
function handleInput(event: Event) {
  const input = event.target as HTMLInputElement
  const currentValue = input.value

  if (props.mode && regexPatterns[props.mode]) {
    const regex = regexPatterns[props.mode]
    if (!regex.test(currentValue)) {
      // Remove invalid characters
      input.value = currentValue.slice(0, -1)
    }
  }
}

const { errorMessage } = useField(props.name || randomId!, undefined)
const passwordRevealed = ref(false)
</script>

<template>
  <div>
    <div class="relative w-full">
      <!-- Reveal Password Eye icon  -->
      <span
        v-if="
          props.type === 'password'
            && ((modelValue && variant === 'floating-label')
              || variant === 'default')
        "
        :dir
        class="absolute inset-y-0 end-4 z-10 flex items-center justify-center"
      >
        <span
          class="flex cursor-pointer items-center justify-center text-muted-foreground"
          @click="passwordRevealed = !passwordRevealed"
        >
          <Icon v-show="!passwordRevealed" name="lucide-eye-off" :size="20" />
          <Icon v-show="passwordRevealed" name="lucide-eye" :size="20" />
        </span>
      </span>
      <!-- Icon -->
      <div
        v-if="withIcon"
        :dir
        class="pointer-events-none absolute inset-y-0 start-4 z-10 flex items-center justify-center"
      >
        <span
          class="flex cursor-pointer items-center justify-center text-muted-foreground"
        >
          <slot name="icon" />
        </span>
      </div>
      <template v-if="variant === 'default'">
        <UiLabel :for="name || randomId" class="sr-only">
          {{ label }}
        </UiLabel>
        <input
          :id="name || randomId"
          v-model="modelValue"
          :dir
          :name
          :autofocus
          :disabled
          :readonly
          :placeholder="label"
          :type="passwordRevealed ? 'text' : props.type"
          :class="
            cn(
              inputVariants({ variant }),
              props.class,
              { 'pe-12': props.type === 'password' },
              { 'ps-12': withIcon },
            )
          "
          :autocomplete="autoComplete ? 'on' : 'off'"
          @input="handleInput"
          @focus="emits('focus', $event)"
          @blur="emits('blur', $event)"
          @change="emits('change', $event)"
          @focusin="emits('focusin', $event)"
          @focusout="emits('focusout', $event)"
          @keydown="emits('keydown', $event)"
          @keyup="emits('keyup', $event)"
          @click="emits('click', $event)"
        >
      </template>
      <template v-else-if="variant === 'floating-label'">
        <label
          :dir
          :for="name || randomId"
          :class="cn(inputVariants({ variant }), props.class)"
        >
          <input
            :id="name || randomId"
            v-model="modelValue"
            :props
            :autocomplete="autoComplete ? 'on' : 'off'"
            :name
            :autofocus
            :disabled
            :readonly
            :type="passwordRevealed ? 'text' : props.type"
            class="peer"
            :class="[
              { '!pe-12': props.type === 'password' },
              { '!ps-12': withIcon },
            ]"
            placeholder=""
            @input="handleInput"
            @focus="emits('focus', $event)"
            @blur="emits('blur', $event)"
            @change="emits('change', $event)"
            @focusin="emits('focusin', $event)"
            @focusout="emits('focusout', $event)"
            @keydown="emits('keydown', $event)"
            @keyup="emits('keyup', $event)"
            @click="emits('click', $event)"
          >
          <span
            :class="
              cn(
                'pointer-events-none absolute right-2.5 top-0 -translate-y-1/2 rounded-lg bg-background px-2 py-0.5 text-xs text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary',
                labelClass,
              )
            "
          >
            {{ label }}
          </span>
        </label>
      </template>
    </div>
    <p v-if="withErrorMessage" class="mt-3 h-5 text-sm text-warning">
      <span v-show="errorMessage">
        {{ errorMessage }}
      </span>
    </p>
  </div>
</template>
