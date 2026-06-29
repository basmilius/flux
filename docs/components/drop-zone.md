---
outline: deep

emits:
    -   name: reject
        description: Triggered when one or more files are rejected — either because they do not match `accept`, or because extra files were provided while `is-multiple` is off. Receives the rejected files.
        type: [ 'File[]' ]

    -   name: select
        description: Triggered when a file is selected.
        type: [ File ]
        
    -   name: select-multiple
        description: Triggered when multiple files are selected.
        type: [ FileList ]

props:
    -   name: accept
        description: 'Configure which file types the drop zone accepts, as a comma-separated list of extensions (`.png`), MIME types (`image/png`) or wildcards (`image/*`). Enforced on both drop and picker — non-matching files are emitted through `reject` instead of `select`.'
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
render=../code/components/drop-zone/preview.vue
:::

::: tip Accept handling and rejected files
The `accept` filter is enforced on both dropped and picked files, not just the native file picker. Files that do not match `accept` are emitted through the `reject` event instead of `select` / `select-multiple`. When `is-multiple` is off and several files are provided, only the first match is selected and the remaining files are reported as rejected too — listen to `reject` to give the user feedback about what was skipped.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic drop zone example.
example=../code/components/drop-zone/basic.vue
:::

::: example Avatar || A circular drop zone wrapped around an avatar — useful for profile picture uploads.
example=../code/components/drop-zone/avatar.vue
:::

## Used components

- [Spinner](./spinner)
