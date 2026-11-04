import { defineConfig } from "vite-plus";
import { voidPlugin } from "void";
import { voidMarkdown } from "@void/md/plugin";
import { voidVue } from "@void/vue/plugin";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [voidPlugin(), voidMarkdown(), voidVue(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  staged: {
      '*': 'vp check --fix',
    },
});
