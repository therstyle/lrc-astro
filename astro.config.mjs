// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  site: 'http://lrc:8888',
  output: 'static',
  integrations: [svelte()],
});
