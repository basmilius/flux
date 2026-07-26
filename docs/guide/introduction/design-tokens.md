<script setup>
    import { FluxPane, FluxTable, FluxTableRow, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
</script>

# Design tokens

Flux exposes its visual language as CSS custom properties. Use them to theme your application, build new components that fit in seamlessly, or override individual values for a single element.

The colour tokens come in three layers, and which one you reach for matters:

| Layer | Example | Use it |
|---|---|---|
| **Semantic** | `--surface`, `--foreground`, `--surface-stroke` | Always, unless one of the other two applies |
| **Intent** | `--danger-solid`, `--primary-text` | When something carries a meaning: primary, danger, info, success or warning |
| **Palette** | `--palette-gray-600` | Only to build a token of your own out of |

The palette is deliberately the longest to type. A component that reaches straight into it has to answer for both themes by itself, and that is exactly the work the semantic layer already did. See [Colors](./colors) for the palette itself.

## How a token knows the theme

Every token is declared once, on `:root`, and picks its value through [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark). The theme is nothing more than `color-scheme`, which Flux sets from the `dark` and `light` attributes:

```scss
:root, [light] { color-scheme: light; }
[dark]         { color-scheme: dark; }
```

Three things follow from that.

`light-dark()` resolves against the element a token is *used* on, not the one it was declared on. So putting `dark` on any element flips every Flux token inside it, however deep:

```vue
<div dark>
    <!-- Everything in here is dark, on an otherwise light page. -->
</div>
```

Native UI follows along without extra work, because `color-scheme` is what the browser reads too: scrollbars, `<select>` popups, the date picker, autofill backgrounds and form controls.

And an application that wants to follow the operating system can skip the JavaScript entirely:

```css
:root { color-scheme: light dark; }
```

Two things break this, so avoid them when you build tokens of your own:

- Registering a colour token with `@property` and `syntax: '<color>'`. That computes the value eagerly on `:root` and freezes the theme there.
- Deriving an alpha variant with relative colour syntax over a token that holds a `light-dark()`, as in `oklch(from var(--surface) l c h / .5)`. Write the variant out per theme instead. Relative colour syntax over a *palette* stop is fine, since those hold a plain colour.

## Intents

Every intent carries the same eight roles, gray included. A component that takes a `color` prop maps them once and then styles against the result, so it never picks a shade itself.

| Role | What it is |
|---|---|
| `solid` | A filled surface in this intent: a button, a dot |
| `solid-hover`, `solid-active` | The same fill under interaction |
| `on-solid` | Text and icons on that fill |
| `soft` | A tinted background: a badge, a highlighted table row |
| `soft-hover` | The same tint under interaction |
| `border` | The edge around a soft area |
| `text` | Text in this intent, on a plain or a soft background |

`on-solid` is not the same choice for every intent. At the shade the fill uses in light mode, green and orange are too light to carry white text, so they take dark text instead. Because of that, `solid-hover` moves *away* from the foreground rather than always darkening: under white text it gets darker, under dark text it gets lighter.

Each of these pairs is held to a contrast target rather than picked by eye: `on-solid` on `solid` at least 4.5, `text` on both `surface` and `soft` at least 4.5, and `focus-ring` at least 3 on every elevation level.

```scss
@use '~flux/components/css/mixin';

@include mixin.color-variants(myComponent) using ($color) {
    @include mixin.intent($color);

    background: var(--intent-soft);
    border-color: var(--intent-border);
    color: var(--intent-text);
}
```

## Elevation

There are four levels: `--surface-sunken`, `--background`, `--surface` and `--surface-raised`.

The two themes signal height differently, which is why this is a token and not a shadow. In light every raised level stays white and the shadow does the work. In dark a shadow on a near-black surface separates nothing, so there the lightness of the layer carries the height, the light edge (`--surface-stroke-out`, white at a low alpha) backs it up, and the shadow is only tertiary.

Reach for the mixin rather than the individual declarations:

```scss
@use '~flux/components/css/mixin';

.myFlyout {
    @include mixin.elevation('raised');
}
```

## The tokens

Both themes are shown side by side. The value under each swatch is what the browser actually computed, read back from the live page.

<TokenTable/>

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
            <FluxTableCell>Tight rounding, used inside chips and small inputs.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--radius-double</kbd></FluxTableCell>
            <FluxTableCell><code>24px</code></FluxTableCell>
            <FluxTableCell>Larger rounding (heroes, illustrations).</FluxTableCell>
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
    </FluxTable>
</FluxPane>

### Text scale

Every size is paired with a line-height, and the two are always set together. The pairing is what keeps line boxes on the 3px grid: a font-size on its own would derive its line box from a ratio and land on fractional pixels.

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
            <FluxTableCell><kbd>--font-size-2xsmall</kbd><br/><kbd>--line-height-2xsmall</kbd></FluxTableCell>
            <FluxTableCell><code>12px</code><br/><code>18px</code></FluxTableCell>
            <FluxTableCell>Fine print: pagination, meta rows, calendar entries.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--font-size-xsmall</kbd><br/><kbd>--line-height-xsmall</kbd></FluxTableCell>
            <FluxTableCell><code>13px</code><br/><code>18px</code></FluxTableCell>
            <FluxTableCell>Compact labels, such as <code>FluxBadge</code> and <code>FluxText</code> at <code>small</code>.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--font-size-small</kbd><br/><kbd>--line-height-small</kbd></FluxTableCell>
            <FluxTableCell><code>14px</code><br/><code>21px</code></FluxTableCell>
            <FluxTableCell>Interface text: tables, menus, tooltips, snackbars.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--font-size-default</kbd><br/><kbd>--line-height-default</kbd></FluxTableCell>
            <FluxTableCell><code>15px</code><br/><code>24px</code></FluxTableCell>
            <FluxTableCell>Body text. Inherited from <code>body</code>, so this is what you get when nothing is set.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--font-size-large</kbd><br/><kbd>--line-height-large</kbd></FluxTableCell>
            <FluxTableCell><code>16px</code><br/><code>24px</code></FluxTableCell>
            <FluxTableCell>Prominent single lines: pane captions, section headers.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--font-size-xlarge</kbd><br/><kbd>--line-height-xlarge</kbd></FluxTableCell>
            <FluxTableCell><code>18px</code><br/><code>27px</code></FluxTableCell>
            <FluxTableCell>Titles below heading level, such as <code>FluxText</code> at <code>large</code>.</FluxTableCell>
        </FluxTableRow>
    </FluxTable>
</FluxPane>

Headings sit outside this scale and carry their own pair: `h1` is 27/42, `h2` is 21/33. The remaining levels line up with the scale, so `h3` is `xlarge`, `h4` is `large`, `h5` is `default` and `h6` is `small`.

::: tip Changing the base size
`--font-size-default` also sets the root font-size, so it is the basis for every `rem` in your own code. Override it on `:root` to rescale the interface, and override `--line-height-default` along with it to keep the rhythm on the grid.
:::

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

All tokens are regular CSS custom properties, so you can override them at any level: globally, on a single component, or even inline.

```scss
:root {
    --radius: 8px;                       /* Square off the entire UI. */
    --palette-primary-600: #0070f3;      /* Replace one shade of the accent. */
}

.my-card {
    --surface: var(--primary-soft);
    --surface-stroke: var(--primary-border);
}
```

Overriding a palette stop cascades into every token built on it, which is the cheapest way to reshade the interface. Be aware that it only reaches the theme that uses that stop: `--primary-solid` is stop 600 in light but stop 500 in dark, so recolouring the accent properly means overriding the intent token itself.

```scss
:root {
    --primary-solid: light-dark(#0070f3, #4d9bff);
    --primary-solid-hover: light-dark(#0059c4, #7ab4ff);
    --primary-on-solid: light-dark(#ffffff, #0a1220);
}
```

Overriding a semantic token on a subtree works the same way, and is how a section gets its own surface without touching anything global.
