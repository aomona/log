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
::selection {
  background: #49e673;
  color: #a33489;
}
</style>
