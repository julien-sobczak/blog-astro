import { defineConfig } from 'astro/config';
import expressiveCode from "astro-expressive-code";
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://juliensobczak.com',

  integrations: [
    expressiveCode({
      plugins: [pluginLineNumbers()],
      defaultProps: {
        // Disable line numbers by default
        showLineNumbers: false,
      },
    }),
    react(),
    mdx(),
  ],

  redirects: {
    // Backward-compatibility with Jekyll, which uses a file extension
    '/read/[...slug].html': '/read/[...slug]',
    '/write/[...slug].html': '/write/[...slug]',
    '/inspect/[...slug].html': '/inspect/[...slug]',
    '/categories/all.html': '/categories/all',
    '/categories/read.html': '/categories/read',
    '/categories/write.html': '/categories/write',
    '/categories/inspect.html': '/categories/inspect',
  }
});
