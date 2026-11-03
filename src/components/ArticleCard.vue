<script setup lang="ts">
import Tag from './Tag.vue';

const props = defineProps<{
  title: string;
  mintoread: string;
  date: string;
  location: string;
  tags?: string[];
}>();
</script>

<template>
  <a class="grid grid-cols-3 grid-rows-[2fr_1fr_2fr] h-54 gap-x-3 gap-y-13 p-3 rounded">
    <span class="col-start-1 col-end-3 text-xl">{{ props.title }}</span>
    <span class="text-zinc-500 text-sm flex items-center justify-end">{{mintoread}} min to read</span>
    <span class="text-zinc-500 text-sm flex items-center">{{ props.date }}</span>
    <span class="col-start-3 text-zinc-500 text-sm flex items-center justify-end">{{ props.location }}</span>
    <Tag v-if="props.tags?.[1]" class="col-start-2">{{ props.tags?.[1] }}</Tag>
    <Tag v-if="props.tags?.[0]" class="col-start-3">{{ props.tags?.[0] }}</Tag>
  </a>
</template>
