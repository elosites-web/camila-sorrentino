import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

const OG_IMAGE_PATH = '/images/og-camila-sorrentino-logo-oficial.png';

function resolveOgImageUrl(rawSiteUrl?: string): string {
  const trimmed = rawSiteUrl?.trim();
  if (!trimmed) {
    return OG_IMAGE_PATH;
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return OG_IMAGE_PATH;
    }
    return `${parsed.origin}${OG_IMAGE_PATH}`;
  } catch {
    return OG_IMAGE_PATH;
  }
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const resolvedOgImageUrl = resolveOgImageUrl(
    env.VITE_SITE_URL || process.env.VITE_SITE_URL,
  );

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'resolve-og-image-url',
        transformIndexHtml(html: string): string {
          if (resolvedOgImageUrl === OG_IMAGE_PATH) {
            return html;
          }
          return html.replaceAll(
            `content="${OG_IMAGE_PATH}"`,
            `content="${resolvedOgImageUrl}"`,
          );
        },
      },
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(import.meta.dirname, 'dist');
          const srcAssets = path.resolve(import.meta.dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'motion/react', 'lucide-react'],
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true as const,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
