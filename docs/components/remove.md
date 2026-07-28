---
outline: deep

requiredIcons:
    - xmark

emits:
    -   name: click
        description: Triggered when the remove button is clicked.
        type: [ MouseEvent ]

props:
    -   name: icon
        description: The icon shown inside the button.
        type: FluxIconName
        default: xmark
        optional: true

    -   name: is-hidden
        description: Fades and scales the button out. It also stops receiving pointer events and leaves the tab order, so a button that is out of view is out of reach too.
        type: boolean
        optional: true
---

# Remove

The remove button is the small round badge that deletes the thing it sits on. [Gallery item](./gallery/item) uses it to remove an image; reach for it whenever a thumbnail, tile or card needs the same affordance.

::: render
render=../code/components/remove/preview.vue
:::

::: tip
The button positions itself against the top-right corner of its nearest positioned ancestor, so give that element a `position` of its own. It is meant to overlap that corner.
:::

::: info
The accessible name comes from the `flux.delete` translation, so the button announces itself without a label of your own.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A remove button on a thumbnail.
example=../code/components/remove/basic.vue
:::

::: example Reveal on hover || Set `is-hidden` to keep the button out of the way until the item is hovered or focused, the way a gallery item does it.
example=../code/components/remove/hidden.vue
:::

::: example Custom icon || Any icon fits, for when `xmark` reads as the wrong action.
example=../code/components/remove/icon.vue
:::

## Used components

- [Icon](./icon)
