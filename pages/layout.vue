<script setup lang="ts">
import Header from "@/components/Header.vue";
</script>

<template>
  <Header />
  <main>
    <slot />
  </main>
</template>

<style>
@import "tailwindcss";
@source not "../build";

@view-transition {
  navigation: auto;
}

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
