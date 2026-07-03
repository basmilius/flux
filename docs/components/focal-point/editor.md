---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the selected focal point changes.
        type: [ "number, number" ]

props:
    -   name: model-value
        description: The focal point.
        type: "[number, number]"

    -   name: src
        description: Source of the image.
        type: string
---

# Focal point editor

The focal point editor lets users set the focal point of an image by dragging or using the keyboard, with a live preview of the result. The chosen point is exposed through `v-model`.

::: render
render=../../code/components/focal-point/editor/preview.vue
:::

::: tip Accessibility
The editor is focusable and exposed as a 2D slider. Once focused, the focal point can be moved with the arrow keys (hold <kbd>Shift</kbd> for larger steps), and <kbd>Home</kbd> / <kbd>End</kbd> jump to the top-left and bottom-right corners. The current position is announced through `aria-valuetext`.
:::

<FrontmatterDocs/>

## Examples

::: example Editor
example=../../code/components/focal-point/editor/editor.vue
:::

## Used components

- [Button](../button)
    - [Secondary](../button/secondary)
- [Layout](../layout)
    - [Spacer](../layout/spacer)
- [Pane](../pane)
    - [Body](../pane/body)
    - [Footer](../pane/footer)
