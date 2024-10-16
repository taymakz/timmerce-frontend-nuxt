<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import { Label } from '@/components/ui/label'
import { createReusableTemplate, useMediaQuery } from '@vueuse/core'
import { ref } from 'vue'

// Reuse `form` section
const [UseTemplate, GridForm] = createReusableTemplate()
const isDesktop = useMediaQuery('(min-width: 768px)')

const isOpen = ref(false)
</script>

<template>
  <ClientOnly>
    <UseTemplate>
      <form class="grid items-start gap-4 px-4">
        <div class="grid gap-2">
          <Label html-for="email">Email</Label>
          j
        </div>
        <div class="grid gap-2">
          <Label html-for="username">Username</Label>
          j
        </div>
        <Button type="submit">
          Save changes
        </Button>
      </form>
    </UseTemplate>

    <Dialog v-if="isDesktop" v-model:open="isOpen">
      <DialogTrigger as-child>
        <Button variant="outline">
          Responsive Dialog
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Responsive Dialog</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <GridForm />
      </DialogContent>
    </Dialog>

    <Drawer v-else v-model:open="isOpen">
      <DrawerTrigger as-child>
        <Button variant="outline">
          Responsive Dialog
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Responsive Dialog</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <GridForm />
        <DrawerFooter class="pt-2">
          <DrawerClose as-child>
            <Button variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </ClientOnly>
</template>
