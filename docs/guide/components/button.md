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
        type: [ '"button"', '"link"', '"route"' ]
        default: button
        optional: true

    -   name: disabled
        description: Disable the button.
        type: boolean
        optional: true

    -   name: icon-after
        description: The icon at the end of the button.
        type: IconName
        optional: true

    -   name: icon-before
        description: The icon at the start of the button.
        type: IconName
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
        type: [ '"small"', '"medium"', '"large"', '"xl"' ]
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
        type: To
        optional: true

slots:
    -   name: after
        description: Content that is shown at the end of the button.

    -   name: before
        description: Content that is shown at the start of the button.

    -   name: icon-after
        description: Slot for overriding the icon at the end.

    -   name: icon-before
        description: Slot for overriding the icon at the start.

    -   name: label
        description: Slot for overriding the label.

variants:
    - FluxPrimaryButton
    - FluxSecondaryButton
    - FluxDestructiveButton
    - FluxPublishButton
---

# Button

Buttons are clickable elements designed to trigger actions. They can start new processes, modify existing ones, or perform specific tasks. When designing your interface, ensure primary buttons are prominently placed and clearly indicate their purpose to make them easy to find and use.

::: render
render=../../code/guide/components/button/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Primary || Primary buttons can be used for tasks such as saving.
example=../../code/guide/components/button/primary.vue
:::

::: warning
Overusing primary buttons can distract users, so use them sparingly in your interface.
:::

::: example Secondary || Secondary buttons can be used in situations that are not covered by other buttons.
example=../../code/guide/components/button/secondary.vue
:::

::: example Destructive || Destructive buttons can be used for destructive actions such as deleting something.
example=../../code/guide/components/button/destructive.vue
:::

::: example Publish || Publish buttons can be used in situations where the user can publish something.
example=../../code/guide/components/button/publish.vue
:::

::: example Sizes || Buttons can have three different sizes.
example=../../code/guide/components/button/sizes.vue
:::

## Used components

- [Icon](./icon)
- [Spinner](./spinner)
