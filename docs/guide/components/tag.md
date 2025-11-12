---
outline: deep

emits:
    -   name: click
        description: Triggered when the tag is clicked.
        type: [ MouseEvent ]

    -   name: mouseenter
        description: Triggered when the tag is being hovered.
        type: [ MouseEvent ]

    -   name: mouseleave
        description: Triggered when the tag is not being hovered anymore.
        type: [ MouseEvent ]

    -   name: delete
        description: Triggered when the tag is deleted.
        type: [  ]

props:
    -   name: color
        description: The color of the tag.
        type: FluxColor
        optional: true
        default: gray

    -   name: dot
        description: If the tag should have a colored dot.
        type: boolean
        optional: true

    -   name: icon
        description: The icon of the tag.
        type: FluxIconName
        optional: true

    -   name: is-clickable
        description: If the tag is clickable.
        type: boolean
        optional: true

    -   name: is-deletable
        description: If the tag is deletable. This only works when the is-deletable prop is set to true.
        type: boolean
        optional: true

    -   name: is-loading
        description: If the tag should have a loading state.
        type: boolean
        optional: true

    -   name: label
        description: The label of the tag.
        type: string

    -   name: type
        description: The type of the tag.
        type: FluxPressableType
        optional: true

    -   name: tabindex
        description: The tabindex of the tag, works exactly the same as html.
        type: [ 'string', 'number' ]
        optional: true

    -   name: href
        description: This prop is enabled if the tag's type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: rel
        description: This prop is enabled if the tag's type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: target
        description: This prop is enabled if the tag's type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: to
        description: This prop is enabled if the tag's type is set to route. This integrates with Vue Router.
        type: FluxTo
        optional: true

requiredIcons:
    - xmark
---

# Tag

Tags are used as labels for a more specific element in the UI. This, for example, may be used to display the status of an order.

::: render
render=../../code/guide/components/tag/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic tag.
example=../../code/guide/components/tag/basic.vue
:::

::: example Dot || A tag with a colored dot.
example=../../code/guide/components/tag/dot.vue
:::

::: example Icon || A tag with an icon.
example=../../code/guide/components/tag/icon.vue
:::

::: example Loading || A tag with a loading state.
example=../../code/guide/components/tag/loading.vue
:::

## Used components

- [Icon](./icon)
- [Spinner](./spinner)
