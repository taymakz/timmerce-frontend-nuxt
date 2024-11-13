<script lang="ts" setup>
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const isMounted = useMounted()
const authStore = useAuthenticateStore()
</script>

<template>
  <div>
    <!-- Loading -->
    <template v-if="authStore.getLoading || !isMounted">
      <div
        class="flex size-10 items-center justify-center rounded-lg border text-muted-foreground"
      >
        <Icon name="i-lucide-loader-2" class="animate-spin size-5" />
      </div>
    </template>
    <template v-else>
      <!-- Login / Register -->
      <template v-if="!authStore.isLogin">
        <NuxtLink v-if="!authStore.isLogin" to="/auth/login" class="flex items-center justify-center gap-2 h-10 px-3 text-sm text-sc-foreground border rounded-lg hover:bg-background transition-all duration-200">
          <Icon name="i-lucide-user-round" class=" size-5" />

          ورود / ثبت‌ نام
        </NuxtLink>
      </template>
      <!-- Account Detail -->
      <template v-else>
        <Popover>
          <PopoverTrigger>
            <div
              class="flex size-10 items-center justify-center rounded-lg border text-sc-foreground duration-300  hover:bg-background"
            >
              <Icon name="i-lucide-user-round" class="size-5" />
            </div>
          </PopoverTrigger>
          <PopoverContent align="center" class="p-1 w-60 rounded-xl">
            <ul class="space-y-2">
              <li>
                <div class="block  overflow-hidden px-2">
                  <div class="border-b py-2 w-full flex items-center justify-between gap-4">
                    <div class="flex items-center  gap-4 ">
                      <div class="size-10  text-sm font-semibold flex items-center justify-center rounded-full border min-w-10">
                        {{ authStore.getUsername.slice(0, 2) }}
                      </div>
                      <div>
                        <div class="truncate">
                          {{ authStore.getFullname }}
                        </div>
                        <div class="text-muted-foreground truncate ">
                          {{ authStore.getUsername }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <NuxtLink to="/" class="block overflow-hidden py-2.5 px-2 hover:bg-secondary duration-300 text-muted-foreground hover:text-popover-foreground rounded-lg">
                  <div class=" flex items-center w-full justify-between gap-4">
                    <div class="flex items-center justify-between gap-2">
                      <Icon name="lucide-layout-dashboard" :size="22" />

                      <div>
                        پنل کاربری
                      </div>
                    </div>
                  </div>
                </NuxtLink>
              </li>

              <li>
                <NuxtLink to="/" class="block overflow-hidden py-2.5 px-2 hover:bg-secondary duration-300 text-muted-foreground hover:text-popover-foreground rounded-lg">
                  <div class=" flex items-center w-full justify-between gap-4">
                    <div class="flex items-center justify-between gap-2">
                      <Icon name="lucide-heart" :size="22" />

                      <div>
                        علاقه‌مندی ها
                      </div>
                    </div>
                  </div>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/" class="block overflow-hidden py-2.5 px-2 hover:bg-secondary duration-300 text-muted-foreground hover:text-popover-foreground rounded-lg">
                  <div class=" flex items-center w-full justify-between gap-4">
                    <div class="flex items-center justify-between gap-2">
                      <Icon name="lucide-shopping-bag" :size="22" />

                      <div>
                        سفارش ها
                      </div>
                      <div class="w-6 h-6 rounded-full bg-alert/10 text-alert text-center leading-6">
                        6
                      </div>
                    </div>
                  </div>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/" class="block overflow-hidden py-2.5 px-2 hover:bg-secondary duration-300 text-muted-foreground hover:text-popover-foreground rounded-lg">
                  <div class=" flex items-center w-full justify-between gap-4">
                    <div class="flex items-center justify-between gap-2">
                      <Icon name="lucide-mouse-pointer-click" :size="22" />

                      <div>
                        بازدید های اخیر
                      </div>
                    </div>
                  </div>
                </NuxtLink>
              </li>
              <li v-if="!authStore.getUserDetail?.has_password">
                <button class="block w-full overflow-hidden py-2.5 px-2 duration-300 text-alert hover:bg-alert/10 rounded-lg">
                  <div class=" flex items-center w-full justify-between gap-4">
                    <div class="flex items-center justify-between gap-2">
                      <Icon name="lucide-lock-keyhole" :size="22" />

                      <div>
                        ثبت کلمه عبور
                      </div>
                    </div>
                  </div>
                </button>
              </li>
              <li class="border-t pt-2">
                <button :disabled="authStore.getLoading" class="w-full block overflow-hidden py-2.5 px-2 hover:bg-warning/10 duration-300 text-warning rounded-lg" @click="authStore.Logout()">
                  <div class="flex items-center w-full justify-between gap-4  ">
                    <div class="flex items-center justify-between gap-4">
                      <Icon name="lucide-log-out" :size="22" />

                      <div>
                        خروج
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </template>
    </template>
  </div>
</template>

<style>

</style>
