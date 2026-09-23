# createLabelForDateRange

Writes a date range as the shortest label that still reads unambiguously. The day, month or year that both ends share is written once. A range that spans more than one year becomes `multiYearLabel` when you pass one, and the full range otherwise.

## Usage

```ts
import { createLabelForDateRange } from '@flux-ui/internals';
import { DateTime } from 'luxon';

const label = createLabelForDateRange(
    DateTime.fromISO('2026-03-02'),
    DateTime.fromISO('2026-03-09')
);
```

## Type declarations

```ts
export declare function createLabelForDateRange(
    start: DateTime,
    end: DateTime,
    multiYearLabel?: string
): string;
```
