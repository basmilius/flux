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

const behavioralChecks: Record<string, string> = {
    FluxBreadcrumb: 'Browser checks cover measured collapse, popup navigation and resizing.',
    FluxCalendar: 'Browser checks cover month/day/week layout, responsive views, pointer moves, resizing and keyboard rescheduling.',
    FluxContextMenu: 'Browser checks cover pointer placement, long press, viewport clamping and nested dismissal.',
    FluxFlyout: 'Browser checks cover placement during opening and closing, interrupted transitions, focus return and nested ownership.',
    FluxFormFader: 'Browser checks cover elastic overdrag, keyboard values and drag performance.',
    FluxFormRangeFader: 'Browser checks cover both thumbs, elastic overdrag and performance.',
    FluxFormRepeater: 'Browser checks cover pointer insertion, keyboard reordering, rollback, editing and confirmed deletion.',
    FluxMenuFlyout: 'Browser checks cover forward and return prediction cones, sibling suppression and nested keyboard navigation.',
    FluxMenuCollapsible: 'Router adapter tests cover automatic matching; browser checks cover opening and height animation.',
    FluxSheet: 'Browser checks cover all four positions, snap points, wheel/scroll handoff and elastic dragging.',
    FluxVisualHighlighter: 'Browser checks cover drawing variants and replay.',
    FluxVisualHighlighterGroup: 'Browser checks cover sequencing and viewport triggers.',
    FluxVisualSlotText: 'Unit tests cover flash options and character cells; browser geometry matches the Vue examples.',
    FluxSplitView: 'Browser checks cover nested geometry, constraints, keyboard resizing, dragging and persistence.',
    FluxSwipeActions: 'Browser checks cover row coordination, focus, disabled state, full swipe and wheel gestures.',
    FluxAiConversation: 'Browser checks cover manual scrolling, streaming follow and keeping the reader’s scroll position.',
    FluxFocalPointEditor: 'Browser checks cover image aspect ratio, dragging, cancellation, keyboard input and preview.',
    FluxTour: 'Browser checks cover placement, resizing, focus trapping and step transitions.',
    FluxTooltip: 'Browser checks compare side, arrow, transform origin, viewport margins and enter/leave frames with Vue.',
    FluxOverlay: 'Browser checks cover enter/leave frames, retained content and the shared backdrop timing.',
    FluxSlideOver: 'Browser checks cover enter/leave frames and backdrop timing.',
    FluxExpandable: 'Browser checks cover opening, closing and reopening during a height transition.',
    FluxExpandablePane: 'Browser checks cover opening, closing and reopening during a height transition.'
};
const apiAdaptations: Record<string, string> = {
    FluxAlert: 'React accepts the alert fields directly; the notification provider owns the alert record.',
    FluxConfirm: 'React accepts the confirmation fields directly; the notification provider owns the record.',
    FluxPrompt: 'React accepts the prompt fields directly; the notification provider owns the record.',
    FluxSnackbar: 'Snackbar IDs belong to the notification store; the rendered component receives its content and callbacks.'
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
            !apiAdaptations[name] && missing.length ? `Props: ${missing.map((name) => '`' + name + '`').join(', ')}.` : '',
            missingEvents.length
                ? `Events: ${missingEvents.map((name) => '`' + name + '`').join(', ')}.`
                : '',
            apiAdaptations[name] ?? '',
            behavioralChecks[name] ?? ''
        ]
            .filter(Boolean)
            .join(' ');
        return {name, file, public: Boolean(react), differences};
    });
    return `# Component comparison

Compared ${rows.length} Vue source files with ${rows.filter((row) => row.public).length} same-name public React exports after merging origin/main. This inventory checks declared props and events and records concrete source-level behavior differences. Native React event names and model callbacks use React conventions.

The inventory below checks API declarations. Browser checks separately compare the rendered Vue and React examples and exercise state changes with pointer and keyboard input. The full render inventory covers 1,323 fixtures, with no render errors. A follow-up audit covers the corrected layout differences. Animated/random content, asynchronously loaded images and SVG connection order require dedicated checks rather than a raw node-order comparison. The Flow checks compare all 87 example geometries independently of SVG order.

The browser suite covers menus and prediction cones, forms, overlays, calendars, trees, filters, Kanban, charts, tables, split views, swipe actions, tours, AI interactions and repeated playground scrolling. It also checks the shared transition timings. Seven Vue implementation components are internal or represented through a different React composition.

Server rendering, hydration and a hydrated form interaction were checked with React 18.3.1 and React 19.3.0. Router adapters and localization have unit coverage. These checks run in Chromium; they are not a claim of exhaustive assistive-technology or cross-browser certification.

## Reproduce checks

Run the docs server on port 5174, then run \`bun run --cwd docs test:react-browser\`. Run \`bun run --cwd docs audit:react-browser\` for the computed-style inventory and \`bun run --cwd docs test:react-performance\` for drag profiling. Reports are written to \`.artifacts/react-parity\`. Set \`FLUX_DOCS_URL\` or \`CHROME_PATH\` to override the server or browser.

After building the React package, run \`NODE_ENV=production node scripts/react-docs/ssr.mjs\` to check SSR and hydration against the installed React version. \`FLUX_REACT_RUNTIME\` and \`FLUX_REACT_BUILD\` can point to an isolated runtime and a copy of the built module for another React version.

The Vue playground contains a masonry overlap: a context-menu wrapper has no layout box, so the following pane covers its contents. React measures the visible grid items. The isolated Vue context-menu example remains the interaction reference.

## Component inventory

| Vue component | React export | API adaptations and regression coverage |
| --- | --- | --- |
${rows.map((row) => `| \`${row.name}\` | ${row.public ? 'Present' : 'Internal / different composition'} | ${(row.differences || (row.public ? 'No additional declared prop/event gap.' : 'No same-name public React component.')).replaceAll('|', '\\|')} |`).join('\n')}
`;
}
