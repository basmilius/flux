---
outline: deep

emits:
    -   name: select
        description: Triggered when a file is selected.
        type: [ FileList ]

props:
    -   name: accept
        description: Configure which file types the drop zone accepts.
        type: string
        optional: true

    -   name: disabled
        description: Wether the drop zone is disabled.
        type: boolean
        optional: true

    -   name: is-empty
        description: Wether the placeholder should be shown.
        type: boolean
        optional: true

    -   name: is-multiple
        description: If it's allowed to upload multiple files.
        type: boolean
        optional: true

    -   name: placeholder-button
        description: The text on the button within the placeholder.
        type: string
        optional: true

    -   name: placeholder-icon
        description: The icon of the placeholder.
        type: FluxIconName
        optional: true

    -   name: placeholder-message
        description: The message of the placeholder.
        type: string
        optional: true

    -   name: placeholder-title
        description: The title of the placeholder.
        type: string
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

::: example Basic
example=../../code/guide/components/drop-zone/preview.vue
:::
