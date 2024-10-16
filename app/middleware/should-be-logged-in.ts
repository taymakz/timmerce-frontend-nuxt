export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server)
    return

  const authStore = useAuthenticateStore()
  if (!authStore.isLogin && !authStore.getLoading) {
    // Fetch only if user is not logged in yet
    await authStore.SetUserDetail()
  }
  if (!authStore.isLogin)
    return navigateTo(`/auth/login?backUrl=${to.fullPath}`)
})
