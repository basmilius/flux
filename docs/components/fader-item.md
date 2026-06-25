---
outline: deep

slots:
    -   name: default
        description: The content of the fader item.
---

# Fader item

A fader item is a single slide within a [Fader](./fader). Each item is shown in turn according to the fader's interval.

::: render
render=../code/components/fader-item/preview.vue
:::

::: tip
This component is best used within a [Fader](./fader).
:::

::: tip Accessibility
Each item is exposed as a slide (`aria-roledescription="slide"`). Items that are not currently visible are automatically marked `aria-hidden`, so assistive technology only announces the active slide.
:::

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/components/fader-item/preview.vue [FluxFaderItem.vue]

:::
