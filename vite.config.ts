import { defineConfig, lazyPlugins } from "vite-plus";
import { voidPlugin } from "void";
import { voidMarkdown } from "@void/md/plugin";
import { voidVue } from "@void/vue/plugin";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { articleTitleTransitions } from "./build/article-title-transitions";

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
      "ci-test": {
        command: "vp test run",
        cache: {
          input: [{ auto: true }, "!.void/**", "!.wrangler/**", "!.cloudflare/**", "!dist/**"],
          output: [],
        },
      },
      "ci-build": {
        command: "vp build",
        cache: {
          env: ["VOID_CLOUDFLARE_DEPLOY_BUILD"],
          input: [{ auto: true }, "!.void/**", "!.wrangler/**", "!.cloudflare/**", "!dist/**"],
          output: ["dist/**", ".cloudflare/output/**"],
        },
      },
    },
  },
  staged: {
    "*": "vp check --fix",
  },
});
