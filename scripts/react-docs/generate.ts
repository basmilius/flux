import { writeGenerated } from './files';
import './examples';
import { mkdirSync, readFileSync, unlinkSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { api, root } from './api';
import { adaptations, unsupported } from './notes';
import {componentComparison} from './parity';

const docs = resolve(root, 'docs');
const examples = JSON.parse(
    readFileSync(resolve(docs, '.vitepress/react/examples.json'), 'utf8')
) as Record<string, { file?: string; reason?: string }>;
const pages = [...new Bun.Glob('**/*.md').scanSync({ cwd: docs, onlyFiles: true })]
    .filter((file) => !/^(node_modules|react|react-guide|react-examples|\.vitepress)\//.test(file))
    .sort();
const manifest: string[] = [];
const camel = (value: string) => value.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
const used = new Set<string>();
const gaps: { page: string; example: string; reason: string }[] = [];
function limitation(page: string, file: string): string {
    const reason = unsupported[file];
    if (!reason)
        throw new Error(
            `Undocumented React example: ${file} on ${page}. ${examples[file]?.reason ?? ''}`
        );
    if (!gaps.some((gap) => gap.page === page && gap.example === file))
        gaps.push({ page, example: file, reason });
    return `::: info React API limitation\n${reason}\n:::`;
}
for (const file of new Bun.Glob('**/*.md').scanSync(resolve(docs, 'react'))) {
    if (!['status.md', 'parity.md'].includes(file) && !pages.includes(file)) unlinkSync(resolve(docs, 'react', file));
}

for (const [file, example] of Object.entries(examples)) {
    if (!example.file) continue;
    manifest.push(
        `${JSON.stringify(file)}: () => import(${JSON.stringify('../../' + relative(docs, example.file))})`
    );
}

function prose(content: string, component?: string): string {
    return content
        .replace(
            /@flux-ui\/(?:components|application|ai|flow|statistics|visuals|internals|types)/g,
            '@flux-ui/react'
        )
        .replace(/\bVue 3\b/g, 'React')
        .replace(/\bVue markup\b/g, 'JSX')
        .replace(/Vue's injection system/g, 'React context')
        .replace(/\bVNode\b/g, 'React element')
        .replace(/\bVue Router\b/g, 'your router')
        .replace(/\.vue(?=\])/g, '.tsx')
        .replace(/\bv-model(?::[\w-]+)?\b/g, 'a controlled value and change callback')
        .replace(/default slot/g, 'children')
        .replace(/named slots/g, 'named content props')
        .replace(/scoped slots/g, 'render props')
        .replace(/\bslots?\b(?=\s|[,;]|\.(?:\s|$))/g, (word) =>
            word === 'slot' ? 'content prop' : 'content props'
        )
        .replace(/`v-if`/g, 'conditional rendering')
        .replace(/`([a-z][\w-]+)`/g, (text, name) => {
            const properties = component ? api.get(component)?.props : undefined;
            const candidate = camel(name);
            const callback = 'on' + candidate[0].toUpperCase() + candidate.slice(1);
            return properties?.some((property) => property.name === candidate)
                ? '`' + candidate + '`'
                : properties?.some((property) => property.name === callback)
                  ? '`' + callback + '`'
                  : text;
        })
        .replace(/emits (`on\w+`)/g, 'calls $1')
        .replace(/\bcomposables\b/g, 'hooks')
        .replace(/\bComposable\b/g, 'Hook')
        .replace(/\bcomposable\b/g, 'hook')
        .replace(/(\]\(|(?:href|url|link)=['"])(\/(?!\/|assets\/|react\/))/g, '$1/react/');
}

function mainComponent(path: string, source: string): string | undefined {
    if (path.endsWith('/index.md') && path.split('/').length === 2) return undefined;
    const action =
        'show' +
        path
            .split('/')
            .at(-1)!
            .replace('.md', '')
            .replace(/^./, (c) => c.toUpperCase());
    if (path.includes('/attention/') && api.has(action)) return action;
    const paths = [...source.matchAll(/(?:example|render)=(.+?)\.vue/g)].map((match) =>
        resolve(docs, dirname(path), match[1] + '.vue')
    );
    for (const match of source.matchAll(/<<< @\/(.+?\.vue)/g)) paths.push(resolve(docs, match[1]));
    const candidates = new Set<string>();
    for (const file of paths) {
        try {
            for (const name of readFileSync(file, 'utf8').matchAll(/\bFlux[A-Z]\w+\b/g))
                if (api.has(name[0])) candidates.add(name[0]);
        } catch {}
    }
    const words = path
        .replace(/\.md$/, '')
        .split(/[\/-]/)
        .filter((w) => !['components', 'index', 'layout', 'charts'].includes(w))
        .map((w) => (w === 'ranged' ? 'range' : w));
    const normalize = (name: string) => name.toLowerCase().replace(/[^a-z]/g, '');
    const score = (name: string) =>
        words.reduce(
            (sum, word) => sum + (normalize(name).includes(word.toLowerCase()) ? word.length : -1),
            0
        ) -
        name.length / 100;
    if (!candidates.size)
        for (const name of api.keys())
            if (
                name.startsWith('Flux') &&
                words.every((word) => normalize(name).includes(word.toLowerCase()))
            )
                candidates.add(name);
    return [...candidates]
        .filter((name) => score(name) > 0 && normalize(name).includes(words.at(-1)!.toLowerCase()))
        .sort((a, b) => score(b) - score(a))[0];
}

for (const page of pages) {
    const override = resolve(docs, 'react-guide', page);
    let source = readFileSync(Bun.file(override).size ? override : resolve(docs, page), 'utf8');
    const original = source;
    const header = source.match(/^---\n([\s\S]*?)\n---\n/);
    const old = header ? (Bun.YAML.parse(header[1]) as any) : {};
    if (header) source = source.slice(header[0].length);
    const component = mainComponent(page, source);
    const frontmatter: Record<string, unknown> = {
        outline: 'deep',
        ...Object.fromEntries(
            Object.entries(old).filter(
                ([key]) => !['props', 'emits', 'slots', 'requiredIcons'].includes(key)
            )
        )
    };
    if (component) {
        const properties = api.get(component)!.props;
        const descriptions = new Map(
            (old.props ?? []).map((p: any) => [camel(p.name), p.description])
        );
        const documentedNative = new Set([
            ...(old.props ?? []).map((p: any) => camel(p.name)),
            ...(old.emits ?? []).map(
                (p: any) => 'on' + p.name[0].toUpperCase() + camel(p.name).slice(1)
            ),
            'children',
            'className',
            'style'
        ]);
        frontmatter.props = properties
            .filter((p) => !p.native || documentedNative.has(p.name))
            .map((p) => ({
                name: p.name,
                type: p.type,
                optional: p.optional,
                ...(p.default === undefined ? {} : { default: p.default }),
                ...(descriptions.has(p.name)
                    ? { description: prose(String(descriptions.get(p.name)), component) }
                    : {})
            }));
        if (old.requiredIcons) frontmatter.requiredIcons = old.requiredIcons;
    }
    for (const match of original.matchAll(/import\s+(\w+)\s+from\s+['"]([^'"]+\.vue)['"]/g)) {
        const file = relative(resolve(docs, 'code'), resolve(docs, dirname(page), match[2]));
        const example = examples[file];
        used.add(file);
        source = source.replace(
            new RegExp('<' + match[1] + '\\b[^>]*\\/>', 'g'),
            example?.file
                ? `<ReactExample example=${JSON.stringify(file)}${old.layout === false || old.layout === 'page' ? ' bare' : ''}/>`
                : '\n\n' + limitation(page, file) + '\n\n'
        );
    }

    source = source.replace(/::: (?:info|tip|warning) Accessibility\n[\s\S]*?\n:::/g, '');
    if (page === 'components/data-table.md')
        source = source.replace(
            /The data table does \*\*not\*\* paginate[^\n]+/,
            'Pass the current page of rows through `items`. The React table renders up to `perPage` items from that array; it does not calculate an offset from `page`. Update the supplied rows in `onNavigate` and `onLimit`.'
        );
    if (page === 'components/sheet.md')
        source = source.replace(
            /The sheet never closes itself\.[^\n]+/,
            'Control visibility with `open` and update that state in `onClose`. See the React props below for the currently supported interactions.'
        );
    if (page === 'components/form/select/index.md')
        source = source.replace(
            /(# Select\n)/,
            '$1\nThe current React implementation uses a native HTML select, with a separate search input when enabled. The browser controls the dropdown appearance and keyboard behavior.\n'
        );
    source = source.replace(
        /The layout watches `route\.matched`[^\n]+/g,
        'Use your router’s location state to control the React overlay. Named views and view keys are not part of this React API.'
    );
    source = source.replace(
        /Pair the (?:overlay|slide over) with[^\n]+/g,
        'Control visibility with the `open` prop and handle `onClose`. Router-driven overlays need integration with your chosen React router; this branch has no named-view adapter.'
    );
    source = source.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
    source = source.replace(
        /::: (render|example)([^\n]*)\n[\s\S]*?(?:render|example)=(.+?)\.vue[\s\S]*?\n:::/g,
        (_, kind, caption, path) => {
            const file = relative(
                resolve(docs, 'code'),
                resolve(docs, dirname(page), path + '.vue')
            );
            used.add(file);
            const example = examples[file];
            const title = caption.split('||')[0].trim();
            const description = adaptations[file] ?? caption.split('||')[1]?.trim();
            const heading = kind === 'example' && title ? `### ${title}\n\n` : '';
            if (!example?.file) {
                return heading + limitation(page, file);
            }
            const code = readFileSync(example.file, 'utf8');
            return `${heading}${description ? description + '\n\n' : ''}<ReactExample example=${JSON.stringify(file)}/>\n\n${kind === 'example' ? '::: details React source\n\n```tsx\n' + code + '\n```\n\n:::' : ''}`;
        }
    );
    source = source.replace(/^<<< @\/code\/(.+?\.(?:vue|ts))[^\n]*$/gm, (_, file) => {
        used.add(file);
        const example = examples[file];
        if (!example?.file) {
            return '\n' + limitation(page, file) + '\n';
        }
        return '\n```tsx\n' + readFileSync(example.file, 'utf8') + '\n```\n';
    });
    source = source.replace(
        /```(vue|typescript|javascript|tsx|jsx|ts|js)\b[^\n]*\n([\s\S]*?)```/g,
        (block, language, code) => {
            if (language === 'tsx' && !/\bfrom ['"]vue/.test(code)) return block;
            if (
                language === 'vue' ||
                /from ['"](?:vue|vue-router|vue-i18n|@basmilius\/common)|<template|defineProps|defineEmits|\.vue['"]|\bref\(|\bunref\(|\bcomputed\(/.test(
                    code
                )
            ) {
                if (/\/(composables|api|utils)\//.test(page) && api.has(page.split('/').at(-1)!.replace('.md', ''))) return '';
                throw new Error(`Vue-only snippet remains in ${page}; add a React guide override.`);
            }
            return block;
        }
    );
    if (!component) source = source.replace(/<FrontmatterDocs\s*\/>/g, '');
    else
        source = source.replace(
            /<FrontmatterDocs\s*\/>/g,
            `## Import\n\n\`\`\`tsx\nimport { ${component} } from '@flux-ui/react';\n\`\`\`\n\n<FrontmatterDocs/>`
        );
    if (component && !source.includes('<FrontmatterDocs/>')) source += '\n\n<FrontmatterDocs/>\n';
    if (page.includes('/composables/') || page.includes('/api/') || page.includes('/utils/')) {
        const name = page.split('/').at(-1)!.replace('.md', '');
        const entry = api.get(name);
        if (entry)
            source = `# ${name}\n\nImport this function from \`@flux-ui/react\`. Its current React signature is:\n\n\`\`\`ts\n${name}${entry.signature};\n\`\`\`\n\n${name.startsWith('use') ? 'Call hooks at the top level of a React function component.\n' : ''}\nSee [port status](/react/status) for behavior that still differs from the original implementation.\n`;
    }
    if (page === 'index.md') {
        frontmatter.layout = 'home';
        frontmatter.hero = {
            name: 'Flux',
            text: 'An opinionated component library',
            tagline: 'Created for React',
            actions: [
                {
                    theme: 'brand',
                    text: 'Get started',
                    link: '/react/guide/introduction/installation/manual'
                },
                { theme: 'alt', text: 'Components', link: '/react/components/' },
                { theme: 'alt', text: 'Port status', link: '/react/status' }
            ]
        };
        frontmatter.features = [
            {
                title: 'Flux components',
                details:
                    'Forms, tables, navigation, dialogs and application layouts, rendered with React.',
                link: '/react/components/',
                linkText: 'Browse components'
            },
            {
                title: 'Shared design',
                details:
                    'The same Flux tokens and styles, with React props, callbacks and children.',
                link: '/react/guide/introduction/installation/manual',
                linkText: 'Get started'
            }
        ];
        source =
            '```sh\nbun add @flux-ui/react react react-dom\n```\n\nThe React port is under review. See [port status](/react/status) for known gaps.\n';
    }
    const target = resolve(docs, 'react', page);
    mkdirSync(dirname(target), { recursive: true });
    writeGenerated(
        target,
        '---\n' + JSON.stringify(frontmatter, null, 2) + '\n---\n\n' + prose(source, component)
    );
}
const ready = [...used].filter((file) => examples[file]?.file).length;
const counts = {
    pages: pages.length,
    referencedExamples: used.size,
    readyExamples: ready,
    documentedLimitations: used.size - ready
};
const status = `# React port status

These docs reuse the Flux documentation layout and navigation. Live previews render \`@flux-ui/react\`; prop tables come from the React source types. Each example is typechecked before it is included.

${counts.pages} pages, ${counts.readyExamples} checked React examples and ${counts.documentedLimitations} documented unsupported variants. The docs build rejects missing examples without an explicit API limitation. Type checks do not establish visual or behavioral parity.

## Branch update

Merged \`origin/main\` at \`4ecf59d0\` into \`feat/react-components\` on 7 October 2026 (merge \`6ce4d91b\`). The React package builds and its export audit covers the current upstream exports. Tree components, table alignment, activity dates and statistics loading states now include the additions from main.

## Changes from the component comparison

Expandable and menu bodies now animate their height. Expandable groups open the first item and emit close events when another item opens. Tab bars measure and animate the selected indicator and expose scroll controls. Tabs animate between keyed panels. Read-more controls measure overflow before offering a toggle. Carousels expose next/previous render props.

The playground uses the original composition, datasets, application shell, patterns and floating palette inspector, translated to React. Preview containers share the Vue stylesheet. CSS-module examples no longer add layout wrappers, and table-cell direction and spacing survive conversion.

Range-control state belongs to its own playground component. Dragging sliders, faders or the color picker no longer rerenders the entire page. A browser regression check compares all four controls with Vue, verifies their final values and rejects updates that rerender unrelated tables. Run it with \`bun run --cwd docs test:react-performance\` while the dev server is running.

Sliders and range sliders use the Vue track/thumb structure with continuous pointer dragging, keyboard input, ticks and tooltips. The color picker uses a contained saturation plane, hue and opacity sliders. Tables use Flux checkboxes. Context menus clamp to the viewport; nested menus open on hover and support directional keyboard navigation. Masonry measures visible grid items across display-contents wrappers. Date and date-range fields use Flux calendar flyouts.

See the [component comparison](/react/parity) for the full source/API inventory and the limits of the browser checks.

## Remaining library work

- Check transition timing for nested dialogs and interrupted animations across browsers. React now uses the shared enter/leave classes, retained leaving content and keyed window transitions.
- Complete calendar time-grid layout, automatic responsive views, keyboard rescheduling and resizing. Month-view drag and drop works through onReschedule.
- Complete sheet content-to-drag handoff, wheel gestures and spring physics. Snap points, grabber dragging and keyboard resizing are implemented.
- Connect the compatibility injection hooks to the component contexts and complete localization beyond the supplied English dictionary.
- Review visual parity, keyboard navigation, focus handling and screen-reader behavior across the component families. Selects and comboboxes now use Flux popups. The focused browser checks do not certify every state of each specialized control.
- Verify React 18 compatibility, routing integrations, server rendering and published package installation before release. The development checks use React 19.

## Unsupported variants

These are library limitations, not missing documentation examples. Supported compositions are shown on the relevant pages where possible.

| Page | Variant | Current behavior |
| --- | --- | --- |
${gaps.map((gap) => `| [${gap.page.replace('.md', '')}](/react/${gap.page.replace('.md', '')}) | ${gap.example.split('/').at(-1)!.replace('.vue', '')} | ${gap.reason.replaceAll('|', '\\|')} |`).join('\n')}
`;
writeGenerated(resolve(docs, 'react/status.md'), status);
writeGenerated(resolve(docs, 'react/parity.md'), componentComparison());
writeGenerated(
    resolve(docs, '.vitepress/react/manifest.ts'),
    `export default {\n${manifest.filter((line) => used.has(JSON.parse(line.slice(0, line.indexOf(':'))))).join(',\n')}\n};\n`
);
writeGenerated(resolve(docs, '.vitepress/react/previewExamples.ts'), `export const previewExamples = new Set(${JSON.stringify([...used].filter(file => /<Preview(?:\s|>)/.test(readFileSync(resolve(docs, 'code', file), 'utf8'))))});\n`);
console.log('React docs:', JSON.stringify(counts));
