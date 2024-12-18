<script lang="ts" setup>
import { ForgotPasswordSectionEnum } from '~/types/account/authenticate'

definePageMeta({
  layout: 'auth',
})
useHead({
  title: 'بازیابی کلمه عبور',
})

const username = ref<string>('')
const forgotSection = ref<ForgotPasswordSectionEnum>(
  ForgotPasswordSectionEnum.CHECK,
)

interface sectionsType {
  name: string
  component: any
}

const sections = shallowRef<sectionsType[]>([
  {
    name: ForgotPasswordSectionEnum.CHECK,
    component: resolveComponent('PagesAuthForgotCheck'),
  },
  {
    name: ForgotPasswordSectionEnum.OTP,
    component: resolveComponent('PagesAuthForgotOneTimePassword'),
  },
  {
    name: ForgotPasswordSectionEnum.RESET,
    component: resolveComponent('PagesAuthForgotReset'),
  },
])
</script>

<template>
  <div>
    <animate-presence :initial="false" mode="wait">
      <template v-for="section in sections" :key="section.name">
        <Motion
          v-if="forgotSection === section.name" :variants="{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }" initial="hidden" animate="visible"
          exit="hidden"
        >
          <component
            :is="section.component"

            v-model:forgot-section="forgotSection"
            v-model:username="username"
          />
        </Motion>
      </template>
    </animate-presence>
  </div>
</template>

<style></style>
