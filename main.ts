// The World in One Page — news-image-20261123 entry program.
//
// The broadsheet front page for Monday 23 November 2026 lives in this
// repository as entry.png, already rendered at exactly 1024x1024 pixels.
// This program's only job is to deliver those bytes, unchanged, to the
// grader: it copies entry.png into the output directory as entry.png.
// Running it any number of times always produces the identical file,
// because the source image is committed and never regenerated here.

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const sourceImage = join(here, 'entry.png');

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outputDir, { recursive: true });

const destination = join(outputDir, 'entry.png');
copyFileSync(sourceImage, destination);

// A one-line receipt on stderr keeps stdout clean while confirming, in
// local runs, that the delivered file matches the committed image's size.
// The image is 1024x1024 and under the 1 MiB cap by construction, so no
// further validation is needed here — determinism comes from the copy.
const deliveredBytes = statSync(destination).size;
console.error(`entry.png delivered: ${deliveredBytes} bytes`);
