---
outline: deep

props:
    -   name: direction
        description: Specifies in what direction the flyout should open.
        type: FluxDirection
        default: vertical
        optional: true

    -   name: margin
        description: A margin from the opener element.
        type: number
        default: 9
        optional: true

slots:
    -   name: default
        description: The content of the flyout.
        type:
            paneX: number
            paneY: number
            openerWidth: number
            openerHeight: number
            close: "(): void"

    -   name: opener
        description: The element that opens the flyout.
        type:
            close: "(): void"
            open: "(): void"
            toggle: "(): void"
---

# Flyout

A flyout provides a hidden interactable pane that can be toggled open or closed by an opener element. Flyouts can be positioned vertically or horizontally and support configurable dimensions for enhanced flexibility.

::: render
render=../../code/guide/components/flyout/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Menu || Flyouts are great for rendering hidden menus.
example=../../code/guide/components/flyout/menu.vue
:::

::: example Information || More information about an entity can also be shown within a flyout.
example=../../code/guide/components/flyout/information.vue
:::

## Used components

- [Pane](./pane)
