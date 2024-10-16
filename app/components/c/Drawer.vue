<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button variant="outline">
        Open Drawer
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <div class="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div class="p-4 pb-0">
          hi
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose as-child>
            <Button variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
</template>
