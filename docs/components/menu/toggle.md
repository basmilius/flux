---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the toggle is switched.
        type: [ boolean ]

    -   name: click
        description: Triggered when the menu toggle is clicked, after the model has been updated.
        type: [ MouseEvent ]

props:
    -   name: model-value
        description: Whether the toggle is switched on.
        type: boolean
        default: false

    -   name: disabled
        description: Disable the menu toggle.
        type: boolean
        optional: true

    -   name: icon-leading
        description: The icon at the start of the menu toggle.
        type: FluxIconName
        optional: true

    -   name: label
        description: The label that is shown in the menu toggle.
        type: string
        optional: true

    -   name: command
        description: The label of the menu toggle command.
        type: string
        optional: true

    -   name: command-icon
        description: The icon of the menu toggle command.
        type: FluxIconName
        optional: true

    -   name: is-indented
        description: Indicates that the menu toggle is indented (e.g. in a sub-menu structure).
        type: boolean
        optional: true

    -   name: is-persistent
        description: Keeps the surrounding menu open when the toggle is switched. Defaults to true, since switching a setting is rarely the end of a menu interaction. Set to false to close the menu on click.
        type: boolean
        optional: true
        default: true

slots:
    -   name: before
        description: Custom content shown before the label, replacing the leading icon.
---

# Menu toggle

A [Menu item](./item) that switches a setting on or off. The whole row is the control: it renders as a single `menuitemcheckbox`, so the arrow keys reach it like any other item and `Space` or `Enter` flips it. The switch on the right is decorative and is hidden from assistive technology, which reads the row itself as a checkbox instead.

Use it wherever you would otherwise put a [Toggle](../form/toggle) next to a label. Unlike a bare toggle in a [Menu pane](./pane), a menu toggle is one focus stop rather than two, and clicking anywhere on the row switches it.

::: render
render=../../code/components/menu/toggle/preview.vue
:::

::: tip
Menu toggles keep the menu open by default, so several settings can be switched in one visit. Pass `:is-persistent="false"` when a toggle really is the last action in the menu.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || Several settings in one menu. Each toggle keeps the menu open, so they can be switched in any order.
example=../../code/components/menu/toggle/basic.vue
:::

::: example Inside a flyout || Toggles work the same in a [Menu flyout](./flyout) submenu. Open the submenu with `ArrowRight`, switch with `Space` and close it again with `ArrowLeft`.
example=../../code/components/menu/toggle/flyout.vue
:::

::: example Inside a context menu || Right-click (or long-press on touch) the area to open a [Context menu](../context-menu) with toggles in it.
example=../../code/components/menu/toggle/context-menu.vue
:::

::: example Closing on click || A toggle that ends the interaction can close the menu with :is-persistent="false".
example=../../code/components/menu/toggle/persistent.vue
:::

## Used components

- [Menu item](./item)
