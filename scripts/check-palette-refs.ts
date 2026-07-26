/**
 * Fails on any reference to the mirrored palette this library used to ship.
 *
 * Those names are gone, so a `var(--gray-100)` now resolves to nothing at all and
 * paints as if the declaration were absent. That fails quietly, which is what this
 * catches.
 *
 *   bun scripts/check-palette-refs.ts
 */

import {readdirSync, readFileSync, statSync} from 'node:fs';
import {join, relative} from 'node:path';

const ROOTS = ['packages', 'docs'];
const EXTENSIONS = ['.scss', '.css', '.ts', '.tsx', '.js', '.vue', '.md'];

const SKIP_DIRECTORIES = ['node_modules', 'dist', '.vitepress/cache', '.vitepress/dist', '.git'];

// Matched as whole path segments. A substring test also skips `distance.ts`, which
// is the kind of hole that only shows up once something in it is wrong.
function isSkipped(path: string): boolean {
    return SKIP_DIRECTORIES.some(skip => path === skip || path.startsWith(`${skip}/`) || path.includes(`/${skip}/`) || path.endsWith(`/${skip}`));
}

const SCALES = 'gray|primary|danger|info|success|warning';
const STOPS = '25|50|100|200|300|400|500|600|700|800|900|950';

const PATTERNS: readonly RegExp[] = [
    // var(--gray-100)
    new RegExp(`var\\(\\s*--(?:${SCALES})-(?:${STOPS})\\b`, 'g'),
    // var(--#{$color}-600) in a Sass loop
    new RegExp(`var\\(\\s*--#\\{\\$[\\w-]+\\}-(?:${STOPS})\\b`, 'g'),
    // `var(--${color}-600)` in a template literal
    new RegExp(`var\\(\\s*--\\$\\{[^}]+\\}-(?:${STOPS})\\b`, 'g')
];

// A non-zero entry would mean a package knowingly carries references to a scale that
// no longer exists. There is no such package, so this reads as a hard gate.
const BUDGET: Record<string, number> = {
    'packages/components': 0,
    'packages/statistics': 0,
    'packages/flow': 0,
    'packages/visuals': 0,
    'packages/application': 0,
    docs: 0,
    // Anything the buckets above do not name. Without it a hit in `packages/types`
    // or `packages/internals` lands in a bucket with no budget and passes.
    other: 0
};

type Hit = {
    readonly file: string;
    readonly line: number;
    readonly text: string;
};

function walk(directory: string, files: string[] = []): string[] {
    for (const entry of readdirSync(directory)) {
        const path = join(directory, entry);

        if (isSkipped(path)) {
            continue;
        }

        if (statSync(path).isDirectory()) {
            walk(path, files);
        } else if (EXTENSIONS.some(extension => path.endsWith(extension))) {
            files.push(path);
        }
    }

    return files;
}

function scan(file: string): Hit[] {
    const relativePath = relative('.', file);
    const hits: Hit[] = [];
    const lines = readFileSync(file, 'utf8').split('\n');

    lines.forEach((line, index) => {
        for (const pattern of PATTERNS) {
            for (const match of line.matchAll(pattern)) {
                hits.push({file: relativePath, line: index + 1, text: match[0].replace('var(', '').trim()});
            }
        }
    });

    return hits;
}

function bucketOf(file: string): string {
    return Object.keys(BUDGET).find(bucket => file.startsWith(bucket)) ?? 'other';
}

const hits = ROOTS.flatMap(root => walk(root)).flatMap(scan);
const counts = new Map<string, number>();

for (const hit of hits) {
    const bucket = bucketOf(hit.file);
    counts.set(bucket, (counts.get(bucket) ?? 0) + 1);
}

const over = Object.entries(BUDGET).filter(([bucket, budget]) => (counts.get(bucket) ?? 0) > budget);

if (over.length === 0) {
    console.log(`${hits.length} legacy palette references, all within budget`);
    process.exit(0);
}

const byFile = new Map<string, Hit[]>();

for (const hit of hits) {
    if (!over.some(([bucket]) => hit.file.startsWith(bucket))) {
        continue;
    }

    byFile.set(hit.file, [...(byFile.get(hit.file) ?? []), hit]);
}

console.error('Legacy palette references over budget:\n');

for (const [bucket, budget] of over) {
    console.error(`  ${bucket}: ${counts.get(bucket)} (budget ${budget})`);
}

console.error('');

for (const [file, fileHits] of [...byFile.entries()].sort((a, b) => b[1].length - a[1].length)) {
    console.error(`  ${file} (${fileHits.length})`);

    for (const hit of fileHits) {
        console.error(`    :${hit.line}  ${hit.text}`);
    }
}

console.error('\nMap these onto the semantic or intent layer. See packages/components/src/css/token/.');

process.exit(1);
