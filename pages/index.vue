<script setup lang="ts">
import ArticleCard from "@/components/ArticleCard.vue";
import Divider from "@/components/Divider.vue";
import { calculateMinutesToRead } from "@/lib/calculateMinutesToRead";
import { getMarkdownSource } from "@/lib/markdown";
import pages from "@void/md/pages";

const articles = pages
  .map((page) => ({
    title: page.title,
    minutesToRead: calculateMinutesToRead(getMarkdownSource(page.path)),
    date: new Date(page.frontmatter.date).toISOString().slice(0, 10),
    location: page.frontmatter.location,
    tags: page.frontmatter.tags,
    href: page.path.replace(/\.md$/, ""),
  }))
  .sort((a, b) => b.date.localeCompare(a.date));
</script>

<template>
  <template v-for="(article, index) in articles" :key="index">
    <ArticleCard
      :href="article.href"
      :title="article.title"
      :minutesToRead="article.minutesToRead"
      :date="article.date"
      :location="article.location"
      :tags="article.tags"
    />
    <Divider v-if="index < articles.length - 1" />
  </template>
</template>
