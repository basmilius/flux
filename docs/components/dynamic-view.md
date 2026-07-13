---
outline: deep

props:
    -   name: vnode
        description: The VNode to render.
        type: VNode
---

# Dynamic view

The dynamic view component renders a single `VNode`. Pass it a node — built with `h()`, captured from a slot, or stored in a ref — and it renders that node in place, swapping to a new one whenever the `vnode` prop changes. It is useful when the content to render is decided in your script rather than written directly in the template.

::: render
render=../code/components/dynamic-view/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || Render a VNode created with h().
example=../code/components/dynamic-view/basic.vue
:::

::: example Switching the view || Swap the rendered VNode reactively.
example=../code/components/dynamic-view/dynamic.vue
:::
