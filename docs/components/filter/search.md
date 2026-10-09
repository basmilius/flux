---
outline: deep

props:
    -   name: placeholder
        description: The placeholder of the search input.
        type: string
        optional: true

    -   name: model-value
        description: The search query.
        type: string
        optional: true

requiredIcons:
    - magnifying-glass
---

# Filter search

The search input for the menu of a [custom filter](./#custom-filter-types). It sticks to the top while the options below it scroll and takes focus when the filter opens. The built-in option filters use it as well.

::: render
render=../../code/components/filter/search/preview.vue
:::

::: warning
This component can only be used within a [Filter](./index) or [Filter bar](./bar).
:::

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/components/filter/search/MyTextFilter.vue [MyTextFilter.vue]
<<< @/code/components/filter/search/preview.vue [Usage]

:::

## Used components

- [Form](../form)
    - [Input](../form/input)
