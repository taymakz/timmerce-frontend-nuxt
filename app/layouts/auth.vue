<script setup lang="ts">
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Motion } from '@oku-ui/motion'
import AnimatedWave from '~/components/ui/backgrounds/AnimatedWave.vue'
import Grid from '~/components/ui/backgrounds/Grid.vue'

const cardWrapper = ref<HTMLDivElement | null>(null)
const { height } = useElementSize(cardWrapper)
</script>

<template>
  <div
    class="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-dot-black/10 dark:bg-dot-white/5"
  >
    <AnimatedWave />

    <Grid />
    <div class="absolute inset-x-0 top-4 flex justify-center">
      <CommonToggleTheme />
    </div>
    <div class="container relative">
      <Card class="relative mx-auto max-w-[400px]">
        <Motion
          tag="div"
          :initial="{ height: '100%' }"
          :animate="{
            height: `${height}px`,
          }"
          class="overflow-hidden"
        >
          <div ref="cardWrapper">
            <CardHeader>
              <div class="flex justify-center">
                <NuxtLink to="/">
                  <CommonLogo />
                </NuxtLink>
              </div>
            </CardHeader>
            <CardContent class="grid gap-4">
              <slot />
            </CardContent>
          </div>
        </Motion>
      </Card>
    </div>
  </div>
</template>
