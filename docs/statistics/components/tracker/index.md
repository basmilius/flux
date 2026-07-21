---
outline: deep

slots:
    -   name: default
        description: The rows of the tracker; entries and labels.
---

# Tracker

The tracker shows how something progresses over time: a vertical rail with an [Entry](./entry) per milestone, an optional [Label](./label) to mark a phase, and a group of [Steps](./step) branching off the rail for the work inside a milestone.

::: render
render=../../../code/statistics/components/tracker/preview.vue
:::

::: tip
The tracker is display-only. It renders what you declare and nothing more, so ordering, states and content come from your data.
:::

::: info
Every line is drawn as a single SVG overlay, measured from the markers that are actually rendered. Nothing is masked against a background color, so the tracker keeps working on any surface.
:::

::: info
The tracker exposes the ARIA `list` role and its rows are `listitem`s.
:::

<FrontmatterDocs/>

## Examples

::: example Live || Steps complete one by one, the entry flips to delivered and a closing row joins the rail. The lines follow along, since they are measured from what is rendered.
example=../../../code/statistics/components/tracker/live.vue
:::

::: example Order tracking || A [Tracker card](../tracker-card/) summarizing the progress, followed by a tracker detailing every shipment.
example=../../../code/statistics/components/tracker/order-tracking.vue
:::

## Used components

- [Entry](./entry)
- [Label](./label)
- [Step](./step)
