import FetchApi from '~/composables/api'
import type {
  AuthenticateCheckResultType,
  AuthenticateTokensType,
  ForgotPasswordResetResultType,
  ForgotPasswordTokenType,
} from '~/types/account/authenticate'
import type { UserDetailType } from '~/types/account/user'
import type { ApiResponseType } from '~/types/request'

const basePrefix = '/user/'

export async function UserAuthenticateCheck(
  username: string,
): Promise<ApiResponseType<AuthenticateCheckResultType>> {
  return FetchApi(`${basePrefix}authenticate/check/`, {
    method: 'POST',
    body: {
      username,
    },
  })
}

export async function UserAuthenticatePassword(
  username: string,
  password: string,
): Promise<ApiResponseType<AuthenticateTokensType>> {
  return FetchApi(`${basePrefix}authenticate/password/`, {
    method: 'POST',
    body: {
      username,
      password,
    },
  })
}

export async function UserAuthenticateOneTimePassword(
  username: string,
  otp: string,
): Promise<ApiResponseType<AuthenticateTokensType>> {
  return FetchApi(`${basePrefix}authenticate/otp/`, {
    method: 'POST',
    body: {
      username,
      otp,
    },
  })
}

export function UserGetCurrentDetail(): Promise<
  ApiResponseType<UserDetailType>
> {
  return FetchApi(`${basePrefix}request/current/`)
}

export function UserLogout(refresh: string): Promise<ApiResponseType<null>> {
  return FetchApi(`${basePrefix}logout/`, {
    method: 'POST',
    body: JSON.stringify({
      refresh,
    }),
  })
}

// User Forgot password Endpoints
export function UserForgotPasswordCheck(
  username: string,
): Promise<ApiResponseType<null>> {
  return FetchApi(`${basePrefix}forgot/password/check/`, {
    method: 'POST',
    body: {
      username,
    },
  })
}

export function UserForgotPasswordOneTimePassword(
  username: string,
  otp: string,
): Promise<ApiResponseType<ForgotPasswordTokenType>> {
  return FetchApi(`${basePrefix}forgot/password/otp/`, {
    method: 'POST',
    body: {
      username,
      otp,
    },
  })
}

export function UserForgotPasswordReset(
  username: string,
  token: string,
  password: string,
  confirm_password: string,
): Promise<ApiResponseType<ForgotPasswordResetResultType>> {
  return FetchApi(`${basePrefix}forgot/password/reset/`, {
    method: 'POST',
    body: {
      username,
      token,
      password,
      confirm_password,
    },
  })
}
