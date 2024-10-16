<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
</script>

<template>
  <div class="flex items-center gap-x-2">
    <Label for="airplane-mode">Airplane Mode</Label>
    <Switch id="airplane-mode" />
  </div>
</template>
