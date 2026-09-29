import {expect, test} from 'bun:test';
import {mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {declarations, gridReport} from './density-css';

test('reads nested and multiline declarations without treating comments or strings as CSS', () => {
    const source = `// height: 17px;
.field {
    content: 'width: 20px;';
    /* padding: 8px; */
    padding:
        6px 12px;
    &:is(input, button) {
        margin: calc(100% - 16px);
        --custom-#{$name}: 18px;
    }
}`;
    const rules = declarations(source);
    expect(rules.filter(rule => ['padding', 'margin', 'height', 'width'].includes(rule.property)).map(rule => [rule.property, rule.value.trim()])).toEqual([
        ['padding', '6px 12px'],
        ['margin', 'calc(100% - 16px)']
    ]);
    for (const rule of rules) {
        if (rule.property === 'padding' || rule.property === 'margin') {
            expect(source.slice(rule.offset, rule.offset + rule.value.length)).toBe(rule.value);
        }
    }
});

test('counts each off-grid occurrence, including negatives and calc, but excludes type and radius', () => {
    const directory = mkdtempSync(join(tmpdir(), 'flux-grid-'));
    const file = join(directory, 'fixture.scss');
    try {
        writeFileSync(file, '.field { padding: 8px 8px; margin: -4px 1px -2px 0px; height: calc(100% - 16px); gap: 1.5px; width: 33px; font-size: 14px; border-radius: 8px; }');
        expect(gridReport([file]).hits).toHaveLength(5);
    } finally {
        rmSync(directory, {recursive: true});
    }
});

test('checks icon and spinner sizes without treating label typography as icon geometry', () => {
    const directory = mkdtempSync(join(tmpdir(), 'flux-icon-grid-'));
    const file = join(directory, 'fixture.scss');
    try {
        writeFileSync(file, ':root { --control-icon-size: 16px; } .paneHeaderIcon { font-size: 16px; } .spinner { font-size: 20px; } .icon { font-size: 2px; } .control { .icon { font-size: 15px; } .label { font-size: 14px; } } .chipIcon { font-size: calc(var(--control-icon-size) - 3px); }');
        expect(gridReport([file]).hits).toHaveLength(4);
    } finally {
        rmSync(directory, {recursive: true});
    }
});
