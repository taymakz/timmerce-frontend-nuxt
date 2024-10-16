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
    <template v-for="section in sections" :key="section.name">
      <component
        :is="section.component"
        v-if="forgotSection === section.name"
        v-model:forgot-section="forgotSection"
        v-model:username="username"
      />
    </template>
  </div>
</template>

<style></style>
