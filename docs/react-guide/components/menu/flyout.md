---
outline: deep

props:
    -   name: disabled
        description: Disable the flyout trigger.
        type: boolean
        optional: true

    -   name: icon
        description: An optional leading icon shown on the trigger.
        type: FluxIconName
        optional: true

    -   name: is-active
        description: Renders the trigger in its active state.
        type: boolean
        optional: true

    -   name: is-destructive
        description: Renders the trigger in its destructive state.
        type: boolean
        optional: true

    -   name: label
        description: The label of the trigger.
        type: string
        optional: true

    -   name: position
        description: The side the submenu opens to. When there is no room it flips to the opposite side and is clamped to the viewport.
        type: [ '"right-top"', '"left-top"', '"…"' ]
        optional: true
        default: right-top

slots:
    -   name: default
        description: The submenu content. Place a Menu with items (or more flyouts) here.

    -   name: trigger
        description: Replaces the trigger label with custom content.

requiredIcons:
    - angle-right
---

# Menu flyout

A menu item that opens a submenu in a flyout next to it, rather than expanding inline like a [Collapsible](./collapsible). Use it inside any [Menu](./), such as a [Context menu](../context-menu), a dropdown, or a plain menu in a pane. Submenus may be nested arbitrarily deep.

Hover over an item to open its submenu, or use a click, Enter, Space or ArrowRight. ArrowLeft and Escape close the submenu and return focus to its trigger.

Pointer prediction keeps the submenu open while the pointer travels diagonally toward it. Set `debugCone` on the containing `FluxMenu` or `FluxContextMenu` to inspect the prediction area.

::: render
render=../../code/components/menu/flyout/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || Activate a menu item to open its submenu.
example=../../code/components/menu/flyout/basic.vue
:::

::: example Nested || A submenu inside a submenu. There is no depth limit.
example=../../code/components/menu/flyout/nested.vue
:::

::: example Stacked || Several submenu openers under each other, like a Format menu in an editor.
example=../../code/components/menu/flyout/stacked.vue
:::

## Used components

- [Menu](./)
- [Menu item](./item)
- [Icon](../icon)
