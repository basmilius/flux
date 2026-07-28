---
outline: deep

props:
    -   name: disabled
        description: Disables the control, so the model cannot be changed.
        type: boolean
        optional: true

    -   name: model-value
        description: The id of the selected model. Use it with `v-model`.
        type: string
        optional: true

    -   name: models
        description: The models to choose from.
        type: FluxAiModel[]

slots:
    -   name: option
        description: Replaces the contents of an option. Receives `model` and `isSelected`.

requiredIcons:
    - angles-up-down
    - check
---

# Model select

The model select is the control that picks which model answers. Each option carries the name of the model, a line about what it is good at and, when it matters, a badge for its speed or its price. It sits in a composer, next to the send button, or in the header of a conversation.

::: render
render=../../code/ai/model-select/preview.vue
:::

::: tip
The component renders what it is given. It does not fetch a model list, validate an id or know which models your account can reach: pass the models you want to offer and handle the rest in your application.
:::

::: tip
The description of a model is part of the option itself, so a screen reader reads it along with the name. Keep it to one short line about what the model is good at, not a specification sheet.
:::

<FrontmatterDocs/>

## Model

Every entry in `models` is a plain object.

| Property      | Type      | Description                                                            |
|---------------|-----------|------------------------------------------------------------------------|
| `id`          | `string`  | Identifies the model. This is the value of `v-model`.                  |
| `name`        | `string`  | The name shown in the option and, when selected, on the control.       |
| `description` | `string`  | Optional. One line about what the model is good at.                    |
| `badge`       | `string`  | Optional. A short qualifier, for instance `Fastest` or `Most capable`. |
| `isDisabled`  | `boolean` | Optional. Renders the option, but it cannot be chosen.                 |

## Examples

::: example Basic || A name and a one-line description per model. The control shows the name of the selected model and opens a menu that is fully keyboard operable.
example=../../code/ai/model-select/basic.vue
:::

::: example Badges || A badge qualifies a model in a single word, for instance its speed or its price. It shows in the option and on the control itself.
example=../../code/ai/model-select/badges.vue
:::

::: example Unavailable models || Mark a model with `isDisabled` to keep it visible while it cannot be chosen, for instance when it is not part of the current plan.
example=../../code/ai/model-select/unavailable.vue
:::

::: example Custom option || The `option` slot replaces the contents of an option. The selected state and the checkmark stay with the component. Keep the slot free of focusable elements: the menu walks its options with the arrow keys, and a button or a link inside one would become a stop of its own.
example=../../code/ai/model-select/custom-option.vue
:::

::: example Disabled || A disabled control keeps showing the selected model, but the menu cannot be opened.
example=../../code/ai/model-select/disabled.vue
:::

## Used components

- [Badge](../../components/badge)
- [Flyout](../../components/flyout)
- [Icon](../../components/icon)
- [Menu](../../components/menu/)
- [Secondary button](../../components/button/secondary)
