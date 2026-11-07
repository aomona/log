<script setup lang="ts">
import { Link } from "@void/vue";
import { articleTitleTransitionName } from "@/lib/articleTitleTransition";
import Tag from "./Tag.vue";

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
  <div
    tabindex="0"
    :class="[
      'relative isolate grid h-54 grid-cols-3 grid-rows-[2fr_1fr_2fr] gap-x-3 gap-y-13 rounded-xl p-4 [corner-shape:superellipse(2)]',
      'before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit]',
      'before:scale-98 before:bg-zinc-100 before:opacity-0 dark:before:bg-zinc-800',
      'before:transition-[scale,opacity] before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:before:transition-none',
      'hover:cursor-pointer hover:before:scale-100 hover:before:opacity-100',
      'focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-3 focus-visible:outline-zinc-500 dark:focus-visible:outline-zinc-400',
      'focus-visible:before:scale-100 focus-visible:before:opacity-100',
    ]"
  >
    <Link
      :href="props.href"
      prefetch
      class="col-start-1 col-end-3 text-xl before:absolute before:inset-0 before:z-0 before:content-['']"
    >
      <span
        :style="{ viewTransitionName: articleTitleTransitionName(props.href) }"
        class="inline-block"
      >
        {{ props.title }}
      </span>
    </Link>
    <span class="flex items-center justify-end text-sm text-zinc-500 dark:text-zinc-400">
      {{ minutesToRead }} min to read
    </span>
    <span class="flex items-center text-sm text-zinc-500 dark:text-zinc-400">{{ props.date }}</span>
    <span
      class="col-start-3 flex items-center justify-end text-sm text-zinc-500 dark:text-zinc-400"
    >
      {{ props.location }}
    </span>
    <Tag v-if="props.tags?.[1]" class="col-start-2">{{ props.tags?.[1] }}</Tag>
    <Tag v-if="props.tags?.[0]" class="col-start-3">{{ props.tags?.[0] }}</Tag>
  </div>
</template>
