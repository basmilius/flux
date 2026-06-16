---
outline: deep

emits:
    -   name: open
        description: Triggered when the menu opens, with the originating event.
        type: [ MouseEvent ]

    -   name: close
        description: Triggered when the menu closes.
        type: []

props:
    -   name: disabled
        description: Whether the context menu is disabled.
        type: boolean
        optional: true

    -   name: position
        description: The position of the menu relative to the cursor.
        type: [ '"bottom-left"', '"bottom-right"', '"top-left"', '"…"' ]
        optional: true
        default: bottom-left

slots:
    -   name: default
        description: The region that responds to right-clicks.

    -   name: menu
        description: The menu content. Receives a close function. Place a Menu with items here.
---

# Context menu

The Context menu component opens a menu at the cursor when the user right-clicks its content. It is positioned at the pointer, traps focus while open, supports arrow-key navigation through the menu, and closes on Escape, scroll, or an outside click.

::: render
render=../code/components/context-menu/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic context menu.
example=../code/components/context-menu/basic.vue
:::

::: example With icons || A context menu with icons.
example=../code/components/context-menu/with-icons.vue
:::

## Used components

- [Menu](./menu/)
