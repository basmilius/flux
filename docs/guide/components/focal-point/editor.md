---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the selected focal point changes.
        type: [ "number, number" ]

props:
    -   name: model-value
        description: The focal point.
        type: "[number, number]"

    -   name: src
        description: Source of the image.
        type: string
---

# Focal point editor

This component allows users to interact with an image by setting a focal point and viewing the result. It provides an editing mode to adjust the focal point's position and a preview mode to reflect the changes visually.

::: render
render=../../../code/guide/components/focal-point/editor/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Editor
example=../../../code/guide/components/focal-point/editor/editor.vue
:::

## Used components

- [Button](../button)
- [Layout](../layout)
    - [Spacer](../layout/spacer)
- [Pane](../pane)
    - [Body](../pane/body)
    - [Footer](../pane/footer)
