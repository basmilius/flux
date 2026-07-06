---
outline: deep

emits:
    -   name: click
        description: Triggered when the avatar is clicked.
        type: [ MouseEvent ]

    -   name: delete
        description: Triggered when the delete button is clicked.
        type: [ ]

    -   name: mouseenter
        description: Triggered when the button is being hovered.
        type: [ MouseEvent ]

    -   name: mouseleave
        description: Triggered when the button is not being hovered anymore.
        type: [ MouseEvent ]

props:
    -   name: color
        description: The color of the badge.
        type: FluxColor
        optional: true

    -   name: colored
        description: Fills the badge with a tinted background matching its color.
        type: boolean
        optional: true

    -   name: dot
        description: Shows a dot instead of an icon at the start of the badge.
        type: boolean
        optional: true

    -   name: icon
        description: The icon that is used in the badge.
        type: FluxIconName
        optional: true

    -   name: is-deletable
        description: Indicates that the badge is deletable.
        type: boolean
        optional: true

    -   name: is-loading
        description: Shows a loading state within the badge instead of the icon or dot.
        type: boolean
        optional: true

    -   name: label
        description: The label that is shown in the badge.
        type: string

    -   name: size
        description: The size of the badge.
        type: FluxSize
        default: medium
        optional: true

    -   name: type
        description: The pressable type of the badge. Defaults to a non-interactive label.
        type: [ '"button"', '"link"', '"route"', '"none"' ]
        default: none
        optional: true

    -   name: tabindex
        description: The tabindex of the badge, works exactly the same as html.
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

requiredIcons:
    - xmark
---

# Badge

The badge is a label for elements in the UI. Use it, for example, to show the status of an order or highlight important information.

::: render
render=../code/components/badge/preview.vue
:::

::: tip
Flux also has [Tags](./tag), which look similar to badges.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A simple badge can deliver additional insights about an entity.
example=../code/components/badge/basic.vue
:::

::: example Colors || Badges come in six colors, so you can map them to the meaning that fits your context.
example=../code/components/badge/colors.vue
:::

::: example Colored || The colored variant fills the badge with a tinted background, making it stand out more.
example=../code/components/badge/colored.vue
:::

::: example Dot || A dot badge is useful for indicating statuses, for instance, the status of a server.
example=../code/components/badge/dot.vue
:::

::: example Icon || Including icons in badges can improve their clarity, for instance, indicating an app's release status.
example=../code/components/badge/icon.vue
:::

::: example Loading || A loading state badge can signify that a table row is processing, for instance, retrieving data.
example=../code/components/badge/loading.vue
:::

::: example Sizes || Badges are available in three sizes. The default size is medium.
example=../code/components/badge/size.vue
:::

::: example Statuses || Combining colors and icons makes states scannable at a glance, for instance, the payment status of an order.
example=../code/components/badge/status.vue
:::

::: example Deletable || Deletable badges work well for active filters that the user can remove again, for instance, in search results.
example=../code/components/badge/deletable.vue
:::

## Used components

- [Icon](./icon)
- [Spinner](./spinner)
