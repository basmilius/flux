import {readdirSync, readFileSync, statSync} from 'node:fs';
import {join} from 'node:path';

export const SPACING = /^(?:(?:padding|margin|inset)(?:-(?:block|inline))?(?:-(?:start|end|top|right|bottom|left))?|(?:row-|column-)?gap|top|right|bottom|left)$/;
export const DIMENSION = /^(?:min-|max-)?(?:height|width|block-size|inline-size)$/;
export const PIXELS = /(?<![\w.])(-?(?:\d*\.)?\d+)px\b/g;

export type Declaration = {
    readonly property: string;
    readonly value: string;
    readonly offset: number;
    readonly line: number;
    readonly selector: string;
};

export function cssFiles(paths: string[] = ['packages']): string[] {
    const files = new Set<string>();

    function walk(path: string): void {
        if (statSync(path).isDirectory()) {
            for (const name of readdirSync(path).sort()) {
                if (!['node_modules', 'dist', '.git'].includes(name)) {
                    walk(join(path, name));
                }
            }
        } else if (path.endsWith('.scss') && path.includes('/src/css/')) {
            files.add(path);
        }
    }

    paths.forEach(walk);
    return [...files].sort();
}

export function declarations(source: string): Declaration[] {
    // Preserve offsets while hiding comments, strings and Sass interpolation from the scanner.
    const masked = source.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|#\{[^}]*\}/g, value => value.replace(/[^\n]/g, ' '));
    const result: Declaration[] = [];
    const stack: string[] = [];
    let start = 0;
    let parentheses = 0;

    for (let index = 0; index < masked.length; index++) {
        const char = masked[index];
        if (char === '(') parentheses++;
        if (char === ')') parentheses--;
        if (parentheses !== 0) continue;

        if (char === '{') {
            stack.push(source.slice(start, index).trim());
            start = index + 1;
        } else if (char === '}') {
            stack.pop();
            start = index + 1;
        } else if (char === ';') {
            const text = masked.slice(start, index);
            const match = /^\s*([\w-]+)\s*:\s*([\s\S]*)$/.exec(text);
            if (match) {
                const offset = start + text.length - match[2].length;
                result.push({
                    property: match[1],
                    value: masked.slice(offset, index),
                    offset,
                    line: source.slice(0, offset).split('\n').length,
                    selector: stack.join(' > ').replace(/\s+/g, ' ')
                });
            }
            start = index + 1;
        }
    }

    return result;
}

export function gridReport(files: string[]): {counts: Record<string, number>; hits: unknown[]} {
    const counts: Record<string, number> = {};
    const hits: unknown[] = [];

    for (const file of files) {
        const bucket = file.split('/').slice(0, 2).join('/');
        counts[bucket] ??= 0;
        for (const declaration of declarations(readFileSync(file, 'utf8'))) {
            const isIconSize = declaration.property.endsWith('-icon-size') || (declaration.property === 'font-size' && /icon|spinner/i.test(declaration.selector.split(' > ').at(-1) ?? ''));
            if (!isIconSize && !SPACING.test(declaration.property) && !DIMENSION.test(declaration.property)) continue;

            for (const match of declaration.value.matchAll(PIXELS)) {
                const value = Math.abs(Number(match[1]));
                if (value % 3 === 0 || (!isIconSize && (value === 1 || value === 2))) continue;
                counts[bucket]++;
                hits.push({file, line: declaration.line, selector: declaration.selector, property: declaration.property, value: match[0]});
            }
        }
    }

    return {counts, hits};
}
