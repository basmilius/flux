---
outline: deep

props:
    -   name: focal-point
        description: The focal point.
        type:
            x: number
            y: number

    -   name: alt
        description: Alt text of the image.
        type: string

    -   name: src
        description: Source of the image.
        type: string
---

# Focal point image

This component allows users to interact with an image by setting a focal point and viewing the result. It provides an editing mode to adjust the focal point's position and a preview mode to reflect the changes visually.

::: render
render=../../../code/guide/components/focal-point/editor/preview.vue
:::

<FrontmatterDocs/>
