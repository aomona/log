<!-- pages/layout.vue -->
<script setup lang="ts">
import Header from '@/components/Header.vue';
</script>

<template>
  <Header />
  <main>
    <slot />
  </main>
</template>

<style>
@import "tailwindcss";
::selection {
  background: #49e673; /* 選択したときの背景色 */
  color: #a33489;      /* 選択したときの文字色 */
}
</style>
