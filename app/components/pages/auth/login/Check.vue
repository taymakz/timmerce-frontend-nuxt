<script lang="ts" setup>
import { schemaUsername } from '@/utils/schemas'
import { Field, Form } from 'vee-validate'

import { toast } from 'vue-sonner'
import Input from '~/components/ui/input/Input.vue'
import { UserAuthenticateCheck } from '~/services/user'
import { AuthenticateSectionEnum } from '~/types/account/authenticate'

const username = defineModel<string>('username', { required: true })
const authenticateSection = defineModel<AuthenticateSectionEnum>(
  'authenticate-section',
  {
    required: true,
  },
)

const loading = ref<boolean>(false)

async function submit(_: any, formEvent: any) {
  if (loading.value || !validateUsername(username.value))
    return
  loading.value = true

  const result = await UserAuthenticateCheck(username.value)

  if (result.success) {
    authenticateSection.value = result.data.section
    if (result.data.section === AuthenticateSectionEnum.OTP)
      toast(result.message)
  }
  else {
    loading.value = false
    formEvent.setFieldError('username', result.message)
  }
}
</script>

<template>
  <div>
    <!-- Title -->
    <div class="mb-6 text-center font-medium">
      ورود / ثبت نام
    </div>
    <Form
      v-slot="{ meta }"
      :validation-schema="schemaUsername"
      @submit="submit"
    >
      <div class="mb-6">
        <Field v-slot="{ field }" name="username" validate-on-blur>
          <Input
            v-bind="field"
            v-model="username"
            autofocus
            with-error-message
            type="text"
            dir="ltr"
            variant="floating-label"
            label="شماره موبایل یا ایمیل"
            label-class="bg-card"
            class="bg-card"
          />
        </Field>
      </div>
      <div class="space-y-3">
        <UiButton
          type="submit"
          class="w-full"
          size="lg"
          :loading="loading"
          :disabled="!meta.valid || loading"
        >
          ورود
        </UiButton>
        <div class="text-center text-sm text-muted-foreground">
          با ورود به سایت, کلیه

          <NuxtLink to="/" class="inline-block px-1 text-primary">
            قوانین
          </NuxtLink>

          را می‌پذیرم.
        </div>
      </div>
    </Form>
  </div>
</template>

<style></style>
