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
        description: The type of button.
        type: [ '"button"', '"link"', '"route"', '"none"' ]
        default: button
        optional: true

    -   name: disabled
        description: Disable the button.
        type: boolean
        optional: true

    -   name: icon-leading
        description: The icon at the start of the button.
        type: FluxIconName
        optional: true

    -   name: icon-trailing
        description: The icon at the end of the button.
        type: FluxIconName
        optional: true

    -   name: is-done
        description: If the publishing state is done.
        type: boolean
        optional: true

    -   name: is-filled
        description: Let the button fill its parent container.
        type: boolean
        optional: true

    -   name: is-loading
        description: Shows a loading state within the button instead of the icon at the start.
        type: boolean
        optional: true

    -   name: is-submit
        description: Indicates that the button is a submit button. This will enable form submission.
        type: boolean
        optional: true

    -   name: label
        description: The label that is shown in the button.
        type: string
        optional: true

    -   name: size
        description: The size of the button.
        type: FluxButtonSize
        default: medium
        optional: true

    -   name: tabindex
        description: The tabindex of the button, works exactly the same as html.
        type: [ 'string', 'number' ]
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
    -   name: icon-leading
        description: Slot for overriding the icon at the start.

requiredIcons:
    - cloud
---

# Publish

The publish button is a specialized primary action used to finalize or make content public. It signals a clear commitment, once pressed, changes are saved or content is shared.

::: render
render=../../../code/guide/components/button/publish/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic publish button.
example=../../../code/guide/components/button/publish/basic.vue
:::

::: example Sizes || The publish button is available in four sizes.
example=../../../code/guide/components/button/publish/sizes.vue
:::

## Used components

- [Icon](../icon)
