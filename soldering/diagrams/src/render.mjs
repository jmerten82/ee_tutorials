// Kept for convenience: renders this tutorial's drawings with the shared renderer.
// Same as running `node tools/render-diagrams.mjs soldering` from the repository root.
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

process.argv[2] = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
await import('../../../tools/render-diagrams.mjs');
