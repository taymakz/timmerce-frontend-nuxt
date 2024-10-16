<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'

const defaultValue = 'item-1'

const accordionItems = [
  { value: 'اولی', title: 'اولی', content: 'محتوای اولی' },
]
</script>

<template>
  <div class="mx-auto max-w-lg">
    <Accordion
      type="single"
      class="w-full"
      collapsible
      :default-value="defaultValue"
    >
      <AccordionItem
        v-for="item in accordionItems"
        :key="item.value"
        :value="item.value"
      >
        <AccordionTrigger>{{ item.title }}</AccordionTrigger>
        <AccordionContent>
          {{ item.content }}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>
