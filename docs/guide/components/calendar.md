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
render=../../code/guide/components/calendar/preview.vue
:::

<FrontmatterDocs/>

## Snippet

```vue [Calendar.vue]
<template>
    <FluxCalendar>
        <template v-for="event of events">
            <FluxCalendarEvent :date="event.date" :label="event.label"/>
        </template>
    </FluxCalendar>
</template>

<script
    lang="ts"
    setup>
    import { FluxCalendar, FluxCalendarEvent } from '@basmilius/flux';
    import { DateTime } from 'luxon';

    const events = [
        {date: DateTime.now(), label: 'Today event'}
    ];
</script>
```

## Used components

- [Action bar](./action-bar)
- [Button](./button)
- [Button group](./button-group)
- [Calendar event](./calendar-event)
- [Flyout](./flyout)
- [Spinner](./spinner)
