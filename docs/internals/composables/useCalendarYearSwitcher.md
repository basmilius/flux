# useCalendarYearSwitcher

This composable function is used to create years switchers in Flux. It contains the internal workings for determining which years are visible and how to navigate between them.

## Usage

```ts
import { useCalendarYearSwitcher } from '@basmilius/flux-internals';
import { DateTime } from 'luxon';

const {
    years,
    next,
    previous
} = useCalendarYearSwitcher(DateTime.now(), 10);
```

## Type declarations

```ts
import type { DateTime } from 'luxon';
import type { Ref } from 'vue';

export declare function useCalendarYearSwitcher(
    currentDate: Ref<DateTime>,
    limit: number = 10
): UseCalendarYearSwitcherReturn;

type UseCalendarYearSwitcherReturn = {
    readonly years: Ref<number[]>;

    next(): void;
    previous(): void;
};
```

## Used by

- [Calendar](../../guide/components/calendar)
- [Date picker](../../guide/components/date-picker)
