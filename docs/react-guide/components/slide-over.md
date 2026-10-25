---
outline: deep

emits:
    -   name: close
        description: Triggered when the slide over is closed.

props:
    -   name: is-closeable
        description: If the slide-over can be closed with the escape key.
        type: boolean
        optional: true

    -   name: view-key
        description: A unique key to identify the current view within the slide over. Used for view-based transitions.
        type: string
        optional: true

slots:
    -   name: default
        description: The content of the slide over.
---

# Slide over

The slide over is a modal-like surface that slides in from the edge of the view to show additional content without disrupting the current workflow. It is often used to reveal the details or options for an entity.

::: render
render=../code/components/slide-over/preview.vue
:::

Mount `FluxRoot` once for the global overlay state and imperative dialogs. Declarative overlays render into `document.body` through a React portal.

<FrontmatterDocs/>

## Examples

::: example Basic || A basic slide over.
example=../code/components/slide-over/basic.vue
:::

::: example Tabs || A slide over with tabs.
example=../code/components/slide-over/tabs.vue
:::

## Router-driven

Use location state from your router to control `open`. The example below uses the browser hash, listens for `hashchange` and closes through browser history. No Vue Router plugin or named-view configuration is needed.

::: example URL-controlled view || Opening adds a hash; Back closes the view.
example=../code/components/slide-over/with-router/layout.vue
:::

For deep links in a production app, choose a fallback route when there is no prior history entry. See [Routing](../guide/introduction/installation/vue-router) for the application shell’s `route` and `router` props.
