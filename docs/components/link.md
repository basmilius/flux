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

    -   name: icon-leading
        description: The icon at the start of the link.
        type: FluxIconName
        optional: true

    -   name: icon-trailing
        description: The icon at the end of the link.
        type: FluxIconName
        optional: true

    -   name: is-primary
        description: Use the primary color instead of the default foreground color.
        type: boolean
        optional: true

    -   name: label
        description: The label that is shown in the link. Used as a fallback for the default slot.
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
    -   name: default
        description: The content of the link. Used instead of the label prop.

    -   name: icon-leading
        description: Slot for overriding the icon at the start.

    -   name: icon-trailing
        description: Slot for overriding the icon at the end.
---

# Link

The link component is an inline link used to navigate to another page within the application or to open one in a new tab. It scales with the surrounding text and supports a leading and trailing icon.

::: render
render=../code/components/link/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic link.
example=../code/components/link/basic.vue
:::

::: example Icon || A link with a leading and trailing icon.
example=../code/components/link/icon.vue
:::

::: example Primary || A link that uses the primary color.
example=../code/components/link/primary.vue
:::

::: example New tab || A link that opens a new tab.
example=../code/components/link/outside.vue
:::

## Used components

- [Icon](./icon)
- [Pressable](./pressable)
