---
outline: deep

emits:
    -   name: load-more
        description: Triggered when the end of the list scrolls into view while there is more to load.

props:
    -   name: columns
        description: The `grid-template-columns` shared by every item. Use fixed or `minmax` tracks so the columns stay put while items open.
        type: string
        optional: true

    -   name: expand-mode
        description: How the items open. Use `single` to keep at most one item open, which closes the others when one opens.
        type: "'single' | 'multiple'"
        optional: true
        default: multiple

    -   name: has-more
        description: Whether there are more items to load.
        type: boolean
        optional: true

    -   name: is-empty
        description: Whether the list has no items, which shows the `empty` slot.
        type: boolean
        optional: true

    -   name: is-loading
        description: Whether the list is loading, which covers it with a spinner.
        type: boolean
        optional: true

    -   name: is-loading-more
        description: Whether the next items are loading, which shows a spinner below the list.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The items, groups and separators of the list.

    -   name: empty
        description: Shown when `is-empty` is set and the list is not loading.

requiredIcons:
    - circle-exclamation
---

# Card list

A list of rows that open into a card. A closed item runs edge to edge, an opened one lifts off the list, set in from the edge. All items share the `columns` of the list, so the columns do not jump when an item opens.

::: render
render=../../code/components/card-list/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || Items that open into a card on click, Enter or Space.
example=../../code/components/card-list/basic.vue
:::

::: example Single || With `expand-mode="single"` opening an item closes the one that was open.
example=../../code/components/card-list/single.vue
:::

::: example Loading detail || An item emits `intent` after a short hover, so its detail can be loaded before it opens. Until it is in, the card shows a spinner.
example=../../code/components/card-list/loading.vue
:::

::: example Infinite loading || A list that loads the next items when its end scrolls into view.
example=../../code/components/card-list/infinite.vue
:::

::: example Groups || Groups split the list with a striped separator, and can fold behind a header.
example=../../code/components/card-list/groups.vue
:::
