<script setup lang="ts">
import { Link } from "@void/vue";
</script>

<template>
  <header class="flex flex-row h-50 w-full">
    <div class="relative flex-1 flex justify-center items-center">
      <h1>
        <Link
          href="/"
          class="flex flex-row h-21 select-none before:absolute before:inset-0 before:content-[''] focus-visible:outline-none focus-visible:before:outline-2 focus-visible:before:-outline-offset-2"
        >
          <span class="text-7xl">log.</span>
          <picture>
            <source srcset="/avatar.avif" type="image/avif" />
            <img src="/avatar.jpg" alt="aomona" class="rounded-full h-full" />
          </picture>
        </Link>
      </h1>
    </div>
    <div class="flex-1" />
    <button class="flex-1 text-7xl select-none">search</button>
  </header>
</template>
