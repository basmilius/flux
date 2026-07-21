---
outline: deep

props:
    -   name: title
        description: A heading shown above the body of the note.
        type: string
        optional: true

    -   name: color
        description: The tint of the note.
        type: FluxColor
        optional: true

slots:
    -   name: default
        description: The body of the note. Plain text, or any Flux component.
---

# Note

`FluxFlowNote` is an annotation on the canvas: the remark that explains why a step is there, or what the person reading the flow has to know about it.

A note is a full node rather than a decoration, so it gets an `id` through its [Node](./node) like everything else and you hang it off the step it belongs to with a connector. A dashed line without markers reads as a remark rather than as a step in the flow.

::: render
render=../../code/flow/components/note/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Annotating a flow || Two notes hang off the steps they explain. Dashed connectors without markers keep them out of the flow itself.
example=../../code/flow/components/note/flow.vue
:::

## Used components

- [Flow](./flow)
- [Node](./node)
- [Connection](./connection)
