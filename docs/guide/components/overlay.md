---
outline: deep

emits:
    -   name: close
        description: Emitted when the overlay is closed.
        type: [ ]

props:
    -   name: is-closeable
        description: If the overlay is closeable with the escape key.
        type: boolean
        optional: true

    -   name: size
        description: The size of the overlay.
        type: FluxSize
        optional: true
        default: small

slots:
    -   name: default
        description: The contents of the overlay. For the best result, use a with a v-if to control its visibility.
---

# Overlay

Overlays can be used to reveal larger contents or options that are hidden behind a button or a similar component. The content is animated on top of the document and the rest of the interface is blocked.

::: render
render=../../code/guide/components/overlay/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic overlay.
example=../../code/guide/components/overlay/basic.vue
:::

::: example Re-authenticatie || A re-authentication overlay.
example=../../code/guide/components/overlay/authenticate.vue
:::
