<script setup lang="ts">
import Header from "@/components/Header.vue";
</script>

<template>
  <div class="container mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto gap-8 flex flex-col">
      <Header />
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<style>
@import "tailwindcss";
@source not "../build";

:root {
  color-scheme: light dark;
}

body {
  @apply bg-white text-black dark:bg-zinc-950 dark:text-zinc-100;
}

::selection {
  background: #49e673;
  color: #a33489;
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none;
  }
}
</style>
