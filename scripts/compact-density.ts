import {execFileSync} from 'node:child_process';
import {readFileSync, writeFileSync} from 'node:fs';
import {cssFiles, declarations, PIXELS, SPACING} from './density-css';

const MAPPING: Record<number, number> = {9: 6, 12: 9, 15: 12, 21: 15, 27: 21, 30: 24, 36: 27, 42: 33, 48: 36, 54: 42, 60: 45};
const PROTECTED = /\/(?:base|mixin|token)\/|\/(?:variables|typography|comfortable)\.scss$|\/(?:Button|Form\w*|Pane|SegmentedControl|Badge|Slider)\.module\.scss$/;
const CONTROL_HEIGHTS = new Set(['.menuItem', '.breadcrumbLink', '.tabPill', '.chip', '.expandableHeader', '.commandPaletteSearch']);
const args = process.argv.slice(2);
if (args.some(arg => !['--write', '--json'].includes(arg))) throw new Error('Usage: bun scripts/compact-density.ts [--write] [--json]');
const changes: {file: string; before: string; after: string; lines: number}[] = [];
const manual: {file: string; line: number; selector: string; property: string; value: string; reason: string}[] = [];

for (const file of cssFiles()) {
    if (PROTECTED.test(file)) continue;
    const source = execFileSync('git', ['show', `main:${file}`], {encoding: 'utf8'});
    let after = source;
    const changedLines = new Set<number>();

    for (const declaration of declarations(source).reverse()) {
        const spacing = SPACING.test(declaration.property) && !/^(?:top|right|bottom|left)$/.test(declaration.property);
        const controlHeight = declaration.property === 'height' && CONTROL_HEIGHTS.has(declaration.selector);
        if (!spacing && !controlHeight) continue;
        if (/(?:icon|avatar|image|media)/i.test(declaration.selector)) continue;

        for (const match of [...declaration.value.matchAll(PIXELS)].reverse()) {
            const old = Number(match[1]);
            const size = Math.abs(old);
            const reason = [18, 24].includes(size) ? 'Ambiguous spacing' : /[()$#]/.test(declaration.value) ? 'Coupled geometry or expression' : '';
            if (reason) {
                manual.push({file, line: declaration.line, selector: declaration.selector, property: declaration.property, value: match[0], reason});
                continue;
            }
            if (!(size in MAPPING)) continue;
            const offset = declaration.offset + match.index!;
            after = after.slice(0, offset) + `${Math.sign(old) * MAPPING[size]}px` + after.slice(offset + match[0].length);
            changedLines.add(declaration.line);
        }
    }

    if (source !== after) changes.push({file, before: source, after, lines: changedLines.size});
}

if (args.includes('--write')) {
    // This mapping is not idempotent; compare against main before touching any file.
    for (const change of changes) {
        const current = readFileSync(change.file, 'utf8');
        if (current !== change.before && current !== change.after) throw new Error(`Refusing to overwrite edits in ${change.file}`);
    }
    for (const change of changes) writeFileSync(change.file, change.after);
}

const report = {
    mode: args.includes('--write') ? 'write' : 'dry-run',
    files: changes.map(({file, lines}) => ({file, lines})),
    changedLines: changes.reduce((sum, change) => sum + change.lines, 0),
    manual: manual.reverse()
};
console.log(JSON.stringify(report, null, 4));
