---
outline: deep

props:
    -   name: actor
        description: The name of the person or system that caused the event.
        type: string
        optional: true

    -   name: avatar-fallback-initials
        description: The initials shown when there is no avatar image.
        type: string
        optional: true

    -   name: avatar-src
        description: The avatar image of the actor. Takes precedence over `icon`.
        type: string
        optional: true

    -   name: color
        description: The color of the marker.
        type: FluxColor
        default: gray
        optional: true

    -   name: date-time
        description: The machine-readable timestamp, rendered as the `datetime` attribute of the `<time>` element.
        type: string
        optional: true

    -   name: day
        description: The day label of the entry. Only used when the feed has `is-grouped` set.
        type: string
        optional: true

    -   name: icon
        description: The icon shown in the marker, used for events without an actor.
        type: FluxIconName
        optional: true

    -   name: when
        description: The rendered timestamp, formatted by the application.
        type: string
        optional: true

slots:
    -   name: default
        description: The action sentence of the entry.

    -   name: details
        description: An optional body below the sentence, for instance a comment or a list of changes.
---

# Activity feed item

The activity feed item is one entry in the feed: a marker, an action sentence and the moment it happened. An entry with an avatar reads as something a person did, an entry with an icon as something the system did, and an entry with neither still gets a marker on the rail.

::: render
render=../../code/components/activity-feed/preview.vue
:::

::: warning
This component renders a list item and is meant to be used within an [Activity feed](../activity-feed/).
:::

::: tip
The avatar is hidden from assistive technology on purpose: the actor is already written out in the entry itself, so announcing it twice would only slow a screen reader down.
:::

<FrontmatterDocs/>

## Examples

::: example Markers || An avatar for people, an icon for the system, and a plain dot when an entry has neither.
example=../../code/components/activity-feed/item/markers.vue
:::

::: example Colors || The color of an entry only paints its marker, which keeps the sentence itself readable.
example=../../code/components/activity-feed/item/colors.vue
:::

## Used components

- [Avatar](../avatar)
- [Icon](../icon)
