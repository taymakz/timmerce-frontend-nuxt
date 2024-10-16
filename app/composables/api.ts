import { toast } from 'vue-sonner'
import type { ApiResponseType } from '~/types/request'

export default async function FetchApi<T>(
  url: string,
  config: any = {},
): Promise<ApiResponseType<T>> {
  const runtimeConfig = useRuntimeConfig()
  config = {
    method: 'GET',
    baseURL: `${runtimeConfig.public.baseApi || 'http://localhost:8000'}/api`,
    ...config,
  }
  const authStore = useAuthenticateStore()
  function setTokenOnHeader() {
    if (authStore.getUserTokens) {
      config.headers = {
        Authorization: `Bearer ${authStore.getUserTokens.access}`,
      }
    }
  }
  setTokenOnHeader()

  try {
    return await $fetch<ApiResponseType<T>>(url, config)
  }
  catch (error: any) {
    if (error.status === 401 && authStore.getUserTokens) {
      await authStore.RefreshToken()
      setTokenOnHeader()

      try {
        return await $fetch<ApiResponseType<T>>(url, config)
      }
      catch (newError: any) {
        if (newError.status === 401 && authStore.getUserTokens) {
          const router = useRouter()
          if (!router.currentRoute.value.fullPath.includes('/auth/login')) {
            await navigateTo({
              path: '/auth/login/',
              query: { backUrl: router.currentRoute.value.fullPath || '/' },
            })
          }

          return {
            success: false,
            status: newError.response?.status,
            message: 'لطفا مجددا وارد حساب خود شوید',
            data: null,
          } as ApiResponseType<T>
        }
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
        return {
          success: false,
          status: newError.response?.status,
          message: 'مشکلی در عملیات رخ داده',
          data: null,
        } as ApiResponseType<T>
      }
    }
    else if (error.status === 429) {
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
      // Where backend is not available
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
}
export async function RefreshUserToken(refresh: string): Promise<Response> {
  return fetch(
    `${useRuntimeConfig().public.baseApi}/api/admin/user/token/refresh/`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refresh,
      }),
    },
  )
}
