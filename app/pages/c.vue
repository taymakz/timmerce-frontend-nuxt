<script setup lang="ts"></script>

<template>
  <div>
    <div class="relative flex min-h-screen w-full bg-background pb-20">
      <div class="absolute left-2 top-2">
        <CommonToggleTheme />
      </div>
      <div class="container pt-20">
        <CAccordion />
        <div class="mt-10 flex flex-wrap items-center gap-6">
          <CAlert />
          <CDialog />
          <CDrawer />
          <CResponsiveDialog />
          <CDropdown />
          <CBadge />
          <CBreadcrumb />
          <CButton />
          <CCheckbox />
          <CCombobox />
          <CHoverCard />
          <CSelect />
          <CSonner />
          <CSwitch />
          <CTooltip />

          <CInputOtp />
          <CInput />
          <CTextarea />
        </div>
        <div class="mt-10 flex flex-wrap items-center gap-6">
          <div class="mx-auto">
            <CCard />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
