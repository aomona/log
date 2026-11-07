<template>
  <div class="void-md w-full">
    <slot />
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
