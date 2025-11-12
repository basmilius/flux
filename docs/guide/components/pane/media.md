---
outline: deep

props:
    -   name: image-alt
        description: The alt tag for the image.
        type: string
        optional: true

    -   name: image-focal-point
        description: The focal point of the image.
        type: '[number, number]'
        optional: true

    -   name: image-url
        description: The source of the image.
        type: string
        optional: true

    -   name: is-inset
        description: If the media should have some whitespace around it.
        type: boolean
        optional: true
---

# Pane media

The pane media is used to display an image element within a pane. It ensures the media is sized and positioned appropriately, maintaining a clean visual hierarchy. Pane media is helpful for panes that include supporting images, thumbnails, or promotional graphics.

::: render
render=../../../code/guide/components/pane/media/preview.vue
:::

<FrontmatterDocs/>

## Examples 

::: example Full || A media pane with a full image.
example=../../../code/guide/components/pane/media/full.vue
:::

::: example Inset || A media pane with whitespace around the media.
example=../../../code/guide/components/pane/media/inset.vue
:::
