<script lang="ts" setup>
import { LinksHeaderGet } from '~/services/links'

const { data, status, error } = await useAsyncData(
  'links-header',
  () => LinksHeaderGet(),
  {
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    },
  },
)
</script>

<template>
  <div class="container">
    {{ error  }} - {{ data }}
  </div>
</template>

<style>

</style>
