import { toast } from 'vue-sonner'
import type { AuthenticateTokensType } from '~/types/account/authenticate'
import type { ApiResponseType } from '~/types/request'

/**
 * FetchApi - A function to handle API requests with default configuration and error handling.
 * @param {string} url - The endpoint URL.
 * @param {any} config - Optional Axios-like configuration object.
 * @returns {Promise<ApiResponseType<T>>} - The API response wrapped in a generic type.
 */
export default async function FetchApi<T>(
  url: string,
  config: any = {},
): Promise<ApiResponseType<T>> {
  const runtimeConfig = useRuntimeConfig()

  // Set default configuration values
  config = {
    method: 'GET',
    baseURL: `${runtimeConfig.public.baseApi || 'http://localhost:8000'}/api`,
    ...config,
  }

  try {
    // Attempt API call using $fetch
    return await $fetch<ApiResponseType<T>>(url, config)
  }
  catch (error: any) {
    // Handle error based on HTTP status or specific error message
    return handleFetchError<T>(error)
  }
}

/**
 * ClientApi - Function to make authenticated API requests with token refresh handling.
 * @param {string} url - The API endpoint URL.
 * @param {any} config - Optional Axios-like configuration object.
 * @returns {Promise<ApiResponseType<T>>} - The API response wrapped in a generic type.
 */
export async function ClientApi<T>(
  url: string,
  config: any = {},
): Promise<ApiResponseType<T>> {
  let tokens = getAuthenticateTokens()
  if (!tokens) {
    return {
      success: false,
      status: 0,
      message: 'لطفاً دوباره وارد شوید',
      data: null,
    } as ApiResponseType<T>
  }
  const authStore = useAuthenticateStore()

  async function refreshToken() {
    const { tokens: newTokens } = await authStore.RefreshToken()
    tokens = newTokens
  }
  // If access token is expired, try refreshing it
  if (isAuthenticateAccessTokenExpired(tokens.access_exp)) {
    await refreshToken()
  }

  const runtimeConfig = useRuntimeConfig()
  // Set default config and attach access token to headers if available
  config = {
    method: 'GET',
    baseURL: `${runtimeConfig.public.baseApi || 'http://localhost:8000'}/api`,
    ...config,
    headers: {
      ...(config.headers || {}),
      Authorization: `Bearer ${tokens!.access}`,
    },
  }

  try {
    return await $fetch<ApiResponseType<T>>(url, config)
  }
  catch (error: any) {
    // Handle unauthorized errors and attempt token refresh if needed
    if (error.status === 401) {
      await refreshToken()
      config.headers.Authorization = `Bearer ${tokens.access}`
      // Retry the request after token refresh
      try {
        return await $fetch<ApiResponseType<T>>(url, config)
      }
      catch (newError: any) {
        return handleAuthError<T>(newError)
      }
    }
    return handleFetchError<T>(error)
  }
}

/**
 * RefreshUserToken - Function to refresh the user's token.
 * @param {string} refresh - The refresh token string.
 * @returns {Promise<{ tokens: AuthenticateTokensType | null, status: number }>}
 */
export async function RefreshUserToken(
  refresh: string,
): Promise<{ tokens: AuthenticateTokensType | null, status: number }> {
  const response = await fetch(
    `${useRuntimeConfig().public.baseApi}/api/user/token/refresh/`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    },
  )

  if (!response.ok) {
    throw new Error('Failed to refresh token')
  }

  const result = (await response.json()) as ApiResponseType<AuthenticateTokensType>
  return {
    tokens: {
      refresh,
      access: result.data.access,
      access_exp: result.data.access_exp,
    },
    status: response.status,
  }
}

/**
 * handleFetchError - Function to handle general API errors.
 * @param {any} error - Error object from $fetch.
 * @returns {ApiResponseType<T>} - Error response in the expected format.
 */
function handleFetchError<T>(error: any): ApiResponseType<T> {
  if (error.status === 429) {
    if (import.meta.client)
      toast('لطفا لحظاتی بعد تلاش کنید')
    return {
      success: false,
      status: error.response?.status,
      message: 'لطفا لحظاتی بعد تلاش کنید',
      data: null,
    } as ApiResponseType<T>
  }
  else if (error.message.includes('<no response> Failed to fetch')) {
    if (import.meta.client)
      toast('درحال حاضر سرور در دسترس نمیباشد')
    return {
      success: false,
      status: 503,
      message: 'درحال حاضر سرور در دسترس نمیباشد',
      data: null,
    } as ApiResponseType<T>
  }
  else {
    return {
      success: false,
      status: error.response?.status,
      message: 'مشکلی در عملیات رخ داده',
      data: null,
    } as ApiResponseType<T>
  }
}

/**
 * handleAuthError - Function to handle authentication-specific errors during retry.
 * @param {any} error - Error object after retry.
 * @returns {ApiResponseType<T>} - Error response in the expected format.
 */
function handleAuthError<T>(error: any): ApiResponseType<T> {
  const authStore = useAuthenticateStore()
  const router = useRouter()

  if (error.status === 401 && authStore.getUserTokens) {
    if (!router.currentRoute.value.fullPath.includes('/auth/login')) {
      navigateTo({
        path: '/auth/login/',
        query: { backUrl: router.currentRoute.value.fullPath || '/' },
      })
    }
    return {
      success: false,
      status: error.response?.status,
      message: 'لطفا مجددا وارد حساب خود شوید',
      data: null,
    } as ApiResponseType<T>
  }
  return handleFetchError<T>(error)
}
