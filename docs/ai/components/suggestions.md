---
outline: deep

emits:
    -   name: select
        description: Triggered when a suggestion is picked, with the suggestion that was picked.
        type: [ FluxAiSuggestion ]

props:
    -   name: suggestions
        description: The suggestions to show. Each one needs a unique id and a label, and may carry an icon.
        type: 'readonly FluxAiSuggestion[]'

    -   name: disabled
        description: Whether the suggestions are disabled.
        type: boolean
        optional: true
---

# Suggestions

`FluxAiSuggestions` is the row of follow-up prompts that sits above or inside the composer. It renders a list of buttons that wrap onto a new line when they run out of room, so every suggestion stays reachable by keyboard.

::: render
render=../../code/ai/suggestions/preview.vue
:::

::: tip
A suggestion is a shortcut, not a command. Put the picked label in the composer with `v-model` and let the reader decide whether to send it, or submit right away if the flow calls for it.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || Every suggestion needs a unique `id` and a `label`. The `select` event hands you the whole suggestion.
example=../../code/ai/suggestions/basic.vue
:::

::: example Icons || An optional `icon` per suggestion makes a longer list easier to scan.
example=../../code/ai/suggestions/icons.vue
:::

::: example In the composer || Placed in the default slot of the [Prompt input](./prompt-input), the suggestions become part of the composer.
example=../../code/ai/suggestions/composer.vue
:::

## Used components

- [Icon](../../components/icon)
