<script setup lang="ts">
import Tag from './Tag.vue';

const props = defineProps<{
  title: string;
  minutesToRead: number;
  date: string;
  location: string;
  href: string;
  tags?: [string?, string?];
}>();
</script>

<template>
  <div tabindex="0" class="article-card grid grid-cols-3 grid-rows-[2fr_1fr_2fr] h-54 gap-x-3 gap-y-13 p-4 rounded-xl">
    <a :href="props.href" class="col-start-1 col-end-3 text-xl before:content-[''] before:absolute before:inset-0 before:z-0">{{ props.title }}</a>
    <span class="text-zinc-500 text-sm flex items-center justify-end">{{minutesToRead}} min to read</span>
    <span class="text-zinc-500 text-sm flex items-center">{{ props.date }}</span>
    <span class="col-start-3 text-zinc-500 text-sm flex items-center justify-end">{{ props.location }}</span>
    <Tag v-if="props.tags?.[1]" class="col-start-2">{{ props.tags?.[1] }}</Tag>
    <Tag v-if="props.tags?.[0]" class="col-start-3">{{ props.tags?.[0] }}</Tag>
  </div>
</template>

<style scoped>
.article-card {
  position: relative;
  isolation: isolate;
  corner-shape: superellipse(2);
}

.article-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  border-radius: inherit;
  background-color: var(--color-zinc-100);
  opacity: 0;
  scale: 0.98;
  transition: scale 500ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 500ms cubic-bezier(0.22, 1, 0.36, 1);
}

.article-card:hover {
  cursor: pointer;
}

.article-card:focus-visible {
  outline: 2px solid var(--color-zinc-500);
  outline-offset: 3px;
}

.article-card:hover::before,
.article-card:focus-visible::before {
  opacity: 1;
  scale: 1;
}

@media (prefers-reduced-motion: reduce) {
  .article-card::before {
    transition: none;
  }
}
</style>
