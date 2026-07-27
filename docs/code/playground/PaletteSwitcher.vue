<template>
    <FluxFlyout
        label="Palette"
        :width="570"
        @close="isOpen = false"
        @open="isOpen = true">
        <template #opener="{toggle}">
            <div :class="$style.paletteSwitcherLauncher">
                <FluxTooltip :content="tooltip">
                    <FluxSecondaryButton
                        icon-leading="palette"
                        :is-active="isOpen"
                        :label="active"
                        @click="toggle()"/>
                </FluxTooltip>
            </div>
        </template>

        <template #default="{close}">
            <FluxPaneHeader
                icon="palette"
                subtitle="Override a scale and watch what follows"
                title="Palette">
                <template #after>
                    <FluxAction
                        aria-label="Close the palette"
                        icon="xmark"
                        @click="close()"/>
                </template>
            </FluxPaneHeader>
            <FluxPaneBody>
                <FluxFlex
                    :gap="27"
                    direction="vertical">
                    <template
                        v-for="(row, index) of ROWS"
                        :key="row.scale">
                        <FluxSeparator v-if="index > 0"/>

                        <FluxFlex
                            :gap="18"
                            direction="vertical">
                            <FluxFormField :label="row.title">
                                <template #value>
                                    <span :class="$style.paletteSwitcherKeys">
                                        <kbd>Shift</kbd>
                                        <kbd>{{ row.key }}</kbd>
                                    </span>
                                </template>

                                <FluxFormSelect
                                    v-model="selected[row.scale]"
                                    :options="row.options"/>
                            </FluxFormField>

                            <p :class="$style.paletteSwitcherDescription">{{ activeScale(row).description }}</p>

                            <div :class="$style.paletteSwitcherRamp">
                                <div
                                    v-for="stop of STOPS"
                                    :key="stop"
                                    :class="$style.paletteSwitcherRampStop"
                                    :style="{background: `var(--palette-${row.scale}-${stop})`}"
                                    :title="`--palette-${row.scale}-${stop}`"/>
                            </div>

                            <div :class="$style.paletteSwitcherReadout">
                                <template
                                    v-for="token of row.tokens"
                                    :key="token">
                                    <div
                                        :ref="element => registerSwatch(element, token)"
                                        :class="$style.paletteSwitcherSwatch"
                                        :style="{background: `var(--${token})`}"/>
                                    <code :class="$style.paletteSwitcherName">--{{ token }}</code>
                                    <span :class="$style.paletteSwitcherValue">{{ resolved[token] ?? '' }}</span>
                                </template>
                            </div>

                            <FluxNotice
                                v-if="row.scale === 'gray'"
                                color="info"
                                icon="circle-info"
                                title="Overriding the palette in your own app">
                                <p>Set the twelve stops of <code>--palette-gray-*</code> on <code>:root</code>. A semantic token such as <code>--surface</code> is declared and substituted there, so an override further down the tree arrives too late and does nothing at all.</p>
                                <p>Light follows the scale completely, because every neutral in light is a stop. Dark has nothing to land on: it needs about ten steps between L .15 and L .42 where the scale has four, so its neutrals carry their own lightness ladder and read only hue and chroma off <code>--palette-gray-500</code>. Dark therefore takes on the character of the scale while keeping the lightness that carries its contrast guarantees. Switch the site theme and compare the values above.</p>
                                <p>Overriding <code>--gray-*</code> does nothing. That scale was removed in this major, so those declarations now name a token that does not exist. Rename them to <code>--palette-gray-*</code>.</p>
                                <p>The palette is absolute, so a scale picks one hue and dark takes it over. A separate <code>[dark]</code> block that swaps a warm light scale for a cool dark one cannot be expressed this way. Override the semantic tokens with <code>light-dark()</code> when a theme really needs two different hues.</p>
                            </FluxNotice>

                            <template v-else>
                                <FluxNotice
                                    color="info"
                                    icon="circle-info"
                                    title="How far a colored scale reaches">
                                    <p>The neutral stops at hue and chroma in dark mode. Primary does not. <code>--primary-solid</code>, its hover and its active state take stops 500, 400 and 300 there, and <code>--primary-text</code> takes stop 400, so a colored intent follows the scale in lightness as well. Only <code>--primary-soft</code>, its hover and <code>--primary-border</code> stay behind: dark has nothing usable between L .24 and L .40 on these hues, so those three are tints over <code>--palette-primary-500</code> that read hue and chroma off it at a fixed lightness, exactly as the neutrals do.</p>
                                    <p>More follows than the five roles above. <code>--focus-ring</code> is stop 600 in light and stop 400 in dark, <code>--selection</code> is a tint on primary, and <code>base.scss</code> hands <code>accent-color</code> to <code>--primary-solid</code>, so a native checkbox and a range input come along.</p>
                                    <p>What does not follow is the label on the fill. <code>--primary-on-solid</code> is plain white in light and a near-black neutral in dark, and that neutral is anchored to <code>--palette-gray-500</code> rather than to primary: swap the neutral above and the button label moves, swap primary and it stays exactly where it was. Which is why the two checks below are measured rather than assumed.</p>
                                </FluxNotice>

                                <div :class="$style.paletteSwitcherHeading">Contrast contract</div>

                                <div :class="$style.paletteSwitcherChecks">
                                    <template
                                        v-for="check of checks"
                                        :key="check.id">
                                        <div
                                            :ref="element => registerSample(element, check.id)"
                                            :class="$style.paletteSwitcherSample"
                                            :style="{background: `var(--${check.background})`, color: `var(--${check.foreground})`}">Aa</div>
                                        <div :class="$style.paletteSwitcherCheck">
                                            <span>{{ check.label }}</span>
                                            <code :class="$style.paletteSwitcherName">--{{ check.foreground }} on --{{ check.background }}</code>
                                        </div>
                                        <span :class="$style.paletteSwitcherRatio">{{ check.value }}</span>
                                        <FluxBadge
                                            :color="check.color"
                                            :label="check.status"/>
                                    </template>
                                </div>

                                <FluxNotice
                                    v-if="hasFailure"
                                    color="danger"
                                    icon="circle-exclamation"
                                    title="This scale does not meet the contract">
                                    <p>One of the checks above sits under {{ TARGET }}, so this palette cannot be dropped in as it stands. The fill is the usual culprit: <code>--primary-on-solid</code> is plain white in light mode and the ladder assumes stop 600 is dark enough to carry it, which a mid green or a bright amber is not.</p>
                                    <p>Two ways out, both a single declaration next to the palette override. Give <code>--primary-on-solid</code> a color that does survive on the fill, or point <code>--primary-solid</code> and its two states at darker stops of the same scale. Darkening the stops themselves is the third option and the worst one, because every other role reads them too.</p>
                                </FluxNotice>
                            </template>
                        </FluxFlex>
                    </template>
                </FluxFlex>
            </FluxPaneBody>
        </template>
    </FluxFlyout>
</template>

<script
    lang="ts"
    setup>
    import { useHotKey } from '@basmilius/common';
    import { FluxAction, FluxBadge, FluxFlex, FluxFlyout, FluxFormField, FluxFormSelect, FluxNotice, FluxPaneBody, FluxPaneHeader, FluxSecondaryButton, FluxSeparator, FluxTooltip } from '@flux-ui/components';
    import type { FluxColor, FluxFormSelectOption } from '@flux-ui/types';
    import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';

    type PaletteScale = {
        readonly id: string;
        readonly label: string;
        readonly description: string;
        readonly values: readonly string[] | null;
    };

    type PaletteRow = {
        readonly scale: string;
        readonly title: string;
        readonly key: string;
        readonly tokens: readonly string[];
        readonly scales: readonly PaletteScale[];
        readonly options: FluxFormSelectOption[];
    };

    type ContrastCheck = {
        readonly id: string;
        readonly label: string;
        readonly foreground: string;
        readonly background: string;
    };

    type ResolvedCheck = ContrastCheck & {
        readonly color: FluxColor;
        readonly status: string;
        readonly value: string;
    };

    // Gamma encoded sRGB, plus alpha.
    type Rgba = readonly [number, number, number, number];

    const STOPS = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

    const TARGET = 4.5;

    const GRAY_SCALES: readonly PaletteScale[] = [
        {
            id: 'flux',
            label: 'Flux',
            description: 'The scale that ships. No override at all: the twelve custom properties are removed from the root element and every token falls back to what base.scss declares.',
            values: null
        },
        {
            id: 'passly',
            label: 'Passly',
            description: 'Cool and blueish, as Passly declares it. Written in hex, exactly as that project has it today, except that it overrides --gray-* there, which this major removed.',
            values: [
                '#ffffff', '#fafafc', '#f3f3f7', '#e5e4eb', '#d2d1da', '#a09eaf',
                '#71707f', '#52515f', '#3e3d49', '#26262e', '#16161d', '#08080f'
            ]
        },
        {
            id: 'solvidi',
            label: 'Solvidi',
            description: 'Warm taupe, as Solvidi declares it in light. Its dark block turns the same scale cool blue, which an absolute palette cannot do: dark inherits the hue that light picked.',
            values: [
                '#ffffff', '#fbfaf9', '#f3f1f1', '#e8e4e3', '#d8d2d0', '#aba09c',
                '#7c6d67', '#5b4f4b', '#473c39', '#2b2422', '#1d1816', '#0c0a09'
            ]
        },
        {
            id: 'mint',
            label: 'Mint',
            description: 'The Flux lightness ladder at hue 162, with the Flux chroma ramp multiplied by 1.4. Only hue and chroma differ from the default scale, which is why the two read as the same gray at a different temperature.',
            values: [
                'oklch(1 0 162)', 'oklch(.9795 .0076 162)', 'oklch(.9493 .0116 162)', 'oklch(.9101 .0176 162)',
                'oklch(.8392 .0223 162)', 'oklch(.7196 .0421 162)', 'oklch(.6411 .0479 162)', 'oklch(.5199 .0571 162)',
                'oklch(.4004 .0564 162)', 'oklch(.3188 .0388 162)', 'oklch(.2411 .0391 162)', 'oklch(.1587 .0393 162)'
            ]
        },
        {
            id: 'taupe',
            label: 'Taupe',
            description: 'The same lightness ladder at hue 65, with the Flux chroma ramp multiplied by 1.3. A warm brown neutral built from the exact stops of the default scale.',
            values: [
                'oklch(1 0 65)', 'oklch(.9795 .0070 65)', 'oklch(.9493 .0108 65)', 'oklch(.9101 .0164 65)',
                'oklch(.8392 .0207 65)', 'oklch(.7196 .0391 65)', 'oklch(.6411 .0445 65)', 'oklch(.5199 .0530 65)',
                'oklch(.4004 .0524 65)', 'oklch(.3188 .0360 65)', 'oklch(.2411 .0363 65)', 'oklch(.1587 .0365 65)'
            ]
        },

        // Tailwind's scales start at 50, so stop 25 is invented. On the neutral it is what
        // `--surface` resolves to, so it takes pure white rather than Tailwind's own 50.
        {
            id: 'slate',
            label: 'Slate',
            description: 'Tailwind slate: the coolest of the five, close to what Flux already ships. Its 950 is near-black with a blue cast, so dark surfaces sit deeper than the Flux scale puts them.',
            values: [
                '#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8',
                '#64748b', '#475569', '#334155', '#1e293b', '#0f172a', '#020617'
            ]
        },
        {
            id: 'tailwind-gray',
            label: 'Gray',
            description: 'Tailwind gray. A slight blue cast, less than slate, and the scale most interfaces reach for by default.',
            values: [
                '#ffffff', '#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af',
                '#6b7280', '#4b5563', '#374151', '#1f2937', '#111827', '#030712'
            ]
        },
        {
            id: 'zinc',
            label: 'Zinc',
            description: 'Tailwind zinc: almost hueless, a trace of violet. The closest of the five to a true neutral without reading as flat.',
            values: [
                '#ffffff', '#fafafa', '#f4f4f5', '#e4e4e7', '#d4d4d8', '#a1a1aa',
                '#71717a', '#52525b', '#3f3f46', '#27272a', '#18181b', '#09090b'
            ]
        },
        {
            id: 'tailwind-neutral',
            label: 'Neutral',
            description: 'Tailwind neutral: chroma zero at every stop. Worth switching to once, because it shows how much of the character of an interface comes from a hue you were never quite aware of.',
            values: [
                '#ffffff', '#fafafa', '#f5f5f5', '#e5e5e5', '#d4d4d4', '#a3a3a3',
                '#737373', '#525252', '#404040', '#262626', '#171717', '#0a0a0a'
            ]
        },
        {
            id: 'stone',
            label: 'Stone',
            description: 'Tailwind stone: warm, the counterpart to slate. Nearest of the five to what Solvidi picked by hand.',
            values: [
                '#ffffff', '#fafaf9', '#f5f5f4', '#e7e5e4', '#d6d3d1', '#a8a29e',
                '#78716c', '#57534e', '#44403c', '#292524', '#1c1917', '#0c0a09'
            ]
        }
    ];

    // Stop 25 is invented here too. Nothing in the token layer reads it on a colored
    // scale, so these take the value Flux gives its own primary-25.
    const PRIMARY_SCALES: readonly PaletteScale[] = [
        {
            id: 'flux',
            label: 'Flux',
            description: 'The scale that ships. No override at all: the twelve custom properties are removed from the root element and primary falls back to the blue that base.scss declares.',
            values: null
        },
        {
            id: 'solvidi',
            label: 'Solvidi',
            description: 'The magenta Solvidi runs on, in hex exactly as that project declares it. A real brand color rather than a scale drawn against this contract, and it happens to clear both checks, which is not something a brand color owes you.',
            values: [
                '#ffffff', '#fcf3f8', '#fae9f3', '#f6d4e7', '#f0b1d3', '#e581b5',
                '#d95b9a', '#c73b7a', '#ab2b61', '#8d2650', '#772445', '#480f26'
            ]
        },
        {
            id: 'red',
            label: 'Red',
            description: 'Tailwind red. Sits where danger already lives, so a primary in this hue and a destructive action stop being distinguishable by color alone.',
            values: [
                '#fcfcfc', '#fef2f2', '#fee2e2', '#fecaca', '#fca5a5', '#f87171',
                '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d', '#450a0a'
            ]
        },
        {
            id: 'orange',
            label: 'Orange',
            description: 'Tailwind orange. Its 600 is light enough that white on the solid fill needs checking, the same trap warning has in the Flux scale.',
            values: [
                '#fcfcfc', '#fff7ed', '#ffedd5', '#fed7aa', '#fdba74', '#fb923c',
                '#f97316', '#ea580c', '#c2410c', '#9a3412', '#7c2d12', '#431407'
            ]
        },
        {
            id: 'amber',
            label: 'Amber',
            description: 'Tailwind amber. The clearest failure of the set: stop 600 is a bright yellow and white on it is nowhere near AA.',
            values: [
                '#fcfcfc', '#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24',
                '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f', '#451a03'
            ]
        },
        {
            id: 'yellow',
            label: 'Yellow',
            description: 'Tailwind yellow. Brighter still than amber, and the readout below shows what that does to a filled button.',
            values: [
                '#fcfcfc', '#fefce8', '#fef9c3', '#fef08a', '#fde047', '#facc15',
                '#eab308', '#ca8a04', '#a16207', '#854d0e', '#713f12', '#422006'
            ]
        },
        {
            id: 'lime',
            label: 'Lime',
            description: 'Tailwind lime. A yellow-green with a very light 600, which is the stop the solid fill takes in light.',
            values: [
                '#fcfcfc', '#f7fee7', '#ecfccb', '#d9f99d', '#bef264', '#a3e635',
                '#84cc16', '#65a30d', '#4d7c0f', '#3f6212', '#365314', '#1a2e05'
            ]
        },
        {
            id: 'green',
            label: 'Green',
            description: 'Tailwind green. Reads as success rather than as a brand, which is worth knowing before adopting it as primary.',
            values: [
                '#fcfcfc', '#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80',
                '#22c55e', '#16a34a', '#15803d', '#166534', '#14532d', '#052e16'
            ]
        },
        {
            id: 'emerald',
            label: 'Emerald',
            description: 'Tailwind emerald. A deeper, bluer green than green, and one of the scales whose 600 is too light for white text.',
            values: [
                '#fcfcfc', '#ecfdf5', '#d1fae5', '#a7f3d0', '#6ee7b7', '#34d399',
                '#10b981', '#059669', '#047857', '#065f46', '#064e3b', '#022c22'
            ]
        },
        {
            id: 'teal',
            label: 'Teal',
            description: 'Tailwind teal. Between green and cyan, dark enough at 600 to carry white in light.',
            values: [
                '#fcfcfc', '#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf',
                '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a', '#042f2e'
            ]
        },
        {
            id: 'cyan',
            label: 'Cyan',
            description: 'Tailwind cyan. Bright and cold; the solid fill lands close to the point where white stops holding.',
            values: [
                '#fcfcfc', '#ecfeff', '#cffafe', '#a5f3fc', '#67e8f9', '#22d3ee',
                '#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63', '#083344'
            ]
        },
        {
            id: 'sky',
            label: 'Sky',
            description: 'Tailwind sky. A lighter, friendlier blue than the Flux default, still dark enough at 600.',
            values: [
                '#fcfcfc', '#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8',
                '#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e', '#082f49'
            ]
        },
        {
            id: 'blue',
            label: 'Blue',
            description: 'Tailwind blue. The closest of the seventeen to what Flux ships, which makes it the useful control case.',
            values: [
                '#fcfcfc', '#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa',
                '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a', '#172554'
            ]
        },
        {
            id: 'indigo',
            label: 'Indigo',
            description: 'Tailwind indigo. Deeper and more violet than blue, with plenty of headroom for white text.',
            values: [
                '#fcfcfc', '#eef2ff', '#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8',
                '#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81', '#1e1b4b'
            ]
        },
        {
            id: 'violet',
            label: 'Violet',
            description: 'Tailwind violet. Dark enough at 600 to carry white, but only just, which the readout makes visible.',
            values: [
                '#fcfcfc', '#f5f3ff', '#ede9fe', '#ddd6fe', '#c4b5fd', '#a78bfa',
                '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95', '#2e1065'
            ]
        },
        {
            id: 'purple',
            label: 'Purple',
            description: 'Tailwind purple. Slightly redder than violet and a touch darker at the stops that matter.',
            values: [
                '#fcfcfc', '#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc',
                '#a855f7', '#9333ea', '#7e22ce', '#6b21a8', '#581c87', '#3b0764'
            ]
        },
        {
            id: 'fuchsia',
            label: 'Fuchsia',
            description: 'Tailwind fuchsia. A vivid magenta, brighter than the one Solvidi picked by hand.',
            values: [
                '#fcfcfc', '#fdf4ff', '#fae8ff', '#f5d0fe', '#f0abfc', '#e879f9',
                '#d946ef', '#c026d3', '#a21caf', '#86198f', '#701a75', '#4a044e'
            ]
        },
        {
            id: 'pink',
            label: 'Pink',
            description: 'Tailwind pink. Lighter than fuchsia, and close to where Solvidi landed.',
            values: [
                '#fcfcfc', '#fdf2f8', '#fce7f3', '#fbcfe8', '#f9a8d4', '#f472b6',
                '#ec4899', '#db2777', '#be185d', '#9d174d', '#831843', '#500724'
            ]
        },
        {
            id: 'rose',
            label: 'Rose',
            description: 'Tailwind rose. Red-pink, dark enough at 600 that white holds in light.',
            values: [
                '#fcfcfc', '#fff1f2', '#ffe4e6', '#fecdd3', '#fda4af', '#fb7185',
                '#f43f5e', '#e11d48', '#be123c', '#9f1239', '#881337', '#4c0519'
            ]
        }
    ];

    const ROWS: readonly PaletteRow[] = [
        {
            scale: 'gray',
            title: 'Neutral',
            key: 'G',
            tokens: ['surface', 'foreground', 'surface-canvas'],
            scales: GRAY_SCALES,
            options: GRAY_SCALES.map(scale => ({label: scale.label, value: scale.id}))
        },
        {
            scale: 'primary',
            title: 'Primary',
            key: 'P',
            tokens: ['primary-solid', 'primary-on-solid', 'primary-text', 'primary-soft', 'focus-ring'],
            scales: PRIMARY_SCALES,
            options: PRIMARY_SCALES.map(scale => ({label: scale.label, value: scale.id}))
        }
    ];

    const CHECKS: readonly ContrastCheck[] = [
        {
            id: 'button',
            label: 'The label on a primary button',
            foreground: 'primary-on-solid',
            background: 'primary-solid'
        },
        {
            id: 'text',
            label: 'Primary text on a card',
            foreground: 'primary-text',
            background: 'surface'
        }
    ];

    const SHORTCUTS = ROWS.map(row => `Shift + ${row.key} cycles ${row.title.toLowerCase()}`).join(', ');

    const isOpen = ref(false);
    const selected = reactive<Record<string, string>>({gray: 'flux', primary: 'flux'});
    const resolved = reactive<Record<string, string>>({});
    const ratios = reactive<Record<string, number>>({});
    const swatches = new Map<string, HTMLElement>();
    const samples = new Map<string, HTMLElement>();

    let context: CanvasRenderingContext2D | null = null;
    let observer: MutationObserver | null = null;

    // Shift plus a letter, because Cmd and Ctrl + K belong to the VitePress search
    // and Option on a Mac rewrites the character of the key it is held with.
    for (const row of ROWS) {
        useHotKey(`shift+${row.key}`, () => cycle(row));
    }

    const checks = computed<ResolvedCheck[]>(() => CHECKS.map(check => {
        const ratio = ratios[check.id];

        if (ratio === undefined) {
            return {...check, color: 'gray', status: 'Measuring', value: ''};
        }

        const passes = ratio >= TARGET;

        return {
            ...check,
            color: passes ? 'success' : 'danger',
            status: passes ? 'Passes AA' : 'Under AA',
            value: `${ratio.toFixed(2)}:1`
        };
    }));

    const hasFailure = computed(() => CHECKS.some(check => (ratios[check.id] ?? TARGET) < TARGET));

    const active = computed(() => ROWS.map(row => activeScale(row).label).join(' / '));
    const tooltip = `${SHORTCUTS}.`;

    // Post flush, so the ramp is repainted with the new stops before the readout
    // measures the tokens built on top of them.
    watch(selected, () => {
        apply();
        read();
    }, {flush: 'post'});

    // Post flush again: the probes only exist while the panel is open, so they have
    // to be in the document before they are measured.
    watch(isOpen, isOpen => {
        if (isOpen) {
            read();
        }
    }, {flush: 'post'});

    onMounted(() => {
        apply();

        // The docs site flips theme with a `dark` attribute on the root element.
        observer = new MutationObserver(read);
        observer.observe(document.documentElement, {attributeFilter: ['class', 'dark']});
    });

    onBeforeUnmount(() => {
        observer?.disconnect();
        observer = null;

        // The override sits on the root element and would outlive this page.
        reset();
    });

    function activeScale(row: PaletteRow): PaletteScale {
        return row.scales.find(scale => scale.id === selected[row.scale]) ?? row.scales[0];
    }

    function apply(): void {
        for (const row of ROWS) {
            applyScale(row.scale, activeScale(row).values);
        }
    }

    // The override has to sit on the root element itself: the semantic tokens substitute
    // their `var(--palette-*)` on `:root`, so a scale set on a wrapper arrives too late.
    function applyScale(scale: string, values: readonly string[] | null): void {
        STOPS.forEach((stop, index) => {
            const property = `--palette-${scale}-${stop}`;

            if (values === null) {
                document.documentElement.style.removeProperty(property);
            } else {
                document.documentElement.style.setProperty(property, values[index]);
            }
        });
    }

    function contrast(foreground: Rgba, background: Rgba): number {
        const composited = luminance(over(foreground, background));
        const base = luminance(background);

        return (Math.max(composited, base) + 0.05) / (Math.min(composited, base) + 0.05);
    }

    function cycle(row: PaletteRow): void {
        const index = row.scales.findIndex(scale => scale.id === selected[row.scale]);

        selected[row.scale] = row.scales[(index + 1) % row.scales.length].id;
    }

    function decode(value: number): number {
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    }

    function luminance([red, green, blue]: Rgba): number {
        return 0.2126 * decode(red) + 0.7152 * decode(green) + 0.0722 * decode(blue);
    }

    /**
     * Composites on the gamma encoded channels, because that is where a browser does it:
     * `rgb(0 0 0 / .5)` over white renders #808080, not the #bcbcbc of a linear blend.
     */
    function over(foreground: Rgba, background: Rgba): Rgba {
        const alpha = foreground[3];

        return [
            foreground[0] * alpha + background[0] * (1 - alpha),
            foreground[1] * alpha + background[1] * (1 - alpha),
            foreground[2] * alpha + background[2] * (1 - alpha),
            1
        ];
    }

    /**
     * A computed color comes back in the space it was written in, and these are `oklch()`,
     * so painting it into a pixel and reading the bytes is what gets a number out of it.
     * That also carries the per-channel clipping a browser applies outside sRGB, which is
     * what the contrast gate does too.
     */
    function paintedColor(value: string): Rgba {
        context ??= document.createElement('canvas').getContext('2d', {willReadFrequently: true})!;

        context.clearRect(0, 0, 1, 1);
        context.fillStyle = value;
        context.fillRect(0, 0, 1, 1);

        const [red, green, blue, alpha] = context.getImageData(0, 0, 1, 1).data;

        return [red / 255, green / 255, blue / 255, alpha / 255];
    }

    // A custom property holding a `light-dark()` reads back verbatim through
    // getPropertyValue, so the resolved color has to come off a real property.
    function read(): void {
        for (const [token, element] of swatches) {
            resolved[token] = getComputedStyle(element).backgroundColor;
        }

        for (const [id, element] of samples) {
            const style = getComputedStyle(element);

            ratios[id] = contrast(paintedColor(style.color), paintedColor(style.backgroundColor));
        }
    }

    function registerSample(element: unknown, id: string): void {
        if (element instanceof HTMLElement) {
            samples.set(id, element);
        } else {
            samples.delete(id);
        }
    }

    function registerSwatch(element: unknown, token: string): void {
        if (element instanceof HTMLElement) {
            swatches.set(token, element);
        } else {
            swatches.delete(token);
        }
    }

    function reset(): void {
        for (const row of ROWS) {
            applyScale(row.scale, null);
        }
    }
</script>

<style
    lang="scss"
    module>
    // Fixed, so the component has to stay outside any element with a
    // `container-type`: that would become its containing block.
    .paletteSwitcherLauncher {
        position: fixed;
        right: 24px;
        bottom: 24px;
        z-index: 100;
    }

    .paletteSwitcherKeys {
        display: inline-flex;
        gap: 3px;

        kbd {
            font-family: inherit;
            font-size: 12px;
            padding: 3px 6px;
            border: 1px solid var(--surface-stroke);
            border-radius: var(--radius-half);
            color: var(--foreground-secondary);
            box-shadow: 0 1px 0 var(--surface-stroke);
        }
    }

    .paletteSwitcherHeading {
        color: var(--foreground-prominent);
        font-size: 13px;
        font-weight: 700;
        letter-spacing: .04em;
        text-transform: uppercase;
    }

    .paletteSwitcherDescription {
        max-width: 72ch;
        margin: 0;
        color: var(--foreground-secondary);
        font-size: 14px;
    }

    .paletteSwitcherRamp {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        height: 45px;
        border: 1px solid var(--surface-stroke);
        border-radius: var(--radius-half);
        overflow: hidden;
    }

    .paletteSwitcherRampStop {
        height: 100%;
    }

    .paletteSwitcherReadout {
        display: grid;
        grid-template-columns: auto auto minmax(0, 1fr);
        align-items: center;
        gap: 6px 12px;
    }

    .paletteSwitcherSwatch {
        height: 24px;
        width: 24px;
        background: var(--surface);
        border-radius: var(--radius-half);
        box-shadow: inset 0 0 0 1px var(--surface-stroke);
    }

    .paletteSwitcherChecks {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto auto;
        align-items: center;
        gap: 9px 15px;
    }

    .paletteSwitcherSample {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 33px;
        width: 48px;
        border-radius: var(--radius-half);
        box-shadow: inset 0 0 0 1px var(--surface-stroke);
        font-size: 15px;
        font-weight: 700;
    }

    .paletteSwitcherCheck {
        display: flex;
        flex-direction: column;
        min-width: 0;
        gap: 3px;
        font-size: 14px;
    }

    .paletteSwitcherRatio {
        font-family: var(--font-monospace), monospace;
        font-size: 13px;
        font-variant-numeric: tabular-nums;
    }

    .paletteSwitcherName,
    .paletteSwitcherValue {
        font-family: var(--font-monospace), monospace;
        font-size: 12px;
    }

    .paletteSwitcherValue {
        min-width: 0;
        color: var(--foreground-secondary);
        overflow-wrap: anywhere;
    }
</style>
