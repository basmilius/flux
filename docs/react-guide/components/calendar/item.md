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
`default` slot is yours to fill. Render any content (icons, labels, badges, copy) you like. When the parent
calendar has `draggable` enabled, items with an `id` can be dragged between day cells in month view.

To add a tooltip, wrap your slot content in a [Tooltip](../tooltip) component.

<FrontmatterDocs/>

## Snippets

::: code-group

```tsx
import { FluxCalendarItem } from '@flux-ui/react';
import { DateTime } from 'luxon';
export default function Example() {
    return (
        <>
            <FluxCalendarItem date={DateTime.now()} id={1}>
                <div className={'my-card'}>{' Work '}</div>
            </FluxCalendarItem>
        </>
    );
}
```

```tsx
import { FluxCalendarItem } from '@flux-ui/react';
import { DateTime } from 'luxon';
export default function Example() {
    return (
        <>
            <FluxCalendarItem date={DateTime.now().set({ hour: 10 })} duration={90} id={2}>
                <div className={'my-card'}>{' Design review '}</div>
            </FluxCalendarItem>
        </>
    );
}
```

```tsx
import { FluxCalendarItem } from '@flux-ui/react';
import { DateTime } from 'luxon';
export default function Example() {
    return (
        <>
            <FluxCalendarItem date={DateTime.now()} allDay={true} id={3}>
                <div className={'my-card'}>{' On call '}</div>
            </FluxCalendarItem>
        </>
    );
}
```

```tsx
import { FluxCalendarItem, FluxTooltip } from '@flux-ui/react';
import { DateTime } from 'luxon';
export default function Example() {
    return (
        <>
            <FluxCalendarItem date={DateTime.now()} id={4}>
                <FluxTooltip content={'Important meeting today.'}>
                    <div className={'my-card'}>{' Meeting '}</div>
                </FluxTooltip>
            </FluxCalendarItem>
        </>
    );
}
```

:::
