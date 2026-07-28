---
outline: deep

emits:
    -   name: update:open
        description: Triggered when the row opens or closes, with the side that is now open.
        type: [ '"start" | "end" | null' ]

props:
    -   name: disabled
        description: Disables the swipe gesture and everything inside the row, including its actions.
        type: boolean
        optional: true

    -   name: open
        description: The side that is currently open. Use it with v-model:open to control the row from the outside.
        type: [ '"start"', '"end"', 'null' ]
        default: 'null'
        optional: true

    -   name: threshold
        description: How far past the action area the row has to travel before releasing fires the outermost action. 0.5 is halfway between fully open and fully swiped away.
        type: number
        default: 0.5
        optional: true

slots:
    -   name: default
        description: The content of the row, typically an item.

    -   name: start
        description: The actions revealed by swiping towards the end of the row.

    -   name: end
        description: The actions revealed by swiping towards the start of the row.
---

# Swipe Actions

Swipe actions turn a list row into a gesture surface: dragging it sideways reveals actions that live behind its edges, like archiving or deleting a message. The row itself keeps its normal content, so any item, link or card can be wrapped in it.

The `start` and `end` slots follow the writing direction, so in a right-to-left layout `start` is revealed by swiping to the left. Vertical page scrolling keeps working while a horizontal swipe is captured.

::: render
render=../code/components/swipe-actions/preview.vue
:::

::: tip
A swipe is not reachable without a pointer, so the actions are ordinary buttons that stay in the DOM and in the accessibility tree at all times. Tabbing past the row content moves focus into them, which slides the row open so the focused action is visible, and moving focus away closes it again. Screen readers announce them as a group after the row content.
:::

::: tip
Swiping past the threshold and releasing fires the outermost action directly, after the row has animated off. That is the full-swipe gesture people know from mail apps, and it is the reason destructive actions belong at the outer edge.
:::

::: tip
The row is elastic at its bounds. Dragging past the actions, or towards a side that has none, keeps moving the row against a resistance that builds quickly, then springs it back on release. The gesture is answered either way instead of stopping dead, and the row never travels far enough to read as open when there is nothing behind that edge.
:::

<FrontmatterDocs/>

## Swipe action

Each action is a single button. Its `label` is visible and doubles as its accessible name.

| Prop    | Description                             | Type           | Default |
|---------|-----------------------------------------|----------------|---------|
| `color` | The color of the action.                | `FluxColor`    | `gray`  |
| `icon`  | The icon that is shown above the label. | `FluxIconName` |         |
| `label` | The label of the action.                | `string`       |         |

| Emit    | Description                                                                         | Type           |
|---------|-------------------------------------------------------------------------------------|----------------|
| `click` | Triggered when the action is activated, by pointer, by keyboard or by a full swipe. | `[MouseEvent]` |

## Examples

::: example One side || A single set of actions behind the end of the row is enough for most lists.
example=../code/components/swipe-actions/one-side.vue
:::

::: example Both sides || Fill both slots to separate a positive action from a destructive one, for instance completing versus deleting a task.
example=../code/components/swipe-actions/both-sides.vue
:::

::: example Full swipe || Swipe a row all the way and release: the row animates off and the outermost action fires. Lower the threshold to make the gesture easier to reach.
example=../code/components/swipe-actions/full-swipe.vue
:::

::: example One row at a time || Keeping only one row open is up to the consumer. Bind `open` and remember which row owns it.
example=../code/components/swipe-actions/coordinated.vue
:::

::: example Disabled || A disabled row ignores the gesture and disables everything inside it, including its own actions.
example=../code/components/swipe-actions/disabled.vue
:::

## Used components

- [Icon](./icon)
