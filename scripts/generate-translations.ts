#!/usr/bin/env bun

// Writes the pre-translated yaml and json blocks on the translations pages from
// the English dictionary that ships with each package plus the translations kept
// in `docs/.vitepress/data/translations`. Run with `--check` to fail instead of
// write, which is what CI does to keep the pages from drifting away from the
// strings the packages actually hold.

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

type Messages = Record<string, string>;

type Target = {
    readonly name: string;
    readonly page: string;
    readonly dictionary: string;
    readonly translations: string;
};

const LANGUAGES = [
    {code: 'en', heading: 'English'},
    {code: 'nl', heading: 'Dutch - Nederlands'},
    {code: 'fr', heading: 'French - Français'},
    {code: 'de', heading: 'German - Deutsch'},
    {code: 'sv', heading: 'Swedish - Svenska'}
] as const;

const TARGETS: readonly Target[] = [
    {
        name: 'components',
        page: 'docs/guide/introduction/translations.md',
        dictionary: 'packages/components/src/data/i18n.ts',
        translations: 'docs/.vitepress/data/translations/components.ts'
    },
    {
        name: 'ai',
        page: 'docs/ai/introduction/translations.md',
        dictionary: 'packages/ai/src/data/i18n.ts',
        translations: 'docs/.vitepress/data/translations/ai.ts'
    },
    {
        name: 'application',
        page: 'docs/application/introduction/translations.md',
        dictionary: 'packages/application/src/data/i18n.ts',
        translations: 'docs/.vitepress/data/translations/application.ts'
    },
    {
        name: 'flow',
        page: 'docs/flow/introduction/translations.md',
        dictionary: 'packages/flow/src/data/i18n.ts',
        translations: 'docs/.vitepress/data/translations/flow.ts'
    }
];

const START = '<!-- translations:start -->';
const END = '<!-- translations:end -->';

const root = resolve(import.meta.dirname, '..');
const isCheck = process.argv.includes('--check');

let hasFailed = false;

for (const target of TARGETS) {
    const {english} = await import(resolve(root, target.dictionary)) as { english: Messages };
    const translations = await import(resolve(root, target.translations)) as Record<string, Messages>;
    const keys = Object.keys(english);

    const blocks = LANGUAGES.map(({code, heading}) => {
        const messages = code === 'en' ? english : translations[code];

        if (!messages) {
            throw new Error(`${target.translations} has no \`${code}\` export.`);
        }

        const missing = keys.filter(key => !(key in messages));
        const extra = Object.keys(messages).filter(key => !keys.includes(key));

        if (missing.length > 0 || extra.length > 0) {
            hasFailed = true;
            console.error(`✗ ${target.name} (${code}): ${describeDifference(missing, extra)}`);
            return null;
        }

        const tree = toTree(keys.map(key => [key, messages[key]]));

        return [
            `### ${heading}`,
            '',
            '::: code-group',
            '',
            `\`\`\`yaml [${code}.yaml]`,
            toYaml(tree, 0),
            '```',
            '',
            `\`\`\`json [${code}.json]`,
            JSON.stringify(tree, null, 2),
            '```',
            '',
            ':::'
        ].join('\n');
    });

    if (blocks.includes(null)) {
        continue;
    }

    const path = resolve(root, target.page);
    const page = readFileSync(path, 'utf-8');
    const start = page.indexOf(START);
    const end = page.indexOf(END);

    if (start === -1 || end === -1) {
        throw new Error(`${target.page} has no ${START} / ${END} markers.`);
    }

    const next = `${page.slice(0, start + START.length)}\n\n${blocks.join('\n\n')}\n\n${page.slice(end)}`;

    if (next === page) {
        console.log(`✓ ${target.name} (${keys.length} keys)`);
        continue;
    }

    if (isCheck) {
        hasFailed = true;
        console.error(`✗ ${target.name}: ${target.page} is out of date, run \`bun scripts/generate-translations.ts\`.`);
        continue;
    }

    writeFileSync(path, next);
    console.log(`✎ ${target.name} (${keys.length} keys)`);
}

if (hasFailed) {
    process.exit(1);
}

function describeDifference(missing: readonly string[], extra: readonly string[]): string {
    return [
        missing.length > 0 ? `missing ${missing.join(', ')}` : null,
        extra.length > 0 ? `unknown ${extra.join(', ')}` : null
    ].filter(Boolean).join('; ');
}

// Dotted keys are what the components ask for, nested objects are what vue-i18n
// wants in its message files.
function toTree(entries: readonly (readonly [string, string])[]): Record<string, unknown> {
    const tree: Record<string, unknown> = {};

    for (const [key, value] of entries) {
        const path = key.split('.');
        let node = tree;

        for (const segment of path.slice(0, -1)) {
            node[segment] ??= {};
            node = node[segment] as Record<string, unknown>;
        }

        node[path.at(-1)!] = value;
    }

    return tree;
}

function toYaml(tree: Record<string, unknown>, depth: number): string {
    const indent = '  '.repeat(depth);

    return Object.entries(tree)
        .map(([key, value]) => typeof value === 'string'
            ? `${indent}${key}: ${quote(value)}`
            : `${indent}${key}:\n${toYaml(value as Record<string, unknown>, depth + 1)}`)
        .join('\n');
}

function quote(value: string): string {
    return `"${value.replaceAll('\\', '\\\\').replaceAll('"', '\\"')}"`;
}
