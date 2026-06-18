---
outline: deep

props:
    -   name: is-control
        description: Renders the item as a label so that clicking anywhere in the row toggles the single form control (toggle, checkbox or radio) it contains.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The content of the item, typically composed of item sub-components.
---

# Item

An item is a flexible list entry used to display structured content such as a media element, text, and actions. It is composed of several sub-components that each handle a specific area of the item.

::: render
render=../../code/components/item/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Clickable || Wrap an item in a clickable pane to turn it into an interactive list entry — the whole row highlights on hover.
example=../../code/components/item/clickable.vue
:::

::: example Complete || An item composed of media, content and actions stacked together.
example=../../code/components/item/complete.vue
:::

::: example Notifications || A notification feed with a leading icon, message, timestamp and a dismiss action.
example=../../code/components/item/notifications.vue
:::

::: example Settings || A settings list where each row pairs a description with a switch.
example=../../code/components/item/settings.vue
:::

::: example Control || With is-control the whole row becomes the label for its form control — click anywhere to toggle.
example=../../code/components/item/control.vue
:::

::: example Selectable || A multi-select list where the whole row toggles the checkbox, thanks to is-control.
example=../../code/components/item/selectable.vue
:::

::: example Integrations || Connected services with a status badge and a toggle to connect or disconnect.
example=../../code/components/item/integrations.vue
:::

::: example Transactions || A transaction list with a directional icon and a trailing amount.
example=../../code/components/item/transactions.vue
:::

::: example Downloads || Active downloads with an inline progress bar and a cancel action.
example=../../code/components/item/downloads.vue
:::

## Snippet

::: code-group

<<< @/code/components/item/preview.vue [FluxItem.vue]

:::

## Available sub-components

- [Content](./content)
- [Media](./media)
- [Actions](./actions)

## Used components

- [Flex](../layout/flex/)
