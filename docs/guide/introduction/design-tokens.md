# Design tokens

Flux exposes its visual language as CSS custom properties. Use them to theme your application, build new components that fit in seamlessly, or override individual values for a single element.

The color tokens come in three layers, and which one you reach for matters:

| Layer        | Example                                                                    | Use it                                                                       |
|--------------|----------------------------------------------------------------------------|------------------------------------------------------------------------------|
| **Semantic** | <kbd>--surface</kbd>, <kbd>--foreground</kbd>, <kbd>--surface-stroke</kbd> | Always, unless one of the other two applies.                                 |
| **Intent**   | <kbd>--danger-solid</kbd>, <kbd>--primary-text</kbd>                       | When something carries a meaning: primary, danger, info, success or warning. |
| **Palette**  | <kbd>--palette-gray-600</kbd>                                              | To reshade the whole interface, or to build a token of your own out of.      |

The palette is deliberately the longest to type. A component that reaches straight into it has to answer for both themes by itself, and that is exactly the work the semantic layer already did. See [Colors](./colors) for the palette itself, and [Upgrading to v4](./upgrading-v4) if you are coming from a version that exposed the scales as `--gray-*`.

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

- Registering a color token with `@property` and `syntax: '<color>'`. That computes the value eagerly on `:root` and freezes the theme there.
- Deriving an alpha variant with relative color syntax over a token that holds a `light-dark()`, as in `oklch(from var(--surface) l c h / .5)`. Write the variant out per theme instead. Relative color syntax over a *palette* stop is fine, since those hold a plain color.

## Intents

Every intent carries the same nine roles, gray included. A component that takes a `color` prop maps them once and then styles against the result, so it never picks a shade itself.

| Role                                            | What it is                                                                                                |
|-------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| <kbd>solid</kbd>                                | A filled surface in this intent: a button, a status pill.                                                 |
| <kbd>solid-hover</kbd>, <kbd>solid-active</kbd> | The same fill under interaction.                                                                          |
| <kbd>on-solid</kbd>                             | Text and icons on that fill.                                                                              |
| <kbd>muted</kbd>                                | A filled marking that carries information without asking for attention: a dot, a spinner, a progress bar. |
| <kbd>soft</kbd>                                 | A tinted background: a badge, a highlighted table row.                                                    |
| <kbd>soft-hover</kbd>                           | The same tint under interaction.                                                                          |
| <kbd>border</kbd>                               | The edge around a soft area.                                                                              |
| <kbd>text</kbd>                                 | Text in this intent, on a plain or a soft background.                                                     |

`text` is one rung, not two. There was a second, stronger one for a title over its body, placed where `--foreground-prominent` sits on the gray ramp. On the neutral scale that reads as more emphasis; on a colored one it walks out of the color, because chroma peaks in the middle of a scale and falls away at both ends. In dark it cost four fifths of the hue, so a danger notice and an info notice were told apart by their icon and nothing else. A title is set off by weight and by being colored at all, which is what it was before.

`muted` exists next to `solid` because a dot and a button are not the same request. All six intents put `muted` the same perceptual distance from `--surface`, which `solid` cannot do: a gray `solid` is the strongest ink on the page, so a gray dot drawn with it outweighs a red one.

`on-solid` is not the same choice for every intent. At the shade the fill uses in light mode, green and orange are too light to carry white text, so they take dark text instead. Because of that, `solid-hover` moves *away* from the foreground rather than always darkening: under white text it gets darker, under dark text it gets lighter.

Each of these pairs is held to a contrast target rather than picked by eye: `on-solid` on `solid` at least 4.5, `text` at least 4.5 on `surface`, `soft` and `soft-hover`, and `focus-ring` at least 3 on every elevation level.

In your own code, read the roles straight off the intent you need. They are ordinary custom properties, so plain CSS is enough:

```css
.my-chip {
    background: var(--primary-soft);
    border: 1px solid var(--primary-border);
    color: var(--primary-text);
}
```

::: info Inside the library
Flux itself never writes an intent out per color. A component with a `color` prop runs one Sass loop that maps six of the roles onto a local `--intent-*` contract and then styles against that: `solid`, `muted`, `soft`, `soft-hover`, `border` and `text`. The three the mixin leaves out (`solid-hover`, `solid-active`, `on-solid`) are read straight off the intent, as `var(--#{$color}-solid-hover)`. Those mixins live in this repository under `~flux/components/css/mixin`; the alias is a monorepo path and `@flux-ui/components` publishes no `./css/*` entry, so the snippet below is for contributors to Flux, not for consumers.

```scss
@use '~flux/components/css/mixin';

@include mixin.color-variants(myComponent) using ($color) {
    @include mixin.intent($color);

    background: var(--intent-soft);
    border-color: var(--intent-border);
    color: var(--intent-text);
}
```
:::

## Elevation

There are five levels: `--surface-canvas`, `--background`, `--surface-sunken`, `--surface` and `--surface-raised`.

The two themes signal height differently, which is why this is a token and not a shadow. In light every raised level stays white and the shadow does the work. In dark a shadow on a near-black surface separates nothing, so there the lightness of the layer carries the height, the light edge (`--surface-stroke-out`, white at a low alpha) backs it up, and the shadow is only tertiary.

That difference is also why the order is not the same in both themes. `--surface-canvas` is the ground a board, a canvas or a well is drawn on, and it stays below everything in both. `--surface-sunken` is not a level of its own but a strip that has to read against the card it sits in: a table head, a pane footer, a tab bar. In light it does that by going darker than the card, in dark by going lighter, because a strip that moves further towards black stops holding its borders and its text.

| Token                       | Light                       | Dark                |
|-----------------------------|-----------------------------|---------------------|
| <kbd>--surface-canvas</kbd> | Below the page.             | Below the page.     |
| <kbd>--background</kbd>     | The page.                   | The page.           |
| <kbd>--surface-sunken</kbd> | Below the card.             | **Above** the card. |
| <kbd>--surface</kbd>        | The card.                   | The card.           |
| <kbd>--surface-raised</kbd> | The card, lifted by shadow. | Above the card.     |

A level is more than a background. Set the hairline along with it, and publish what you painted as `--surface-current` so anything inside can read the surface it is actually sitting on rather than naming one:

```css
.my-flyout {
    --surface-current: var(--surface-raised);

    background-color: var(--surface-current);
    background-clip: padding-box;
    border: 1px solid var(--surface-stroke-out);
    border-radius: var(--radius);
}
```

`background-clip` belongs to that border: `--surface-stroke-out` is translucent, so without it the background paints underneath the hairline and shows through it. Longhand rather than the `background` shorthand for the same reason, since the shorthand resets the clip.

A drop shadow is yours to add on top; the block above deliberately carries none.

::: info Inside the library
Contributors have `mixin.elevation($level, $radius)` for exactly this block. It knows three levels: `'sunken'`, `'surface'` (the default) and `'raised'`. `--surface-canvas` and `--background` are grounds a page, a board or a canvas is drawn on rather than levels a component lifts itself to, so those are set by hand. The same alias caveat as above applies, so this is not available to consumers.

```scss
@use '~flux/components/css/mixin';

.myFlyout {
    @include mixin.elevation('raised');
}
```
:::

## The tokens

Both themes are shown side by side. The value under each swatch is what the browser actually computed, read back from the live page.

<TokenTable/>

## Radius

| Token                      | Value    | Usage                                               |
|----------------------------|----------|-----------------------------------------------------|
| <kbd>--radius</kbd>        | `12px`   | Default border-radius for surfaces and inputs.      |
| <kbd>--radius-half</kbd>   | `6px`    | Tight rounding, used inside chips and small inputs. |
| <kbd>--radius-double</kbd> | `24px`   | Larger rounding (heroes, illustrations).            |
| <kbd>--radius-full</kbd>   | `9999px` | Pill-shaped components such as `FluxBadge`.         |

## Typography

| Token                       | Value                        |
|-----------------------------|------------------------------|
| <kbd>--font-sans</kbd>      | `inter-variable, sans-serif` |
| <kbd>--font-monospace</kbd> | `jetbrains-mono, monospace`  |
| <kbd>--font-serif</kbd>     | `serif`                      |

### Text scale

Every size is paired with a line-height, and the two are always set together. The pairing is what keeps line boxes on the 3px grid: a font-size on its own would derive its line box from a ratio and land on fractional pixels.

| Token                                                           | Value         | Usage                                                                          |
|-----------------------------------------------------------------|---------------|--------------------------------------------------------------------------------|
| <kbd>--font-size-2xsmall</kbd> <kbd>--line-height-2xsmall</kbd> | `12px` `18px` | Fine print: pagination, meta rows, calendar entries.                           |
| <kbd>--font-size-xsmall</kbd> <kbd>--line-height-xsmall</kbd>   | `13px` `18px` | Compact labels, such as `FluxBadge` and `FluxText` at `small`.                 |
| <kbd>--font-size-small</kbd> <kbd>--line-height-small</kbd>     | `14px` `21px` | Interface text: tables, menus, tooltips, snackbars.                            |
| <kbd>--font-size-default</kbd> <kbd>--line-height-default</kbd> | `15px` `24px` | Body text. Inherited from `body`, so this is what you get when nothing is set. |
| <kbd>--font-size-large</kbd> <kbd>--line-height-large</kbd>     | `16px` `24px` | Prominent single lines: pane captions, section headers.                        |
| <kbd>--font-size-xlarge</kbd> <kbd>--line-height-xlarge</kbd>   | `18px` `27px` | Titles below heading level, such as `FluxText` at `large`.                     |

Headings sit outside this scale and carry their own pair: `h1` is 27/42, `h2` is 21/33. The remaining levels line up with the scale, so `h3` is `xlarge`, `h4` is `large`, `h5` is `default` and `h6` is `small`.

::: tip Changing the base size
`--font-size-default` also sets the root font-size, so it is the basis for every `rem` in your own code. Override it on `:root` to rescale the interface, and override `--line-height-default` along with it to keep the rhythm on the grid.
:::

## Motion

The motion tokens drive every Flux transition. Use them when you build custom animations so timings stay consistent with the rest of the system.

| Token                           | Value                           |
|---------------------------------|---------------------------------|
| <kbd>--acceleration-curve</kbd> | `cubic-bezier(0.4, 0, 1, 1)`    |
| <kbd>--deceleration-curve</kbd> | `cubic-bezier(0, 0, 0.2, 1)`    |
| <kbd>--standard-curve</kbd>     | `cubic-bezier(0.4, 0, 0.2, 1)`  |
| <kbd>--swift-out</kbd>          | `cubic-bezier(0.55, 0, 0.1, 1)` |
| <kbd>--transition-default</kbd> | `180ms var(--swift-out)`        |

## Overriding tokens

All tokens are regular CSS custom properties, so you can override them: semantic and intent tokens at any level, globally or on a subtree, and palette stops on `:root`.

### Reshading the whole interface

The semantic and intent layers are built out of `var(--palette-*)` references, so replacing a scale cascades into everything above it. This is the cheapest way to give Flux a different character.

```scss
:root {
    --palette-gray-500: oklch(.6411 .0342 60);   /* A warm gray instead of a cool one. */
    --palette-gray-600: oklch(.5199 .0408 60);
    /* ...and so on for the rest of the scale. */
}
```

That reaches **both themes**. Light mode maps its surfaces and text straight onto the stops. Dark mode needs about ten neutral steps between `L .15` and `L .42` where the scale has four, so those are not stops; they take their lightness from a ramp solved against a contrast target, and their hue and chroma off `--palette-gray-500`. Recolor the scale and dark follows. Move a stop's lightness and dark keeps its own, which is deliberate: that ramp is what carries the contrast guarantees.

The same holds for the five colored intents, where `soft`, `soft-hover` and `border` are anchored to stop 500 of their own scale in dark.

> [!NOTE]
> Palette overrides belong on `:root`. A semantic token is declared there too, so it is substituted at that point and a palette override further down the tree arrives too late. Overriding a *semantic* token on a subtree does work, because those are read at the point of use.

### Retheming one thing

To change a single role rather than a whole scale, override the token itself. `--primary-solid` is stop 600 in light but stop 500 in dark, so a new accent is clearest written out per theme.

```scss
:root {
    --primary-solid: light-dark(#0070f3, #4d9bff);
    --primary-solid-hover: light-dark(#0059c4, #7ab4ff);
    --primary-on-solid: light-dark(#ffffff, #0a1220);
}

.my-card {
    --surface: var(--primary-soft);
    --surface-stroke-out: var(--primary-border);
    --surface-stroke: var(--primary-border);
}
```

Overriding a semantic token on a subtree is how a section gets its own surface without touching anything global.

Note which line does the edge. An elevation level draws its border with `--surface-stroke-out`, the translucent hairline that comes with the level, so a pane keeps its ordinary edge until that one is overridden. `--surface-stroke` is the opaque line *inside* it: separators, table rules, input borders. Change whichever you mean, or both, as above.
