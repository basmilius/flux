import {readFileSync, writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const entry = fileURLToPath(new URL('../dist/index.d.ts', import.meta.url));
// Omit source-only Sass aliases, preserving line breaks for the declaration map.
writeFileSync(entry, readFileSync(entry, 'utf8').replace(/^import ['"][^'"]+\.s?css['"];(?=\r?$)/gm, ''));
