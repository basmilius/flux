---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the checkbox is checked or unchecked.
        type: [ boolean ]

    -   name: click
        description: Triggered when the menu checkbox is clicked, after the model has been updated.
        type: [ MouseEvent ]

props:
    -   name: model-value
        description: Whether the checkbox is checked.
        type: boolean
        default: false

    -   name: disabled
        description: Disable the menu checkbox.
        type: boolean
        optional: true

    -   name: label
        description: The label that is shown in the menu checkbox.
        type: string
        optional: true

    -   name: command
        description: The label of the menu checkbox command.
        type: string
        optional: true

    -   name: command-icon
        description: The icon of the menu checkbox command.
        type: FluxIconName
        optional: true

    -   name: is-indented
        description: Indicates that the menu checkbox is indented (e.g. in a sub-menu structure).
        type: boolean
        optional: true

    -   name: is-persistent
        description: Keeps the surrounding menu open when the checkbox is toggled. Defaults to true, since a multi-select list is meant to stay open while picking. Set to false to close the menu on click.
        type: boolean
        optional: true
        default: true

requiredIcons:
    - circle-check
---

# Menu checkbox

A [Menu item](./item) that switches one option of a set on or off. It renders as a `menuitemcheckbox` and shows a checkmark in the leading gutter while it is checked, which stays reserved when it is not so the labels line up.

Use it when several options can be on at the same time: visible table columns, active filters, layers in an editor. For a set where exactly one option can be picked, use [Menu options](./options) with `mode="select"` instead, which renders each item as a `menuitemradio`.

::: render
render=../../code/components/menu/checkbox/preview.vue
:::

::: tip
Menu checkboxes keep the menu open by default, so a whole set can be picked in one visit. A closing action, such as an apply or clear button, is a plain [Menu item](./item) next to them.
:::

::: warning
Do not put a menu checkbox inside [Menu options](./options). That component clones its children and injects its own single-value selection onto them, which turns the checkbox back into a `menuitemradio` and makes both click handlers fire.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || Picking which columns are visible. Every checkbox keeps the menu open.
example=../../code/components/menu/checkbox/basic.vue
:::

::: example Inside a flyout || A filter set in a [Menu flyout](./flyout) submenu, with a plain menu item to clear it again.
example=../../code/components/menu/checkbox/flyout.vue
:::

## Used components

- [Menu item](./item)
