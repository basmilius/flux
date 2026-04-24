---
outline: deep

props:
    -   name: priority
        description: Priority for collapse ordering when inside a `FluxAdaptiveGroup`. Lower values collapse first; higher values keep their default slot longer. Ignored when the slot is used standalone.
        type: number
        optional: true
        default: 1

slots:
    -   name: default
        description: The preferred content. Rendered whenever it fits within the space allocated to the component.

    -   name: fallback
        description: The content rendered when the default slot does not fit. Optional — leave it out to hide the component entirely when default does not fit.
---

# Adaptive slot

The adaptive slot shows its default content whenever it fits within the space the component is allocated by its parent layout. When the default content is wider than the available space, the fallback content is rendered instead. This is useful for toolbars where buttons should collapse to icon-only variants, or even disappear, as horizontal space shrinks.

Wrap multiple adaptive slots inside a [`FluxAdaptiveGroup`](./adaptive-group) to control the order in which they collapse.

::: render
render=../../code/guide/components/adaptive-slot/preview.vue
:::

::: tip
When used standalone (without a `FluxAdaptiveGroup`), the component measures its own allocated width. Multiple standalone slots in the same parent each decide independently — the one with the widest default content typically collapses first.
:::

::: warning
Place the component inside a layout where it is allowed to shrink below its natural width. In a standalone flex context the default `flex-shrink: 1` is enough; in a grid context use `minmax(0, auto)` or similar. Inside a `FluxAdaptiveGroup` this is handled automatically.
:::

<FrontmatterDocs/>

## Examples

::: example Standalone || Two buttons that each decide on their own whether to show their label based on the space they are allocated.
example=../../code/guide/components/adaptive-slot/standalone.vue
:::
