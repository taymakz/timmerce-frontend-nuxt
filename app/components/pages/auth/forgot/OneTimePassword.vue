<script lang="ts" setup>
import { toast } from 'vue-sonner'
import InputOtp from '~/components/ui/input-otp/InputOtp.vue'
import { RequestVerificationOTP } from '~/services/messages-verification'
import { UserForgotPasswordOneTimePassword } from '~/services/user'
import { ForgotPasswordSectionEnum } from '~/types/account/authenticate'
import { RequestVerificationOtpUsageEnum } from '~/types/messages'

const username: Ref<string> = defineModel<string>('username', {
  required: true,
})
const forgotSection = defineModel<ForgotPasswordSectionEnum>('forgot-section', {
  required: true,
})

const pinCount = 4
const otp = ref<string>('')
const isValidInput = computed(() => otp.value.length === pinCount)
const inputErrorMessage = ref<string>()

const loading = ref<boolean>(false)
const newOtpLoading = ref<boolean>(false)

function getBack() {
  username.value = ''
  forgotSection.value = ForgotPasswordSectionEnum.CHECK
}

const { isPending, startTimer, getFormattedCounter, resetTimer } = useTimer({
  minute: 4,
})
onMounted(() => startTimer())

async function requestNewOTP() {
  if (newOtpLoading.value || !validateUsername(username.value))
    return

  newOtpLoading.value = true
  const result = await RequestVerificationOTP(
    username.value,
    RequestVerificationOtpUsageEnum.AUTHENTICATE,
  )
  newOtpLoading.value = false
  if (result.success) {
    toast(result.message)
    resetTimer()
  }
  else {
    forgotSection.value = ForgotPasswordSectionEnum.CHECK
  }
}

function getMessage(): string {
  if (validatePhoneNumber(username.value))
    return `کد تایید به شماره ${username.value} پیامک شد`
  else if (validateEmail(username.value))
    return `کد تایید به ایمیل ${username.value} ارسال شد`
  else return ''
}

async function submit() {
  loading.value = true
  try {
    const result = await UserForgotPasswordOneTimePassword(
      username.value,
      otp.value,
    )
    if (result.success) {
      localStorage.setItem(
        'forgotPasswordToken',
        JSON.stringify(result.data.token),
      )
      forgotSection.value = ForgotPasswordSectionEnum.RESET
    }
    else {
      inputErrorMessage.value = result.message
      otp.value = otp.value.slice(0, -1)
      loading.value = false
    }
  }
  catch {
    loading.value = false
  }
}

watch(otp, () => {
  if (otp.value.length === pinCount)
    submit()
})
</script>

<template>
  <div>
    <!-- Title -->
    <div class="mb-6 text-center font-medium">
      کد تایید را وارد کنید
    </div>
    <p class="text-text/60 mb-4 text-sm">
      {{ getMessage() }}
    </p>
    <UiButton
      size="icon"
      class="absolute -right-2.5 -top-2.5 h-8 w-8 rounded-full"
      @click="getBack"
    >
      <Icon name="lucide-chevron-right" class="size-5" />
    </UiButton>
    <div class="mb-4 space-y-4">
      <div dir="ltr">
        <InputOtp v-model="otp" :disabled="loading" :maxlength="pinCount" />
      </div>
      <p class="h-5 text-sm text-warning">
        <span v-show="inputErrorMessage">
          {{ inputErrorMessage }}
        </span>
      </p>
    </div>
    <ul class="mb-8 space-y-4">
      <li>
        <button
          :disabled="isPending || newOtpLoading"
          class="flex items-center gap-x-1 text-sm text-primary duration-200 hover:text-primary/80"
          @click="requestNewOTP"
        >
          <template v-if="isPending">
            <span class="text-text/60">
              زمان باقی‌مانده تا ارسال مجدد
              <span class="font-semibold">{{ getFormattedCounter }}</span>
            </span>
          </template>

          <template v-else>
            <span> ارسال مجدد کد تایید </span>
            <span>
              <Icon name="lucide-chevron-left" class="size-5" />
            </span>
          </template>
        </button>
      </li>
    </ul>
    <div>
      <UiButton
        type="button"
        class="w-full"
        size="lg"
        :loading="loading"
        :disabled="loading || !isValidInput"
        @click="submit"
      >
        تایید
      </UiButton>
    </div>
  </div>
</template>

<style></style>
