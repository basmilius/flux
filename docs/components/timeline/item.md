---
outline: deep

props:
    -   name: color
        description: The color of the marker and connecting line.
        type: FluxColor
        default: gray
        optional: true

    -   name: icon
        description: The icon shown in the marker.
        type: FluxIconName
        optional: true

    -   name: photo
        description: A photo shown in the marker. When combined with `icon`, the icon is overlaid on the photo.
        type: string
        optional: true

    -   name: title
        description: The title shown in the item header.
        type: string
        optional: true

    -   name: when
        description: A timestamp or label shown next to the title.
        type: string
        optional: true

slots:
    -   name: default
        description: The body content of the timeline item.
---

# Timeline item

The timeline item represents a single event within the timeline. It aligns its content with the timeline's structure to illustrate the order and progression of events.

::: render
render=../../code/components/timeline/item/preview.vue
:::

<FrontmatterDocs/>

::: warning
This component is best used within a [Timeline](../timeline).
:::

## Examples

::: example Basic || A basic timeline item.
example=../../code/components/timeline/item/basic.vue
:::

::: example Pane || A basic timeline item inside a pane.
example=../../code/components/timeline/item/pane.vue
:::

::: example Colored markers || Use the `color` prop to convey the meaning of each event.
example=../../code/components/timeline/item/colored.vue
:::

::: example With photo || Set `photo` to render an avatar as the marker instead of an icon.
example=../../code/components/timeline/item/photo.vue
:::

::: example Photo with icon || Combine `photo` and `icon` to overlay an activity icon on top of the avatar.
example=../../code/components/timeline/item/photo-icon.vue
:::

::: example Plain markers || Without `icon` or `photo` the item renders a minimal marker on the line.
example=../../code/components/timeline/item/plain.vue
:::

## Used components

- [Icon](../icon)
