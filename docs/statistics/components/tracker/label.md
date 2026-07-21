---
outline: deep

props:
    -   name: label
        description: The text of the label.
        type: string

    -   name: color
        description: The color of the dot on the rail.
        type: FluxColor
        optional: true
        default: gray

slots:
    -   name: end
        description: Shown after the label, for example a FluxBadge counting what the phase holds.
---

# Tracker label

A phase marker on the rail of a [Tracker](./index). It groups the entries that follow it, without taking the visual weight of an [Entry](./entry).

::: render
render=../../../code/statistics/components/tracker/label/preview.vue
:::

::: tip
Keep labels short. They name a phase, such as `Completed` or `In-progress`, and are rendered in uppercase.
:::

::: info
The label exposes the ARIA `listitem` role.
:::

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/statistics/components/tracker/label/preview.vue [FluxStatisticsTrackerLabel.vue]

:::
