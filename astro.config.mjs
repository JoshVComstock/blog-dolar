import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const env = loadEnv(process.env.NODE_ENV || '', process.cwd(), '');
const SITE = (env.PUBLIC_SITE_URL || 'http://localhost:4321').replace(/\/+$/, '');

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'auto' },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) => !page.includes('/widget/'),
      serialize(item) {
        const now = new Date().toISOString();
        item.lastmod = now;
        if (item.url === `${SITE}/`) {
          item.changefreq = 'hourly';
          item.priority = 1;
        } else if (item.url.includes('/dolar-hoy') || item.url.includes('/dolar-paralelo')) {
          item.changefreq = 'hourly';
          item.priority = 0.9;
        } else if (item.url.includes('-dolares-a-')) {
          item.changefreq = 'daily';
          item.priority = 0.6;
        } else {
          item.changefreq = 'weekly';
          item.priority = 0.4;
        }
        return item;
      }
    })
  ]
});
