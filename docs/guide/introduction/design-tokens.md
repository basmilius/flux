<script setup>
    import { FluxPane, FluxTable, FluxTableRow, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
</script>

# Design tokens

Flux exposes its visual language as CSS custom properties. Use them to theme your application, build new components that fit in seamlessly, or override individual values for a single element. All tokens are defined on `:root` and adjust automatically when [Dark mode](./dark-mode) is active.

For the colour palette tokens (`--gray-*`, `--primary-*`, `--danger-*`, `--info-*`, `--success-*`, `--warning-*`) see [Colors](./colors).

## Surface

Semantic tokens for backgrounds, borders and disabled states. These are the tokens you should reach for first when styling new UI — they automatically follow the active theme.

<FluxPane>
    <FluxTable>
        <template #header>
            <FluxTableRow>
                <FluxTableHeader>Token</FluxTableHeader>
                <FluxTableHeader>Light</FluxTableHeader>
                <FluxTableHeader>Dark mode</FluxTableHeader>
            </FluxTableRow>
        </template>
        <FluxTableRow>
            <FluxTableCell><kbd>--background</kbd></FluxTableCell>
            <FluxTableCell><code>var(--gray-25)</code></FluxTableCell>
            <FluxTableCell><code>var(--gray-25)</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--surface</kbd></FluxTableCell>
            <FluxTableCell><code>var(--gray-25)</code></FluxTableCell>
            <FluxTableCell><code>var(--gray-25)</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--surface-hover</kbd></FluxTableCell>
            <FluxTableCell><code>var(--gray-50)</code></FluxTableCell>
            <FluxTableCell><code>var(--gray-50)</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--surface-active</kbd></FluxTableCell>
            <FluxTableCell><code>var(--gray-100)</code></FluxTableCell>
            <FluxTableCell><code>var(--gray-100)</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--surface-disabled</kbd></FluxTableCell>
            <FluxTableCell><code>var(--gray-100)</code></FluxTableCell>
            <FluxTableCell><code>var(--gray-100)</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--surface-stroke</kbd></FluxTableCell>
            <FluxTableCell><code>var(--gray-200)</code></FluxTableCell>
            <FluxTableCell><code>var(--gray-200)</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--surface-stroke-hover</kbd></FluxTableCell>
            <FluxTableCell><code>var(--gray-300)</code></FluxTableCell>
            <FluxTableCell><code>var(--gray-300)</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--surface-stroke-out</kbd></FluxTableCell>
            <FluxTableCell><code>rgb(from var(--gray-900) r g b / .1)</code></FluxTableCell>
            <FluxTableCell><code>rgb(from var(--gray-900) r g b / .1)</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--surface-stroke-out-hover</kbd></FluxTableCell>
            <FluxTableCell><code>rgb(from var(--gray-950) r g b / .1)</code></FluxTableCell>
            <FluxTableCell><code>rgb(from var(--gray-950) r g b / .1)</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--surface-loader</kbd></FluxTableCell>
            <FluxTableCell><code>rgb(from var(--gray-25) r g b / .75)</code></FluxTableCell>
            <FluxTableCell><code>rgb(from var(--gray-25) r g b / .75)</code></FluxTableCell>
        </FluxTableRow>
    </FluxTable>
</FluxPane>

## Foreground

Tokens for text and iconography.

<FluxPane>
    <FluxTable>
        <template #header>
            <FluxTableRow>
                <FluxTableHeader>Token</FluxTableHeader>
                <FluxTableHeader>Value</FluxTableHeader>
            </FluxTableRow>
        </template>
        <FluxTableRow>
            <FluxTableCell><kbd>--foreground</kbd></FluxTableCell>
            <FluxTableCell><code>var(--gray-700)</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--foreground-prominent</kbd></FluxTableCell>
            <FluxTableCell><code>var(--gray-900)</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--foreground-secondary</kbd></FluxTableCell>
            <FluxTableCell><code>var(--gray-500)</code></FluxTableCell>
        </FluxTableRow>
    </FluxTable>
</FluxPane>

## Overlay

Used by `FluxOverlay`, `FluxSlideOver`, `FluxFlyout` and other dialog-like components. Dark mode uses solid black with alpha to keep dimming effects readable.

<FluxPane>
    <FluxTable>
        <template #header>
            <FluxTableRow>
                <FluxTableHeader>Token</FluxTableHeader>
                <FluxTableHeader>Light</FluxTableHeader>
                <FluxTableHeader>Dark mode</FluxTableHeader>
            </FluxTableRow>
        </template>
        <FluxTableRow>
            <FluxTableCell><kbd>--overlay</kbd></FluxTableCell>
            <FluxTableCell><code>rgb(from var(--gray-950) r g b / .5)</code></FluxTableCell>
            <FluxTableCell><code>rgb(0 0 0 / .6)</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--overlay-secondary</kbd></FluxTableCell>
            <FluxTableCell><code>rgb(from var(--gray-950) r g b / .15)</code></FluxTableCell>
            <FluxTableCell><code>rgb(0 0 0 / .4)</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--overlay-strong</kbd></FluxTableCell>
            <FluxTableCell><code>rgb(from var(--gray-950) r g b / .9)</code></FluxTableCell>
            <FluxTableCell><code>rgb(0 0 0 / .9)</code></FluxTableCell>
        </FluxTableRow>
    </FluxTable>
</FluxPane>

## Shadow

A scale of seven shadow levels. Each level uses a slightly different opacity in dark mode so elevations remain visible against the darker surface.

<FluxPane>
    <FluxTable>
        <template #header>
            <FluxTableRow>
                <FluxTableHeader>Token</FluxTableHeader>
                <FluxTableHeader>Description</FluxTableHeader>
            </FluxTableRow>
        </template>
        <FluxTableRow>
            <FluxTableCell><kbd>--shadow-px</kbd></FluxTableCell>
            <FluxTableCell>Hairline elevation — used to separate adjacent surfaces.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--shadow-xs</kbd></FluxTableCell>
            <FluxTableCell>Slight elevation — buttons, chips.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--shadow-sm</kbd></FluxTableCell>
            <FluxTableCell>Resting state of cards and panes.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--shadow-md</kbd></FluxTableCell>
            <FluxTableCell>Hovered or focused cards.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--shadow-lg</kbd></FluxTableCell>
            <FluxTableCell>Pop-overs, dropdowns and small overlays.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--shadow-xl</kbd></FluxTableCell>
            <FluxTableCell>Modal-like flyouts.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--shadow-2xl</kbd></FluxTableCell>
            <FluxTableCell>Large dialogs and overlays.</FluxTableCell>
        </FluxTableRow>
    </FluxTable>
</FluxPane>

## Radius

<FluxPane>
    <FluxTable>
        <template #header>
            <FluxTableRow>
                <FluxTableHeader>Token</FluxTableHeader>
                <FluxTableHeader>Value</FluxTableHeader>
                <FluxTableHeader>Usage</FluxTableHeader>
            </FluxTableRow>
        </template>
        <FluxTableRow>
            <FluxTableCell><kbd>--radius</kbd></FluxTableCell>
            <FluxTableCell><code>12px</code></FluxTableCell>
            <FluxTableCell>Default border-radius for surfaces and inputs.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--radius-half</kbd></FluxTableCell>
            <FluxTableCell><code>6px</code></FluxTableCell>
            <FluxTableCell>Tight rounding — used inside chips and small inputs.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--radius-double</kbd></FluxTableCell>
            <FluxTableCell><code>24px</code></FluxTableCell>
            <FluxTableCell>Larger rounding — heroes, illustrations.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--radius-full</kbd></FluxTableCell>
            <FluxTableCell><code>9999px</code></FluxTableCell>
            <FluxTableCell>Pill-shaped components such as <code>FluxBadge</code>.</FluxTableCell>
        </FluxTableRow>
    </FluxTable>
</FluxPane>

## Typography

<FluxPane>
    <FluxTable>
        <template #header>
            <FluxTableRow>
                <FluxTableHeader>Token</FluxTableHeader>
                <FluxTableHeader>Value</FluxTableHeader>
            </FluxTableRow>
        </template>
        <FluxTableRow>
            <FluxTableCell><kbd>--font-sans</kbd></FluxTableCell>
            <FluxTableCell><code>inter-variable, sans-serif</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--font-monospace</kbd></FluxTableCell>
            <FluxTableCell><code>jetbrains-mono, monospace</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--font-serif</kbd></FluxTableCell>
            <FluxTableCell><code>serif</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--font-size</kbd></FluxTableCell>
            <FluxTableCell><code>15px</code></FluxTableCell>
        </FluxTableRow>
    </FluxTable>
</FluxPane>

## Motion

The motion tokens drive every Flux transition. Use them when you build custom animations so timings stay consistent with the rest of the system.

<FluxPane>
    <FluxTable>
        <template #header>
            <FluxTableRow>
                <FluxTableHeader>Token</FluxTableHeader>
                <FluxTableHeader>Value</FluxTableHeader>
            </FluxTableRow>
        </template>
        <FluxTableRow>
            <FluxTableCell><kbd>--acceleration-curve</kbd></FluxTableCell>
            <FluxTableCell><code>cubic-bezier(0.4, 0, 1, 1)</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--deceleration-curve</kbd></FluxTableCell>
            <FluxTableCell><code>cubic-bezier(0, 0, 0.2, 1)</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--standard-curve</kbd></FluxTableCell>
            <FluxTableCell><code>cubic-bezier(0.4, 0, 0.2, 1)</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--swift-out</kbd></FluxTableCell>
            <FluxTableCell><code>cubic-bezier(0.55, 0, 0.1, 1)</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--transition-default</kbd></FluxTableCell>
            <FluxTableCell><code>180ms var(--swift-out)</code></FluxTableCell>
        </FluxTableRow>
    </FluxTable>
</FluxPane>

## Overriding tokens

All tokens are regular CSS custom properties, so you can override them at any level — globally, on a single component, or even inline.

```scss
:root {
    --radius: 8px;            /* Square off the entire UI. */
    --primary-600: #0070f3;   /* Replace the primary accent. */
}

.my-card {
    --surface: var(--primary-50);
    --surface-stroke: var(--primary-200);
}
```

Because semantic tokens reference palette tokens (e.g. `--surface: var(--gray-25)`), changing a single palette token cascades through every component that uses it.
