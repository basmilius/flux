---
outline: deep

props:
    -   name: focal-point
        description: The focal point.
        type: FluxFocalPointObject
        optional: true

    -   name: alt
        description: Alt text of the image.
        type: string
        optional: true

    -   name: src
        description: Source of the image.
        type: string
---

# Focal point image

This component allows users to interact with an image by setting a focal point and viewing the result. It provides an editing mode to adjust the focal point's position and a preview mode to reflect the changes visually.

::: render
render=../../../code/guide/components/focal-point/image/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Editor
example=../../../code/guide/components/focal-point/image/image.vue
:::
