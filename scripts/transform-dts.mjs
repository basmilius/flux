#!/usr/bin/env node
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(new URL('..', import.meta.url).pathname);

const TARGET_DIRS = [
    'packages/components/dist',
    'packages/application/dist',
    'packages/statistics/dist'
];

function walk(dir) {
    const out = [];
    try {
        statSync(dir);
    } catch {
        return out;
    }
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) {
            out.push(...walk(path));
        } else if (entry.isFile() && path.endsWith('.vue.d.ts')) {
            out.push(path);
        }
    }
    return out;
}

function findBalancedSemicolon(text, start) {
    let depth = 0;
    for (let i = start; i < text.length; i++) {
        const c = text[i];
        const prev = text[i - 1];
        if (c === '<' || c === '{' || c === '(' || c === '[') {
            depth++;
        } else if (c === '>' && prev !== '=' && prev !== '-') {
            depth--;
        } else if (c === '}' || c === ')' || c === ']') {
            depth--;
        } else if (c === ';' && depth === 0) {
            return i;
        }
    }
    return -1;
}

function transform(source) {
    if (!source.includes('typeof __VLS_export')) {
        return source;
    }

    const declMatch = /^declare const __VLS_export:\s*/m.exec(source);
    if (!declMatch) {
        return source;
    }

    const bodyStart = declMatch.index + declMatch[0].length;
    const semiIndex = findBalancedSemicolon(source, bodyStart);
    if (semiIndex === -1) {
        return source;
    }

    const body = source.slice(bodyStart, semiIndex).trim();

    let declEnd = semiIndex + 1;
    if (source[declEnd] === '\n') {
        declEnd++;
    }

    const withoutExport = source.slice(0, declMatch.index) + source.slice(declEnd);

    const defaultRe = /declare const _default: typeof __VLS_export;/;
    if (!defaultRe.test(withoutExport)) {
        return source;
    }

    return withoutExport.replace(defaultRe, `declare const _default: ${body};`);
}

let scanned = 0;
let transformed = 0;

for (const dir of TARGET_DIRS) {
    const files = walk(join(ROOT, dir));
    for (const file of files) {
        scanned++;
        const source = readFileSync(file, 'utf8');
        const result = transform(source);
        if (result !== source) {
            writeFileSync(file, result, 'utf8');
            transformed++;
        }
    }
}

console.log(`[transform-dts] scanned ${scanned} file(s), transformed ${transformed}`);
