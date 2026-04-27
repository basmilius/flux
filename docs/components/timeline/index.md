---
outline: deep

slots:
    -   name: default
        description: The content of the timeline.
---

# Timeline

The timeline component serves as the main container for organizing and displaying a sequence of events or steps. It should always be used as the parent component of FluxTimelineItem, ensuring each item is properly aligned and visually connected within the timeline.

::: render
render=../../code/components/timeline/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic timeline.
example=../../code/components/timeline/basic.vue
:::

::: example Pane || A timeline inside a pane.
example=../../code/components/timeline/pane.vue
:::
