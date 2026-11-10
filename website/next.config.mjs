import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

// A static export lands in `out` only while distDir is `.next`, so the dev server is the one that
// moves: a `next build` can then run beside it without clobbering the files it is serving.
export default (phase) => ({
  output: 'export',
  // Set when the site is published under a sub-folder, e.g. /her-app on GitHub Pages.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  trailingSlash: true,
  // Plain `<img>` is the norm here and the export has no image server.
  images: { unoptimized: true },
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
});
