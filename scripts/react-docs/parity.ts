import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {parse} from '../../docs/node_modules/vue/compiler-sfc';
import ts from '../../packages/react/node_modules/typescript';
import {api, options, root} from './api';

const aliases: Record<string, string[]> = {
    tag: ['as', 'tag'],
    tagName: ['as', 'tag'],
    tabindex: ['tabIndex'],
    ariaLabel: ['ariaLabel', 'aria-label'],
    modelValue: ['value', 'checked'],
    isExpanded: ['isExpanded', 'expanded'],
    isOpened: ['open', 'isOpened'],
    isOpen: ['open', 'isOpen']
};
const eventAliases: Record<string, string[]> = {
    mouseenter: ['onMouseEnter'],
    mouseleave: ['onMouseLeave'],
    dblclick: ['onDoubleClick'],
    limit: ['onLimit', 'onLimitChange'],
    open: ['onOpen', 'onOpenChange'],
    close: ['onClose', 'onOpenChange']
};

const behavioralGaps: Record<string, string> = {
    FluxBreadcrumb: 'Automatic collapse and width measurement are missing.',
    FluxCalendar:
        'Day/week time-grid placement, responsive view selection, resizing and keyboard rescheduling are incomplete.',
    FluxContextMenu: 'Pointer positioning, viewport clamping, dismissal and nested ownership are implemented; touch long-press needs device testing.',
    FluxFlyout: 'Placement, focus return and nested flyout behavior need further comparison.',
    FluxFormFader: 'Dragging, value animation, ticks and text avoidance are implemented; elastic overdrag still differs.',
    FluxFormRangeFader: 'Uses one track and two thumbs; elastic overdrag still differs.',
    FluxFormRepeater: 'Keyboard reordering exists; pointer reordering and insertion indicators are missing.',
    FluxMenuFlyout:
        'Hover, keyboard navigation and nested popup ownership are implemented. Pointer prediction still uses a simpler timing and velocity model than Vue.',
    FluxMenuCollapsible:
        'Controlled opening and animation are implemented; automatic route matching is not connected to a router.',
    FluxSheet:
        'Grabber dragging, snap points and keyboard resizing are implemented; content scroll handoff, wheel gestures and spring motion still differ.',
    FluxVisualHighlighter: 'Uses CSS decorations rather than the Vue drawing and replay behavior.',
    FluxVisualHighlighterGroup: 'Group sequencing and viewport-triggered drawing differ.',
    FluxVisualSlotText: 'Per-call enter/leave options on flash are missing.'
};

export function componentComparison(): string {
    const files = [
        ...new Bun.Glob(
            'packages/{components,application,ai,flow,statistics,visuals}/src/**/Flux*.vue'
        ).scanSync(root)
    ].sort();
    const sources = new Map(
        files.map((file) => {
            const {descriptor} = parse(readFileSync(resolve(root, file), 'utf8'));
            return [
                resolve(root, file + '.ts'),
                (descriptor.scriptSetup?.content ?? '') + '\n' + (descriptor.script?.content ?? '')
            ];
        })
    );
    const host = ts.createCompilerHost(options);
    const read = host.readFile.bind(host);
    const exists = host.fileExists.bind(host);
    host.readFile = (path) => sources.get(path) ?? read(path);
    host.fileExists = (path) => sources.has(path) || exists(path);
    const program = ts.createProgram([...sources.keys()], options, host);
    const checker = program.getTypeChecker();
    const rows = files.map((file) => {
        const source = program.getSourceFile(resolve(root, file + '.ts'))!;
        const name = file.split('/').at(-1)!.slice(0, -4);
        const react = api.get(name);
        const props: string[] = [];
        const events: string[] = [];
        function visit(node: ts.Node): void {
            if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
                const call = node.expression.text;
                const type = node.typeArguments?.[0];
                if (type && (call === 'defineProps' || call === 'defineEmits')) {
                    (call === 'defineProps' ? props : events).push(
                        ...checker
                            .getTypeAtLocation(type)
                            .getProperties()
                            .map((symbol) => symbol.name)
                    );
                }
                if (call === 'defineModel')
                    props.push(
                        node.arguments[0] && ts.isStringLiteral(node.arguments[0])
                            ? node.arguments[0].text
                            : 'modelValue'
                    );
            }
            ts.forEachChild(node, visit);
        }
        visit(source);
        const missing = props.filter(
            (prop) => !react?.props.some((candidate) => (aliases[prop] ?? [prop]).includes(candidate.name))
        );
        const missingEvents = events.filter(
            (event) =>
                !event.includes(':') &&
                !react?.props.some((candidate) =>
                    (eventAliases[event] ?? ['on' + event[0].toUpperCase() + event.slice(1)]).includes(
                        candidate.name
                    )
                )
        );
        const differences = [
            missing.length ? `Props: ${missing.map((name) => '`' + name + '`').join(', ')}.` : '',
            missingEvents.length
                ? `Events: ${missingEvents.map((name) => '`' + name + '`').join(', ')}.`
                : '',
            behavioralGaps[name] ?? ''
        ]
            .filter(Boolean)
            .join(' ');
        return {name, file, public: Boolean(react), differences};
    });
    return `# Component comparison

Compared ${rows.length} Vue source files with ${rows.filter((row) => row.public).length} same-name public React exports after merging origin/main. This inventory checks declared props and events and records concrete source-level behavior differences. Native React event names and model callbacks use React conventions.

An empty difference column is **not** a visual or behavioral pass. The browser regression checks cover disclosure animations, tab indicators, the playground composition, repeated scrolling, context menus, nested menu hover and keyboard navigation, pointer dragging on sliders and faders, the color plane and hue slider, table selection, select popups, palette inspection, carousel controls and the docs render crawl. A computed-style and geometry audit compares 1,322 Vue/React examples; six standalone application snippets require a parent application context. Style differences remain review findings, not passing visual assertions. Other interactions still need browser coverage. Seven Vue implementation components are internal or represented through a different React composition.

## Findings that affect release readiness

The port is not yet equivalent to Vue. Calendar time grids, pointer reordering, advanced menu prediction, elastic fader overdrag and sheet physics need further work. Compatibility injection hooks also remain disconnected from several component contexts. English interpolation alone does not reproduce the Vue localization layer. React 18, server rendering and router integration have not been validated by the current React 19 docs checks.

## Reproduce browser checks

Run the docs server on port 5174, then run \`bun run --cwd docs test:react-browser\`. The tests compare Vue and React using real pointer and keyboard input. Run \`bun run --cwd docs audit:react-browser\` for the complete computed-style inventory. Reports are written to \`.artifacts/react-parity\`. Set \`FLUX_DOCS_URL\` or \`CHROME_PATH\` to override the server or browser.

The current Vue playground contains a masonry overlap: a context-menu wrapper has no layout box, so the following pane covers its contents. React now measures the visible grid items. The isolated Vue context-menu example remains the behavior reference.

## Component inventory

| Vue component | React export | Known differences or checks still needed |
| --- | --- | --- |
${rows.map((row) => `| \`${row.name}\` | ${row.public ? 'Present' : 'Internal / different composition'} | ${(row.differences || (row.public ? 'No additional declared prop/event gap detected; interactive parity is not certified.' : 'No same-name public React component.')).replaceAll('|', '\\|')} |`).join('\n')}
`;
}
