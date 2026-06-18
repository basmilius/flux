# Scheduling

Calendars, agendas and date pickers come together in any scheduling view. This recipe pairs a month calendar with a day planner driven by a date picker.

::: render
render=../../code/guide/patterns/scheduling/preview.vue
:::

`FluxCalendar` lays out the month grid; each `FluxCalendarItem` is placed on its `date` and renders whatever you put in its default slot, so events can carry their own colours and styling.

## Examples

::: example Day planner || A `FluxDatePicker` next to a `FluxLayerPane` agenda for the selected day.
example=../../code/guide/patterns/scheduling/planner.vue
:::

## Used components

`FluxCalendar`, `FluxCalendarItem`, `FluxDatePicker`, `FluxLayerPane`, `FluxLayerPaneSecondary`, `FluxItem`, `FluxItemStack`, `FluxItemMedia`, `FluxItemContent`, `FluxBoxedIcon`, `FluxFlex`, `FluxPane`.
