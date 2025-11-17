---
outline: deep

props:
    -   name: disabled
        description: If the child components should be disabled.
        type: boolean
        optional: true
        default: true

slots:
    -   name: default
        description: The elements that should be disabled.
---

# Disabled

The disabled component provides a shared disabled state to all child components within it. Instead of applying visual or interactive changes itself, it exposes the disabled value through Vue’s injection system. Any nested Flux component can read this state and adjust its own appearance and behavior accordingly. This allows entire sections of the UI to be disabled at once without needing to set the disabled prop individually on each component.

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/guide/components/disabled/snippet.vue [Disabled.vue]

:::
