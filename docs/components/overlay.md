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
render=../code/components/overlay/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic overlay.
example=../code/components/overlay/basic.vue
:::

::: example Re-authenticatie || A re-authentication overlay.
example=../code/components/overlay/authenticate.vue
:::

## Router-driven

Pair the overlay with [Vue Router](../guide/introduction/installation/vue-router) to open it through navigation. Define an `overlay` named view on every route that should appear inside the overlay, and render a single `<RouterView name="overlay"/>` from your top-level layout.

The layout watches `route.matched` for the first record that exposes the `overlay` view. When such a record is matched the `<RouterView>` renders inside the overlay; otherwise the overlay stays empty and the transition closes it.

::: code-group

<<< @/code/components/overlay/with-router/layout.vue [Layout.vue]
<<< @/code/components/overlay/with-router/router.ts [router.ts]

:::

::: tip
Push to one of the named routes (e.g. `router.push({name: 'projects-create'})`) to open the overlay, and call `router.back()` from inside the overlay to close it. This keeps the URL in sync with what's on screen and makes the overlay deep-linkable.
:::
