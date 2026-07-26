<template>
    <FluxPane>
        <FluxPaneHeader
            icon="palette"
            subtitle="Override the neutral scale and watch what follows"
            title="Grey scale"/>
        <FluxPaneBody>
            <FluxFlex
                :gap="18"
                direction="vertical">
                <FluxSegmentedControl v-model="scaleId">
                    <FluxSegmentedControlItem
                        v-for="scale of SCALES"
                        :key="scale.id"
                        :label="scale.label"
                        :value="scale.id"/>
                </FluxSegmentedControl>

                <p :class="$style.graySwitcherDescription">{{ activeScale.description }}</p>

                <div :class="$style.graySwitcherRamp">
                    <div
                        v-for="stop of STOPS"
                        :key="stop"
                        :class="$style.graySwitcherRampStop"
                        :style="{background: `var(--palette-gray-${stop})`}"
                        :title="`--palette-gray-${stop}`"/>
                </div>

                <div :class="$style.graySwitcherReadout">
                    <template
                        v-for="token of TOKENS"
                        :key="token">
                        <div
                            :ref="element => register(element, token)"
                            :class="$style.graySwitcherSwatch"
                            :style="{background: `var(--${token})`}"/>
                        <code :class="$style.graySwitcherName">--{{ token }}</code>
                        <span :class="$style.graySwitcherValue">{{ resolved[token] ?? '' }}</span>
                    </template>
                </div>

                <FluxNotice
                    color="info"
                    icon="circle-info"
                    title="Overriding the palette in your own app">
                    <p>Set the twelve stops of <code>--palette-gray-*</code> on <code>:root</code>. A semantic token such as <code>--surface</code> is declared and substituted there, so an override further down the tree arrives too late and does nothing at all.</p>
                    <p>Light follows the scale completely, because every neutral in light is a stop. Dark has nothing to land on: it needs about ten steps between L .15 and L .42 where the scale has four, so its neutrals carry their own lightness ladder and read only hue and chroma off <code>--palette-gray-500</code>. Dark therefore takes on the character of the scale while keeping the lightness that carries its contrast guarantees. Switch the site theme and compare the values above.</p>
                    <p>Overriding <code>--gray-*</code> has no effect any more. That is the frozen legacy scale, kept only so components that have not moved onto the semantic layer keep rendering, and nothing reads it after the token refactor. Rename those declarations to <code>--palette-gray-*</code>.</p>
                    <p>The palette is absolute, so a scale picks one hue and dark takes it over. A separate <code>[dark]</code> block that swaps a warm light scale for a cool dark one cannot be expressed this way. Override the semantic tokens with <code>light-dark()</code> when a theme really needs two different hues.</p>
                </FluxNotice>
            </FluxFlex>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxNotice, FluxPane, FluxPaneBody, FluxPaneHeader, FluxSegmentedControl, FluxSegmentedControlItem } from '@flux-ui/components';
    import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';

    type GrayScale = {
        readonly id: string;
        readonly label: string;
        readonly description: string;
        readonly values: readonly string[] | null;
    };

    const STOPS = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

    // Derived tokens rather than stops. A stop only proves that the override
    // landed; these three prove that the semantic layer picked it up, and that the
    // dark ladder moved in hue without moving in lightness.
    const TOKENS = ['surface', 'foreground', 'surface-canvas'] as const;

    // Mint and taupe reuse the lightness of the Flux gray scale verbatim, stop for
    // stop, and change nothing but hue and chroma. That is deliberate: it makes the
    // switcher show what a palette override can and cannot reach. The ramp above
    // changes character in both themes, while the dark values in the readout keep
    // the lightness they had, because dark solves its neutrals against a contrast
    // target instead of against the scale.
    //
    // Chroma is the Flux ramp scaled by a single factor, 1.4 for mint and 1.3 for
    // taupe, so a green and a brown read as neutral rather than as a tint.
    const SCALES: readonly GrayScale[] = [
        {
            id: 'flux',
            label: 'Flux',
            description: 'The scale that ships. No override at all: the twelve custom properties are removed from the root element and every token falls back to what base.scss declares.',
            values: null
        },
        {
            id: 'passly',
            label: 'Passly',
            description: 'Cool and blueish, as Passly declares it. Written in hex, exactly as that project has it today, except that it overrides --gray-* there and so no longer reaches anything.',
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
            description: 'The Flux lightness ladder at hue 162, with the Flux chroma ramp multiplied by 1.4. Only hue and chroma differ from the default scale, which is why the two read as the same grey at a different temperature.',
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
        }
    ];

    const scaleId = ref('flux');
    const resolved = reactive<Record<string, string>>({});
    const swatches = new Map<string, HTMLElement>();

    let observer: MutationObserver | null = null;

    const activeScale = computed(() => SCALES.find(scale => scale.id === scaleId.value) ?? SCALES[0]);

    // Post flush, so the ramp has been repainted with the new stops before the
    // readout measures the tokens that were built on top of them.
    watch(scaleId, () => {
        apply();
        read();
    }, {flush: 'post'});

    onMounted(() => {
        apply();
        read();

        // The docs site flips themes by putting a `dark` attribute on the root
        // element, which changes every resolved value without changing the scale.
        observer = new MutationObserver(read);
        observer.observe(document.documentElement, {attributeFilter: ['class', 'dark']});
    });

    onBeforeUnmount(() => {
        observer?.disconnect();
        observer = null;

        // An inline override on the root element outlives this page, so leaving one
        // behind would recolour the rest of the site after navigating away.
        reset();
    });

    // The override has to sit on the root element itself. `--surface` and friends
    // are declared on `:root` and substitute their `var(--palette-gray-*)` there,
    // so a scale set on a wrapper is read after the fact and changes nothing.
    function apply(): void {
        const values = activeScale.value.values;

        if (values === null) {
            reset();

            return;
        }

        STOPS.forEach((stop, index) => {
            document.documentElement.style.setProperty(`--palette-gray-${stop}`, values[index]);
        });
    }

    // A custom property holding a `light-dark()` reads back verbatim through
    // getPropertyValue, so the resolved colour has to come off a real property that
    // the engine has already computed for the current theme.
    function read(): void {
        for (const [token, element] of swatches) {
            resolved[token] = getComputedStyle(element).backgroundColor;
        }
    }

    function register(element: unknown, token: string): void {
        if (element instanceof HTMLElement) {
            swatches.set(token, element);
        } else {
            swatches.delete(token);
        }
    }

    function reset(): void {
        for (const stop of STOPS) {
            document.documentElement.style.removeProperty(`--palette-gray-${stop}`);
        }
    }
</script>

<style
    lang="scss"
    module>
    .graySwitcherDescription {
        max-width: 72ch;
        margin: 0;
        color: var(--foreground-secondary);
        font-size: 14px;
    }

    .graySwitcherRamp {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        height: 45px;
        border: 1px solid var(--surface-stroke);
        border-radius: var(--radius-half);
        overflow: hidden;
    }

    .graySwitcherRampStop {
        height: 100%;
    }

    .graySwitcherReadout {
        display: grid;
        grid-template-columns: auto auto minmax(0, 1fr);
        align-items: center;
        gap: 6px 12px;
    }

    /* On a surface of its own, so a token that resolves to something translucent
       shows what it does instead of blending into the pane. */
    .graySwitcherSwatch {
        height: 24px;
        width: 24px;
        background: var(--surface);
        border-radius: var(--radius-half);
        box-shadow: inset 0 0 0 1px var(--surface-stroke);
    }

    .graySwitcherName,
    .graySwitcherValue {
        font-family: var(--font-monospace), monospace;
        font-size: 12px;
    }

    .graySwitcherValue {
        min-width: 0;
        color: var(--foreground-secondary);
        overflow-wrap: anywhere;
    }
</style>
