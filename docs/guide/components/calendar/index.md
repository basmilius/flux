---
outline: deep

emits:
    -   name: navigate
        description: Triggered when the calendar is being navigated. The first parameter is the view date, the second the start date of the visible range and the third the end date of the visible range.
        type: [ DateTime, DateTime, DateTime ]

props:
    -   name: initial-date
        description: The initial visible date.
        type: DateTime
        default: DateTime.now()
        optional: true

    -   name: is-loading
        description: Indicates that the calendar is loading.
        type: boolean
        optiona: true

slots:
    -   name: default
        description: The calendar events that should be visible.
---

# Calendar

This component shows a month calendar. Events can be added to the calendar by filling the
default slot of the component.

::: render
render=../../../code/guide/components/calendar/preview.vue
:::

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/guide/components/calendar/preview.vue [Calendar.vue]

:::

## Used components

- [Action bar](../action-bar)
- [Button](../button)
    - [Secondary](../button/secondary)
    - [Group](../button/group)
- [Calendar event](event)
- [Flyout](../flyout)
- [Spinner](../spinner)
