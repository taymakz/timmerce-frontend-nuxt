import FetchApi from '~/composables/api'
import type { ApiResponseType } from '~/types/request'

export async function RequestVerificationOTP(
  to: string,
  otp_usage: string,
): Promise<ApiResponseType<null>> {
  return FetchApi('/messages/verification/request/otp/', {
    method: 'POST',
    body: {
      to,
      otp_usage,
    },
  })
}
