---
outline: deep

emits:
    -   name: navigate
        description: Triggered when the calendar is being navigated. The first parameter is the view date, the second the start date of the visible range and the third the end date of the visible range.
        type: [ DateTime, DateTime, DateTime ]

    -   name: reschedule
        description: Triggered when an item is dropped on a different day or time-slot. Only fires when `draggable` is enabled.
        type:
            - '{ id: string | number; fromDate: DateTime; toDate: DateTime }'

    -   name: resize
        description: Triggered when an item is resized in a time-grid view via top/bottom drag-handles. Only fires when `draggable` is enabled.
        type:
            - '{ id: string | number; fromDate: DateTime; toDate: DateTime; fromDuration: number; toDuration: number }'

    -   name: dragStart
        description: Triggered when a draggable item starts being dragged.
        type:
            - '{ id: string | number; fromDate: DateTime }'

    -   name: dragEnd
        description: Triggered when a drag ends, regardless of whether a drop happened.
        type:
            - '{ id: string | number }'

    -   name: keyboardGrab
        description: Triggered when an item is grabbed via keyboard (Space/Enter on a focused item).
        type:
            - '{ id: string | number; fromDate: DateTime }'

    -   name: keyboardCommit
        description: Triggered when a keyboard-grab is committed (Space/Enter on the target date or time-slot).
        type:
            - '{ id: string | number }'

    -   name: keyboardCancel
        description: Triggered when a keyboard-grab is cancelled (Escape, view switch, etc.).
        type:
            - '{ id: string | number }'

props:
    -   name: initial-date
        description: The initial visible date.
        type: DateTime
        default: DateTime.now()
        optional: true

    -   name: is-loading
        description: Indicates that the calendar is loading.
        type: boolean
        optional: true

    -   name: draggable
        description: When true, items with an `id` can be dragged between day-cells (and time-slots in time-grid views).
        type: boolean
        default: 'false'
        optional: true

    -   name: view
        description: Force a specific view. When omitted, the view auto-collapses based on the viewport (`xl`→month, `lg`→week, `md`→two-days, smaller→day).
        type: "'month' | 'week' | 'two-days' | 'day'"
        optional: true

    -   name: hour-range
        description: Inclusive-exclusive hour range shown in time-grid views.
        type: '[number, number]'
        default: '[0, 24]'
        optional: true

    -   name: pixels-per-minute
        description: Vertical scale for time-grid views. Default of 0.8 yields a 48px hour.
        type: number
        default: '0.8'
        optional: true

slots:
    -   name: default
        description: The calendar items that should be visible.

requiredIcons:
    - angle-left
    - angle-right
---

# Calendar

This component shows a calendar with four different views (month, week, two-days, day). Items can
be added to the calendar by filling the default slot with `FluxCalendarItem` instances.

::: render
render=../../code/components/calendar/preview.vue
:::

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/components/calendar/preview.vue [Calendar.vue]

:::

## Auto-responsive views

The React calendar defaults to `month`. To adapt it to the viewport, read `useBreakpoints()` and pass an explicit `view`, as this example does.

::: render
render=../../code/components/calendar/auto-responsive.vue
:::

::: code-group

<<< @/code/components/calendar/auto-responsive.vue [AutoResponsive.vue]

:::

## Week view

The current React week view groups events by day. Hour-grid positioning, duration sizing and a separate all-day region are not implemented.

::: render
render=../../code/components/calendar/week-view.vue
:::

::: code-group

<<< @/code/components/calendar/week-view.vue [WeekView.vue]

:::

## Day view

A single-day event list. The React implementation accepts `duration` and `allDay` on items but does not yet use them for timed layout.

::: render
render=../../code/components/calendar/day-view.vue
:::

::: code-group

<<< @/code/components/calendar/day-view.vue [DayView.vue]

:::

## Draggable items

Set `draggable` in month view and update your events in `onReschedule`. The callback supplies `id`, `fromDate` and `toDate`. Day/week drag and drop, timed snapping and navigation while dragging are not implemented.

::: render
render=../../code/components/calendar/draggable.vue
:::

::: code-group

<<< @/code/components/calendar/draggable.vue [Draggable.vue]

:::

## Resize

The current React API has no resize interaction.

::: render
render=../../code/components/calendar/resize.vue
:::

::: code-group

<<< @/code/components/calendar/resize.vue [Resize.vue]

:::

## Keyboard navigation

Items are native buttons and can receive keyboard focus. Keyboard grabbing, arrow-key rescheduling and drop/cancel commands are not implemented. The example below shows focusable items; use your own accessible editing form to change dates.

::: render
render=../../code/components/calendar/keyboard.vue
:::

::: code-group

<<< @/code/components/calendar/keyboard.vue [Keyboard.vue]

:::

## Plain items

An item without custom styling, just text in the slot. Useful for lightweight calendars where the day's
events are simply listed.

::: render
render=../../code/components/calendar/plain.vue
:::

::: code-group

<<< @/code/components/calendar/plain.vue [Plain.vue]

:::

## Item with tooltip

Wrap your item content in a [Tooltip](../tooltip) component to surface extra detail on hover.

::: render
render=../../code/components/calendar/tooltip.vue
:::

::: code-group

<<< @/code/components/calendar/tooltip.vue [Tooltip.vue]

:::

## Used components

- [Action bar](../action-bar)
- [Button](../button)
    - [Secondary](../button/secondary)
    - [Group](../button/group)
- [Calendar](../calendar)
    - [Item](../calendar/item)
- [Date picker](../date-picker)
- [Flyout](../flyout)
- [Spinner](../spinner)
