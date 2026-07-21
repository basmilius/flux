---
outline: deep

requiredIcons:
    - circle-check

props:
    -   name: state
        description: The state of the step. `done` strikes the label through, `active` highlights it in the color of the entry.
        type: [ done, active, pending ]
        optional: true
        default: pending

    -   name: label
        description: The label of the step. Ignored when the default slot is used.
        type: string
        optional: true

slots:
    -   name: default
        description: The label of the step, for when plain text is not enough.

    -   name: end
        description: Shown after the label, for example the moment the step completed.
---

# Tracker step

The work inside an [Entry](./entry). Steps are wrapped in a `FluxStatisticsTrackerSteps` group; the tracker branches its rail into the group and rejoins it below the last step.

::: render
render=../../../code/statistics/components/tracker/step/preview.vue
:::

::: tip
Steps are the detail level of a tracker. Keep the milestone itself in the [Entry](./entry) and put everything that happens within it here.
:::

::: info
The group exposes the ARIA `list` role and its steps are `listitem`s.
:::

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/statistics/components/tracker/step/preview.vue [FluxStatisticsTrackerStep.vue]

:::

## Used components

- [Icon](../../../components/icon)
