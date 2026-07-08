---
outline: deep

props:
    -   name: label
        description: The label of the step, shown next to the chevron.
        type: string
        optional: true

    -   name: icon
        description: An optional icon shown before the label.
        type: FluxIconName
        optional: true

    -   name: aria-label
        description: The accessible label of the trigger button. Falls back to the label prop.
        type: string
        optional: true

slots:
    -   name: default
        description: The menu items shown in the dropdown, rendered as [Menu item](../menu/item) (and [Menu group](../menu/group) / separator) components. The wrapping menu is provided for you.

    -   name: leading
        description: Content rendered before the label, such as an [avatar](../avatar).

requiredIcons:
    - angle-down
    - angle-right
---

# Breadcrumb flyout

A breadcrumb flyout is a step that opens a dropdown instead of navigating, letting users switch to a sibling in the middle of a [Breadcrumb](../breadcrumb/) trail — a different client, project or account — without leaving the current view. It renders a chevron to signal the dropdown and, when collapsed into an overflow menu, becomes a nested submenu.

Provide the menu entries in the default slot as [Menu item](../menu/item) components; the wrapping [Menu](../menu/) is added for you.

::: render
render=../../code/components/breadcrumb/flyout/preview.vue
:::

::: warning
This component is best used within a [Breadcrumb](../breadcrumb/).
:::

<FrontmatterDocs/>

## Examples

::: example Path switcher || Group the sibling options, and add actions such as creating a new one below a separator.
example=../../code/components/breadcrumb/flyout/basic.vue
:::

::: example With an avatar || Use the `leading` slot to switch between people, showing an [avatar](../avatar) on the trigger.
example=../../code/components/breadcrumb/flyout/avatar.vue
:::

## Used components

- [Icon](../icon)
- [Menu](../menu/)
- [Menu item](../menu/item)
- [Avatar](../avatar)
