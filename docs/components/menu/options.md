---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the active option changes. Emits the option's vnode key when it has one, otherwise its index.
        type: [ 'string', 'number' ]

props:
    -   name: model-value
        description: Identifies the highlighted or selected option. Matches the option's vnode key (:key) when present, falling back to its position for keyless static lists.
        type: [ 'string', 'number' ]

    -   name: is-horizontal
        description: Indicates that the items should flow horizontally.
        type: boolean
        optional: true

    -   name: is-persistent
        description: Keeps the surrounding menu open after an option is clicked. Defaults to true, since options menus are meant to stay open while selecting. Set to false to close the menu on selection.
        type: boolean
        optional: true
        default: true

    -   name: mode
        description: The active mode of the option.
        type: [ '"highlight"', '"select"' ]
        optional: true
        default: highlight

slots:
    -   name: default
        description: The content of the options group.
---

# Menu options

This component provides a container for grouping menu items that behave like options, allowing only one to be selected at a time. Its layout can be adjusted based on the `isHorizontal` prop. When set to horizontal, it applies a specific style; otherwise, it defaults to a vertical layout.

Selection is tracked by identity rather than position: each item is matched on its vnode `:key` when it has one, falling back to its index for keyless static lists. Give items an explicit `:key` so the selection survives conditional or reordered items.

::: render
render=../../code/components/menu/options/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Alignment || Horizontal option menus can be used to allow users to select an alignment.
example=../../code/components/menu/options/alignment.vue
:::

::: example Option || Vertical option menus can be used to allow the user to switch between different view modes.
example=../../code/components/menu/options/option.vue
:::

::: example Inside a flyout || Option menus stay open while selecting, even inside a flyout. Pass :is-persistent="false" if you want the menu to close on selection instead.
example=../../code/components/menu/options/persistent.vue
:::

## Used components

- [Button](../button)
    - [Menu group](./group)
