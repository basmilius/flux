---
outline: deep

props:
    -   name: default-size
        description: The initial size of the pane. A number is treated as pixels; strings ending in `%` are treated as percentages of the container.
        type: number | string
        optional: true

    -   name: min-size
        description: The minimum allowed size in pixels.
        type: number
        optional: true
        default: 64

    -   name: max-size
        description: The maximum allowed size in pixels.
        type: number
        optional: true

    -   name: is-resizable
        description: Set to `false` to disable the resize handle to the right of (or below) this pane.
        type: boolean
        optional: true
        default: true

slots:
    -   name: default
        description: The pane content. The pane scrolls overflow internally.
---

# Split view pane

A child of `FluxSplitView`. Configure the initial size, min, max, and whether the trailing handle is interactive.

::: tip
Panes without an explicit `default-size` evenly share the remaining space.
:::
