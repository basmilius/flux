---
outline: deep

emits:
    -   name: close
        description: Triggered when the slide over is closed.

props:
    -   name: is-closeable
        description: If the slide-over can be closed with the escape key.
        type: boolean
        optional: true

    -   name: view-key
        description: ??
        type: string
        optional: true

slots:
    -   name: default
        description: The content of the slide over.
---

# Slide over

A slide over is a modal-like interface that slides in from the side of the view to display additional content or options. It typically allows users to easily access important information without disrupting their current workflow. Slide overs are mostly used to reveal opions for an entity.

::: render
render=../../code/guide/components/slide-over/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic slide over.
example=../../code/guide/components/slide-over/basic.vue
:::

::: example Tabs || A slide over with tabs.
example=../../code/guide/components/slide-over/tabs.vue
:::
