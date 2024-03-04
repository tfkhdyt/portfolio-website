import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    compress({
      HTML: false,
    }),
  ],
  image: {
    domains: ['admin.tfkhdyt.my.id'],
  },
});

