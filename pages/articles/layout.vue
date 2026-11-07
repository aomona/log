<template>
  <div class="w-full flex justify-center">
    <div class="void-md w-full max-w-7xl px-6">
      <slot />
    </div>
  </div>
</template>

<style>
@import "@void/md/theme-content.css";

.void-md h1 {
  width: fit-content;
}

.void-md pre.shiki.shiki-themes {
  --shiki-light-bg: var(--vmd-bg-soft);
}
</style>
