---
outline: deep

props:
    -   name: variant
        description: The default annotation style for every highlighter in the group that doesn't set its own.
        type: [ '"highlight"', '"box"', '"circle"', '"underline"', '"strike-through"', '"crossed-off"', '"bracket"' ]
        optional: true

    -   name: color
        description: The default annotation color for every highlighter in the group that doesn't set its own. Accepts any CSS color.
        type: string
        optional: true

    -   name: stroke-width
        description: The default stroke width for every highlighter in the group that doesn't set its own.
        type: number
        optional: true

    -   name: animation-duration
        description: The default draw animation duration in milliseconds for every highlighter in the group that doesn't set its own.
        type: number
        optional: true

    -   name: iterations
        description: The default number of draw iterations for every highlighter in the group that doesn't set its own.
        type: number
        optional: true

    -   name: padding
        description: The default spacing between the element and the annotation, in pixels, for every highlighter in the group that doesn't set its own.
        type: number
        optional: true

    -   name: multiline
        description: The default multiline behavior for every highlighter in the group that doesn't set its own.
        type: boolean
        optional: true

    -   name: when-in-view
        description: Draw the cascade only once the group scrolls into view instead of immediately.
        type: boolean
        default: false
        optional: true

slots:
    -   name: default
        description: The content, holding one or more Highlighter components.
---

# Highlighter group

This component wraps several [Highlighter](./highlighter) components and draws their annotations as one sequence, one after another in document order, instead of all at once. Internally the annotations are combined through rough-notation's `annotationGroup`, which staggers each draw by the previous one's duration.

Every highlighter inside a group hands its annotation to the group, so the individual `when-in-view` of each highlighter is ignored: the whole cascade is controlled here. The group can also supply defaults for the annotation props, such as `variant` and `color`, which the highlighters inherit unless they set their own.

::: render
render=../../code/visuals/highlighter-group/preview.vue
:::

When `prefers-reduced-motion` is set the cascade is skipped and every annotation appears instantly.

<FrontmatterDocs/>

## Examples

::: example Defaults || Set the annotation props once on the group; each highlighter inherits them and can still override them individually.
example=../../code/visuals/highlighter-group/defaults.vue
:::

::: example When in view || Set `when-in-view` to defer the whole cascade until the group scrolls into the viewport.
example=../../code/visuals/highlighter-group/in-view.vue
:::
