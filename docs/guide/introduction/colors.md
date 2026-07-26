# Colors

Flux ships a color palette of six colors: **gray**, **primary**, **danger**, **info**, **success**, and **warning**. Each color is available in 12 shades, from 25 to 950, so you can make fine-grained design choices.

The palette is absolute: a shade is the same color in both themes, so `--palette-gray-950` is always near-black. It is also the layer you should reach for last. Styling against a shade means answering for both themes yourself, which is what the [semantic and intent tokens](./design-tokens) already do. They are what components are built on.

Shades are written in [OKLCH](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch), so lightness is perceptual and a shade can be mixed or tinted without the hue drifting.

::: warning Renamed in this version
The palette used to be exposed as `--gray-*`, `--primary-*` and so on, and dark mode mirrored the whole scale: `--gray-950` was near-black in light and near-white in dark. Those names still work but are frozen on the old mirrored values, and will be removed in the next major. Use `--palette-*` instead, or better, a semantic token.
:::

## Gray

<ColorPalette label="Gray" name="gray"/>

## Primary

<ColorPalette label="Primary" name="primary"/>

## Danger

<ColorPalette label="Danger" name="danger"/>

## Info

<ColorPalette label="Info" name="info"/>

## Success

<ColorPalette label="Success" name="success"/>

## Warning

<ColorPalette label="Warning" name="warning"/>
