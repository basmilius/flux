# useCalendar

This composable function is used to create month calendars in Flux. It contains the internal workings for determining which dates are visible and how to navigate between them.

## Usage

```ts
import { useCalendar } from '@basmilius/flux-internals';
import { DateTime } from 'luxon';

const {
    isTransitioningToPast,
    viewDate,
    viewDateNext,
    viewDatePrevious,
    viewMonth,
    viewYear,
    dates,
    days,
    setViewDate,
    nextMonth,
    previousMonth
} = useCalendar(DateTime.now(), {
    monthLength: 'long',
    weekDayLength: 'long'
});
```

## Type declarations

```ts
import type { DateTime } from 'luxon';
import type { ComputedRef, Ref } from 'vue';

export declare function useCalendar(initialDate: DateTime, options: Options): UseCalendar;

export declare type Options = {
    readonly monthLength?: 'short' | 'long';
    readonly weekDayLength?: 'short' | 'long';
};

export declare type UseCalendar = {
    readonly isTransitioningToPast: Ref<boolean>;
    readonly viewDate: Ref<DateTime>;
    readonly viewDateNext: ComputedRef<DateTime>;
    readonly viewDatePrevious: ComputedRef<DateTime>;
    readonly viewMonth: ComputedRef<string>;
    readonly viewYear: ComputedRef<string>;
    readonly dates: ComputedRef<DateTime[]>;
    readonly days: ComputedRef<string[]>;
    
    setViewDate(date: DateTime): void;
    nextMonth(): void;
    previousMonth(): void;
};
```

## Used by

- [Calendar](../../guide/components/calendar)
- [Date picker](../../guide/components/date-picker)
