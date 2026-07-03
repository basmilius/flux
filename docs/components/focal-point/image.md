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

The focal point image renders an image positioned around a given focal point, so the most important part stays visible when the image is cropped to its container.

::: render
render=../../code/components/focal-point/image/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Editor
example=../../code/components/focal-point/image/image.vue
:::
