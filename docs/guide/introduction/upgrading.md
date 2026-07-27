<script setup>
    import { FluxPane, FluxTable, FluxTableRow, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
</script>

# Upgrading

The color layer was rebuilt in this major. Components look after themselves, so an application that only renders Flux components has nothing to do. What changed is the part you were allowed to reach into: the palette custom properties, and how dark mode arrives at its values.

::: danger This breaks quietly
A removed custom property is not an error. Reading `--gray-200` now resolves to nothing and paints as though the declaration were never written, so a border disappears instead of turning the wrong color. Nothing warns you, in the browser or at build time. Find them before you upgrade:

```sh
# Every read of a removed stop.
grep -rnE 'var\([[:space:]]*--(gray|primary|danger|info|success|warning)-(25|50|100|200|300|400|500|600|700|800|900|950)\b' src

# Every declaration of one, which is how an application reshades the scale.
grep -rnE '(^|[^-[:alnum:]])--(gray|primary|danger|info|success|warning)-(25|50|100|200|300|400|500|600|700|800|900|950)[[:space:]]*:' src
```

Run both. The second one is the easier miss: an application that reshaded Flux by declaring the scale keeps compiling, keeps validating, and silently stops reshading anything.

A Sass loop over your color names and a template literal in JavaScript both hide the same reference behind interpolation, where neither pattern will find it. Those are worth a pass by hand.
:::

## The palette moved behind a prefix

Every stop is now `--palette-<scale>-<stop>`. The six scales and their twelve stops are otherwise unchanged in name and in count, so this rename is mechanical:

```scss
/* Before */  --gray-700
/* After  */  --palette-gray-700
```

It is also the option to reach for last. The stop you were reading almost certainly has a role above it, and that role is what dark mode is calibrated on.

## From a stop to a role

The table below is the substitution that was applied across the library itself. It reads the way light mode used to, which is where these mappings came from.

<FluxPane>
    <FluxTable>
        <template #header>
            <FluxTableRow>
                <FluxTableHeader>Was</FluxTableHeader>
                <FluxTableHeader>Now</FluxTableHeader>
                <FluxTableHeader>Where</FluxTableHeader>
            </FluxTableRow>
        </template>
        <FluxTableRow>
            <FluxTableCell><kbd>--gray-25</kbd></FluxTableCell>
            <FluxTableCell><kbd>--surface</kbd></FluxTableCell>
            <FluxTableCell><p>A card, a pane, a menu.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--gray-50</kbd></FluxTableCell>
            <FluxTableCell><p><kbd>--surface-sunken</kbd>, <kbd>--surface-hover</kbd></p></FluxTableCell>
            <FluxTableCell><p>A strip inside a card, or a row under the pointer.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--gray-100</kbd></FluxTableCell>
            <FluxTableCell><p><kbd>--surface-canvas</kbd>, <kbd>--surface-active</kbd></p></FluxTableCell>
            <FluxTableCell><p>The ground a board is drawn on, or a row being pressed.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><p><kbd>--gray-200</kbd>, <kbd>--gray-300</kbd></p></FluxTableCell>
            <FluxTableCell><p><kbd>--surface-stroke</kbd>, <kbd>--surface-stroke-hover</kbd></p></FluxTableCell>
            <FluxTableCell><p>Separators, table rules, input borders.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><p><kbd>--gray-500</kbd>, <kbd>--gray-600</kbd></p></FluxTableCell>
            <FluxTableCell><p><kbd>--foreground-subtle</kbd>, <kbd>--foreground-secondary</kbd></p></FluxTableCell>
            <FluxTableCell><p>Decoration and supporting copy. Subtle is the one rung not held to AA, so keep copy off it.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><p><kbd>--gray-700</kbd>, <kbd>--gray-900</kbd></p></FluxTableCell>
            <FluxTableCell><p><kbd>--foreground</kbd>, <kbd>--foreground-prominent</kbd></p></FluxTableCell>
            <FluxTableCell><p>Body text and headings.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--primary-600</kbd></FluxTableCell>
            <FluxTableCell><kbd>--primary-solid</kbd></FluxTableCell>
            <FluxTableCell><p>A filled button or a checked box. Pair it with <kbd>--primary-on-solid</kbd> for the label.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--primary-700</kbd></FluxTableCell>
            <FluxTableCell><kbd>--primary-text</kbd></FluxTableCell>
            <FluxTableCell><p>Colored text, on the surface or on its own soft fill.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><p><kbd>--primary-50</kbd>, <kbd>--primary-100</kbd></p></FluxTableCell>
            <FluxTableCell><p><kbd>--primary-soft</kbd>, <kbd>--primary-soft-hover</kbd></p></FluxTableCell>
            <FluxTableCell><p>A tinted chip, notice or table row.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--primary-200</kbd></FluxTableCell>
            <FluxTableCell><kbd>--primary-border</kbd></FluxTableCell>
            <FluxTableCell><p>The edge of that tint.</p></FluxTableCell>
        </FluxTableRow>
    </FluxTable>
</FluxPane>

All six intents carry the same nine roles, gray included, so `--danger-solid` and `--success-soft` are spelled exactly like their primary counterparts. See [Design tokens](./design-tokens) for the full list.

## Dark mode no longer mirrors the palette

The old palette flipped: `--gray-950` was near-black in light and near-white in dark, and a component picked one stop for both. That is gone. A stop is now absolute, the same color in either theme, and the semantic and intent layers pick per theme through [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark).

Two consequences worth knowing before you port anything.

A token that was mirrored has no single replacement. `--gray-950` as text meant near-black in light and near-white in dark, which is `--foreground-prominent`, not `--palette-gray-950`. Translating the stop rather than the intent gets you near-black text on a near-black surface.

And dark mode now follows `color-scheme` rather than an attribute Flux reads itself, so the `dark` attribute works on any element and nests. A dark section on a light page needs no extra styling, and native UI (scrollbars, `<select>` popups, autofill) follows along. See [Dark mode](./dark-mode).

## Palette overrides belong on `:root`

If you reshade Flux by overriding the scale, the declarations have to sit on the root element. A semantic token is declared on `:root` and substitutes its `var(--palette-*)` right there, so an override further down the tree arrives too late and changes nothing at all.

```scss
:root {
    --palette-gray-500: oklch(.6411 .0342 60);
    --palette-gray-600: oklch(.5199 .0408 60);
    /* ...and so on for the rest of the scale. */
}
```

Overriding a *semantic* token on a subtree does still work, because those are read at the point of use. That is the tool for giving one section its own surface.

One shape the absolute palette cannot express: a `[dark]` block that swaps a warm light scale for a cool dark one. Dark inherits the hue light picked. When a theme really needs two hues, override the semantic tokens with `light-dark()` instead of the scale.

## Also removed

<FluxPane>
    <FluxTable>
        <template #header>
            <FluxTableRow>
                <FluxTableHeader>Token</FluxTableHeader>
                <FluxTableHeader>Replacement</FluxTableHeader>
            </FluxTableRow>
        </template>
        <FluxTableRow>
            <FluxTableCell><kbd>--overlay-strong</kbd></FluxTableCell>
            <FluxTableCell><p><kbd>--surface-inverse</kbd>, which is what the tooltip moved to.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><p><kbd>--intent-solid-hover</kbd>, <kbd>--intent-solid-active</kbd>, <kbd>--intent-on-solid</kbd></p></FluxTableCell>
            <FluxTableCell><p>Only relevant if you build against the Sass mixins. Read <kbd>--&lt;color&gt;-solid-hover</kbd> and friends directly.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><p><kbd>--chart-primary</kbd>, <kbd>--chart-secondary-1</kbd>, <kbd>--chart-secondary-2</kbd></p></FluxTableCell>
            <FluxTableCell><p><kbd>--chart-1</kbd> and the seven after it. See below.</p></FluxTableCell>
        </FluxTableRow>
    </FluxTable>
</FluxPane>

## Chart colors are their own layer now

`@flux-ui/statistics` used to derive its series colors from the primary and gray scales: `--chart-1` was `--chart-primary` was `--primary-700`, and the two `--chart-secondary-*` tokens were gray stops. A chart therefore inherited whatever the palette did, including the mirroring, and four series was as far as it went.

Charts now have a token layer of their own, solved per theme against the surface a series is actually drawn on:

- `--chart-1` through `--chart-8`, ordered by prominence. Spend them in order.
- `--chart-ramp-1` through `--chart-ramp-4` for a sequential ramp.
- `--chart-colorful-1` through `--chart-colorful-17` when eight categories are not enough.
- `--chart-positive`, `--chart-negative`, `--chart-grid`, `--chart-label` and `--chart-on-fill`.

`--chart-1` through `--chart-4` kept their names but not their values: they were a monochrome primary ramp and are now a four-hue categorical set. `--chart-primary` and the two `--chart-secondary-*` tokens are gone, so an override on one of them does nothing.

The two exported constants kept their names and nothing else. `CHART_COLORS` holds eight entries instead of four, and `CHART_COLORFUL_COLORS` holds `var(--chart-colorful-*)` references where it used to hold seventeen fixed hex values, none of which survives unchanged. Expect every chart to look different after upgrading, including one that names its colors explicitly. The reference form resolves anywhere CSS does, which is everywhere a Flux chart draws; it does not resolve if you were passing those values to a canvas fill or an export path of your own.

See [Chart colors](../../statistics/introduction/colors) for the full layer.

## Checking your own colors

The contrast contract only covers the tokens Flux ships. If you reshade the palette, the numbers move with it, and a brand color owes you nothing: a mid green or a bright amber at stop 600 does not carry white text.

Two checks catch most of it. Measure `--primary-on-solid` against `--primary-solid` (the label on a filled button), and `--primary-text` against `--surface` (colored text on a card). Both should clear 4.5:1 in both themes. If the fill fails, give `--primary-on-solid` a color that survives on it, or point `--primary-solid` and its two states at darker stops of the same scale. Darkening the stops themselves is the worst of the three, since every other role reads them too.
