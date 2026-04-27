---
outline: deep

props:
    -   name: label
        description: The label of the account item — typically the user's name.
        type: string

    -   name: icon
        description: An optional icon shown in the menu item.
        type: FluxIconName
        optional: true

    -   name: image-alt
        description: The alternative text for the avatar image.
        type: string
        optional: true

    -   name: image-src
        description: The source URL of the avatar image.
        type: string
        optional: true

slots:
    -   name: avatar
        description: A custom avatar rendered before the label, replacing the image.

    -   name: switcher
        description: When provided, the account item becomes clickable and opens a flyout containing the slot content. Use this to render an account switcher or sign-out menu.
---

# Application menu account

The application menu account renders the current user as the last item of the menu footer. Provide a `label` and optionally an avatar through `image-src` or the `avatar` slot. When the `switcher` slot is provided, the item becomes clickable and reveals a flyout with the slot content — a perfect place for an account switcher.

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/application/menu/account/snippet.vue [FluxApplicationMenuAccount.vue]

:::

## Used components

- [Flyout](../../../components/flyout)
- [Menu](../../../components/menu)
    - [Item](../../../components/menu/item)
- [Pane](../../../components/pane)
