---
outline: deep

emits:
    -   name: click
        description: Triggered when the item is clicked.
        type: [ MouseEvent ]

props:
    -   name: date
        description: The date (and optionally time) of the item. In time-grid views the time component sets the start time.
        type: DateTime

    -   name: id
        description: A unique identifier for the item. Required when the parent FluxCalendar has `draggable` enabled.
        type: string | number
        optional: true

    -   name: duration
        description: Length of the item in minutes. Only used in time-grid views (`week`, `two-days`, `day`). Ignored in `month`.
        type: number
        default: '60'
        optional: true

    -   name: all-day
        description: Force the item to render in the all-day section of time-grid views. Ignored in `month`.
        type: boolean
        default: 'false'
        optional: true

slots:
    -   name: default
        description: The visual content of the item. Render any content (icons, labels, badges, copy) you like.
---

# Calendar item

This component is used within the [Calendar](../calendar) component to render a single calendar entry. The
`default` slot is yours to fill — render any content (icons, labels, badges, copy) you like. When the parent
calendar has `draggable` enabled, items with an `id` can be dragged between day-cells (in month view) or between
day-cells and time-slots (in time-grid views).

To add a tooltip, wrap your slot content in a [Tooltip](../tooltip) component.

<FrontmatterDocs/>

## Snippets

::: code-group

```vue [CalendarItem.vue]
<template>
    <FluxCalendarItem
        :date="DateTime.now()"
        :id="1">
        <div class="my-card">
            Work
        </div>
    </FluxCalendarItem>
</template>

<script
    setup
    lang="ts">
    import { FluxCalendarItem } from '@flux-ui/components';
    import { DateTime } from 'luxon';
</script>
```

```vue [CalendarItemWithDuration.vue]
<template>
    <FluxCalendarItem
        :date="DateTime.now().set({hour: 10})"
        :duration="90"
        :id="2">
        <div class="my-card">
            Design review
        </div>
    </FluxCalendarItem>
</template>

<script
    setup
    lang="ts">
    import { FluxCalendarItem } from '@flux-ui/components';
    import { DateTime } from 'luxon';
</script>
```

```vue [CalendarItemAllDay.vue]
<template>
    <FluxCalendarItem
        :date="DateTime.now()"
        :all-day="true"
        :id="3">
        <div class="my-card">
            On call
        </div>
    </FluxCalendarItem>
</template>

<script
    setup
    lang="ts">
    import { FluxCalendarItem } from '@flux-ui/components';
    import { DateTime } from 'luxon';
</script>
```

```vue [CalendarItemWithTooltip.vue]
<template>
    <FluxCalendarItem
        :date="DateTime.now()"
        :id="4">
        <FluxTooltip content="Important meeting today.">
            <div class="my-card">
                Meeting
            </div>
        </FluxTooltip>
    </FluxCalendarItem>
</template>

<script
    setup
    lang="ts">
    import { FluxCalendarItem, FluxTooltip } from '@flux-ui/components';
    import { DateTime } from 'luxon';
</script>
```

:::
