# useCalendarMonthSwitcher

This composable function is used to create month switchers in Flux. It returns the months in the locale of the user.

## Usage

```ts
import { useCalendarMonthSwitcher } from '@basmilius/flux-internals';
import { DateTime } from 'luxon';

const {
    months
} = useCalendarMonthSwitcher(DateTime.now(), 'short');
```

## Type declarations

```ts
import type { DateTime } from 'luxon';
import type { Ref } from 'vue';

export declare function useCalendarMonthSwitcher(
    currentDate: Ref<DateTime>,
    displayLength: 'short' | 'long'
): UseCalendarMonthSwitcherReturn;

type MonthEntry = {
    readonly date: DateTime;
    readonly label: string;
};

type UseCalendarMonthSwitcherReturn = {
    readonly months: Ref<MonthEntry[]>;
};
```

## Used by

- [Calendar](../../guide/components/calendar)
- [Date picker](../../guide/components/date-picker)
