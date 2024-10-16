<script lang="ts" setup>
import { AuthenticateSectionEnum } from '~/types/account/authenticate'

definePageMeta({
  layout: 'auth',
})
useHead({
  title: 'ورود / ثبت نام',
})
const username = ref<string>('')
const canLoginWithPassword = ref<boolean>(false)
const authenticateSection = ref<AuthenticateSectionEnum>(
  AuthenticateSectionEnum.CHECK,
)

interface sectionsType {
  name: string
  component: any
}

const sections = shallowRef<sectionsType[]>([
  {
    name: AuthenticateSectionEnum.CHECK,
    component: resolveComponent('PagesAuthLoginCheck'),
  },
  {
    name: AuthenticateSectionEnum.OTP,
    component: resolveComponent('PagesAuthLoginOneTimePassword'),
  },
  {
    name: AuthenticateSectionEnum.PASSWORD,
    component: resolveComponent('PagesAuthLoginPassword'),
  },
])
</script>

<template>
  <div>
    <template v-for="section in sections" :key="section.name">
      <component
        :is="section.component"
        v-if="authenticateSection === section.name"
        v-model:can-login-with-password="canLoginWithPassword"
        v-model:authenticate-section="authenticateSection"
        v-model:username="username"
      />
    </template>
  </div>
</template>

<style></style>
