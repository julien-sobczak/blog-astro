import { defineConfig } from 'astro/config';
import expressiveCode from "astro-expressive-code";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [expressiveCode(), react()]
});
