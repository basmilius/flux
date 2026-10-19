---
outline: deep

emits:
    -   name: update:model-value
        description: Emitted when the selected index changes.
        type: [ number ]

props:
    -   name: dates
        description: The dates to scrub through, in ascending order. Needs at least two.
        type: DateTime[]

    -   name: model-value
        description: The index of the selected date.
        type: number
        optional: true
        default: 0
---

# Date scrubber

The date scrubber is a strip of ticks, one per date, grouped by month. Hover to magnify the ticks under the pointer and read the date. Click or drag to select. Hold still on a tick to open fine mode with a label per day; move fast or flick to close it. Every step plays a short synthesized click.

::: render
render=../code/components/date-scrubber/preview.vue
:::

::: tip Keyboard
Arrow keys step one date, Page Up and Page Down jump a month, Home and End jump to the first and last date.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || Selecting a date from outside glides the marker to it.
example=../code/components/date-scrubber/basic.vue
:::
