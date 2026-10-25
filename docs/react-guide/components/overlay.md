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
        default: 'false'

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
render=../code/components/overlay/preview.vue
:::

Mount `FluxRoot` once for the global overlay state and imperative dialogs. Declarative overlays render into `document.body` through a React portal.

<FrontmatterDocs/>

## Examples

::: example Basic || A basic overlay.
example=../code/components/overlay/basic.vue
:::

::: example Tabs || An overlay with a sticky header and tab bar.
example=../code/components/overlay/tabs.vue
:::

::: example Re-authentication || A re-authentication overlay.
example=../code/components/overlay/authenticate.vue
:::

## Router-driven

Use location state from your router to control `open`. The example below uses the browser hash, listens for `hashchange` and closes through browser history. No Vue Router plugin or named-view configuration is needed.

::: example URL-controlled view || Opening adds a hash; Back closes the view.
example=../code/components/overlay/with-router/layout.vue
:::

For deep links in a production app, choose a fallback route when there is no prior history entry. See [Routing](../guide/introduction/installation/vue-router) for the application shell’s `route` and `router` props.
