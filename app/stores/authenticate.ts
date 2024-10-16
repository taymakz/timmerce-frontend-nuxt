import { jwtDecode } from 'jwt-decode'
import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'
import { UserGetCurrentDetail, UserLogout } from '~/services/user'
import type { AuthenticateTokensType } from '~/types/account/authenticate'
import type { UserDetailType } from '~/types/account/user'

export const useAuthenticateStore = defineStore('authenticate', () => {
  // State
  const userTokens = ref<AuthenticateTokensType | null>(null)
  const userDetail = ref<UserDetailType | null>(null)
  const loading = ref<boolean>(false)

  // Computed Properties
  const isLogin = computed((): boolean => userDetail.value != null)
  const getUserTokens = computed(() => userTokens.value)
  const getUserDetail = computed(() => userDetail.value)
  const getLoading = computed((): boolean => loading.value)
  const getFullname = computed(() => {
    const firstName = userDetail.value?.first_name ?? ''
    const lastName = userDetail.value?.last_name ?? ''

    return firstName || lastName ? `${firstName} ${lastName}`.trim() : ''
  })
  const getUsername = computed(
    (): string => userDetail.value?.phone || userDetail.value?.email || '',
  )

  // Actions - Setters
  const SetLoading = (value?: boolean) => {
    if (value)
      loading.value = value
    else loading.value = !loading.value
  }
  const SetUserDetailName = (first_name: string, last_name: string) => {
    if (userDetail.value) {
      userDetail.value.first_name = first_name
      userDetail.value.last_name = last_name
    }
  }
  const SetUserDetailPhone = (value: string) => {
    if (userDetail.value) {
      userDetail.value.phone = value
    }
  }

  const SetUserDetailEmail = (value: string) => {
    if (userDetail.value) {
      userDetail.value.email = value
    }
  }

  const SetUserTokens = (tokens: AuthenticateTokensType) => {
    if (tokens) {
      userTokens.value = tokens
      localStorage.removeItem('authTokens')
      localStorage.setItem('authTokens', JSON.stringify(tokens))
    }
  }

  // Actions - Authentication
  const SetUserDetail = useMemoize(
    async () => {
      loading.value = true
      if (import.meta.server) {
        loading.value = false
        return
      }
      const tokens = localStorage.getItem('authTokens')
      if (!tokens) {
        loading.value = false
        return
      }

      const parsed_tokens = JSON.parse(tokens) as AuthenticateTokensType
      if (!parsed_tokens.access || !parsed_tokens.refresh) {
        loading.value = false
        return
      }
      userTokens.value = parsed_tokens

      const decoded_token = jwtDecode(userTokens.value.access) as {
        exp: number
        iat: number
        jti: string
        token_type: string
        user_id: number
      }
      const currentTimestamp: number = Math.floor(Date.now() / 1000)

      if (decoded_token.exp && decoded_token.exp < currentTimestamp) {
        await useAuthenticateStore().RefreshToken()
      }

      loading.value = true
      try {
        const result = await UserGetCurrentDetail()
        if (result.success) {
          userDetail.value = result.data
        }
        else {
          if (result.status) {
            userTokens.value = null
            localStorage.removeItem('authTokens')
          }
        }
      }
      catch (error) {
        console.error('Error fetching user detail:', error)
        // Handle error appropriately
      }
      finally {
        loading.value = false
      }
    },
    { cache: createSimpleMemoizeExpiringCache(2000) },
  )

  const RefreshToken = useMemoize(
    async () => {
      const tokens = userTokens.value
      if (!tokens || !tokens.refresh) {
        userTokens.value = null
        userDetail.value = null
        localStorage.removeItem('authTokens')
        return
      }
      let response
      do {
        try {
          response = await RefreshUserToken(tokens.refresh)
          const data = await response.json()

          if (response.status === 200) {
            userTokens.value = {
              refresh: tokens.refresh,
              access: data.access,
            }
            localStorage.removeItem('authTokens')
            localStorage.setItem(
              'authTokens',
              JSON.stringify(userTokens.value),
            )
          }
          else if (response.status === 401) {
            // Unauthorized error
            userTokens.value = null
            userDetail.value = null
            localStorage.removeItem('authTokens')
          }
          else {
            // Handle other status codes or unexpected errors
            console.error('Token refresh failed with status:', response.status)
            break // Exit the loop in case of unexpected errors
          }
        }
        catch (error) {
          console.error('Error during token refresh:', error)
          // Add a delay before retrying (e.g., using setTimeout)
          await new Promise(resolve => setTimeout(resolve, 1000)) // 1 second delay
        }
      } while (
        response!.status !== 200
        && response!.statusText !== 'Unauthorized'
        && response!.status !== 401
      )
    },
    { cache: createSimpleMemoizeExpiringCache(4000) },
  )
  const RedirectToLogin = () => {
    const route = useRoute()
    return navigateTo(`/auth/login?backUrl=${route.fullPath}`)
  }
  const Logout = async () => {
    const tokens = userTokens.value
    if (!tokens)
      return
    loading.value = true
    const result = await UserLogout(tokens.refresh)
    if (result.message)
      toast(result.message)

    if (result.success) {
      // Clear the login data and user data from the store and local storage
      userTokens.value = null
      userDetail.value = null
      localStorage.removeItem('authTokens')

      // Redirect to the login page with the current URL as the backUrl parameter
      await RedirectToLogin()
    }
    loading.value = false
  }

  const Login = async (result: AuthenticateTokensType) => {
    const route = useRoute()
    localStorage.removeItem('authTokens')
    localStorage.setItem('authTokens', JSON.stringify(result))
    SetUserTokens(result)
    await SetUserDetail()
    const backUrl: any = route.query.backUrl || '/'
    return await navigateTo(backUrl)
  }

  // Return Store
  return {
    isLogin,
    getUserTokens,
    getUserDetail,
    getLoading,
    getFullname,
    SetLoading,
    SetUserDetailName,
    SetUserDetailPhone,
    SetUserDetailEmail,
    SetUserTokens,
    SetUserDetail,
    Logout,
    Login,
    RedirectToLogin,
    RefreshToken,
    getUsername,
  }
})
