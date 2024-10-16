<script setup lang="ts">
import { Textarea } from '@/components/ui/textarea'
</script>

<template>
  <div class="flex w-full max-w-2xl gap-4">
    <Textarea label="Type your message here." />
    <Textarea variant="floating-label" label="Type your message here." />
  </div>
</template>
