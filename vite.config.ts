import { defineConfig } from "vite-plus";
import { voidPlugin } from "void";
import { voidMarkdown } from "@void/md/plugin";
import { voidVue } from "@void/vue/plugin";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { articleTitleTransitions } from "./build/article-title-transitions";

export default defineConfig({
  plugins: [voidPlugin(), voidMarkdown(), articleTitleTransitions(), voidVue(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  fmt: {
    htmlWhitespaceSensitivity: "ignore",
  },
  staged: {
    "*": "vp check --fix",
  },
});
