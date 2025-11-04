---
outline: deep

emits:
    -   name: delete
        description: Triggered when the item is deleted.
        type: [  ]

props:
    -   name: focal-point
        description: The focal point of the image.
        type: FluxFocalPointObject
        optional: true

    -   name: is-deletable
        description: If the gallery is allowed to be deleted.
        type: boolean
        optional: true

    -   name: is-pending
        description: If the gallery item is pending.
        type: boolean
        optional: true

    -   name: url
        description: The url of the image.
        type: string
---

# Gallery Item

The gallery item represents a single image within the gallery. It displays the image in a consistent size and aspect ratio, ensuring a clean and uniform appearance across the grid. Gallery items are designed to showcase visual content clearly and maintain a cohesive layout within the gallery.

::: render
render=../../../code/guide/components/gallery/item/preview.vue
:::

::: tip
This component is best used within a [Gallery](../gallery).
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic gallery item.
example=../../../code/guide/components/gallery/item/basic.vue
:::

::: example Pending || A gallery item that is pending.
example=../../../code/guide/components/gallery/item/pending.vue
:::

::: example Delete || A gallery item that can be deleted.
example=../../../code/guide/components/gallery/item/delete.vue
:::

## Used components
- [Focal point](../focal-point)
    - [Image](../focal-point/image)
- [Remove](../remove)
- [Icon](../icon)
