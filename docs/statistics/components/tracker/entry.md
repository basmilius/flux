---
outline: deep

props:
    -   name: title
        description: The title of the entry.
        type: string
        optional: true

    -   name: description
        description: A secondary line shown next to the title, for example what happened.
        type: string
        optional: true

    -   name: when
        description: The moment the entry describes, shown under the title.
        type: string
        optional: true

    -   name: icon
        description: The icon of the marker on the rail. Without one the entry gets a small dot instead.
        type: FluxIconName
        optional: true

    -   name: color
        description: The color of the marker.
        type: FluxColor
        optional: true
        default: gray

slots:
    -   name: start
        description: Shown before the title, for example a FluxAvatar of the person the entry is about.

    -   name: end
        description: Shown after the title, for example a FluxBadge carrying the state of the entry.

    -   name: default
        description: The body of the entry. Place any Flux component here, for example a FluxDescriptionList or a group of steps.
---

# Tracker entry

A milestone on the rail of a [Tracker](./index): a marker, a header carrying the title, a badge and the moment, and a body holding whatever the milestone needs.

::: render
render=../../../code/statistics/components/tracker/entry/preview.vue
:::

::: tip
The marker follows the color of the milestone; leave `icon` out and the entry falls back to a small dot, for a row that merely happened.
:::

::: info
The entry exposes the ARIA `listitem` role.
:::

<FrontmatterDocs/>

## Examples

::: example Start and end || The header carries whatever you put in it; an avatar in front of the title, a badge behind it.
example=../../../code/statistics/components/tracker/entry/slots.vue
:::

::: example Colors || The marker and the badge follow the state of the milestone.
example=../../../code/statistics/components/tracker/entry/colors.vue
:::

## Used components

- [Icon](../../../components/icon)
