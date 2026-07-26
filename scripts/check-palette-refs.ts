/**
 * Fails on any reference to the deprecated mirrored palette.
 *
 * `token/legacy.scss` holds the old scale frozen so nothing breaks mid
 * migration, which also means nothing stops a new `var(--gray-100)` from being
 * written. This turns the remaining references into a number that can only go
 * down: lower BUDGET as the sweep lands, never raise it.
 *
 *   bun scripts/check-palette-refs.ts
 */

import {readdirSync, readFileSync, statSync} from 'node:fs';
import {join, relative} from 'node:path';

const ROOTS = ['packages', 'docs'];
const EXTENSIONS = ['.scss', '.css', '.ts', '.tsx', '.js', '.vue', '.md'];

const SKIP_DIRECTORIES = ['node_modules', 'dist', '.vitepress/cache', '.vitepress/dist', '.git'];

// The one file that is allowed to name the old scale: it is the definition, and
// it goes away in the next major together with its two includes in base.scss.
const ALLOWED = ['packages/components/src/css/token/legacy.scss'];

const SCALES = 'gray|primary|danger|info|success|warning';
const STOPS = '25|50|100|200|300|400|500|600|700|800|900|950';

const PATTERNS: readonly (readonly [string, RegExp])[] = [
    // var(--gray-100)
    ['literal', new RegExp(`var\\(\\s*--(?:${SCALES})-(?:${STOPS})\\b`, 'g')],
    // var(--#{$color}-600) in a Sass loop
    ['sass', new RegExp(`var\\(\\s*--#\\{\\$[\\w-]+\\}-(?:${STOPS})\\b`, 'g')],
    // `var(--${color}-600)` in a template literal
    ['template', new RegExp(`var\\(\\s*--\\$\\{[^}]+\\}-(?:${STOPS})\\b`, 'g')]
];

// Everything still outstanding, per package. Drive these to zero; never raise one.
const BUDGET: Record<string, number> = {
    'packages/components': 316,
    'packages/statistics': 51,
    'packages/flow': 36,
    'packages/visuals': 14,
    'packages/application': 10,
    docs: 100
};

type Hit = {
    readonly file: string;
    readonly line: number;
    readonly kind: string;
    readonly text: string;
};

function walk(directory: string, files: string[] = []): string[] {
    for (const entry of readdirSync(directory)) {
        const path = join(directory, entry);

        if (SKIP_DIRECTORIES.some(skip => path.includes(skip))) {
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

    if (ALLOWED.includes(relativePath)) {
        return [];
    }

    const hits: Hit[] = [];
    const lines = readFileSync(file, 'utf8').split('\n');

    lines.forEach((line, index) => {
        for (const [kind, pattern] of PATTERNS) {
            for (const match of line.matchAll(pattern)) {
                hits.push({file: relativePath, line: index + 1, kind, text: match[0].replace('var(', '').trim()});
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
