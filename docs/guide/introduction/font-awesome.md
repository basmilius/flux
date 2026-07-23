---
next: false
---

# Font Awesome

Flux uses [Font Awesome](https://fontawesome.com) as its icon library, giving you access to a large collection of icons for your UI. Icons must be registered before use.

## Register icons

Icons must be registered before use so they are available throughout your application. Import the icons you need from [Font Awesome](https://fontawesome.com) and register them with the `configureIcons` function.

::: code-group

```ts [icons.ts]
export {
    faCircleCheck,
    faCircleExclamation
} from '@fortawesome/pro-regular-svg-icons';
```

```ts [register.ts]
import { configureIcons } from '@flux-ui/components';
import * as icons from './icons.ts';

configureIcons({icons});
```

```vue [Page.vue]
<template>
    <FluxIcon
        name="circle-check"
        :size="24"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon } from '@flux-ui/components';
</script>
```

:::

> The standalone `fluxRegisterIcons(icons)` function still works but is deprecated in favor of `configureIcons({icons})`.

## Using the icon font

Instead of registering SVG icons, you can render icons with a Font Awesome webfont. Load the font yourself, bind its `font-family` to the style class Flux emits, then switch Flux to font mode with `configureIcons`. Icons keep being used the same way through the `name` prop.

In font mode `<FluxIcon name="user"/>` renders the icon name as the element's text and relies on the font's ligatures to turn it into the glyph:

```html
<i class="fa-regular">user</i>
```

::: code-group

```ts [main.ts]
import { configureIcons } from '@flux-ui/components';

configureIcons({
    renderMode: 'font',
    defaultStyle: 'regular'
});
```

```css [fonts.css]
@font-face {
    font-family: font-awesome;
    src: url(...);
}

/* Bind the style class Flux emits to the loaded font. */
.fa-regular {
    font-family: font-awesome;
    font-weight: 400;
}
```

```vue [Page.vue]
<template>
    <FluxIcon name="circle-check"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon } from '@flux-ui/components';
</script>
```

:::

Because Font Awesome glyphs draw with `currentColor`, the `color` and `size` props behave exactly as they do in SVG mode. The internal Flux icons were designed against the `regular` family, so `defaultStyle: 'regular'` matches the default SVG look most closely.

### Choosing the style

Flux emits one style class per icon (`fa-solid`, `fa-regular`, `fa-light`, `fa-thin`, `fa-duotone`, `fa-brands`) that you bind to a `font-family`. `FluxIconName` only carries the name, so the style is resolved in this order:

1. The `icon-style` prop on the icon.
2. A per-name entry in `styleOverrides`.
3. The global `defaultStyle`.
4. `solid` as a fallback.

```ts
configureIcons({
    renderMode: 'font',
    defaultStyle: 'light',
    styleOverrides: {
        github: 'brands'
    }
});
```

```vue
<FluxIcon name="github" icon-style="brands"/>
```

### Duotone

Font Awesome draws a duotone icon as two stacked layers, so in `duotone` mode Flux renders the primary shape over a dimmed secondary one, both from a single `color`. Bind `.fa-duotone` to the duotone font like any other style; tune the secondary tone with the `--fa-secondary-opacity` custom property (default `.2`, matching the SVG rendering).

### Notes

- Font mode does not register any SVG data, so chart icons in `@flux-ui/statistics` still require SVG registration through `configureIcons({icons})`.
- The font must provide ligatures for the icon names; otherwise the bare name stays visible as text.

## Required icons

Below is a list of all the icons that Flux uses throughout the library.

```ts [icons.ts]
export {
    faAngleDown,
    faAngleLeft,
    faAngleRight,
    faAnglesUpDown,
    faArrowDown19,
    faArrowDownAZ,
    faArrowDownShortWide,
    faArrowUp91,
    faArrowUpAZ,
    faArrowUpArrowDown,
    faArrowUpWideShort,
    faCalendar,
    faCheck,
    faChevronDown,
    faChevronRight,
    faChevronUp,
    faCircleCheck,
    faCircleExclamation,
    faCircleInfo,
    faCircleXmark,
    faCloud,
    faEllipsis,
    faEllipsisH,
    faEye,
    faEyeSlash,
    faFilter,
    faMagnifyingGlass,
    faMinus,
    faPlus,
    faRotateLeft,
    faSlashForward,
    faSlidersSimple,
    faStar,
    faTrash,
    faUser,
    faXmark
} from '@fortawesome/pro-regular-svg-icons';
```
