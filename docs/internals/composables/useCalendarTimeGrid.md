# useCalendarTimeGrid

This composable drives the day, two-day and week views of a calendar. It keeps the anchor date of the view, hands back the dates it spans and a label for the range, and steps forward and backward by exactly one view.

The anchor is normalized to the start of the week for a seven-day view and to the start of the day otherwise, so a view never begins halfway a week. Changing the day count re-anchors the current view instead of resetting it.

## Usage

```ts
import { useCalendarTimeGrid } from '@flux-ui/internals';
import { DateTime } from 'luxon';
import { ref } from 'vue';

const dayCount = ref<1 | 2 | 7>(7);

const {
    viewDate,
    viewDates,
    rangeLabel,
    next,
    previous
} = useCalendarTimeGrid(DateTime.now(), dayCount);
```

`isTransitioningToPast` tells you which way the view just moved, so a transition can run in the direction the user navigated.

The range label follows the user's locale and drops what the two ends have in common: within one month only the last date carries the month, and within one year neither carries the year.

## Type declarations

```ts
import type { DateTime } from 'luxon';
import type { ComputedRef, MaybeRefOrGetter, Ref } from 'vue';

declare function useCalendarTimeGrid(
    initialDate: DateTime,
    dayCount: MaybeRefOrGetter<UseCalendarTimeGridDayCount>
): UseCalendarTimeGridReturn;

type UseCalendarTimeGridDayCount = 1 | 2 | 7;

type UseCalendarTimeGridReturn = {
    readonly isTransitioningToPast: Ref<boolean>;
    readonly viewDate: Ref<DateTime>;
    readonly viewDates: ComputedRef<DateTime[]>;
    readonly rangeLabel: ComputedRef<string>;

    setViewDate(date: DateTime): void;
    next(): void;
    previous(): void;
};
```

## Used by

- [Calendar](../../components/calendar/)
