---
outline: deep

props:
    -   name: state
        description: The state of the step this segment represents. `active` fills the segment up to its own progress.
        type: [ done, active, todo ]
        optional: true
        default: todo

    -   name: value
        description: The progress within an `active` segment.
        type: number
        optional: true
        default: 50

    -   name: min
        description: The value at which an `active` segment is empty.
        type: number
        optional: true
        default: 0

    -   name: max
        description: The value at which an `active` segment is full.
        type: number
        optional: true
        default: 100

    -   name: label
        description: A label shown above or below the segment, depending on the `labels` prop of the card.
        type: string
        optional: true

    -   name: color
        description: The color of the filled segment. Accepts a FluxColor or a custom hex color.
        type: [ 'FluxColor', '`#${string}`' ]
        optional: true
---

# Tracker card segment

A single step in the bar of a [Tracker card](./index). Every segment takes an equal share of the width, so the bar reads as a step count rather than as a percentage.

::: render
render=../../../code/statistics/components/tracker-card/segment/preview.vue
:::

::: tip
`min`, `max` and `value` only apply to an `active` segment; the other states are either full or empty. Leave them out and a running step is drawn halfway.
:::

::: info
The segment exposes the ARIA `listitem` role. An `active` segment is marked with `aria-current="step"`, and its `label` is used as the accessible name.
:::

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/statistics/components/tracker-card/segment/preview.vue [FluxStatisticsTrackerCardSegment.vue]

:::
