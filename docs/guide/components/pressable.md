---
outline: deep

emits:
    -   name: click
        description: Triggered when the element is clicked.
        type: [ MouseEvent ]

    -   name: mouseenter
        description: Triggered when the mouse enters the element.
        type: [ MouseEvent ]

    -   name: mouseleave
        description: Triggered when the mouse leaves the element.
        type: [ MouseEvent ]

props:
    -   name: component-type
        description: Determines which HTML element or component is rendered.
        type: "'route' | 'link' | 'button' | 'div'"
        optional: true

    -   name: href
        description: URL for anchor elements. Used when component-type is 'link'.
        type: string
        optional: true

    -   name: rel
        description: The rel attribute for link elements.
        type: string
        optional: true

    -   name: target
        description: The target attribute for link elements.
        type: string
        optional: true

    -   name: to
        description: Vue Router navigation target. Used when component-type is 'route'.
        type: FluxTo
        optional: true

slots:
    -   name: default
        description: The content of the pressable element.
---

# Pressable

A polymorphic base component that renders as different element types based on the `component-type` prop. It can render as a Vue Router link, anchor tag, button, or div. This component is primarily used internally by other Flux components like [Button](./button/) to provide flexible navigation and interaction behavior.

::: render
render=../../code/guide/components/pressable/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Route || Renders as a `<router-link>` for internal navigation with Vue Router.
example=../../code/guide/components/pressable/route.vue
:::

::: example Link || Renders as an `<a>` tag for external links.
example=../../code/guide/components/pressable/link.vue
:::

::: example Button || Renders as a `<button>` for click actions.
example=../../code/guide/components/pressable/button.vue
:::
