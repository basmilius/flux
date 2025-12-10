---
outline: deep

emits:
    -   name: click
        description: Triggered when the button is clicked.
        type: [ MouseEvent ]

    -   name: mouseenter
        description: Triggered when the button is being hovered.
        type: [ MouseEvent ]

    -   name: mouseleave
        description: Triggered when the button is not being hovered anymore.
        type: [ MouseEvent ]

props:
    -   name: type
        description: The type of link.
        type: [ '"button"', '"link"', '"route"', '"none"' ]
        default: button
        optional: true

    -   name: disabled
        description: Disable the link.
        type: boolean
        optional: true

    -   name: icon
        description: The icon at the start of the link.
        type: FluxIconName
        optional: true

    -   name: is-filled
        description: Let the link fill its parent container.
        type: boolean
        optional: true

    -   name: label
        description: The label that is shown in the link.
        type: string
        optional: true

    -   name: href
        description: This prop is enabled if the button's type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: rel
        description: This prop is enabled if the button's type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: target
        description: This prop is enabled if the button's type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: to
        description: This prop is enabled if the button's type is set to route. This integrates with Vue Router.
        type: FluxTo
        optional: true

slots:
    -   name: after
        description: Content that is shown at the end of the button.

    -   name: before
        description: Content that is shown at the start of the button.

    -   name: icon-leading
        description: Slot for overriding the icon at the start.

    -   name: icon-trailing
        description: Slot for overriding the icon at the end.

    -   name: label
        description: Slot for overriding the label.

requiredIcons:
    - arrow-right-long
---

# Link

The link component is used to navigate to another page within the application or to open one in a new tab.

::: render
render=../../code/guide/components/link/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic link.
example=../../code/guide/components/link/basic.vue
:::

::: example Icon || A link with an icon in the front.
example=../../code/guide/components/link/icon.vue
:::

::: example New tab || A link that opens a new tab.
example=../../code/guide/components/link/outside.vue
:::

## Used components

- [Button](./button)
