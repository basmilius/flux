---
outline: deep

props:
    -   name: is-center
        description: Vertically centers the media within the item.
        type: boolean
        optional: true

    -   name: size
        description: The size of the media area in pixels.
        type: number
        optional: true

slots:
    -   name: default
        description: The media content, such as an avatar or image.
---

# Item media

The item media area holds a visual element such as an avatar, icon, or image that accompanies the item content.

::: render
render=../../code/components/item/media/preview.vue
:::

::: tip
This component is best used within an [Item](./index).
:::

<FrontmatterDocs/>
