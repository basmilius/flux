---
outline: deep

emits:
    -   name: click
        description: Triggered when the tab is clicked.
        type: [ MouseEvent ]

    -   name: mouseenter
        description: Triggered when the mouse enters the tab.
        type: [ MouseEvent ]

    -   name: mouseleave
        description: Triggered when the mouse leaves the tab.
        type: [ MouseEvent ]

props:
    -   name: type
        description: The type of the tab.
        type: FluxPressableType
        optional: true

    -   name: disabled
        description: If the tab is disabled.
        type: boolean
        optional: true

    -   name: icon
        description: The icon of the tab.
        type: FluxIconName
        optional: true

    -   name: is-active
        description: If the tab is active.
        type: boolean

    -   name: label
        description: The label of the tab.
        type: string
        optional: true

    -   name: tabindex
        description: The tabindex of the tab, works exactly the same as HTML.
        type: [ string, number ]
        optional: true

    -   name: href
        description: This prop is enabled if the tab type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: rel
        description: This prop is enabled if the tab type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: target
        description: This prop is enabled if the tab type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: to
        description: This prop is enabled if the button's type is set to route. This integrates with Vue Router.
        type: FluxTo
        optional: true
---

# Tab bar item

The tab bar item represents an individual tab within the tab bar. Each item corresponds to a specific content view or section. When selected, it updates the displayed content accordingly, helping users understand where they are and switch between sections effortlessly.

::: render
render=../../../code/guide/components/tab-bar/item/preview.vue
:::

::: warning
This component is best used within a [Tab bar](../tab-bar).
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic tab bar item.
example=../../../code/guide/components/tab-bar/item/basic.vue
:::

## Used components

- [Icon](../icon)
