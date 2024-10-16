<script lang="ts" setup>
import { schemaUsername } from '@/utils/schemas'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import Input from '~/components/ui/input/Input.vue'
import { UserForgotPasswordCheck } from '~/services/user'
import { ForgotPasswordSectionEnum } from '~/types/account/authenticate'

const username: Ref<string> = defineModel<string>('username', {
  required: true,
})
const forgotSection = defineModel<ForgotPasswordSectionEnum>('forgot-section', {
  required: true,
})

const { meta, setValues, validate, handleSubmit, setFieldError, defineField }
  = useForm<{
    username: string
  }>({ validationSchema: schemaUsername })
const [usernameInput, usernameInputProps] = defineField('username', {
  validateOnBlur: true,
  validateOnInput: true,
})
onMounted(() => {
  if (localStorage.username) {
    setValues({ username: localStorage.username })
    validate()
    localStorage.removeItem('username')
  }
})
const loading = ref<boolean>(false)
const submit = handleSubmit(async (values) => {
  if (!validateUsername(values.username)) {
    setFieldError('username', 'شماره موبایل و یا ایمیل نامعتبر است')
    loading.value = false
    return
  }
  loading.value = true
  const result = await UserForgotPasswordCheck(values.username)
  loading.value = false

  if (result.success) {
    username.value = values.username
    forgotSection.value = ForgotPasswordSectionEnum.OTP
    toast(result.message)
  }
  else {
    setFieldError('username', result.message)
  }
})
</script>

<template>
  <div>
    <!-- Title -->
    <div class="mb-6 text-center font-medium">
      فراموشی کلمه عبور
    </div>
    <form @submit="submit">
      <div class="mb-6">
        <Input
          v-model="usernameInput"
          v-bind="usernameInputProps"
          name="username"
          autofocus
          with-error-message
          type="text"
          dir="ltr"
          variant="floating-label"
          label="شماره موبایل یا ایمیل"
          label-class="bg-card"
          class="bg-card"
          @input="validate"
        />
      </div>
      <ul class="mb-8 space-y-4">
        <li>
          <NuxtLink
            to="/auth/login"
            class="flex items-center gap-x-1 text-sm text-primary duration-200 hover:text-primary/80"
          >
            ورود به حساب کاربری

            <Icon name="lucide-chevron-left" class="size-5" />
          </NuxtLink>
        </li>
      </ul>
      <UiButton
        type="submit"
        class="w-full"
        size="lg"
        :loading="loading"
        :disabled="!meta.valid || loading"
      >
        بازیابی کلمه عبور
      </UiButton>
    </form>
  </div>
</template>

<style></style>
