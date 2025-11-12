---
outline: deep

emits:
    -   name: delete
        description: Triggered when an item within the gallery is deleted.
        type: [ number ]
        
    -   name: upload
        description: Triggered when new images have been uploaded.
        type: [ 'File[]' ]
        
props:
    -   name: items
        description: The URLs of images to display.
        type: [ '(string | (FluxFocalPointObject & { readonly url: string; }))[]' ]
        optional: true
        
    -   name: pending-items
        description: The URLs of images that are pending.
        type: [ 'string[]' ]
        optional: true
        
    -   name: is-editable
        description: If the gallery is allowed to be edited. This also includes uploading new images.
        type: boolean
        optional: true

slots:
    -   name: default
        description: Allows custom gallery items to be placed without items and pending-items.

requiredIcons:
    - plus
---

# Gallery

The Gallery component is used to display multiple media entities in a grid. It also allows the user to upload new media to it and control them further.

::: render
render=../../../code/guide/components/gallery/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic gallery.
example=../../../code/guide/components/gallery/basic.vue
:::

::: example Pending || A gallery with pending items
example=../../../code/guide/components/gallery/pending.vue
:::

::: example Edit || A gallery that can be edited.
example=../../../code/guide/components/gallery/edit.vue
:::

## Used components

- [Dropzone](../drop-zone)
- [Gallery](../gallery)
    - [Item](./item)
- [Icon](../icon)
