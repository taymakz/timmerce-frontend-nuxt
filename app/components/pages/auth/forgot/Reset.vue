<script lang="ts" setup>
import { schemaChangePassword } from '@/utils/schemas'
import { Field, Form } from 'vee-validate'
import { toast } from 'vue-sonner'
import Input from '~/components/ui/input/Input.vue'
import { UserForgotPasswordReset } from '~/services/user'
import {
  type AuthenticateTokensType,
  ForgotPasswordSectionEnum,
} from '~/types/account/authenticate'

const username: Ref<string> = defineModel<string>('username', {
  required: true,
})
const forgotSection = defineModel<ForgotPasswordSectionEnum>('forgot-section', {
  required: true,
})

const password = ref<string>('')
const confirm_password = ref<string>('')
const resetToken = ref<string>('')

const loading = ref<boolean>(false)

function getBack() {
  username.value = ''
  forgotSection.value = ForgotPasswordSectionEnum.CHECK
}

onMounted(() => {
  if (localStorage.forgotPasswordToken) {
    resetToken.value = localStorage.forgotPasswordToken
    localStorage.removeItem('forgotPasswordToken')
  }
  else {
    forgotSection.value = ForgotPasswordSectionEnum.CHECK
  }
})
const {
  getValidationClass,
  lengthValid,
  lowercaseValid,
  numberValid,
  uppercaseValid,
} = useResetPasswordValidation(password)

const authStore = useAuthenticateStore()

async function submit(_: any, formEvent: any) {
  loading.value = true
  try {
    if (!resetToken.value) {
      forgotSection.value = ForgotPasswordSectionEnum.CHECK
      return
    }

    const result = await UserForgotPasswordReset(
      username.value,
      resetToken.value,
      password.value,
      confirm_password.value,
    )
    if (result.success) {
      localStorage.removeItem('forgotPasswordToken')
      toast(result.message)
      const loginTokens = {
        access: result.data.access,
        refresh: result.data.refresh,
      } as AuthenticateTokensType
      await authStore.Login(loginTokens)
    }
    else {
      if (result.data.error_input_name && result.message) {
        formEvent.setFieldError(result.data.error_input_name, result.message)
      }
      loading.value = false
    }
  }
  catch (error) {
    console.error(error)
    loading.value = false
  }
}
</script>

<template>
  <div>
    <!-- Title -->
    <div class="mb-6 text-center font-medium">
      تغییر کلمه عبور
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
      :validation-schema="schemaChangePassword"
      @submit="submit"
    >
      <div class="mb-6 space-y-6">
        <Field v-slot="{ field }" name="password" validate-on-blur>
          <Input
            v-bind="field"
            v-model="password"
            autofocus
            with-error-message
            type="password"
            dir="ltr"
            variant="floating-label"
            label="کلمه عبور جدید"
            label-class="bg-card"
            class="bg-card"
          />
        </Field>
        <div class="mb-8">
          <div class="mb-4 flex items-center gap-x-2">
            <div
              class="h-[3px] w-full rounded-full"
              :class="getValidationClass[0]"
            />
            <div
              class="h-[3px] w-full rounded-full"
              :class="getValidationClass[1]"
            />
            <div
              class="h-[3px] w-full rounded-full"
              :class="getValidationClass[2]"
            />
            <div
              class="h-[3px] w-full rounded-full"
              :class="getValidationClass[3]"
            />
          </div>
          <div>
            <ul
              class="select-none list-disc space-y-2 px-4 text-xs text-muted-foreground md:text-sm"
            >
              <li v-show="!lengthValid">
                <p>حداقل 6 و حداکثر 18 حرف</p>
              </li>
              <li v-show="!lowercaseValid">
                <p>شامل یک حرف کوچک</p>
              </li>
              <li v-show="!uppercaseValid">
                <p>شامل یک حرف بزرگ</p>
              </li>
              <li v-show="!numberValid">
                <p>شامل عدد</p>
              </li>
            </ul>
          </div>
        </div>
        <Field v-slot="{ field }" name="confirm_password" validate-on-blur>
          <Input
            v-bind="field"
            v-model="confirm_password"
            autofocus
            with-error-message
            type="password"
            dir="ltr"
            variant="floating-label"
            label="تکرار کلمه عبور جدید"
            label-class="bg-card"
            class="bg-card"
          />
        </Field>
      </div>

      <UiButton
        type="submit"
        class="w-full"
        size="lg"
        :loading="loading"
        :disabled="!meta.valid || loading"
      >
        تایید
      </UiButton>
    </Form>
  </div>
</template>

<style></style>
