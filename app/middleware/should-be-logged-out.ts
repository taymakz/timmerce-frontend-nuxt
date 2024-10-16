export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server)
    return
  const authStore = useAuthenticateStore()
  await authStore.SetUserDetail()
  if (authStore.isLogin)
    return navigateTo('/')
})
