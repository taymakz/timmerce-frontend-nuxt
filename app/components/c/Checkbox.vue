<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
</script>

<template>
  <div>
    <div class="flex items-center gap-2">
      <Label for="terms">Accept terms and conditions</Label>
      <Checkbox id="terms" />
    </div>
  </div>
</template>
