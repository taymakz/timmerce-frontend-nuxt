<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <div class="flex gap-4">
    <Badge> Badge</Badge>
    <Badge variant="secondary">
      Secondary
    </Badge>
    <Badge variant="outline">
      Outline
    </Badge>
    <Badge variant="destructive">
      Destructive
    </Badge>
  </div>
</template>
