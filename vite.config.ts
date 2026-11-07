import { defineConfig, lazyPlugins } from "vite-plus";
import { voidPlugin } from "void";
import { voidMarkdown } from "@void/md/plugin";
import { voidVue } from "@void/vue/plugin";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { articleTitleTransitions } from "./build/article-title-transitions";

// Fingerprint repository files; generated directory listings vary between CI runs.
const taskCacheInput = [
  "**/*",
  "!node_modules/**",
  "!.git",
  "!.git/**",
  "!.void",
  "!.void/**",
  "!.void-wrangler.jsonc",
  "!.wrangler",
  "!.wrangler/**",
  "!.cloudflare",
  "!.cloudflare/**",
  "!dist",
  "!dist/**",
];

export default defineConfig({
  plugins: lazyPlugins(() => [
    voidPlugin(),
    voidMarkdown(),
    articleTitleTransitions(),
    voidVue(),
    tailwindcss(),
  ]),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  fmt: {
    htmlWhitespaceSensitivity: "ignore",
  },
  run: {
    tasks: {
      "ci-check": {
        command: "vp check --deny-warnings",
        cache: { input: taskCacheInput, output: [] },
      },
      "ci-typecheck": {
        command: "vue-tsc --noEmit",
        cache: { input: taskCacheInput, output: [] },
      },
      "ci-test": {
        command: "vp test run",
        cache: {
          input: taskCacheInput,
          output: [],
        },
      },
      "ci-build": {
        command: "vp build",
        cache: {
          env: ["VOID_CLOUDFLARE_DEPLOY_BUILD"],
          input: taskCacheInput,
          output: ["dist/**", ".cloudflare/output/**"],
        },
      },
    },
  },
  staged: {
    "*": "vp check --fix",
  },
});
