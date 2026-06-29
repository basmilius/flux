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
    -   name: debug-cone
        description: Visualises the submenu prediction cone for debugging. Draws the safe triangle and the pointer.
        type: boolean
        optional: true

    -   name: disabled
        description: Whether the context menu is disabled.
        type: boolean
        optional: true

    -   name: is-persistent
        description: When enabled, the context menu stays open after a menu item is clicked instead of closing. Defaults to false; individual items can also opt in via their own is-persistent.
        type: boolean
        optional: true

    -   name: label
        description: An accessible label for the menu popup, applied as aria-label. Use it to name the menu for screen readers.
        type: string
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

Nest a [Menu flyout](./menu/flyout) inside the menu to add submenus. A prediction cone keeps a submenu open while the pointer moves diagonally towards it — and back out to its opener — even when the cursor briefly crosses another item. Set `debug-cone` to visualise that cone.

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

::: example With submenus || Nest a Menu flyout to add a submenu that opens to the side.
example=../code/components/context-menu/with-submenu.vue
:::

::: example Deep submenus || Menu flyouts nest arbitrarily deep. The prediction cone guides the pointer into a submenu and back out to its opener across every level.
example=../code/components/context-menu/deep-submenus.vue
:::

::: example Nested formatting || A spreadsheet-style menu mixing several openers with two and three levels of nesting.
example=../code/components/context-menu/nested-formatting.vue
:::

::: example Real-world || A Finder-style menu with several submenu openers stacked under each other.
example=../code/components/context-menu/finder.vue
:::

::: example With color picker || Embed a full component with a Menu pane. The picker stays interactive while the menu is open.
example=../code/components/context-menu/with-color-picker.vue
:::

## Used components

- [Menu](./menu/)
- [Menu flyout](./menu/flyout)
- [Menu pane](./menu/pane)
