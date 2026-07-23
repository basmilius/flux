---
outline: deep
---

# Typography

Flux ships a consistent typographic system covering font families, sizes, weights, and spacing. This page documents how typography works in Flux and how to apply it to text throughout your application.

Outside of any container, Flux applies only light element defaults: heading sizes and weights, link styling and a monospace font for code. Rich prose, with vertical rhythm, decorated blockquotes, list markers and styled tables, lives inside the [Prose](/components/prose) component. Every example below is wrapped in `FluxProse`.

::: tip
Flux uses the [Inter Variable](https://rsms.me/inter/) font family by default, you will need to include the font in your application for it to work.
:::

## The text scale

Text comes in six steps, and each step pairs a font-size with a line-height. Always set the two together: a font-size on its own derives its line box from a ratio, which lands on fractional pixels at every size except the default and drifts off the 3px grid.

```css
.my-label {
    font-size: var(--font-size-small);
    line-height: var(--line-height-small);
}
```

Pick a step by role rather than by measuring the design:

- **2xsmall** (12/18) for fine print, such as meta rows and counters.
- **xsmall** (13/18) for compact labels that sit inline in body text, like a badge.
- **small** (14/21) for interface text: tables, menus, tooltips.
- **default** (15/24) for body text. This is inherited, so you rarely set it.
- **large** (16/24) for a prominent single line, such as a pane caption.
- **xlarge** (18/27) for titles that sit below heading level.

Deviate from a pair only when an element has to line up with a line box it does not own. A checkbox label is the canonical case: the box is 21px, so its label takes `default` at a 21px line-height instead of its own 24px, or the two stop aligning.

Anything with a fixed height should set its own step rather than inherit one. A button is 42px tall whatever you put around it, so its label stays 15px even inside a 14px table cell. Text that should adapt to its surroundings, such as a badge sitting inline in a sentence, is the exception that inherits.

See [Design tokens](/guide/introduction/design-tokens#text-scale) for the full table.

## Examples
::: example Headings
example=../../code/guide/introduction/typography/headings.vue
:::

::: example Paragraph
example=../../code/guide/introduction/typography/paragraph.vue
:::

::: example Lists
example=../../code/guide/introduction/typography/lists.vue
:::

::: example Image
example=../../code/guide/introduction/typography/image.vue
:::

::: example Blockquote
example=../../code/guide/introduction/typography/blockquote.vue
:::

## Using Inter Variable font
If you desire to use the **Inter Variable** font, you need to override the `--font-sans` css variable. To achieve this, you'll need to add the following to your application.
```css [app.css]
:root {
    --font-sans: inter-variable, sans-serif;
}
```
