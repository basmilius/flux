---
outline: deep

emits:
    -   name: click
        description: Triggered when the event is clicked.
        type: [ MouseEvent ]

props:
    -   name: date
        description: The date or date range of the event.
        type: DateTime | DateTime[]

    -   name: label
        description: The label of the event.
        type: string

slots:
    -   name: tooltip
        description: An optional tooltip for when the event is being hovered.
---

# Calendar event

This component is used within the [Calendar]() component and resembles
a single calendar event.

<FrontmatterDocs/>

## Snippets

::: code-group

```vue [CalendarEvent.vue]
<template>
    <FluxCalendarEvent
        :date="DateTime.now()"
        label="Work"/>
</template>

<script
    setup
    lang="ts">
    import { FluxCalendarEvent } from '@flux-ui/components';
    import { DateTime } from 'luxon';
</script>
```

```vue [CalendarEventTooltip.vue]
<template>
    <FluxCalendarEvent
        :date="DateTime.now()"
        label="Work">
        
        <template #tooltip>
            Important meeting today.
        </template>
        
    </FluxCalendarEvent>
</template>

<script
    setup
    lang="ts">
    import { FluxCalendarEvent } from '@flux-ui/components';
    import { DateTime } from 'luxon';
</script>
```
