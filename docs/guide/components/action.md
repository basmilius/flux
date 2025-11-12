---
outline: deep

emits:
    -   name: click
        description: Triggered when the action is clicked.
        type: [ MouseEvent ]

    -   name: mouseenter
        description: Triggered when the action is being hovered.
        type: [ MouseEvent ]

    -   name: mouseleave
        description: Triggered when the action is not being hovered anymore.
        type: [ MouseEvent ]

props:
    -   name: type
        description: The type of action.
        type: [ '"button"', '"link"', '"route"' ]
        default: button
        optional: true

    -   name: disabled
        description: Disables the action.
        type: boolean
        optional: true

    -   name: icon
        description: The icon at the beginning of the action.
        type: FluxIconName
        optional: true

    -   name: is-destructive
        description: Indicates that the action is a destructive action.
        type: boolean
        optional: true

    -   name: is-loading
        description: Shows a loading state within the action and replaces the icon at the start with a spinner.
        type: boolean
        optional: true

    -   name: is-submit
        description: Indicates that the action is a submit action. This will enable form submission.
        type: boolean
        optional: true

    -   name: label
        description: The label that is shown in the action.
        type: string
        optional: true

    -   name: tabindex
        description: The tabindex of the action, works exactly the same as html.
        type: [ 'string', 'number' ]
        optional: true

    -   name: href
        description: This prop is enabled if the action's type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: rel
        description: This prop is enabled if the action's type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: target
        description: This prop is enabled if the action's type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: to
        description: This prop is enabled if the action's type is set to route. This integrates with Vue Router.
        type: FluxTo
        optional: true
---

# Action

Actions can be used to add functionality to components like data tables. They can navigate to another view or perform an in-page action, such as displaying a share overlay.

::: render
render=../../code/guide/components/action/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A simple action.
example=../../code/guide/components/action/basic.vue
:::

::: example Destructive || A destructive action can be used for destructive actions such as deleting something.
example=../../code/guide/components/action/destructive.vue
:::

::: example Loading || A loading state action can signify that something is loading, for instance, retrieving data after pressing on the action.
example=../../code/guide/components/action/loading.vue
:::

::: example Group || Having several actions can be grouped together.
example=../../code/guide/components/action/grouped.vue
:::

## Used components

- [Icon](./icon)
- [Spinner](./spinner)
