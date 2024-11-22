<script setup lang="ts">
import MainSlider from '~/components/pages/home/MainSlider.vue'
import Button from '~/components/ui/button/Button.vue'
import { appName } from '~/constants'
import { GetPageHomeData } from '~/services/pages/home'
import { BannerPositionEnum } from '~/types/banner'

defineOgImageComponent('NuxtSeo', {
  title: appName,
})
const { data, error, status, refresh } = await useAsyncData('page-home-common-data', () => GetPageHomeData(), {
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  },
})
</script>

<template>
  <div class="pt-[121px] lg:pt-[117px]">
    <!-- Error Content -->
    <div v-if="error || !data?.data" class="flex justify-center mt-32">
      <Button variant="outline" class="bg-sc-background" :loading="status === 'pending'" @click="refresh">
        <Icon name="i-ph-plugs-connected-thin" class="size-5" />
        خطا ! تلاش دوباره
      </Button>
    </div>

    <div v-else>
      <MainSlider :banners="data.data.banners.filter(b => b.position === BannerPositionEnum.SOLO_FULL_WIDTH_SLIDER)" />
    </div>
  </div>
</template>
