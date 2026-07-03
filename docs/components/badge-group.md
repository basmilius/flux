---
outline: deep

emits:
    -   name: click
        description: Triggered when the badge group is clicked.
        type: [ MouseEvent ]

    -   name: mouseenter
        description: Triggered when the badge group is being hovered.
        type: [ MouseEvent ]

    -   name: mouseleave
        description: Triggered when the badge group is not being hovered anymore.
        type: [ MouseEvent ]

props:
    -   name: color
        description: The color of the badge group.
        type: FluxColor
        optional: true

    -   name: icon-leading
        description: The icon that is shown before the label.
        type: FluxIconName
        optional: true

    -   name: icon-trailing
        description: The icon that is shown after the label.
        type: FluxIconName
        optional: true

    -   name: label
        description: The message that is shown next to the inner badge.
        type: string

    -   name: size
        description: The size of the badge group. Badges in the start and end slots scale along.
        type: FluxSize
        default: medium
        optional: true

    -   name: type
        description: The pressable type of the badge group. Defaults to a non-interactive label.
        type: [ '"button"', '"link"', '"route"', '"none"' ]
        default: none
        optional: true

    -   name: tabindex
        description: The tabindex of the badge group, works exactly the same as html.
        type: [ 'string', 'number' ]
        optional: true

    -   name: href
        description: This prop is enabled if the badge group's type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: rel
        description: This prop is enabled if the badge group's type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: target
        description: This prop is enabled if the badge group's type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: to
        description: This prop is enabled if the badge group's type is set to route. This integrates with Vue Router.
        type: FluxTo
        optional: true

slots:
    -   name: start
        description: The badge that is shown before the label. Place a FluxBadge here; it inherits the group's color and size.

    -   name: end
        description: The badge that is shown after the label. Place a FluxBadge here; it inherits the group's color and size.
---

# Badge group

The badge group combines a badge with a message in a single pill. Place a badge in the start or end slot; it inherits the group's color and size automatically. Use it, for example, to announce a new feature or to link to release notes.

::: render
render=../code/components/badge-group/preview.vue
:::

::: tip
Use a [Badge](./badge) when a single label is enough.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A badge group pairs a short badge with a supporting message.
example=../code/components/badge-group/basic.vue
:::

::: example Placement || The badge can be placed before or after the message using the start and end slots.
example=../code/components/badge-group/placement.vue
:::

::: example Icon || An icon at the end hints that the badge group is interactive, for instance, linking to release notes.
example=../code/components/badge-group/icon.vue
:::

::: example Sizes || Badge groups are available in three sizes. The default size is medium.
example=../code/components/badge-group/size.vue
:::

::: example System status || Badge groups can surface status updates, for instance, on a status page or in an admin dashboard.
example=../code/components/badge-group/status.vue
:::

::: example Job listings || A clickable badge group with a department badge forms a compact job listing.
example=../code/components/badge-group/vacancy.vue
:::

## Used components

- [Badge](./badge)
- [Icon](./icon)
