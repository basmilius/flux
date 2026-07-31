---
outline: deep

props:
    -   name: disabled
        description: Disables every control inside the row, through the same mechanism as FluxDisabled.
        type: boolean
        optional: true

    -   name: icon-leading
        description: The icon at the start of the row.
        type: FluxIconName
        optional: true

    -   name: is-fill
        description: Lets the control take the remaining width instead of the label. Use it for controls without an intrinsic width, such as a slider.
        type: boolean
        optional: true

    -   name: label
        description: The label that is shown at the start of the row.
        type: string
        optional: true

slots:
    -   name: default
        description: The control shown at the end of the row.

    -   name: label
        description: Custom content for the label, replacing the label prop.
---

# Menu control

A row that puts a label next to a control, in the same rhythm as a [Menu item](./item). It is the place for a component that brings its own keyboard behavior: a small [Segmented control](../segmented-control/), a [Slider](../form/slider), a [Quantity selector](../quantity-selector) or a search field.

Where a [Menu pane](./pane) is a padded container for a full component, a menu control is a single row aligned to the items above and below it. Both opt their subtree out of the menu's roving focus zone in the same way, so the embedded control keeps its own arrow keys.

::: render
render=../../code/components/menu/control/preview.vue
:::

::: tip
For a plain on/off setting, reach for a [Menu toggle](./toggle) instead. That is one focus stop and one `menuitemcheckbox`, where a menu control is a row containing a separate control.
:::

::: warning
Arrow navigation across the surrounding menu skips the row; reach it with `Tab`. Inside the row the arrow keys belong to the control, so `ArrowLeft` no longer closes a [Menu flyout](./flyout) submenu while the focus sits there. `Escape` still closes the menu from anywhere.
:::

<FrontmatterDocs/>

## Examples

::: example Theme || A tri-state theme switcher. "Follow your system" is a real answer rather than the absence of one, which a two-way toggle cannot express.
example=../../code/components/menu/control/theme.vue
:::

::: example Slider || A control without an intrinsic width. is-fill lets it take the remaining space instead of the label.
example=../../code/components/menu/control/slider.vue
:::

::: example Search || Without a label the control fills the row on its own, no is-fill needed.
example=../../code/components/menu/control/search.vue
:::

::: example Inside a flyout || Several rows in a [Menu flyout](./flyout) submenu. Opening the submenu with the keyboard moves focus straight into the first control.
example=../../code/components/menu/control/flyout.vue
:::

::: example Inside a context menu || Right-click (or long-press on touch) the area. `Tab` reaches the control, and using it never closes the menu.
example=../../code/components/menu/control/context-menu.vue
:::

## Used components

- [Icon](../icon)
