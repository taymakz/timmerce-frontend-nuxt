<script setup lang="ts">
import { Button } from '@/components/ui/button'

const d = ref(false)
</script>

<template>
  <div class="flex gap-4">
    <Button @click="d = !d">
      Toggle Hide
    </Button>
    <Button :loading="d" variant="secondary" hide-content-on-loading>
      دومی
    </Button>
    <Button :loading="d" variant="secondary">
      سومی
    </Button>
  </div>
</template>
