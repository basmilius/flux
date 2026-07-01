---
outline: deep

emits:
    -   name: cancel
        description: Triggered when editing is cancelled.
        type: []

    -   name: edit
        description: Triggered when editing starts.
        type: []

    -   name: save
        description: Triggered when the value is saved, with the new value.
        type: [ string ]

props:
    -   name: disabled
        description: Whether editing is disabled.
        type: boolean
        optional: true

    -   name: error
        description: An error message shown on the input while editing.
        type: [ 'string | null' ]
        optional: true

    -   name: is-readonly
        description: Whether the value is read-only and cannot be edited.
        type: boolean
        optional: true

    -   name: multiline
        description: Whether to edit with a multi-line text area instead of a single-line input.
        type: boolean
        optional: true

    -   name: placeholder
        description: Placeholder shown when the value is empty.
        type: string
        optional: true

    -   name: save-on-blur
        description: Whether the value is saved when the input loses focus. Moving focus to the component's own save or cancel control (for example by keyboard) does not trigger an auto-save, so an explicit cancel still wins.
        type: boolean
        optional: true
        default: true

slots:
    -   name: default
        description: Custom display content. Receives the current value and an edit function.

    -   name: actions
        description: Custom save/cancel actions. Receives save and cancel functions.

requiredIcons:
    - check
    - xmark
---

# Inline edit

The Inline edit component displays a value that turns into an input when clicked, letting users edit it in place. It is well suited for editable fields in detail panels and tables. Editing commits on Enter (or ⌘/Ctrl + Enter in multi-line mode) and reverts on Escape.

Cancelling (through Escape or the cancel control) takes precedence over `save-on-blur`, so the draft is never persisted when the user explicitly cancels, even though leaving the field moves focus. After editing closes, focus stays within the component rather than dropping to the document body.

::: render
render=../code/components/inline-edit/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic inline edit field.
example=../code/components/inline-edit/basic.vue
:::

::: example Multi-line || An inline edit field that edits with a text area.
example=../code/components/inline-edit/multiline.vue
:::

## Used components

- [Button](./button/)
- [Input](./form/input/)
- [Text area](./form/text-area)
