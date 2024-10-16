<template>
  <div>
    <div class="flex min-h-screen flex-col">
      <header />
      <main class="flex-grow">
        <slot />
      </main>
      <footer />
    </div>
  </div>
</template>
