<script lang="ts" setup>
import { Field, Form } from 'vee-validate'

import { toast } from 'vue-sonner'
import Input from '~/components/ui/input/Input.vue'
import { RequestVerificationOTP } from '~/services/messages-verification'
import { UserAuthenticatePassword } from '~/services/user'
import { AuthenticateSectionEnum } from '~/types/account/authenticate'
import { RequestVerificationOtpUsageEnum } from '~/types/messages'
import { schemaAuthenticatePassword } from '~/utils/schemas'

const canLoginWithPassword = defineModel<boolean>('canLoginWithPassword', {
  required: true,
})
const username = defineModel<string>('username', { required: true })
const authenticateSection = defineModel<AuthenticateSectionEnum>(
  'authenticate-section',
  {
    required: true,
  },
)
const password = ref<string>('')
const loading = ref<boolean>(false)
async function redirectToOTP() {
  if (loading.value)
    return
  loading.value = true
  const result = await RequestVerificationOTP(
    username.value,
    RequestVerificationOtpUsageEnum.AUTHENTICATE,
  )
  loading.value = false

  if (result.success) {
    authenticateSection.value = AuthenticateSectionEnum.OTP
    canLoginWithPassword.value = true
    password.value = ''
  }
  if (result.message)
    toast(result.message)
}
function redirectToForgot() {
  localStorage.setItem('username', username.value)
  navigateTo({
    path: '/auth/forgot/',
  })
}
function getBack() {
  username.value = ''
  authenticateSection.value = AuthenticateSectionEnum.CHECK
}
const authStore = useAuthenticateStore()
async function submit(_: any, formEvent: any) {
  if (loading.value)
    return
  loading.value = true
  try {
    const result = await UserAuthenticatePassword(
      username.value,
      password.value,
    )
    if (result.success) {
      toast(result.message)
      await authStore.Login(result.data)
    }
    else {
      formEvent.setFieldError('password', result.message)
      loading.value = false
    }
  }
  catch {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <!-- Title -->
    <div class="mb-6 text-center font-medium">
      کلمه عبور را وارد کنید
    </div>
    <UiButton
      size="icon"
      class="absolute -right-2.5 -top-2.5 h-8 w-8 rounded-full"
      @click="getBack"
    >
      <Icon name="lucide-chevron-right" class="size-5" />
    </UiButton>
    <Form
      v-slot="{ meta }"
      :validation-schema="schemaAuthenticatePassword"
      @submit="submit"
    >
      <div class="mb-4">
        <Field v-slot="{ field }" name="password" validate-on-blur>
          <Input
            v-bind="field"
            v-model="password"
            autofocus
            type="password"
            dir="ltr"
            with-error-message
            class="bg-card"
          />
        </Field>
      </div>
      <ul class="mb-8 space-y-4">
        <li>
          <button
            type="button"
            class="flex items-center gap-x-1 text-sm text-primary duration-200 hover:text-primary/80"
            @click="redirectToOTP"
          >
            <span>ورود با رمز یک بار مصرف</span>
            <span>
              <Icon name="lucide-chevron-left" class="size-5" />
            </span>
          </button>
        </li>
        <li>
          <button
            type="button"
            class="flex items-center gap-x-1 text-sm text-primary duration-200 hover:text-primary/80"
            @click="redirectToForgot"
          >
            <span> فراموشی رمز عبور </span>
            <span>
              <Icon name="lucide-chevron-left" class="size-5" />
            </span>
          </button>
        </li>
      </ul>
      <div>
        <UiButton
          type="submit"
          class="w-full"
          size="lg"
          :loading="loading"
          :disabled="!meta.valid || loading"
        >
          ورود
        </UiButton>
      </div>
    </Form>
  </div>
</template>

<style></style>
