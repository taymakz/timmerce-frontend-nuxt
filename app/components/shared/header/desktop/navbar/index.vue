<script lang="ts" setup>
import { LinksHeaderGet } from '~/services/links'
import { LinksHeaderTypeEnum } from '~/types/links'
import Indicator from './Indicator.vue'
import DefaultLink from './types/Default.vue'
import DropdownLink from './types/Dropdown.vue'
import MegaMenuLink from './types/MegaMenu.vue'
import NormalMenuLink from './types/NormalMenu.vue'

const { data } = await useAsyncData(
  'links-header',
  () => LinksHeaderGet(),
  {
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    },
  },
)
const sortedParentLinks = computed(() => {
  if (data.value?.data) {
    return [...data.value?.data]
      .filter(link => link.tn_parent === null)
      .sort((a, b) => {
        return a.order - b.order
      })
  }
  return []
})
// Computed property for each link type
const defaultLinks = computed(() =>
  sortedParentLinks.value.filter(
    link => link.link_type === LinksHeaderTypeEnum.DEFAULT,
  ),
)
const dropdownLinks = computed(() =>
  sortedParentLinks.value.filter(
    link => link.link_type === LinksHeaderTypeEnum.DROPDOWN,
  ),
)
const normalMenuLinks = computed(() =>
  sortedParentLinks.value.filter(
    link => link.link_type === LinksHeaderTypeEnum.NORMAL_MENU,
  ),
)
const megaMenuLinks = computed(() =>
  sortedParentLinks.value.filter(
    link => link.link_type === LinksHeaderTypeEnum.MEGA_MENU,
  ),
)
</script>

<template>
  <nav class="container flex items-center gap-2 ">
    <Indicator />

    <MegaMenuLink
      :items="megaMenuLinks"
    />
    <NormalMenuLink
        :items="normalMenuLinks"
      />
    <DefaultLink
      :items="defaultLinks"
    />
    <DropdownLink
      :items="dropdownLinks"
    />
  </nav>
</template>

<style>

</style>
