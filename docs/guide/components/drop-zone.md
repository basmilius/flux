---
outline: deep

emits:
    -   name: select
        description: Triggered when a file is selected.
        type: [ File ]
        
    -   name: select-multiple
        description: Triggered when multiple files are selected.
        type: [ FileList ]

props:
    -   name: accept
        description: Configure which file types the drop zone accepts.
        type: string
        optional: true

    -   name: disabled
        description: If the drop zone is disabled.
        type: boolean
        optional: true

    -   name: is-empty
        description: If the placeholder should be shown.
        type: boolean
        optional: true
        
    -   name: is-loading
        description: If the drop zone is in a loading state.
        type: boolean
        optional: true

    -   name: is-multiple
        description: If it's allowed to upload multiple files.
        type: boolean
        optional: true

slots:
    -   name: default
        description: Content that is shown when the drop zone is not empty.
        type:
            isDragging: boolean
            isDraggingOver: boolean
            showPicker: "() => void"

    -   name: placeholder
        description: Content that is shown when the drop zone is empty.
        type:
            isDragging: boolean
            isDraggingOver: boolean
            showPicker: "() => void"
---

# Drop zone

Allows files to be dropped on the contents of the drop zone. This is mainly used in ui elements that allow users to upload files. It can be used in combination with FluxGallery for example.

::: render
render=../../code/guide/components/drop-zone/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic drop zone example.
example=../../code/guide/components/drop-zone/basic.vue
:::

## Used components

- [Spinner](./spinner)
