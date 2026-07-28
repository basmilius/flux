---
outline: deep

emits:
    -   name: update:is-open
        description: Triggered when the dial opens or closes.
        type: [ boolean ]

props:
    -   name: direction
        description: The way the actions fan out. Logical, so start and end follow the writing direction.
        type: [ '"up"', '"down"', '"start"', '"end"' ]
        default: up
        optional: true

    -   name: icon
        description: The icon of the trigger while the dial is closed.
        type: FluxIconName
        default: plus
        optional: true

    -   name: icon-open
        description: The icon of the trigger while the dial is open.
        type: FluxIconName
        default: xmark
        optional: true

    -   name: is-open
        description: Whether the dial is open. Use it with v-model:is-open to control the dial from the outside.
        type: boolean
        default: false
        optional: true

    -   name: label
        description: The accessible name of the trigger and of the group of actions it opens.
        type: string
        required: true

    -   name: position
        description: The bottom corner the dial sits in. Logical, so it flips in right-to-left layouts.
        type: [ '"start"', '"end"' ]
        default: end
        optional: true

slots:
    -   name: default
        description: The actions of the dial.

    -   name: opener
        description: Replaces the trigger. Bind cssClass so the replacement keeps its place, and aria-expanded so it keeps announcing whether the dial is open.
        type:
            cssClass: string
            isOpen: boolean
            toggle: "(): void"

keyboardShortcuts:
    -   key: Tab
        action: Move into the actions and back out again

    -   key: ↑ / ↓ / ← / →
        action: Move between the actions

    -   key: Enter / Space
        action: Activate the trigger or the focused action

    -   key: Escape
        action: Close the dial and return focus to the trigger

requiredIcons:
    - plus
    - xmark
---

# Speed dial

The speed dial keeps one primary action in the corner of the screen and hides a few related ones behind it. It suits a screen where a toolbar would take up too much room: one tap opens the fan, a second one picks the action.

The actions fan out in sequence and fold back at once. Each action carries its own label, so the fan reads without hovering. Picking an action closes the dial, and so does clicking anywhere outside of it.

::: render
render=../code/components/speed-dial/preview.vue
:::

::: tip
The trigger is a real button with `aria-expanded` and `aria-haspopup`, and the actions form a menu. Opening the dial with the keyboard moves focus to the first action, the arrow keys move between them, and `Escape` closes the dial and hands focus back to the trigger. While the dial is closed the actions are out of the tab order and out of the accessibility tree.
:::

::: tip
Keep it to a handful of actions: the fan is quick to read up to five or six, and a longer list belongs in a [menu](./menu/). The trigger swaps its icon while the dial is open, from `plus` to `xmark` by default.
:::

::: warning
The dial is positioned against the viewport. Give an ancestor of the dial a `transform`, `filter` or `contain: paint` when it should sit in the corner of a container instead. Its offsets can be overruled by passing a class of your own, which is what a dial fanning `down` needs, since that one belongs at the top of its container.
:::

<FrontmatterDocs/>

## Speed dial action

Each action is a single button. Its `label` is shown next to the icon and doubles as its accessible name.

| Prop    | Description              | Type           |
|---------|--------------------------|----------------|
| `icon`  | The icon of the action.  | `FluxIconName` |
| `label` | The label of the action. | `string`       |

| Emit    | Description                                                        | Type           |
|---------|--------------------------------------------------------------------|----------------|
| `click` | Triggered when the action is activated, by pointer or by keyboard. | `[MouseEvent]` |

## Examples

::: example Basic || A create button in the corner of a screen, with the three things a team adds most often behind it.
example=../code/components/speed-dial/basic.vue
:::

::: example Direction || The actions can fan up, down or sideways. A sideways dial keeps its actions on the line of the trigger, which suits a corner with little room above it.
example=../code/components/speed-dial/direction.vue
:::

::: example Custom trigger || The opener slot replaces the trigger, for instance with a labeled button. Bind the class it hands you so the replacement keeps its place.
example=../code/components/speed-dial/custom-trigger.vue
:::

::: example Controlled || Binding is-open with v-model lets another part of the interface open the dial, and follows along when the dial closes itself.
example=../code/components/speed-dial/controlled.vue
:::

## Used components

- [Button](./button)
    - [Primary](./button/primary)
- [Icon](./icon)
